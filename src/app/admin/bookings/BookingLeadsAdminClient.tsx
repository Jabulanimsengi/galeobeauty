"use client";

import { useState } from "react";
import type { BookingLeadRecord } from "@/lib/server/bookings-admin";

interface BookingLeadsAdminClientProps {
  initialLeads: BookingLeadRecord[];
}

export function BookingLeadsAdminClient({ initialLeads }: BookingLeadsAdminClientProps) {
  const [leads, setLeads] = useState<BookingLeadRecord[]>(initialLeads);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [activeAccordion, setActiveAccordion] = useState<Record<string, boolean>>({
    pending: true,
    actioned: false,
  });

  const [savingNotesId, setSavingNotesId] = useState<string | null>(null);
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});

  const pendingLeads = leads.filter((l) => l.status === "pending");
  const actionedLeads = leads.filter((l) => l.status === "contacted" || l.status === "dismissed");

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "contacted":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "dismissed":
        return "bg-slate-100 text-slate-800 border-slate-350";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const handleUpdateLead = async (id: string, newStatus: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/booking-leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: notes ?? null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update lead");
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                status: newStatus,
                adminNotes: notes !== undefined ? notes : lead.adminNotes,
                contactedAt: newStatus === "contacted" && !lead.contactedAt ? new Date().toISOString() : lead.contactedAt,
                updatedAt: new Date().toISOString(),
              }
            : lead
        )
      );
    } catch (error) {
      console.error("Failed to update booking lead:", error);
      alert("Failed to update lead status. Please try again.");
    }
  };

  const handleSaveNotes = async (id: string) => {
    const draftValue = notesDrafts[id];
    if (draftValue === undefined) return;

    setSavingNotesId(id);
    const lead = leads.find((l) => l.id === id);
    if (lead) {
      await handleUpdateLead(id, lead.status, draftValue);
    }
    setSavingNotesId(null);
  };

  const buildWhatsAppRecoveryUrl = (lead: BookingLeadRecord) => {
    if (!lead.phone) return "";
    let phoneDigits = lead.phone.replace(/\D/g, "");
    if (phoneDigits.startsWith("0")) {
      phoneDigits = "27" + phoneDigits.slice(1);
    } else if (!phoneDigits.startsWith("27") && phoneDigits.length === 9) {
      phoneDigits = "27" + phoneDigits;
    }

    let treatmentsStr = "";
    if (lead.bookingType === "treatment" && Array.isArray(lead.treatmentsJson)) {
      treatmentsStr = lead.treatmentsJson.map((t: any) => t.item.name).join(", ");
    } else {
      treatmentsStr = lead.consultationContext || "Free Consultation";
    }

    const text = `Hi ${lead.clientName || "there"}, this is Galeo Beauty. We noticed you started booking a ${treatmentsStr} for ${
      lead.preferredDate
        ? new Date(lead.preferredDate).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })
        : "an appointment"
    } but didn't complete the request. Would you like us to help you finalize your appointment?`;

    return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderLeadsSection = (
    title: string,
    accordionKey: string,
    leadItems: BookingLeadRecord[],
    badgeStyle: string
  ) => {
    const isAccordionOpen = activeAccordion[accordionKey];

    return (
      <div className="rounded-none border border-black/5 bg-white shadow-sm overflow-hidden">
        {/* Accordion Header */}
        <button
          onClick={() =>
            setActiveAccordion((prev) => ({
              ...prev,
              [accordionKey]: !prev[accordionKey],
            }))
          }
          className="flex w-full items-center justify-between bg-[#fffcf8] px-5 py-4 text-left border-b border-black/5 transition hover:bg-[#fff9ef]"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-[#17120f] uppercase tracking-[0.14em]">{title}</h3>
            <span className={`inline-flex items-center rounded-none px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${badgeStyle}`}>
              {leadItems.length} {leadItems.length === 1 ? "entry" : "entries"}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className={`w-4 h-4 text-gold transition-transform duration-200 ${isAccordionOpen ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {isAccordionOpen && (
          <div className="animate-fadeIn">
            {leadItems.length === 0 ? (
              <div className="rounded-none border border-dashed border-black/15 bg-white/70 px-6 py-12 text-center text-sm font-semibold text-foreground/50 tracking-wide">
                No booking leads in this category.
              </div>
            ) : (
              <div className="max-h-[500px] overflow-auto custom-admin-scrollbar">
                <table className="w-full min-w-[800px] border-collapse text-left text-xs text-foreground">
                  <thead>
                    <tr className="border-b border-black/10 text-white font-bold">
                      <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em]">Last Updated</th>
                      <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em]">Client Details</th>
                      <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em]">Preferred Schedule</th>
                      <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em]">Estimated Value</th>
                      <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em]">Status</th>
                      <th className="sticky top-0 z-20 bg-[#17120f] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 bg-white">
                    {leadItems.map((lead) => {
                      const isExpanded = expandedRows.has(lead.id);
                      const currentNotes = notesDrafts[lead.id] ?? lead.adminNotes ?? "";
                      const hasNotesChanged = currentNotes !== (lead.adminNotes ?? "");

                      let treatmentsList = "";
                      if (lead.bookingType === "treatment" && Array.isArray(lead.treatmentsJson)) {
                        treatmentsList = lead.treatmentsJson.map((t: any) => t.item.name).join(", ");
                      } else {
                        treatmentsList = lead.consultationContext || "Free Consultation";
                      }

                      return (
                        <tr key={lead.id} className="contents">
                          <tr
                            className={`group border-b border-black/5 transition hover:bg-[#fffcf8] ${
                              isExpanded ? "bg-[#fffefb]" : ""
                            }`}
                          >
                            {/* Date */}
                            <td className="px-4 py-3.5 font-medium whitespace-nowrap">
                              <span className="font-semibold block">{formatDateTime(lead.updatedAt)}</span>
                              <span className="text-[10px] text-foreground/40 block mt-0.5">Started: {formatDateTime(lead.createdAt)}</span>
                            </td>

                            {/* Client Name & Phone */}
                            <td className="px-4 py-3.5 font-medium">
                              <span className="font-bold text-sm block">{lead.clientName || "Unnamed Guest"}</span>
                              <span className="text-[10px] text-foreground/50 block mt-0.5 font-semibold">
                                {lead.phone || "No Phone"} {lead.email ? ` | ${lead.email}` : ""}
                              </span>
                            </td>

                            {/* Preferred Schedule */}
                            <td className="px-4 py-3.5 font-medium">
                              <span className="font-semibold block">{lead.preferredDate ? formatDate(lead.preferredDate) : "TBD"}</span>
                              {lead.preferredTimeSlot && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40 bg-black/5 px-2 py-0.5 rounded-none inline-block mt-1">
                                  {lead.preferredTimeSlot}
                                </span>
                              )}
                            </td>

                            {/* Estimated Value */}
                            <td className="px-4 py-3.5 font-medium text-sm text-[#17120f] font-mono">
                              {lead.bookingType === "consultation" ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gold">FREE CONSULT</span>
                              ) : lead.totalValue ? (
                                `R ${lead.totalValue.toLocaleString()}`
                              ) : (
                                "R 0"
                              )}
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3.5">
                              <span className={`inline-flex items-center rounded-none border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyles(lead.status)}`}>
                                {lead.status}
                              </span>
                            </td>

                            {/* Actions toggle */}
                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-2">
                                {lead.phone && (
                                  <a
                                    href={buildWhatsAppRecoveryUrl(lead)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-none bg-[#25d366] text-white hover:bg-[#128c7e] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] inline-flex items-center gap-1 shadow-sm transition"
                                    title="Open WhatsApp chat with recuperation message"
                                  >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.176 3.466l-.782 2.861 2.93-.769a5.722 5.722 0 002.444.578h.002c3.18 0 5.767-2.587 5.768-5.767 0-3.18-2.587-5.765-5.769-5.765zm3.411 8.21c-.14.394-.72.748-1.02.774-.298.026-.677.141-2.079-.444-1.794-.748-2.922-2.585-3.012-2.707-.09-.12-.733-.974-.733-1.859 0-.885.462-1.32.627-1.49.165-.17.362-.213.482-.213.12 0 .241.002.346.007.11.005.257-.042.404.31.15.358.513 1.25.558 1.343.045.093.075.202.015.32-.06.12-.09.195-.18.298-.09.103-.189.23-.27.31-.09.09-.184.186-.079.366.105.18.468.773.998 1.246.684.61 1.26.8 1.44.89.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.095.829zM12 2C6.482 2 2 6.482 2 12c0 1.83.497 3.548 1.36 5.03L2 22l5.12-1.328A9.92 9.92 0 0012 22c5.518 0 10-4.482 10-10S17.518 2 12 2zm0 18c-1.63 0-3.16-.48-4.46-1.31l-.32-.19-3.03.79.8-2.95-.21-.34A7.952 7.952 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                    WhatsApp
                                  </a>
                                )}

                                <button
                                  onClick={() => toggleRow(lead.id)}
                                  className="rounded-none border border-black/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-foreground/60 transition hover:border-gold hover:text-gold hover:bg-[#fffcf7]"
                                >
                                  {isExpanded ? "Hide Details" : "View Details"}
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Expandable row */}
                          {isExpanded && (
                            <tr className="bg-[#fffdf9]">
                              <td colSpan={6} className="p-5 border-b border-black/10">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
                                  {/* Left: Lead Context & UTMs */}
                                  <div className="md:col-span-8 space-y-4">
                                    <div>
                                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 mb-1.5">Selected Treatment / Intent</h4>
                                      <div className="bg-white p-3 border border-black/5 font-semibold text-sm text-[#17120f]">
                                        {treatmentsList}
                                      </div>
                                    </div>

                                    {/* UTM Attribution details */}
                                    <div>
                                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 border-b border-black/5 pb-1 mb-2">Marketing Attribution</h4>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        <div className="bg-white p-2 border border-black/5">
                                          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider block">Source</span>
                                          <span className="text-[11px] font-bold font-mono text-foreground/80 break-words">{lead.source || "Direct / Organic"}</span>
                                        </div>
                                        <div className="bg-white p-2 border border-black/5">
                                          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider block">Medium</span>
                                          <span className="text-[11px] font-bold font-mono text-foreground/80 break-words">{lead.medium || "None"}</span>
                                        </div>
                                        <div className="bg-white p-2 border border-black/5">
                                          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider block">Campaign</span>
                                          <span className="text-[11px] font-bold font-mono text-foreground/80 break-words">{lead.campaign || "None"}</span>
                                        </div>
                                        <div className="bg-white p-2 border border-black/5 sm:col-span-3">
                                          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider block">Landing Page</span>
                                          <span className="text-[10px] font-medium text-foreground/70 break-all">{lead.landingPage || "-"}</span>
                                        </div>
                                        <div className="bg-white p-2 border border-black/5 sm:col-span-3">
                                          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider block">Enquiry Triggered Page</span>
                                          <span className="text-[10px] font-medium text-foreground/70 break-all">{lead.enquiryPage || "-"}</span>
                                        </div>
                                        <div className="bg-white p-2 border border-black/5 sm:col-span-3">
                                          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider block">Referrer Host</span>
                                          <span className="text-[10px] font-medium text-foreground/70 break-all">{lead.referrerHost || "-"}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Notes & Recover Actions */}
                                  <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                                    {/* Admin notes textarea */}
                                    <div>
                                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 mb-1.5">Internal Administration Notes</h4>
                                      <textarea
                                        value={currentNotes}
                                        onChange={(e) =>
                                          setNotesDrafts((prev) => ({
                                            ...prev,
                                            [lead.id]: e.target.value,
                                          }))
                                        }
                                        className="w-full h-28 rounded-none border border-black/10 bg-white p-2.5 text-xs outline-none transition focus:border-gold"
                                        placeholder="Add follow-up notes, e.g., 'Called customer on 20th May. Said she will book next week.'"
                                      />
                                      <div className="mt-1.5 flex items-center justify-between">
                                        <span className="text-[9px] text-foreground/40 font-medium">Auto-saves on action click</span>
                                        <button
                                          onClick={() => handleSaveNotes(lead.id)}
                                          disabled={savingNotesId === lead.id || !hasNotesChanged}
                                          className="rounded-none bg-[#17120f] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-gold hover:text-[#17120f] disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                          {savingNotesId === lead.id ? "Saving..." : "Save Notes"}
                                        </button>
                                      </div>
                                    </div>

                                    {/* Recover Status Actions */}
                                    <div className="border-t border-black/5 pt-4">
                                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45 mb-2">Lead Recovery Actions</h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        <button
                                          onClick={() => handleUpdateLead(lead.id, "contacted", currentNotes)}
                                          disabled={lead.status === "contacted"}
                                          className="rounded-none bg-gold border border-gold px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#17120f] transition hover:bg-[#d8bb74] hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                                        >
                                          Mark Contacted
                                        </button>
                                        <button
                                          onClick={() => handleUpdateLead(lead.id, "dismissed", currentNotes)}
                                          disabled={lead.status === "dismissed"}
                                          className="rounded-none bg-white border border-black/10 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-foreground/60 transition hover:border-gold hover:text-gold text-center"
                                        >
                                          Dismiss Lead
                                        </button>
                                      </div>
                                      {lead.contactedAt && (
                                        <p className="mt-2 text-[9px] text-foreground/40 font-semibold text-center">
                                          First Contacted: {formatDateTime(lead.contactedAt)}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Pending Active Recuperation Leads */}
      {renderLeadsSection("Abandoned / Incomplete Leads", "pending", pendingLeads, "bg-amber-500 text-white")}

      {/* Actioned Leads (Contacted/Dismissed) */}
      {renderLeadsSection("Actioned Recovery Leads", "actioned", actionedLeads, "bg-slate-700 text-white")}
    </div>
  );
}
