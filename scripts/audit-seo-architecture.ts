import { getAllBlogPosts } from "../src/lib/blog-data";
import { getAllBespokeServicePages } from "../src/lib/bespoke-service-pages";
import {
    getAllIntentPages,
    getIntentPageRedirectPath,
    getPublishedGuidePages,
    INTENT_PAGE_REDIRECTS,
    isTransactionalIntentPage,
} from "../src/lib/intent-pages";
import {
    BASE_URL,
    getSitemapEntries,
    SITEMAP_MAX_URLS,
    type SitemapSection,
} from "../src/lib/sitemap-helpers";
import { SITEMAP_STATIC_PAGES } from "../src/lib/sitemap-static-pages";
import { calculateSitemapURLCounts } from "../src/lib/sitemap-utils";
import {
    getAllSEOServices,
    getCanonicalLocationSlug,
    getLocationBySlug,
    isIndexableLocationService,
} from "../src/lib/seo-data";
import { getCategoryById } from "../src/lib/services-data";

type AuditIssue = {
    area: string;
    message: string;
};

type RedirectExpectation = {
    source: string;
    destination: string;
};

const LOCATION_SERVICE_URL_LIMIT = 15000;

const REQUIRED_REDIRECTS: RedirectExpectation[] = [
    { source: "/prices", destination: "/services" },
    { source: "/hair-salon-hartbeespoort", destination: "/services/hair" },
    { source: "/nail-salon-hartbeespoort", destination: "/services/nails" },
    { source: "/massage-hartbeespoort", destination: "/services/massages" },
    { source: "/waxing-hair-removal-hartbeespoort", destination: "/services/waxing" },
    { source: "/lashes-and-brows-hartbeespoort", destination: "/services/lashes-brows" },
    { source: "/ipl-hair-removal-hartbeespoort", destination: "/services/ipl" },
    { source: "/microblading-hartbeespoort", destination: "/locations/hartbeespoort/microblading" },
    { source: "/lip-filler-hartbeespoort", destination: "/locations/hartbeespoort/lip-filler-1ml" },
    { source: "/fat-freezing-hartbeespoort", destination: "/services/fat-freezing" },
    { source: "/skin-treatments-hartbeespoort", destination: "/services/dermalogica" },
];

function parseArgs() {
    const args = process.argv.slice(2);
    const baseUrlIndex = args.findIndex((arg) => arg === "--base-url");
    const baseUrl = baseUrlIndex >= 0 ? args[baseUrlIndex + 1] : undefined;

    return {
        baseUrl: baseUrl?.replace(/\/$/, ""),
    };
}

async function runWithConcurrency<T>(
    items: T[],
    limit: number,
    worker: (item: T) => Promise<void>
) {
    let index = 0;

    async function runNext() {
        while (index < items.length) {
            const item = items[index];
            index += 1;
            await worker(item);
        }
    }

    await Promise.all(
        Array.from({ length: Math.min(limit, items.length) }, () => runNext())
    );
}

function addIssue(issues: AuditIssue[], area: string, message: string) {
    issues.push({ area, message });
}

function toPath(loc: string): string {
    return new URL(loc, BASE_URL).pathname;
}

function createSitemapPathSet(): Set<string> {
    const sections: SitemapSection[] = ["0", "1"];
    return new Set(sections.flatMap((section) => getSitemapEntries(section).map((entry) => toPath(entry.loc))));
}

