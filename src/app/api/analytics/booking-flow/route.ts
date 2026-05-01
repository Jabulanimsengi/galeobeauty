import { NextResponse } from "next/server";
import {
  isBookingFlowEventName,
  type BookingFlowEventPayload,
} from "@/lib/booking-flow-analytics";
import { recordBookingFlowEvent } from "@/lib/server/booking-flow-analytics";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function isBookingType(value: string) {
  return value === "consultation" || value === "treatment";
}

function isBookingStep(value: unknown) {
  return value === undefined || value === 1 || value === 2 || value === 3;
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "booking-flow-analytics",
    limit: 240,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many analytics events." },
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
    const body = (await request.json()) as Partial<BookingFlowEventPayload>;

    if (!body.eventName || !isBookingFlowEventName(body.eventName)) {
      return NextResponse.json(
        { ok: false, error: "Invalid event name." },
        { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    if (!body.bookingType || !isBookingType(body.bookingType)) {
      return NextResponse.json(
        { ok: false, error: "Invalid booking type." },
        { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    if (!isBookingStep(body.step)) {
      return NextResponse.json(
        { ok: false, error: "Invalid booking step." },
        { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    await recordBookingFlowEvent({
      eventName: body.eventName,
      bookingType: body.bookingType,
      source: body.source,
      medium: body.medium,
      campaign: body.campaign,
      landingPage: body.landingPage,
      enquiryPage: body.enquiryPage,
      consultationContext: body.consultationContext,
      treatmentCount: body.treatmentCount,
      treatmentNames: body.treatmentNames,
      totalValue: body.totalValue,
      step: body.step,
      closeReason: body.closeReason,
      errorCode: body.errorCode,
      errorMessage: body.errorMessage,
      requirementsComplete: body.requirementsComplete,
      requiredFieldsCompleted: body.requiredFieldsCompleted,
      requiredFieldsTotal: body.requiredFieldsTotal,
      hasRequiredName: body.hasRequiredName,
      hasRequiredPhone: body.hasRequiredPhone,
      hasRequiredDate: body.hasRequiredDate,
      hasRequiredTimeSlot: body.hasRequiredTimeSlot,
      hasRequiredTreatments: body.hasRequiredTreatments,
      hasOptionalEmail: body.hasOptionalEmail,
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
      { ok: false, error: "Unable to record booking flow event." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
