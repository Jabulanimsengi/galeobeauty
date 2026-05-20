import "server-only";

import { businessInfo } from "@/lib/constants";

export const EMAIL_CONSENT_VERSION = "2026-05-08";
export const EMAIL_CONSENT_TEXT =
  "I agree to receive Galeo Beauty member offers, weekly exclusives, and salon updates by email. I understand that I can unsubscribe at any time.";

export function getBookingFeePercentage() {
  const configured = Number(process.env.GALEO_BOOKING_FEE_PERCENTAGE ?? "50");
  return Number.isFinite(configured) && configured > 0 && configured <= 100
    ? configured
    : 50;
}

export function getBookingFeeAmount(totalValue: number | null | undefined) {
  if (!totalValue || !Number.isFinite(totalValue)) {
    return null;
  }

  return Math.round((totalValue * getBookingFeePercentage()) / 100);
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    "https://www.galeobeauty.com"
  );
}

export function getUnsubscribeUrl(token: string) {
  return `${getSiteUrl()}/unsubscribe?token=${encodeURIComponent(token)}`;
}

export function getSalonAddressLine() {
  return `${businessInfo.address.street}, ${businessInfo.address.area}`;
}
