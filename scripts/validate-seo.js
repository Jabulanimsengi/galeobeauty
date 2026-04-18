const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const repoRoot = path.resolve(__dirname, "..");
const issues = [];

function addIssue(kind, message) {
  issues.push({ kind, message });
}

function readFile(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function toPublicPath(urlPath) {
  return urlPath.replace(/^https?:\/\/[^/]+/, "");
}

function getKnownLocationSlugs() {
  const content = readFile("src/lib/seo-data.ts");
  return new Set([...content.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
}

function getKnownServiceSlugs() {
  const content = readFile("src/lib/services-content.ts");
  return new Set([...content.matchAll(/id:\s*"([^"]+)"/g)].map((match) => match[1]));
}

function getIntentPageRecords() {
  const contentDir = path.join(repoRoot, "src", "content", "intent-pages");

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
      const parsed = matter(raw);

      return {
        file,
        raw,
        data: parsed.data,
      };
    });
}

function isIntentPageIndexableRecord(record) {
  if (record.data.published === false || record.data.noindex === true || record.data.qualityStatus === "draft") {
    return false;
  }

  if (/^aesthetics-authority-topic-\d+\.mdx$/i.test(record.file)) {
    return false;
  }

  if (record.raw.includes("(Please add your article content here)")) {
    return false;
  }

  return true;
}

function validateAssetReferences() {
  const assetRefs = [
    {
      file: "src/app/layout.tsx",
      asset: "/images/logo.png",
      isPresent: (content) => content.includes("/images/logo.png"),
    },
    {
      file: "src/app/locations/[location]/[service]/page.tsx",
      asset: "https://www.galeobeauty.com/images/logo.png",
      isPresent: (content) => content.includes("https://www.galeobeauty.com/images/logo.png"),
    },
    {
      file: "src/lib/sitemap-helpers.ts",
      asset: "https://www.galeobeauty.com/images/logo.png",
      isPresent: (content) =>
        content.includes("export const FALLBACK_IMAGE = `${BASE_URL}/images/logo.png`;") &&
        content.includes("toAbsoluteUrl(service.image || FALLBACK_IMAGE)"),
    },
  ];

  for (const ref of assetRefs) {
    const content = readFile(ref.file);
    if (!ref.isPresent(content)) {
      addIssue("error", `${ref.file} is missing expected asset reference: ${ref.asset}`);
    }

    const publicPath = path.join(repoRoot, "public", toPublicPath(ref.asset));
    if (!fs.existsSync(publicPath)) {
      addIssue("error", `Referenced asset does not exist: public${toPublicPath(ref.asset)}`);
    }
  }
}

function validateLocationsIndex() {
  const content = readFile("src/app/locations/page.tsx");
  const locationSlugMatches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
  const locationSlugs = getKnownLocationSlugs();

  for (const match of locationSlugMatches) {
    const slug = match[1];
    if (!locationSlugs.has(slug)) {
      addIssue("error", `src/app/locations/page.tsx links to unknown location slug: ${slug}`);
    }
  }
}

function validateSeoGeneratorFormatting() {
  const content = readFile("src/lib/seo-generator.ts");
  if (content.includes("**${item.name}**") || content.includes("**${item.price}**")) {
    addIssue("error", "src/lib/seo-generator.ts still contains markdown emphasis markers in generated copy.");
  }
}

function validateKnownOgImageTypos() {
  const files = [
    "src/app/layout.tsx",
    "src/app/locations/[location]/[service]/page.tsx",
    "src/lib/sitemap-helpers.ts",
  ];

  for (const file of files) {
    const content = readFile(file);
    if (content.includes("og-image.jpg")) {
      addIssue("error", `${file} still references og-image.jpg`);
    }
  }
}

function validateSitemapPolicy() {
  const sitemapHelpers = readFile("src/lib/sitemap-helpers.ts");

  if (sitemapHelpers.includes("location === 'hartbeespoort'") || sitemapHelpers.includes("location === 'harties'")) {
    addIssue("error", "src/lib/sitemap-helpers.ts still excludes hartbeespoort or harties from sitemap coverage.");
  }

  if (sitemapHelpers.includes("LOW_VALUE_PATTERN")) {
    addIssue("error", "src/lib/sitemap-helpers.ts still excludes low-value variants from sitemap coverage.");
  }
}

function validateLocationSeededContent() {
  const content = readFile("src/app/locations/[location]/[service]/page.tsx");
  const descriptionCalls = content.match(/generateServiceDescription\(/g) || [];
  const hasMetadataLocationSeed = content.includes("canonicalLocation.name");
  const hasPageLocationSeed = content.includes("location.name");
  const hasLocalInsightsSection =
    content.includes("{service.keyword} Quick Facts for {location.name}") &&
    content.includes("Serving <span className=\"text-gold\">{location.name}</span> & {location.region}") &&
    content.includes("locationServiceInsight");

  if (descriptionCalls.length < 2 || !hasMetadataLocationSeed || !hasPageLocationSeed) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is not consistently seeding generated copy with location-aware context.");
  }

  if (!hasLocalInsightsSection) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is missing the current local insights content blocks.");
  }
}

function validatePriorityContentPath() {
  const pageContent = readFile("src/app/locations/[location]/[service]/page.tsx");
  const seoDataContent = readFile("src/lib/seo-data.ts");
  const hasCurrentLocationArchitecture =
    pageContent.includes("getLocationInsights(location)") &&
    pageContent.includes("getLocationServiceInsight(resolvedService, location)") &&
    pageContent.includes("nearbyLocations.map((nearbyLoc) => (") &&
    pageContent.includes("dynamicRelatedServices.map((relatedService) => (") &&
    pageContent.includes("const allSchemas = [structuredData, breadcrumbSchema, faqSchema, howToSchema];");

  if (!seoDataContent.includes("isPriorityLocationService")) {
    addIssue("error", "src/lib/seo-data.ts is missing the priority location-service helper.");
  }

  if (!seoDataContent.includes("getPriorityLocationServiceContent")) {
    addIssue("error", "src/lib/seo-data.ts is missing the priority location-service content helper.");
  }

  if (!hasCurrentLocationArchitecture) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is missing the current location-service SEO architecture blocks.");
  }
}

