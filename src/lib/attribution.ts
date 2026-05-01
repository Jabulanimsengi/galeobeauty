export interface AttributionTouch {
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
  landingPage: string;
  referrer?: string;
  recordedAt: string;
  clickIds?: Partial<Record<ClickIdKey, string>>;
}

export interface StoredAttribution {
  firstTouch: AttributionTouch;
  lastTouch: AttributionTouch;
}

type ClickIdKey = "gclid" | "fbclid" | "msclkid";

interface TrackWhatsAppClickOptions {
  attribution?: StoredAttribution | null;
  context?: string;
  currentPage?: string;
}

interface TrackBookingSubmitOptions {
  attribution?: StoredAttribution | null;
  bookingType: "consultation" | "treatment";
  currentPage?: string;
  treatmentCount?: number;
  treatmentNames?: string[];
  totalValue?: number;
  consultationContext?: string;
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

interface TrackExternalLinkClickOptions {
  attribution?: StoredAttribution | null;
  href: string;
  currentPage?: string;
  context?: string;
  linkType?: string;
  linkLabel?: string;
}

interface TrackBookingFlowOptions {
  attribution?: StoredAttribution | null;
  bookingType: "consultation" | "treatment";
  currentPage?: string;
  treatmentCount?: number;
  treatmentNames?: string[];
  consultationContext?: string;
}

interface TrackServiceCtaClickOptions extends TrackBookingFlowOptions {
  ctaContext?: string;
  ctaLabel?: string;
  step?: 1 | 2 | 3;
}

interface TrackBookingTreatmentSelectionOptions extends TrackBookingFlowOptions {
  step?: 1 | 2 | 3;
  treatmentName?: string;
  actionContext?: string;
}

interface TrackBookingStepViewOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
}

interface TrackBookingDateSelectedOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
  selectedDate: string;
}

interface TrackBookingTimeSelectedOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
  selectedTimeSlot: string;
}

interface TrackBookingSheetCloseOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
  closeReason?: string;
}

interface TrackBookingIdleAbandonOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
  idleSeconds: number;
}

interface TrackBookingIssueOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
  errorCode: string;
  errorMessage?: string;
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

interface BuildTrackedWhatsAppUrlOptions {
  phone: string;
  message: string;
  attribution?: StoredAttribution | null;
  currentPage?: string;
}

const ATTRIBUTION_STORAGE_KEY = "galeo_attribution_v1";
const CLICK_ID_KEYS: ClickIdKey[] = ["gclid", "fbclid", "msclkid"];

function cleanValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizePath(pathname?: string) {
  const normalized = cleanValue(pathname);
  return normalized?.startsWith("/") ? normalized : "/";
}

function normalizeReferrer(referrer?: string) {
  const normalized = cleanValue(referrer);

  if (!normalized) {
    return undefined;
  }

  try {
    return new URL(normalized).hostname;
  } catch {
    return normalized;
  }
}

function extractClickIds(searchParams: URLSearchParams) {
  const clickIds = CLICK_ID_KEYS.reduce<Partial<Record<ClickIdKey, string>>>((acc, key) => {
    const value = cleanValue(searchParams.get(key));

    if (value) {
      acc[key] = value;
    }

    return acc;
  }, {});

  return Object.keys(clickIds).length > 0 ? clickIds : undefined;
}

function buildTouchFromSearch({
  pathname,
  search,
  referrer,
}: {
  pathname?: string;
  search?: string;
  referrer?: string;
}) {
  const searchParams = new URLSearchParams(search ?? "");
  const source = cleanValue(searchParams.get("utm_source"));
  const medium = cleanValue(searchParams.get("utm_medium"));
  const campaign = cleanValue(searchParams.get("utm_campaign"));
  const term = cleanValue(searchParams.get("utm_term"));
  const content = cleanValue(searchParams.get("utm_content"));
  const clickIds = extractClickIds(searchParams);

  if (!source && !medium && !campaign && !term && !content && !clickIds) {
    return null;
  }

  return {
    source: source ?? "direct",
    medium: medium ?? (source ? "unassigned" : "none"),
    campaign,
    term,
    content,
    landingPage: normalizePath(pathname),
    referrer: normalizeReferrer(referrer),
    recordedAt: new Date().toISOString(),
    clickIds,
  } satisfies AttributionTouch;
}

