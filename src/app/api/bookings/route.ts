import { NextResponse } from "next/server";
import { normalizeBookingSaveRequest, type BookingSaveRequest } from "@/lib/bookings";
import { getPostgresPool } from "@/lib/server/postgres";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";
import { verifyTurnstileToken } from "@/lib/server/turnstile";
import { sendBookingConfirmationEmail, sendSubscriberWelcomeEmail } from "@/lib/server/email";
import { getBookingFeeAmount } from "@/lib/server/email-config";
import {
  markSubscriberEmailSent,
  recordEmailEvent,
  upsertSubscriber,
} from "@/lib/server/subscribers";
import { ensureBookingLeadsSchema } from "@/lib/server/booking-leads-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "booking-create",
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many booking attempts. Please wait a few minutes and try again.",
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
    const body = (await request.json()) as BookingSaveRequest;
    const turnstileVerification = await verifyTurnstileToken({
      request,
      token: body.captchaToken,
      expectedAction: "booking_submit",
    });

    if (!turnstileVerification.success) {
      return NextResponse.json(
        {
          ok: false,
          error: turnstileVerification.message ?? "Please complete the human verification and try again.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    const booking = normalizeBookingSaveRequest(body);
    const pool = getPostgresPool();
    const bookingFeeAmount = getBookingFeeAmount(booking.totalValue);

    const result = await pool.query<{
      id: string;
      created_at: string;
      status: string;
    }>(
      `insert into bookings (
        booking_type,
        consultation_context,
        client_name,
        phone,
        email,
        preferred_date,
        preferred_time_slot,
        treatments_json,
        treatment_count,
        total_value,
        currency,
        booking_reference,
        subscriber_opt_in,
        booking_fee_amount,
        booking_fee_currency,
        whatsapp_message,
        whatsapp_destination,
        submitted_to_whatsapp,
        submitted_to_whatsapp_at,
        source,
        medium,
        campaign,
        landing_page,
        enquiry_page,
        referrer_host
      ) values (
        $1, $2, $3, $4, $5, $6::date, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, $15, $16, $17, true, now(), $18, $19, $20, $21, $22, $23
      )
      returning id, created_at, status`,
      [
        booking.bookingType,
        booking.consultationContext,
        booking.clientName,
        booking.phone,
        booking.email,
        booking.preferredDate,
        booking.preferredTimeSlot,
        JSON.stringify(booking.treatments),
        booking.treatmentCount,
        booking.totalValue,
        booking.totalValue ? "ZAR" : null,
        booking.bookingReference,
        booking.subscriberOptIn,
        bookingFeeAmount,
        bookingFeeAmount ? "ZAR" : null,
        booking.whatsappMessage,
        booking.whatsappDestination,
        booking.source,
        booking.medium,
        booking.campaign,
        booking.landingPage,
        booking.enquiryPage,
        booking.referrerHost,
      ]
    );
    const storedBooking = result.rows[0];
    const bookingId = storedBooking?.id ?? null;
    let subscriberId: string | null = null;

    if (body.sessionId) {
      await ensureBookingLeadsSchema();
      await pool.query(
        `update booking_leads
         set status = 'submitted',
             updated_at = now()
         where session_id = $1`,
        [body.sessionId]
      ).catch((err) => {
        console.error("Failed to update booking lead status upon booking save:", err);
      });
    }

    if (booking.subscriberOptIn && booking.email) {
      const subscriber = await upsertSubscriber({
        email: booking.email,
        name: booking.clientName,
        phone: booking.phone,
        source: "booking",
      });
      subscriberId = subscriber.id;

      const welcomeResult = await sendSubscriberWelcomeEmail({
        email: subscriber.email,
        name: subscriber.name,
        unsubscribeToken: subscriber.unsubscribeToken,
      });

      await recordEmailEvent({
        subscriberId: subscriber.id,
        bookingId,
        eventType: "subscriber_welcome",
        providerMessageId: welcomeResult.providerMessageId,
        status: welcomeResult.status,
        errorMessage: welcomeResult.errorMessage,
        metadata: { source: "booking" },
      });

      if (welcomeResult.status === "sent") {
        await markSubscriberEmailSent(subscriber.id);
      }
    }

    const emailResult = await sendBookingConfirmationEmail({
      bookingId: bookingId ?? "",
      clientName: booking.clientName,
      email: booking.email,
      bookingType: booking.bookingType,
      consultationContext: booking.consultationContext,
      preferredDate: booking.preferredDate,
      preferredTimeSlot: booking.preferredTimeSlot,
      treatments: booking.treatments,
      totalValue: booking.totalValue,
      bookingReference: booking.bookingReference,
    });

    await recordEmailEvent({
      subscriberId,
      bookingId,
      eventType: "booking_confirmation",
      providerMessageId: emailResult.providerMessageId,
      status: emailResult.status,
      errorMessage: emailResult.errorMessage,
      metadata: { bookingType: booking.bookingType },
    });

    if (bookingId) {
      await pool.query(
        `update bookings
         set booking_confirmation_email_status = $2,
             booking_confirmation_email_sent_at = case when $2 = 'sent' then now() else null end,
             booking_confirmation_resend_id = $3,
             booking_confirmation_email_error = $4
         where id = $1`,
        [
          bookingId,
          emailResult.status,
          emailResult.providerMessageId,
          emailResult.errorMessage,
        ]
      );
    }

    return NextResponse.json(
      {
        ok: true,
        bookingId,
        createdAt: storedBooking?.created_at ?? null,
        status: storedBooking?.status ?? "new",
        bookingConfirmationEmailStatus: emailResult.status,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Failed to store booking", error);

    const message =
      error instanceof Error && error.message ? error.message : "Unable to store booking.";
    const status = message.includes("Please provide") || message.includes("must include")
      ? 400
      : 500;

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      {
        status,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
