import "server-only";

import { getPostgresPool } from "@/lib/server/postgres";
import type {
  BookingFlowEventPayload,
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
  const pool = getPostgresPool();

  try {
    const result = await pool.query<{
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
      from booking_flow_events`
    );

    const row = result.rows[0];
    const sheetOpenCount = Number(row?.sheet_open_count ?? 0);
    const whatsappSubmitCount = Number(row?.whatsapp_submit_count ?? 0);
    const completedWhatsappSubmitCount = Number(row?.completed_whatsapp_submit_count ?? 0);

    return {
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
  } catch (error) {
    if (isMissingRelationError(error)) {
      return {
        sheetOpenCount: 0,
        whatsappSubmitCount: 0,
        completedWhatsappSubmitCount: 0,
        openToSubmitRate: null,
        submitCompletionRate: null,
        firstTrackedAt: null,
        lastTrackedAt: null,
      };
    }

    throw error;
  }
}
