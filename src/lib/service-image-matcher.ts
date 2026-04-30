import { getGalleryImages, type GalleryItem } from "./gallery-utils";
import type { ServiceItem } from "./services-content";

interface ServiceImageMatchInput {
    categoryId: string;
    categoryTitle: string;
    categoryImage: string;
    subcategoryTitle: string;
    item: ServiceItem;
}

interface ServiceImageMatchResult {
    image: string;
    imageAlt: string;
    matchedFromGallery: boolean;
}

interface GalleryCandidate extends GalleryItem {
    folderId: string;
    normalizedText: string;
    tokens: Set<string>;
}

interface CategoryMatchConfig {
    preferredFolders: string[];
    minimumScore: number;
}

interface ServiceImageProfile {
    normalizedText: string;
    weightedTerms: Map<string, number>;
    distinctiveTerms: Set<string>;
    priorityPhrases: string[];
}

interface MatchRule {
    servicePattern: RegExp;
    candidatePattern: RegExp;
    score: number;
}

const DEFAULT_ALT_SUFFIX = "at Galeo Beauty in Hartbeespoort";

const STOPWORDS = new Set([
    "a",
    "all",
    "an",
    "and",
    "at",
    "beauty",
    "before",
    "client",
    "clients",
    "close",
    "closeup",
    "colour",
    "colours",
    "color",
    "colors",
    "day",
    "days",
    "defined",
    "detail",
    "extra",
    "ex",
    "for",
    "full",
    "galeo",
    "guide",
    "half",
    "hartbeespoort",
    "healed",
    "in",
    "long",
    "look",
    "looking",
    "medium",
    "natural",
    "of",
    "our",
    "per",
    "process",
    "professional",
    "promo",
    "results",
    "room",
    "salon",
    "service",
    "services",
    "session",
    "sessions",
    "short",
    "the",
    "treatment",
    "treatments",
    "up",
    "with",
    "working",
    "week",
    "weeks",
]);

const CATEGORY_MATCH_CONFIG: Record<string, CategoryMatchConfig> = {
    "fat-freezing": { preferredFolders: ["body-contouring"], minimumScore: 14 },
    dermalogica: { preferredFolders: ["facials"], minimumScore: 9 },
    qms: { preferredFolders: ["facials"], minimumScore: 9 },
    ipl: { preferredFolders: ["laser-ipl"], minimumScore: 12 },
    hair: { preferredFolders: ["hair"], minimumScore: 11 },
    nails: { preferredFolders: ["nails"], minimumScore: 10 },
    "lashes-brows": { preferredFolders: ["lashes-brows"], minimumScore: 12 },
    "permanent-makeup": { preferredFolders: ["permanent-makeup", "lashes-brows"], minimumScore: 12 },
};

const TOKEN_EQUIVALENTS: Record<string, string[]> = {
    brows: ["brow", "eyebrow", "eyebrows"],
    brow: ["brows", "eyebrow", "eyebrows"],
    eyelash: ["lash", "lashes", "eyelashes"],
    eyelashes: ["lash", "lashes", "eyelash"],
    lash: ["lashes", "eyelash", "eyelashes"],
    lashes: ["lash", "eyelash", "eyelashes"],
    french: ["tip"],
    gel: ["overlay"],
    hair: ["styling", "blowdry", "blowout", "curls"],
    hybrid: ["wispy", "mixed"],
    ipl: ["laser", "removal"],
    legs: ["leg"],
    leg: ["legs"],
    lip: ["blush", "lips"],
    lips: ["lip", "blush"],
    microblading: ["phibrows", "strokes", "stroke"],
    powder: ["ombre", "shaded"],
    volume: ["dramatic", "voluminous", "fluffy"],
};

