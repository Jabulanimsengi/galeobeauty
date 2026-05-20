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

const CREATED_COLUMN_WIDTH = "w-[145px] min-w-[145px]";
const CLIENT_COLUMN_WIDTH = "w-[210px] min-w-[210px]";

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

function getStatusStyles(statusValue: string) {
  switch (statusValue) {
    case "new":
      return "bg-amber-50 text-amber-800 border-amber-200 focus:ring-amber-200";
    case "contacted":
      return "bg-indigo-50 text-indigo-800 border-indigo-200 focus:ring-indigo-200";
    case "awaiting_deposit":
      return "bg-purple-50 text-purple-800 border-purple-200 focus:ring-purple-200";
    case "confirmed":
      return "bg-emerald-50 text-emerald-800 border-emerald-200 focus:ring-emerald-200";
    case "completed":
      return "bg-slate-100 text-slate-800 border-slate-350 focus:ring-slate-200";
    case "cancelled":
      return "bg-rose-50 text-rose-800 border-rose-200 focus:ring-rose-200";
    default:
      return "bg-gray-50 text-gray-800 border-gray-200 focus:ring-gray-200";
  }
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-black/5 py-2.5 text-sm last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
        {label}
      </span>
      <span className="min-w-0 break-words text-foreground/80 font-semibold">{value}</span>
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
        className="w-full max-w-[720px] overflow-y-auto border-l border-black/8 bg-[#f8f5f0] p-0"
      >
        <SheetHeader className="border-b border-black/8 bg-[#17120f] px-6 py-6 text-left text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <SheetTitle className="text-2xl font-semibold text-white">
              {booking.clientName}
            </SheetTitle>
            <SheetDescription className="text-sm text-white/70">
              {booking.bookingType === "consultation" ? "Consultation booking" : "Treatment booking"}
              {" | "}
              {formatDateTime(booking.createdAt)}
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="space-y-6 px-6 py-6">
          <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/45 border-b border-black/5 pb-2">
              Client Details
            </h3>
            <div className="mt-3">
              <DetailRow label="Phone" value={booking.phone} />
              <DetailRow label="Email" value={booking.email ?? "-"} />
              <DetailRow label="Reference" value={booking.bookingReference ?? "-"} />
              <DetailRow label="Status" value={formatStatusLabel(booking.status)} />
              <DetailRow label="Email opt-in" value={booking.subscriberOptIn ? "Yes" : "No"} />
              <DetailRow label="Email status" value={formatStatusLabel(booking.bookingConfirmationEmailStatus)} />
              {booking.bookingConfirmationEmailError && (
                <DetailRow label="Email error" value={booking.bookingConfirmationEmailError} />
              )}
              <DetailRow label="Updated" value={formatDateTime(booking.updatedAt)} />
            </div>
          </section>

          <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/45 border-b border-black/5 pb-2">
              Appointment Info
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

          <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/45 border-b border-black/5 pb-2">
              Treatments List
            </h3>
            {treatments.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {treatments.map((treatment) => (
                  <span
                    key={treatment}
                    className="rounded-none border border-black/8 bg-[#fffaf3] px-3.5 py-1 text-xs text-foreground/75 font-semibold animate-fadeIn"
                  >
                    {treatment}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-foreground/50 font-medium">No treatment list on this booking.</p>
            )}
          </section>

          <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/45 border-b border-black/5 pb-2">
              Attribution & Referral
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

          <section className="rounded-none border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/45">
                WhatsApp Message
              </h3>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(booking.whatsappMessage)}
                className="rounded-none border border-black/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/60 transition-all hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
              >
                Copy Message
              </button>
            </div>
            <pre className="mt-3 max-h-[320px] overflow-auto rounded-none bg-[#17120f] p-4 font-mono text-[11px] leading-5 text-white/80 whitespace-pre-wrap">
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
  const [isExpanded, setIsExpanded] = useState(false);
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
        setFeedback(result?.error ?? "Unable to save.");
        return;
      }

      setFeedback("Saved");
      setTimeout(() => setFeedback(null), 3000);
      router.refresh();
    });
  };

  return (
    <>
      <tr className={`group border-b border-black/5 align-middle transition-colors duration-150 hover:bg-[#fffcf7] ${isExpanded ? "bg-[#fffcf7]/70" : ""}`}>
        {/* Created Date */}
        <td
          className={`sticky left-0 z-20 ${CREATED_COLUMN_WIDTH} border-r border-black/5 bg-white group-hover:bg-[#fffcf7] px-4 py-3.5 text-xs text-foreground/60 whitespace-nowrap shadow-[10px_0_18px_-18px_rgba(23,18,15,0.25)] transition-colors`}
        >
          <div className="font-semibold text-foreground/80">{formatDateTime(booking.createdAt)}</div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/35">{booking.id.slice(0, 8)}</div>
        </td>

        {/* Client details (Dense Layout) */}
        <td
          className={`sticky left-[145px] z-10 ${CLIENT_COLUMN_WIDTH} border-r border-black/5 bg-white group-hover:bg-[#fffcf7] px-4 py-3.5 text-sm text-foreground/78 shadow-[10px_0_18px_-18px_rgba(23,18,15,0.18)] transition-colors`}
        >
          <div className="font-bold text-[#17120f]">{booking.clientName}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center rounded-none px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
              booking.bookingType === "consultation"
                ? "bg-[#fffaf3] text-gold-dark border border-gold/15"
                : "bg-neutral-50 text-neutral-600 border border-neutral-200"
            }`}>
              {booking.bookingType}
            </span>
            <span className="text-[10px] text-foreground/45 font-medium">{booking.phone}</span>
          </div>
        </td>

        {/* Preferred Date & Time */}
        <td className="px-4 py-3.5 text-sm text-foreground/75 whitespace-nowrap">
          <div className="font-semibold text-foreground/85">{booking.preferredDate}</div>
          <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/40 bg-black/5 px-2 py-0.5 rounded-none inline-block">
            {booking.preferredTimeSlot}
          </div>
        </td>

        {/* Value */}
        <td className="px-4 py-3.5 text-sm font-semibold text-foreground/80 whitespace-nowrap">
          {formatMoney(booking.totalValue, booking.currency)}
        </td>

        {/* Status Dropdown Pill */}
        <td className="px-4 py-3.5">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={`w-[145px] rounded-none border px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider outline-none transition focus:ring-2 focus:border-transparent cursor-pointer ${getStatusStyles(status)}`}
          >
            {BOOKING_STATUSES.map((option) => (
              <option key={option} value={option} className="bg-white text-foreground uppercase tracking-wider font-semibold">
                {formatStatusLabel(option)}
              </option>
            ))}
          </select>
        </td>

        {/* Dense Actions Block & Inline toggle */}
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-2 max-w-[260px]">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`rounded-none p-2 border border-black/10 bg-white transition-all hover:border-gold hover:bg-[#fffcf7] ${
                isExpanded ? "border-gold text-gold bg-[#fffcf7] rotate-180" : "text-foreground/50"
              }`}
              title={isExpanded ? "Collapse inline view" : "Expand inline details"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onView(booking)}
              className="rounded-none border border-black/10 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-foreground/60 transition-all hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
            >
              Drawer
            </button>
            <button
              type="button"
              onClick={saveBooking}
              disabled={isPending}
              className="rounded-none bg-[#17120f] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-gold hover:text-[#17120f] hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
            >
              {isPending ? "..." : "Save"}
            </button>
            {feedback && (
              <span className={`text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                feedback === "Saved" ? "text-emerald-600 animate-pulse" : "text-rose-600"
              }`}>
                {feedback}
              </span>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Inline Detail Area */}
      {isExpanded && (
        <tr className="bg-[#fffbf7]/35 border-b border-black/5 transition-all">
          <td colSpan={6} className="px-6 py-4">
            <div className="rounded-none border border-black/5 bg-white p-5 shadow-inner space-y-4 text-foreground/80 animate-slideDown max-w-[1400px]">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left panel: Treatments & Notes */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 mb-1.5">Treatments / Request details</h4>
                    {treatments.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {treatments.map((treatment) => (
                          <span key={treatment} className="rounded-none border border-black/5 bg-[#fffaf3] px-3 py-1 text-xs text-foreground/75 font-semibold">
                            {treatment}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-foreground/60 bg-[#fffaf3]/50 p-2.5 rounded-none border border-black/5 font-medium leading-relaxed">
                        {booking.consultationContext ?? "No specific treatments list selected (Treatment request context applies)."}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 mb-1.5">Internal Administration Notes</h4>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Type internal notes here..."
                      rows={2}
                      className="w-full rounded-none border border-black/10 bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#17120f] outline-none transition focus:border-gold focus:bg-white placeholder:text-foreground/30 font-medium"
                    />
                  </div>
                </div>

                {/* Right panel: Referral, Attribution & Reference */}
                <div className="space-y-3 text-xs">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 border-b border-black/5 pb-1 mb-1">Attribution & Info</h4>
                  <div className="grid grid-cols-2 gap-3.5 text-xs font-semibold text-foreground/70 leading-normal">
                    <div>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider block">Reference Reference</span>
                      <code className="font-mono text-xs text-[#17120f] bg-black/5 px-1.5 py-0.5 rounded-none">{booking.bookingReference ?? "-"}</code>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider block">Traffic Attribution</span>
                      <span>{booking.source ?? "direct"} / {booking.medium ?? "none"}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider block">Campaign Target</span>
                      <span className="truncate block" title={booking.campaign ?? "-"}>{booking.campaign ?? "-"}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider block">Referrer Host</span>
                      <span className="truncate block" title={booking.referrerHost ?? "-"}>{booking.referrerHost ?? "-"}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider block">Landing URL</span>
                      <span className="truncate block" title={booking.landingPage ?? "-"}>{booking.landingPage ?? "-"}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider block">Opt-in Newsletter</span>
                      <span className={`inline-flex rounded-none px-1.5 text-[10px] ${booking.subscriberOptIn ? "bg-emerald-50 text-emerald-700 font-bold" : "bg-neutral-50 text-neutral-500"}`}>
                        {booking.subscriberOptIn ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp template block */}
              <div className="border-t border-black/5 pt-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">WhatsApp Customer Template</h4>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(booking.whatsappMessage);
                      setFeedback("Copied!");
                      setTimeout(() => setFeedback(null), 2000);
                    }}
                    className="rounded-none border border-black/10 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-foreground/60 transition-all hover:border-gold hover:text-gold hover:bg-[#fffcf7] shadow-sm"
                  >
                    Copy Template
                  </button>
                </div>
                <pre className="max-h-[140px] overflow-auto rounded-none bg-[#17120f] p-4 font-mono text-[10px] leading-relaxed text-white/80 whitespace-pre-wrap scrollbar-thin">
                  {booking.whatsappMessage}
                </pre>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
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
  const indicator = isActive ? (activeSortDirection === "asc" ? "▲" : "▼") : "";
  const params = new URLSearchParams(sortQueryBase);
  params.set("sortBy", column);
  params.set(
    "sortDirection",
    isActive && activeSortDirection === "asc" ? "desc" : "asc"
  );
  const href = `/admin/bookings?${params.toString()}`;

  return (
    <th
      className={`sticky top-0 z-30 px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em] ${className ?? ""}`}
    >
      <a href={href} className="inline-flex items-center gap-1.5 hover:text-gold transition-colors">
        <span>{label}</span>
        <span className="text-gold/90 text-[10px] font-mono">{indicator}</span>
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

  // Groupings accordion toggles
  const [activeOpen, setActiveOpen] = useState(true);
  const [confirmedOpen, setConfirmedOpen] = useState(true);
  const [closedOpen, setClosedOpen] = useState(false); // Collapsed by default

  // Sort and categorise bookings
  const { activeGroup, confirmedGroup, closedGroup } = useMemo(() => {
    const active: BookingAdminRecord[] = [];
    const confirmed: BookingAdminRecord[] = [];
    const closed: BookingAdminRecord[] = [];

    bookings.forEach((booking) => {
      if (["new", "contacted", "awaiting_deposit"].includes(booking.status)) {
        active.push(booking);
      } else if (booking.status === "confirmed") {
        confirmed.push(booking);
      } else {
        closed.push(booking);
      }
    });

    return { activeGroup: active, confirmedGroup: confirmed, closedGroup: closed };
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-black/15 bg-white/70 px-6 py-12 text-center text-sm font-semibold text-foreground/50 tracking-wide">
        No bookings matched the current filters.
      </div>
    );
  }

  const renderTableSection = (title: string, list: BookingAdminRecord[], isOpen: boolean, toggleOpen: () => void, badgeStyle: string) => {
    if (list.length === 0) return null;

    return (
      <section className="rounded-none border border-black/5 bg-white shadow-md shadow-black/[0.02] overflow-hidden transition-all duration-300">
        {/* Accordion Trigger Header */}
        <button
          type="button"
          onClick={toggleOpen}
          className="w-full flex items-center justify-between border-b border-black/5 px-6 py-4.5 bg-gradient-to-r from-[#fffaf3] to-white text-left transition-all hover:bg-[#fffaf3]/60 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gold transition-transform duration-350 ${isOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <h3 className="text-sm font-bold text-[#17120f] uppercase tracking-[0.14em]">{title}</h3>
            <span className={`inline-flex items-center rounded-none px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${badgeStyle}`}>
              {list.length} {list.length === 1 ? "entry" : "entries"}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-foreground/40 tracking-wider">
            {isOpen ? "Collapse Section" : "Expand Section"}
          </span>
        </button>

        {/* Scrollable Viewport */}
        {isOpen && (
          <div className="max-h-[380px] overflow-y-auto custom-admin-scrollbar transition-all relative">
            <table className="min-w-[950px] w-full border-collapse">
              <thead className="bg-[#17120f] text-white">
                <tr className="text-left">
                  <SortableHeader
                    label="Created"
                    column="createdAt"
                    sortQueryBase={sortQueryBase}
                    activeSortBy={activeSortBy}
                    activeSortDirection={activeSortDirection}
                    className={`left-0 ${CREATED_COLUMN_WIDTH} border-r border-white/5 bg-[#17120f] shadow-[10px_0_20px_-18px_rgba(0,0,0,0.6)]`}
                  />
                  <SortableHeader
                    label="Client Details"
                    column="clientName"
                    sortQueryBase={sortQueryBase}
                    activeSortBy={activeSortBy}
                    activeSortDirection={activeSortDirection}
                    className={`left-[145px] z-20 ${CLIENT_COLUMN_WIDTH} border-r border-white/5 bg-[#17120f] shadow-[10px_0_20px_-18px_rgba(0,0,0,0.45)]`}
                  />
                  <SortableHeader label="Preferred Schedule" column="preferredDate" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
                  <SortableHeader label="Value" column="totalValue" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
                  <SortableHeader label="Status" column="status" sortQueryBase={sortQueryBase} activeSortBy={activeSortBy} activeSortDirection={activeSortDirection} className="z-20 bg-[#17120f]" />
                  <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {list.map((booking) => (
                  <BookingTableRow
                    key={booking.id}
                    booking={booking}
                    onView={setSelectedBooking}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="space-y-6">
      {/* Scrollbar CSS */}
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
          border-radius: 0px;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(216, 187, 116, 0.6);
        }
      `}} />

      {/* Render three distinct accordion tables */}
      {renderTableSection(
        "Active Operations",
        activeGroup,
        activeOpen,
        () => setActiveOpen(!activeOpen),
        "bg-amber-50 text-amber-800 border border-amber-200"
      )}

      {renderTableSection(
        "Confirmed Schedule",
        confirmedGroup,
        confirmedOpen,
        () => setConfirmedOpen(!confirmedOpen),
        "bg-emerald-50 text-emerald-800 border border-emerald-200"
      )}

      {renderTableSection(
        "Completed & Closed",
        closedGroup,
        closedOpen,
        () => setClosedOpen(!closedOpen),
        "bg-slate-100 text-slate-700 border border-slate-200"
      )}

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
