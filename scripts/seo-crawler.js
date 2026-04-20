const fs = require("fs/promises");
const path = require("path");
const { load } = require("cheerio");

const HELP_TEXT = `
Usage:
  npm run check:links -- --base-url http://127.0.0.1:3000
  npm run check:links -- --mode status --base-url https://www.galeobeauty.com
  npm run check:status -- --base-url https://www.galeobeauty.com
  npm run check:links:deep -- --base-url https://www.galeobeauty.com

Options:
  --base-url <url>        Base URL to validate against. Default: http://127.0.0.1:3000
  --mode <type>           status or links. Default: links
  --concurrency <n>       Max simultaneous fetches. Default: 12
  --limit <n>             Limit initial sitemap source pages
  --timeout-ms <n>        Per-request timeout in milliseconds. Default: 15000
  --report <path>         CSV output path. Default: seo-report.csv
  --crawl-discovered      Recursively crawl newly discovered internal HTML pages
  --help                  Show this help text
`;

const PRODUCTION_HOSTS = new Set(["www.galeobeauty.com", "galeobeauty.com"]);
const SKIP_PROTOCOLS = ["mailto:", "tel:", "javascript:", "data:"];
const SKIP_PATH_PREFIXES = ["/_next/", "/api/"];
const SKIP_FILE_EXTENSIONS = /\.(?:css|js|mjs|cjs|map|json|xml|txt|png|jpe?g|webp|avif|gif|svg|ico|pdf|zip|mp4|webm|mp3|wav|woff2?|ttf|eot)$/i;

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

  const baseUrl = normalizeBaseUrl(getValue("--base-url") || process.env.BASE_URL || "http://127.0.0.1:3000");
  const mode = (getValue("--mode") || "links").toLowerCase();
  const concurrency = Number.parseInt(getValue("--concurrency") || "12", 10);
  const limit = getValue("--limit");
  const timeoutMs = Number.parseInt(getValue("--timeout-ms") || "15000", 10);
  const reportPath = getValue("--report") || "seo-report.csv";

  return {
    baseUrl,
    mode: mode === "status" ? "status" : "links",
    concurrency: Number.isFinite(concurrency) && concurrency > 0 ? concurrency : 12,
    limit: limit ? Number.parseInt(limit, 10) : null,
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 15000,
    reportPath,
    crawlDiscovered: argv.includes("--crawl-discovered"),
  };
}

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
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

function toCsvField(value) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function buildCsv(rows) {
  const header = [
    "issue_type",
    "source_page",
    "target_url",
    "normalized_target",
    "status",
    "final_url",
    "anchor_text",
    "error",
  ];

  const lines = [
    header.map(toCsvField).join(","),
    ...rows.map((row) =>
      [
        row.issueType,
        row.sourcePage,
        row.targetUrl,
        row.normalizedTarget,
        row.status,
        row.finalUrl,
        row.anchorText,
        row.error,
      ]
        .map(toCsvField)
        .join(","),
    ),
  ];

  return `${lines.join("\n")}\n`;
}

function isSkippableHref(href) {
  if (!href) {
    return true;
  }

  const trimmed = href.trim();
  if (!trimmed || trimmed === "#" || trimmed.startsWith("#")) {
    return true;
  }

  return SKIP_PROTOCOLS.some((protocol) => trimmed.toLowerCase().startsWith(protocol));
}

function normalizeInternalUrl(href, sourceUrl, baseUrl) {
  if (isSkippableHref(href)) {
    return null;
  }

  let resolved;

  try {
    resolved = new URL(href, sourceUrl);
  } catch {
    return null;
  }

  if (!PRODUCTION_HOSTS.has(resolved.hostname) && resolved.origin !== new URL(baseUrl).origin) {
    return null;
  }

  resolved.hash = "";
  const localBase = new URL(baseUrl);
  localBase.pathname = resolved.pathname;
  localBase.search = resolved.search;
  localBase.hash = "";

  return localBase.toString();
}