const MATCH_RULES: MatchRule[] = [
    { servicePattern: /\bmicroblading|phibrows|hair strokes?\b/, candidatePattern: /\bmicroblading|phibrows|hair strokes?\b/, score: 24 },
    { servicePattern: /\bpowder\b|\bombre\b|\bhybrid brows?\b/, candidatePattern: /\bpowder\b|\bombre\b|\bhybrid brows?\b/, score: 22 },
    { servicePattern: /\blip\b/, candidatePattern: /\blip blush\b|\bnano lip\b|\blip colour\b|\blip color\b/, score: 24 },
    { servicePattern: /\beyeliner\b|\beye liner\b/, candidatePattern: /\beyeliner\b|\beye liner\b/, score: 24 },
    { servicePattern: /\bclassic lashes?\b/, candidatePattern: /\bclassic lash\b|\bnatural classic\b/, score: 20 },
    { servicePattern: /\bvolume|glamour lashes?\b/, candidatePattern: /\bvolume lash\b|\bdramatic\b|\bvoluminous\b|\bfull volume\b/, score: 20 },
    { servicePattern: /\bhybrid lashes?\b/, candidatePattern: /\bhybrid lashes?\b|\bwispy hybrid\b/, score: 20 },
    { servicePattern: /\blash lift|lash lamination\b/, candidatePattern: /\blash lift\b|\blamination\b/, score: 20 },
    { servicePattern: /\bbrow lamination\b/, candidatePattern: /\bbrow lamination\b|\bsleek brow\b|\bprepping eyebrows\b/, score: 20 },
    { servicePattern: /\bbrow tint|brow shaping|brow wax\b/, candidatePattern: /\beyebrow shaping\b|\bbrow\b/, score: 10 },
    { servicePattern: /\bfat freezing|cryolipolysis\b/, candidatePattern: /\bfat freezing\b|\bcryolipolysis\b/, score: 22 },
    { servicePattern: /\bemsculpt|tesla ems|body sculpt/i, candidatePattern: /\bemsculpt\b|\bbody sculpting\b/, score: 22 },
    { servicePattern: /\bacne|pro clear|skin clearing\b/, candidatePattern: /\bprofessional skin facial treatment in progress\b/, score: 18 },
    { servicePattern: /\bfacial|skin|peel|microneedling|dermaplaning|melano|pigment|age\b/, candidatePattern: /\bfacial\b|\bskin\b/, score: 12 },
    { servicePattern: /\bunderarm\b/, candidatePattern: /\bunderarm\b/, score: 16 },
    { servicePattern: /\bleg|legs\b/, candidatePattern: /\bleg|legs\b/, score: 16 },
    { servicePattern: /\bbikini|brazilian|hollywood|intimate\b/, candidatePattern: /\bipl laser hair removal treatment\b|\btreatment dandi meyer\b/, score: 10 },
    { servicePattern: /\bblow ?dry|blowout\b/, candidatePattern: /\bblowdry\b|\bblowout\b/, score: 18 },
    { servicePattern: /\bupdo|bridal hair|matric hair\b/, candidatePattern: /\bupdo\b/, score: 18 },
    { servicePattern: /\bfrench\b/, candidatePattern: /\bfrench tip\b/, score: 18 },
    { servicePattern: /\bnail art|designer nails?\b/, candidatePattern: /\bnail art\b/, score: 18 },
    { servicePattern: /\bgel\b/, candidatePattern: /\bgel nails?\b/, score: 12 },
];

let cachedGalleryCandidates: GalleryCandidate[] | null = null;

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

function addWeightedTokens(target: Map<string, number>, value: string, weight: number, distinctiveTerms: Set<string>) {
    for (const token of tokenize(value)) {
        const currentWeight = target.get(token) ?? 0;
        target.set(token, currentWeight + weight);

        if (token.length >= 4) {
            distinctiveTerms.add(token);
        }

        for (const equivalent of TOKEN_EQUIVALENTS[token] ?? []) {
            const synonymWeight = target.get(equivalent) ?? 0;
            target.set(equivalent, synonymWeight + Math.max(1, weight - 2));
        }
    }
}

function buildPriorityPhrases(values: string[]): string[] {
    return Array.from(
        new Set(
            values
                .map(normalizeText)
                .filter((value) => value.length >= 8 && value.split(" ").length >= 2)
        )
    );
}

function getGalleryCandidates(): GalleryCandidate[] {
    if (cachedGalleryCandidates) {
        return cachedGalleryCandidates;
    }

    cachedGalleryCandidates = getGalleryImages().map((item) => {
        const segments = item.src.split("/");
        const folderId = segments[segments.length - 2] ?? "";
        const filename = segments[segments.length - 1] ?? "";
        const normalizedText = normalizeText(`${item.title} ${item.alt} ${folderId} ${filename}`);

        return {
            ...item,
            folderId,
            normalizedText,
            tokens: new Set(tokenize(normalizedText)),
        };
    });

    return cachedGalleryCandidates;
}

