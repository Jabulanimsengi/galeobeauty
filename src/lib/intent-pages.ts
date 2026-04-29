import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCachedSEOServices } from "./seo-data";
import { serviceCategories } from "./services-data";

export interface IntentFaq {
    question: string;
    answer: string;
}

export interface IntentLink {
    label: string;
    href: string;
    description: string;
}

export interface IntentPageSpec {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    eyebrow: string;
    heroDescription: string;
    heroImage: string;
    heroImageAlt: string;
    primaryKeywords: string[];
    supportingKeywords: string[];
    symptoms: string[];
    results: string[];
    comparisons: string[];
    objections: string[];
    audiences: string[];
    whyItHappens: string;
    treatmentApproach: string;
    bestFor: string[];
    faqs: IntentFaq[];
    categoryIds: string[];
    serviceSlugs: string[];
    published?: boolean;
    noindex?: boolean;
    qualityStatus?: "draft" | "review" | "approved";
    intentType?: "problem" | "educational" | "transactional" | "comparison";
    content: string; // Dynamic markdown string
}

const PLACEHOLDER_SLUG_PATTERN = /^aesthetics-authority-topic-\d+$/;
const DRAFT_CONTENT_MARKERS = ["(Please add your article content here)"];
const LEGACY_INTENT_HREF_REWRITES: Record<string, string> = {
    "/services/skin": "/services/dermalogica",
    "/services/skin/": "/services/dermalogica",
    "/services/skin/acne-solutions": "/services/dermalogica/skin-clearing-facial",
    "/services/skin/chemical-peel": "/services/dermalogica/pro-power-peel",
    "/services/skin/chemical-peels": "/services/dermalogica/pro-power-peel",
    "/services/skin/facial-proskin": "/services/dermalogica/pro-skin-60",
    "/services/skin/ipl-laser": "/services/dermalogica/pro-clear",
    "/services/skin/microneedling": "/services/dermalogica/pro-microneedling",
};

function buildServiceLinks(serviceSlugs: string[]): IntentLink[] {
    const services = getCachedSEOServices();

    return serviceSlugs
        .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service))
        .map((service) => ({
            label: service.keyword,
            href: `/services/${service.categoryId}/${service.slug}`,
            description: `${service.price}${service.duration ? ` | ${service.duration}` : ""}`,
        }));
}

