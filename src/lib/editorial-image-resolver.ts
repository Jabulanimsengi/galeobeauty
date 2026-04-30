import { getGalleryImages, type GalleryItem } from "./gallery-utils";
import { getCachedSEOServices } from "./seo-data";
import { getCategoryById } from "./services-data";
import type { ServiceItem } from "./services-content";

type EditorialImageInput = {
    title: string;
    description?: string;
    categoryIds: string[];
    serviceSlugs?: string[];
    fallbackImage: string;
    fallbackAlt: string;
};

type ServiceEditorialImageInput = {
    categoryId: string;
    categoryTitle: string;
    subcategoryTitle?: string;
    serviceSlug: string;
    item: ServiceItem;
    fallbackImage: string;
    fallbackAlt: string;
};

type EditorialImage = {
    image: string;
    imageAlt: string;
};

type Candidate = GalleryItem & {
    folderId: string;
    normalizedText: string;
    tokens: Set<string>;
};

const STOPWORDS = new Set([
    "a",
    "and",
    "at",
    "beauty",
    "before",
    "close",
    "closeup",
    "for",
    "galeo",
    "guide",
    "hartbeespoort",
    "in",
    "near",
    "of",
    "professional",
    "results",
    "salon",
    "service",
    "session",
    "the",
    "to",
    "treatment",
    "with",
]);

const CATEGORY_FOLDERS: Record<string, string[]> = {
    "fat-freezing": ["body-contouring"],
    slimming: ["body-contouring"],
    dermalogica: ["facials"],
    qms: ["facials"],
    ipl: ["laser-ipl"],
    hair: ["hair", "salon"],
    nails: ["nails"],
    "lashes-brows": ["lashes-brows"],
    "permanent-makeup": ["permanent-makeup", "lashes-brows"],
    waxing: ["laser-ipl"],
};

const STRICT_CATEGORY_FOLDERS = new Set(["nails"]);

const CATEGORY_FALLBACKS: Record<string, EditorialImage> = {
    "fat-freezing": {
        image: "/images/gallery/body-contouring/fat-freezing-cryolipolysis-abdomen-treatment.jpg",
        imageAlt: "Fat freezing body contouring treatment at Galeo Beauty",
    },
    slimming: {
        image: "/images/gallery/body-contouring/emsculpt-neo-abdomen-body-contouring-device.jpg",
        imageAlt: "Body sculpting treatment at Galeo Beauty",
    },
    dermalogica: {
        image: "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
        imageAlt: "Professional skin facial treatment at Galeo Beauty",
    },
    qms: {
        image: "/images/gallery/facials/facial-treatment-room-steamer-dermalogica-products.jpg",
        imageAlt: "Facial treatment room and skincare products at Galeo Beauty",
    },
    ipl: {
        image: "/images/gallery/laser-ipl/ipl-laser-hair-removal-treatment-dandi-meyer.jpg",
        imageAlt: "IPL hair removal treatment at Galeo Beauty",
    },
    hair: {
        image: "/images/gallery/hair/blowdry-styling-session-two-stylists-salon.jpg",
        imageAlt: "Hair styling session at Galeo Beauty",
    },
    nails: {
        image: "/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
        imageAlt: "Gel nails at Galeo Beauty",
    },
    "lashes-brows": {
        image: "/images/gallery/lashes-brows/professional-eyelash-extension-process.jpg",
        imageAlt: "Professional lash extension process at Galeo Beauty",
    },
    "permanent-makeup": {
        image: "/images/gallery/permanent-makeup/permanent-eyeliner-healed-results-galeo-beauty.jpg",
        imageAlt: "Permanent makeup results at Galeo Beauty",
    },
    waxing: {
        image: "/images/gallery/laser-ipl/ipl-laser-hair-removal-legs-purple-light.jpg",
        imageAlt: "Hair removal treatment at Galeo Beauty",
    },
};

