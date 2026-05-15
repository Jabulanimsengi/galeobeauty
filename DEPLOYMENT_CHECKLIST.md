# SEO Deployment Checklist

Last updated: 2026-05-14

## Pre-Deployment

- [ ] Run the sitemap generator compile check.
- [ ] Run the SEO architecture audit.
- [ ] Confirm sitemap counts match the current implementation.
- [ ] Confirm redirects still point to canonical `/services` and `/locations` owners.

Commands:

```bash
npm run generate:sitemaps -- --check
npm run audit:seo-architecture
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

Current expected count summary:

- Sitemap 0: `7,885` URLs
- Sitemap 1: `4,784` URLs
- Total: `12,669` URLs
- Location-service URLs: `11,790`

## Build And Deploy

Build:

```bash
npm run build
```

Deploy through the normal production flow.

The production prebuild flow should run:

```bash
npm run generate:redirects && npm run generate:sitemaps:if-production
```

That generates:

- `public/sitemap.xml`
- `public/sitemaps/0.xml`
- `public/sitemaps/1.xml`

## Post-Deployment Verification

### Sitemap Index

Visit:

```text
https://www.galeobeauty.com/sitemap.xml
```

Checklist:

- [ ] Returns XML.
- [ ] References `https://www.galeobeauty.com/sitemaps/0.xml`.
- [ ] References `https://www.galeobeauty.com/sitemaps/1.xml`.

### Sitemap 0

Visit:

```text
https://www.galeobeauty.com/sitemaps/0.xml
```

Checklist:

- [ ] Returns XML.
- [ ] Contains homepage/static URLs.
- [ ] Contains `/services` pages.
- [ ] Contains guide-safe pages.
- [ ] Contains selected priority location-service URLs.
- [ ] Has about `7,885` URLs.

### Sitemap 1

Visit:

```text
https://www.galeobeauty.com/sitemaps/1.xml
```

Checklist:

- [ ] Returns XML.
- [ ] Contains extended location hubs.
- [ ] Contains selected extended location-service URLs.
- [ ] Has about `4,784` URLs.

### Robots

Visit:

```text
https://www.galeobeauty.com/robots.txt
```

Checklist:

- [ ] References `https://www.galeobeauty.com/sitemap.xml`.

### Legacy Sitemap Paths

Check that older sitemap URLs redirect to `/sitemap.xml`:

- [ ] `/sitemap/0.xml`
- [ ] `/sitemap/1.xml`
- [ ] `/sitemap-seo/0.xml`
- [ ] `/sitemap_index.xml`

## Google Search Console

Submit only:

```text
https://www.galeobeauty.com/sitemap.xml
```

After 24 to 48 hours:

- [ ] Check sitemap status.
- [ ] Check discovered URL count against the current `12,669` URL target.
- [ ] Review crawl or parsing errors.

## Search Console Monitoring

Track these groups after deployment:

- Hartbeespoort / Harties terms.
- Pretoria / Centurion / Brits / Midstream / Moreleta Park terms.
- Johannesburg / Tshwane / Ekurhuleni / West Rand / Sedibeng terms.
- Generic service terms.
- Exact treatment terms.

## Troubleshooting

### Sitemap count does not match

Run:

```bash
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

Treat this command as the source of truth unless the sitemap code has intentionally changed.

### Child sitemap returns 404

Confirm the production build generated the static files under `public/sitemaps/`.

### Google reports old sitemap URLs

Remove old manually submitted sitemap variants in Search Console and keep only:

```text
https://www.galeobeauty.com/sitemap.xml
```
