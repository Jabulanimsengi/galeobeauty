import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  createAdminSessionToken,
  getAdminCookieConfig,
  getAdminPasswordErrorMessage,
} from "@/lib/server/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function sanitizeNextPath(input: FormDataEntryValue | null) {
  const normalized = typeof input === "string" ? input.trim() : "";
  return normalized.startsWith("/admin") ? normalized : "/admin/bookings";
}

async function buildRedirectUrl(pathname: string, request: Request) {
  const requestHeaders = await headers();
  const forwardedProto = requestHeaders.get("x-forwarded-proto")?.trim();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.trim();
  const host = requestHeaders.get("host")?.trim();
  const url = new URL(request.url);

  const protocol = forwardedProto || url.protocol.replace(":", "") || "https";
  const hostname = forwardedHost || host || url.host;

  return new URL(pathname, `${protocol}://${hostname}`);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = typeof formData.get("password") === "string" ? String(formData.get("password")).trim() : "";
  const nextPath = sanitizeNextPath(formData.get("next"));
  const loginUrl = await buildRedirectUrl(`/admin/login?next=${encodeURIComponent(nextPath)}`, request);

  try {
    if (!password) {
      loginUrl.searchParams.set("error", "Enter the admin password.");
      return NextResponse.redirect(loginUrl, 303);
    }

    if (password !== process.env.BOOKINGS_ADMIN_PASSWORD?.trim()) {
      loginUrl.searchParams.set("error", "The admin password is incorrect.");
      return NextResponse.redirect(loginUrl, 303);
    }

    const response = NextResponse.redirect(await buildRedirectUrl(nextPath, request), 303);
    response.cookies.set({
      ...getAdminCookieConfig(),
      value: createAdminSessionToken(),
    });
    return response;
  } catch {
    loginUrl.searchParams.set("error", getAdminPasswordErrorMessage());
    return NextResponse.redirect(loginUrl, 303);
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    ...getAdminCookieConfig(),
    value: "",
    maxAge: 0,
  });
  return response;
}
