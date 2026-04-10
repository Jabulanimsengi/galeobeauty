import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { buildBookingsCsv, listBookingsForExport } from "@/lib/server/bookings-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login?next=/admin/bookings", request.url), 303);
  }

  const url = new URL(request.url);
  const bookings = await listBookingsForExport({
    status: url.searchParams.get("status") ?? undefined,
    bookingType: url.searchParams.get("bookingType") ?? undefined,
    clientName: url.searchParams.get("clientName") ?? undefined,
    phone: url.searchParams.get("phone") ?? undefined,
    email: url.searchParams.get("email") ?? undefined,
    bookingReference: url.searchParams.get("bookingReference") ?? undefined,
    source: url.searchParams.get("source") ?? undefined,
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  });

  const csv = buildBookingsCsv(bookings);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="galeo-bookings-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
