import "server-only";

import { getPostgresPool } from "@/lib/server/postgres";
import {
  BOOKING_STATUSES,
  type BookingAdminRecord,
  type BookingStatus,
} from "@/lib/bookings-admin-shared";
import { ensureBookingLeadsSchema } from "@/lib/server/booking-leads-schema";

export interface BookingAdminFilters {
  status?: string;
  bookingType?: string;
  clientName?: string;
  phone?: string;
  email?: string;
  bookingReference?: string;
  source?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface BookingAdminListResult {
  bookings: BookingAdminRecord[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
}

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function isIsoDate(value?: string) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

const SORTABLE_COLUMNS = {
  createdAt: "created_at",
  clientName: "client_name",
  preferredDate: "preferred_date",
  totalValue: "total_value",
  source: "source",
  status: "status",
} as const;

function normalizePageSize(pageSize?: number) {
  if (!pageSize || !Number.isFinite(pageSize)) {
    return 50;
  }

  return Math.min(Math.max(Math.floor(pageSize), 10), 200);
}

function normalizePage(page?: number) {
  if (!page || !Number.isFinite(page)) {
    return 1;
  }

  return Math.max(Math.floor(page), 1);
}

function normalizeSortBy(sortBy?: string) {
  return sortBy && sortBy in SORTABLE_COLUMNS ? sortBy : "createdAt";
}

function normalizeSortDirection(direction?: string): "asc" | "desc" {
  return direction === "asc" ? "asc" : "desc";
}

function buildBookingsBaseQuery(filters: BookingAdminFilters = {}) {
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

  const clientName = cleanValue(filters.clientName);
  if (clientName) {
    values.push(`%${clientName.toLowerCase()}%`);
    const placeholder = `$${values.length}`;
    conditions.push(`lower(client_name) like ${placeholder}`);
  }

  const phone = cleanValue(filters.phone);
  if (phone) {
    values.push(`%${phone.toLowerCase()}%`);
    const placeholder = `$${values.length}`;
    conditions.push(`lower(phone) like ${placeholder}`);
  }

  const email = cleanValue(filters.email);
  if (email) {
    values.push(`%${email.toLowerCase()}%`);
    const placeholder = `$${values.length}`;
    conditions.push(`lower(coalesce(email, '')) like ${placeholder}`);
  }

  const bookingReference = cleanValue(filters.bookingReference);
  if (bookingReference) {
    values.push(`%${bookingReference.toLowerCase()}%`);
    const placeholder = `$${values.length}`;
    conditions.push(`lower(coalesce(booking_reference, '')) like ${placeholder}`);
  }

  const source = cleanValue(filters.source);
  if (source) {
    values.push(`%${source.toLowerCase()}%`);
    const placeholder = `$${values.length}`;
    conditions.push(`lower(coalesce(source, '')) like ${placeholder}`);
  }

  const from = cleanValue(filters.from);
  if (from && isIsoDate(from)) {
    values.push(from);
    conditions.push(`preferred_date >= $${values.length}::date`);
  }

  const to = cleanValue(filters.to);
  if (to && isIsoDate(to)) {
    values.push(to);
    conditions.push(`preferred_date <= $${values.length}::date`);
  }

  const sortBy = normalizeSortBy(filters.sortBy);
  const sortDirection = normalizeSortDirection(filters.sortDirection);
  const sortColumn = SORTABLE_COLUMNS[sortBy as keyof typeof SORTABLE_COLUMNS];
  const whereClause = conditions.length > 0 ? `where ${conditions.join(" and ")}` : "";

  return {
    values,
    whereClause,
    sortBy,
    sortDirection,
    sortColumn,
  };
}

function getBookingsSelectSql({
  whereClause,
  sortColumn,
  sortDirection,
  limitClause = "",
}: {
  whereClause: string;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  limitClause?: string;
}) {
  return `select
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
    order by ${sortColumn} ${sortDirection}, created_at desc
    ${limitClause}`;
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

export async function listBookings(filters: BookingAdminFilters = {}): Promise<BookingAdminListResult> {
  const pool = getPostgresPool();
  const { values, whereClause, sortBy, sortDirection, sortColumn } =
    buildBookingsBaseQuery(filters);
  const pageSize = normalizePageSize(filters.pageSize);
  const page = normalizePage(filters.page);
  const offset = (page - 1) * pageSize;

  values.push(pageSize);
  const limitPlaceholder = `$${values.length}`;
  values.push(offset);
  const offsetPlaceholder = `$${values.length}`;

  const countResult = await pool.query<{ count: string }>(
    `select count(*)::text as count
     from bookings
     ${whereClause}`,
    values.slice(0, values.length - 2)
  );

  const result = await pool.query(
    getBookingsSelectSql({
      whereClause,
      sortColumn,
      sortDirection,
      limitClause: `limit ${limitPlaceholder}
    offset ${offsetPlaceholder}`,
    }),
    values
  );

  const totalCount = Number(countResult.rows[0]?.count ?? 0);
  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

  return {
    bookings: result.rows.map((row) => mapRow(row)),
    totalCount,
    page,
    pageSize,
    totalPages,
    sortBy,
    sortDirection,
  };
}

export async function listBookingsForExport(filters: BookingAdminFilters = {}) {
  const pool = getPostgresPool();
  const { values, whereClause, sortColumn, sortDirection } =
    buildBookingsBaseQuery(filters);

  const result = await pool.query(
    getBookingsSelectSql({
      whereClause,
      sortColumn,
      sortDirection,
    }),
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

export interface BookingLeadRecord {
  id: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  bookingType: "treatment" | "consultation";
  consultationContext: string | null;
  clientName: string | null;
  phone: string | null;
  email: string | null;
  preferredDate: string | null;
  preferredTimeSlot: string | null;
  treatmentsJson: any;
  treatmentCount: number;
  totalValue: number | null;
  status: string;
  contactedAt: string | null;
  adminNotes: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  landingPage: string | null;
  enquiryPage: string | null;
  referrerHost: string | null;
}

export async function listBookingLeads(): Promise<BookingLeadRecord[]> {
  await ensureBookingLeadsSchema();
  const pool = getPostgresPool();
  const result = await pool.query(
    `select
      id,
      session_id,
      created_at,
      updated_at,
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
      status,
      contacted_at,
      admin_notes,
      source,
      medium,
      campaign,
      landing_page,
      enquiry_page,
      referrer_host
     from booking_leads
     where status != 'submitted'
     order by updated_at desc`
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    sessionId: String(row.session_id),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    bookingType: row.booking_type as "treatment" | "consultation",
    consultationContext: (row.consultation_context as string | null) ?? null,
    clientName: (row.client_name as string | null) ?? null,
    phone: (row.phone as string | null) ?? null,
    email: (row.email as string | null) ?? null,
    preferredDate: row.preferred_date ? String(row.preferred_date) : null,
    preferredTimeSlot: (row.preferred_time_slot as string | null) ?? null,
    treatmentsJson: row.treatments_json,
    treatmentCount: Number(row.treatment_count ?? 0),
    totalValue: row.total_value === null ? null : Number(row.total_value),
    status: String(row.status),
    contactedAt: (row.contacted_at as string | null) ?? null,
    adminNotes: (row.admin_notes as string | null) ?? null,
    source: (row.source as string | null) ?? null,
    medium: (row.medium as string | null) ?? null,
    campaign: (row.campaign as string | null) ?? null,
    landingPage: (row.landing_page as string | null) ?? null,
    enquiryPage: (row.enquiry_page as string | null) ?? null,
    referrerHost: (row.referrer_host as string | null) ?? null,
  }));
}

export async function updateBookingLeadFields({
  id,
  status,
  adminNotes,
}: {
  id: string;
  status: string;
  adminNotes?: string | null;
}) {
  await ensureBookingLeadsSchema();
  const pool = getPostgresPool();
  const normalizedNotes = adminNotes?.trim() ? adminNotes.trim() : null;

  const result = await pool.query(
    `update booking_leads
     set
       status = $2,
       admin_notes = $3,
       contacted_at = case
         when $2 = 'contacted' and contacted_at is null
           then now()
         else contacted_at
       end,
       updated_at = now()
     where id = $1
     returning id`,
    [id, status, normalizedNotes]
  );

  return (result.rowCount ?? 0) > 0;
}