function buildServiceProfile(input: ServiceImageMatchInput): ServiceImageProfile {
    const weightedTerms = new Map<string, number>();
    const distinctiveTerms = new Set<string>();
    const keywordText = input.item.seoKeywords?.join(" ") ?? "";
    const idText = input.item.id.replace(/-/g, " ");

    addWeightedTokens(weightedTerms, input.item.name, 7, distinctiveTerms);
    addWeightedTokens(weightedTerms, idText, 6, distinctiveTerms);
    addWeightedTokens(weightedTerms, input.subcategoryTitle, 4, distinctiveTerms);
    addWeightedTokens(weightedTerms, keywordText, 3, distinctiveTerms);
    addWeightedTokens(weightedTerms, input.item.description ?? "", 2, distinctiveTerms);
    addWeightedTokens(weightedTerms, input.categoryTitle, 1, distinctiveTerms);

    return {
        normalizedText: normalizeText(`${input.item.name} ${idText} ${input.subcategoryTitle} ${keywordText} ${input.item.description ?? ""} ${input.categoryTitle}`),
        weightedTerms,
        distinctiveTerms,
        priorityPhrases: buildPriorityPhrases([
            input.item.name,
            idText,
            ...(input.item.seoKeywords ?? []).slice(0, 4),
        ]),
    };
}

function buildFallbackAlt(item: ServiceItem): string {
    return item.imageAlt ?? `${item.name} treatment ${DEFAULT_ALT_SUFFIX}`;
}

function scoreCandidate(candidate: GalleryCandidate, profile: ServiceImageProfile, config: CategoryMatchConfig) {
    let score = 0;
    let distinctiveMatchCount = 0;
    let ruleBonus = 0;

    const folderIndex = config.preferredFolders.indexOf(candidate.folderId);
    if (folderIndex !== -1) {
        score += Math.max(6, 10 - folderIndex * 2);
    }

    for (const token of candidate.tokens) {
        const weight = profile.weightedTerms.get(token);
        if (!weight) {
            continue;
        }

        score += weight;

        if (profile.distinctiveTerms.has(token)) {
            distinctiveMatchCount += 1;
        }
    }

    for (const phrase of profile.priorityPhrases) {
        if (candidate.normalizedText.includes(phrase)) {
            score += 10;
            ruleBonus += 10;
        }
    }

    for (const rule of MATCH_RULES) {
        if (rule.servicePattern.test(profile.normalizedText) && rule.candidatePattern.test(candidate.normalizedText)) {
            score += rule.score;
            ruleBonus += rule.score;
        }
    }

    return { score, distinctiveMatchCount, ruleBonus };
}

function buildMatchedAlt(item: ServiceItem, candidate: GalleryCandidate): string {
    return `${item.name} ${DEFAULT_ALT_SUFFIX} - ${candidate.title}`;
}

export function resolveServiceImageMatch(input: ServiceImageMatchInput): ServiceImageMatchResult {
    if (input.item.image) {
        return {
            image: input.item.image,
            imageAlt: buildFallbackAlt(input.item),
            matchedFromGallery: false,
        };
    }

    const config = CATEGORY_MATCH_CONFIG[input.categoryId];

    if (!config) {
        return {
            image: input.categoryImage,
            imageAlt: buildFallbackAlt(input.item),
            matchedFromGallery: false,
        };
    }

    const profile = buildServiceProfile(input);

    if (/\btattoo\b/.test(profile.normalizedText)) {
        return {
            image: input.categoryImage,
            imageAlt: buildFallbackAlt(input.item),
            matchedFromGallery: false,
        };
    }

    const candidates = input.categoryId === "nails"
        ? getGalleryCandidates().filter((candidate) => config.preferredFolders.includes(candidate.folderId))
        : getGalleryCandidates();

    let bestCandidate: GalleryCandidate | null = null;
    let bestScore = -1;
    let bestDistinctiveCount = 0;
    let bestRuleBonus = 0;

    for (const candidate of candidates) {
        const result = scoreCandidate(candidate, profile, config);

        if (
            result.score > bestScore ||
            (result.score === bestScore && result.ruleBonus > bestRuleBonus) ||
            (result.score === bestScore && result.ruleBonus === bestRuleBonus && result.distinctiveMatchCount > bestDistinctiveCount)
        ) {
            bestCandidate = candidate;
            bestScore = result.score;
            bestDistinctiveCount = result.distinctiveMatchCount;
            bestRuleBonus = result.ruleBonus;
        }
    }

    if (!bestCandidate || bestScore < config.minimumScore || (bestDistinctiveCount === 0 && bestRuleBonus === 0)) {
        return {
            image: input.categoryImage,
            imageAlt: buildFallbackAlt(input.item),
            matchedFromGallery: false,
        };
    }

    return {
        image: bestCandidate.src,
        imageAlt: buildMatchedAlt(input.item, bestCandidate),
        matchedFromGallery: true,
    };
}
