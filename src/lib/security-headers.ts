const CONTENT_SECURITY_POLICY_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "script-src 'self' 'unsafe-inline' blob: https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com https://challenges.cloudflare.com https://analytics.ahrefs.com",
  "script-src-elem 'self' 'unsafe-inline' blob: https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com https://challenges.cloudflare.com https://analytics.ahrefs.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com https://challenges.cloudflare.com https://analytics.ahrefs.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "media-src 'self' blob: https:",
];

if (process.env.NODE_ENV === "production") {
  CONTENT_SECURITY_POLICY_DIRECTIVES.push("upgrade-insecure-requests");
}

export const CONTENT_SECURITY_POLICY = CONTENT_SECURITY_POLICY_DIRECTIVES.join("; ");