function buildReferrerTouch({
  pathname,
  referrer,
  hostname,
}: {
  pathname?: string;
  referrer?: string;
  hostname?: string;
}) {
  const normalizedReferrer = cleanValue(referrer);

  if (!normalizedReferrer) {
    return null;
  }

  try {
    const referrerUrl = new URL(normalizedReferrer);

    if (hostname && referrerUrl.hostname === hostname) {
      return null;
    }

    return {
      source: referrerUrl.hostname.replace(/^www\./, ""),
      medium: "referral",
      landingPage: normalizePath(pathname),
      referrer: referrerUrl.hostname,
      recordedAt: new Date().toISOString(),
    } satisfies AttributionTouch;
  } catch {
    return null;
  }
}

function mergeAttribution(existing: StoredAttribution | null, nextTouch: AttributionTouch): StoredAttribution {
  if (!existing) {
    return {
      firstTouch: nextTouch,
      lastTouch: nextTouch,
    };
  }

  return {
    firstTouch: existing.firstTouch,
    lastTouch: nextTouch,
  };
}

function safelyParseAttribution(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as StoredAttribution;

    if (!parsed?.firstTouch || !parsed?.lastTouch) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function sanitizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function getStoredAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  return safelyParseAttribution(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY));
}

export function saveStoredAttribution(value: StoredAttribution) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
}

export function captureAttributionFromCurrentVisit(pathname?: string) {
  if (typeof window === "undefined") {
    return;
  }

  const existing = getStoredAttribution();
  const touchFromSearch = buildTouchFromSearch({
    pathname,
    search: window.location.search,
    referrer: document.referrer,
  });

  if (touchFromSearch) {
    saveStoredAttribution(mergeAttribution(existing, touchFromSearch));
    return;
  }

  if (existing) {
    return;
  }

  const referrerTouch = buildReferrerTouch({
    pathname,
    referrer: document.referrer,
    hostname: window.location.hostname,
  });

  if (referrerTouch) {
    saveStoredAttribution(mergeAttribution(null, referrerTouch));
  }
}

export function buildTrackedWhatsAppUrl({
  phone,
  message,
}: BuildTrackedWhatsAppUrlOptions) {
  return `https://wa.me/${sanitizePhone(phone)}?text=${encodeURIComponent(message.trim())}`;
}

export function trackWhatsAppClick({
  attribution,
  context,
  currentPage,
}: TrackWhatsAppClickOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    event_category: "lead",
    event_label: context ?? "general_whatsapp_click",
    link_type: "whatsapp",
    link_context: context,
    lead_channel: "whatsapp",
    source: attribution?.lastTouch.source ?? "direct",
    medium: attribution?.lastTouch.medium ?? "none",
    campaign: attribution?.lastTouch.campaign ?? "(not set)",
    landing_page: attribution?.lastTouch.landingPage ?? "/",
    enquiry_page: normalizePath(currentPage),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", payload);
  }

  recordSiteMonitoringEventToServer("whatsapp_click", {
    ...payload,
    destination_host: "wa.me",
  });
}

