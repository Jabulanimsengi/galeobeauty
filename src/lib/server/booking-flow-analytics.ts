import "server-only";

import { getPostgresPool } from "@/lib/server/postgres";
import type {
  BookingFlowMetricsBookingTypeRow,
  BookingFlowMetricsCampaignRow,
  BookingFlowEventPayload,
  BookingFlowMetricsDashboard,
  BookingFlowMetricsFilters,
  BookingFlowMetricsDailyRow,
  BookingFlowMetricsLandingPageRow,
  BookingFlowMetricsSourceRow,
  BookingFlowMetricsSummary,
} from "@/lib/booking-flow-analytics";

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function normalizeOptionalNumber(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeOptionalBoolean(value?: boolean) {
  return typeof value === "boolean" ? value : null;
}

function isIsoDate(value?: string | null) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

function buildBookingFlowDateWhereClause(filters: BookingFlowMetricsFilters = {}) {
  const values: string[] = [];
  const conditions: string[] = [];
  const from = cleanValue(filters.from);
  const to = cleanValue(filters.to);

  if (from && isIsoDate(from)) {
    values.push(from);
    conditions.push(`(created_at at time zone 'Africa/Johannesburg')::date >= $${values.length}::date`);
  }

  if (to && isIsoDate(to)) {
    values.push(to);
    conditions.push(`(created_at at time zone 'Africa/Johannesburg')::date <= $${values.length}::date`);
  }

  return {
    values,
    whereClause: conditions.length > 0 ? `where ${conditions.join(" and ")}` : "",
    activeFrom: from && isIsoDate(from) ? from : null,
    activeTo: to && isIsoDate(to) ? to : null,
  };
}

function isMissingRelationError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "42P01"
  );
}

function isBookingFlowSchemaDriftError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    ((error as { code?: string }).code === "42P01" ||
      (error as { code?: string }).code === "23514")
  );
}

function buildMetricsBreakdownRow({
  serviceCtaClickCount,
  treatmentAddedCount,
  treatmentRemovedCount,
  sheetOpenCount,
  stepOneViewCount,
  stepTwoViewCount,
  stepThreeViewCount,
  dateSelectedCount,
  timeSelectedCount,
  sheetCloseCount,
  idleAbandonCount,
  validationErrorCount,
  saveFailedCount,
  whatsappSubmitCount,
  completedWhatsappSubmitCount,
}: {
  serviceCtaClickCount?: string | number | null;
  treatmentAddedCount?: string | number | null;
  treatmentRemovedCount?: string | number | null;
  sheetOpenCount: string | number | null | undefined;
  stepOneViewCount?: string | number | null;
  stepTwoViewCount?: string | number | null;
  stepThreeViewCount?: string | number | null;
  dateSelectedCount?: string | number | null;
  timeSelectedCount?: string | number | null;
  sheetCloseCount?: string | number | null;
  idleAbandonCount?: string | number | null;
  validationErrorCount?: string | number | null;
  saveFailedCount?: string | number | null;
  whatsappSubmitCount: string | number | null | undefined;
  completedWhatsappSubmitCount: string | number | null | undefined;
}) {
  const normalizedServiceCtaClickCount = Number(serviceCtaClickCount ?? 0);
  const normalizedTreatmentAddedCount = Number(treatmentAddedCount ?? 0);
  const normalizedTreatmentRemovedCount = Number(treatmentRemovedCount ?? 0);
  const normalizedSheetOpenCount = Number(sheetOpenCount ?? 0);
  const normalizedStepOneViewCount = Number(stepOneViewCount ?? 0);
  const normalizedStepTwoViewCount = Number(stepTwoViewCount ?? 0);
  const normalizedStepThreeViewCount = Number(stepThreeViewCount ?? 0);
  const normalizedDateSelectedCount = Number(dateSelectedCount ?? 0);
  const normalizedTimeSelectedCount = Number(timeSelectedCount ?? 0);
  const normalizedSheetCloseCount = Number(sheetCloseCount ?? 0);
  const normalizedIdleAbandonCount = Number(idleAbandonCount ?? 0);
  const normalizedValidationErrorCount = Number(validationErrorCount ?? 0);
  const normalizedSaveFailedCount = Number(saveFailedCount ?? 0);
  const normalizedWhatsappSubmitCount = Number(whatsappSubmitCount ?? 0);
  const normalizedCompletedWhatsappSubmitCount = Number(
    completedWhatsappSubmitCount ?? 0
  );

  return {
    serviceCtaClickCount: normalizedServiceCtaClickCount,
    treatmentAddedCount: normalizedTreatmentAddedCount,
    treatmentRemovedCount: normalizedTreatmentRemovedCount,
    sheetOpenCount: normalizedSheetOpenCount,
    stepOneViewCount: normalizedStepOneViewCount,
    stepTwoViewCount: normalizedStepTwoViewCount,
    stepThreeViewCount: normalizedStepThreeViewCount,
    dateSelectedCount: normalizedDateSelectedCount,
    timeSelectedCount: normalizedTimeSelectedCount,
    sheetCloseCount: normalizedSheetCloseCount,
    idleAbandonCount: normalizedIdleAbandonCount,
    validationErrorCount: normalizedValidationErrorCount,
    saveFailedCount: normalizedSaveFailedCount,
    whatsappSubmitCount: normalizedWhatsappSubmitCount,
    completedWhatsappSubmitCount: normalizedCompletedWhatsappSubmitCount,
    openToStepTwoRate:
      normalizedSheetOpenCount > 0
        ? normalizedStepTwoViewCount / normalizedSheetOpenCount
        : null,
    stepThreeToSubmitRate:
      normalizedStepThreeViewCount > 0
        ? normalizedWhatsappSubmitCount / normalizedStepThreeViewCount
        : null,
    openToSubmitRate:
      normalizedSheetOpenCount > 0
        ? normalizedWhatsappSubmitCount / normalizedSheetOpenCount
        : null,
    submitCompletionRate:
      normalizedWhatsappSubmitCount > 0
        ? normalizedCompletedWhatsappSubmitCount / normalizedWhatsappSubmitCount
        : null,
  };
}

