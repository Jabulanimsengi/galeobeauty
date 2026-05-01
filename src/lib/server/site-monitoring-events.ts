import "server-only";

import type {
  SiteMonitoringEventPayload,
  SiteMonitoringMetricsRow,
} from "@/lib/site-monitoring-events";
import { getPostgresPool } from "@/lib/server/postgres";

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function isMissingRelationError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "42P01"
  );
}

export async function recordSiteMonitoringEvent(payload: SiteMonitoringEventPayload) {
  const pool = getPostgresPool();

  try {
    await pool.query(
      `insert into site_monitoring_events (
        event_name,
        event_category,
        event_label,
        link_type,
        link_label,
        link_context,
        destination_url,
        destination_host,
        source,
        medium,
        campaign,
        landing_page,
        enquiry_page,
        metadata
      ) values (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14::jsonb
      )`,
      [
        payload.eventName,
        cleanValue(payload.eventCategory),
        cleanValue(payload.eventLabel),
        cleanValue(payload.linkType),
        cleanValue(payload.linkLabel),
        cleanValue(payload.linkContext),
        cleanValue(payload.destinationUrl),
        cleanValue(payload.destinationHost),
        cleanValue(payload.source),
        cleanValue(payload.medium),
        cleanValue(payload.campaign),
        cleanValue(payload.landingPage),
        cleanValue(payload.enquiryPage),
        JSON.stringify(payload),
      ]
    );
    return true;
  } catch (error) {
    if (isMissingRelationError(error)) {
      return false;
    }

    throw error;
  }
}

export async function getSiteMonitoringMetrics(): Promise<SiteMonitoringMetricsRow[]> {
  const pool = getPostgresPool();

  try {
    const result = await pool.query<{
      event_name: SiteMonitoringMetricsRow["eventName"];
      event_count: string;
      first_tracked_at: string | null;
      last_tracked_at: string | null;
    }>(
      `select
        event_name,
        count(*)::text as event_count,
        min(created_at)::text as first_tracked_at,
        max(created_at)::text as last_tracked_at
      from site_monitoring_events
      group by event_name
      order by count(*) desc, event_name asc`
    );

    return result.rows.map((row) => ({
      eventName: row.event_name,
      eventCount: Number(row.event_count ?? 0),
      firstTrackedAt: row.first_tracked_at,
      lastTrackedAt: row.last_tracked_at,
    }));
  } catch (error) {
    if (isMissingRelationError(error)) {
      return [];
    }

    throw error;
  }
}
