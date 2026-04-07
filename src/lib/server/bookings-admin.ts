import "server-only";

import { getPostgresPool } from "@/lib/server/postgres";
import {
  BOOKING_STATUSES,
  type BookingAdminRecord,
  type BookingStatus,
} from "@/lib/bookings-admin-shared";

export interface BookingAdminFilters {
  status?: string;
  bookingType?: string;
  query?: string;
  from?: string;
  to?: string;
  limit?: number;
}

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function isIsoDate(value?: string) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

function normalizeLimit(limit?: number) {
  if (!limit || !Number.isFinite(limit)) {
    return 100;
  }

  return Math.min(Math.max(Math.floor(limit), 1), 250);
}

function mapRow(row: Record<string, unknown>): BookingAdminRecord {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    status: String(row.status),
    bookingType: String(row.booking_type),
    consultationContext: (row.consultation_context as string | null) ?? null,
    clientName: String(row.client_name),
    phone: String(row.phone),
    email: (row.email as string | null) ?? null,
    preferredDate: String(row.preferred_date),
    preferredTimeSlot: String(row.preferred_time_slot),
    treatmentCount: Number(row.treatment_count ?? 0),
    totalValue:
      row.total_value === null || row.total_value === undefined
        ? null
        : Number(row.total_value),
    currency: (row.currency as string | null) ?? null,
    bookingReference: (row.booking_reference as string | null) ?? null,
    whatsappMessage: String(row.whatsapp_message ?? ""),
    whatsappDestination: (row.whatsapp_destination as string | null) ?? null,
    source: (row.source as string | null) ?? null,
    medium: (row.medium as string | null) ?? null,
    campaign: (row.campaign as string | null) ?? null,
    landingPage: (row.landing_page as string | null) ?? null,
    enquiryPage: (row.enquiry_page as string | null) ?? null,
    referrerHost: (row.referrer_host as string | null) ?? null,
    adminNotes: (row.admin_notes as string | null) ?? null,
    contactedAt: (row.contacted_at as string | null) ?? null,
    treatmentsJson: row.treatments_json,
  };
}

export function normalizeBookingStatus(input?: string) {
  return BOOKING_STATUSES.includes(input as BookingStatus)
    ? (input as BookingStatus)
    : "new";
}

export async function listBookings(filters: BookingAdminFilters = {}) {
  const pool = getPostgresPool();
  const values: Array<string | number> = [];
  const conditions: string[] = [];

  const status = cleanValue(filters.status);
  if (status && status !== "all") {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  const bookingType = cleanValue(filters.bookingType);
  if (bookingType && bookingType !== "all") {
    values.push(bookingType);
    conditions.push(`booking_type = $${values.length}`);
  }

  const query = cleanValue(filters.query);
  if (query) {
    values.push(`%${query.toLowerCase()}%`);
    const placeholder = `$${values.length}`;
    conditions.push(`(
      lower(client_name) like ${placeholder}
      or lower(phone) like ${placeholder}
      or lower(coalesce(email, '')) like ${placeholder}
      or lower(coalesce(booking_reference, '')) like ${placeholder}
    )`);
  }

  const from = cleanValue(filters.from);
  if (isIsoDate(from)) {
    values.push(from!);
    conditions.push(`preferred_date >= $${values.length}::date`);
  }

  const to = cleanValue(filters.to);
  if (isIsoDate(to)) {
    values.push(to!);
    conditions.push(`preferred_date <= $${values.length}::date`);
  }

  const limit = normalizeLimit(filters.limit);
  values.push(limit);
  const limitPlaceholder = `$${values.length}`;
  const whereClause = conditions.length > 0 ? `where ${conditions.join(" and ")}` : "";

  const result = await pool.query(
    `select
      id,
      created_at,
      updated_at,
      status,
      booking_type,
      consultation_context,
      client_name,
      phone,
      email,
      preferred_date,
      preferred_time_slot,
      treatments_json,
      treatment_count,
      total_value,
      currency,
      booking_reference,
      whatsapp_message,
      whatsapp_destination,
      source,
      medium,
      campaign,
      landing_page,
      enquiry_page,
      referrer_host,
      admin_notes,
      contacted_at
    from bookings
    ${whereClause}
    order by created_at desc
    limit ${limitPlaceholder}`,
    values
  );

  return result.rows.map((row) => mapRow(row));
}

export async function updateBookingAdminFields({
  id,
  status,
  adminNotes,
}: {
  id: string;
  status: string;
  adminNotes?: string | null;
}) {
  const pool = getPostgresPool();
  const normalizedStatus = normalizeBookingStatus(status);
  const normalizedNotes = cleanValue(adminNotes ?? undefined) ?? null;

  const result = await pool.query(
    `update bookings
     set
       status = $2,
       admin_notes = $3,
       contacted_at = case
         when $2 in ('contacted', 'awaiting_deposit', 'confirmed', 'completed')
              and contacted_at is null
           then now()
         else contacted_at
       end
     where id = $1
     returning
       id,
       created_at,
       updated_at,
       status,
       booking_type,
       consultation_context,
       client_name,
       phone,
       email,
       preferred_date,
       preferred_time_slot,
       treatments_json,
       treatment_count,
       total_value,
       currency,
       booking_reference,
       whatsapp_message,
       whatsapp_destination,
       source,
       medium,
       campaign,
       landing_page,
       enquiry_page,
       referrer_host,
       admin_notes,
       contacted_at`,
    [id, normalizedStatus, normalizedNotes]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return mapRow(result.rows[0]);
}

function escapeCsvValue(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);
  const escaped = stringValue.replace(/"/g, "\"\"");
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function buildBookingsCsv(bookings: BookingAdminRecord[]) {
  const headers = [
    "id",
    "created_at",
    "updated_at",
    "status",
    "booking_type",
    "consultation_context",
    "client_name",
    "phone",
    "email",
    "preferred_date",
    "preferred_time_slot",
    "treatment_count",
    "total_value",
    "currency",
    "booking_reference",
    "source",
    "medium",
    "campaign",
    "landing_page",
    "enquiry_page",
    "referrer_host",
    "contacted_at",
    "admin_notes",
    "treatments_json",
    "whatsapp_message",
  ];

  const rows = bookings.map((booking) =>
    [
      booking.id,
      booking.createdAt,
      booking.updatedAt,
      booking.status,
      booking.bookingType,
      booking.consultationContext,
      booking.clientName,
      booking.phone,
      booking.email,
      booking.preferredDate,
      booking.preferredTimeSlot,
      booking.treatmentCount,
      booking.totalValue,
      booking.currency,
      booking.bookingReference,
      booking.source,
      booking.medium,
      booking.campaign,
      booking.landingPage,
      booking.enquiryPage,
      booking.referrerHost,
      booking.contactedAt,
      booking.adminNotes,
      JSON.stringify(booking.treatmentsJson),
      booking.whatsappMessage,
    ]
      .map((value) => escapeCsvValue(value))
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
