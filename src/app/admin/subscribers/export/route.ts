import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { buildSubscribersCsv, listSubscribersForAdmin } from "@/lib/server/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login?next=/admin/bookings", request.url), 303);
  }

  const subscribers = await listSubscribersForAdmin();
  const csv = buildSubscribersCsv(subscribers);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="galeo-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
