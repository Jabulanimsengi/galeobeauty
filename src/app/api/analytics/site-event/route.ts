import { NextResponse } from "next/server";
import {
  isSiteMonitoringEventName,
  type SiteMonitoringEventPayload,
} from "@/lib/site-monitoring-events";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";
import { recordSiteMonitoringEvent } from "@/lib/server/site-monitoring-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "site-monitoring-event",
    limit: 360,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many monitoring events." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = (await request.json()) as Partial<SiteMonitoringEventPayload>;

    if (!body.eventName || !isSiteMonitoringEventName(body.eventName)) {
      return NextResponse.json(
        { ok: false, error: "Invalid event name." },
        { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    await recordSiteMonitoringEvent({
      eventName: body.eventName,
      eventCategory: body.eventCategory,
      eventLabel: body.eventLabel,
      linkType: body.linkType,
      linkLabel: body.linkLabel,
      linkContext: body.linkContext,
      destinationUrl: body.destinationUrl,
      destinationHost: body.destinationHost,
      source: body.source,
      medium: body.medium,
      campaign: body.campaign,
      landingPage: body.landingPage,
      enquiryPage: body.enquiryPage,
    });

    return NextResponse.json(
      { ok: true },
      {
        status: 202,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to record monitoring event." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