export function trackBookingSubmit({
  attribution,
  bookingType,
  currentPage,
  treatmentCount,
  treatmentNames,
  totalValue,
  consultationContext,
  requirementsComplete,
  requiredFieldsCompleted,
  requiredFieldsTotal,
  hasRequiredName,
  hasRequiredPhone,
  hasRequiredDate,
  hasRequiredTimeSlot,
  hasRequiredTreatments,
  hasOptionalEmail,
}: TrackBookingSubmitOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const sharedPayload = {
    event_category: "lead",
    lead_channel: "whatsapp",
    booking_type: bookingType,
    source: attribution?.lastTouch.source ?? "direct",
    medium: attribution?.lastTouch.medium ?? "none",
    campaign: attribution?.lastTouch.campaign ?? "(not set)",
    landing_page: attribution?.lastTouch.landingPage ?? "/",
    enquiry_page: normalizePath(currentPage),
    treatment_count: treatmentCount,
    treatment_names: treatmentNames?.join(" | "),
    consultation_context: consultationContext,
    value: totalValue,
    currency: totalValue ? "ZAR" : undefined,
    requirements_complete: requirementsComplete,
    required_fields_completed: requiredFieldsCompleted,
    required_fields_total: requiredFieldsTotal,
    has_required_name: hasRequiredName,
    has_required_phone: hasRequiredPhone,
    has_required_date: hasRequiredDate,
    has_required_time_slot: hasRequiredTimeSlot,
    has_required_treatments: hasRequiredTreatments,
    has_optional_email: hasOptionalEmail,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_whatsapp_submit", sharedPayload);

    if (requirementsComplete) {
      window.gtag("event", "booking_requirements_completed_whatsapp_submit", sharedPayload);
    }

    window.gtag("event", "generate_lead", sharedPayload);
  }

  recordBookingFlowEventToServer("booking_whatsapp_submit", sharedPayload);

  if (requirementsComplete) {
    recordBookingFlowEventToServer(
      "booking_requirements_completed_whatsapp_submit",
      sharedPayload
    );
  }
}

export function trackExternalLinkClick({
  attribution,
  href,
  currentPage,
  context,
  linkType,
  linkLabel,
}: TrackExternalLinkClickOptions) {
  if (typeof window === "undefined") {
    return;
  }

  let destinationHost: string | undefined;

  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      destinationHost = new URL(href).hostname.replace(/^www\./, "");
    } catch {
      destinationHost = undefined;
    }
  }

  const payload = {
    event_category: "engagement",
    event_label: context ?? linkLabel ?? href,
    link_type: linkType ?? "external",
    link_label: linkLabel,
    link_context: context,
    destination_url: href,
    destination_host: destinationHost,
    source: attribution?.lastTouch.source ?? "direct",
    medium: attribution?.lastTouch.medium ?? "none",
    campaign: attribution?.lastTouch.campaign ?? "(not set)",
    landing_page: attribution?.lastTouch.landingPage ?? "/",
    enquiry_page: normalizePath(currentPage),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "external_link_click", payload);
  }

  recordSiteMonitoringEventToServer(getSiteClickEventName(linkType), payload);
}

function buildBookingFlowPayload({
  attribution,
  bookingType,
  currentPage,
  treatmentCount,
  treatmentNames,
  consultationContext,
}: TrackBookingFlowOptions) {
  return {
    event_category: "engagement",
    lead_channel: "onsite_booking_flow",
    booking_type: bookingType,
    source: attribution?.lastTouch.source ?? "direct",
    medium: attribution?.lastTouch.medium ?? "none",
    campaign: attribution?.lastTouch.campaign ?? "(not set)",
    landing_page: attribution?.lastTouch.landingPage ?? "/",
    enquiry_page: normalizePath(currentPage),
    treatment_count: treatmentCount,
    treatment_names: treatmentNames?.join(" | "),
    consultation_context: consultationContext,
  };
}

