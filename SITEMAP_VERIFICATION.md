# Sitemap Verification Guide

Last updated: 2026-05-14

## Implementation Status

The current sitemap implementation is generated as static XML files before production builds.

Current public paths:

- `/sitemap.xml`
- `/sitemaps/0.xml`
- `/sitemaps/1.xml`

Do not use the older `/sitemap/0.xml` or `/sitemap/1.xml` paths for verification. Those were part of an earlier implementation note and are no longer the current source of truth.

## Current Test Results

Command:

```bash
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

Current output summary:

- Sitemap 0: `7,885` URLs
- Sitemap 1: `4,784` URLs
- Total: `12,669` URLs
- Location-service URLs: `11,790`

Command:

```bash
npm run audit:seo-architecture
```

Current result:

```text
OK: SEO architecture redirects and sitemap rules are aligned.
```

## Implementation Details

Sitemap generation is handled by:

- `scripts/generate-sitemaps.ts`
- `scripts/run-generate-sitemaps.cjs`
- `src/lib/sitemap-helpers.ts`
- `src/lib/sitemap-config.ts`
- `src/lib/sitemap-utils.ts`

The generator writes files into `public/`:

- `public/sitemap.xml`
- `public/sitemaps/0.xml`
- `public/sitemaps/1.xml`

`src/app/robots.ts` points crawlers to:

```text
https://www.galeobeauty.com/sitemap.xml
```

## Local Verification

Compile-check the generator:

```bash
npm run generate:sitemaps -- --check
```

Generate sitemap files locally:

```bash
npm run generate:sitemaps
```

Print URL counts:

```bash
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

Run the architecture audit:

```bash
npm run audit:seo-architecture
```

If a local server is running, verify live behavior too:

```bash
npm run audit:seo-architecture -- --base-url http://localhost:3000
```

## Production Verification Checklist

After deployment:

- [ ] `https://www.galeobeauty.com/sitemap.xml` returns an XML sitemap index.
- [ ] The sitemap index references `https://www.galeobeauty.com/sitemaps/0.xml`.
- [ ] The sitemap index references `https://www.galeobeauty.com/sitemaps/1.xml`.
- [ ] `https://www.galeobeauty.com/sitemaps/0.xml` returns XML.
- [ ] `https://www.galeobeauty.com/sitemaps/1.xml` returns XML.
- [ ] Sitemap 0 has about `7,885` URLs.
- [ ] Sitemap 1 has about `4,784` URLs.
- [ ] All canonical URLs use `https://www.galeobeauty.com`.
- [ ] Legacy sitemap paths redirect to `/sitemap.xml`.

## Google Search Console

Submit only:

```text
https://www.galeobeauty.com/sitemap.xml
```

Google should discover the two child sitemap files from the sitemap index.

## Troubleshooting

### Sitemap counts do not match this document

Run:

```bash
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

Treat that command as the current source of truth, then update this document if the code has intentionally changed.

### Older docs mention 49k or 64k URLs

Those counts are stale. The current architecture intentionally filters location-service URLs through `isIndexableLocationService` to avoid over-submitting duplicate or thin pages.

### Legacy sitemap URLs are requested

The proxy handles known legacy sitemap paths and redirects them to `/sitemap.xml`.
