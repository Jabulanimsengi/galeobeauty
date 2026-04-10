export const BOOKING_FLOW_EVENT_NAMES = [
  "booking_sheet_open",
  "booking_whatsapp_submit",
  "booking_requirements_completed_whatsapp_submit",
] as const;

export type BookingFlowEventName = (typeof BOOKING_FLOW_EVENT_NAMES)[number];

export interface BookingFlowEventPayload {
  eventName: BookingFlowEventName;
  bookingType: "consultation" | "treatment";
  source?: string;
  medium?: string;
  campaign?: string;
  landingPage?: string;
  enquiryPage?: string;
  consultationContext?: string;
  treatmentCount?: number;
  treatmentNames?: string[];
  totalValue?: number;
  requirementsComplete?: boolean;
  requiredFieldsCompleted?: number;
  requiredFieldsTotal?: number;
  hasRequiredName?: boolean;
  hasRequiredPhone?: boolean;
  hasRequiredDate?: boolean;
  hasRequiredTimeSlot?: boolean;
  hasRequiredTreatments?: boolean;
  hasOptionalEmail?: boolean;
}

export interface BookingFlowMetricsSummary {
  sheetOpenCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToSubmitRate: number | null;
  submitCompletionRate: number | null;
  firstTrackedAt: string | null;
  lastTrackedAt: string | null;
}

export interface BookingFlowMetricsFilters {
  from?: string;
  to?: string;
}

export interface BookingFlowMetricsDailyRow {
  trackedDate: string;
  sheetOpenCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToSubmitRate: number | null;
  submitCompletionRate: number | null;
}

export interface BookingFlowMetricsBookingTypeRow {
  bookingType: string;
  sheetOpenCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToSubmitRate: number | null;
  submitCompletionRate: number | null;
}

export interface BookingFlowMetricsSourceRow {
  source: string;
  medium: string;
  sheetOpenCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToSubmitRate: number | null;
  submitCompletionRate: number | null;
}

export interface BookingFlowMetricsCampaignRow {
  campaign: string;
  sheetOpenCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToSubmitRate: number | null;
  submitCompletionRate: number | null;
}

export interface BookingFlowMetricsLandingPageRow {
  landingPage: string;
  sheetOpenCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToSubmitRate: number | null;
  submitCompletionRate: number | null;
}

export interface BookingFlowMetricsDashboard {
  summary: BookingFlowMetricsSummary;
  dailyRows: BookingFlowMetricsDailyRow[];
  bookingTypeRows: BookingFlowMetricsBookingTypeRow[];
  sourceRows: BookingFlowMetricsSourceRow[];
  campaignRows: BookingFlowMetricsCampaignRow[];
  landingPageRows: BookingFlowMetricsLandingPageRow[];
  activeFrom: string | null;
  activeTo: string | null;
}

export function isBookingFlowEventName(value: string): value is BookingFlowEventName {
  return BOOKING_FLOW_EVENT_NAMES.includes(value as BookingFlowEventName);
}
