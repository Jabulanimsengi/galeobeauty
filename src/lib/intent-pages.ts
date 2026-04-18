import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllSEOServices } from "./seo-data";

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
    "/prices/skin": "/prices/dermalogica",
    "/prices/skin/": "/prices/dermalogica",
    "/prices/skin/acne-solutions": "/prices/dermalogica/skin-clearing-facial",
    "/prices/skin/chemical-peel": "/prices/dermalogica/pro-power-peel",
    "/prices/skin/chemical-peels": "/prices/dermalogica/pro-power-peel",
    "/prices/skin/facial-proskin": "/prices/dermalogica/pro-skin-60",
    "/prices/skin/ipl-laser": "/prices/dermalogica/pro-clear",
    "/prices/skin/microneedling": "/prices/dermalogica/pro-microneedling",
};

function buildServiceLinks(serviceSlugs: string[]): IntentLink[] {
    const services = getAllSEOServices();

    return serviceSlugs
        .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service))
        .map((service) => ({
            label: service.keyword,
            href: `/prices/${service.categoryId}/${service.slug}`,
            description: `${service.price}${service.duration ? ` | ${service.duration}` : ""}`,
        }));
}

export const INTENT_PAGE_REDIRECTS: Record<string, string> = {
    "lip-filler-hartbeespoort": "/prices/hart-aesthetics",
    "ipl-hair-removal-hartbeespoort": "/prices/ipl",
    "lash-extensions-hartbeespoort": "/prices/lashes-brows",
    "hair-salon-hartbeespoort": "/prices/hair",
    "nail-salon-hartbeespoort": "/prices/nails",
    "event-makeup-hartbeespoort": "/prices/makeup",
    "permanent-makeup-brows-hartbeespoort": "/prices/permanent-makeup",
    "qms-facial-hartbeespoort": "/prices/qms",
    "spray-tan-hartbeespoort": "/prices/sunbed",
    "waxing-hair-removal-hartbeespoort": "/prices/waxing",
    "massage-hartbeespoort": "/prices/massages",
    "hair-extensions-hartbeespoort": "/prices/hair-extensions",
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/intent-pages");

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
    const files = fs.readdirSync(CONTENT_DIR);
    return files
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

export function getPublishedIntentPages(): IntentPageSpec[] {
    return getAllIntentPages().filter(isIntentPageIndexable);
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
    return getPublishedIntentPages().filter((page) => page.categoryIds.includes(categoryId));
}

export function getIntentPagesForService(serviceSlug: string): IntentPageSpec[] {
    return getPublishedIntentPages().filter((page) => page.serviceSlugs.includes(serviceSlug));
}