const TOKEN_EQUIVALENTS: Record<string, string[]> = {
    acne: ["skin", "facial"],
    anti: ["skin", "facial"],
    balayage: ["hair", "blowdry", "styling"],
    brow: ["brows", "eyebrow", "eyebrows"],
    brows: ["brow", "eyebrow", "eyebrows"],
    facial: ["skin"],
    fat: ["freezing", "body", "contouring"],
    gel: ["nails"],
    hair: ["blowdry", "styling"],
    hybrid: ["lashes", "brows"],
    ipl: ["laser", "removal"],
    lash: ["lashes", "eyelash"],
    lashes: ["lash", "eyelash"],
    lip: ["lips", "blush"],
    massage: ["spa", "wellness"],
    microblading: ["brows", "eyebrow"],
    nail: ["nails", "gel"],
    nails: ["nail", "gel"],
    peel: ["skin", "facial"],
    powder: ["brows", "ombre"],
    skin: ["facial"],
    waxing: ["hair", "removal"],
};

const PHRASE_RULES: Array<{ source: RegExp; candidate: RegExp; score: number }> = [
    { source: /\bfat freezing|cryolipolysis|body contouring|belly|love handles?\b/, candidate: /\bfat freezing|cryolipolysis|body sculpting|body contouring|abdomen\b/, score: 28 },
    { source: /\bipl|laser|hair removal|underarm|legs?\b/, candidate: /\bipl|laser hair removal|underarm|legs?\b/, score: 28 },
    { source: /\bmicroblading|phibrows|hair stroke\b/, candidate: /\bmicroblading|phibrows|hair stroke\b/, score: 28 },
    { source: /\bpowder|ombre|hybrid brows?\b/, candidate: /\bpowder|ombre|hybrid brows?\b/, score: 26 },
    { source: /\blip|lips|blush\b/, candidate: /\blip blush|nano lip|lip colour|lip color\b/, score: 28 },
    { source: /\beyeliner|eye liner\b/, candidate: /\beyeliner|eye liner\b/, score: 28 },
    { source: /\blash lift|lash lamination\b/, candidate: /\blash lift|lamination\b/, score: 24 },
    { source: /\bclassic|hybrid|volume|lash|lashes|eyelash\b/, candidate: /\bclassic|hybrid|volume|wispy|lash|lashes|eyelash\b/, score: 22 },
    { source: /\bbrow lamination|brow shape|brow wax|brow tint\b/, candidate: /\bbrow lamination|eyebrow shaping|brow\b/, score: 20 },
    { source: /\bfrench|gel|acrylic|pedicure|manicure|nail\b/, candidate: /\bfrench|gel nails|nails|nail art\b/, score: 24 },
    { source: /\bfacial|skin|acne|pigment|melasma|microneedling|peel|glow|wrinkle|aging|ageing\b/, candidate: /\bfacial|skin|dermalogica|products\b/, score: 20 },
    { source: /\bhair|balayage|blow|keratin|brazilian|colour|color|frizz|scalp\b/, candidate: /\bhair|blowdry|blowout|styling|curls\b/, score: 22 },
];

let cachedCandidates: Candidate[] | null = null;

