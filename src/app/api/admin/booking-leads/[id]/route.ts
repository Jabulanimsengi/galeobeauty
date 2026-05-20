import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { updateBookingLeadFields } from "@/lib/server/bookings-admin";
import { bookingLeadAdminUpdateSchema } from "@/lib/server/booking-leads-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parsedBody = bookingLeadAdminUpdateSchema.safeParse(await request.json());

  if (!id?.trim()) {
    return NextResponse.json({ ok: false, error: "Missing lead id" }, { status: 400 });
  }

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsedBody.error.issues[0]?.message ?? "Invalid booking lead update.",
      },
      { status: 400 }
    );
  }

  const body = parsedBody.data;

  const success = await updateBookingLeadFields({
    id: id.trim(),
    status: body.status,
    adminNotes: body.adminNotes ?? null,
  });

  if (!success) {
    return NextResponse.json({ ok: false, error: "Booking lead not found or update failed" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
