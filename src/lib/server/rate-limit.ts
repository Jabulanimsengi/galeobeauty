import "server-only";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

declare global {
  var __galeoRateLimitStore: Map<string, RateLimitEntry> | undefined;
  var __galeoRateLimitLastCleanup: number | undefined;
}

const RATE_LIMIT_STORE = globalThis.__galeoRateLimitStore ?? new Map<string, RateLimitEntry>();
globalThis.__galeoRateLimitStore = RATE_LIMIT_STORE;

const CLEANUP_INTERVAL_MS = 60_000;

function cleanupExpiredEntries(now: number) {
  const lastCleanup = globalThis.__galeoRateLimitLastCleanup ?? 0;

  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return;
  }

  for (const [key, entry] of RATE_LIMIT_STORE.entries()) {
    if (entry.resetAt <= now) {
      RATE_LIMIT_STORE.delete(key);
    }
  }

  globalThis.__galeoRateLimitLastCleanup = now;
}

export function getClientIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwardedFor) {
    return forwardedFor;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function checkRateLimitForRequest({
  request,
  namespace,
  limit,
  windowMs,
}: {
  request: Request;
  namespace: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const identifier = getClientIpAddress(request);
  const key = `${namespace}:${identifier}`;
  const existingEntry = RATE_LIMIT_STORE.get(key);

  if (!existingEntry || existingEntry.resetAt <= now) {
    RATE_LIMIT_STORE.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      limit,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: 0,
    };
  }

  existingEntry.count += 1;
  RATE_LIMIT_STORE.set(key, existingEntry);

  const allowed = existingEntry.count <= limit;

  return {
    allowed,
    limit,
    remaining: Math.max(limit - existingEntry.count, 0),
    retryAfterSeconds: allowed ? 0 : Math.max(Math.ceil((existingEntry.resetAt - now) / 1000), 1),
  };
}