function normalizeText(value: string): string {
    return value
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function tokenize(value: string): string[] {
    return normalizeText(value)
        .split(" ")
        .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function getCandidates(): Candidate[] {
    if (cachedCandidates) {
        return cachedCandidates;
    }

    cachedCandidates = getGalleryImages()
        .filter((item) => !item.src.includes("/specials/"))
        .map((item) => {
            const parts = item.src.split("/");
            const folderId = parts[parts.length - 2] ?? "";
            const filename = parts[parts.length - 1] ?? "";
            const normalizedText = normalizeText(`${item.title} ${item.alt} ${folderId} ${filename}`);

            return {
                ...item,
                folderId,
                normalizedText,
                tokens: new Set(tokenize(normalizedText)),
            };
        });

    return cachedCandidates;
}

function buildWeightedTerms(values: string[]) {
    const terms = new Map<string, number>();

    values.forEach((value, index) => {
        const weight = Math.max(2, 8 - index);
        for (const token of tokenize(value)) {
            terms.set(token, (terms.get(token) ?? 0) + weight);
            for (const equivalent of TOKEN_EQUIVALENTS[token] ?? []) {
                terms.set(equivalent, (terms.get(equivalent) ?? 0) + Math.max(1, weight - 2));
            }
        }
    });

    return terms;
}

function getPreferredFolders(categoryIds: string[]) {
    return Array.from(
        new Set(categoryIds.flatMap((categoryId) => CATEGORY_FOLDERS[categoryId] ?? []))
    );
}

function getCategoryFallback(categoryIds: string[], fallback: EditorialImage): EditorialImage {
    for (const categoryId of categoryIds) {
        const categoryFallback = CATEGORY_FALLBACKS[categoryId];
        if (categoryFallback) {
            return categoryFallback;
        }
    }

    return fallback;
}

function scoreCandidate(candidate: Candidate, sourceText: string, weightedTerms: Map<string, number>, preferredFolders: string[]) {
    let score = 0;
    let matched = false;
    const folderIndex = preferredFolders.indexOf(candidate.folderId);

    if (folderIndex !== -1) {
        score += Math.max(8, 16 - folderIndex * 3);
        matched = true;
    }

    for (const token of candidate.tokens) {
        const weight = weightedTerms.get(token);
        if (weight) {
            score += weight;
            matched = true;
        }
    }

    for (const rule of PHRASE_RULES) {
        if (rule.source.test(sourceText) && rule.candidate.test(candidate.normalizedText)) {
            score += rule.score;
            matched = true;
        }
    }

    return matched ? score : 0;
}

function resolveFromGallery(input: EditorialImageInput): EditorialImage {
    const services = getCachedSEOServices().filter((service) =>
        input.serviceSlugs?.includes(service.slug)
    );
    const categories = input.categoryIds
        .map((categoryId) => getCategoryById(categoryId))
        .filter((category): category is NonNullable<typeof category> => Boolean(category));
    const sourceValues = [
        input.title,
        input.description ?? "",
        ...services.flatMap((service) => [
            service.keyword,
            service.description ?? "",
            ...(service.seoKeywords ?? []),
        ]),
        ...categories.map((category) => `${category.title} ${category.subtitle}`),
    ];
    const sourceText = normalizeText(sourceValues.join(" "));
    const weightedTerms = buildWeightedTerms(sourceValues);
    const preferredFolders = getPreferredFolders(input.categoryIds);
    const fallback = getCategoryFallback(input.categoryIds, {
        image: input.fallbackImage,
        imageAlt: input.fallbackAlt,
    });

    let bestCandidate: Candidate | null = null;
    let bestScore = 0;

    const candidates = STRICT_CATEGORY_FOLDERS.has(input.categoryIds[0] ?? "")
        ? getCandidates().filter((candidate) => preferredFolders.includes(candidate.folderId))
        : getCandidates();

    for (const candidate of candidates) {
        const score = scoreCandidate(candidate, sourceText, weightedTerms, preferredFolders);
        if (score > bestScore) {
            bestCandidate = candidate;
            bestScore = score;
        }
    }

    if (!bestCandidate || bestScore < 18) {
        return fallback;
    }

    return {
        image: bestCandidate.src,
        imageAlt: `${input.title} at Galeo Beauty - ${bestCandidate.title}`,
    };
}

export function resolveIntentPageHeroImage(input: EditorialImageInput): EditorialImage {
    return resolveFromGallery(input);
}

export function resolveCategoryHeroImage({
    categoryId,
    categoryTitle,
    categorySubtitle,
    fallbackImage,
}: {
    categoryId: string;
    categoryTitle: string;
    categorySubtitle: string;
    fallbackImage: string;
}): EditorialImage {
    return resolveFromGallery({
        title: categoryTitle,
        description: categorySubtitle,
        categoryIds: [categoryId],
        fallbackImage,
        fallbackAlt: `${categoryTitle} treatments at Galeo Beauty`,
    });
}

export function resolveServicePageHeroImage(input: ServiceEditorialImageInput): EditorialImage {
    return resolveFromGallery({
        title: input.item.name,
        description: `${input.item.description ?? ""} ${input.categoryTitle} ${input.subcategoryTitle ?? ""}`,
        categoryIds: [input.categoryId],
        serviceSlugs: [input.serviceSlug],
        fallbackImage: input.fallbackImage,
        fallbackAlt: input.fallbackAlt,
    });
}
