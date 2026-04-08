const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

function cleanEnvValue(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export function getTurnstileSiteKey() {
  const configuredSiteKey = cleanEnvValue(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  if (configuredSiteKey) {
    return configuredSiteKey;
  }

  if (process.env.NODE_ENV !== "production") {
    return TURNSTILE_TEST_SITE_KEY;
  }

  return null;
}