function validateInvalidRouteHandling() {
  const locationHubPage = readFile("src/app/locations/[location]/page.tsx");
  const locationServicePage = readFile("src/app/locations/[location]/[service]/page.tsx");

  if (locationHubPage.includes('redirect("/locations")')) {
    addIssue("error", "src/app/locations/[location]/page.tsx still redirects invalid location hubs instead of returning notFound().");
  }

  if (!locationHubPage.includes("notFound()")) {
    addIssue("error", "src/app/locations/[location]/page.tsx is missing notFound() handling for invalid location hubs.");
  }

  if (locationServicePage.includes("return { title: \"Service Not Found\" }")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx still returns a soft Service Not Found metadata response.");
  }

  if (locationServicePage.includes("return { title: \"Location Not Found\" }")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx still returns a soft Location Not Found metadata response.");
  }

  if (locationServicePage.includes("redirect(\"/locations\")")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx still redirects invalid location-service URLs to /locations.");
  }

  if (locationServicePage.includes("if (!location && service)")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx still redirects invalid locations to price pages instead of returning notFound().");
  }
}

function validateLocationLinkHygiene() {
  const locationServicesClient = readFile("src/components/location/LocationServicesClient.tsx");
  const locationServicePage = readFile("src/app/locations/[location]/[service]/page.tsx");

  if (!locationServicesClient.includes("isIndexableLocationService(detailsLocationSlug, item.id)")) {
    addIssue("error", "src/components/location/LocationServicesClient.tsx is not checking whether local service detail links are indexable.");
  }

  if (!locationServicesClient.includes("`/prices/${category.id}/${item.id}`")) {
    addIssue("error", "src/components/location/LocationServicesClient.tsx is missing the canonical /prices fallback for non-indexable local service links.");
  }

  if (!locationServicePage.includes("buildCurrentLocationServiceHref")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is missing the helper that normalizes local related-service links.");
  }

  if (!locationServicePage.includes("buildNearbyAreaHref")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is missing the helper that normalizes nearby-area links.");
  }
}

