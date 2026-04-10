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

interface TrackBookingStepViewOptions extends TrackBookingFlowOptions {
  step: 1 | 2 | 3;
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
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "whatsapp_click", {
    event_category: "lead",
    event_label: context ?? "general_whatsapp_click",
    lead_channel: "whatsapp",
    source: attribution?.lastTouch.source ?? "direct",
    medium: attribution?.lastTouch.medium ?? "none",
    campaign: attribution?.lastTouch.campaign ?? "(not set)",
    landing_page: attribution?.lastTouch.landingPage ?? "/",
    enquiry_page: normalizePath(currentPage),
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
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
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

  window.gtag("event", "external_link_click", {
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
  });
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
    | "booking_sheet_open"
    | "booking_whatsapp_submit"
    | "booking_requirements_completed_whatsapp_submit",
  payload: ReturnType<typeof buildBookingFlowPayload> & {
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

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/booking-flow", blob);
    return;
  }

  void fetch("/api/analytics/booking-flow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics failures should never block booking UX.
  });
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
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "booking_step_view", {
    ...buildBookingFlowPayload(options),
    step,
  });
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