function validateTargetPath(targetPath: string, issues: AuditIssue[]) {
    const services = getAllSEOServices();
    const serviceByCanonicalPath = new Map(
        services.map((service) => [`/services/${service.categoryId}/${service.slug}`, service])
    );
    const bespokeServicePaths = new Set(
        getAllBespokeServicePages().map((page) => `/services/${page.categoryId}/${page.slug}`)
    );
    const blogPostPaths = new Set(getAllBlogPosts().map((post) => `/blog/${post.slug}`));
    const staticPaths = new Set(SITEMAP_STATIC_PAGES.map((page) => page.path || "/"));

    if (targetPath === "/services" || targetPath === "/locations" || staticPaths.has(targetPath)) {
        return;
    }

    if (blogPostPaths.has(targetPath)) {
        return;
    }

    const serviceMatch = targetPath.match(/^\/services\/([^/]+)(?:\/([^/]+))?$/);
    if (serviceMatch) {
        const [, categoryId, serviceSlug] = serviceMatch;
        const category = getCategoryById(categoryId);

        if (!category) {
            addIssue(issues, "redirect-targets", `${targetPath} points to an unknown service category.`);
            return;
        }

        if (!serviceSlug) {
            return;
        }

        if (!serviceByCanonicalPath.has(targetPath) && !bespokeServicePaths.has(targetPath)) {
            addIssue(issues, "redirect-targets", `${targetPath} points to an unknown service detail page.`);
        }
        return;
    }

    const locationMatch = targetPath.match(/^\/locations\/([^/]+)(?:\/([^/]+))?$/);
    if (locationMatch) {
        const [, locationSlug, serviceSlug] = locationMatch;
        const location = getLocationBySlug(locationSlug);

        if (!location) {
            addIssue(issues, "redirect-targets", `${targetPath} points to an unknown location.`);
            return;
        }

        if (getCanonicalLocationSlug(locationSlug) !== locationSlug) {
            addIssue(issues, "redirect-targets", `${targetPath} points to a non-canonical location alias.`);
        }

        if (!serviceSlug) {
            return;
        }

        if (!services.some((service) => service.slug === serviceSlug)) {
            addIssue(issues, "redirect-targets", `${targetPath} points to an unknown location-service treatment.`);
            return;
        }

        if (!isIndexableLocationService(locationSlug, serviceSlug)) {
            addIssue(issues, "redirect-targets", `${targetPath} is not a selected indexable location-service page.`);
        }
        return;
    }

    addIssue(issues, "redirect-targets", `${targetPath} is not a recognized canonical target path.`);
}

function auditIntentRedirects(issues: AuditIssue[]) {
    const redirects = Object.entries(INTENT_PAGE_REDIRECTS);
    const redirectSources = new Set(redirects.map(([slug]) => slug));

    for (const [slug, target] of redirects) {
        if (getIntentPageRedirectPath(slug) !== target) {
            addIssue(issues, "intent-redirects", `/${slug} does not resolve to ${target}.`);
        }

        validateTargetPath(target, issues);
    }

    for (const page of getPublishedGuidePages()) {
        if (redirectSources.has(page.slug)) {
            addIssue(issues, "guides", `Redirected page /${page.slug} is still published as a guide.`);
        }

        if (isTransactionalIntentPage(page)) {
            addIssue(issues, "guides", `Transactional page /${page.slug} is still published as a guide.`);
        }
    }

    for (const page of getAllIntentPages()) {
        if (isTransactionalIntentPage(page) && !INTENT_PAGE_REDIRECTS[page.slug]) {
            addIssue(issues, "intent-redirects", `Transactional intent page /${page.slug} is missing a canonical redirect.`);
        }
    }
}