export const INTENT_PAGE_REDIRECTS: Record<string, string> = {
    "lip-filler-hartbeespoort": "/services/hart-aesthetics",
    "ipl-hair-removal-hartbeespoort": "/services/ipl",
    "lash-extensions-hartbeespoort": "/services/lashes-brows",
    "hair-salon-hartbeespoort": "/services/hair",
    "nail-salon-hartbeespoort": "/services/nails",
    "event-makeup-hartbeespoort": "/services/makeup",
    "permanent-makeup-brows-hartbeespoort": "/services/permanent-makeup",
    "qms-facial-hartbeespoort": "/services/qms",
    "spray-tan-hartbeespoort": "/services/sunbed",
    "waxing-hair-removal-hartbeespoort": "/services/waxing",
    "massage-hartbeespoort": "/services/massages",
    "hair-extensions-hartbeespoort": "/services/hair-extensions",
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/intent-pages");
let _allIntentPages: IntentPageSpec[] | null = null;
let _publishedIntentPages: IntentPageSpec[] | null = null;
let _intentPagesByCategory: Map<string, IntentPageSpec[]> | null = null;
let _intentPagesByService: Map<string, IntentPageSpec[]> | null = null;

export const GUIDE_CATEGORY_SLUGS = serviceCategories.map((category) => category.id);

function hasDraftContentMarkers(content: string): boolean {
    return DRAFT_CONTENT_MARKERS.some((marker) => content.includes(marker));
}

export function isIntentPageIndexable(page: IntentPageSpec): boolean {
    if (INTENT_PAGE_REDIRECTS[page.slug]) {
        return false;
    }

    if (page.published === false || page.noindex === true || page.qualityStatus === "draft") {
        return false;
    }

    if (PLACEHOLDER_SLUG_PATTERN.test(page.slug)) {
        return false;
    }

    if (hasDraftContentMarkers(page.content)) {
        return false;
    }

    return true;
}

export function canonicalizeIntentPageHref(href: string): string {
    if (!href) {
        return href;
    }

    const absolutePrefix = "https://www.galeobeauty.com";
    const normalizedHref = href.startsWith(absolutePrefix) ? href.slice(absolutePrefix.length) : href;

    return LEGACY_INTENT_HREF_REWRITES[normalizedHref] ?? normalizedHref;
}

export function getAllIntentPages(): IntentPageSpec[] {
    if (!_allIntentPages) {
        const files = fs.readdirSync(CONTENT_DIR);
        _allIntentPages = files
            .filter((file) => file.endsWith(".mdx"))
            .map((file) => {
                const rawContent = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
                const { data, content } = matter(rawContent);

                return {
                    ...(data as Omit<IntentPageSpec, "content">),
                    content,
                };
            });
    }

    return _allIntentPages;
}

export function getPublishedIntentPages(): IntentPageSpec[] {
    if (!_publishedIntentPages) {
        _publishedIntentPages = getAllIntentPages().filter(isIntentPageIndexable);
    }

    return _publishedIntentPages;
}

export function getIntentPageBySlug(slug: string): IntentPageSpec | undefined {
    try {
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(rawContent);

        return {
            ...(data as Omit<IntentPageSpec, "content">),
            content,
        };
    } catch {
        return undefined; // Returns undefined if the file doesn't exist
    }
}

export function getIntentPageRedirectPath(slug: string): string | undefined {
    return INTENT_PAGE_REDIRECTS[slug];
}

export function getIntentPageServiceLinks(page: IntentPageSpec): IntentLink[] {
    return buildServiceLinks(page.serviceSlugs);
}

export function getIntentPagesForCategory(categoryId: string): IntentPageSpec[] {
    if (!_intentPagesByCategory) {
        _intentPagesByCategory = new Map<string, IntentPageSpec[]>();

        for (const page of getPublishedIntentPages()) {
            for (const id of page.categoryIds) {
                const existing = _intentPagesByCategory.get(id);
                if (existing) {
                    existing.push(page);
                } else {
                    _intentPagesByCategory.set(id, [page]);
                }
            }
        }
    }

    return _intentPagesByCategory.get(categoryId) ?? [];
}

export function getGuideCategoryLabel(categoryId: string): string {
    return serviceCategories.find((category) => category.id === categoryId)?.title ?? categoryId;
}

export function getPrimaryGuideCategoryId(page: IntentPageSpec): string {
    const categoryId = page.categoryIds.find((id) => GUIDE_CATEGORY_SLUGS.includes(id));
    return categoryId ?? "beauty-guides";
}

export function getGuideCategorySummaries() {
    return GUIDE_CATEGORY_SLUGS
        .map((categoryId) => {
            const category = serviceCategories.find((item) => item.id === categoryId);
            const guides = getIntentPagesForCategory(categoryId);

            return {
                id: categoryId,
                title: category?.title ?? categoryId,
                description: category?.subtitle ?? "Treatment guides and beauty advice from Galeo Beauty.",
                count: guides.length,
                guides,
            };
        })
        .filter((category) => category.count > 0);
}

export function getIntentPagesForGuideCategory(categoryId: string): IntentPageSpec[] {
    return getIntentPagesForCategory(categoryId).sort((left, right) => left.title.localeCompare(right.title));
}

export function getIntentPagesForService(serviceSlug: string): IntentPageSpec[] {
    if (!_intentPagesByService) {
        _intentPagesByService = new Map<string, IntentPageSpec[]>();

        for (const page of getPublishedIntentPages()) {
            for (const slug of page.serviceSlugs) {
                const existing = _intentPagesByService.get(slug);
                if (existing) {
                    existing.push(page);
                } else {
                    _intentPagesByService.set(slug, [page]);
                }
            }
        }
    }

    return _intentPagesByService.get(serviceSlug) ?? [];
}

export function getIntentPagesForServices(serviceSlugs: string[], limit = 6): IntentPageSpec[] {
    const seen = new Set<string>();
    const pages: IntentPageSpec[] = [];

    for (const serviceSlug of serviceSlugs) {
        for (const page of getIntentPagesForService(serviceSlug)) {
            if (seen.has(page.slug)) {
                continue;
            }

            seen.add(page.slug);
            pages.push(page);

            if (pages.length >= limit) {
                return pages;
            }
        }
    }

    return pages;
}

export function getRelatedIntentPages(page: IntentPageSpec, limit = 6): IntentPageSpec[] {
    const candidates = getPublishedIntentPages()
        .filter((candidate) => candidate.slug !== page.slug)
        .map((candidate) => {
            const sharedCategories = candidate.categoryIds.filter((id) => page.categoryIds.includes(id)).length;
            const sharedServices = candidate.serviceSlugs.filter((slug) => page.serviceSlugs.includes(slug)).length;
            const sharedKeywords = candidate.primaryKeywords.filter((keyword) => page.primaryKeywords.includes(keyword)).length;

            return {
                page: candidate,
                score: sharedServices * 4 + sharedCategories * 3 + sharedKeywords,
            };
        })
        .filter((candidate) => candidate.score > 0)
        .sort((left, right) => right.score - left.score || left.page.title.localeCompare(right.page.title));

    return candidates.slice(0, limit).map((candidate) => candidate.page);
}
