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

function formatStatusLabel(value: string) {
  return value.replace(/_/g, " ");
}

function BookingTableRow({ booking }: { booking: BookingAdminRecord }) {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState(booking.adminNotes ?? "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const treatments = useMemo(() => formatTreatments(booking.treatmentsJson), [booking.treatmentsJson]);
  const treatmentsPreview =
    treatments.length > 0 ? treatments.slice(0, 2).join(" | ") : booking.consultationContext ?? "-";

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
        setFeedback(result?.error ?? "Unable to save.");
        return;
      }

      setFeedback("Saved");
      router.refresh();
    });
  };

  return (
    <tr className="border-b border-black/6 align-top last:border-b-0">
      <td className="px-3 py-3 text-xs text-foreground/60 whitespace-nowrap">
        <div className="font-medium text-foreground/82">{formatDateTime(booking.createdAt)}</div>
        <div className="mt-1 uppercase tracking-[0.16em]">{booking.id.slice(0, 8)}</div>
      </td>

      <td className="px-3 py-3 text-sm text-foreground/78">
        <div className="font-semibold text-[#17120f]">{booking.clientName}</div>
        <div className="mt-1 text-xs text-foreground/55">{booking.email ?? "-"}</div>
      </td>

      <td className="px-3 py-3 text-sm text-foreground/78 whitespace-nowrap">
        {booking.phone}
      </td>

      <td className="px-3 py-3 text-xs uppercase tracking-[0.16em] text-foreground/60 whitespace-nowrap">
        {booking.bookingType}
      </td>

      <td className="px-3 py-3 text-sm text-foreground/78 whitespace-nowrap">
        <div>{booking.preferredDate}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/50">
          {booking.preferredTimeSlot}
        </div>
      </td>

      <td className="max-w-[260px] px-3 py-3 text-xs text-foreground/72">
        <div className="line-clamp-2" title={treatmentsPreview}>
          {treatmentsPreview}
        </div>
        {treatments.length > 2 && (
          <div className="mt-1 text-[11px] text-foreground/45">
            +{treatments.length - 2} more
          </div>
        )}
      </td>

      <td className="px-3 py-3 text-sm font-medium text-foreground/82 whitespace-nowrap">
        {formatMoney(booking.totalValue, booking.currency)}
      </td>

      <td className="px-3 py-3 text-xs text-foreground/60 whitespace-nowrap">
        <div>{booking.source ?? "direct"}</div>
        <div className="mt-1">{booking.medium ?? "none"}</div>
      </td>

      <td className="px-3 py-3 text-xs text-foreground/60 whitespace-nowrap">
        {booking.bookingReference ?? "-"}
      </td>

      <td className="px-3 py-3">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="min-w-[150px] rounded-lg border border-black/10 bg-[#fffaf3] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] outline-none transition focus:border-gold"
        >
          {BOOKING_STATUSES.map((option) => (
            <option key={option} value={option}>
              {formatStatusLabel(option)}
            </option>
          ))}
        </select>
      </td>

      <td className="px-3 py-3">
        <input
          type="text"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Internal notes"
          className="min-w-[220px] rounded-lg border border-black/10 bg-[#fffaf3] px-3 py-2 text-xs text-[#17120f] outline-none transition focus:border-gold"
        />
      </td>

      <td className="px-3 py-3">
        <div className="flex min-w-[130px] flex-col gap-2">
          <button
            type="button"
            onClick={saveBooking}
            disabled={isPending}
            className="rounded-lg bg-[#17120f] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-gold hover:text-[#17120f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
          {feedback && (
            <span className={`text-[11px] ${feedback === "Saved" ? "text-green-700" : "text-red-600"}`}>
              {feedback}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}

export function BookingsAdminClient({ bookings }: BookingsAdminClientProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-[1.4rem] border border-dashed border-black/15 bg-white/70 px-6 py-10 text-center text-sm text-foreground/70">
        No bookings matched the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-black/8 bg-white shadow-[0_24px_70px_-45px_rgba(23,18,15,0.38)]">
      <div className="overflow-x-auto">
        <table className="min-w-[1450px] w-full border-collapse">
          <thead className="bg-[#17120f] text-white">
            <tr className="text-left">
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Created</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Client</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Phone</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Type</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Preferred</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Treatments / Context</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Value</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Source</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Reference</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Status</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Notes</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingTableRow key={booking.id} booking={booking} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
