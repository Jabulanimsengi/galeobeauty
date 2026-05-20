import type { StoredAttribution } from "@/lib/attribution";
import type { BookingState, BookingType, SelectedTreatment } from "@/lib/booking-types";

const TIME_SLOT_VALUES = new Set<BookingState["appointment"]["timeSlot"]>([
  "morning",
  "afternoon",
  "late-afternoon",
]);

export interface BookingSaveRequest {
  bookingType: BookingType;
  captchaToken?: string;
  consultationContext?: string;
  currentPage?: string;
  bookingReference?: string;
  subscriberOptIn?: boolean;
  whatsappMessage: string;
  whatsappDestination?: string;
  totalValue?: number;
  userDetails: BookingState["userDetails"];
  appointment: BookingState["appointment"];
  treatments?: SelectedTreatment[];
  attribution?: StoredAttribution | null;
  sessionId?: string;
}

export interface NormalizedBookingInsert {
  bookingType: BookingType;
  consultationContext: string | null;
  clientName: string;
  phone: string;
  email: string | null;
  preferredDate: string;
  preferredTimeSlot: Exclude<BookingState["appointment"]["timeSlot"], "">;
  treatments: SelectedTreatment[];
  treatmentCount: number;
  totalValue: number | null;
  bookingReference: string | null;
  subscriberOptIn: boolean;
  whatsappMessage: string;
  whatsappDestination: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  landingPage: string | null;
  enquiryPage: string;
  referrerHost: string | null;
}

function cleanValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizePage(value?: string) {
  const normalized = cleanValue(value);
  return normalized?.startsWith("/") ? normalized : "/";
}

function normalizePhone(value: string) {
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

function isValidFullName(value: string) {
  const normalized = normalizeName(value);

  if (!normalized) {
    return false;
  }

  const parts = normalized.split(" ").filter(Boolean);
  return parts.length >= 2 && parts.every((part) => part.length >= 2);
}

function isValidSouthAfricanPhone(value: string) {
  const normalized = normalizePhone(value);
  const digits = normalized.replace(/\D/g, "");
  return normalized.startsWith("+27") && digits.length === 11;
}

function isValidIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

function normalizeTreatments(treatments?: SelectedTreatment[]) {
  return Array.isArray(treatments)
    ? treatments.map((treatment) => ({
        ...treatment,
        note: cleanValue(treatment.note) ?? undefined,
      }))
    : [];
}

export function normalizeBookingSaveRequest(input: BookingSaveRequest): NormalizedBookingInsert {
  const bookingType = input.bookingType === "consultation" ? "consultation" : "treatment";
  const clientName = normalizeName(input.userDetails.name);
  const phone = normalizePhone(input.userDetails.phone);
  const email = cleanValue(input.userDetails.email);
  const preferredDate = input.appointment.date.trim();
  const preferredTimeSlot = input.appointment.timeSlot;
  const treatments = normalizeTreatments(input.treatments);
  const treatmentCount = treatments.length;
  const totalValue =
    typeof input.totalValue === "number" && Number.isFinite(input.totalValue)
      ? input.totalValue
      : null;
  const bookingReference = cleanValue(input.bookingReference)?.toUpperCase() ?? null;
  const subscriberOptIn = Boolean(input.subscriberOptIn && email);
  const whatsappMessage = input.whatsappMessage.trim();

  if (!isValidFullName(clientName)) {
    throw new Error("Please provide the client name and surname.");
  }

  if (!isValidSouthAfricanPhone(phone)) {
    throw new Error("Please provide a valid South African phone number.");
  }

  if (!isValidIsoDate(preferredDate)) {
    throw new Error("Please provide a valid preferred booking date.");
  }

  if (!TIME_SLOT_VALUES.has(preferredTimeSlot) || preferredTimeSlot === "") {
    throw new Error("Please provide a valid preferred time slot.");
  }

  if (bookingType === "treatment" && treatmentCount === 0) {
    throw new Error("Treatment bookings must include at least one selected treatment.");
  }

  if (!whatsappMessage) {
    throw new Error("The WhatsApp booking message is empty.");
  }

  return {
    bookingType,
    consultationContext: cleanValue(input.consultationContext),
    clientName,
    phone,
    email,
    preferredDate,
    preferredTimeSlot,
    treatments,
    treatmentCount,
    totalValue,
    bookingReference,
    subscriberOptIn,
    whatsappMessage,
    whatsappDestination: cleanValue(input.whatsappDestination),
    source: cleanValue(input.attribution?.lastTouch.source),
    medium: cleanValue(input.attribution?.lastTouch.medium),
    campaign: cleanValue(input.attribution?.lastTouch.campaign),
    landingPage: cleanValue(input.attribution?.lastTouch.landingPage),
    enquiryPage: normalizePage(input.currentPage),
    referrerHost: cleanValue(input.attribution?.lastTouch.referrer),
  };
}
