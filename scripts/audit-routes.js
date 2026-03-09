const LEGACY_STALE_REDIRECTS = {
  "botox-medium": { categoryId: "hair", serviceSlug: "botox" },
  "brazilian-blow-extra-long": { categoryId: "hair", serviceSlug: "brazilian-xl" },
  "sunbed-10-sessions": { categoryId: "sunbed", serviceSlug: "sunbed-10" },
  "full-leg-wax": { categoryId: "waxing", serviceSlug: "wax-full-leg" },
  "neck-ipl-men": { categoryId: "ipl", serviceSlug: "ipl-neck-men" },
  "combo-brows": { categoryId: "permanent-makeup", serviceSlug: "hybrid-brows" },
  "lip-wax": { categoryId: "waxing", serviceSlug: "wax-lip" },
};

const ROOT_REDIRECTS = [
  ["/laser-hair-removal", "/prices/ipl"],
  ["/anti-aging", "/prices/hart-aesthetics"],
  ["/body-contouring", "/prices/fat-freezing"],
  ["/medical-spa", "/prices/medical"],
  ["/permanent-makeup", "/prices/permanent-makeup"],
  ["/bridal-beauty", "/prices"],
  ["/matric-dance", "/prices"],
  ["/sitemap_index.xml", "/sitemap.xml"],
];

const HELP_TEXT = `
Usage:
  npm run audit:routes -- --base-url https://www.galeobeauty.com

Options:
  --base-url <url>       Required. Base URL to audit, for example http://localhost:3000
  --concurrency <n>      Parallel requests. Default: 8
  --limit <n>            Limit sitemap page checks to the first n URLs
  --no-redirects         Skip legacy redirect checks
  --help                 Show this help text
`;

function parseArgs(argv) {
  if (argv.includes("--help")) {
    console.log(HELP_TEXT.trim());
    return null;
  }

  const getValue = (flag) => {
    const index = argv.indexOf(flag);
    if (index === -1 || index === argv.length - 1) {
      return null;
    }
    return argv[index + 1];
  };

  const baseUrl = getValue("--base-url") || process.env.BASE_URL || "";

  if (!baseUrl) {
    console.error("Missing required --base-url option.");
    console.error(HELP_TEXT.trim());
    process.exit(1);
  }

  const concurrency = Number.parseInt(getValue("--concurrency") || "8", 10);
  const limitValue = getValue("--limit");

  return {
    baseUrl: normalizeBaseUrl(baseUrl),
    concurrency: Number.isFinite(concurrency) && concurrency > 0 ? concurrency : 8,
    limit: limitValue ? Number.parseInt(limitValue, 10) : null,
    includeRedirects: !argv.includes("--no-redirects"),
  };
}

function normalizeBaseUrl(input) {
  return input.replace(/\/+$/, "");
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractLocsFromXml(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1].trim()));
}

function toPath(value) {
  try {
    const url = new URL(value);
    return `${url.pathname}${url.search}`;
  } catch {
    return value.startsWith("/") ? value : `/${value}`;
  }
}

async function fetchUrl(url, method = "HEAD") {
  const response = await fetch(url, {
    method,
    redirect: "manual",
    headers: {
      "user-agent": "galeo-route-audit/1.0",
      accept: method === "HEAD" ? "*/*" : "text/xml,application/xml,text/html,*/*",
    },
  });

  if (method === "HEAD" && (response.status === 405 || response.status === 501)) {
    return fetchUrl(url, "GET");
  }

  return response;
}

async function fetchText(url) {
  const response = await fetchUrl(url, "GET");

  if (!response.ok) {
    throw new Error(`Expected 200 from ${url} but got ${response.status}`);
  }

  return response.text();
}

async function getSitemapPagePaths(baseUrl) {
  const sitemapIndexXml = await fetchText(`${baseUrl}/sitemap.xml`);
  const sitemapLocs = extractLocsFromXml(sitemapIndexXml);
  const pagePaths = new Set();

  for (const loc of sitemapLocs) {
    const path = toPath(loc);
    const targetUrl = `${baseUrl}${path}`;

    if (path.endsWith(".xml")) {
      const nestedXml = await fetchText(targetUrl);
      const nestedLocs = extractLocsFromXml(nestedXml);

      for (const nestedLoc of nestedLocs) {
        pagePaths.add(toPath(nestedLoc));
      }
    } else {
      pagePaths.add(path);
    }
  }

  return Array.from(pagePaths);
}

function dedupeExpectations(expectations) {
  const byPath = new Map();

  for (const expectation of expectations) {
    byPath.set(expectation.path, expectation);
  }

  return Array.from(byPath.values());
}

