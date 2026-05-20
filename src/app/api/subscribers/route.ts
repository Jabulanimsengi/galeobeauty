import { NextResponse } from "next/server";
import { sendSubscriberWelcomeEmail } from "@/lib/server/email";
import {
  markSubscriberEmailSent,
  recordEmailEvent,
  upsertSubscriber,
} from "@/lib/server/subscribers";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SubscribeRequest {
  email?: string;
  name?: string;
  phone?: string;
  source?: string;
  consentAccepted?: boolean;
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "email-subscribe",
    limit: 12,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many signup attempts. Please wait a few minutes and try again.",
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
    const body = (await request.json()) as SubscribeRequest;

    if (!body.consentAccepted) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please confirm that you would like to receive Galeo Beauty emails.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    const subscriber = await upsertSubscriber({
      email: body.email ?? "",
      name: body.name,
      phone: body.phone,
      source: body.source ?? "members_page",
    });

    const emailResult = await sendSubscriberWelcomeEmail({
      email: subscriber.email,
      name: subscriber.name,
      unsubscribeToken: subscriber.unsubscribeToken,
    });

    await recordEmailEvent({
      subscriberId: subscriber.id,
      eventType: "subscriber_welcome",
      providerMessageId: emailResult.providerMessageId,
      status: emailResult.status,
      errorMessage: emailResult.errorMessage,
      metadata: { source: subscriber.source },
    });

    if (emailResult.status === "sent") {
      await markSubscriberEmailSent(subscriber.id);
    }

    return NextResponse.json(
      {
        ok: true,
        subscriberId: subscriber.id,
        emailStatus: emailResult.status,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "We could not add you to the Galeo Beauty Circle right now.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