function isLikelyHtmlPage(urlString) {
  try {
    const url = new URL(urlString);
    if (SKIP_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return false;
    }

    if (SKIP_FILE_EXTENSIONS.test(url.pathname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

class FetchLimiter {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.active = 0;
    this.waiters = [];
  }

  async run(task) {
    if (this.active >= this.maxConcurrency) {
      await new Promise((resolve) => {
        this.waiters.push(resolve);
      });
    }

    this.active += 1;

    try {
      return await task();
    } finally {
      this.active -= 1;
      const next = this.waiters.shift();
      if (next) {
        next();
      }
    }
  }
}

class AsyncQueue {
  constructor() {
    this.items = [];
    this.waiters = [];
    this.closed = false;
  }

  push(item) {
    if (this.closed) {
      return;
    }

    const waiter = this.waiters.shift();
    if (waiter) {
      waiter({ value: item, done: false });
      return;
    }

    this.items.push(item);
  }

  close() {
    this.closed = true;
    while (this.waiters.length > 0) {
      const waiter = this.waiters.shift();
      waiter({ done: true });
    }
  }

  async next() {
    if (this.items.length > 0) {
      return { value: this.items.shift(), done: false };
    }

    if (this.closed) {
      return { done: true };
    }

    return new Promise((resolve) => {
      this.waiters.push(resolve);
    });
  }
}

async function fetchWithFallback(url, options, limiter, timeoutMs) {
  const request = async (method) =>
    limiter.run(async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          method,
          redirect: "follow",
          signal: controller.signal,
          headers: {
            "user-agent": "galeo-seo-crawler/1.0",
            accept: options.accept,
          },
        });

        return response;
      } finally {
        clearTimeout(timeout);
      }
    });

  const initial = await request(options.method);

  if (options.method === "HEAD" && (initial.status === 405 || initial.status === 501)) {
    return request("GET");
  }

  return initial;
}

async function readSitemapFile(filePath) {
  return fs.readFile(filePath, "utf8");
}

function mapIndexedUrlToLocal(rawUrl, baseUrl) {
  const base = new URL(baseUrl);

  try {
    const parsed = new URL(rawUrl);
    base.pathname = parsed.pathname;
    base.search = parsed.search;
    base.hash = "";
    return base.toString();
  } catch {
    base.pathname = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    base.search = "";
    base.hash = "";
    return base.toString();
  }
}

async function loadSeedUrls(repoRoot, baseUrl) {
  const publicDir = path.join(repoRoot, "public");
  const rootSitemapPath = path.join(publicDir, "sitemap.xml");
  const rootXml = await readSitemapFile(rootSitemapPath);
  const rootLocs = extractLocsFromXml(rootXml);

  const seedUrls = new Set();

  for (const loc of rootLocs) {
    const pathname = new URL(loc).pathname;

    if (!pathname.endsWith(".xml")) {
      seedUrls.add(mapIndexedUrlToLocal(loc, baseUrl));
      continue;
    }

    const nestedPath = path.join(publicDir, pathname.replace(/^\/+/, ""));
    const nestedXml = await readSitemapFile(nestedPath);
    const nestedLocs = extractLocsFromXml(nestedXml);

    for (const nestedLoc of nestedLocs) {
      seedUrls.add(mapIndexedUrlToLocal(nestedLoc, baseUrl));
    }
  }

  return Array.from(seedUrls);
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

      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => consume());
  await Promise.all(workers);
  return results;
}

