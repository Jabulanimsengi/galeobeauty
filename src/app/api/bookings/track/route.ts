import { NextResponse } from "next/server";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";
import { upsertBookingLead } from "@/lib/server/booking-leads";
import { bookingLeadInputSchema } from "@/lib/server/booking-leads-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "booking-track",
    limit: 100, // Higher limit as users can trigger multiple updates during their session
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many tracking updates. Please wait.",
      },
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
    const parsedBody = bookingLeadInputSchema.safeParse(await request.json());

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsedBody.error.issues[0]?.message ?? "Invalid booking lead payload.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    const body = parsedBody.data;
    const success = await upsertBookingLead(body);

    if (!success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to record tracking lead.",
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Failed to process booking track request", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
