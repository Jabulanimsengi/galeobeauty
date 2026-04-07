import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE_NAME = "galeo_admin_session";
const ADMIN_COOKIE_SCOPE = "/admin";

function getAdminPassword() {
  const password = process.env.BOOKINGS_ADMIN_PASSWORD?.trim();

  if (!password) {
    throw new Error("BOOKINGS_ADMIN_PASSWORD is not configured.");
  }

  return password;
}

function buildSessionValue(password: string) {
  return createHash("sha256")
    .update(`galeo-bookings-admin:${password}`)
    .digest("hex");
}

export function createAdminSessionToken() {
  return buildSessionValue(getAdminPassword());
}

export function getAdminCookieConfig() {
  return {
    name: ADMIN_COOKIE_NAME,
    path: ADMIN_COOKIE_SCOPE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
  };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return false;
  }

  const expected = Buffer.from(createAdminSessionToken(), "utf8");
  const actual = Buffer.from(sessionCookie, "utf8");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

export async function requireAdminAuth(nextPath = "/admin/bookings") {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
}

export function getAdminPasswordErrorMessage() {
  return "The bookings admin password is not configured on this deployment.";
}