async function runStatusMode(seedUrls, options, limiter, reportPath) {
  const issues = [];
  let processed = 0;
  let failures = 0;

  console.log(
    `Checking ${seedUrls.length.toLocaleString()} indexed pages against ${options.baseUrl} in fast status mode with fetch concurrency ${options.concurrency}.`,
  );

  const results = await runWithConcurrency(seedUrls, options.concurrency, async (targetUrl) => {
    try {
      const response = await fetchWithFallback(
        targetUrl,
        { method: "HEAD", accept: "*/*" },
        limiter,
        options.timeoutMs,
      );

      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        finalUrl: response.url || targetUrl,
      };
    } catch (error) {
      failures += 1;
      return {
        ok: false,
        status: "ERR",
        finalUrl: "",
        error: error instanceof Error ? error.message : String(error),
      };
    } finally {
      processed += 1;
      if (processed % 100 === 0) {
        console.log(`Checked ${processed.toLocaleString()} indexed pages | failures ${failures.toLocaleString()}`);
      }
    }
  });

  for (let index = 0; index < seedUrls.length; index += 1) {
    const targetUrl = seedUrls[index];
    const result = results[index];

    if (!result.ok) {
      if (result.status !== "ERR") {
        failures += 1;
      }
      issues.push({
        issueType: "page_status",
        sourcePage: "[sitemap]",
        targetUrl,
        normalizedTarget: targetUrl,
        status: result.status,
        finalUrl: result.finalUrl,
        anchorText: "",
        error: result.error || "",
      });
    }
  }

  await fs.writeFile(reportPath, buildCsv(issues), "utf8");

  console.log("\nSummary");
  console.log(`- Indexed pages checked: ${seedUrls.length.toLocaleString()}`);
  console.log(`- Failures: ${issues.length.toLocaleString()}`);
  console.log(`- CSV report: ${reportPath}`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!options) {
    return;
  }

  const repoRoot = path.resolve(__dirname, "..");
  const reportPath = path.resolve(repoRoot, options.reportPath);
  const limiter = new FetchLimiter(options.concurrency);

  const allSeedUrls = await loadSeedUrls(repoRoot, options.baseUrl);
  const seedUrls =
    typeof options.limit === "number" && options.limit > 0
      ? allSeedUrls.slice(0, options.limit)
      : allSeedUrls;

  if (options.mode === "status") {
    await runStatusMode(seedUrls, options, limiter, reportPath);
    return;
  }

  const sourceQueue = new AsyncQueue();
  const queuedSourceUrls = new Set();
  const validatedTargets = new Map();
  const issueKeys = new Set();
  const issues = [];
  const summary = {
    indexedPages: allSeedUrls.length,
    seededPages: seedUrls.length,
    crawledPages: 0,
    discoveredPages: 0,
    validatedTargets: 0,
    okTargets: 0,
    redirectedTargets: 0,
    brokenPages: 0,
    brokenLinks: 0,
  };

  let pendingSourcePages = 0;
  let nextProgressLog = 100;

  function addIssue(issue) {
    const key = [
      issue.issueType,
      issue.sourcePage || "",
      issue.normalizedTarget || issue.targetUrl || "",
      issue.status || "",
      issue.error || "",
    ].join("|");

    if (issueKeys.has(key)) {
      return;
    }

    issueKeys.add(key);
    issues.push(issue);
  }

  function maybeLogProgress() {
    if (summary.crawledPages < nextProgressLog) {
      return;
    }

    console.log(
      `Processed ${summary.crawledPages.toLocaleString()} source pages | validated ${summary.validatedTargets.toLocaleString()} targets | issues ${issues.length.toLocaleString()}`,
    );
    nextProgressLog += 100;
  }

  function enqueueSource(url, discoveredFrom) {
    if (!isLikelyHtmlPage(url) || queuedSourceUrls.has(url)) {
      return false;
    }

    queuedSourceUrls.add(url);
    pendingSourcePages += 1;

    if (discoveredFrom) {
      summary.discoveredPages += 1;
    }

    sourceQueue.push(url);
    return true;
  }

  function finishSourcePage() {
    pendingSourcePages -= 1;
    summary.crawledPages += 1;
    maybeLogProgress();

    if (pendingSourcePages === 0) {
      sourceQueue.close();
    }
  }

  async function validateTarget(targetUrl, sourcePage, anchorText) {
    if (!validatedTargets.has(targetUrl)) {
      const promise = (async () => {
        try {
          const response = await fetchWithFallback(
            targetUrl,
            { method: "HEAD", accept: "*/*" },
            limiter,
            options.timeoutMs,
          );
          const finalUrl = response.url || targetUrl;
          const ok = response.status >= 200 && response.status < 300;

          summary.validatedTargets += 1;

          if (ok) {
            summary.okTargets += 1;
          } else if (response.redirected) {
            summary.redirectedTargets += 1;
          }

          return {
            ok,
            status: response.status,
            finalUrl,
            redirected: response.redirected,
          };
        } catch (error) {
          summary.validatedTargets += 1;
          return {
            ok: false,
            status: "ERR",
            finalUrl: "",
            redirected: false,
            error: error instanceof Error ? error.message : String(error),
          };
        }
      })();

      validatedTargets.set(targetUrl, promise);
    }

    const result = await validatedTargets.get(targetUrl);

    if (!result.ok) {
      summary.brokenLinks += 1;
      addIssue({
        issueType: "broken_link",
        sourcePage,
        targetUrl,
        normalizedTarget: targetUrl,
        status: result.status,
        finalUrl: result.finalUrl,
        anchorText,
        error: result.error || "",
      });
    } else if (result.redirected) {
      summary.redirectedTargets += 1;
    }

    return result;
  }

  async function processSourcePage(sourceUrl) {
    let response;

    try {
      response = await fetchWithFallback(
        sourceUrl,
        { method: "GET", accept: "text/html,application/xhtml+xml,*/*" },
        limiter,
        options.timeoutMs,
      );
    } catch (error) {
      summary.brokenPages += 1;
      addIssue({
        issueType: "page_status",
        sourcePage: "[sitemap]",
        targetUrl: sourceUrl,
        normalizedTarget: sourceUrl,
        status: "ERR",
        finalUrl: "",
        anchorText: "",
        error: error instanceof Error ? error.message : String(error),
      });
      return;
    }

    if (!(response.status >= 200 && response.status < 300)) {
      summary.brokenPages += 1;
      addIssue({
        issueType: "page_status",
        sourcePage: "[sitemap]",
        targetUrl: sourceUrl,
        normalizedTarget: sourceUrl,
        status: response.status,
        finalUrl: response.url || sourceUrl,
        anchorText: "",
        error: "",
      });
      return;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return;
    }

    const html = await response.text();
    const $ = load(html);
    const pageLinks = new Map();

    $("a[href]").each((_, element) => {
      const href = $(element).attr("href");
      const normalizedTarget = normalizeInternalUrl(href, sourceUrl, options.baseUrl);

      if (!normalizedTarget) {
        return;
      }

      if (!pageLinks.has(normalizedTarget)) {
        pageLinks.set(normalizedTarget, ($(element).text() || "").trim().replace(/\s+/g, " ").slice(0, 160));
      }
    });

    const validations = [];

    for (const [targetUrl, anchorText] of pageLinks.entries()) {
      validations.push(validateTarget(targetUrl, sourceUrl, anchorText));

      if (options.crawlDiscovered) {
        enqueueSource(targetUrl, sourceUrl);
      }
    }

    await Promise.all(validations);
  }

  for (const seedUrl of seedUrls) {
    enqueueSource(seedUrl, null);
  }

  if (pendingSourcePages === 0) {
    sourceQueue.close();
  }

  const pageWorkerCount = Math.max(1, Math.min(6, options.concurrency));
  const workers = Array.from({ length: pageWorkerCount }, async () => {
    while (true) {
      const { value, done } = await sourceQueue.next();

      if (done) {
        return;
      }

      try {
        await processSourcePage(value);
      } finally {
        finishSourcePage();
      }
    }
  });

  console.log(
    `Checking ${seedUrls.length.toLocaleString()} indexed pages against ${options.baseUrl} in link mode with fetch concurrency ${options.concurrency}.`,
  );
  if (options.crawlDiscovered) {
    console.log("Discovered internal HTML pages will be added to the crawl queue.");
  }

  await Promise.all(workers);

  await fs.writeFile(reportPath, buildCsv(issues), "utf8");

  console.log("\nSummary");
  console.log(`- Indexed pages in sitemap: ${summary.indexedPages.toLocaleString()}`);
  console.log(`- Seed pages checked: ${summary.seededPages.toLocaleString()}`);
  console.log(`- Source pages crawled: ${summary.crawledPages.toLocaleString()}`);
  console.log(`- Discovered pages added: ${summary.discoveredPages.toLocaleString()}`);
  console.log(`- Unique internal targets validated: ${summary.validatedTargets.toLocaleString()}`);
  console.log(`- Broken pages: ${summary.brokenPages.toLocaleString()}`);
  console.log(`- Broken internal links: ${summary.brokenLinks.toLocaleString()}`);
  console.log(`- CSV report: ${reportPath}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`SEO crawl failed: ${message}`);
  process.exit(1);
});
