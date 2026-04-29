import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  createAdminSessionToken,
  getAdminCookieConfig,
  getAdminPasswordErrorMessage,
} from "@/lib/server/admin-auth";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function sanitizeNextPath(input: FormDataEntryValue | null) {
  const normalized = typeof input === "string" ? input.trim() : "";
  return normalized.startsWith("/admin") ? normalized : "/admin/bookings";
}

async function buildRedirectUrl(pathname: string, request: Request) {
  const requestHeaders = await headers();
  const url = new URL(request.url);
  const explicitCandidates = [
    requestHeaders.get("x-forwarded-host")?.trim(),
    requestHeaders.get("host")?.trim(),
  ];
  const allowedPublicHosts = new Set([
    "www.galeobeauty.com",
    "galeobeauty.com",
  ]);
  const allowedLocalHosts = new Set([
    "localhost",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1",
    "127.0.0.1:3000",
    "127.0.0.1:3001",
  ]);

  const hostname = explicitCandidates.find((candidate) => {
    if (!candidate) {
      return false;
    }

    const normalized = candidate.toLowerCase();
    return allowedPublicHosts.has(normalized) || allowedLocalHosts.has(normalized);
  }) ?? (
    process.env.NODE_ENV === "production"
      ? "www.galeobeauty.com"
      : (allowedLocalHosts.has(url.host.toLowerCase()) ? url.host : "localhost:3000")
  );
  const protocol = hostname.includes("localhost") || hostname.includes("127.0.0.1")
    ? "http"
    : "https";

  return new URL(pathname, `${protocol}://${hostname}`);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = typeof formData.get("password") === "string" ? String(formData.get("password")).trim() : "";
  const nextPath = sanitizeNextPath(formData.get("next"));
  const loginUrl = await buildRedirectUrl(`/admin/login?next=${encodeURIComponent(nextPath)}`, request);
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "admin-login",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    loginUrl.searchParams.set("error", "Too many sign-in attempts. Please wait a few minutes and try again.");
    const response = NextResponse.redirect(loginUrl, 303);
    response.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return response;
  }

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
  response.cookies.set({
    ...getAdminCookieConfig(),
    path: "/admin",
    value: "",
    maxAge: 0,
  });
  return response;
}
