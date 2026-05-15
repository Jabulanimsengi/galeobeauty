# SEO Architecture Rules

Last updated: 2026-05-13

## Purpose

This document defines the URL ownership rules for Galeo Beauty so that guides, services, service categories, location hubs, and location-service pages do not compete with each other.

The goal is to help Google understand which page should rank for each search intent, reduce duplicate commercial pages, improve crawl efficiency, and build stronger authority around the pages already showing traction in Google Search Console.

## Current SEO Commit Scope

This SEO commit is limited to search architecture and client-facing search recovery work:

- Strengthen canonical service category hubs at `/services/{category}` with decision-support content, internal links, and booking paths.
- Add a Hartbeespoort location-hub planning section that points users toward the right canonical service category or selected local service route.
- Keep service-related hero presentation clean by removing the unwanted vertical border rails around the image containers.
- Remove the visible local-keyword link strip from the homepage so SEO anchors do not leak into the client-facing Popular Services section.
- Add footer links to canonical service category hubs so those category pages receive consistent sitewide internal links.
- Document the rule that visible client-facing pages must not contain SEO-only filler copy.

Excluded from this SEO commit:

- Chatbot logic, prompts, regression scripts, and chatbot storage.
- Shop, products, cart, orders, payment, and product-admin logic.
- Members, subscribers, email campaigns, and account-related logic.
- Booking/admin workflow changes that are unrelated to canonical SEO architecture.

Those excluded areas may remain in the working tree, but they should not be staged or committed with this SEO slice.

## Search Console Signals Behind This Structure

The latest Search Console reports show that Galeo Beauty already has useful signals in three areas:

- Brand/entity demand: `galeo`, `galeo beauty`, `galeo hartbeespoort`, and service-offer queries are the strongest traffic drivers.
- Broad local commercial demand: queries like `hairdresser hartbeespoort`, `hair salon hartbeespoort`, `nails hartbeespoort`, `salon hartbeespoort`, and `nail salon hartbeespoort` already rank around page-one positions.
- Long-tail treatment/location demand: many `/locations/{location}/{service}` pages receive small impression volumes, with some good positions and clicks.

The reports also show weaker performance for broad informational guide pages and many low-volume location-service combinations. That means the priority should be cleaner architecture and stronger canonical owners, not simply adding more URLs.

## URL Ownership Rules

### 1. Homepage

Pattern: `/`

Purpose:
- Owns brand/entity searches.
- Reinforces Galeo Beauty as the primary salon entity in Hartbeespoort.
- Links users and crawlers into the main commercial sections.

Primary queries:
- `galeo`
- `galeo beauty`
- `galeo hartbeespoort`
- `services offered by galeo beauty`

Rules:
- Do not create alternate brand landing pages.
- Keep the homepage canonical to `https://www.galeobeauty.com`.
- Use homepage links to point to canonical service/category/location pages, not redirecting flat pages.

### 2. Service Index

Pattern: `/services`

Purpose:
- Main commercial service menu.
- Internal linking hub for service categories and individual treatments.

Rules:
- `/prices` should redirect to `/services`.
- Service discovery should happen through `/services` and service category pages.

### 3. Service Category Hubs

Pattern: `/services/{category}`

Examples:
- `/services/hair`
- `/services/nails`
- `/services/lashes-brows`
- `/services/waxing`
- `/services/massages`
- `/services/fat-freezing`
- `/services/dermalogica`
- `/services/hart-aesthetics`
- `/services/medical`

Purpose:
- Own broad local commercial terms where the user wants a service family, not one exact treatment.

Primary queries:
- `hair salon hartbeespoort`
- `nail salon hartbeespoort`
- `lashes hartbeespoort`
- `waxing hartbeespoort`
- `massage hartbeespoort`
- `fat freezing hartbeespoort`
- `skin treatments hartbeespoort`

