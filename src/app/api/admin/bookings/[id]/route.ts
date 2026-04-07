import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { updateBookingAdminFields } from "@/lib/server/bookings-admin";

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
  const body = (await request.json()) as { status?: string; adminNotes?: string | null };

  if (!id?.trim()) {
    return NextResponse.json({ ok: false, error: "Missing booking id" }, { status: 400 });
  }

  const booking = await updateBookingAdminFields({
    id: id.trim(),
    status: body.status ?? "new",
    adminNotes: body.adminNotes ?? null,
  });

  if (!booking) {
    return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, booking });
}