function validatePriorityLists() {
  const seoData = readFile("src/lib/seo-data.ts");
  const priorityLocationsBlock = seoData.match(/export const PRIORITY_LOCATIONS = \[(.*?)\];/s);
  const heroServicesBlock = seoData.match(/export const HERO_SERVICES = \[(.*?)\];/s);

  if (!priorityLocationsBlock || !heroServicesBlock) {
    addIssue("error", "Could not parse PRIORITY_LOCATIONS or HERO_SERVICES from src/lib/seo-data.ts.");
    return;
  }

  const priorityLocations = [...priorityLocationsBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
  const heroServices = [...heroServicesBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  const knownLocations = getKnownLocationSlugs();
  const knownServices = getKnownServiceSlugs();

  for (const slug of priorityLocations) {
    if (!knownLocations.has(slug)) {
      addIssue("error", `PRIORITY_LOCATIONS contains unknown location slug: ${slug}`);
    }
  }

  for (const slug of heroServices) {
    if (!knownServices.has(slug)) {
      addIssue("error", `HERO_SERVICES contains unknown service slug: ${slug}`);
    }
  }
}

function validateCanonicalOriginPolicy() {
  const proxy = readFile("src/proxy.ts");

  if (!proxy.includes("x-forwarded-proto")) {
    addIssue("error", "src/proxy.ts is not checking x-forwarded-proto for https canonicalization.");
  }

  if (!proxy.includes("hostname = 'www.galeobeauty.com'") && !proxy.includes("hostname = \"www.galeobeauty.com\"")) {
    addIssue("error", "src/proxy.ts is not forcing the canonical www.galeobeauty.com host.");
  }

  if (!proxy.includes("protocol = 'https:'") && !proxy.includes("protocol = \"https:\"")) {
    addIssue("error", "src/proxy.ts is not forcing https in the canonical redirect.");
  }
}

function validateProxy404Policy() {
  const proxy = readFile("src/proxy.ts");
  const locationManifest = readFile("src/lib/location-route-manifest.ts");

  if (!proxy.includes("isKnownLocationSlug")) {
    addIssue("error", "src/proxy.ts is not validating location slugs before rendering /locations routes.");
  }

  if (!proxy.includes("resolveLegacyServiceRedirect")) {
    addIssue("error", "src/proxy.ts is not preserving legacy service redirects when validating /locations routes.");
  }

  if (!proxy.includes("status: 404")) {
    addIssue("error", "src/proxy.ts is missing an explicit 404 response for invalid /locations routes.");
  }

  if (!proxy.includes("x-robots-tag': 'noindex, nofollow'") && !proxy.includes('x-robots-tag": "noindex, nofollow"')) {
    addIssue("error", "src/proxy.ts is missing noindex headers on proxy-generated 404 responses.");
  }

  if (!locationManifest.includes("VALID_LOCATION_SLUGS")) {
    addIssue("error", "src/lib/location-route-manifest.ts is missing the location slug manifest.");
  }
}

function validateIntentPagePublishingControls() {
  const intentPages = readFile("src/lib/intent-pages.ts");
  const infoGenerator = readFile("scripts/generate-informational-mdx.ts");
  const saturationGenerator = readFile("scripts/generate-saturation-content.ts");

  if (!intentPages.includes("PLACEHOLDER_SLUG_PATTERN")) {
    addIssue("error", "src/lib/intent-pages.ts is missing the placeholder-slug publish guard.");
  }

  if (!intentPages.includes("hasDraftContentMarkers")) {
    addIssue("error", "src/lib/intent-pages.ts is missing draft content marker detection.");
  }

  if (!intentPages.includes("canonicalizeIntentPageHref")) {
    addIssue("error", "src/lib/intent-pages.ts is missing the legacy MDX link canonicalization helper.");
  }

  if (!infoGenerator.includes("published: false") || !infoGenerator.includes('qualityStatus: "draft"')) {
    addIssue("error", "scripts/generate-informational-mdx.ts must create draft, non-indexable pages by default.");
  }

  if (!saturationGenerator.includes("published: false") || !saturationGenerator.includes('qualityStatus: "draft"')) {
    addIssue("error", "scripts/generate-saturation-content.ts must create draft, non-indexable pages by default.");
  }
}

function validateIntentPageContentQuality() {
  const records = getIntentPageRecords();
  const genericHeroPattern = /heroDescription:\s*(>|")?\s*Everything you need to know about/i;
  const genericTreatmentPattern = /treatmentApproach:\s*(>|")?\s*Read our comprehensive professional advice below\./i;
  const genericFaqPattern = /question:\s*Is .* suitable for all types\?/i;
  const mojibakePattern = /â€”|â€¢|â€™|â€œ|â€|Â/;
  const legacySkinLinkPattern = /\/prices\/skin(?:\/|\b)/;

  for (const record of records) {
    if (!isIntentPageIndexableRecord(record)) {
      continue;
    }

    if (legacySkinLinkPattern.test(record.raw)) {
      addIssue("warn", `Intent page still contains legacy /prices/skin links that should be cleaned in source: src/content/intent-pages/${record.file}`);
    }

    if (mojibakePattern.test(record.raw)) {
      addIssue("error", `Intent page contains mojibake characters: src/content/intent-pages/${record.file}`);
    }

    if (genericHeroPattern.test(record.raw) || genericTreatmentPattern.test(record.raw) || genericFaqPattern.test(record.raw)) {
      addIssue("warn", `Intent page still uses generic boilerplate copy markers: src/content/intent-pages/${record.file}`);
    }
  }
}

function validateCommercialIndexingPolicy() {
  const commercialSeo = readFile("src/lib/commercial-seo.ts");
  const commercialPage = readFile("src/app/salons/[commercialSlug]/page.tsx");
  const sitemapHelpers = readFile("src/lib/sitemap-helpers.ts");

  if (!commercialSeo.includes("isCommercialPageIndexable")) {
    addIssue("error", "src/lib/commercial-seo.ts is missing the commercial page indexing helper.");
  }

  if (!commercialPage.includes("index: isCommercialPageIndexable(page)")) {
    addIssue("error", "src/app/salons/[commercialSlug]/page.tsx is missing explicit robots control for commercial pages.");
  }

  if (!sitemapHelpers.includes("getIndexableCommercialPages")) {
    addIssue("error", "src/lib/sitemap-helpers.ts must only include indexable commercial pages.");
  }
}

function validateMojibakeOutsideIntentPages() {
  const files = [
    "src/app/salons/[commercialSlug]/page.tsx",
  ];
  const mojibakePattern = /â€”|â€¢|â€™|â€œ|â€|Â/;

  for (const file of files) {
    const content = readFile(file);
    if (mojibakePattern.test(content)) {
      addIssue("error", `${file} contains mojibake characters.`);
    }
  }
}

function main() {
  validateAssetReferences();
  validateLocationsIndex();
  validateSeoGeneratorFormatting();
  validateKnownOgImageTypos();
  validateSitemapPolicy();
  validateLocationSeededContent();
  validatePriorityContentPath();
  validateInvalidRouteHandling();
  validateLocationLinkHygiene();
  validatePriorityLists();
  validateCanonicalOriginPolicy();
  validateProxy404Policy();
  validateIntentPagePublishingControls();
  validateIntentPageContentQuality();
  validateCommercialIndexingPolicy();
  validateMojibakeOutsideIntentPages();

  if (issues.length === 0) {
    console.log("SEO validation passed.");
    process.exit(0);
  }

  for (const issue of issues) {
    const prefix = issue.kind === "error" ? "ERROR" : "WARN";
    console.log(`[${prefix}] ${issue.message}`);
  }

  process.exit(issues.some((issue) => issue.kind === "error") ? 1 : 0);
}

main();
