import Link from "next/link";
import { requireAdminAuth } from "@/lib/server/admin-auth";
import { listBookings, listBookingLeads } from "@/lib/server/bookings-admin";
import { getBookingFlowMetricsDashboard } from "@/lib/server/booking-flow-analytics";
import { getSiteMonitoringMetrics } from "@/lib/server/site-monitoring-events";
import { getSubscriberSummary, listSubscribersForAdmin } from "@/lib/server/subscribers";
import { BOOKING_STATUSES } from "@/lib/bookings-admin-shared";
import { BookingsAdminClient } from "@/app/admin/bookings/BookingsAdminClient";
import { BookingLeadsAdminClient } from "@/app/admin/bookings/BookingLeadsAdminClient";
import { EmailCampaignClient } from "@/app/admin/bookings/EmailCampaignClient";
import { LogoutButton } from "@/app/admin/bookings/LogoutButton";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface BookingsPageProps {
  searchParams: Promise<{
    status?: string;
    bookingType?: string;
    clientName?: string;
    phone?: string;
    email?: string;
    bookingReference?: string;
    source?: string;
    from?: string;
    to?: string;
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortDirection?: string;
    eventsFrom?: string;
    eventsTo?: string;
    tab?: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatUtcDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTodayInJohannesburg() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === "year")?.value ?? "0");
  const month = Number(parts.find((part) => part.type === "month")?.value ?? "1");
  const day = Number(parts.find((part) => part.type === "day")?.value ?? "1");

  return new Date(Date.UTC(year, month - 1, day));
}

function getDatePresets() {
  const today = getTodayInJohannesburg();
  const dayOfWeek = today.getUTCDay();
  const weekOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const weekStart = new Date(today);
  weekStart.setUTCDate(today.getUTCDate() - weekOffset);

  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

  const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  const monthEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0));

  return [
    { label: "Today", from: formatUtcDate(today), to: formatUtcDate(today) },
    { label: "This week", from: formatUtcDate(weekStart), to: formatUtcDate(weekEnd) },
    { label: "This month", from: formatUtcDate(monthStart), to: formatUtcDate(monthEnd) },
  ];
}

function buildQueryString({
  status,
  bookingType,
  clientName,
  phone,
  email,
  bookingReference,
  source,
  from,
  to,
  page,
  pageSize,
  sortBy,
  sortDirection,
  eventsFrom,
  eventsTo,
  tab,
}: {
  status?: string;
  bookingType?: string;
  clientName?: string;
  phone?: string;
  email?: string;
  bookingReference?: string;
  source?: string;
  from?: string;
  to?: string;
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortDirection?: string;
  eventsFrom?: string;
  eventsTo?: string;
  tab?: string;
}) {
  const params = new URLSearchParams();

  if (tab && tab !== "bookings") {
    params.set("tab", tab);
  }
  if (status && status !== "all") {
    params.set("status", status);
  }
  if (bookingType && bookingType !== "all") {
    params.set("bookingType", bookingType);
  }
  if (clientName) {
    params.set("clientName", clientName);
  }
  if (phone) {
    params.set("phone", phone);
  }
  if (email) {
    params.set("email", email);
  }
  if (bookingReference) {
    params.set("bookingReference", bookingReference);
  }
  if (source) {
    params.set("source", source);
  }
  if (from) {
    params.set("from", from);
  }
  if (to) {
    params.set("to", to);
  }
  if (page && page !== "1") {
    params.set("page", page);
  }
  if (pageSize && pageSize !== "50") {
    params.set("pageSize", pageSize);
  }
  if (sortBy && sortBy !== "createdAt") {
    params.set("sortBy", sortBy);
  }
  if (sortDirection && sortDirection !== "desc") {
    params.set("sortDirection", sortDirection);
  }
  if (eventsFrom) {
    params.set("eventsFrom", eventsFrom);
  }
  if (eventsTo) {
    params.set("eventsTo", eventsTo);
  }

  return params.toString();
}

function buildExportHref(filters: Parameters<typeof buildQueryString>[0]) {
  const queryString = buildQueryString(filters);
  return queryString ? `/admin/bookings/export?${queryString}` : "/admin/bookings/export";
}

