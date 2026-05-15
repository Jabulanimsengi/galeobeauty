# Search Console Recovery Playbook

This playbook is for cleaning up the large `Page with redirect`, soft-404, and stale URL buckets without changing the public URL structure.

## Goal

Keep the current route structure intact while making sure Google only discovers:

- final canonical `200` URLs
- intentionally indexable location-service pages
- valid location hubs
- canonical `/services/...` service pages

And does **not** keep discovering:

- invalid location or location-service URLs
- redirecting legacy `/prices/...` or stale flat service URLs as primary URLs
- Hartbeespoort-cluster location-service URLs that collapse to broader canonical pages

## Code Changes Already Applied

- Invalid location hubs now return `404` instead of redirecting to `/locations`
- Invalid location-service combinations now return `404` instead of acting like soft 404s
- Location hub treatment links now point to canonical `/services/...` pages when the local service URL is not truly indexable
- Location-service related links now prefer canonical destinations instead of generating redirect-heavy local URL variants
- The Hartbeespoort location hub now includes client-first service-path guidance for people deciding what to book
- Priority service hubs now include "How To Choose" and "Before You Book" guidance for hair, nails, massages, waxing, lashes/brows, IPL, Dermalogica, and Hart Aesthetics

## Client-Facing Copy Rule

Do not add SEO-only copy to client-facing pages.

Visible page strengthening should help clients make booking decisions. Use treatment fit, preparation, comfort, pricing, duration, reviews, internal paths, and next-step calls to action. Keep keyword targeting in metadata, schema, redirects, sitemap rules, internal linking, and taxonomy work instead of writing visible filler for search engines.

## Deploy Order

1. Deploy the route and internal-link changes first.
2. Confirm production status codes for:
   - a valid canonical location-service page
   - an invalid location hub
   - an invalid location-service page
3. Regenerate and verify sitemap files if your deployment flow requires it.
4. Submit only the canonical sitemap index:
   - `https://www.galeobeauty.com/sitemap.xml`

## Production Checks

After deploy, verify these examples:

- Valid canonical page should be `200`
  - Example: `/locations/johannesburg/ipl-full-face`
- Invalid location hub should be `404`
  - Example: `/locations/brits-cbd`
- Invalid location-service page should be `404`
  - Example: `/locations/stilfontein/microloop-35cm-light`
- Legacy route should redirect once to the canonical destination
  - Example: `/locations/pretoria-cbd/beardline-ipl`

## Search Console Actions

1. Open the existing `Page with redirect` report.
2. Do **not** validate immediately before deploy.
3. After deploy and spot checks, click `Validate Fix`.
4. Re-submit the canonical sitemap index if needed.
5. If old sitemap variants were ever submitted manually, remove them from Search Console:
   - `/sitemap/0.xml`
   - `/sitemap/1.xml`
   - `/sitemap-seo/...`
   - any old non-canonical sitemap endpoint

The current canonical sitemap index is:

```text
https://www.galeobeauty.com/sitemap.xml
```

The current child sitemap files are:

```text
https://www.galeobeauty.com/sitemaps/0.xml
https://www.galeobeauty.com/sitemaps/1.xml
```

## Expectations

- `Page with redirect` will not disappear instantly.
- Google may keep reporting legacy URLs for a while if they were discovered historically.
- The bucket should shrink over time once internal discovery and status codes are corrected.
- Soft-404 and `Crawled - currently not indexed` buckets should also improve once invalid URLs stop returning `200`.

## Ongoing Guardrails

Run these before major SEO deployments:

```bash
npm run typecheck
npm run validate:seo
```

Use the route audit for production spot-checks:

```bash
npm run audit:routes -- --base-url https://www.galeobeauty.com --limit 50
```
