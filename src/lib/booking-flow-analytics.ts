export const BOOKING_FLOW_EVENT_NAMES = [
  "service_cta_click",
  "booking_treatment_added",
  "booking_treatment_removed",
  "booking_sheet_open",
  "booking_step_view",
  "booking_date_selected",
  "booking_time_selected",
  "booking_sheet_close",
  "booking_idle_abandon",
  "booking_validation_error",
  "booking_save_failed",
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
  step?: 1 | 2 | 3;
  closeReason?: string;
  errorCode?: string;
  errorMessage?: string;
  actionContext?: string;
  actionLabel?: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
  idleSeconds?: number;
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
  serviceCtaClickCount: number;
  treatmentAddedCount: number;
  treatmentRemovedCount: number;
  sheetOpenCount: number;
  stepOneViewCount: number;
  stepTwoViewCount: number;
  stepThreeViewCount: number;
  dateSelectedCount: number;
  timeSelectedCount: number;
  sheetCloseCount: number;
  idleAbandonCount: number;
  validationErrorCount: number;
  saveFailedCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToStepTwoRate: number | null;
  stepThreeToSubmitRate: number | null;
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
  serviceCtaClickCount: number;
  treatmentAddedCount: number;
  treatmentRemovedCount: number;
  sheetOpenCount: number;
  stepOneViewCount: number;
  stepTwoViewCount: number;
  stepThreeViewCount: number;
  dateSelectedCount: number;
  timeSelectedCount: number;
  sheetCloseCount: number;
  idleAbandonCount: number;
  validationErrorCount: number;
  saveFailedCount: number;
  whatsappSubmitCount: number;
  completedWhatsappSubmitCount: number;
  openToStepTwoRate: number | null;
  stepThreeToSubmitRate: number | null;
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
