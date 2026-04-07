"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_STATUSES, type BookingAdminRecord } from "@/lib/bookings-admin-shared";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface BookingsAdminClientProps {
  bookings: BookingAdminRecord[];
  sortQueryBase: string;
  activeSortBy: string;
  activeSortDirection: "asc" | "desc";
}

const CREATED_COLUMN_WIDTH = "w-[152px] min-w-[152px]";
const CLIENT_COLUMN_WIDTH = "w-[230px] min-w-[230px]";

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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-b border-black/6 py-2 text-sm last:border-b-0">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/45">
        {label}
      </span>
      <span className="min-w-0 break-words text-foreground/78">{value}</span>
    </div>
  );
}

function BookingDetailSheet({
  booking,
  isOpen,
  onOpenChange,
}: {
  booking: BookingAdminRecord | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const treatments = useMemo(
    () => (booking ? formatTreatments(booking.treatmentsJson) : []),
    [booking]
  );

  if (!booking) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[720px] overflow-y-auto border-l border-black/8 bg-[#fffaf3] p-0"
      >
        <SheetHeader className="border-b border-black/8 bg-[#17120f] px-6 py-6 text-left text-white">
          <SheetTitle className="font-serif text-3xl text-white">
            {booking.clientName}
          </SheetTitle>
          <SheetDescription className="text-sm text-white/70">
            {booking.bookingType === "consultation" ? "Consultation booking" : "Treatment booking"}
            {" | "}
            {formatDateTime(booking.createdAt)}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-6 py-6">
          <section className="rounded-[1.2rem] border border-black/8 bg-white p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Client
            </h3>
            <div className="mt-3">
              <DetailRow label="Phone" value={booking.phone} />
              <DetailRow label="Email" value={booking.email ?? "-"} />
              <DetailRow label="Reference" value={booking.bookingReference ?? "-"} />
              <DetailRow label="Status" value={formatStatusLabel(booking.status)} />
              <DetailRow label="Updated" value={formatDateTime(booking.updatedAt)} />
            </div>
          </section>

          <section className="rounded-[1.2rem] border border-black/8 bg-white p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Appointment
            </h3>
            <div className="mt-3">
              <DetailRow label="Date" value={booking.preferredDate} />
              <DetailRow label="Time" value={booking.preferredTimeSlot} />
              <DetailRow label="Value" value={formatMoney(booking.totalValue, booking.currency)} />
              <DetailRow
                label="Context"
                value={booking.consultationContext ?? (booking.bookingType === "treatment" ? "Treatment booking" : "-")}
              />
            </div>
          </section>

          <section className="rounded-[1.2rem] border border-black/8 bg-white p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Treatments
            </h3>
            {treatments.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {treatments.map((treatment) => (
                  <span
                    key={treatment}
                    className="rounded-full border border-black/8 bg-[#fffaf3] px-3 py-1 text-xs text-foreground/72"
                  >
                    {treatment}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-foreground/65">No treatment list on this booking.</p>
            )}
          </section>

          <section className="rounded-[1.2rem] border border-black/8 bg-white p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Attribution
            </h3>
            <div className="mt-3">
              <DetailRow label="Source" value={booking.source ?? "direct"} />
              <DetailRow label="Medium" value={booking.medium ?? "none"} />
              <DetailRow label="Campaign" value={booking.campaign ?? "-"} />
              <DetailRow label="Landing" value={booking.landingPage ?? "-"} />
              <DetailRow label="Enquiry" value={booking.enquiryPage ?? "-"} />
              <DetailRow label="Referrer" value={booking.referrerHost ?? "-"} />
            </div>
          </section>

          <section className="rounded-[1.2rem] border border-black/8 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">
                WhatsApp message
              </h3>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(booking.whatsappMessage)}
                className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/65 transition hover:border-gold hover:text-gold"
              >
                Copy message
              </button>
            </div>
            <pre className="mt-3 max-h-[320px] overflow-auto rounded-2xl bg-[#17120f] p-4 text-xs leading-6 text-white/84 whitespace-pre-wrap">
              {booking.whatsappMessage}
            </pre>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function BookingTableRow({
  booking,
  onView,
}: {
  booking: BookingAdminRecord;
  onView: (booking: BookingAdminRecord) => void;
}) {
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
    <tr className="border-b border-black/6 align-top last:border-b-0 hover:bg-[#fffcf7]">
      <td
        className={`sticky left-0 z-20 ${CREATED_COLUMN_WIDTH} border-r border-black/6 bg-white px-3 py-3 text-xs text-foreground/60 whitespace-nowrap shadow-[10px_0_18px_-18px_rgba(23,18,15,0.45)]`}
      >
        <div className="font-medium text-foreground/82">{formatDateTime(booking.createdAt)}</div>
        <div className="mt-1 uppercase tracking-[0.16em]">{booking.id.slice(0, 8)}</div>
      </td>

      <td
        className={`sticky left-[152px] z-10 ${CLIENT_COLUMN_WIDTH} border-r border-black/6 bg-white px-3 py-3 text-sm text-foreground/78 shadow-[10px_0_18px_-18px_rgba(23,18,15,0.3)]`}
      >
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
            onClick={() => onView(booking)}
            className="rounded-lg border border-black/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/68 transition hover:border-gold hover:text-gold"
          >
            View
          </button>
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

function SortableHeader({
  label,
  column,
  sortQueryBase,
  activeSortBy,
  activeSortDirection,
  className,
}: {
  label: string;
  column: string;
  sortQueryBase: string;
  activeSortBy: string;
  activeSortDirection: "asc" | "desc";
  className?: string;
}) {
  const isActive = activeSortBy === column;
  const indicator = isActive ? (activeSortDirection === "asc" ? "^" : "v") : "";
  const params = new URLSearchParams(sortQueryBase);
  params.set("sortBy", column);
  params.set(
    "sortDirection",
    isActive && activeSortDirection === "asc" ? "desc" : "asc"
  );
  const href = `/admin/bookings?${params.toString()}`;

  return (
    <th
      className={`sticky top-0 z-30 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${className ?? ""}`}
    >
      <a href={href} className="inline-flex items-center gap-2 hover:text-gold">
        <span>{label}</span>
        <span className="text-gold/90">{indicator}</span>
      </a>
    </th>
  );
}

export function BookingsAdminClient({
  bookings,
  sortQueryBase,
  activeSortBy,
  activeSortDirection,
}: BookingsAdminClientProps) {
  const [selectedBooking, setSelectedBooking] = useState<BookingAdminRecord | null>(null);

  if (bookings.length === 0) {
    return (
      <div className="rounded-[1.4rem] border border-dashed border-black/15 bg-white/70 px-6 py-10 text-center text-sm text-foreground/70">
        No bookings matched the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-black/8 bg-white shadow-[0_24px_70px_-45px_rgba(23,18,15,0.38)]">
      <div className="max-h-[72vh] overflow-auto">
        <table className="min-w-[1560px] w-full border-collapse">
          <thead className="bg-[#17120f] text-white">
            <tr className="text-left">
              <SortableHeader
                label="Created"
                column="createdAt"
                sortQueryBase={sortQueryBase}
                activeSortBy={activeSortBy}
                activeSortDirection={activeSortDirection}
                className={`left-0 ${CREATED_COLUMN_WIDTH} border-r border-white/10 bg-[#17120f] shadow-[10px_0_20px_-18px_rgba(0,0,0,0.6)]`}
              />
              <SortableHeader
                label="Client"
                column="clientName"
                sortQueryBase={sortQueryBase}
                activeSortBy={activeSortBy}
                activeSortDirection={activeSortDirection}
                className={`left-[152px] z-20 ${CLIENT_COLUMN_WIDTH} border-r border-white/10 bg-[#17120f] shadow-[10px_0_20px_-18px_rgba(0,0,0,0.45)]`}
              />
              <th className="sticky top-0 z-20 bg-[#17120f] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Phone</th>
              <th className="sticky top-0 z-20 bg-[#17120f] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Type</th>
              <SortableHeader label="Preferred" column="preferredDate" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
              <th className="sticky top-0 z-20 bg-[#17120f] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Treatments / Context</th>
              <SortableHeader label="Value" column="totalValue" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
              <SortableHeader label="Source" column="source" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
              <th className="sticky top-0 z-20 bg-[#17120f] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Reference</th>
              <SortableHeader label="Status" column="status" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
              <th className="sticky top-0 z-20 bg-[#17120f] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Notes</th>
              <th className="sticky top-0 z-20 bg-[#17120f] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingTableRow
                key={booking.id}
                booking={booking}
                onView={setSelectedBooking}
              />
            ))}
          </tbody>
        </table>
      </div>

      <BookingDetailSheet
        booking={selectedBooking}
        isOpen={Boolean(selectedBooking)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBooking(null);
          }
        }}
      />
    </div>
  );
}
