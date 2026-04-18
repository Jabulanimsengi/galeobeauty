export const COMMERCIAL_LOCATIONS = [
    { slug: "hartbeespoort", name: "Hartbeespoort" },
    { slug: "pretoria", name: "Pretoria" },
    { slug: "johannesburg", name: "Johannesburg" },
    { slug: "sandton", name: "Sandton" }
];

export const COMMERCIAL_MODIFIERS = [
    { slug: "best", label: "Best", intent: "premium" },
    { slug: "top-rated", label: "Top-Rated", intent: "premium" },
    { slug: "affordable", label: "Affordable", intent: "budget" },
    { slug: "cheap", label: "Cheap", intent: "budget" },
    { slug: "budget", label: "Budget", intent: "budget" }
];

// Mapping our system categories to commercial search terms
export const COMMERCIAL_CATEGORIES = [
    { slug: "salons", name: "Salons", systemCategoryIds: ["hair", "nails", "lashes-brows", "makeup"] },
    { slug: "hair-salons", name: "Hair Salons", systemCategoryIds: ["hair", "hair-extensions"] },
    { slug: "nail-salons", name: "Nail Salons", systemCategoryIds: ["nails"] },
    { slug: "lash-salons", name: "Lash Salons", systemCategoryIds: ["lashes-brows"] },
    { slug: "facial-clinics", name: "Facial Clinics", systemCategoryIds: ["dermalogica", "qms"] },
    { slug: "skin-clinics", name: "Skin Clinics", systemCategoryIds: ["hart-aesthetics", "medical", "dermalogica", "qms"] },
    { slug: "waxing-salons", name: "Waxing Salons", systemCategoryIds: ["waxing"] },
    { slug: "massage-spas", name: "Massage Spas", systemCategoryIds: ["massages"] },
];

export interface CommercialPageSpec {
    slug: string; // e.g. best-nail-salons-in-pretoria
    locationSlug: string;
    locationName: string;
    modifierSlug: string;
    modifierLabel: string;
    categorySlug: string;
    categoryName: string;
    targetSystemCategoryIds: string[];
    intent: "premium" | "budget";
}

// Keep doorway-style directory pages accessible for navigation while we rewrite them
// with unique local proof and intent-specific copy before re-enabling indexing.
const INDEXABLE_COMMERCIAL_PAGE_SLUGS = new Set<string>();

export function getAllCommercialPages(): CommercialPageSpec[] {
    const pages: CommercialPageSpec[] = [];

    for (const location of COMMERCIAL_LOCATIONS) {
        for (const modifier of COMMERCIAL_MODIFIERS) {
            for (const category of COMMERCIAL_CATEGORIES) {
                const slug = `${modifier.slug}-${category.slug}-in-${location.slug}`;
                pages.push({
                    slug,
                    locationSlug: location.slug,
                    locationName: location.name,
                    modifierSlug: modifier.slug,
                    modifierLabel: modifier.label,
                    categorySlug: category.slug,
                    categoryName: category.name,
                    targetSystemCategoryIds: category.systemCategoryIds,
                    intent: modifier.intent as "premium" | "budget",
                });
            }
        }
    }

    return pages;
}

export function getCommercialPageParams() {
    return getAllCommercialPages().map((page) => ({
        commercialSlug: page.slug,
    }));
}

export function getCommercialPageBySlug(slug: string): CommercialPageSpec | undefined {
    return getAllCommercialPages().find((page) => page.slug === slug);
}

export function isCommercialPageIndexable(page: CommercialPageSpec): boolean {
    return INDEXABLE_COMMERCIAL_PAGE_SLUGS.has(page.slug);
}

export function getIndexableCommercialPages(): CommercialPageSpec[] {
    return getAllCommercialPages().filter(isCommercialPageIndexable);
}