function recordBookingFlowEventToServer(
  eventName:
    | "service_cta_click"
    | "booking_treatment_added"
    | "booking_treatment_removed"
    | "booking_sheet_open"
    | "booking_step_view"
    | "booking_date_selected"
    | "booking_time_selected"
    | "booking_sheet_close"
    | "booking_idle_abandon"
    | "booking_validation_error"
    | "booking_save_failed"
    | "booking_whatsapp_submit"
    | "booking_requirements_completed_whatsapp_submit",
  payload: ReturnType<typeof buildBookingFlowPayload> & {
    step?: 1 | 2 | 3;
    close_reason?: string;
    error_code?: string;
    error_message?: string;
    action_context?: string;
    action_label?: string;
    selected_date?: string;
    selected_time_slot?: string;
    idle_seconds?: number;
    value?: number;
    currency?: string;
    requirements_complete?: boolean;
    required_fields_completed?: number;
    required_fields_total?: number;
    has_required_name?: boolean;
    has_required_phone?: boolean;
    has_required_date?: boolean;
    has_required_time_slot?: boolean;
    has_required_treatments?: boolean;
    has_optional_email?: boolean;
  }
) {
  if (typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    eventName,
    bookingType: payload.booking_type,
    source: payload.source,
    medium: payload.medium,
    campaign: payload.campaign,
    landingPage: payload.landing_page,
    enquiryPage: payload.enquiry_page,
    consultationContext: payload.consultation_context,
    treatmentCount: payload.treatment_count,
    treatmentNames: payload.treatment_names
      ? payload.treatment_names.split(" | ").filter(Boolean)
      : undefined,
    totalValue: payload.value,
    step: payload.step,
    closeReason: payload.close_reason,
    errorCode: payload.error_code,
    errorMessage: payload.error_message,
    actionContext: payload.action_context,
    actionLabel: payload.action_label,
    selectedDate: payload.selected_date,
    selectedTimeSlot: payload.selected_time_slot,
    idleSeconds: payload.idle_seconds,
    requirementsComplete: payload.requirements_complete,
    requiredFieldsCompleted: payload.required_fields_completed,
    requiredFieldsTotal: payload.required_fields_total,
    hasRequiredName: payload.has_required_name,
    hasRequiredPhone: payload.has_required_phone,
    hasRequiredDate: payload.has_required_date,
    hasRequiredTimeSlot: payload.has_required_time_slot,
    hasRequiredTreatments: payload.has_required_treatments,
    hasOptionalEmail: payload.has_optional_email,
  });

  sendAnalyticsBeacon("/api/analytics/booking-flow", body);
}

function sendAnalyticsBeacon(endpoint: string, body: string) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  void fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics failures should never block user flows.
  });
}

function getSiteClickEventName(linkType?: string) {
  if (linkType === "phone") {
    return "phone_click";
  }

  if (linkType === "maps") {
    return "directions_click";
  }

  if (linkType === "email") {
    return "email_click";
  }

  return "external_link_click";
}

function recordSiteMonitoringEventToServer(
  eventName:
    | "whatsapp_click"
    | "phone_click"
    | "directions_click"
    | "email_click"
    | "external_link_click",
  payload: {
    event_category: string;
    event_label?: string;
    link_type?: string;
    link_label?: string;
    link_context?: string;
    destination_url?: string;
    destination_host?: string;
    source?: string;
    medium?: string;
    campaign?: string;
    landing_page?: string;
    enquiry_page?: string;
  }
) {
  if (typeof window === "undefined") {
    return;
  }

  sendAnalyticsBeacon(
    "/api/analytics/site-event",
    JSON.stringify({
      eventName,
      eventCategory: payload.event_category,
      eventLabel: payload.event_label,
      linkType: payload.link_type,
      linkLabel: payload.link_label,
      linkContext: payload.link_context,
      destinationUrl: payload.destination_url,
      destinationHost: payload.destination_host,
      source: payload.source,
      medium: payload.medium,
      campaign: payload.campaign,
      landingPage: payload.landing_page,
      enquiryPage: payload.enquiry_page,
    })
  );
}

export function trackServiceCtaClick({
  ctaContext,
  ctaLabel,
  step,
  ...options
}: TrackServiceCtaClickOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    action_context: ctaContext,
    action_label: ctaLabel,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "service_cta_click", payload);
  }

  recordBookingFlowEventToServer("service_cta_click", payload);
}

export function trackBookingTreatmentAdded(options: TrackBookingTreatmentSelectionOptions) {
  trackBookingTreatmentSelection("booking_treatment_added", options);
}

export function trackBookingTreatmentRemoved(options: TrackBookingTreatmentSelectionOptions) {
  trackBookingTreatmentSelection("booking_treatment_removed", options);
}

