"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TurnstileWidget } from "@/components/booking/TurnstileWidget";
import {
  SelectedTreatment,
  BookingState,
  initialBookingState,
  timeSlotOptions,
} from "@/lib/booking-types";
import {
  buildTrackedWhatsAppUrl,
  getStoredAttribution,
  type StoredAttribution,
  trackBookingSheetOpen,
  trackBookingStepView,
  trackBookingSubmit,
  trackWhatsAppClick,
} from "@/lib/attribution";
import type { BookingSaveRequest } from "@/lib/bookings";
import { businessInfo } from "@/lib/constants";
import { getTurnstileSiteKey } from "@/lib/turnstile";

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  treatments?: SelectedTreatment[];
  bookingType?: "treatment" | "consultation";
  consultationContext?: string;
}

function getBookingRequirementsStatus(state: BookingState) {
  const hasRequiredName = !getFullNameError(state.userDetails.name);
  const hasRequiredPhone = !getSouthAfricanPhoneError(state.userDetails.phone);
  const hasRequiredDate = Boolean(state.appointment.date);
  const hasRequiredTimeSlot = Boolean(state.appointment.timeSlot);
  const hasRequiredTreatments =
    state.bookingType === "treatment" ? Boolean(state.treatments?.length) : true;
  const requiredChecks = [
    hasRequiredName,
    hasRequiredPhone,
    hasRequiredDate,
    hasRequiredTimeSlot,
    hasRequiredTreatments,
  ];
  const requiredFieldsTotal =
    state.bookingType === "treatment" ? requiredChecks.length : requiredChecks.length - 1;
  const requiredFieldsCompleted = requiredChecks
    .slice(0, requiredFieldsTotal)
    .filter(Boolean).length;

  return {
    isComplete: requiredFieldsCompleted === requiredFieldsTotal,
    requiredFieldsCompleted,
    requiredFieldsTotal,
    hasRequiredName,
    hasRequiredPhone,
    hasRequiredDate,
    hasRequiredTimeSlot,
    hasRequiredTreatments,
    hasOptionalEmail: Boolean(state.userDetails.email.trim()),
  };
}

function buildBookingRequirementsStatus({
  bookingType,
  treatments,
  userDetails,
  appointment,
}: Pick<BookingState, "userDetails" | "appointment"> & {
  bookingType: BookingState["bookingType"];
  treatments?: SelectedTreatment[];
}) {
  return getBookingRequirementsStatus({
    ...initialBookingState,
    bookingType,
    treatments,
    userDetails,
    appointment,
  });
}

function normalizeSouthAfricanPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  let normalizedDigits = digits;

  if (normalizedDigits.startsWith("00")) {
    normalizedDigits = normalizedDigits.slice(2);
  }

  if (normalizedDigits.startsWith("0")) {
    normalizedDigits = `27${normalizedDigits.slice(1)}`;
  } else if (!normalizedDigits.startsWith("27")) {
    normalizedDigits = `27${normalizedDigits}`;
  }

  normalizedDigits = normalizedDigits.slice(0, 11);

  return `+${normalizedDigits}`;
}

function getSouthAfricanPhoneError(value: string) {
  if (!value.trim()) {
    return "Use a South African number in +27 format.";
  }

  const digits = value.replace(/\D/g, "");

  if (!value.startsWith("+27") || !digits.startsWith("27")) {
    return "Your number must start with +27.";
  }

  if (digits.length !== 11) {
    return "Please insert the correct number. It must have 11 digits including the country code.";
  }

  return null;
}

function getFullNameError(value: string) {
  const normalized = value.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return "Please enter your name and surname.";
  }

  const parts = normalized.split(" ").filter(Boolean);

  if (parts.length < 2) {
    return "Please enter both your name and surname.";
  }

  if (parts.some((part) => part.length < 2)) {
    return "Please enter your full name and surname.";
  }

  return null;
}

