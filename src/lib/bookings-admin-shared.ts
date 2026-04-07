export const BOOKING_STATUSES = [
  "new",
  "contacted",
  "awaiting_deposit",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface BookingAdminRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  bookingType: string;
  consultationContext: string | null;
  clientName: string;
  phone: string;
  email: string | null;
  preferredDate: string;
  preferredTimeSlot: string;
  treatmentCount: number;
  totalValue: number | null;
  currency: string | null;
  bookingReference: string | null;
  whatsappMessage: string;
  whatsappDestination: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  landingPage: string | null;
  enquiryPage: string | null;
  referrerHost: string | null;
  adminNotes: string | null;
  contactedAt: string | null;
  treatmentsJson: unknown;
}