function buildPageHref(filters: Parameters<typeof buildQueryString>[0]) {
  const queryString = buildQueryString(filters);
  return queryString ? `/admin/bookings?${queryString}` : "/admin/bookings";
}

function parsePositiveNumber(value?: string, fallback = 1) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "-";
  }

  return `${(value * 100).toFixed(1)}%`;
}

function formatTrackedAt(value: string | null) {
  if (!value) {
    return "Waiting for first tracked event";
  }

  return new Date(value).toLocaleString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Johannesburg",
  });
}

function formatTrackingWindow({
  firstTrackedAt,
  lastTrackedAt,
}: {
  firstTrackedAt: string | null;
  lastTrackedAt: string | null;
}) {
  if (!firstTrackedAt || !lastTrackedAt) {
    return "No tracked booking flow events recorded yet.";
  }

  return `Tracked between ${formatTrackedAt(firstTrackedAt)} and ${formatTrackedAt(lastTrackedAt)}.`;
}

function formatEventDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-ZA", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Africa/Johannesburg",
  });
}

function formatBookingTypeLabel(value: string) {
  return value.replace(/_/g, " ");
}

function formatEventNameLabel(value: string) {
  return value.replace(/_/g, " ");
}

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams;
  await requireAdminAuth("/admin/bookings");
  const datePresets = getDatePresets();

  const tab = params.tab?.trim() || "bookings";
  const status = params.status?.trim() || "all";
  const bookingType = params.bookingType?.trim() || "all";
  const clientName = params.clientName?.trim() || "";
  const phone = params.phone?.trim() || "";
  const email = params.email?.trim() || "";
  const bookingReference = params.bookingReference?.trim() || "";
  const source = params.source?.trim() || "";
  const from = params.from?.trim() || "";
  const to = params.to?.trim() || "";
  const page = String(parsePositiveNumber(params.page, 1));
  const pageSize = String(parsePositiveNumber(params.pageSize, 50));
  const sortBy = params.sortBy?.trim() || "createdAt";
  const sortDirection = params.sortDirection?.trim() === "asc" ? "asc" : "desc";
  const eventsFrom = params.eventsFrom?.trim() || "";
  const eventsTo = params.eventsTo?.trim() || "";

  const [bookingResult, bookingFlowDashboard, siteMonitoringRows, subscriberSummary, subscribers, bookingLeads] = await Promise.all([
    listBookings({
      status,
      bookingType,
      clientName,
      phone,
      email,
      bookingReference,
      source,
      from,
      to,
      page: Number(page),
      pageSize: Number(pageSize),
      sortBy,
      sortDirection,
    }),
    getBookingFlowMetricsDashboard({
      from: eventsFrom,
      to: eventsTo,
    }),
    getSiteMonitoringMetrics(),
    getSubscriberSummary(),
    listSubscribersForAdmin(),
    listBookingLeads(),
  ]);

  const exportHref = buildExportHref({
    status,
    bookingType,
    clientName,
    phone,
    email,
    bookingReference,
    source,
    from,
    to,
    page: "1",
    pageSize,
    sortBy,
    sortDirection,
    eventsFrom,
    eventsTo,
    tab,
  });

  const sortQueryBase = buildQueryString({
    status,
    bookingType,
    clientName,
    phone,
    email,
    bookingReference,
    source,
    from,
    to,
    page: "1",
    pageSize,
    eventsFrom,
    eventsTo,
    tab,
  });

  const previousPageHref = buildPageHref({
    status,
    bookingType,
    clientName,
    phone,
    email,
    bookingReference,
    source,
    from,
    to,
    page: String(Math.max(bookingResult.page - 1, 1)),
    pageSize,
    sortBy,
    sortDirection,
    eventsFrom,
    eventsTo,
    tab,
  });

  const nextPageHref = buildPageHref({
    status,
    bookingType,
    clientName,
    phone,
    email,
    bookingReference,
    source,
    from,
    to,
    page: String(Math.min(bookingResult.page + 1, bookingResult.totalPages)),
    pageSize,
    sortBy,
    sortDirection,
    eventsFrom,
    eventsTo,
    tab,
  });
  const visibleFrom = bookingResult.totalCount === 0 ? 0 : (bookingResult.page - 1) * bookingResult.pageSize + 1;
  const visibleTo = bookingResult.totalCount === 0 ? 0 : Math.min(bookingResult.page * bookingResult.pageSize, bookingResult.totalCount);

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-foreground flex flex-col md:flex-row">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-admin-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(216, 187, 116, 0.3);
          border-radius: 9999px;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(216, 187, 116, 0.6);
        }
      `}} />
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6 overflow-x-hidden">
        {/* Header section */}
        <header className="rounded-none border border-black/5 bg-[#17120f] p-6 text-white shadow-xl shadow-[#17120f]/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/90">
                Galeo Beauty
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-none">
                {tab === "bookings" && "Bookings Dashboard"}
                {tab === "analytics" && "Booking Flow Analytics"}
                {tab === "subscribers" && "Subscribers Circle"}
                {tab === "leads" && "Booking Recovery Leads"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-2xl">
                {tab === "bookings" && "View appointments, update client statuses, record internal notes, and export records."}
                {tab === "analytics" && "Analyze customer conversion, website funnel drop-offs, campaign traffic, and click-through rates."}
                {tab === "subscribers" && "Draft newsletter specials, review subscription statistics, and manage member circle list."}
                {tab === "leads" && "View incomplete booking attempts, contact abandoned users via WhatsApp, and record recovery logs."}
              </p>
            </div>
            {tab === "bookings" && (
              <div className="flex items-center gap-3">
                <Link
                  href={exportHref}
                  className="rounded-none bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] shadow-md shadow-gold/25 transition-all hover:bg-[#d8bb74] hover:scale-[1.02] active:scale-95"
                >
                  Export CSV
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Tab - BOOKINGS */}
        {tab === "bookings" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter controls */}
            <section className="rounded-none border border-black/5 bg-white p-5 shadow-md shadow-black/[0.02]">
              <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-black/5 pb-4">
                <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                  Quick Date Presets
                </span>
                {datePresets.map((preset) => {
                  const isActive = from === preset.from && to === preset.to;
                  const href = buildPageHref({
                    status,
                    bookingType,
                    clientName,
                    phone,
                    email,
                    bookingReference,
                    source,
                    from: preset.from,
                    to: preset.to,
                    page: "1",
                    pageSize,
                    sortBy,
                    sortDirection,
                    eventsFrom,
                    eventsTo,
                    tab,
                  });

                  return (
                    <Link
                      key={preset.label}
                      href={href}
                      className={`rounded-none px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
                        isActive
                          ? "bg-[#17120f] text-white shadow-sm"
                          : "border border-black/10 text-foreground/60 hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                      }`}
                    >
                      {preset.label}
                    </Link>
                  );
                })}
                <Link
                  href={buildPageHref({
                    status,
                    bookingType,
                    clientName,
                    phone,
                    email,
                    bookingReference,
                    source,
                    from: undefined,
                    to: undefined,
                    page: "1",
                    pageSize,
                    sortBy,
                    sortDirection,
                    eventsFrom,
                    eventsTo,
                    tab,
                  })}
                  className={`rounded-none px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
                    !from && !to
                      ? "bg-[#17120f] text-white shadow-sm"
                      : "border border-black/10 text-foreground/60 hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                  }`}
                >
                  All dates
                </Link>
              </div>

              <form className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                <input type="hidden" name="sortBy" value={sortBy} />
                <input type="hidden" name="sortDirection" value={sortDirection} />
                <input type="hidden" name="page" value="1" />
                <input type="hidden" name="eventsFrom" value={eventsFrom} />
                <input type="hidden" name="eventsTo" value={eventsTo} />
                <input type="hidden" name="tab" value="bookings" />

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Client name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    defaultValue={clientName}
                    placeholder="Search client"
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={phone}
                    placeholder="Filter by phone"
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={email}
                    placeholder="Filter by email"
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={status}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  >
                    <option value="all">All statuses</option>
                    {BOOKING_STATUSES.map((option) => (
                      <option key={option} value={option}>
                        {option.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Booking type
                  </label>
                  <select
                    name="bookingType"
                    defaultValue={bookingType}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  >
                    <option value="all">All types</option>
                    <option value="treatment">Treatment</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Booking reference
                  </label>
                  <input
                    type="text"
                    name="bookingReference"
                    defaultValue={bookingReference}
                    placeholder="Search reference"
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Traffic Source
                  </label>
                  <input
                    type="text"
                    name="source"
                    defaultValue={source}
                    placeholder="Search source (e.g., google)"
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    From booking date
                  </label>
                  <input
                    type="date"
                    name="from"
                    defaultValue={from}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    To booking date
                  </label>
                  <input
                    type="date"
                    name="to"
                    defaultValue={to}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Rows to show
                  </label>
                  <select
                    name="pageSize"
                    defaultValue={pageSize}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  >
                    <option value="25">25 rows</option>
                    <option value="50">50 rows</option>
                    <option value="100">100 rows</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5 sm:col-span-2 md:col-span-3 xl:col-span-5">
                  <button
                    type="submit"
                    className="rounded-none bg-[#17120f] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:text-[#17120f] hover:scale-[1.01] active:scale-95"
                  >
                    Apply Filters
                  </button>
                  <Link
                    href={buildPageHref({
                      status: undefined,
                      bookingType: undefined,
                      clientName: undefined,
                      phone: undefined,
                      email: undefined,
                      bookingReference: undefined,
                      source: undefined,
                      from: undefined,
                      to: undefined,
                      page: "1",
                      pageSize: "50",
                      sortBy: undefined,
                      sortDirection: undefined,
                      eventsFrom,
                      eventsTo,
                      tab,
                    })}
                    className="rounded-none border border-black/10 px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 transition hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                  >
                    Reset Filters
                  </Link>
                  <p className="ml-auto text-xs text-foreground/50 font-medium">
                    Showing {visibleFrom} - {visibleTo} of {bookingResult.totalCount} entries
                  </p>
                </div>
              </form>
            </section>

            {/* Bookings Table Component */}
            <BookingsAdminClient
              bookings={bookingResult.bookings}
              sortQueryBase={sortQueryBase}
              activeSortBy={bookingResult.sortBy}
              activeSortDirection={bookingResult.sortDirection}
            />

            {/* Pagination controls */}
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-none border border-black/5 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-medium text-foreground/50">
                Page {bookingResult.page} of {bookingResult.totalPages} pages
              </p>

              <div className="flex items-center gap-2">
                <Link
                  href={previousPageHref}
                  aria-disabled={bookingResult.page <= 1}
                  className={`rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${
                    bookingResult.page <= 1
                      ? "pointer-events-none border border-black/5 text-foreground/20 bg-gray-50"
                      : "border border-black/10 text-foreground/60 transition hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                  }`}
                >
                  Previous
                </Link>
                <Link
                  href={nextPageHref}
                  aria-disabled={bookingResult.page >= bookingResult.totalPages}
                  className={`rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${
                    bookingResult.page >= bookingResult.totalPages
                      ? "pointer-events-none border border-black/5 text-foreground/20 bg-gray-50"
                      : "border border-black/10 text-foreground/60 transition hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                  }`}
                >
                  Next
                </Link>
              </div>
            </section>
          </div>
        )}

        {/* Tab - ANALYTICS */}
        {tab === "analytics" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Analytics Date Filters */}
            <section className="rounded-none border border-black/5 bg-white p-5 shadow-md shadow-black/[0.02]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/5 pb-4 mb-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/45">
                    Activity Date Range
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#17120f]">
                    Conversion analytics filters
                  </h2>
                </div>
                <div className="text-right text-xs text-foreground/50 font-medium max-w-md">
                  {formatTrackingWindow(bookingFlowDashboard.summary)}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                  Presets
                </span>
                {datePresets.map((preset) => {
                  const isActive = eventsFrom === preset.from && eventsTo === preset.to;
                  const href = buildPageHref({
                    status,
                    bookingType,
                    clientName,
                    phone,
                    email,
                    bookingReference,
                    source,
                    from,
                    to,
                    page,
                    pageSize,
                    sortBy,
                    sortDirection,
                    eventsFrom: preset.from,
                    eventsTo: preset.to,
                    tab,
                  });

                  return (
                    <Link
                      key={`events-${preset.label}`}
                      href={href}
                      className={`rounded-none px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
                        isActive
                          ? "bg-[#17120f] text-white shadow-sm"
                          : "border border-black/10 text-foreground/60 hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                      }`}
                    >
                      {preset.label}
                    </Link>
                  );
                })}
                <Link
                  href={buildPageHref({
                    status,
                    bookingType,
                    clientName,
                    phone,
                    email,
                    bookingReference,
                    source,
                    from,
                    to,
                    page,
                    pageSize,
                    sortBy,
                    sortDirection,
                    eventsFrom: undefined,
                    eventsTo: undefined,
                    tab,
                  })}
                  className={`rounded-none px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
                    !eventsFrom && !eventsTo
                      ? "bg-[#17120f] text-white shadow-sm"
                      : "border border-black/10 text-foreground/60 hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                  }`}
                >
                  All activity dates
                </Link>
              </div>

              <form className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 items-end">
                <input type="hidden" name="status" value={status} />
                <input type="hidden" name="bookingType" value={bookingType} />
                <input type="hidden" name="clientName" value={clientName} />
                <input type="hidden" name="phone" value={phone} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="bookingReference" value={bookingReference} />
                <input type="hidden" name="source" value={source} />
                <input type="hidden" name="from" value={from} />
                <input type="hidden" name="to" value={to} />
                <input type="hidden" name="page" value={page} />
                <input type="hidden" name="pageSize" value={pageSize} />
                <input type="hidden" name="sortBy" value={sortBy} />
                <input type="hidden" name="sortDirection" value={sortDirection} />
                <input type="hidden" name="tab" value="analytics" />

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Activity from
                  </label>
                  <input
                    type="date"
                    name="eventsFrom"
                    defaultValue={eventsFrom}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Activity to
                  </label>
                  <input
                    type="date"
                    name="eventsTo"
                    defaultValue={eventsTo}
                    className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-none bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:text-[#17120f] active:scale-95"
                >
                  Apply Dates
                </button>

                <Link
                  href={buildPageHref({
                    status,
                    bookingType,
                    clientName,
                    phone,
                    email,
                    bookingReference,
                    source,
                    from,
                    to,
                    page,
                    pageSize,
                    sortBy,
                    sortDirection,
                    eventsFrom: undefined,
                    eventsTo: undefined,
                    tab,
                  })}
                  className="rounded-none border border-black/10 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 transition hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                >
                  Clear Date Filters
                </Link>
              </form>
            </section>

            {/* Funnel Metrics Table */}
            <section className="rounded-none border border-black/5 bg-white p-5 shadow-md shadow-black/[0.02] overflow-hidden">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#17120f] mb-4">
                Booking Flow Performance Funnel
              </h3>
              <div className="max-h-[380px] overflow-auto border border-black/5 rounded-none custom-admin-scrollbar relative">
                <table className="min-w-[1720px] w-full border-collapse">
                  <thead className="bg-[#17120f] text-white text-[10px] uppercase tracking-widest sticky top-0 z-20">
                    <tr className="text-left bg-[#17120f]">
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Event date</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Service Clicks</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Treatments Added</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Treatments Removed</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Form Opens</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Date Step Views</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Confirm Step Views</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Dates Selected</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Times Selected</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Closes</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Left Inactive</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Form Errors</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Save Failures</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Sent to WhatsApp</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5">Saved Bookings</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5 text-gold">Reach Date %</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5 text-gold">Confirm %</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5 text-gold">Conversion %</th>
                      <th className="sticky top-0 bg-[#17120f] px-4 py-3.5 text-gold">Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2 border-black/8 bg-gold/10 font-semibold text-[#17120f]">
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.activeFrom || bookingFlowDashboard.activeTo
                          ? "Selected dates"
                          : "All dates"}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.serviceCtaClickCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.treatmentAddedCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.treatmentRemovedCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.sheetOpenCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.stepTwoViewCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.stepThreeViewCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.dateSelectedCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.timeSelectedCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.sheetCloseCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.idleAbandonCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.validationErrorCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.saveFailedCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.whatsappSubmitCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4">
                        {bookingFlowDashboard.summary.completedWhatsappSubmitCount.toLocaleString("en-ZA")}
                      </td>
                      <td className="px-4 py-4 text-gold-dark font-bold">
                        {formatPercent(bookingFlowDashboard.summary.openToStepTwoRate)}
                      </td>
                      <td className="px-4 py-4 text-gold-dark font-bold">
                        {formatPercent(bookingFlowDashboard.summary.stepThreeToSubmitRate)}
                      </td>
                      <td className="px-4 py-4 text-gold-dark font-bold">
                        {formatPercent(bookingFlowDashboard.summary.openToSubmitRate)}
                      </td>
                      <td className="px-4 py-4 text-gold-dark font-bold">
                        {formatPercent(bookingFlowDashboard.summary.submitCompletionRate)}
                      </td>
                    </tr>

                    {bookingFlowDashboard.dailyRows.length > 0 ? (
                      bookingFlowDashboard.dailyRows.map((row) => (
                        <tr key={row.trackedDate} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8] transition-colors">
                          <td className="px-4 py-3.5 text-xs font-semibold text-[#17120f]">
                            {formatEventDate(row.trackedDate)}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.serviceCtaClickCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.treatmentAddedCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.treatmentRemovedCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.sheetOpenCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.stepTwoViewCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.stepThreeViewCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.dateSelectedCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.timeSelectedCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.sheetCloseCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.idleAbandonCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.validationErrorCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.saveFailedCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.whatsappSubmitCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-foreground/70">
                            {row.completedWhatsappSubmitCount.toLocaleString("en-ZA")}
                          </td>
                          <td className="px-4 py-3.5 text-xs font-semibold text-foreground/80">
                            {formatPercent(row.openToStepTwoRate)}
                          </td>
                          <td className="px-4 py-3.5 text-xs font-semibold text-foreground/80">
                            {formatPercent(row.stepThreeToSubmitRate)}
                          </td>
                          <td className="px-4 py-3.5 text-xs font-semibold text-foreground/80">
                            {formatPercent(row.openToSubmitRate)}
                          </td>
                          <td className="px-4 py-3.5 text-xs font-semibold text-foreground/80">
                            {formatPercent(row.submitCompletionRate)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white">
                        <td colSpan={19} className="px-4 py-10 text-center text-sm text-foreground/45">
                          No booking activity was found for these dates.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Breakdown Tables Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Bookings by Type */}
              <div className="overflow-hidden rounded-none border border-black/5 bg-white shadow-sm">
                <div className="border-b border-black/5 bg-[#fffcf8] px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Category Share
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-[#17120f]">
                    Bookings by Type
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-[#17120f] text-white text-[9px] uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Booking Type</th>
                        <th className="px-5 py-3">Opens</th>
                        <th className="px-5 py-3">WhatsApp Submits</th>
                        <th className="px-5 py-3">Saved Bookings</th>
                        <th className="px-5 py-3 text-gold">Open to Submit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingFlowDashboard.bookingTypeRows.length > 0 ? (
                        bookingFlowDashboard.bookingTypeRows.map((row) => (
                          <tr key={row.bookingType} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8]">
                            <td className="px-5 py-4 font-semibold capitalize text-[#17120f]">
                              {formatBookingTypeLabel(row.bookingType)}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.sheetOpenCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.whatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.completedWhatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 font-semibold text-gold-dark">
                              {formatPercent(row.openToSubmitRate)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-5 py-8 text-center text-foreground/45">
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Where Visitors Came From */}
              <div className="overflow-hidden rounded-none border border-black/5 bg-white shadow-sm">
                <div className="border-b border-black/5 bg-[#fffcf8] px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Acquisition Channels
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-[#17120f]">
                    Traffic sources
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-[#17120f] text-white text-[9px] uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Source</th>
                        <th className="px-5 py-3">Medium</th>
                        <th className="px-5 py-3">Opens</th>
                        <th className="px-5 py-3">WhatsApp Submits</th>
                        <th className="px-5 py-3">Saved Bookings</th>
                        <th className="px-5 py-3 text-gold">Completion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingFlowDashboard.sourceRows.length > 0 ? (
                        bookingFlowDashboard.sourceRows.map((row) => (
                          <tr key={`${row.source}:${row.medium}`} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8]">
                            <td className="px-5 py-4 font-semibold text-[#17120f]">
                              {row.source}
                            </td>
                            <td className="px-5 py-4 text-foreground/50">
                              {row.medium}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.sheetOpenCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.whatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.completedWhatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 font-semibold text-gold-dark">
                              {formatPercent(row.submitCompletionRate)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-foreground/45">
                            No source details found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Campaigns */}
              <div className="overflow-hidden rounded-none border border-black/5 bg-white shadow-sm">
                <div className="border-b border-black/5 bg-[#fffcf8] px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Marketing Campaigns
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-[#17120f]">
                    Campaign Performance
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-[#17120f] text-white text-[9px] uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Campaign</th>
                        <th className="px-5 py-3">Opens</th>
                        <th className="px-5 py-3">WhatsApp Submits</th>
                        <th className="px-5 py-3">Saved Bookings</th>
                        <th className="px-5 py-3">Open to Submit</th>
                        <th className="px-5 py-3 text-gold">Completion %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingFlowDashboard.campaignRows.length > 0 ? (
                        bookingFlowDashboard.campaignRows.map((row) => (
                          <tr key={row.campaign} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8]">
                            <td className="px-5 py-4 font-semibold text-[#17120f]">
                              {row.campaign}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.sheetOpenCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.whatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.completedWhatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {formatPercent(row.openToSubmitRate)}
                            </td>
                            <td className="px-5 py-4 font-semibold text-gold-dark">
                              {formatPercent(row.submitCompletionRate)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-foreground/45">
                            No campaigns active.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* First Page Visited */}
              <div className="overflow-hidden rounded-none border border-black/5 bg-white shadow-sm">
                <div className="border-b border-black/5 bg-[#fffcf8] px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    Landing Journeys
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-[#17120f]">
                    First Website Page Visited
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-[#17120f] text-white text-[9px] uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Landing URL</th>
                        <th className="px-5 py-3">Opens</th>
                        <th className="px-5 py-3">WhatsApp Submits</th>
                        <th className="px-5 py-3">Saved Bookings</th>
                        <th className="px-5 py-3">Open to Submit</th>
                        <th className="px-5 py-3 text-gold">Completion %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingFlowDashboard.landingPageRows.length > 0 ? (
                        bookingFlowDashboard.landingPageRows.map((row) => (
                          <tr key={row.landingPage} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8]">
                            <td className="px-5 py-4 font-semibold text-[#17120f] truncate max-w-[180px]" title={row.landingPage}>
                              {row.landingPage}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.sheetOpenCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.whatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {row.completedWhatsappSubmitCount.toLocaleString("en-ZA")}
                            </td>
                            <td className="px-5 py-4 text-foreground/70">
                              {formatPercent(row.openToSubmitRate)}
                            </td>
                            <td className="px-5 py-4 font-semibold text-gold-dark">
                              {formatPercent(row.submitCompletionRate)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-foreground/45">
                            No landing records available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Site Contact Buttons Monitoring */}
            <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm overflow-hidden">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#17120f] mb-4">
                Global Site Click Conversions
              </h3>
              <div className="overflow-x-auto border border-black/5 rounded-none">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="bg-[#17120f] text-white text-[9px] uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Action Event</th>
                      <th className="px-5 py-3.5">Total click count</th>
                      <th className="px-5 py-3.5">First interaction</th>
                      <th className="px-5 py-3.5">Most recent interaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siteMonitoringRows.length > 0 ? (
                      siteMonitoringRows.map((row) => (
                        <tr key={row.eventName} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8] transition-colors">
                          <td className="px-5 py-4 font-semibold capitalize text-[#17120f]">
                            {formatEventNameLabel(row.eventName)}
                          </td>
                          <td className="px-5 py-4 font-medium text-foreground/80">
                            {row.eventCount.toLocaleString("en-ZA")} clicks
                          </td>
                          <td className="px-5 py-4 text-foreground/50">
                            {formatTrackedAt(row.firstTrackedAt)}
                          </td>
                          <td className="px-5 py-4 text-foreground/50">
                            {formatTrackedAt(row.lastTrackedAt)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white">
                        <td colSpan={4} className="px-5 py-8 text-center text-foreground/45">
                          No contact events captured.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Tab - SUBSCRIBERS */}
        {tab === "subscribers" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Download Button */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#17120f]">
                  Subscribers & Newsletter Campaigns
                </h2>
                <p className="text-xs text-foreground/50 font-medium">
                  Review subscription metrics, recent leads, and draft campaigns.
                </p>
              </div>
              <Link
                href="/admin/subscribers/export"
                className="rounded-none border border-black/10 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#17120f] shadow-sm hover:border-gold hover:text-gold hover:bg-[#fffcf8] transition-all hover:scale-[1.01] active:scale-95"
              >
                Export Subscribers CSV
              </Link>
            </div>

            {/* Subscriber stats grid */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Members Circle", value: subscriberSummary.totalSubscribers, color: "border-l-4 border-l-black" },
                { label: "Subscribed & Marketing-Active", value: subscriberSummary.activeSubscribers, color: "border-l-4 border-l-green-600" },
                { label: "New Joins This Week", value: subscriberSummary.newThisWeek, color: "border-l-4 border-l-gold" },
                { label: "Opted Out / Unsubscribed", value: subscriberSummary.unsubscribedSubscribers, color: "border-l-4 border-l-red-500" },
              ].map((item) => (
                <div key={item.label} className={`rounded-none border border-black/5 bg-white p-5 shadow-sm ${item.color}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
                    {item.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[#17120f] tracking-tight">
                    {item.value.toLocaleString("en-ZA")}
                  </p>
                </div>
              ))}
            </section>

            {/* Email Special Creator Component */}
            <section className="rounded-none border border-black/5 bg-white p-5 sm:p-6 shadow-md shadow-black/[0.02]">
              <div className="border-b border-black/5 pb-3">
                <h3 className="text-base font-bold text-[#17120f]">
                  Draft a Circle Member Special Offer
                </h3>
                <p className="text-xs text-foreground/50 leading-relaxed mt-1">
                  Draft a beautiful, personalized HTML email to go directly to all marketing-active subscribers in the circle database.
                </p>
              </div>
              <EmailCampaignClient activeSubscriberCount={subscriberSummary.activeSubscribers} />
            </section>

            {/* Recent Subscribers List Table */}
            <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm overflow-hidden">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#17120f] mb-4">
                Recent Circle Registrations
              </h3>
              <div className="max-h-[350px] overflow-auto border border-black/5 rounded-none custom-admin-scrollbar relative">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="bg-[#17120f] text-white text-[9px] uppercase tracking-wider sticky top-0 z-20">
                    <tr className="bg-[#17120f]">
                      <th className="sticky top-0 bg-[#17120f] px-5 py-3.5">Email address</th>
                      <th className="sticky top-0 bg-[#17120f] px-5 py-3.5">First/Last Name</th>
                      <th className="sticky top-0 bg-[#17120f] px-5 py-3.5">Marketing status</th>
                      <th className="sticky top-0 bg-[#17120f] px-5 py-3.5">Acquisition placement</th>
                      <th className="sticky top-0 bg-[#17120f] px-5 py-3.5">Registered date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.length > 0 ? (
                      subscribers.slice(0, 25).map((subscriber) => (
                        <tr key={subscriber.id} className="border-b border-black/5 bg-white last:border-b-0 hover:bg-[#fffcf8] transition-colors">
                          <td className="px-5 py-4 font-semibold text-[#17120f]">
                            {subscriber.email}
                          </td>
                          <td className="px-5 py-4 text-foreground/70">
                            {subscriber.name ?? "-"}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex rounded-none px-2.5 py-0.5 text-[10px] font-semibold ${
                              subscriber.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {subscriber.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-foreground/50 capitalize">
                            {subscriber.source.replace(/_/g, " ")}
                          </td>
                          <td className="px-5 py-4 text-foreground/50">
                            {formatTrackedAt(subscriber.consentedAt)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white">
                        <td colSpan={5} className="px-5 py-8 text-center text-foreground/45">
                          No newsletter circle members found in directory.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Tab - LEADS */}
        {tab === "leads" && (
          <div className="space-y-6 animate-fadeIn">
            <BookingLeadsAdminClient initialLeads={bookingLeads} />
          </div>
        )}
      </main>
    </div>
  );
}
