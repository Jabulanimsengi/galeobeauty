"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_STATUSES, type BookingAdminRecord } from "@/lib/bookings-admin-shared";

interface BookingsAdminClientProps {
  bookings: BookingAdminRecord[];
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMoney(value: number | null, currency: string | null) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${currency ?? "ZAR"} ${value.toLocaleString("en-ZA")}`;
}

function formatTreatments(treatmentsJson: unknown) {
  if (!Array.isArray(treatmentsJson) || treatmentsJson.length === 0) {
    return [];
  }

  return treatmentsJson
    .map((item) => {
      if (typeof item !== "object" || !item || !("item" in item)) {
        return null;
      }

      const treatmentItem = (item as { item?: { name?: string; price?: string } }).item;
      if (!treatmentItem?.name) {
        return null;
      }

      return treatmentItem.price
        ? `${treatmentItem.name} (${treatmentItem.price})`
        : treatmentItem.name;
    })
    .filter((value): value is string => Boolean(value));
}

function BookingRow({ booking }: { booking: BookingAdminRecord }) {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState(booking.adminNotes ?? "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const treatments = useMemo(() => formatTreatments(booking.treatmentsJson), [booking.treatmentsJson]);

  const saveBooking = () => {
    setFeedback(null);

    startTransition(async () => {
      const response = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          adminNotes: notes,
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setFeedback(result?.error ?? "Unable to save this booking.");
        return;
      }

      setFeedback("Saved");
      router.refresh();
    });
  };

  return (
    <article className="rounded-[1.6rem] border border-black/8 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(23,18,15,0.35)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold/90">
            {booking.bookingType === "consultation" ? "Consultation" : "Treatment"}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-[#17120f]">
            {booking.clientName}
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            {booking.phone}
            {booking.email ? ` | ${booking.email}` : ""}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/45">
            Created {formatDateTime(booking.createdAt)}
          </p>
        </div>

        <div className="rounded-full border border-black/10 bg-[#f6efe6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#17120f]">
          {booking.status.replace(/_/g, " ")}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-4">
          <div className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
            <p>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Preferred date
              </span>
              {booking.preferredDate}
            </p>
            <p>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Preferred time
              </span>
              {booking.preferredTimeSlot}
            </p>
            <p>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Value
              </span>
              {formatMoney(booking.totalValue, booking.currency)}
            </p>
            <p>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Reference
              </span>
              {booking.bookingReference ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Treatments
            </p>
            {treatments.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {treatments.map((treatment) => (
                  <span
                    key={treatment}
                    className="rounded-full border border-black/8 bg-[#fffaf3] px-3 py-1 text-xs text-foreground/70"
                  >
                    {treatment}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-foreground/70">
                {booking.consultationContext ?? "General consultation"}
              </p>
            )}
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Attribution
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {booking.source ?? "direct"} / {booking.medium ?? "none"}
              {booking.campaign ? ` / ${booking.campaign}` : ""}
            </p>
            <p className="mt-1 text-sm text-foreground/55">
              {booking.enquiryPage}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              WhatsApp message
            </p>
            <pre className="mt-2 max-h-48 overflow-auto rounded-2xl bg-[#17120f] p-4 text-xs leading-6 text-white/82 whitespace-pre-wrap">
              {booking.whatsappMessage}
            </pre>
          </div>
        </div>

        <div className="space-y-4 rounded-[1.4rem] border border-black/8 bg-[#fffaf3] p-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Status
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#17120f] outline-none transition focus:border-gold"
            >
              {BOOKING_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Admin notes
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={6}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#17120f] outline-none transition focus:border-gold"
              placeholder="Add follow-up notes, deposit status, or client responses."
            />
          </div>

          <button
            type="button"
            onClick={saveBooking}
            disabled={isPending}
            className="w-full rounded-xl bg-[#17120f] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-[#17120f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save changes"}
          </button>

          {feedback && (
            <p className={`text-sm ${feedback === "Saved" ? "text-green-700" : "text-red-600"}`}>
              {feedback}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function BookingsAdminClient({ bookings }: BookingsAdminClientProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-[1.6rem] border border-dashed border-black/15 bg-white/70 px-6 py-10 text-center text-sm text-foreground/70">
        No bookings matched the current filters.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {bookings.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
