#!/usr/bin/env node
/**
 * generate-redirect-data.ts
 *
 * Generates `src/lib/redirect-data.json` — a lightweight static JSON file that
 * `next.config.ts` reads instead of importing the full TypeScript service data
 * modules at dev-server startup.
 *
 * Why this matters:
 *   - `services-content.ts`  (~90 KB) + `seo-data.ts` (~218 KB) are both pulled
 *     into the Next.js config evaluation process when `next dev` or `next build`
 *     starts. By extracting the two small data shapes the redirect function needs
 *     (slug→categoryId map + service slug list) into a plain JSON file, we avoid
 *     TypeScript module parsing overhead on every cold start.
 *
 * Usage:
 *   npx tsx scripts/generate-redirect-data.ts
 */

import * as path from "path";
import * as fs from "fs";
import { serviceCategoriesContent } from "../src/lib/services-content";

// ---------------------------------------------------------------------------
// Build slugToCategory map  (item.id → category.id)
// ---------------------------------------------------------------------------
const slugToCategoryId: Record<string, string> = {};
const serviceSlugs: string[] = [];

for (const cat of serviceCategoriesContent) {
  for (const sub of cat.subcategories) {
    for (const item of sub.items) {
      slugToCategoryId[item.id] = cat.id;
      serviceSlugs.push(item.id);
    }
  }
}

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------
const output = {
  /** Maps every service item id → its category id. Used by the redirect builder. */
  slugToCategoryId,
  /** Ordered list of all service slugs. Mirrors SERVICE_SLUGS in sitemap-config.ts. */
  serviceSlugs,
};

const outPath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")),
  "../src/lib/redirect-data.json"
);

fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");

const itemCount = Object.keys(slugToCategoryId).length;
console.log(
  `✅  redirect-data.json written — ${itemCount} category entries, ${serviceSlugs.length} service slugs`
);
