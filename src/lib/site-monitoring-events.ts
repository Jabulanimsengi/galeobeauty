export const SITE_MONITORING_EVENT_NAMES = [
  "whatsapp_click",
  "phone_click",
  "directions_click",
  "email_click",
  "external_link_click",
] as const;

export type SiteMonitoringEventName = (typeof SITE_MONITORING_EVENT_NAMES)[number];

export interface SiteMonitoringEventPayload {
  eventName: SiteMonitoringEventName;
  eventCategory?: string;
  eventLabel?: string;
  linkType?: string;
  linkLabel?: string;
  linkContext?: string;
  destinationUrl?: string;
  destinationHost?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  landingPage?: string;
  enquiryPage?: string;
}

export interface SiteMonitoringMetricsRow {
  eventName: SiteMonitoringEventName;
  eventCount: number;
  firstTrackedAt: string | null;
  lastTrackedAt: string | null;
}

export function isSiteMonitoringEventName(value: string): value is SiteMonitoringEventName {
  return SITE_MONITORING_EVENT_NAMES.includes(value as SiteMonitoringEventName);
}