Rules:
- These pages are the canonical owners for broad commercial searches.
- Flat pages such as `/hair-salon-hartbeespoort` should redirect to their matching category owner unless a separate landing-page system is deliberately approved.
- Category hubs should not be thin menus. They need strong local copy, FAQs, service lists, prices, internal links, reviews/trust cues, and booking CTAs.

### 4. Service Detail Pages

Pattern: `/services/{category}/{service}`

Examples:
- `/services/permanent-makeup/microblading`
- `/services/hart-aesthetics/lip-filler-1ml`
- `/services/fat-freezing/fat-freezing-session`
- `/services/lashes-brows/lash-lift-tint`

Purpose:
- Own exact treatment terms without a strong location modifier.
- Explain the treatment, price, duration, suitability, aftercare, FAQs, and booking path.

Rules:
- Every service should have one canonical service detail page.
- Legacy service paths should redirect to this canonical service URL.
- Service detail pages may link to selected location-service pages where local demand exists.

### 5. Location Hubs

Pattern: `/locations/{location}`

Examples:
- `/locations/hartbeespoort`
- `/locations/pretoria`
- `/locations/johannesburg`
- `/locations/centurion`

Purpose:
- Own area-level intent.
- Help Google understand nearby service coverage and local relevance.

Rules:
- Location alias URLs must redirect to the canonical location slug.
- Location hubs should summarize local availability and link only to valuable location-service pages.
- Location hubs should not become duplicate service category pages.

### 6. Location-Service Pages

Pattern: `/locations/{location}/{service}`

Examples:
- `/locations/hartbeespoort/microblading`
- `/locations/hartbeespoort/lip-filler-1ml`
- `/locations/hartbeespoort/fat-freezing-session`
- `/locations/vanderbijlpark/fat-freezing-session`

Purpose:
- Own exact local long-tail terms where the user searches for a specific treatment in a specific area.

Rules:
- Location-service pages should be indexable only when the location and treatment combination has strategic value.
- Avoid multiplying every service by every location if the result is near-duplicate or unlikely to earn impressions.
- Hair extension SKU/location combinations should not be indexable because they multiply too many thin URLs.
- If a location-service page is not selected for indexing, it should canonicalize or redirect to the most relevant service detail page.

Current indexable selection model:
- Full local-service coverage is reserved for the canonical Hartbeespoort service area.
- Hartbeespoort-area suburbs/estates and nearby commuter locations use a strategic service set based on high-value treatments and Search Console traction.
- Major Gauteng hubs use a smaller commercial core set.
- All other supported locations use only an essential long-tail service set, plus a few proven page/query pairs from Search Console.
- Non-selected location-service URLs can still resolve for users, but they should not be submitted as indexable sitemap URLs.

### 7. Guides

Current pattern: `/guides` and `/guides/{category}` listing flat intent pages.

Preferred future pattern:
- `/guides/{topic}`
- `/guides/{category}/{topic}` if category grouping becomes necessary.

Purpose:
- Own informational, problem, comparison, and education intent.

Primary queries:
- `lash lift vs extensions`
- `what is microneedling`
- `chemical peel vs facial`
- `how long does keratin last`
- `best facial for acne`

Rules:
- Guides must not own broad booking terms like `hair salon hartbeespoort`.
- Guides must not be used as local commercial landing pages.
- Guide listings and guide sitemaps should include only guide-safe intent pages.
- Transactional MDX pages must not appear in `/guides` unless they are rewritten as true informational guides.
- Guides should link toward category/service pages as the conversion destination.

### 8. Flat Intent Pages

Pattern: `/{slug}`

Purpose:
- Temporary content route for existing MDX intent pages.

Rules:
- Informational, problem, educational, and comparison pages can remain as guides.
- Broad commercial local pages should redirect to their canonical owners.
- Transactional flat pages should either be redirected or migrated into a deliberate local landing-page template. They should not be presented as guides.

