"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Send,
  CheckCircle,
  Calendar,
  User,
  CreditCard,
  Copy,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SelectedTreatment,
  BookingState,
  initialBookingState,
  timeSlotOptions,
} from "@/lib/booking-types";
import { businessInfo } from "@/lib/constants";

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  treatments: SelectedTreatment[];
}

export function BookingSheet({ isOpen, onClose, treatments }: BookingSheetProps) {
  const [state, setState] = useState<BookingState>({
    ...initialBookingState,
    treatments,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Booking reference: Client's Name and Surname in uppercase
  const bookingReference = useMemo(() => {
    const name = state.userDetails.name.trim();
    if (!name) return "";
    return name.toUpperCase().replace(/\s+/g, " ");
  }, [state.userDetails.name]);

  // Copy to clipboard helper
  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Update treatments when prop changes
  useEffect(() => {
    setState((prev) => ({ ...prev, treatments }));
  }, [treatments]);

  // Reset state when closing
  const handleClose = () => {
    setState({
      ...initialBookingState,
      treatments: [],
    });
    onClose();
  };

  // Update user details
  const updateUserDetails = (field: keyof BookingState["userDetails"], value: string) => {
    setState((prev) => ({
      ...prev,
      userDetails: { ...prev.userDetails, [field]: value },
    }));
  };

  // Update appointment
  const updateAppointment = (field: keyof BookingState["appointment"], value: string) => {
    setState((prev) => ({
      ...prev,
      appointment: { ...prev.appointment, [field]: value },
    }));
  };

  // Navigation
  const goToStep = (step: 1 | 2 | 3) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const nextStep = () => {
    if (state.currentStep < 3) {
      setState((prev) => ({ ...prev, currentStep: (prev.currentStep + 1) as 1 | 2 | 3 }));
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({ ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 }));
    }
  };

  // Validation
  const isStep1Valid = state.userDetails.name.trim() && state.userDetails.phone.trim();
  const isStep2Valid = state.appointment.date && state.appointment.timeSlot;

  // Calculate totals
  const calculateTotal = () => {
    let total = 0;
    for (const item of state.treatments) {
      const priceStr = item.item.price.replace(/[R\s,]/g, "");
      const price = parseFloat(priceStr) || 0;
      total += price;
    }
    return total;
  };

  const calculateTotalDuration = () => {
    return state.treatments.reduce((acc, item) => {
      if (!item.item.duration) return acc;
      const hours = item.item.duration.match(/(\d+)\s*hr/)?.[1] || "0";
      const mins = item.item.duration.match(/(\d+)\s*min/)?.[1] || "0";
      return acc + parseInt(hours) * 60 + parseInt(mins);
    }, 0);
  };

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    if (hours === 0) return `${minutes} mins`;
    if (minutes === 0) return `${hours}hr`;
    return `${hours}hr ${minutes} mins`;
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get time slot label
  const getTimeSlotLabel = (slot: string) => {
    const found = timeSlotOptions.find((t) => t.value === slot);
    return found ? `${found.label} (${found.time})` : slot;
  };

  // Submit booking via WhatsApp
  const handleSubmit = () => {
    if (state.treatments.length === 0) return;

    const treatmentsList = state.treatments
      .map(
        (t, i) =>
          `${i + 1}. ${t.item.name}${t.item.duration ? ` (${t.item.duration})` : ""} - ${t.item.price}`
      )
      .join("\n");

    const total = calculateTotal();
    const depositAmount = Math.round(total / 2);
    const totalDuration = calculateTotalDuration();

    const bankingDetails = businessInfo.banking
      ? `\n*Banking Details for Deposit:*
Account: ${businessInfo.banking.companyName}
Bank: ${businessInfo.banking.bank}
Account No: ${businessInfo.banking.accountNumber}
Branch: ${businessInfo.banking.branch} (${businessInfo.banking.branchCode})`
      : "";

    const message = `*New Booking Request - Galeo Beauty*

*Treatments Selected (${state.treatments.length})*
${treatmentsList}

*Total:* R ${total.toLocaleString()}${totalDuration > 0 ? `\n*Estimated Duration:* ${formatDuration(totalDuration)}` : ""}

*Client Information*
Name: ${state.userDetails.name}
Phone: ${state.userDetails.phone}${state.userDetails.email ? `\nEmail: ${state.userDetails.email}` : ""}

*Preferred Appointment*
Date: ${formatDate(state.appointment.date)}
Time: ${getTimeSlotLabel(state.appointment.timeSlot)}

*Payment:* 50% Deposit Required (R ${depositAmount.toLocaleString()})
*Payment Reference:* ${bookingReference}
${bankingDetails}

---
📱 *Source:* Customer found this service on galeobeauty.com`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessInfo.socials.whatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    handleClose();
  };

  const steps = [
    { number: 1, label: "Details", icon: User },
    { number: 2, label: "Date & Time", icon: Calendar },
    { number: 3, label: "Confirm", icon: CreditCard },
  ];

  const total = calculateTotal();
  const totalDuration = calculateTotalDuration();

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col overflow-hidden h-auto max-h-[85vh] my-auto rounded-l-2xl sm:rounded-2xl sm:mr-4"
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b bg-foreground text-background">
          <SheetTitle className="text-background font-serif text-xl">
            Book Treatments
          </SheetTitle>
          <SheetDescription className="text-background/70">
            <span className="block font-medium text-background">
              {state.treatments.length} {state.treatments.length === 1 ? "treatment" : "treatments"} selected
            </span>
            <span className="flex items-center gap-2 mt-1">
              <span className="text-gold font-semibold">R {total.toLocaleString()}</span>
              {totalDuration > 0 && (
                <>
                  <span className="text-background/50">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(totalDuration)}
                  </span>
                </>
              )}
            </span>
          </SheetDescription>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-background/20">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.number === 1) goToStep(1);
                    else if (step.number === 2 && isStep1Valid) goToStep(2);
                    else if (step.number === 3 && isStep1Valid && isStep2Valid) goToStep(3);
                  }}
                  className={`flex items-center gap-2 transition-all ${state.currentStep === step.number
                    ? "text-gold"
                    : state.currentStep > step.number
                      ? "text-background/90"
                      : "text-background/40"
                    }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${state.currentStep === step.number
                      ? "bg-gold text-foreground"
                      : state.currentStep > step.number
                        ? "bg-background/20 text-background"
                        : "bg-background/10 text-background/40"
                      }`}
                  >
                    {state.currentStep > step.number ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-all ${state.currentStep > step.number ? "bg-gold" : "bg-background/20"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: User Details */}
            {state.currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-foreground mb-4">Your Details</h3>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={state.userDetails.name}
                    onChange={(e) => updateUserDetails("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={state.userDetails.phone}
                    onChange={(e) => updateUserDetails("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    Email Address <span className="text-muted-foreground/60">(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={state.userDetails.email}
                    onChange={(e) => updateUserDetails("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-gold outline-none transition-all"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {state.currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Select Date</h3>
                  <input
                    type="date"
                    value={state.appointment.date}
                    onChange={(e) => updateAppointment("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4">Select Time Slot</h3>
                  <div className="space-y-2">
                    {timeSlotOptions.map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => updateAppointment("timeSlot", slot.value)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${state.appointment.timeSlot === slot.value
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border/40 bg-white hover:border-gold/50"
                          }`}
                      >
                        <span className="font-medium block">{slot.label}</span>
                        <span className="text-sm text-muted-foreground">{slot.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {state.currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h3 className="font-semibold text-foreground">Booking Summary</h3>

                {/* Treatments Summary */}
                <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Treatments</p>
                  {state.treatments.map((t, i) => (
                    <div key={i} className="flex justify-between items-start text-sm">
                      <div>
                        <p className="font-medium text-foreground">{t.item.name}</p>
                        {t.item.duration && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t.item.duration}
                          </p>
                        )}
                      </div>
                      <span className="font-semibold text-gold">{t.item.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gold/30 pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold text-gold">R {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Details Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{state.userDetails.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{state.userDetails.phone}</span>
                  </div>
                  {state.userDetails.email && (
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{state.userDetails.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{formatDate(state.appointment.date)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">
                      {getTimeSlotLabel(state.appointment.timeSlot)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="font-medium text-amber-600">50% Deposit Required</span>
                  </div>
                </div>

                {/* 50% Deposit Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800 text-sm">50% Deposit Required</p>
                    <p className="text-xs text-amber-700 mt-1">
                      A 50% deposit of <span className="font-bold">R {Math.round(total / 2).toLocaleString()}</span> is required to secure your appointment.
                    </p>
                  </div>
                </div>

                {/* Booking Reference */}
                {bookingReference && (
                  <div className="bg-gold/10 border border-gold/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Your Booking Reference</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-mono font-bold text-gold tracking-wider">{bookingReference}</p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(bookingReference, "reference")}
                        className="p-2 rounded-lg bg-gold/20 hover:bg-gold/30 transition-colors"
                      >
                        {copiedField === "reference" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gold" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Use this as your payment reference</p>
                  </div>
                )}

                {/* Banking Details */}
                {businessInfo.banking && (
                  <div className="bg-secondary/30 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-foreground" />
                      <p className="font-semibold text-foreground text-sm">Banking Details</p>
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {[
                        { label: "Account", value: businessInfo.banking.companyName },
                        { label: "Bank", value: businessInfo.banking.bank },
                        { label: "Acc No", value: businessInfo.banking.accountNumber },
                        { label: "Branch", value: `${businessInfo.banking.branch} (${businessInfo.banking.branchCode})` },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-foreground">{item.value}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(item.value, item.label)}
                              className="p-0.5 rounded hover:bg-secondary transition-colors"
                            >
                              {copiedField === item.label ? (
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  By confirming, you agree to our 24-hour cancellation policy.
                  You'll be redirected to WhatsApp to finalize your booking.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t bg-background flex gap-3">
          {state.currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {state.currentStep < 3 && (
            <Button
              onClick={nextStep}
              disabled={
                (state.currentStep === 1 && !isStep1Valid) ||
                (state.currentStep === 2 && !isStep2Valid)
              }
              className="flex-1 bg-gold hover:bg-gold-dark text-white"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {state.currentStep === 3 && (
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gold hover:bg-gold-dark text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Confirm via WhatsApp
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
