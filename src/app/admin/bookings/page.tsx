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
    clientName?: string;
    phone?: string;
    email?: string;
    bookingReference?: string;
    source?: string;
    from?: string;
    to?: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

function buildExportHref({
  status,
  bookingType,
  clientName,
  phone,
  email,
  bookingReference,
  source,
  from,
  to,
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

  const queryString = params.toString();
  return queryString ? `/admin/bookings/export?${queryString}` : "/admin/bookings/export";
}

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams;
  await requireAdminAuth("/admin/bookings");

  const status = params.status?.trim() || "all";
  const bookingType = params.bookingType?.trim() || "all";
  const clientName = params.clientName?.trim() || "";
  const phone = params.phone?.trim() || "";
  const email = params.email?.trim() || "";
  const bookingReference = params.bookingReference?.trim() || "";
  const source = params.source?.trim() || "";
  const from = params.from?.trim() || "";
  const to = params.to?.trim() || "";

  const bookings = await listBookings({
    status,
    bookingType,
    clientName,
    phone,
    email,
    bookingReference,
    source,
    from,
    to,
    limit: 100,
  });

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
  });

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

        <section className="rounded-[1.4rem] border border-black/8 bg-white px-5 py-4 shadow-[0_20px_60px_-40px_rgba(23,18,15,0.35)]">
          <form className="grid gap-3 xl:grid-cols-[1.1fr_0.85fr_0.95fr_0.95fr_0.9fr_0.9fr_0.85fr_0.85fr]">
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