export async function recordBookingFlowEvent(payload: BookingFlowEventPayload) {
  const pool = getPostgresPool();

  try {
    await pool.query(
      `insert into booking_flow_events (
        event_name,
        booking_type,
        source,
        medium,
        campaign,
        landing_page,
        enquiry_page,
        consultation_context,
        treatment_count,
        treatment_names,
        total_value,
        requirements_complete,
        required_fields_completed,
        required_fields_total,
        has_required_name,
        has_required_phone,
        has_required_date,
        has_required_time_slot,
        has_required_treatments,
        has_optional_email,
        metadata
      ) values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21::jsonb
      )`,
      [
        payload.eventName,
        payload.bookingType,
        cleanValue(payload.source),
        cleanValue(payload.medium),
        cleanValue(payload.campaign),
        cleanValue(payload.landingPage),
        cleanValue(payload.enquiryPage),
        cleanValue(payload.consultationContext),
        normalizeOptionalNumber(payload.treatmentCount),
        payload.treatmentNames?.length ? payload.treatmentNames.join(" | ") : null,
        normalizeOptionalNumber(payload.totalValue),
        normalizeOptionalBoolean(payload.requirementsComplete),
        normalizeOptionalNumber(payload.requiredFieldsCompleted),
        normalizeOptionalNumber(payload.requiredFieldsTotal),
        normalizeOptionalBoolean(payload.hasRequiredName),
        normalizeOptionalBoolean(payload.hasRequiredPhone),
        normalizeOptionalBoolean(payload.hasRequiredDate),
        normalizeOptionalBoolean(payload.hasRequiredTimeSlot),
        normalizeOptionalBoolean(payload.hasRequiredTreatments),
        normalizeOptionalBoolean(payload.hasOptionalEmail),
        JSON.stringify(payload),
      ]
    );
    return true;
  } catch (error) {
    if (isBookingFlowSchemaDriftError(error)) {
      return false;
    }

    throw error;
  }
}

export async function getBookingFlowMetricsSummary(): Promise<BookingFlowMetricsSummary> {
  const dashboard = await getBookingFlowMetricsDashboard();
  return dashboard.summary;
}