Current broad commercial redirects:
- `/hair-salon-hartbeespoort` -> `/services/hair`
- `/nail-salon-hartbeespoort` -> `/services/nails`
- `/massage-hartbeespoort` -> `/services/massages`
- `/waxing-hair-removal-hartbeespoort` -> `/services/waxing`
- `/lashes-and-brows-hartbeespoort` -> `/services/lashes-brows`
- `/lash-extensions-hartbeespoort` -> `/services/lashes-brows`
- `/ipl-hair-removal-hartbeespoort` -> `/services/ipl`
- `/microblading-hartbeespoort` -> `/locations/hartbeespoort/microblading`
- `/permanent-makeup-brows-hartbeespoort` -> `/services/permanent-makeup`
- `/lip-filler-hartbeespoort` -> `/locations/hartbeespoort/lip-filler-1ml`
- `/fat-freezing-hartbeespoort` -> `/services/fat-freezing`
- `/skin-treatments-hartbeespoort` -> `/services/dermalogica`
- `/medical-spa-clinic-hartbeespoort` -> `/services/medical`

Current transactional flat-page cleanup:
- Every current MDX page with `intentType: transactional` now redirects to a canonical owner.
- Exact treatment + city pages redirect to location-service pages when a valid treatment/location URL exists, such as `/balayage-near-pretoria` -> `/locations/pretoria/balayage`.
- Broad service-family pages redirect to category hubs, such as `/hair-salon-near-sandton` -> `/services/hair`.
- Broad city salon pages redirect to location hubs, such as `/beauty-salon-near-johannesburg` -> `/locations/johannesburg`.
- Informational pages should not be given `intentType: transactional`; if they are intended to rank as guides, they should be rewritten and classified as `problem`, `comparison`, or `educational`.

## Sitemap Rules

- Submit homepage, service index, service categories, service details, location hubs, selected location-service pages, blog posts, and guide-safe pages.
- Do not submit broad commercial flat pages that redirect.
- Do not submit transactional flat pages as guides.
- Sitemap priorities should favor commercial owners over guide pages.
- The current sitemap model reduces location-service indexation from 51,984 generated combinations to 11,790 selected location-service URLs.
- Run `npx tsx scripts/audit-seo-architecture.ts` before deploy to confirm redirect targets, guide-safe pages, sitemap inclusion, and location-service guardrails.
- Run `npx tsx scripts/audit-seo-architecture.ts -- --base-url http://localhost:3000` when a local server is running to verify live HTTP redirects.

## Internal Linking Rules

- Homepage and footer should link to canonical commercial owners, not redirecting URLs.
- Service category pages should link down to service details and selected location-service pages.
- Service detail pages should link up to category hubs and sideways to closely related services.
- Guides should link to the relevant commercial owner as the next step.
- Location hubs should link to selected location-service pages, not every possible service if the page set becomes low-value.

## Implementation Status

Implemented now:
- Intent pages have guide vs transactional classification helpers.
- `/guides` and `/guides/{category}` use guide-safe pages only.
- Related guide helpers use guide-safe pages only.
- Sitemap generation submits guide-safe intent pages instead of all intent pages.
- Broad Hartbeespoort commercial flat URLs redirect to canonical service/category/location owners.
- All current transactional MDX pages redirect to canonical owners, so no transactional MDX page is indexable through the flat guide-style route.
- Flat commercial intent redirects are also handled in the proxy layer so they return real HTTP redirects before the page route renders.
- Homepage, footer, reviews, and chatbot guide knowledge were adjusted to use canonical owners or guide-safe pages.
- Location-service indexation is now tiered instead of indexing nearly every service/location combination.
- Priority service category hubs have stronger commercial/local copy and canonical booking paths.
- `npx tsx scripts/audit-seo-architecture.ts` validates the architecture rules.

Still to implement after this architecture pass:
- Strengthen location hubs for the most important areas.
- Improve top service detail pages with Search Console traction.
- Build a separate local landing-page template only if we decide flat local URLs should exist as canonical landing pages.