export function BookingSheet({
  isOpen,
  onClose,
  treatments = [],
  bookingType = "treatment",
  consultationContext
}: BookingSheetProps) {
  const turnstileSiteKey = getTurnstileSiteKey();
  const isTurnstileEnabled = Boolean(turnstileSiteKey);
  const dateRailRef = useRef<HTMLDivElement | null>(null);
  const dateOptions = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 21 }, (_, index) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + index);
      const dayOfWeek = nextDate.getDay();
      const isToday = index === 0;
      const isTomorrow = index === 1;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      let badgeLabel = "Weekday";
      if (isToday) badgeLabel = "Today";
      else if (isTomorrow) badgeLabel = "Tomorrow";
      else if (isWeekend) badgeLabel = dayOfWeek === 0 ? "Sunday" : "Weekend";

      return {
        value: nextDate.toISOString().split("T")[0],
        shortDay: nextDate.toLocaleDateString("en-ZA", { weekday: "short" }),
        dayNumber: nextDate.toLocaleDateString("en-ZA", { day: "numeric" }),
        monthLabel: nextDate.toLocaleDateString("en-ZA", { month: "short" }),
        fullLabel: nextDate.toLocaleDateString("en-ZA", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
        isToday,
        isTomorrow,
        isWeekend,
        badgeLabel,
      };
    });
  }, []);
  const [state, setState] = useState<BookingState>({
    ...initialBookingState,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMoreDates, setShowMoreDates] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const treatmentNames = useMemo(
    () => treatments.map((t) => t.item.name),
    [treatments]
  );
  const treatmentCount = treatments.length;
  const selectedDateOption = dateOptions.find((option) => option.value === state.appointment.date);
  const visibleDateOptions = showMoreDates ? dateOptions : dateOptions.slice(0, 7);
  const fullNameError = getFullNameError(state.userDetails.name);
  const phoneError = getSouthAfricanPhoneError(state.userDetails.phone);
  const hasNameInput = state.userDetails.name.trim().length > 0;
  const hasPhoneInput = state.userDetails.phone.trim().length > 0;
  const bookingRequirementsStatus = useMemo(
    () =>
      buildBookingRequirementsStatus({
        bookingType,
        treatments,
        userDetails: state.userDetails,
        appointment: state.appointment,
      }),
    [bookingType, state.appointment, state.userDetails, treatments]
  );
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const attribution = getStoredAttribution();
    const currentPage = typeof window !== "undefined" ? window.location.pathname : "/";

    trackBookingSheetOpen({
      attribution,
      bookingType,
      currentPage,
      treatmentCount,
      treatmentNames,
      consultationContext,
    });
  }, [bookingType, consultationContext, isOpen, treatmentCount, treatmentNames]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const attribution = getStoredAttribution();
    const currentPage = typeof window !== "undefined" ? window.location.pathname : "/";

    trackBookingStepView({
      attribution,
      bookingType,
      currentPage,
      step: state.currentStep,
      treatmentCount,
      treatmentNames,
      consultationContext,
    });
  }, [bookingType, consultationContext, isOpen, state.currentStep, treatmentCount, treatmentNames]);

  useEffect(() => {
    if (!showMoreDates || !dateRailRef.current || !selectedDateOption) {
      return;
    }

    const selectedButton = dateRailRef.current.querySelector<HTMLButtonElement>(
      `[data-date="${selectedDateOption.value}"]`
    );

    selectedButton?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedDateOption, showMoreDates]);

  useEffect(() => {
    if (!captchaToken) {
      return;
    }

    setState((prev) => ({
      ...prev,
      error:
        prev.error && /verification/i.test(prev.error)
          ? null
          : prev.error,
    }));
  }, [captchaToken]);

  // Reset state when closing
  const handleClose = () => {
    setState({
      ...initialBookingState,
    });
    setShowMoreDates(false);
    setCaptchaToken(null);
    setCaptchaError(null);
    setCaptchaResetKey((previous) => previous + 1);
    onClose();
  };

  // Update user details
  function updateUserDetails(field: keyof BookingState["userDetails"], value: string) {
    setState((prev) => ({
      ...prev,
      userDetails: { ...prev.userDetails, [field]: value },
    }));
  }

  // Update appointment
  function updateAppointment(field: keyof BookingState["appointment"], value: string) {
    setState((prev) => ({
      ...prev,
      appointment: { ...prev.appointment, [field]: value },
    }));
  }

  // Navigation
  const goToStep = (step: 1 | 2 | 3) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
      appointment:
        step === 2 && !prev.appointment.date
          ? { ...prev.appointment, date: dateOptions[0]?.value ?? "" }
          : prev.appointment,
    }));
  };

  const nextStep = () => {
    if (state.currentStep < 3) {
      setState((prev) => {
        const nextStepValue = (prev.currentStep + 1) as 1 | 2 | 3;

        return {
          ...prev,
          currentStep: nextStepValue,
          appointment:
            nextStepValue === 2 && !prev.appointment.date
              ? { ...prev.appointment, date: dateOptions[0]?.value ?? "" }
              : prev.appointment,
        };
      });
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({ ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 }));
    }
  };

  // Validation
  const isStep1Valid = !fullNameError && !phoneError;
  const isStep2Valid = state.appointment.date && state.appointment.timeSlot;

  // Calculate totals
  const calculateTotal = () => {
    let total = 0;
    for (const item of treatments) {
      const priceStr = item.item.price.replace(/[R\s,]/g, "");
      const price = parseFloat(priceStr) || 0;
      total += price;
    }
    return total;
  };

  const calculateTotalDuration = () => {
    return treatments.reduce((acc, item) => {
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
  const handleSubmit = async () => {
    if (!bookingRequirementsStatus.isComplete) {
      return;
    }

    if (isTurnstileEnabled && !captchaToken) {
      setState((prev) => ({
        ...prev,
        error: captchaError ?? "Please complete the human verification before confirming your booking.",
      }));
      return;
    }

    let message = "";
    let totalValue: number | undefined;
    let submitTreatmentNames: string[] | undefined;
    let attribution: StoredAttribution | null = null;
    let currentPage = "/";

    if (bookingType === "consultation") {
      // Consultation message format
      message = `*Free Consultation Request - Galeo Beauty*

*Type:* ${consultationContext || "General Consultation"}

*Client Information*
Name: ${state.userDetails.name}
Phone: ${state.userDetails.phone}${state.userDetails.email ? `\nEmail: ${state.userDetails.email}` : ""}

*Preferred Date & Time*
Date: ${formatDate(state.appointment.date)}
Time: ${getTimeSlotLabel(state.appointment.timeSlot)}`;
    } else {
      // Treatment booking message format
      if (treatments.length === 0) return;

      const treatmentsList = treatments
        .map(
          (t, i) =>
            `${i + 1}. ${t.item.name}${t.item.duration ? ` (${t.item.duration})` : ""} - ${t.item.price}`
        )
        .join("\n");

      const total = calculateTotal();
      const depositAmount = Math.round(total / 2);
      const totalDuration = calculateTotalDuration();
      totalValue = total;
      submitTreatmentNames = treatments.map((t) => t.item.name);

      const bankingDetails = businessInfo.banking
        ? `\n*Banking Details for Deposit:*
Account: ${businessInfo.banking.companyName}
Bank: ${businessInfo.banking.bank}
Account No: ${businessInfo.banking.accountNumber}
Branch: ${businessInfo.banking.branch} (${businessInfo.banking.branchCode})`
        : "";

      message = `*New Booking Request - Galeo Beauty*

*Treatments Selected (${treatments.length})*
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
${bankingDetails}`;
    }

    attribution = getStoredAttribution();
    currentPage = typeof window !== "undefined" ? window.location.pathname : "/";
    const bookingPayload: BookingSaveRequest = {
      bookingType,
      consultationContext,
      captchaToken: captchaToken ?? undefined,
      currentPage,
      bookingReference: bookingReference || undefined,
      whatsappMessage: message,
      whatsappDestination: businessInfo.socials.whatsapp,
      totalValue,
      userDetails: state.userDetails,
      appointment: state.appointment,
      treatments,
      attribution,
    };

    setState((prev) => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }));

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        if (response.status === 400 && /verification/i.test(result?.error ?? "")) {
          setCaptchaToken(null);
          setCaptchaError(result?.error ?? "Please complete the human verification and try again.");
          setCaptchaResetKey((previous) => previous + 1);
        }
        throw new Error(result?.error ?? "We could not save this booking right now. Please try again.");
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "We could not save this booking right now. Please try again.";

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: message,
      }));
      return;
    }

    const whatsappUrl = buildTrackedWhatsAppUrl({
      phone: businessInfo.socials.whatsapp,
      message,
      attribution,
      currentPage,
    });

    trackWhatsAppClick({
      attribution,
      context: bookingType === "consultation" ? "booking_sheet_consultation" : "booking_sheet_treatment",
      currentPage,
    });

    trackBookingSubmit({
      attribution,
      bookingType,
      currentPage,
      treatmentCount: bookingType === "treatment" ? treatmentCount : undefined,
      treatmentNames: submitTreatmentNames,
      totalValue,
      consultationContext,
      requirementsComplete: bookingRequirementsStatus.isComplete,
      requiredFieldsCompleted: bookingRequirementsStatus.requiredFieldsCompleted,
      requiredFieldsTotal: bookingRequirementsStatus.requiredFieldsTotal,
      hasRequiredName: bookingRequirementsStatus.hasRequiredName,
      hasRequiredPhone: bookingRequirementsStatus.hasRequiredPhone,
      hasRequiredDate: bookingRequirementsStatus.hasRequiredDate,
      hasRequiredTimeSlot: bookingRequirementsStatus.hasRequiredTimeSlot,
      hasRequiredTreatments: bookingRequirementsStatus.hasRequiredTreatments,
      hasOptionalEmail: bookingRequirementsStatus.hasOptionalEmail,
    });

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
        side={isMobile ? "bottom" : "right"}
        className={
          isMobile
            ? "w-full p-0 flex flex-col overflow-hidden max-h-[90vh] rounded-t-2xl !gap-0"
            : "w-full sm:max-w-md p-0 flex flex-col overflow-hidden h-auto max-h-[85vh] my-auto rounded-l-2xl sm:rounded-2xl sm:mr-4"
        }
      >
        {/* Header - drag handle is inside the dark bg on mobile */}
        <SheetHeader className={`p-6 pb-4 border-b bg-foreground text-background ${isMobile ? "pt-0" : ""}`}>
          {isMobile && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-background/30" />
            </div>
          )}
          <SheetTitle className="text-background font-serif text-xl">
            {bookingType === "consultation" ? "Book Free Consultation" : "Book Treatments"}
          </SheetTitle>
          <SheetDescription className="text-background/70">
            {bookingType === "consultation" ? (
              <span className="block font-medium text-background">
                {consultationContext || "General Consultation"}
              </span>
            ) : (
              <>
                <span className="block font-medium text-background">
                  {treatmentCount} {treatmentCount === 1 ? "treatment" : "treatments"} selected
                </span>
                <span className="flex items-center gap-2 mt-1">
                  <span className="text-gold font-semibold">R {total.toLocaleString()}</span>
                  {totalDuration > 0 && (
                    <>
                      <span className="text-background/50">|</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(totalDuration)}
                      </span>
                    </>
                  )}
                </span>
              </>
            )}
          </SheetDescription>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-background/20">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <button
                  type="button"
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
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-foreground mb-4">Your Details</h3>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Nicole Smith"
                    value={state.userDetails.name}
                    onChange={(e) => updateUserDetails("name", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/30 border outline-none transition-all ${
                      hasNameInput && fullNameError
                        ? "border-red-300 bg-red-50/60 focus:border-red-400"
                        : "border-transparent focus:bg-background focus:border-gold"
                    }`}
                  />
                  <p className={`mt-2 text-xs ${hasNameInput && fullNameError ? "text-red-600" : "text-muted-foreground"}`}>
                    {hasNameInput && fullNameError ? fullNameError : "Enter both your name and surname. This will also be used for your booking reference."}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+27691230520"
                    value={state.userDetails.phone}
                    inputMode="numeric"
                    autoComplete="tel"
                    onFocus={() => {
                      if (!state.userDetails.phone.trim()) {
                        updateUserDetails("phone", "+27");
                      }
                    }}
                    onBlur={() => {
                      if (state.userDetails.phone === "+27") {
                        updateUserDetails("phone", "");
                      }
                    }}
                    onChange={(e) => updateUserDetails("phone", normalizeSouthAfricanPhone(e.target.value))}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/30 border outline-none transition-all ${
                      hasPhoneInput && phoneError
                        ? "border-red-300 bg-red-50/60 focus:border-red-400"
                        : "border-transparent focus:bg-background focus:border-gold"
                    }`}
                  />
                  <p className={`mt-2 text-xs ${hasPhoneInput && phoneError ? "text-red-600" : "text-muted-foreground"}`}>
                    {hasPhoneInput && phoneError ? phoneError : "Use +27 followed by 9 digits, for example +27691230520."}
                  </p>
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
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Select Date</h3>
                  <div className="rounded-[1.6rem] border border-border/50 bg-secondary/10 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {selectedDateOption ? selectedDateOption.fullLabel : "Choose your preferred day"}
                        </p>
                      </div>
                      <div className="hidden rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold sm:inline-flex">
                        Next 7 Days
                      </div>
                    </div>

                    <div ref={dateRailRef} className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                      {visibleDateOptions.map((option) => {
                        const isSelected = state.appointment.date === option.value;

                        return (
                          <button
                            type="button"
                            key={option.value}
                            data-date={option.value}
                            onClick={() => updateAppointment("date", option.value)}
                            className={`min-w-[76px] shrink-0 rounded-[1.15rem] border px-3 py-3 text-center transition-all ${
                              isSelected
                                ? "border-gold bg-gold text-foreground shadow-[0_18px_40px_-26px_rgba(201,165,92,0.9)]"
                                : "border-border/60 bg-background hover:border-gold/50 hover:bg-gold/5"
                            }`}
                          >
                            <span className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${isSelected ? "text-foreground/70" : "text-muted-foreground"}`}>
                              {option.shortDay}
                            </span>
                            <span className="mt-2 block text-xl font-semibold leading-none">
                              {option.dayNumber}
                            </span>
                            <span className={`mt-1.5 block text-[11px] ${isSelected ? "text-foreground/75" : "text-muted-foreground"}`}>
                              {option.monthLabel}
                            </span>
                          </button>
                        );
                      })}

                      {!showMoreDates && (
                        <button
                          type="button"
                          onClick={() => setShowMoreDates(true)}
                          className="min-w-[82px] shrink-0 rounded-[1.15rem] border border-dashed border-gold/35 bg-background px-3 py-3 text-center transition-all hover:border-gold hover:bg-gold/5"
                        >
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                            More
                          </span>
                          <span className="mt-2 block text-base font-semibold text-foreground">
                            +14
                          </span>
                          <span className="mt-1.5 block text-[11px] text-muted-foreground">days</span>
                        </button>
                      )}
                    </div>
                    {showMoreDates && (
                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowMoreDates(false)}
                          className="text-xs font-medium text-gold transition-colors hover:text-gold-dark"
                        >
                          Show only the next 7 days
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4">Select Time Slot</h3>
                  <div className="space-y-2">
                    {timeSlotOptions.map((slot) => (
                      <button
                        type="button"
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
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="space-y-6"
              >
                <h3 className="font-semibold text-foreground">
                  {bookingType === "consultation" ? "Consultation Request Summary" : "Booking Summary"}
                </h3>

                {/* Consultation Type (Consultation only) */}
                {bookingType === "consultation" && (
                  <div className="bg-gold/10 border border-gold/30 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground font-medium mb-2">Consultation Type</p>
                    <p className="text-lg font-semibold text-foreground">{consultationContext || "General Consultation"}</p>
                    <p className="text-sm text-green-700 font-medium mt-2">Free Consultation</p>
                  </div>
                )}

                {/* Treatments Summary (Treatment bookings only) */}
                {bookingType === "treatment" && treatmentCount > 0 && (
                  <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 space-y-3">
                    <p className="text-sm text-muted-foreground font-medium">Treatments</p>
                    {treatments.map((t, i) => (
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
                )}

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
                  {bookingType === "treatment" && (
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Payment</span>
                      <span className="font-medium text-amber-600">50% Deposit Required</span>
                    </div>
                  )}
                </div>

                {/* 50% Deposit Notice (Treatment only) */}
                {bookingType === "treatment" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-800 text-sm">50% Deposit Required</p>
                      <p className="text-xs text-amber-700 mt-1">
                        A 50% deposit of <span className="font-bold">R {Math.round(total / 2).toLocaleString()}</span> is required to secure your appointment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Booking Reference (Treatment only) */}
                {bookingType === "treatment" && bookingReference && (
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

                {/* Banking Details (Treatment only) */}
                {bookingType === "treatment" && businessInfo.banking && (
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

                {isTurnstileEnabled && (
                  <TurnstileWidget
                    action="booking_submit"
                    onTokenChange={setCaptchaToken}
                    onWidgetError={setCaptchaError}
                    resetKey={captchaResetKey}
                    siteKey={turnstileSiteKey ?? ""}
                  />
                )}

                <p className="text-xs text-muted-foreground text-center">
                  By confirming, you agree to our 24-hour cancellation policy.
                  You&apos;ll be redirected to WhatsApp to finalize your booking.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className={`border-t bg-background ${isMobile ? "pb-8" : ""}`}>
          {state.error && (
            <p className="px-6 pt-4 text-sm text-red-600">
              {state.error}
            </p>
          )}

          <div className="flex gap-3 p-6">
          {state.currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={state.isSubmitting}
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
                state.isSubmitting ||
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
              disabled={state.isSubmitting || !bookingRequirementsStatus.isComplete}
              className="flex-1 bg-gold hover:bg-gold-dark text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              {state.isSubmitting ? "Saving booking..." : "Confirm via WhatsApp"}
            </Button>
          )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