export async function getBookingFlowMetricsDashboard(
  filters: BookingFlowMetricsFilters = {}
): Promise<BookingFlowMetricsDashboard> {
  const pool = getPostgresPool();
  const { values, whereClause, activeFrom, activeTo } =
    buildBookingFlowDateWhereClause(filters);

  try {
    const [
      summaryResult,
      dailyRowsResult,
      bookingTypeRowsResult,
      sourceRowsResult,
      campaignRowsResult,
      landingPageRowsResult,
    ] = await Promise.all([
      pool.query<{
        sheet_open_count: string;
        service_cta_click_count: string;
        treatment_added_count: string;
        treatment_removed_count: string;
        step_one_view_count: string;
        step_two_view_count: string;
        step_three_view_count: string;
        date_selected_count: string;
        time_selected_count: string;
        sheet_close_count: string;
        idle_abandon_count: string;
        validation_error_count: string;
        save_failed_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
        first_tracked_at: string | null;
        last_tracked_at: string | null;
      }>(
        `select
          count(*) filter (where event_name = 'service_cta_click')::text as service_cta_click_count,
          count(*) filter (where event_name = 'booking_treatment_added')::text as treatment_added_count,
          count(*) filter (where event_name = 'booking_treatment_removed')::text as treatment_removed_count,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
          count(*) filter (where event_name = 'booking_step_view' and metadata->>'step' = '1')::text as step_one_view_count,
          count(*) filter (where event_name = 'booking_step_view' and metadata->>'step' = '2')::text as step_two_view_count,
          count(*) filter (where event_name = 'booking_step_view' and metadata->>'step' = '3')::text as step_three_view_count,
          count(*) filter (where event_name = 'booking_date_selected')::text as date_selected_count,
          count(*) filter (where event_name = 'booking_time_selected')::text as time_selected_count,
          count(*) filter (where event_name = 'booking_sheet_close')::text as sheet_close_count,
          count(*) filter (where event_name = 'booking_idle_abandon')::text as idle_abandon_count,
          count(*) filter (where event_name = 'booking_validation_error')::text as validation_error_count,
          count(*) filter (where event_name = 'booking_save_failed')::text as save_failed_count,
          count(*) filter (where event_name = 'booking_whatsapp_submit')::text as whatsapp_submit_count,
          count(*) filter (where event_name = 'booking_requirements_completed_whatsapp_submit')::text as completed_whatsapp_submit_count,
          min(created_at)::text as first_tracked_at,
          max(created_at)::text as last_tracked_at
        from booking_flow_events
        ${whereClause}`,
        values
      ),
      pool.query<{
        tracked_date: string;
        sheet_open_count: string;
        service_cta_click_count: string;
        treatment_added_count: string;
        treatment_removed_count: string;
        step_one_view_count: string;
        step_two_view_count: string;
        step_three_view_count: string;
        date_selected_count: string;
        time_selected_count: string;
        sheet_close_count: string;
        idle_abandon_count: string;
        validation_error_count: string;
        save_failed_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
      }>(
        `select
          ((created_at at time zone 'Africa/Johannesburg')::date)::text as tracked_date,
          count(*) filter (where event_name = 'service_cta_click')::text as service_cta_click_count,
          count(*) filter (where event_name = 'booking_treatment_added')::text as treatment_added_count,
          count(*) filter (where event_name = 'booking_treatment_removed')::text as treatment_removed_count,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
          count(*) filter (where event_name = 'booking_step_view' and metadata->>'step' = '1')::text as step_one_view_count,
          count(*) filter (where event_name = 'booking_step_view' and metadata->>'step' = '2')::text as step_two_view_count,
          count(*) filter (where event_name = 'booking_step_view' and metadata->>'step' = '3')::text as step_three_view_count,
          count(*) filter (where event_name = 'booking_date_selected')::text as date_selected_count,
          count(*) filter (where event_name = 'booking_time_selected')::text as time_selected_count,
          count(*) filter (where event_name = 'booking_sheet_close')::text as sheet_close_count,
          count(*) filter (where event_name = 'booking_idle_abandon')::text as idle_abandon_count,
          count(*) filter (where event_name = 'booking_validation_error')::text as validation_error_count,
          count(*) filter (where event_name = 'booking_save_failed')::text as save_failed_count,
          count(*) filter (where event_name = 'booking_whatsapp_submit')::text as whatsapp_submit_count,
          count(*) filter (where event_name = 'booking_requirements_completed_whatsapp_submit')::text as completed_whatsapp_submit_count
        from booking_flow_events
        ${whereClause}
        group by 1
        order by tracked_date desc`,
        values
      ),
      pool.query<{
        booking_type: string;
        sheet_open_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
      }>(
        `select
          booking_type,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
          count(*) filter (where event_name = 'booking_whatsapp_submit')::text as whatsapp_submit_count,
          count(*) filter (where event_name = 'booking_requirements_completed_whatsapp_submit')::text as completed_whatsapp_submit_count
        from booking_flow_events
        ${whereClause}
        group by booking_type
        order by booking_type asc`,
        values
      ),
      pool.query<{
        source: string | null;
        medium: string | null;
        sheet_open_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
      }>(
        `select
          coalesce(source, 'direct') as source,
          coalesce(medium, 'none') as medium,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
          count(*) filter (where event_name = 'booking_whatsapp_submit')::text as whatsapp_submit_count,
          count(*) filter (where event_name = 'booking_requirements_completed_whatsapp_submit')::text as completed_whatsapp_submit_count
        from booking_flow_events
        ${whereClause}
        group by coalesce(source, 'direct'), coalesce(medium, 'none')
        order by
          count(*) filter (where event_name = 'booking_sheet_open') desc,
          count(*) filter (where event_name = 'booking_whatsapp_submit') desc,
          source asc,
          medium asc`,
        values
      ),
      pool.query<{
        campaign: string | null;
        sheet_open_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
      }>(
        `select
          coalesce(campaign, '(not set)') as campaign,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
          count(*) filter (where event_name = 'booking_whatsapp_submit')::text as whatsapp_submit_count,
          count(*) filter (where event_name = 'booking_requirements_completed_whatsapp_submit')::text as completed_whatsapp_submit_count
        from booking_flow_events
        ${whereClause}
        group by coalesce(campaign, '(not set)')
        order by
          count(*) filter (where event_name = 'booking_sheet_open') desc,
          count(*) filter (where event_name = 'booking_whatsapp_submit') desc,
          campaign asc`,
        values
      ),
      pool.query<{
        landing_page: string | null;
        sheet_open_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
      }>(
        `select
          coalesce(landing_page, '/') as landing_page,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
          count(*) filter (where event_name = 'booking_whatsapp_submit')::text as whatsapp_submit_count,
          count(*) filter (where event_name = 'booking_requirements_completed_whatsapp_submit')::text as completed_whatsapp_submit_count
        from booking_flow_events
        ${whereClause}
        group by coalesce(landing_page, '/')
        order by
          count(*) filter (where event_name = 'booking_sheet_open') desc,
          count(*) filter (where event_name = 'booking_whatsapp_submit') desc,
          landing_page asc`,
        values
      ),
    ]);

    const row = summaryResult.rows[0];
    const serviceCtaClickCount = Number(row?.service_cta_click_count ?? 0);
    const treatmentAddedCount = Number(row?.treatment_added_count ?? 0);
    const treatmentRemovedCount = Number(row?.treatment_removed_count ?? 0);
    const sheetOpenCount = Number(row?.sheet_open_count ?? 0);
    const stepOneViewCount = Number(row?.step_one_view_count ?? 0);
    const stepTwoViewCount = Number(row?.step_two_view_count ?? 0);
    const stepThreeViewCount = Number(row?.step_three_view_count ?? 0);
    const dateSelectedCount = Number(row?.date_selected_count ?? 0);
    const timeSelectedCount = Number(row?.time_selected_count ?? 0);
    const sheetCloseCount = Number(row?.sheet_close_count ?? 0);
    const idleAbandonCount = Number(row?.idle_abandon_count ?? 0);
    const validationErrorCount = Number(row?.validation_error_count ?? 0);
    const saveFailedCount = Number(row?.save_failed_count ?? 0);
    const whatsappSubmitCount = Number(row?.whatsapp_submit_count ?? 0);
    const completedWhatsappSubmitCount = Number(
      row?.completed_whatsapp_submit_count ?? 0
    );

    const summary: BookingFlowMetricsSummary = {
      serviceCtaClickCount,
      treatmentAddedCount,
      treatmentRemovedCount,
      sheetOpenCount,
      stepOneViewCount,
      stepTwoViewCount,
      stepThreeViewCount,
      dateSelectedCount,
      timeSelectedCount,
      sheetCloseCount,
      idleAbandonCount,
      validationErrorCount,
      saveFailedCount,
      whatsappSubmitCount,
      completedWhatsappSubmitCount,
      openToStepTwoRate: sheetOpenCount > 0 ? stepTwoViewCount / sheetOpenCount : null,
      stepThreeToSubmitRate:
        stepThreeViewCount > 0 ? whatsappSubmitCount / stepThreeViewCount : null,
      openToSubmitRate: sheetOpenCount > 0 ? whatsappSubmitCount / sheetOpenCount : null,
      submitCompletionRate:
        whatsappSubmitCount > 0
          ? completedWhatsappSubmitCount / whatsappSubmitCount
          : null,
      firstTrackedAt: row?.first_tracked_at ?? null,
      lastTrackedAt: row?.last_tracked_at ?? null,
    };

    const dailyRows: BookingFlowMetricsDailyRow[] = dailyRowsResult.rows.map((dailyRow) => ({
      trackedDate: dailyRow.tracked_date,
      ...buildMetricsBreakdownRow({
        sheetOpenCount: dailyRow.sheet_open_count,
        serviceCtaClickCount: dailyRow.service_cta_click_count,
        treatmentAddedCount: dailyRow.treatment_added_count,
        treatmentRemovedCount: dailyRow.treatment_removed_count,
        stepOneViewCount: dailyRow.step_one_view_count,
        stepTwoViewCount: dailyRow.step_two_view_count,
        stepThreeViewCount: dailyRow.step_three_view_count,
        dateSelectedCount: dailyRow.date_selected_count,
        timeSelectedCount: dailyRow.time_selected_count,
        sheetCloseCount: dailyRow.sheet_close_count,
        idleAbandonCount: dailyRow.idle_abandon_count,
        validationErrorCount: dailyRow.validation_error_count,
        saveFailedCount: dailyRow.save_failed_count,
        whatsappSubmitCount: dailyRow.whatsapp_submit_count,
        completedWhatsappSubmitCount: dailyRow.completed_whatsapp_submit_count,
      }),
    }));

    const bookingTypeRows: BookingFlowMetricsBookingTypeRow[] = bookingTypeRowsResult.rows.map(
      (bookingTypeRow) => ({
        bookingType: bookingTypeRow.booking_type,
        ...buildMetricsBreakdownRow({
          sheetOpenCount: bookingTypeRow.sheet_open_count,
          whatsappSubmitCount: bookingTypeRow.whatsapp_submit_count,
          completedWhatsappSubmitCount: bookingTypeRow.completed_whatsapp_submit_count,
        }),
      })
    );

    const sourceRows: BookingFlowMetricsSourceRow[] = sourceRowsResult.rows.map((sourceRow) => ({
      source: sourceRow.source ?? "direct",
      medium: sourceRow.medium ?? "none",
      ...buildMetricsBreakdownRow({
        sheetOpenCount: sourceRow.sheet_open_count,
        whatsappSubmitCount: sourceRow.whatsapp_submit_count,
        completedWhatsappSubmitCount: sourceRow.completed_whatsapp_submit_count,
      }),
    }));

    const campaignRows: BookingFlowMetricsCampaignRow[] = campaignRowsResult.rows.map(
      (campaignRow) => ({
        campaign: campaignRow.campaign ?? "(not set)",
        ...buildMetricsBreakdownRow({
          sheetOpenCount: campaignRow.sheet_open_count,
          whatsappSubmitCount: campaignRow.whatsapp_submit_count,
          completedWhatsappSubmitCount: campaignRow.completed_whatsapp_submit_count,
        }),
      })
    );

    const landingPageRows: BookingFlowMetricsLandingPageRow[] = landingPageRowsResult.rows.map(
      (landingPageRow) => ({
        landingPage: landingPageRow.landing_page ?? "/",
        ...buildMetricsBreakdownRow({
          sheetOpenCount: landingPageRow.sheet_open_count,
          whatsappSubmitCount: landingPageRow.whatsapp_submit_count,
          completedWhatsappSubmitCount: landingPageRow.completed_whatsapp_submit_count,
        }),
      })
    );

    return {
      summary,
      dailyRows,
      bookingTypeRows,
      sourceRows,
      campaignRows,
      landingPageRows,
      activeFrom,
      activeTo,
    };
  } catch (error) {
    if (isMissingRelationError(error)) {
      return {
        summary: {
          serviceCtaClickCount: 0,
          treatmentAddedCount: 0,
          treatmentRemovedCount: 0,
          sheetOpenCount: 0,
          stepOneViewCount: 0,
          stepTwoViewCount: 0,
          stepThreeViewCount: 0,
          dateSelectedCount: 0,
          timeSelectedCount: 0,
          sheetCloseCount: 0,
          idleAbandonCount: 0,
          validationErrorCount: 0,
          saveFailedCount: 0,
          whatsappSubmitCount: 0,
          completedWhatsappSubmitCount: 0,
          openToStepTwoRate: null,
          stepThreeToSubmitRate: null,
          openToSubmitRate: null,
          submitCompletionRate: null,
          firstTrackedAt: null,
          lastTrackedAt: null,
        },
        dailyRows: [],
        bookingTypeRows: [],
        sourceRows: [],
        campaignRows: [],
        landingPageRows: [],
        activeFrom,
        activeTo,
      };
    }

    throw error;
  }
}
