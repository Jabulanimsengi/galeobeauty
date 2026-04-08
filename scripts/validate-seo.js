const fs = require("node:fs");
const path = require("node:path");

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

function main() {
  validateAssetReferences();
  validateLocationsIndex();
  validateSeoGeneratorFormatting();
  validateKnownOgImageTypos();
  validateSitemapPolicy();
  validateLocationSeededContent();
  validatePriorityContentPath();
  validatePriorityLists();
  validateCanonicalOriginPolicy();

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