function buildRedirectExpectations(pagePaths) {
  const expectations = [
    {
      path: "/services",
      kind: "redirect",
      expectedStatuses: [301, 308],
      expectedPath: "/prices",
      source: "legacy services hub",
    },
  ];

  const categoryPaths = pagePaths.filter((path) => /^\/prices\/[^/]+$/.test(path));
  const servicePaths = pagePaths.filter((path) => /^\/prices\/[^/]+\/[^/]+$/.test(path));

  for (const categoryPath of categoryPaths) {
    expectations.push({
      path: categoryPath.replace("/prices/", "/services/"),
      kind: "redirect",
      expectedStatuses: [301, 308],
      expectedPath: categoryPath,
      source: "legacy category redirect",
    });
  }

  for (const servicePath of servicePaths) {
    const [, , category, service] = servicePath.split("/");

    expectations.push({
      path: servicePath.replace("/prices/", "/services/"),
      kind: "redirect",
      expectedStatuses: [301, 308],
      expectedPath: servicePath,
      source: "legacy service redirect",
    });

    expectations.push({
      path: `/prices/${service}`,
      kind: "redirect",
      expectedStatuses: [301, 308],
      expectedPath: `/prices/${category}/${service}`,
      source: "flat service redirect",
    });
  }

  for (const [source, destination] of ROOT_REDIRECTS) {
    expectations.push({
      path: source,
      kind: "redirect",
      expectedStatuses: [301, 308],
      expectedPath: destination,
      source: "root redirect",
    });
  }

  const sampleLocationPath = pagePaths.find((path) => /^\/locations\/hartbeespoort$/.test(path))
    ? "hartbeespoort"
    : (pagePaths.find((path) => /^\/locations\/[^/]+$/.test(path)) || "/locations").split("/")[2];

  for (const [staleSlug, redirect] of Object.entries(LEGACY_STALE_REDIRECTS)) {
    expectations.push({
      path: `/prices/${redirect.categoryId}/${staleSlug}`,
      kind: "redirect",
      expectedStatuses: [301, 308],
      expectedPath: redirect.serviceSlug
        ? `/prices/${redirect.categoryId}/${redirect.serviceSlug}`
        : `/prices/${redirect.categoryId}`,
      source: "stale category-service redirect",
    });

    expectations.push({
      path: `/locations/${sampleLocationPath}/${staleSlug}`,
      kind: "redirect",
      expectedStatuses: [307, 308],
      expectedPath: redirect.serviceSlug
        ? `/locations/${sampleLocationPath}/${redirect.serviceSlug}`
        : `/prices/${redirect.categoryId}`,
      source: "stale location-service redirect",
    });
  }

  return dedupeExpectations(expectations);
}

async function runWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function consume() {
    while (true) {
      const currentIndex = index;
      index += 1;

      if (currentIndex >= items.length) {
        return;
      }

      results[currentIndex] = await worker(items[currentIndex]);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => consume());
  await Promise.all(workers);
  return results;
}

async function auditPageRoute(baseUrl, path) {
  const response = await fetchUrl(`${baseUrl}${path}`);
  const locationHeader = response.headers.get("location");
  const locationPath = locationHeader ? toPath(locationHeader) : null;
  const ok = response.status === 200;

  return {
    path,
    source: "sitemap",
    status: response.status,
    locationPath,
    ok,
    message: ok
      ? null
      : `Expected 200 from sitemap URL but got ${response.status}${locationPath ? ` -> ${locationPath}` : ""}`,
  };
}

async function auditRedirectRoute(baseUrl, expectation) {
  const response = await fetchUrl(`${baseUrl}${expectation.path}`);
  const locationHeader = response.headers.get("location");
  const locationPath = locationHeader ? toPath(locationHeader) : null;
  const ok = expectation.expectedStatuses.includes(response.status) && locationPath === expectation.expectedPath;

  return {
    path: expectation.path,
    source: expectation.source,
    status: response.status,
    locationPath,
    ok,
    message: ok
      ? null
      : `Expected ${expectation.expectedStatuses.join("/")} -> ${expectation.expectedPath}, got ${response.status}${locationPath ? ` -> ${locationPath}` : ""}`,
  };
}

function printFailures(label, failures) {
  if (failures.length === 0) {
    return;
  }

  console.log(`\n${label}`);
  for (const failure of failures) {
    console.log(`- ${failure.path} [${failure.source}] ${failure.message}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!options) {
    return;
  }

  console.log(`Auditing routes against ${options.baseUrl}`);

  const sitemapPagePaths = await getSitemapPagePaths(options.baseUrl);
  const auditedPagePaths =
    typeof options.limit === "number" ? sitemapPagePaths.slice(0, options.limit) : sitemapPagePaths;

  console.log(
    `Checking ${auditedPagePaths.length} sitemap URLs${options.limit ? ` (limited from ${sitemapPagePaths.length})` : ""}.`,
  );

  const pageResults = await runWithConcurrency(auditedPagePaths, options.concurrency, (path) =>
    auditPageRoute(options.baseUrl, path),
  );

  const redirectExpectations = options.includeRedirects ? buildRedirectExpectations(sitemapPagePaths) : [];

  if (redirectExpectations.length > 0) {
    console.log(`Checking ${redirectExpectations.length} redirect expectations.`);
  }

  const redirectResults = await runWithConcurrency(redirectExpectations, options.concurrency, (expectation) =>
    auditRedirectRoute(options.baseUrl, expectation),
  );

  const pageFailures = pageResults.filter((result) => !result.ok);
  const redirectFailures = redirectResults.filter((result) => !result.ok);
  const totalFailures = pageFailures.length + redirectFailures.length;

  printFailures("Page Failures", pageFailures);
  printFailures("Redirect Failures", redirectFailures);

  console.log("\nSummary");
  console.log(`- Sitemap URLs checked: ${pageResults.length}`);
  console.log(`- Redirect checks: ${redirectResults.length}`);
  console.log(`- Failures: ${totalFailures}`);

  if (totalFailures > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Route audit failed: ${message}`);
  process.exit(1);
});
