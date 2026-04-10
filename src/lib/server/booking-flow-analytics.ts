import "server-only";

import { getPostgresPool } from "@/lib/server/postgres";
import type {
  BookingFlowMetricsBookingTypeRow,
  BookingFlowEventPayload,
  BookingFlowMetricsDashboard,
  BookingFlowMetricsFilters,
  BookingFlowMetricsDailyRow,
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
    if (isMissingRelationError(error)) {
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
    const [summaryResult, dailyRowsResult, bookingTypeRowsResult, sourceRowsResult] = await Promise.all([
      pool.query<{
        sheet_open_count: string;
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
        first_tracked_at: string | null;
        last_tracked_at: string | null;
      }>(
        `select
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
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
        whatsapp_submit_count: string;
        completed_whatsapp_submit_count: string;
      }>(
        `select
          ((created_at at time zone 'Africa/Johannesburg')::date)::text as tracked_date,
          count(*) filter (where event_name = 'booking_sheet_open')::text as sheet_open_count,
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
    ]);

    const row = summaryResult.rows[0];
    const sheetOpenCount = Number(row?.sheet_open_count ?? 0);
    const whatsappSubmitCount = Number(row?.whatsapp_submit_count ?? 0);
    const completedWhatsappSubmitCount = Number(
      row?.completed_whatsapp_submit_count ?? 0
    );

    const summary: BookingFlowMetricsSummary = {
      sheetOpenCount,
      whatsappSubmitCount,
      completedWhatsappSubmitCount,
      openToSubmitRate: sheetOpenCount > 0 ? whatsappSubmitCount / sheetOpenCount : null,
      submitCompletionRate:
        whatsappSubmitCount > 0
          ? completedWhatsappSubmitCount / whatsappSubmitCount
          : null,
      firstTrackedAt: row?.first_tracked_at ?? null,
      lastTrackedAt: row?.last_tracked_at ?? null,
    };

    const dailyRows: BookingFlowMetricsDailyRow[] = dailyRowsResult.rows.map((dailyRow) => {
      const dailySheetOpenCount = Number(dailyRow.sheet_open_count ?? 0);
      const dailyWhatsappSubmitCount = Number(dailyRow.whatsapp_submit_count ?? 0);
      const dailyCompletedWhatsappSubmitCount = Number(
        dailyRow.completed_whatsapp_submit_count ?? 0
      );

      return {
        trackedDate: dailyRow.tracked_date,
        sheetOpenCount: dailySheetOpenCount,
        whatsappSubmitCount: dailyWhatsappSubmitCount,
        completedWhatsappSubmitCount: dailyCompletedWhatsappSubmitCount,
        openToSubmitRate:
          dailySheetOpenCount > 0
            ? dailyWhatsappSubmitCount / dailySheetOpenCount
            : null,
        submitCompletionRate:
          dailyWhatsappSubmitCount > 0
            ? dailyCompletedWhatsappSubmitCount / dailyWhatsappSubmitCount
            : null,
      };
    });

    const bookingTypeRows: BookingFlowMetricsBookingTypeRow[] = bookingTypeRowsResult.rows.map(
      (bookingTypeRow) => {
        const bookingTypeSheetOpenCount = Number(bookingTypeRow.sheet_open_count ?? 0);
        const bookingTypeWhatsappSubmitCount = Number(
          bookingTypeRow.whatsapp_submit_count ?? 0
        );
        const bookingTypeCompletedWhatsappSubmitCount = Number(
          bookingTypeRow.completed_whatsapp_submit_count ?? 0
        );

        return {
          bookingType: bookingTypeRow.booking_type,
          sheetOpenCount: bookingTypeSheetOpenCount,
          whatsappSubmitCount: bookingTypeWhatsappSubmitCount,
          completedWhatsappSubmitCount: bookingTypeCompletedWhatsappSubmitCount,
          openToSubmitRate:
            bookingTypeSheetOpenCount > 0
              ? bookingTypeWhatsappSubmitCount / bookingTypeSheetOpenCount
              : null,
          submitCompletionRate:
            bookingTypeWhatsappSubmitCount > 0
              ? bookingTypeCompletedWhatsappSubmitCount / bookingTypeWhatsappSubmitCount
              : null,
        };
      }
    );

    const sourceRows: BookingFlowMetricsSourceRow[] = sourceRowsResult.rows.map((sourceRow) => {
      const sourceSheetOpenCount = Number(sourceRow.sheet_open_count ?? 0);
      const sourceWhatsappSubmitCount = Number(sourceRow.whatsapp_submit_count ?? 0);
      const sourceCompletedWhatsappSubmitCount = Number(
        sourceRow.completed_whatsapp_submit_count ?? 0
      );

      return {
        source: sourceRow.source ?? "direct",
        medium: sourceRow.medium ?? "none",
        sheetOpenCount: sourceSheetOpenCount,
        whatsappSubmitCount: sourceWhatsappSubmitCount,
        completedWhatsappSubmitCount: sourceCompletedWhatsappSubmitCount,
        openToSubmitRate:
          sourceSheetOpenCount > 0
            ? sourceWhatsappSubmitCount / sourceSheetOpenCount
            : null,
        submitCompletionRate:
          sourceWhatsappSubmitCount > 0
            ? sourceCompletedWhatsappSubmitCount / sourceWhatsappSubmitCount
            : null,
      };
    });

    return {
      summary,
      dailyRows,
      bookingTypeRows,
      sourceRows,
      activeFrom,
      activeTo,
    };
  } catch (error) {
    if (isMissingRelationError(error)) {
      return {
        summary: {
          sheetOpenCount: 0,
          whatsappSubmitCount: 0,
          completedWhatsappSubmitCount: 0,
          openToSubmitRate: null,
          submitCompletionRate: null,
          firstTrackedAt: null,
          lastTrackedAt: null,
        },
        dailyRows: [],
        bookingTypeRows: [],
        sourceRows: [],
        activeFrom,
        activeTo,
      };
    }

    throw error;
  }
}
