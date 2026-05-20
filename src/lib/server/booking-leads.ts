import "server-only";
import { getPostgresPool } from "@/lib/server/postgres";
import { ensureBookingLeadsSchema, type BookingLeadInput } from "@/lib/server/booking-leads-schema";

export async function upsertBookingLead(input: BookingLeadInput) {
  try {
    await ensureBookingLeadsSchema();
    const pool = getPostgresPool();

    const name = input.userDetails.name.trim() || null;
    const phone = input.userDetails.phone.trim() || null;
    const email = input.userDetails.email.trim() || null;
    const preferredDate = input.appointment.date.trim() || null;
    const preferredTimeSlot = input.appointment.timeSlot.trim() || null;

    const treatmentCount = Array.isArray(input.treatments) ? input.treatments.length : 0;

    // Calculate total value
    let totalValue: number | null = null;
    if (input.bookingType === "treatment" && Array.isArray(input.treatments)) {
      let total = 0;
      for (const item of input.treatments) {
        const priceStr = item.item.price.replace(/[R\s,]/g, "");
        const price = parseFloat(priceStr) || 0;
        total += price;
      }
      totalValue = total;
    }

    const source = input.attribution?.lastTouch.source || null;
    const medium = input.attribution?.lastTouch.medium || null;
    const campaign = input.attribution?.lastTouch.campaign || null;
    const landingPage = input.attribution?.lastTouch.landingPage || null;
    const referrerHost = input.attribution?.lastTouch.referrer || null;
    const enquiryPage = input.currentPage || null;

    await pool.query(
      `insert into booking_leads (
        session_id,
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
        source,
        medium,
        campaign,
        landing_page,
        enquiry_page,
        referrer_host,
        updated_at
      ) values ($1, $2, $3, $4, $5, $6, $7::date, $8, $9::jsonb, $10, $11, $12, $13, $14, $15, $16, $17, now())
      on conflict (session_id)
      do update set
        booking_type = excluded.booking_type,
        consultation_context = excluded.consultation_context,
        client_name = coalesce(excluded.client_name, booking_leads.client_name),
        phone = coalesce(excluded.phone, booking_leads.phone),
        email = coalesce(excluded.email, booking_leads.email),
        preferred_date = coalesce(excluded.preferred_date, booking_leads.preferred_date),
        preferred_time_slot = coalesce(excluded.preferred_time_slot, booking_leads.preferred_time_slot),
        treatments_json = excluded.treatments_json,
        treatment_count = excluded.treatment_count,
        total_value = excluded.total_value,
        source = coalesce(excluded.source, booking_leads.source),
        medium = coalesce(excluded.medium, booking_leads.medium),
        campaign = coalesce(excluded.campaign, booking_leads.campaign),
        landing_page = coalesce(excluded.landing_page, booking_leads.landing_page),
        enquiry_page = coalesce(excluded.enquiry_page, booking_leads.enquiry_page),
        referrer_host = coalesce(excluded.referrer_host, booking_leads.referrer_host),
        updated_at = now()`,
      [
        input.sessionId,
        input.bookingType,
        input.consultationContext || null,
        name,
        phone,
        email,
        preferredDate,
        preferredTimeSlot,
        JSON.stringify(input.treatments || []),
        treatmentCount,
        totalValue,
        source,
        medium,
        campaign,
        landingPage,
        enquiryPage,
        referrerHost,
      ]
    );

    return true;
  } catch (error) {
    console.error("Failed to upsert booking lead:", error);
    return false;
  }
}
