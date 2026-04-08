import "server-only";

import { getClientIpAddress } from "@/lib/server/rate-limit";
import { getTurnstileSiteKey } from "@/lib/turnstile";

const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";
const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_REQUEST_TIMEOUT_MS = 5_000;

type TurnstileSiteverifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileVerificationResult = {
  enabled: boolean;
  success: boolean;
  message?: string;
};

function cleanEnvValue(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function getTurnstileSecretKey() {
  const configuredSecretKey = cleanEnvValue(process.env.TURNSTILE_SECRET_KEY);

  if (configuredSecretKey) {
    return configuredSecretKey;
  }

  if (process.env.NODE_ENV !== "production") {
    return TURNSTILE_TEST_SECRET_KEY;
  }

  return null;
}

function getRequestHost(request: Request) {
  const forwardedHost = cleanEnvValue(request.headers.get("x-forwarded-host") ?? undefined);
  const host = forwardedHost ?? cleanEnvValue(request.headers.get("host") ?? undefined);

  return host?.split(":")[0]?.toLowerCase() ?? "";
}

export function isTurnstileProtectionEnabled() {
  return Boolean(getTurnstileSiteKey() && getTurnstileSecretKey());
}

export async function verifyTurnstileToken({
  request,
  token,
  expectedAction,
}: {
  request: Request;
  token: string | null | undefined;
  expectedAction?: string;
}): Promise<TurnstileVerificationResult> {
  const siteKey = getTurnstileSiteKey();
  const secretKey = getTurnstileSecretKey();

  if (!siteKey || !secretKey) {
    return {
      enabled: false,
      success: true,
    };
  }

  const normalizedToken = token?.trim();

  if (!normalizedToken) {
    return {
      enabled: true,
      success: false,
      message: "Please complete the human verification and try again.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TURNSTILE_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: normalizedToken,
        remoteip: getClientIpAddress(request),
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        enabled: true,
        success: false,
        message: "We could not verify that booking right now. Please try again.",
      };
    }

    const result = (await response.json()) as TurnstileSiteverifyResponse;

    if (!result.success) {
      return {
        enabled: true,
        success: false,
        message: "Please complete the human verification and try again.",
      };
    }

    if (expectedAction && result.action && result.action !== expectedAction) {
      return {
        enabled: true,
        success: false,
        message: "We could not verify that booking request. Please refresh and try again.",
      };
    }

    const requestHost = getRequestHost(request);
    if (
      process.env.NODE_ENV === "production" &&
      requestHost &&
      result.hostname &&
      result.hostname.toLowerCase() !== requestHost
    ) {
      return {
        enabled: true,
        success: false,
        message: "We could not verify that booking request. Please refresh and try again.",
      };
    }

    return {
      enabled: true,
      success: true,
    };
  } catch (error) {
    console.error("Turnstile verification failed", error);

    return {
      enabled: true,
      success: false,
      message: "We could not verify that booking right now. Please try again.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