function trackBookingTreatmentSelection(
  eventName: "booking_treatment_added" | "booking_treatment_removed",
  {
    step,
    treatmentName,
    actionContext,
    ...options
  }: TrackBookingTreatmentSelectionOptions
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    action_context: actionContext,
    action_label: treatmentName,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  recordBookingFlowEventToServer(eventName, payload);
}

export function trackBookingSheetOpen(options: TrackBookingFlowOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = buildBookingFlowPayload(options);

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_sheet_open", payload);
  }

  recordBookingFlowEventToServer("booking_sheet_open", payload);
}

export function trackBookingStepView({
  step,
  ...options
}: TrackBookingStepViewOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_step_view", payload);
  }

  recordBookingFlowEventToServer("booking_step_view", payload);
}

export function trackBookingDateSelected({
  step,
  selectedDate,
  ...options
}: TrackBookingDateSelectedOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    selected_date: selectedDate,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_date_selected", payload);
  }

  recordBookingFlowEventToServer("booking_date_selected", payload);
}

export function trackBookingTimeSelected({
  step,
  selectedTimeSlot,
  ...options
}: TrackBookingTimeSelectedOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    selected_time_slot: selectedTimeSlot,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_time_selected", payload);
  }

  recordBookingFlowEventToServer("booking_time_selected", payload);
}

export function trackBookingSheetClose({
  step,
  closeReason,
  ...options
}: TrackBookingSheetCloseOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    close_reason: closeReason ?? "dismissed",
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_sheet_close", payload);
  }

  recordBookingFlowEventToServer("booking_sheet_close", payload);
}

export function trackBookingIdleAbandon({
  step,
  idleSeconds,
  ...options
}: TrackBookingIdleAbandonOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    idle_seconds: idleSeconds,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "booking_idle_abandon", payload);
  }

  recordBookingFlowEventToServer("booking_idle_abandon", payload);
}

export function trackBookingValidationError({
  step,
  errorCode,
  errorMessage,
  requirementsComplete,
  requiredFieldsCompleted,
  requiredFieldsTotal,
  hasRequiredName,
  hasRequiredPhone,
  hasRequiredDate,
  hasRequiredTimeSlot,
  hasRequiredTreatments,
  hasOptionalEmail,
  ...options
}: TrackBookingIssueOptions) {
  trackBookingIssue("booking_validation_error", {
    ...options,
    step,
    errorCode,
    errorMessage,
    requirementsComplete,
    requiredFieldsCompleted,
    requiredFieldsTotal,
    hasRequiredName,
    hasRequiredPhone,
    hasRequiredDate,
    hasRequiredTimeSlot,
    hasRequiredTreatments,
    hasOptionalEmail,
  });
}

export function trackBookingSaveFailed(options: TrackBookingIssueOptions) {
  trackBookingIssue("booking_save_failed", options);
}

function trackBookingIssue(
  eventName: "booking_validation_error" | "booking_save_failed",
  {
    step,
    errorCode,
    errorMessage,
    requirementsComplete,
    requiredFieldsCompleted,
    requiredFieldsTotal,
    hasRequiredName,
    hasRequiredPhone,
    hasRequiredDate,
    hasRequiredTimeSlot,
    hasRequiredTreatments,
    hasOptionalEmail,
    ...options
  }: TrackBookingIssueOptions
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...buildBookingFlowPayload(options),
    step,
    error_code: errorCode,
    error_message: errorMessage,
    requirements_complete: requirementsComplete,
    required_fields_completed: requiredFieldsCompleted,
    required_fields_total: requiredFieldsTotal,
    has_required_name: hasRequiredName,
    has_required_phone: hasRequiredPhone,
    has_required_date: hasRequiredDate,
    has_required_time_slot: hasRequiredTimeSlot,
    has_required_treatments: hasRequiredTreatments,
    has_optional_email: hasOptionalEmail,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  recordBookingFlowEventToServer(eventName, payload);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
