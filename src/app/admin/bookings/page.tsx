import Link from "next/link";
import { requireAdminAuth } from "@/lib/server/admin-auth";
import { listBookings } from "@/lib/server/bookings-admin";
import { getBookingFlowMetricsSummary } from "@/lib/server/booking-flow-analytics";
import { BOOKING_STATUSES } from "@/lib/bookings-admin-shared";
import { BookingsAdminClient } from "@/app/admin/bookings/BookingsAdminClient";
import { LogoutButton } from "@/app/admin/bookings/LogoutButton";

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
}) {
  const params = new URLSearchParams();

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

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams;
  await requireAdminAuth("/admin/bookings");
  const datePresets = getDatePresets();

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

  const [bookingResult, bookingFlowMetrics] = await Promise.all([
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
    getBookingFlowMetricsSummary(),
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
  });
  const visibleFrom = bookingResult.totalCount === 0 ? 0 : (bookingResult.page - 1) * bookingResult.pageSize + 1;
  const visibleTo = bookingResult.totalCount === 0 ? 0 : Math.min(bookingResult.page * bookingResult.pageSize, bookingResult.totalCount);

  return (
    <main className="min-h-screen bg-[#f6efe6] px-5 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-5">
        <header className="rounded-[1.6rem] border border-black/6 bg-[#17120f] px-5 py-5 text-white shadow-[0_28px_70px_-48px_rgba(23,18,15,0.75)] sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/90">
                Galeo Beauty
              </p>
              <h1 className="mt-3 font-serif text-[2rem] leading-none sm:text-[2.5rem]">
                Bookings admin
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-[0.96rem]">
                Compact booking operations view with column filters, status management, internal notes, and CSV export.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={exportHref}
                className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#17120f] transition hover:bg-[#d8bb74]"
              >
                Export CSV
              </Link>
              <LogoutButton />
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-4">
          {[
            {
              label: "Booking sheet opens",
              value: bookingFlowMetrics.sheetOpenCount.toLocaleString("en-ZA"),
              note: "Server-side tracked opens",
            },
            {
              label: "WhatsApp submits",
              value: bookingFlowMetrics.whatsappSubmitCount.toLocaleString("en-ZA"),
              note: `Open to submit ${formatPercent(bookingFlowMetrics.openToSubmitRate)}`,
            },
            {
              label: "True bookings",
              value: bookingFlowMetrics.completedWhatsappSubmitCount.toLocaleString("en-ZA"),
              note: "Requirements completed before WhatsApp submit",
            },
            {
              label: "Submit completion rate",
              value: formatPercent(bookingFlowMetrics.submitCompletionRate),
              note: `Tracked since ${formatTrackedAt(bookingFlowMetrics.firstTrackedAt)}`,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-[1.25rem] border border-black/8 bg-white px-5 py-5 shadow-[0_18px_45px_-36px_rgba(23,18,15,0.34)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                {card.label}
              </p>
              <p className="mt-3 text-[2rem] font-semibold leading-none text-[#17120f]">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-foreground/58">{card.note}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[1.4rem] border border-black/8 bg-white px-5 py-4 shadow-[0_20px_60px_-40px_rgba(23,18,15,0.35)]">
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-black/8 pb-4">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Quick dates
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
              });

              return (
                <Link
                  key={preset.label}
                  href={href}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    isActive
                      ? "bg-[#17120f] text-white"
                      : "border border-black/10 text-foreground/62 hover:border-gold hover:text-gold"
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
              })}
              className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                !from && !to
                  ? "bg-[#17120f] text-white"
                  : "border border-black/10 text-foreground/62 hover:border-gold hover:text-gold"
              }`}
            >
              All dates
            </Link>
          </div>

          <form className="grid gap-3 xl:grid-cols-[1.1fr_0.85fr_0.95fr_0.95fr_0.9fr_0.9fr_0.85fr_0.85fr]">
            <input type="hidden" name="sortBy" value={sortBy} />
            <input type="hidden" name="sortDirection" value={sortDirection} />
            <input type="hidden" name="page" value="1" />
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Client
              </label>
              <input
                type="text"
                name="clientName"
                defaultValue={clientName}
                placeholder="Filter client name"
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={phone}
                placeholder="Filter phone"
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Email
              </label>
              <input
                type="text"
                name="email"
                defaultValue={email}
                placeholder="Filter email"
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Status
              </label>
              <select
                name="status"
                defaultValue={status}
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
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
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Type
              </label>
              <select
                name="bookingType"
                defaultValue={bookingType}
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              >
                <option value="all">All types</option>
                <option value="treatment">Treatment</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Reference
              </label>
              <input
                type="text"
                name="bookingReference"
                defaultValue={bookingReference}
                placeholder="Filter reference"
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Source
              </label>
              <input
                type="text"
                name="source"
                defaultValue={source}
                placeholder="Filter source"
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                From date
              </label>
              <input
                type="date"
                name="from"
                defaultValue={from}
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                To date
              </label>
              <input
                type="date"
                name="to"
                defaultValue={to}
                className="w-full rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
              />
            </div>

            <div className="flex flex-wrap items-end gap-3 xl:col-span-8">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                  Rows
                </label>
                <select
                  name="pageSize"
                  defaultValue={pageSize}
                  className="rounded-xl border border-black/10 bg-[#fffaf3] px-4 py-3 text-sm outline-none transition focus:border-gold"
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#17120f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-[#17120f]"
              >
                Apply filters
              </button>
              <Link
                href="/admin/bookings"
                className="rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/65 transition hover:border-gold hover:text-gold"
              >
                Reset
              </Link>
              <p className="ml-auto text-sm text-foreground/55">
                Showing {visibleFrom} - {visibleTo} of {bookingResult.totalCount}
              </p>
            </div>
          </form>
        </section>

        <BookingsAdminClient bookings={bookingResult.bookings} sortQueryBase={sortQueryBase} activeSortBy={bookingResult.sortBy} activeSortDirection={bookingResult.sortDirection} />

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-black/8 bg-white px-5 py-4 shadow-[0_18px_40px_-35px_rgba(23,18,15,0.25)]">
          <p className="text-sm text-foreground/60">
            Page {bookingResult.page} of {bookingResult.totalPages}
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={previousPageHref}
              aria-disabled={bookingResult.page <= 1}
              className={`rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] ${
                bookingResult.page <= 1
                  ? "pointer-events-none border border-black/10 text-foreground/25"
                  : "border border-black/10 text-foreground/65 transition hover:border-gold hover:text-gold"
              }`}
            >
              Previous
            </Link>
            <Link
              href={nextPageHref}
              aria-disabled={bookingResult.page >= bookingResult.totalPages}
              className={`rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] ${
                bookingResult.page >= bookingResult.totalPages
                  ? "pointer-events-none border border-black/10 text-foreground/25"
                  : "border border-black/10 text-foreground/65 transition hover:border-gold hover:text-gold"
              }`}
            >
              Next
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
