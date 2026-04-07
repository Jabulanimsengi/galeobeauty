import Link from "next/link";
import { requireAdminAuth } from "@/lib/server/admin-auth";
import { listBookings } from "@/lib/server/bookings-admin";
import { BOOKING_STATUSES } from "@/lib/bookings-admin-shared";
import { BookingsAdminClient } from "@/app/admin/bookings/BookingsAdminClient";
import { LogoutButton } from "@/app/admin/bookings/LogoutButton";

interface BookingsPageProps {
  searchParams: Promise<{
    status?: string;
    bookingType?: string;
    q?: string;
    from?: string;
    to?: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

function buildExportHref({
  status,
  bookingType,
  query,
  from,
  to,
}: {
  status?: string;
  bookingType?: string;
  query?: string;
  from?: string;
  to?: string;
}) {
  const params = new URLSearchParams();

  if (status && status !== "all") {
    params.set("status", status);
  }
  if (bookingType && bookingType !== "all") {
    params.set("bookingType", bookingType);
  }
  if (query) {
    params.set("q", query);
  }
  if (from) {
    params.set("from", from);
  }
  if (to) {
    params.set("to", to);
  }

  const queryString = params.toString();
  return queryString ? `/admin/bookings/export?${queryString}` : "/admin/bookings/export";
}

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams;
  await requireAdminAuth("/admin/bookings");

  const status = params.status?.trim() || "all";
  const bookingType = params.bookingType?.trim() || "all";
  const query = params.q?.trim() || "";
  const from = params.from?.trim() || "";
  const to = params.to?.trim() || "";

  const bookings = await listBookings({
    status,
    bookingType,
    query,
    from,
    to,
    limit: 100,
  });

  const exportHref = buildExportHref({ status, bookingType, query, from, to });

  return (
    <main className="min-h-screen bg-[#f6efe6] px-5 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-black/6 bg-[#17120f] px-6 py-7 text-white shadow-[0_32px_90px_-50px_rgba(23,18,15,0.75)] sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/90">
                Galeo Beauty
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] leading-none sm:text-[3rem]">
                Bookings admin
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-[0.96rem]">
                Review incoming bookings, update their status, add internal notes, and export the current filtered dataset.
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

        <section className="rounded-[1.8rem] border border-black/8 bg-white px-5 py-5 shadow-[0_20px_60px_-40px_rgba(23,18,15,0.35)] sm:px-6">
          <form className="grid gap-4 lg:grid-cols-[1.2fr_repeat(4,minmax(0,0.7fr))]">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Search
              </label>
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Name, phone, email, reference"
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

            <div className="flex items-end gap-3 lg:col-span-5">
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
                Showing {bookings.length} most recent matching bookings
              </p>
            </div>
          </form>
        </section>

        <BookingsAdminClient bookings={bookings} />
      </div>
    </main>
  );
}
