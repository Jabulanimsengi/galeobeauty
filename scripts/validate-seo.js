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
    { file: "src/app/layout.tsx", asset: "/images/logo.png" },
    { file: "src/app/locations/[location]/[service]/page.tsx", asset: "https://www.galeobeauty.com/images/logo.png" },
    { file: "src/app/sitemaps/0.xml/route.ts", asset: "https://www.galeobeauty.com/images/logo.png" },
  ];

  for (const ref of assetRefs) {
    const content = readFile(ref.file);
    if (!content.includes(ref.asset)) {
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
    "src/app/sitemaps/0.xml/route.ts",
  ];

  for (const file of files) {
    const content = readFile(file);
    if (content.includes("og-image.jpg")) {
      addIssue("error", `${file} still references og-image.jpg`);
    }
  }
}

function validateSitemapPolicy() {
  const sitemap0 = readFile("src/app/sitemaps/0.xml/route.ts");
  const sitemap1 = readFile("src/app/sitemaps/1.xml/route.ts");

  if (sitemap0.includes("location === 'hartbeespoort'") || sitemap0.includes("location === 'harties'")) {
    addIssue("error", "src/app/sitemaps/0.xml/route.ts still excludes hartbeespoort or harties from sitemap coverage.");
  }

  if (sitemap1.includes("LOW_VALUE_PATTERN")) {
    addIssue("error", "src/app/sitemaps/1.xml/route.ts still excludes low-value variants from sitemap coverage.");
  }
}

function validateLocationSeededContent() {
  const content = readFile("src/app/locations/[location]/[service]/page.tsx");
  const seededCalls = content.match(/generateServiceDescription\([\s\S]*?location\.name[\s\S]*?\)/g) || [];

  if (seededCalls.length < 2) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is not consistently seeding generated copy with location.name.");
  }

  if (!content.includes("Why {location.name} Clients Book {service.keyword} Here")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is missing the local uniqueness section heading.");
  }
}

function validatePriorityContentPath() {
  const pageContent = readFile("src/app/locations/[location]/[service]/page.tsx");
  const seoDataContent = readFile("src/lib/seo-data.ts");

  if (!seoDataContent.includes("isPriorityLocationService")) {
    addIssue("error", "src/lib/seo-data.ts is missing the priority location-service helper.");
  }

  if (!seoDataContent.includes("getPriorityLocationServiceContent")) {
    addIssue("error", "src/lib/seo-data.ts is missing the priority location-service content helper.");
  }

  if (!pageContent.includes("Priority Location + Service Combination")) {
    addIssue("error", "src/app/locations/[location]/[service]/page.tsx is missing the priority combination content block.");
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
  const middleware = readFile("src/middleware.ts");

  if (!middleware.includes("x-forwarded-proto")) {
    addIssue("error", "src/middleware.ts is not checking x-forwarded-proto for https canonicalization.");
  }

  if (!middleware.includes("hostname = 'www.galeobeauty.com'") && !middleware.includes("hostname = \"www.galeobeauty.com\"")) {
    addIssue("error", "src/middleware.ts is not forcing the canonical www.galeobeauty.com host.");
  }

  if (!middleware.includes("protocol = 'https:'") && !middleware.includes("protocol = \"https:\"")) {
    addIssue("error", "src/middleware.ts is not forcing https in the canonical redirect.");
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
