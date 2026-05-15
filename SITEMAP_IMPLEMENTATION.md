# Sitemap Implementation

Last updated: 2026-05-14

## Overview

The site uses a generated static sitemap index with two child sitemap files. This replaced the earlier dynamic `/sitemap/{id}.xml` approach.

Current sitemap URLs:

- `/sitemap.xml`
- `/sitemaps/0.xml`
- `/sitemaps/1.xml`

Legacy sitemap patterns are redirected to `/sitemap.xml` by `src/proxy.ts`.

## Current Counts

Measured from the current code with:

```bash
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

| Metric | Count |
| --- | ---: |
| Sitemap 0 URLs | 7,885 |
| Sitemap 1 URLs | 4,784 |
| Total sitemap URLs | 12,669 |
| Location-service URLs | 11,790 |
| Static pages | 45 |
| Guide-safe pages | 265 |
| Blog posts | 16 |
| Bespoke service pages | 17 |
| Service pages | 304 |

## Sitemap Structure

### Sitemap Index

URL: `/sitemap.xml`

References:

- `https://www.galeobeauty.com/sitemaps/0.xml`
- `https://www.galeobeauty.com/sitemaps/1.xml`

### Sitemap 0

URL: `/sitemaps/0.xml`

Purpose:
- static pages
- guide-safe intent pages
- blog posts
- bespoke service pages
- service pages
- location index
- priority local and nearby location hubs
- selected priority location-service pages

Current total: `7,885`

### Sitemap 1

URL: `/sitemaps/1.xml`

Purpose:
- extended Gauteng and district location hubs
- selected extended location-service pages

Current total: `4,784`

## Why The Sitemap Is Smaller Now

The previous implementation notes described a much larger sitemap set that submitted nearly every location and service combination.

The current code intentionally filters location-service URLs through `isIndexableLocationService` in `src/lib/seo-data.ts`. This keeps crawl targets focused and reduces duplicate or thin page risk.

## Relevant Files

- `scripts/generate-sitemaps.ts`
- `scripts/run-generate-sitemaps.cjs`
- `src/lib/sitemap-helpers.ts`
- `src/lib/sitemap-config.ts`
- `src/lib/sitemap-utils.ts`
- `src/lib/seo-data.ts`
- `src/app/robots.ts`
- `src/proxy.ts`

## Generation

Compile-check the generator:

```bash
npm run generate:sitemaps -- --check
```

Generate files:

```bash
npm run generate:sitemaps
```

Production builds run sitemap generation through the `prebuild` script when the production/deploy environment is detected.

## Deployment Verification

After deployment, verify:

1. `https://www.galeobeauty.com/sitemap.xml`
2. `https://www.galeobeauty.com/sitemaps/0.xml`
3. `https://www.galeobeauty.com/sitemaps/1.xml`

Then submit this sitemap index to Google Search Console:

```text
https://www.galeobeauty.com/sitemap.xml
```