function auditSitemaps(issues: AuditIssue[]) {
    const counts = calculateSitemapURLCounts();
    const sitemapPaths = createSitemapPathSet();
    const locationServiceCount = counts.sitemap0.locationServicePages + counts.sitemap1.locationServicePages;

    if (counts.sitemap0.total > SITEMAP_MAX_URLS) {
        addIssue(issues, "sitemaps", `Sitemap 0 has ${counts.sitemap0.total} URLs, above the ${SITEMAP_MAX_URLS} limit.`);
    }

    if (counts.sitemap1.total > SITEMAP_MAX_URLS) {
        addIssue(issues, "sitemaps", `Sitemap 1 has ${counts.sitemap1.total} URLs, above the ${SITEMAP_MAX_URLS} limit.`);
    }

    if (locationServiceCount > LOCATION_SERVICE_URL_LIMIT) {
        addIssue(
            issues,
            "sitemaps",
            `Selected location-service URLs are ${locationServiceCount}, above the ${LOCATION_SERVICE_URL_LIMIT} architecture guardrail.`
        );
    }

    for (const slug of Object.keys(INTENT_PAGE_REDIRECTS)) {
        if (sitemapPaths.has(`/${slug}`)) {
            addIssue(issues, "sitemaps", `Redirected flat URL /${slug} is still in the sitemap.`);
        }
    }

    for (const page of getAllIntentPages()) {
        if (isTransactionalIntentPage(page) && sitemapPaths.has(`/${page.slug}`)) {
            addIssue(issues, "sitemaps", `Transactional flat URL /${page.slug} is still in the sitemap.`);
        }
    }

    for (const path of sitemapPaths) {
        const match = path.match(/^\/locations\/([^/]+)\/([^/]+)$/);
        if (!match) {
            continue;
        }

        const [, locationSlug, serviceSlug] = match;
        if (!isIndexableLocationService(locationSlug, serviceSlug)) {
            addIssue(issues, "sitemaps", `${path} is in the sitemap but is not selected for location-service indexing.`);
        }
    }

    const requiredCanonicalPaths = [
        "/services/hair",
        "/services/nails",
        "/services/massages",
        "/services/waxing",
        "/services/lashes-brows",
        "/services/ipl",
        "/services/permanent-makeup",
        "/services/hart-aesthetics",
        "/services/fat-freezing",
        "/services/dermalogica",
    ];

    for (const path of requiredCanonicalPaths) {
        if (!sitemapPaths.has(path)) {
            addIssue(issues, "sitemaps", `${path} is missing from the sitemap.`);
        }
    }
}

async function auditLiveRedirects(baseUrl: string, issues: AuditIssue[]) {
    const expectations = [
        ...REQUIRED_REDIRECTS,
        ...Object.entries(INTENT_PAGE_REDIRECTS).map(([slug, destination]) => ({
            source: `/${slug}`,
            destination,
        })),
    ];

    await runWithConcurrency(expectations, 8, async (expectation) => {
        let response: Response;

        try {
            response = await fetch(`${baseUrl}${expectation.source}`, {
                redirect: "manual",
                signal: AbortSignal.timeout(15000),
            });
        } catch (error) {
            addIssue(
                issues,
                "live-redirects",
                `${expectation.source} could not be checked: ${error instanceof Error ? error.message : String(error)}.`
            );
            return;
        }

        const location = response.headers.get("location");
        const statusOk = [301, 307, 308].includes(response.status);

        if (!statusOk) {
            addIssue(
                issues,
                "live-redirects",
                `${expectation.source} returned ${response.status}, expected a permanent redirect to ${expectation.destination}.`
            );
            return;
        }

        if (!location) {
            addIssue(issues, "live-redirects", `${expectation.source} redirected without a Location header.`);
            return;
        }

        const actualPath = new URL(location, baseUrl).pathname;
        if (actualPath !== expectation.destination) {
            addIssue(
                issues,
                "live-redirects",
                `${expectation.source} redirects to ${actualPath}, expected ${expectation.destination}.`
            );
        }
    });
}

async function main() {
    const { baseUrl } = parseArgs();
    const issues: AuditIssue[] = [];

    auditIntentRedirects(issues);
    auditSitemaps(issues);

    if (baseUrl) {
        await auditLiveRedirects(baseUrl, issues);
    }

    const counts = calculateSitemapURLCounts();
    const locationServiceCount = counts.sitemap0.locationServicePages + counts.sitemap1.locationServicePages;

    console.log("SEO architecture audit");
    console.log(`- Intent redirects: ${Object.keys(INTENT_PAGE_REDIRECTS).length}`);
    console.log(`- Guide-safe pages: ${getPublishedGuidePages().length}`);
    console.log(`- Location-service sitemap URLs: ${locationServiceCount}`);
    console.log(`- Grand total sitemap URLs: ${counts.grandTotal}`);
    console.log(`- Live redirects: ${baseUrl ? `checked against ${baseUrl}` : "skipped (pass --base-url)"}`);

    if (issues.length > 0) {
        console.error(`\nFound ${issues.length} SEO architecture issue(s):`);
        for (const issue of issues) {
            console.error(`- [${issue.area}] ${issue.message}`);
        }
        process.exit(1);
    }

    console.log("\nOK: SEO architecture redirects and sitemap rules are aligned.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
