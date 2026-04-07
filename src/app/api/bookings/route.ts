import { NextResponse } from "next/server";
import { normalizeBookingSaveRequest, type BookingSaveRequest } from "@/lib/bookings";
import { getPostgresPool } from "@/lib/server/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingSaveRequest;
    const booking = normalizeBookingSaveRequest(body);
    const pool = getPostgresPool();

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
        $1, $2, $3, $4, $5, $6::date, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, true, now(), $15, $16, $17, $18, $19, $20
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

    return NextResponse.json(
      {
        ok: true,
        bookingId: result.rows[0]?.id ?? null,
        createdAt: result.rows[0]?.created_at ?? null,
        status: result.rows[0]?.status ?? "new",
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
