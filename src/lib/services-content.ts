
// ============================================
// CENTRALIZED SERVICES CONTENT
// ============================================
// This file contains the pure data for services without UI dependencies (icons).
// It is safe to import in next.config.ts for redirects.

export interface ServiceItem {
    id: string;
    name: string;
    price: string;
    duration?: string;
    note?: string;
    description?: string;
    seoKeywords?: string[];
    image?: string;
    imageAlt?: string;
}

export interface ServiceSubcategory {
    id: string;
    title: string;
    items: ServiceItem[];
    note?: string;
}

export interface ServiceCategoryContent {
    id: string;
    title: string;
    subtitle: string;
    // Icon removed for pure data
    badge?: string;
    badgeVariant?: "medical" | "premium" | "safe";
    image: string;
    subcategories: ServiceSubcategory[];
}

function normalizeKeywordPhrase(value: string): string {
    return value
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/&/g, " and ")
        .replace(/[()/,+]/g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function dedupeKeywords(keywords: Array<string | undefined | null>): string[] {
    const seen = new Set<string>();

    return keywords.reduce<string[]>((acc, keyword) => {
        if (!keyword) {
            return acc;
        }

        const normalized = normalizeKeywordPhrase(keyword);

        if (!normalized || seen.has(normalized)) {
            return acc;
        }

        seen.add(normalized);
        acc.push(normalized);
        return acc;
    }, []);
}

function simplifyServiceName(name: string): string {
    const simplified = normalizeKeywordPhrase(name)
        .replace(/\b\d+\s*(ml|cm|g|kg|min|mins|minutes|minute|hr|hrs|hour|hours|cup|cups|piece|pieces|session|sessions|treatment|treatments)\b/g, " ")
        .replace(/\b(dark colours?|light|ombre|piano|all colours?)\b/g, " ")
        .replace(/\b(double drawn|remy human hair|european remy)\b/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return simplified || normalizeKeywordPhrase(name);
}

function collectAreaKeywords(text: string): string[] {
    const matches: string[] = [];

    const keywordSets = [
        { pattern: /\bdouble chin\b/, keywords: ["double chin treatment", "chin contouring"] },
        { pattern: /\blove handles?\b/, keywords: ["love handles treatment", "waist contouring"] },
        { pattern: /\bbelly|abdomen|stomach|lower belly\b/, keywords: ["stubborn belly fat treatment", "flatter stomach treatment"] },
        { pattern: /\binner thighs?|thighs?\b/, keywords: ["inner thigh slimming", "thigh contouring treatment"] },
        { pattern: /\bbra bulge|back fat\b/, keywords: ["bra bulge treatment", "back contouring"] },
        { pattern: /\bundereye|under eye|dark circles|tired eyes\b/, keywords: ["dark circles treatment", "tired eyes treatment"] },
        { pattern: /\bjawline|neck\b/, keywords: ["jawline definition", "neck tightening treatment"] },
        { pattern: /\bbikini|brazilian|hollywood|intimate\b/, keywords: ["intimate hair removal", "smooth bikini line"] },
        { pattern: /\blip\b/, keywords: ["lip enhancement", "lip shape definition"] },
        { pattern: /\bcheek\b/, keywords: ["cheek contouring", "mid face volume loss"] },
        { pattern: /\bback\b/, keywords: ["back tension relief", "upper back muscle relief"] },
        { pattern: /\bneck\b/, keywords: ["neck tension relief", "stiff neck relief"] },
        { pattern: /\bunderarm\b/, keywords: ["underarm hair removal", "smooth underarms"] },
        { pattern: /\bleg|full leg|half leg\b/, keywords: ["leg hair removal", "smooth legs"] },
        { pattern: /\blip|upper lip\b/, keywords: ["upper lip hair removal", "facial hair removal"] },
        { pattern: /\bchin\b/, keywords: ["chin hair removal", "facial hair reduction"] },
    ];

    for (const set of keywordSets) {
        if (set.pattern.test(text)) {
            matches.push(...set.keywords);
        }
    }

    return matches;
}

function buildAestheticsKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\blip\b/.test(text)) {
        return ["thin lips treatment", "natural lip enhancement", "lip shape definition", "lip filler without duck lips", "fuller lips"];
    }
    if (/\bcheek\b/.test(text)) {
        return ["cheek contouring", "mid face volume loss", "cheekbone definition", "facial balancing", "smile lines treatment"];
    }
    if (/\bundereye|under eye\b/.test(text)) {
        return ["dark circles treatment", "tired eyes treatment", "under eye hydration", "under eye rejuvenation", "under eye bags treatment"];
    }
    if (/\bnefertiti|jawline|neck\b/.test(text)) {
        return ["jawline definition", "turkey neck treatment", "lower face lift", "neck tightening treatment", "non surgical jawline contouring"];
    }
    if (/\btox|botox|wrinkle\b/.test(text)) {
        return ["wrinkle relaxers", "anti wrinkle injections", "preventative botox", "forehead lines treatment", "crows feet treatment"];
    }
    if (/\bcollagen biostimulator|biostimulator\b/.test(text)) {
        return ["collagen induction treatment", "skin tightening injections", "skin firmness treatment", "non surgical skin rejuvenation", "anti aging collagen support"];
    }

    return ["anti aging injections", "non surgical facelift", "facial rejuvenation", "volume restoration", "natural looking injectables"];
}

function buildBodyContouringKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);
    const areaKeywords = collectAreaKeywords(text);

    if (/\blemon bottle|fat dissolving|slimming injection\b/.test(text)) {
        return [...areaKeywords, "fat dissolving injections", "double chin treatment", "stubborn fat treatment", "non surgical lipolysis", "inch loss treatment"];
    }

    return [...areaKeywords, "body contouring", "non surgical fat reduction", "stubborn fat treatment", "coolsculpting alternative", "inch loss treatment"];
}

function buildMassageKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\bsports\b/.test(text)) {
        return ["sports recovery massage", "muscle recovery treatment", "deep muscle relief", "post workout recovery", "muscle tension relief"];
    }
    if (/\bdeep tissue\b/.test(text)) {
        return ["deep muscle relief", "muscle knots treatment", "back pain relief massage", "chronic tension relief", "tight shoulders relief"];
    }
    if (/\bhot stone\b/.test(text)) {
        return ["deep relaxation massage", "heat therapy massage", "stress relief massage", "muscle tension relief", "full body relaxation"];
    }
    if (/\baromatherapy\b/.test(text)) {
        return ["stress relief massage", "wellness massage", "calming body treatment", "relaxation therapy", "spa relaxation treatment"];
    }

    return ["stress relief massage", "full body relaxation", "muscle tension relief", "wellness massage", "back and neck relief"];
}

function buildSkincareKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\bacne|breakout|clear\b/.test(text)) {
        return ["acne treatment", "adult acne treatment", "breakout clearing facial", "clogged pores treatment", "blackhead removal"];
    }
    if (/\bmicroneedling\b/.test(text)) {
        return ["acne scar treatment", "collagen induction", "skin texture refinement", "scar revision treatment", "skin tightening facial"];
    }
    if (/\bpeel|melano|pigmentation\b/.test(text)) {
        return ["hyperpigmentation treatment", "dark spots treatment", "sun damage repair", "skin resurfacing facial", "uneven skin tone treatment"];
    }
    if (/\bdermaplaning\b/.test(text)) {
        return ["peach fuzz removal", "smoother skin treatment", "instant glow facial", "makeup prep facial", "brightening exfoliation"];
    }
    if (/\beye\b/.test(text)) {
        return ["dark circles treatment", "tired eyes treatment", "under eye refresh", "eye area rejuvenation", "fine lines treatment"];
    }
    if (/\bmultivitamin|glow|bright\b/.test(text)) {
        return ["dull skin treatment", "glowing skin facial", "skin brightening treatment", "radiance boost facial", "tired skin treatment"];
    }

    return ["glowing skin treatment", "dull skin facial", "skin texture refinement", "deep cleansing facial", "collagen support facial"];
}

function buildHairRemovalKeywords(item: ServiceItem, categoryId: string): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);
    const areaKeywords = collectAreaKeywords(text);

    if (/\btattoo\b/.test(text)) {
        return ["tattoo fading treatment", "unwanted tattoo removal", "laser tattoo removal alternative", "tattoo lightening", "multi session tattoo removal"];
    }

    if (categoryId === "waxing") {
        return [...areaKeywords, "smooth skin treatment", "intimate waxing", "full body waxing", "ingrown hair reduction", "mens grooming"];
    }

    return [...areaKeywords, "permanent hair reduction", "laser hair removal alternative", "ingrown hair treatment", "smooth skin treatment", "face and body hair removal"];
}

function buildLashAndBrowKeywords(item: ServiceItem, categoryId: string): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (categoryId === "permanent-makeup") {
        if (/\bmicroblading\b/.test(text)) {
            return ["eyebrow tattoo", "natural brow definition", "hair stroke brows", "semi permanent brows", "sparse brows treatment"];
        }
        if (/\bpowder|hybrid brows?\b/.test(text)) {
            return ["powder brows", "soft shaded brows", "brow tattoo", "smudge proof brows", "semi permanent brows"];
        }
        if (/\blip\b/.test(text)) {
            return ["lip blushing", "lip colour enhancement", "defined lip border", "smudge proof lip tint", "pale lips correction"];
        }
        return ["permanent makeup", "effortless mornings", "smudge proof makeup", "semi permanent beauty", "waterproof makeup look"];
    }

    if (/\bclassic\b/.test(text)) {
        return ["natural lash extensions", "classic lashes", "everyday lashes", "soft lash enhancement", "mascara effect lashes"];
    }
    if (/\bhybrid\b/.test(text)) {
        return ["hybrid lashes", "wispy lashes", "textured lash extensions", "soft glam lashes", "natural volume lashes"];
    }
    if (/\bvolume|glamour\b/.test(text)) {
        return ["volume lashes", "dramatic lash extensions", "full fluffy lashes", "cat eye lashes", "special occasion lashes"];
    }
    if (/\blash lift|lamination\b/.test(text)) {
        return ["natural lash lift", "low maintenance lashes", "lifted natural lashes", "lash curl treatment", "effortless mornings"];
    }
    if (/\bbrow\b/.test(text)) {
        return ["fuller brows", "defined brows", "brow shaping", "brow tinting", "brow grooming"];
    }

    return ["lash extensions", "natural lashes", "defined eyes", "effortless mornings", "custom lash styling"];
}

function buildHairKeywords(item: ServiceItem, categoryId: string): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (categoryId === "hair-extensions") {
        if (/\btape\b/.test(text)) {
            return ["tape in hair extensions", "invisible tape ins", "length and volume enhancement", "natural blend extensions", "hair extensions for fine hair"];
        }
        if (/\bclip\b/.test(text)) {
            return ["clip in hair extensions", "instant hair volume", "temporary hair length", "special occasion hair extensions", "easy fit extensions"];
        }
        if (/\bhalo\b/.test(text)) {
            return ["halo hair extensions", "no glue hair extensions", "instant volume hair", "easy wear extensions", "natural length enhancement"];
        }
        if (/\bponytail\b/.test(text)) {
            return ["ponytail hair extension", "instant ponytail volume", "longer fuller ponytail", "quick hair transformation", "occasion hair extension"];
        }
        if (/\bgenius|butterfly|weave|micro|u tip|keratin\b/.test(text)) {
            return ["remy human hair extensions", "professional hair extensions", "seamless hair extensions", "length and volume enhancement", "hair extensions for fine hair"];
        }
        return ["hair extensions", "remy human hair", "natural blend extensions", "length and volume enhancement", "colour match hair extensions"];
    }

    if (/\bbalayage|foils|highlights?\b/.test(text)) {
        return ["balayage hair", "lived in blonde", "brassy hair fix", "dimensional colour", "highlight maintenance"];
    }
    if (/\bcolour correction|toner|bleach\b/.test(text)) {
        return ["colour correction", "brassy hair fix", "tone correction", "blonde maintenance", "hair colour rescue"];
    }
    if (/\broot|grey\b/.test(text)) {
        return ["grey coverage", "root touch up", "regrowth colour", "fresh colour maintenance", "natural grey coverage"];
    }
    if (/\bbrazilian|keratin|smoothing\b/.test(text)) {
        return ["frizz control treatment", "keratin smoothing", "brazilian blowout treatment", "humidity proof hair", "smooth shiny hair"];
    }
    if (/\bcut|blow dry|trim\b/.test(text)) {
        return ["haircut and blow dry", "split end trim", "fresh salon finish", "healthy hair maintenance", "hair shape refresh"];
    }

    return ["hair repair treatment", "colour and styling", "healthy shiny hair", "frizz control", "salon hair transformation"];
}

function buildNailKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\bbiab|builder|rubber base\b/.test(text)) {
        return ["builder gel nails", "strong natural nails", "biab manicure", "chip free nails", "natural nail overlay"];
    }
    if (/\bacrylic\b/.test(text)) {
        return ["acrylic nails", "long lasting manicure", "full set nails", "strong nail extensions", "nail enhancements"];
    }
    if (/\bpedicure|heel\b/.test(text)) {
        return ["pedicure treatment", "dry cracked heels treatment", "callus removal", "soft feet treatment", "foot care pedicure"];
    }
    if (/\bgel\b/.test(text)) {
        return ["gel nails", "chip free manicure", "long lasting manicure", "glossy nail finish", "natural nail strength"];
    }

    return ["manicure", "nail art", "long lasting nails", "healthy cuticle care", "salon nail treatment"];
}

function buildMakeupKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\bbridal|wedding\b/.test(text)) {
        return ["bridal makeup", "wedding day makeup", "soft glam bridal makeup", "bridal makeup trial", "long lasting bridal makeup"];
    }
    if (/\bmatric|dance|event|evening\b/.test(text)) {
        return ["special occasion makeup", "matric dance makeup", "soft glam makeup", "evening makeup look", "photo ready makeup"];
    }

    return ["professional makeup", "long lasting makeup", "soft glam look", "event makeup artist", "camera ready makeup"];
}

function buildMedicalKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\bfractional laser\b/.test(text)) {
        return ["laser skin resurfacing", "acne scar resurfacing", "skin texture treatment", "collagen stimulation laser", "fine lines resurfacing"];
    }
    if (/\bplasmage\b/.test(text)) {
        return ["non surgical skin tightening", "eyelid lift alternative", "plasma lift treatment", "skin laxity treatment", "non surgical facelift"];
    }
    if (/\bvaginal\b/.test(text)) {
        return ["vaginal tightening treatment", "intimate wellness treatment", "women's intimate rejuvenation", "non surgical intimate treatment", "pelvic confidence treatment"];
    }
    if (/\biv\b/.test(text)) {
        return ["iv hydration drip", "energy boost drip", "wellness drip therapy", "recovery iv drip", "vitamin infusion"];
    }

    return ["advanced skin treatment", "medical aesthetics treatment", "non surgical rejuvenation", "clinical skin correction", "technology based beauty treatment"];
}

function buildTanKeywords(item: ServiceItem): string[] {
    const text = normalizeKeywordPhrase(`${item.name} ${item.description ?? ""}`);

    if (/\bspray\b/.test(text)) {
        return ["spray tan", "streak free tan", "bronzed glow", "bridal spray tan", "even tan finish"];
    }

    return ["sunbed tanning", "golden glow", "year round tan", "bronzed skin", "tanning treatment"];
}

function buildServiceSeoKeywords(categoryId: string, subcategoryTitle: string, item: ServiceItem): string[] {
    const serviceName = normalizeKeywordPhrase(item.name);
    const simplifiedName = simplifyServiceName(item.name);
    const subcategory = normalizeKeywordPhrase(subcategoryTitle);
    const descriptionText = normalizeKeywordPhrase(item.description ?? "");
    const areaKeywords = collectAreaKeywords(`${serviceName} ${descriptionText}`);

    let intentKeywords: string[] = [];

    switch (categoryId) {
        case "hart-aesthetics":
            intentKeywords = buildAestheticsKeywords(item);
            break;
        case "fat-freezing":
        case "slimming":
            intentKeywords = buildBodyContouringKeywords(item);
            break;
        case "massages":
            intentKeywords = buildMassageKeywords(item);
            break;
        case "dermalogica":
        case "qms":
            intentKeywords = buildSkincareKeywords(item);
            break;
        case "ipl":
        case "waxing":
            intentKeywords = buildHairRemovalKeywords(item, categoryId);
            break;
        case "lashes-brows":
        case "permanent-makeup":
            intentKeywords = buildLashAndBrowKeywords(item, categoryId);
            break;
        case "hair":
        case "hair-extensions":
            intentKeywords = buildHairKeywords(item, categoryId);
            break;
        case "nails":
            intentKeywords = buildNailKeywords(item);
            break;
        case "makeup":
            intentKeywords = buildMakeupKeywords(item);
            break;
        case "medical":
            intentKeywords = buildMedicalKeywords(item);
            break;
        case "sunbed":
            intentKeywords = buildTanKeywords(item);
            break;
        default:
            intentKeywords = [];
    }

    return dedupeKeywords([
        serviceName,
        simplifiedName !== serviceName ? simplifiedName : undefined,
        subcategory && !serviceName.includes(subcategory) ? `${subcategory} ${simplifiedName}` : undefined,
        ...areaKeywords,
        ...intentKeywords,
    ]).slice(0, 12);
}

function withGeneratedServiceKeywords(categories: ServiceCategoryContent[]): ServiceCategoryContent[] {
    return categories.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategory) => ({
            ...subcategory,
            items: subcategory.items.map((item) => {
                return {
                    ...item,
                    seoKeywords: buildServiceSeoKeywords(category.id, subcategory.title, item),
                };
            }),
        })),
    }));
}

// Service data stays focused on names, prices and descriptions.
// Intent-led SEO keywords are generated from the service attributes.
const rawServiceCategoriesContent: ServiceCategoryContent[] = [
    // ========================================
    // HART AESTHETICS (Injectables)
    // ========================================
    {
        id: "hart-aesthetics",
        title: "Hart Aesthetics Treatments",
        subtitle: "Injectables, Fillers & Lifts",
        image: "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "face-lifts",
                title: "Face Lifts & Rejuvenation",
                items: [
                    { id: "nefertiti-lift", name: "Nefertiti Lift", duration: "1hr", price: "R7,950.00", description: "Named after the Egyptian queen, this treatment uses targeted injections along the jawline and neck to lift and define, creating a sleeker, more youthful profile." },
                    { id: "liquid-facelift", name: "Non Surgical Liquid Face Lift", duration: "1hr", price: "R10,000.00", description: "A comprehensive rejuvenation combining dermal fillers and muscle relaxants to restore volume, smooth wrinkles, and lift sagging skin without surgery." },
                    { id: "collagen-biostimulator", name: "Collagen Biostimulator Injections 10ml", duration: "1hr", price: "R5,000.00", description: "Stimulates your skin's natural collagen production for gradual, long-lasting skin tightening and rejuvenation that looks completely natural." },
                ],
            },
            {
                id: "tox-treatment",
                title: "Tox Treatment",
                items: [
                    { id: "tox-per-unit", name: "Tox Per Unit", duration: "1hr", price: "R59.60", description: "Precision muscle relaxant injections that smooth fine lines and wrinkles. Units customized to your needs for natural-looking results." },
                ],
            },
            {
                id: "skin-boosters",
                title: "Under Eye Skin Boosters",
                items: [
                    { id: "undereye-2-treatments", name: "Under Eye Skin Booster Two Treatments", duration: "1hr", price: "R4,000.00", description: "Intensive hydration therapy for the delicate under-eye area. Two sessions of micro-injections to plump, brighten, and reduce dark circles." },
                    { id: "undereye-1-treatment", name: "Under Eye Skin Booster One Treatment", duration: "1hr", price: "R2,800.00", description: "Targeted hydration boost using hyaluronic acid micro-injections to refresh tired eyes and reduce the appearance of fine lines." },
                ],
            },
            {
                id: "dermal-fillers",
                title: "Dermal Fillers",
                items: [
                    { id: "cheek-fillers-2ml", name: "Dermal Cheek Fillers 2ml", duration: "1hr", price: "R6,000.00", description: "Restore youthful volume to mid-face with premium hyaluronic acid filler. Lifts cheekbones and smooths nasolabial folds for a refreshed appearance." },
                    { id: "cheek-fillers-1ml", name: "Dermal Cheek Fillers 1ml", duration: "1hr", price: "R3,500.00", description: "Subtle cheek enhancement using premium filler to add definition and lift. Perfect for maintaining or light enhancement." },
                    { id: "russian-lip-1ml", name: "Dermal Russian Lilp Fillers 1ml", duration: "1hr", price: "R3,000.00", description: "The sought-after Russian lip technique creates a flatter, more defined lip shape with height rather than projection for a structured, doll-like pout." },
                    { id: "lip-filler-1ml", name: "Lip Filler 1ml", duration: "1hr", price: "R2,800", description: "Enhance your natural lip shape with premium hyaluronic acid filler. Adds volume, definition, and hydration for beautifully plump, natural-looking lips." },
                    { id: "dermal-filler-1ml", name: "Dermal Filler 1ml", duration: "1hr", price: "R2,800.00", description: "Versatile hyaluronic acid filler for lines, contouring, or subtle volume restoration with a natural-looking finish." },
                ],
            },
        ],
    },
    // ========================================
    // FAT FREEZING
    // ========================================
    {
        id: "fat-freezing",
        title: "Fat Freezing & Body Contouring",
        subtitle: "Non-Invasive Fat Reduction",
        image: "/images/gallery/body-contouring/fat-freezing-red-light-body-contouring-treatment.jpg",
        subcategories: [
            {
                id: "cryolipolysis",
                title: "Cryolipolysis",
                items: [
                    { id: "fat-freezing-session", name: "Fat Freezing Per Session", duration: "1hr", price: "R799.20", description: "Freeze away stubborn fat permanently in just one session using cryolipolysis technology that targets and crystallises fat cells for gradual contouring." },
                    { id: "ems-single", name: "EMS Slimming Machine", duration: "1hr", price: "R2,345.55", description: "A muscle-stimulating contouring treatment that supports slimming and toning goals without downtime." },
                    { id: "fat-freezing-4-cups", name: "Fat Freezing (4 Cups)", duration: "45min", price: "R2,450", description: "Tackle multiple problem areas in one visit. Four applicator cups treat larger zones like the abdomen and flanks simultaneously — maximum results, minimum time. Ideal for a full body contouring session." },
                    { id: "fat-freezing-2-cups", name: "Fat Freezing (2 Cups)", duration: "45min", price: "R1,450", description: "Target two stubborn fat pockets at once. Perfect for love handles, inner thighs, or bra bulge. Walk in, relax for 45 minutes, and walk out — no recovery needed." },
                ],
            },
        ],
    },
    // ========================================
    // SLIMMING
    // ========================================
    {
        id: "slimming",
        title: "Slimming Treatments",
        subtitle: "Injections & Weight Loss",
        image: "/images/slimming/emsculpt-body-contouring-session.png",
        subcategories: [
            {
                id: "slimming-injections",
                title: "Injections",
                items: [
                    { id: "lemon-bottle-10ml", name: "Lemon Bottle (10ml)", duration: "30min", price: "R1,400", description: "The viral fat-dissolving injection that breaks down localised fat deposits with minimal discomfort. Lemon Bottle's advanced formula targets stubborn areas like double chins, arms, and abdomen — visible results within days." },
                    { id: "slimming-injection", name: "Slimming Injection", duration: "15min", price: "R300", description: "A quick, effective injection to support your weight loss journey. Boosts metabolism and assists in breaking down fat — the perfect complement to a healthy lifestyle for faster, more visible results." },
                ],
            },
        ],
    },
    // ========================================
    // MASSAGES
    // ========================================
    {
        id: "massages",
        title: "Massage Therapy",
        subtitle: "Relaxation & Deep Tissue",
        image: "/images/massages/deep-relaxation-neck-massage.jpg",
        subcategories: [
            {
                id: "body-massage",
                title: "Full Body",
                items: [
                    { id: "swedish-massage-60", name: "Swedish Massage", duration: "55min", price: "R753.04", description: "Long, flowing strokes that ease muscle tension and help you unwind." },
                    { id: "aromatherapy-60", name: "Aromatherapy Massage", duration: "55min", price: "R1,172.78", description: "A sensory massage using essential oils selected to support relaxation and wellbeing." },
                    { id: "hot-stone-60", name: "Hot Stone 60 Minuites Massage", duration: "55min", price: "R750.00", description: "Warm stones help melt away deeper muscle tension for a more immersive massage." },
                    { id: "deep-tissue-60", name: "60 Min Deep Tissue Bellabaci Massage", duration: "1hr", price: "R850.00", description: "A deeper-pressure massage aimed at stubborn knots, tightness, and chronic tension." },
                    { id: "sports-massage-60", name: "60 Min Sports Massage", duration: "1hr", price: "R950.00", description: "Designed for active bodies to reduce soreness, speed up recovery, and improve flexibility." },
                    { id: "back-neck-30", name: "Back And Neck Massage", duration: "30min", price: "R728.36", description: "A focused treatment for the upper back, shoulders, and neck where tension often builds most." },
                    { id: "back-neck-45", name: "Back & Neck Massage (45min)", duration: "45min", price: "R450", description: "Extra time to work through stubborn tension in your back, neck, and shoulders. The additional 15 minutes allows for deeper work on problem areas, leaving you genuinely relaxed and pain-free." },
                    { id: "full-body-massage", name: "Full Body Massage", duration: "1hr", price: "R1,172.78", description: "A head-to-toe massage designed for full-body relaxation and muscle relief." },
                    { id: "foot-massage", name: "Foot Massage", duration: "30min", price: "R666.63", description: "A focused foot massage to ease fatigue, tension, and everyday soreness." },
                    { id: "bellabaci-45", name: "45 Minutes Bellabaci Massage", duration: "45min", price: "R680.00", description: "A Bellabaci massage session designed for restorative tension release in a shorter window." },
                    { id: "full-body-exfoliation", name: "Full Body Exfoliation", duration: "1hr", price: "R699.00", description: "An exfoliating body treatment that removes dead skin and leaves your skin feeling smoother and refreshed." },
                    { id: "detox-cupping", name: "Bellabaci Detox Cupping Massage", duration: "1hr", price: "R950.00", description: "A Bellabaci cupping treatment that combines massage and suction to support circulation and detox-style bodywork." },
                    { id: "bellabaci-90", name: "90 Minutes Bellabaci Massage", duration: "1hr", price: "R1,400.00", description: "A longer Bellabaci massage for deeper, more comprehensive full-body work." },
                ],
            },
        ],
    },
    // ========================================
    // DERMALOGICA
    // ========================================
    {
        id: "dermalogica",
        title: "Dermalogica Treatments",
        subtitle: "Professional Facials & Peels",
        image: "/images/gallery/facials/facial-treatment-room-steamer-dermalogica-products.jpg",
        subcategories: [
            {
                id: "pro-skin",
                title: "Pro Skin Treatments",
                items: [
                    // New items from list
                    { id: "multivitamin-treatment", name: "Multivitamin Skin Treatment", duration: "45min", price: "R690.00", description: "A nutrient-rich boost for dull, tired skin. Vitamins A, C, and E work together to repair damage, improve elasticity, and restore a healthy glow." },
                    { id: "pro-dermaplaning-30", name: "Pro Dermaplaning 30 Min", duration: "30min", price: "R604.90", description: "Exfoliates and removes peach fuzz for instantly smoother, brighter skin. Enhances product absorption and creates a flawless base for makeup." },
                    { id: "neurosculpt-30", name: "Neurosculpt 30 Min", duration: "30min", price: "R650.00", description: "A targeted 30-minute treatment focusing on muscle relaxation and facial contouring to relieve tension and smooth fine lines." },

                    // Updated existing items
                    { id: "pro-skin-30", name: "Pro Skin 30", duration: "30min", price: "R450", description: "A precision 30-minute facial customised to your skin's exact needs. Dermalogica's expert mapping identifies your unique concerns and targets them directly — perfect for a quick but effective skin reset." }, // Updated to match "facial 30 min" price R450? Or keep old? List has "facial 30 min $450". I'll use that.
                    { id: "pro-skin-60", name: "Pro Skin Treatment", duration: "55min", price: "R1,098.70", description: "A fully customised Dermalogica treatment tailored to your skin's exact condition, combining deep cleansing, exfoliation, and professional-grade actives." }, // Matched to 'pro skin treatment' R950
                    { id: "pro-bright", name: "Pro Bright Skin Treatment", duration: "55min", price: "R1,100.00", description: "Targets dullness, sun damage, and uneven tone with Dermalogica's advanced brightening actives for a more radiant complexion." },
                    { id: "pro-firm", name: "Pro Firm Treatment", duration: "55min", price: "R1,100.00", description: "Lift, firm, and tighten ageing or lax skin with collagen-supportive actives that restore a more sculpted, youthful facial contour." }, // Updated to R1100
                    { id: "pro-clear", name: "Pro Clear", duration: "1hr", price: "R990", description: "The ultimate solution for breakout-prone and congested skin. Deep-cleans pores, reduces inflammation, and regulates oil production — leaving skin clearer, calmer, and less prone to future breakouts." },
                    { id: "pro-calm", name: "Pro Calm Skin Treatment", duration: "55min", price: "R1,100.00", description: "Designed for sensitive, reactive, or rosacea-prone skin. This ultra-gentle treatment soothes redness, reduces irritation, and strengthens the skin barrier." }, // Updated to R1100
                    { id: "eye-peel", name: "Infusion And Under Eye Peel", duration: "55min", price: "R1,350.00", description: "A targeted infusion and peel for the delicate eye area that helps soften puffiness, fine lines, and tired-looking skin." }, // Matched to "infusion and under eye peel $1,350"?

                    // More New Items
                    { id: "pro-dermaplaning-full", name: "Pro Dermaplaning Skin Treatment", duration: "55min", price: "R890.00", description: "A full Dermaplaning facial that combines deep exfoliation with Dermalogica professional serums and masques for smoother, brighter skin." },
                    { id: "neurosculpt-full", name: "Neurosculpt", duration: "55min", price: "R1,250.00", description: "Advanced structural facial massage and treatment that lifts, tones, and sculpts facial muscles for a non-surgical facelift effect." },
                    { id: "luminfusion", name: "Luminfusion", duration: "55min", price: "R1,100.00", description: "A high-tech glow treatment that combines exfoliation, nano-infusion, and light-based support for luminous skin." },
                    { id: "melanopro-peel", name: "Melanopro Peel", duration: "55min", price: "R6,999.00", description: "A comprehensive clinical peel system for hyperpigmentation that targets dark spots and uneven tone." },
                    { id: "hydraderm", name: "Hydraderm", duration: "55min", price: "R1,400.00", description: "Deep hydration and resurfacing that cleanses, extracts, and hydrates in one treatment." },
                    { id: "pro-microneedling", name: "Pro Microneedling", duration: "55min", price: "R1,950.00", description: "Professional microneedling to stimulate collagen, refine texture, and fade scars while enhancing absorption of active ingredients." },
                    { id: "nanoinfusion", name: "Nanoinfusion", duration: "55min", price: "R1,400.00", description: "Non-invasive transdermal serum delivery that resurfaces and infuses active ingredients for instant glow and plumpness without downtime." },
                    { id: "ultra-calming-facial", name: "Ultra Calming Facial", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "Targeted relief for sensitized skin that calms flare-ups and provides long-lasting comfort from redness and irritation." },
                    { id: "skin-clearing-facial", name: "Skin Clearing Facial", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "Deep cleansing and purification for adult acne and congestion to clear current breakouts and help prevent future ones." },
                    { id: "age-smart-facial", name: "Age Smart Facial", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "Revitalises mature skin and targets the visible signs of ageing like dullness and loss of elasticity." },
                    { id: "skin-brightening-facial", name: "Skin Brightening Facial", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "A brightening facial focused on dullness, uneven tone, and radiance." },
                    { id: "facial-30", name: "Facial 30 Min", duration: "1hr", price: "R555.52", note: "Save up to 10%", description: "A shorter facial for a quick refresh when your skin needs targeted attention." },
                    { id: "facial-60", name: "Facial 60 Min", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "A longer facial for a deeper reset, more treatment time, and a fuller glow-up." },
                    { id: "dermaplaning-pro", name: "Dermaplaning", duration: "1hr", price: "R1,080.00", note: "Save up to 10%", description: "A manual exfoliation treatment that removes peach fuzz and dead skin for a smoother finish." },
                    { id: "dermaplaning-maintenance", name: "Dermaplaning Maintenance", duration: "1hr", price: "R388.87", note: "Save up to 10%", description: "A lighter follow-up dermaplaning session to maintain smooth results between full treatments." },
                    { id: "microneedling-hands", name: "Micro Needling Hands", duration: "1hr", price: "R648.00", note: "Save up to 10%", description: "A collagen-stimulating treatment focused on texture and ageing concerns on the hands." },
                    { id: "microneedling", name: "Microneedling", duration: "1hr", price: "R1,866.56", note: "Save up to 10%", description: "A collagen induction treatment for texture, scarring, and skin rejuvenation." },
                    { id: "high-frequency-facial", name: "High Frequency Facial", duration: "1hr", price: "R720.00", note: "Save up to 10%", description: "A treatment that helps calm congestion and invigorate the skin with targeted high-frequency technology." },
                ],
            },
            {
                id: "peels",
                title: "Chemical Peels",
                items: [
                    { id: "pro-power-peel", name: "Pro Power Peel", duration: "55min", price: "R1,100.00", description: "Dermalogica's strongest peel, customised to your skin goals for dramatic resurfacing and renewal." },
                    { id: "power-peel-60", name: "Power Peel 60 Min", duration: "1hr", price: "R990.00", note: "Save up to 10%", description: "The full-strength resurfacing experience for texture, pigmentation, and cell renewal." },
                    { id: "power-peel-30", name: "Power Peel 30 Min", duration: "1hr", price: "R720.00", note: "Save up to 10%", description: "A rapid resurfacing treatment that removes dead skin and instantly refines texture." },
                ],
            },
        ],
    },
    // ========================================
    // IPL
    // ========================================
    {
        id: "ipl",
        title: "IPL Hair Removal",
        subtitle: "Intense Pulsed Light (IPL)",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpg",
        subcategories: [
            {
                id: "ipl-face",
                title: "Face",
                items: [
                    { id: "ipl-full-face", name: "Full Face IPL", duration: "1hr", price: "R1,166.60", note: "Save up to 10%", description: "Comprehensive facial IPL hair reduction covering the areas commonly affected by unwanted facial hair." },
                    { id: "ipl-full-face-neck", name: "Full Face And Neck IPL", duration: "1hr", price: "R945.00", note: "Save up to 10%", description: "Complete facial and neck hair reduction for a cleaner, more seamless finish." },
                    { id: "ipl-lip", name: "IPL Upper Lip Hair Removal", duration: "15min", price: "R270", description: "Say goodbye to upper lip hair for good. A quick 15-minute session that targets the hair follicle at the root for permanent reduction." },
                    { id: "ipl-chin", name: "IPL Chin Hair Removal", duration: "15min", price: "R270", description: "Permanently reduce stubborn chin hair with targeted IPL light energy. Quick, effective, and far more lasting than any temporary hair removal method." }, // Price inferred/kept? List doesn't have plain 'Chin'. It has 'beardline'. I'll keep it at R270 to match lip.
                    { id: "ipl-beardline", name: "Beardline IPL", duration: "1hr", price: "R611.08", note: "Save up to 10%", description: "Targeted IPL for shaping and maintaining a sharper beardline." },
                    { id: "ipl-neck", name: "Neck IPL", duration: "1hr", price: "R611.08", note: "Save up to 10%", description: "IPL hair reduction for unwanted neck hair and cleaner contours." },
                    { id: "ipl-neck-men", name: "Neck IPL Men", duration: "1hr", price: "R611.08", note: "Save up to 10%", description: "Tailored neck IPL for coarser male hair and shaving-related irritation." },
                ],
            },
            {
                id: "ipl-body",
                title: "Body",
                items: [
                    { id: "ipl-underarm", name: "Under Arm IPL", duration: "1hr", price: "R495.00", note: "Save up to 10%", description: "One of our most popular treatments for long-term underarm hair reduction." },
                    { id: "ipl-bikini-sides", name: "Bikin Sides IPL", duration: "1hr", price: "R666.63", note: "Save up to 10%", description: "Tidy the bikini line permanently with targeted IPL along the edges." },
                    { id: "ipl-brazilian", name: "Brazillian IPL", duration: "1hr", price: "R944.39", note: "Save up to 10%", description: "Permanent hair reduction across the Brazilian area with a small strip remaining." },
                    { id: "ipl-hollywood", name: "Hollywood IPL", duration: "1hr", price: "R1,222.15", note: "Save up to 10%", description: "Complete IPL hair reduction across the intimate area for a fully smooth finish." },
                    { id: "ipl-full-leg", name: "Full Leg IPL", duration: "1hr", price: "R2,555.41", note: "Save up to 10%", description: "Treat both full legs in one session for long-term smoothness from hip to ankle." },
                    { id: "ipl-half-leg", name: "Half Leg IPL", duration: "1hr", price: "R1,611.02", note: "Save up to 10%", description: "Target the lower or upper leg for focused permanent hair reduction." },
                    { id: "ipl-full-arm", name: "Full Arm IPL", duration: "1hr", price: "R1,666.57", note: "Save up to 10%", description: "Permanently reduce arm hair from shoulder to wrist." },
                    { id: "ipl-half-arm", name: "Half Arm IPL", duration: "1hr", price: "R944.39", note: "Save up to 10%", description: "Target the lower or upper arm for focused IPL hair reduction." },
                    { id: "ipl-back", name: "IPL Full Back Hair Removal", duration: "45min", price: "R1,200", description: "Permanently eliminate back hair with a comprehensive IPL treatment. Restore confidence and comfort." }, // Keep old price? List: none (has men back wax). Keep old.
                    { id: "ipl-buttocks", name: "Full Buttocks IPL", duration: "1hr", price: "R1,444.36", note: "Save up to 10%", description: "Remove unwanted hair from the buttocks for a smooth, confident finish." },
                    { id: "ipl-stomach", name: "Stomach IPL", duration: "1hr", price: "R944.39", note: "Save up to 10%", description: "Remove unwanted stomach hair with targeted IPL treatment." },
                    { id: "ipl-belly-button", name: "Belly Button IPL", duration: "1hr", price: "R555.52", note: "Save up to 10%", description: "Targeted IPL for the navel line or snail trail." },
                    { id: "ipl-toes-feet", name: "Toes And Feet IPL", duration: "1hr", price: "R555.52", note: "Save up to 10%", description: "Eliminate stray hairs on the toes and feet for a cleaner finish in open shoes." },
                    { id: "tattoo-removal", name: "Tatoo Removal", duration: "1hr", price: "R555.52", note: "Save up to 10%", description: "Laser tattoo removal session. Price may vary based on size and ink density." },
                ],
            },
        ],
    },
    // ========================================
    // MAKEUP
    // ========================================
    {
        id: "makeup",
        title: "Makeup Application",
        subtitle: "Bridal, Evening & Day",
        image: "/images/make-up/expert-bridal-makeup-application.jpg",
        subcategories: [
            {
                id: "makeup-services",
                title: "Services",
                items: [

                    { id: "bridal-makeup", name: "Bridal Make Up", duration: "1hr", price: "R1,999.89", note: "Save up to 10%", description: "A polished wedding-day makeup application built to look beautiful in person and on camera." },
                    { id: "evening-makeup", name: "Evening Make Up", duration: "1hr", price: "R733.29", note: "Save up to 10%", description: "Professional makeup for formal events, functions, or evening occasions." },
                    { id: "day-makeup", name: "Day Makeup", duration: "1hr", price: "R599.97", note: "Save up to 10%", description: "A softer daytime makeup look that enhances your features without feeling heavy." },
                    { id: "bridal-trial", name: "Bridal Makeup Trial", duration: "1hr", price: "R650", description: "Test your wedding day look before the big day. Work with your artist to perfect every detail — from foundation shade to lip colour — so you walk down the aisle with complete confidence." },
                ],
            },
        ],
    },
    // ========================================
    // MEDICAL
    // ========================================
    {
        id: "medical",
        title: "Medical Aesthetics",
        subtitle: "Clinical & Advanced Treatments",
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        subcategories: [
            {
                id: "medical-treatments",
                title: "Medical Treatments",
                items: [
                    { id: "vaginal-tightening", name: "Vaginal Tightning", duration: "1hr", price: "R6,110.77", note: "Save up to 10%", description: "Non-surgical vaginal rejuvenation using advanced radiofrequency technology to restore tone and improve comfort." },
                    { id: "fractional-laser", name: "Fractional Laser Full Face", duration: "1hr", price: "R2,999.83", note: "Save up to 10%", description: "Medical-grade resurfacing for fine lines, acne scars, enlarged pores, and uneven texture." },
                    { id: "plasmage", name: "Plasmage", duration: "1hr", price: "R899.10", note: "Save up to 10%", description: "The non-surgical alternative to eyelid surgery, using plasma energy to tighten and lift loose skin." },
                    { id: "iv-drip", name: "IV Drip", duration: "45min", price: "R1,200", description: "Deliver vitamins, minerals, and hydration directly into your bloodstream for immediate effect. Whether you need an energy boost, immune support, skin glow, or hangover recovery — IV therapy works from the inside out." },
                ],
            },
        ],
    },

    // ========================================
    // PERMANENT MAKEUP
    // ========================================
    {
        id: "permanent-makeup",
        title: "Permanent Makeup & Microblading",
        subtitle: "Semi-Permanent Brows, Lips & Liner",
        image: "/images/gallery/lashes-brows/microblading-hair-stroke-eyebrows.png",
        subcategories: [
            {
                id: "brows",
                title: "Brows",
                items: [
                    { id: "microblading", name: "Microblading", duration: "1hr", price: "R1,666.57", note: "Save up to 10%", description: "Ultra-fine hair strokes implanted into the skin to create natural-looking brows.", image: "/images/gallery/lashes-brows/microblading-hair-stroke-eyebrows.png", imageAlt: "Microblading brows at Galeo Beauty in Hartbeespoort" },
                    { id: "powderpixel-brows", name: "Powderpixel Brows", duration: "1hr", price: "R2,110.99", note: "Save up to 10%", description: "A soft, powdery brow effect created with tiny dots of pigment for a fuller, defined look.", image: "/images/gallery/lashes-brows/ombre-powder-brows-close-up.png", imageAlt: "Powder brows at Galeo Beauty in Hartbeespoort" },
                    { id: "hybrid-brows", name: "Hybrid Brows", duration: "1hr", price: "R1,710.00", note: "Save up to 10%", description: "The best of both worlds with hair strokes and shading for balanced definition.", image: "/images/gallery/lashes-brows/hybrid-brows-permanent-makeup-results-galeo-beauty.jpg", imageAlt: "Hybrid permanent makeup brows at Galeo Beauty in Hartbeespoort" },
                    { id: "brow-henna", name: "Brow Henna", duration: "1hr", price: "R555.52", note: "Save Upto 10%", description: "A natural alternative to tinting that stains both the hair and the skin beneath for fuller-looking brows.", image: "/images/gallery/lashes-brows/professional-eyebrow-shaping-and-grooming.jpg", imageAlt: "Defined brows at Galeo Beauty in Hartbeespoort" },
                ],
            },
            {
                id: "lips",
                title: "Lips",
                items: [
                    { id: "full-lips-contour", name: "Full Lips Contour", duration: "1hr", price: "R2,999.83", note: "Save up to 10%", description: "Complete lip colour from liner to full pigmentation for a permanently defined lip finish.", image: "/images/gallery/permanent-makeup/nano-lip-colour-before-after-galeo-beauty.jpg", imageAlt: "Full lip contour permanent makeup at Galeo Beauty in Hartbeespoort" },
                    { id: "lip-liner", name: "Lip Liner", duration: "1hr", price: "R1,888.78", note: "Save up to 10%", description: "Define and enhance your lip shape with a permanent liner that improves symmetry and colour definition.", image: "/images/gallery/permanent-makeup/lip-blush-tattoo-before-after-healed-results.jpg", imageAlt: "Lip liner permanent makeup at Galeo Beauty in Hartbeespoort" },
                ],
            },
            {
                id: "eyes",
                title: "Eyes",
                items: [
                    { id: "eyeliner-top", name: "Eyeliner Top", duration: "1hr", price: "R888.84", note: "Save up to 10%", description: "A permanent upper lash line that makes eyes appear larger, more defined, and always made-up.", image: "/images/gallery/permanent-makeup/permanent-eyeliner-healed-blue-eyes-galeo.jpg", imageAlt: "Permanent eyeliner at Galeo Beauty in Hartbeespoort" },
                    { id: "eyeliner-bottom", name: "Eyeliner Bottom", duration: "1hr", price: "R888.84", note: "Save up to 10%", description: "Define the lower lash line for added depth and intensity without the smudge.", image: "/images/gallery/permanent-makeup/permanent-eyeliner-healed-results-galeo-beauty.jpg", imageAlt: "Permanent eyeliner results at Galeo Beauty in Hartbeespoort" },
                ],
            },
        ],
    },
    // ========================================
    // QMS MEDICOSMETICS
    // ========================================
    {
        id: "qms",
        title: "QMS Facials",
        subtitle: "Advanced Collagen & Anti-Ageing",
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        subcategories: [
            {
                id: "qms-facials",
                title: "QMS Facials",
                items: [

                    { id: "chemical-peel", name: "Chemical Peel", duration: "1hr", price: "R998.84", note: "Save up to 10%", description: "A targeted chemical peel to resurface and renew skin texture." },
                    { id: "collagen-facial", name: "Collagen Facial", duration: "1hr", price: "R799.20", note: "Save up to 10%", description: "QMS's signature collagen boosting treatment for firm, plump skin." },
                    { id: "rejuvenating-facial", name: "Rejuvinating Facial", duration: "1hr", price: "R944.39", note: "Save up to 10%", description: "Restores vitality and moisture to tired, dull skin." },
                    { id: "deep-pore-cleansing", name: "Deep Pore Cleansing Facial", duration: "1hr", price: "R833.29", note: "Save up to 10%", description: "Deeply purifies pores and balances oil production." },
                    { id: "basic-facial", name: "Basic Facial", duration: "1hr", price: "R811.06", note: "Save up to 10%", description: "A classic maintenance facial for hydration and relaxation." },
                    { id: "activator-treatment", name: "Activator Treatment", duration: "1hr", price: "R844.40", note: "Save up to 10%", description: "An intensive activation treatment designed to kickstart skin renewal." },
                    { id: "sensitive-skin-facial", name: "Sensitive Skin Facial", duration: "1hr", price: "R666.63", note: "Save up to 10%", description: "A calming treatment specifically for reactive and sensitive skin." },
                ],
            },
        ],
    },
    // ========================================
    // SUNBED
    // ========================================
    {
        id: "sunbed",
        title: "Sunbed Tanning",
        subtitle: "UV & Spray Tan",
        image: "/images/gallery/specials/galeo-beauty-nail-specials-price-list.jpg",
        subcategories: [
            {
                id: "tanning-sessions",
                title: "Tanning Sessions",
                items: [

                    { id: "spraytan", name: "Spraytan", duration: "1hr", price: "R599.97", note: "Save up to 10%", description: "A flawless, streak-free spray tan for a natural golden glow, customised to your skin tone." },
                    { id: "sunbed-20", name: "Sunbed 20 Session", duration: "1hr", price: "R777.73", note: "Save up to 10%", description: "A 20-session package for regular tanners who want ongoing maintenance." },
                    { id: "sunbed-10", name: "Sunbed 10 Sessions", duration: "1hr", price: "R388.87", note: "Save up to 10%", description: "A 10-session package to build a lasting tan." },
                    { id: "sunbed-session", name: "Sunbed Per Session", duration: "1hr", price: "R54.00", note: "Save up to 10%", description: "A single high-performance tanning session." },
                ],
            },
        ],
    },
    // ========================================
    // WAXING
    // ========================================
    {
        id: "waxing",
        title: "Waxing",
        subtitle: "Hair Removal",
        image: "/images/waxing/full-leg-wax-salon-service.jpg",
        subcategories: [
            {
                id: "face-wax",
                title: "Face",
                items: [
                    { id: "wax-eyebrow", name: "Eyebrow Wax", duration: "15min", price: "R108", description: "Clean, defined brows." }, // Derived from Ear wax price? No, list doesn't have eyebrow wax. Wait, it doesn't? Code has R100. List has nose, ear, lip, cheek. Missing eyebrow! I will keep R100 or update roughly. I'll leave R100. Actually list has NO eyebrow wax? It MUST have. I'll keep it R100.
                    { id: "wax-lip", name: "Lip Wax", duration: "1hr", price: "R111.10", note: "Save up to 10%", description: "Quick upper lip hair removal." },
                    { id: "wax-cheek", name: "Cheek Wax", duration: "1hr", price: "R194.44", note: "Save up to 10%", description: "Smooth cheeks and sideburns." },
                    { id: "wax-nose", name: "Nose Wax", duration: "1hr", price: "R99.99", note: "Save up to 10%", description: "Removal of nose hair." },
                    { id: "wax-ear", name: "Ear Wax", duration: "1hr", price: "R133.33", note: "Save up to 10%", description: "Removal of ear hair." },
                    { id: "wax-chin", name: "Chin Wax", duration: "10min", price: "R80", description: "Chin hair removal." }, // Keeping old price as list doesn't specifiy
                    { id: "wax-full-face", name: "Full Face Wax", duration: "30min", price: "R280", description: "Complete facial waxing." }, // Keeping old price
                ],
            },
            {
                id: "body-wax",
                title: "Body",
                items: [
                    { id: "wax-full-leg", name: "Full Leg Wax", duration: "1hr", price: "R599.97", note: "Save up to 10%", description: "Silky smooth legs from hip to ankle." },
                    { id: "wax-half-leg", name: "Half Leg Wax", duration: "1hr", price: "R322.20", note: "Save up to 10%", description: "Lower or upper leg waxing." },
                    { id: "wax-hollywood", name: "Hollywood Wax", duration: "1hr", price: "R555.52", note: "Save up to 10%", description: "Complete intimate hair removal." },
                    { id: "wax-brazilian", name: "Brazillian Wax", duration: "1hr", price: "R477.76", note: "Save up to 10%", description: "Intimate waxing with a strip remaining." },
                    { id: "wax-underarm", name: "Under Arm Wax", duration: "1hr", price: "R194.44", note: "Save up to 10%", description: "Smooth underarms with clean regrowth." },
                    { id: "wax-full-arm", name: "Full Arm Wax", duration: "1hr", price: "R288.87", note: "Save up to 10%", description: "Hair removal from shoulder to wrist." },
                    { id: "wax-half-arm", name: "Half Arm Wax", duration: "1hr", price: "R161.10", note: "Save up to 10%", description: "Lower or upper arm waxing." },
                    { id: "wax-full-back", name: "Full Back Wax", duration: "1hr", price: "R322.20", note: "Save up to 10%", description: "Complete back hair removal." },
                    { id: "wax-half-back", name: "Half Back Wax", duration: "1hr", price: "R277.76", note: "Save up to 10%", description: "Upper or lower back waxing." },
                    { id: "wax-men-back", name: "Men Back Wax", duration: "1hr", price: "R644.41", note: "Save up to 10%", description: "Back waxing specifically tailored for men." },
                    { id: "wax-chest", name: "Chest Wax", duration: "1hr", price: "R266.65", note: "Save up to 10%", description: "Chest hair removal." },
                    { id: "wax-tummy", name: "Full Tummy Wax", duration: "1hr", price: "R444.42", note: "Save up to 10%", description: "Stomach hair removal for a smoother midsection." },
                    { id: "wax-butt", name: "Butt Wax", duration: "1hr", price: "R222.21", note: "Save up to 10%", description: "Buttocks hair removal for a smooth, clean finish." },
                ],
            },
        ],
    },
    // ========================================
    // HAIR
    // ========================================
    {
        id: "hair",
        title: "Hair Cuts, Colour & Styling",
        subtitle: "Cut, Colour, Blow Dry & Treatments",
        image: "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg",
        subcategories: [
            {
                id: "hair-cuts-styling",
                title: "Cuts & Styling",
                items: [
                    // Cuts
                    { id: "cut-blow-short", name: "Cut & Blow Dry (Short)", duration: "45min", price: "R378", description: "Precision cut and professional blow dry for short styles." },
                    { id: "cut-blow-medium", name: "Cut & Blow Dry (Medium)", duration: "1hr", price: "R432", description: "Refresh your length or add layers with a tailored cut and finish." },
                    { id: "cut-blow-long", name: "Cut & Blow Dry (Long)", duration: "1hr 15min", price: "R468", description: "Expert shaping and styling for long hair." },
                    { id: "cut-blow-xl", name: "Cut & Blow Dry (Extra Long)", duration: "1hr 30min", price: "R522", description: "Complete restyle or maintenance for extra long hair." },
                    { id: "cut-only-short", name: "Cut Only (Short)", duration: "30min", price: "R252", description: "Express dry or wet cut for short hair." },
                    { id: "cut-only-medium", name: "Cut Only (Medium)", duration: "45min", price: "R315", description: "Maintenance cut for medium length hair." },
                    { id: "cut-only-long", name: "Cut Only (Long)", duration: "45min", price: "R360", description: "Trimming dead ends or reshaping long layers." },

                    // Blow Drys
                    { id: "blow-short", name: "Blow Dry (Short)", duration: "30min", price: "R279", description: "Volume and shine for cropped styles." },
                    { id: "blow-medium", name: "Medium Blow", duration: "1hr", price: "R366.64", note: "Save up to 10%", description: "A smooth, bouncy finish for shoulder-length hair." },
                    { id: "blow-long", name: "Long Blow", duration: "1hr", price: "R468.00", note: "Save up to 10%", description: "A polished blowout for long hair." },
                    { id: "blow-xl", name: "Extra Long Blow", duration: "1hr", price: "R466.64", note: "Save up to 10%", description: "Professional styling for very long or thick hair." },

                    // Kids & Pensioners
                    { id: "cut-pensioner", name: "Pensioner Cut And Blow", duration: "1hr", price: "R311.09", note: "Save up to 10%", description: "A practical maintenance cut and blow dry for seniors." },
                    { id: "cut-0-5", name: "Cut 0-5 Years", duration: "30min", price: "R99.00", note: "Save up to 10%", description: "A gentle trim for little ones aged 0 to 5 years." },
                    { id: "cut-0-5-boys", name: "Cut 0-5yrs (Boys)", duration: "20min", price: "R126", description: "Gentle trim for little ones." },
                    { id: "cut-0-5-girls", name: "Cut 0-5yrs (Girls)", duration: "20min", price: "R153", description: "Gentle trim for little ones." },
                    { id: "cut-6-12-boys", name: "Cut 6-12yrs (Boys)", duration: "30min", price: "R153", description: "School cut for boys." },
                    { id: "cut-6-12-girls", name: "Cut 6-12yrs (Girls)", duration: "30min", price: "R189", description: "Trim and tidy for girls." },
                    { id: "cut-13-18-boys", name: "Cut 13-18yrs (Boys)", duration: "30min", price: "R180", description: "Teen cut for boys." },
                    { id: "cut-13-18-girls", name: "Cut 13-18yrs (Girls)", duration: "45min", price: "R225", description: "Teen cut for girls." },

                    // Upstyles
                    { id: "upstyle-short", name: "Short Hair Upstyle", duration: "1hr", price: "R666.63", note: "Save up to 10%", description: "Creative occasion styling for shorter lengths." },
                    { id: "upstyle-medium", name: "Medium Upstyle", duration: "1hr", price: "R888.84", note: "Save up to 10%", description: "Elegant pinned styles for medium-length hair and special occasions." },
                    { id: "upstyle-long", name: "Long Hair Upstyle", duration: "1hr", price: "R1,111.05", note: "Save up to 10%", description: "Intricate occasion styling for long hair." },
                ],
            },
            {
                id: "hair-color",
                title: "Colour & Foils",
                items: [
                    // Tints
                    { id: "tint-roots", name: "Roots", duration: "1hr 15min", price: "R833.29", note: "Save up to 10%", description: "Cover greys or regrowth with a roots-only colour refresh." },
                    { id: "tint-short", name: "Short Color", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "All-over colour for short hair." },
                    { id: "tint-medium", name: "Medium Color", duration: "1hr", price: "R1,222.15", note: "Save up to 10%", description: "Rich, vibrant colour for medium hair." },
                    { id: "tint-long", name: "Long Color", duration: "1hr", price: "R1,499.92", note: "Save up to 10%", description: "Full head colour application for long hair." },
                    { id: "tint-xl", name: "Extra Long Color", duration: "1hr", price: "R1,388.81", note: "Save up to 10%", description: "Full colour for extra long hair." },

                    // Foils
                    { id: "foil-per", name: "Per Foil", duration: "15min", price: "R63", description: "Individual foil placement." },
                    { id: "highlights-full-short", name: "Short Full Head Foils", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "Brighten your full look with foils for short hair." },
                    { id: "highlights-full-medium", name: "Medium Full Head Foils", duration: "1hr", price: "R1,277.71", note: "Save up to 10%", description: "Dimensional foils for medium hair." },
                    { id: "highlights-full-long", name: "Long Full Head Foils", duration: "1hr", price: "R1,170.00", note: "Save up to 10%", description: "Full head foils for long hair." },
                    { id: "highlights-full-xl", name: "Extra Long Full Head Foils", duration: "1hr", price: "R1,611.20", note: "Save up to 10%", description: "Maximum impact foils for extra long hair." },
                    { id: "highlights-half-short", name: "Short Half Head Foils", duration: "1hr", price: "R944.39", note: "Save up to 10%", description: "Half-head foils for short hair." },
                    { id: "highlights-half-medium", name: "Medium Half Head Foils", duration: "1hr", price: "R1,055.50", note: "Save up to 10%", description: "Half-head foils for medium hair." },
                    { id: "highlights-half-long", name: "Long Half Head Foils", duration: "1hr", price: "R1,277.71", note: "Save up to 10%", description: "Half-head foil refresh for long hair." },
                    { id: "highlights-half-xl", name: "Extra Long Half Head Foils", duration: "1hr", price: "R1,388.81", note: "Save up to 10%", description: "Half-head foils for extra long hair." },

                    // Techniques
                    { id: "balayage", name: "Balayage", duration: "2hr 30min", price: "R765", description: "Freehand painting for a natural, lived-in blonde." },
                    { id: "toner-short", name: "Short Hair Toner", duration: "1hr", price: "R422.20", note: "Save up to 10%", description: "A quick toner refresh for short hair." },
                    { id: "toner-medium", name: "Medium Hair Toner", duration: "1hr", price: "R466.64", note: "Save up to 10%", description: "Tone-refreshing service for medium-length hair." },
                    { id: "toner-long", name: "Long Hair Toner", duration: "1hr", price: "R555.52", note: "Save up to 10%", description: "Correct brassiness and refine tone on long hair." },
                    { id: "toner-xl", name: "Toner (Extra Long)", duration: "45min", price: "R720", description: "Even tone for extra long hair." },
                ],
            },
            {
                id: "hair-treatments",
                title: "Treatments & Brazilian",
                items: [
                    { id: "brazilian-short", name: "Brazillian Blow Short", duration: "1hr", price: "R1,277.71", note: "Save up to 10%", description: "Smooth and soften short hair while cutting down on daily styling time." },
                    { id: "brazilian-medium", name: "Brazillian Blow Medium", duration: "1hr", price: "R1,599.91", description: "A smoothing treatment for medium-length hair to reduce frizz and improve manageability." },
                    { id: "brazilian-long", name: "Brazillian Blow Long", duration: "1hr", price: "R1,911.01", note: "Save up to 10%", description: "Transform coarse or frizzy long hair with a smoothing blow treatment." },
                    { id: "brazilian-xl", name: "Brazillian Blow Extra Long", duration: "1hr", price: "R2,077.67", note: "Save up to 10%", description: "Ultimate smoothing for extra long, thick hair." },
                    { id: "botox", name: "Hair Botox", duration: "1hr", price: "R810", description: "Deep conditioning anti-ageing treatment." },
                    { id: "keratin", name: "Care Keratin Mask", duration: "1hr", price: "R611.08", note: "Save up to 10%", description: "A nourishing mask that strengthens and smooths damaged hair." },
                    { id: "vital", name: "Care Vital Mask", duration: "1hr", price: "R611.08", note: "Save up to 10%", description: "An essential nutrient-rich mask to refresh stressed hair." },
                    { id: "silver", name: "Osmo Silver Mask", duration: "1hr", price: "R388.87", note: "Save up to 10%", description: "Neutralises yellow tones and refreshes blonde or highlighted hair." },
                    { id: "osmo-intensive-mask", name: "Osmo Intensive Mask", duration: "1hr", price: "R355.54", note: "Save up to 10%", description: "A deep-conditioning mask for dry, stressed, or over-processed hair." },
                    { id: "botox-long", name: "Botox Long Hair Treat", duration: "1hr", price: "R999.94", note: "Save up to 10%", description: "A deep-conditioning anti-ageing treatment formulated for long hair." },
                    { id: "botox-medium", name: "Botox Treat Medium Hair", duration: "1hr", price: "R888.84", note: "Save up to 10%", description: "A restorative hair botox treatment sized for medium-length hair." },
                    { id: "botox-short", name: "Botox Treat Short", duration: "1hr", price: "R777.73", note: "Save up to 10%", description: "A smoothing, restorative hair botox treatment for shorter hair." },
                    { id: "short-blow-10x", name: "Short Blow Package 10x", duration: "1hr", price: "R1,333.26", note: "Save up to 10%", description: "A ten-session blow-dry package for short hair." },
                    { id: "medium-blow-10x", name: "Medium Blow Package 10x", duration: "1hr", price: "R1,666.57", note: "Save up to 10%", description: "A ten-session blow-dry package for medium hair." },
                    { id: "long-blow-10x", name: "Long Blow Package 10x", duration: "1hr", price: "R1,999.89", note: "Save up to 10%", description: "A ten-session blow-dry package for long hair." },
                    { id: "extra-long-blow-10x", name: "Extra Long Blow Package 10x", duration: "1hr", price: "R2,333.20", note: "Save up to 10%", description: "A ten-session blow-dry package for extra long hair." },
                    { id: "chem-straight", name: "Chemical Straightener", duration: "2hr", price: "R200", description: "Permanent straightening." },
                ],
            },
            {
                id: "gents-hair",
                title: "Gents Hair",
                items: [
                    { id: "gents-cut", name: "Gents Cut", duration: "30min", price: "R200", description: "Classic or modern clipper/scissor cut." },
                    { id: "gents-clipper", name: "Clipper Cut", duration: "20min", price: "R150", description: "All-over machine cut." },
                ],
            },
        ],
    },
    // ========================================
    // NAILS
    // ========================================
    {
        id: "nails",
        title: "Nail Care & Nail Art",
        subtitle: "Manicure, Pedicure & Nail Design",
        image: "/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
        subcategories: [
            {
                id: "hands-feet",
                title: "Hands & Feet",
                items: [
                    { id: "gel-overlay-hands", name: "Gel Overlay", duration: "1hr", price: "R466.64", note: "Save up to 10%", description: "Strengthen natural nails with a durable gel coating." },
                    { id: "gel-tips", name: "Gel & Tips", duration: "1hr 30min", price: "R414", description: "Length extension with tips and strong gel overlay." },
                    { id: "acrylic-overlay", name: "Acrylic Overlay", duration: "1hr", price: "R511.08", note: "Save up to 10%", description: "A hard-wearing acrylic coating for natural nails." },
                    { id: "acrylic-tips", name: "Full Set Acrylic With Tips", duration: "1hr", price: "R666.63", note: "Save up to 10%", description: "Classic durable extensions with acrylic and tips." },
                    { id: "rubber-base", name: "Rubber Base", duration: "1hr", price: "R360", description: "Flexible, strong base for natural nails." },
                    { id: "rubber-base-toes", name: "Rubber Base (Toes)", duration: "1hr", price: "R342", description: "Long-lasting rubber base for toes." },
                    { id: "sculpted-forms", name: "Scuplted Acrylic With Forms", duration: "1hr", price: "R733.29", note: "Save up to 10%", description: "Custom sculpted extensions without tips." },
                    { id: "designer-nails", name: "Full Set Designer Nails", duration: "1hr", price: "R799.96", note: "Save up to 10%", description: "Intricate art and custom shaping for statement nails." },
                    { id: "gel-toes", name: "Gel Toes", duration: "1hr", price: "R311.09", note: "Save up to 10%", description: "Chip-free gel colour for your toes." },
                    { id: "mani-pedi-combo", name: "Mani & Pedi Combo", duration: "2hr", price: "R477", description: "Complete package for hands and feet." },
                    { id: "full-manicure", name: "Manicure", duration: "45min", price: "R288.87", note: "Save up to 10%", description: "Cuticle work, nail shaping, and polish for a clean manicure finish." },
                    { id: "acrylic-soak-off", name: "Acrylic Soak Off", duration: "1hr", price: "R133.33", note: "Save up to 10%", description: "Safe removal of acrylic product." },
                    { id: "gel-soak-off", name: "Gel Soak Off", duration: "1hr", price: "R111.10", note: "Save up to 10%", description: "Safe removal of gel product." },
                    { id: "nail-repair", name: "Nail Repair", duration: "1hr", price: "R55.55", note: "Save up to 10%", description: "Repair a damaged or broken nail without redoing the full set." },
                    { id: "buff-only", name: "Buff Only", duration: "1hr", price: "R77.78", note: "Save up to 10%", description: "A quick buff and tidy when colour is not needed." },
                    { id: "rubber-base-fill", name: "Rubber Base Fill", duration: "1hr", price: "R199.99", note: "Save up to 10%", description: "A maintenance fill for existing rubber-base nails." },
                    { id: "acrylic-fill", name: "Acrylic Fill", duration: "1hr", price: "R466.64", note: "Save up to 10%", description: "Acrylic maintenance to refresh growth and rebalance the set." },
                    { id: "gel-fill", name: "Gel Fill", duration: "1hr", price: "R466.64", note: "Save up to 10%", description: "Gel maintenance to refresh growth and restore structure." },
                    { id: "pedicure-gel", name: "Pedicure With Gel", duration: "1hr", price: "R666.63", note: "Save up to 10%", description: "A full pedicure finished with long-wearing gel colour." },
                    { id: "pedicure", name: "Pedicure", duration: "1hr", price: "R279", description: "Soak, scrub, and paint for feet." },
                    { id: "soak-off", name: "Soak Off", duration: "30min", price: "R99", description: "Safe removal of gel or acrylic." },
                    { id: "para-dip", name: "Paraffin Dip", duration: "20min", price: "R99", description: "Deep moisturising treat." },
                    { id: "nail-art", name: "Nail Art (Per Nail)", duration: "10min", price: "R18", description: "Custom design per nail." },
                    { id: "revarnish", name: "Revarnish", duration: "20min", price: "R135", description: "File and paint refresh." },
                ],
            },
        ],
    },
    // ========================================
    // LASHES & BROWS (Tinting)
    // ========================================
    {
        id: "lashes-brows",
        title: "Lash Extensions & Brow Styling",
        subtitle: "Extensions, Lifts, Tints & Lamination",
        image: "/images/gallery/lashes-brows/hybrid-lashes-with-defined-eyebrows.png",
        subcategories: [
            {
                id: "lash-extensions-infills",
                title: "Lash Extensions & Infills",
                items: [
                    { id: "classic-lashes", name: "Full Set Classic Lashes", duration: "1hr", price: "R777.73", note: "Save Upto 10%", description: "One extension applied to one natural lash for clean, natural definition." },
                    { id: "volume-lashes", name: "Full Set Volume Lashes", duration: "1hr", price: "R777.73", note: "Save Upto 10%", description: "Multiple fine lashes per natural lash for fluffier volume." },
                    { id: "glamour-lashes", name: "Glamour Lashes", duration: "1hr", price: "R1,111.05", note: "Save Upto 10%", description: "High-impact, dramatic lash volume." },
                    { id: "silk-lashes", name: "Full Set Silk Lashes", duration: "1hr", price: "R555.52", note: "Save Upto 10%", description: "Soft, glossy lashes with a natural finish." },
                    { id: "hybrid-lashes", name: "Hybrid Lashes", duration: "1hr", price: "R888.84", note: "Save Upto 10%", description: "A blend of classic and volume lashes for textured density." },
                    { id: "lash-fill", name: "Lash Fill", duration: "1hr", price: "R443.41", note: "Save Upto 10%", description: "A general lash maintenance fill to refresh an existing set." },
                    { id: "lash-fill-2", name: "Lash Fill (2 Week)", duration: "1hr", price: "R270", description: "Maintenance fill at 2 weeks." },
                    { id: "lash-fill-3", name: "Lash Fill (3 Week)", duration: "1hr 15min", price: "R315", description: "Maintenance fill at 3 weeks." },
                    { id: "lash-removal", name: "Lash Removal", duration: "30min", price: "R135", description: "Safe removal of extensions." },
                ],
            },
            {
                id: "lash-lift-tint-brows",
                title: "Lash Lift, Tint & Brow Styling",
                items: [
                    { id: "lash-lift-tint", name: "Lash Lift & Tint", duration: "45min", price: "R405", description: "Curl and darken natural lashes for an open-eyed look." },
                    { id: "lash-lamination", name: "Lash Lamilnation", duration: "1hr", price: "R611.08", note: "Save Upto 10%", description: "A lifting treatment for thicker, darker-looking natural lashes." },
                    { id: "lash-tint", name: "Lash Tint", duration: "1hr", price: "R133.33", note: "Save Upto 10%", description: "Darken pale lashes." },
                    { id: "brow-tint", name: "Brow Tint", duration: "1hr", price: "R111.10", note: "Save Upto 10%", description: "Define brows with colour." },
                    { id: "lash-lift", name: "Lash Lift", duration: "1hr", price: "R522.00", note: "Save Upto 10%", description: "Lift and curl your natural lashes for a brighter, more open-eyed look without extensions." },
                    { id: "brow-lamination", name: "Brow Lamination", duration: "1hr", price: "R423.00", note: "Save Upto 10%", description: "A smoothing and setting treatment for fuller-looking, more controlled brows." },
                ],
            },
        ],
    },
    // ========================================
    // HAIR EXTENSIONS
    // ========================================
    {
        id: "hair-extensions",
        title: "Hair Extensions",
        subtitle: "Premium 100% Human Hair",
        image: "/images/hair-extensions/beachy-blonde-waves-extensions.png",
        badge: "Premium Quality",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "tape-in",
                title: "Tape in Hair",
                note: "20 pieces – 50g | Double Drawn",
                items: [
                    { id: "tape-35cm-dark", name: "Tape in 35cm - Dark Colours", price: "R1,000" },
                    { id: "tape-35cm-light", name: "Tape in 35cm - Light/Ombre/Piano", price: "R1,200" },
                    { id: "tape-40cm-dark", name: "Tape in 40cm - Dark Colours", price: "R1,200" },
                    { id: "tape-40cm-light", name: "Tape in 40cm - Light/Ombre/Piano", price: "R1,400" },
                    { id: "tape-45cm-dark", name: "Tape in 45cm - Dark Colours", price: "R1,400" },
                    { id: "tape-45cm-light", name: "Tape in 45cm - Light/Ombre/Piano", price: "R1,600" },
                    { id: "tape-50cm-dark", name: "Tape in 50cm - Dark Colours", price: "R1,600" },
                    { id: "tape-50cm-light", name: "Tape in 50cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "tape-55cm-dark", name: "Tape in 55cm - Dark Colours", price: "R1,800" },
                    { id: "tape-55cm-light", name: "Tape in 55cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "tape-60cm-dark", name: "Tape in 60cm - Dark Colours", price: "R2,000" },
                    { id: "tape-60cm-light", name: "Tape in 60cm - Light/Ombre/Piano", price: "R2,200" },
                ],
            },
            {
                id: "micro-loop-ring",
                title: "Micro Loop Ring",
                note: "100 strands – 100g | Double Drawn",
                items: [
                    { id: "microloop-35cm-dark", name: "Micro Loop 35cm - Dark Colours", price: "R2,000" },
                    { id: "microloop-35cm-light", name: "Micro Loop 35cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "microloop-40cm-dark", name: "Micro Loop 40cm - Dark Colours", price: "R2,200" },
                    { id: "microloop-40cm-light", name: "Micro Loop 40cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "microloop-45cm-dark", name: "Micro Loop 45cm - Dark Colours", price: "R2,400" },
                    { id: "microloop-45cm-light", name: "Micro Loop 45cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "microloop-50cm-dark", name: "Micro Loop 50cm - Dark Colours", price: "R2,600" },
                    { id: "microloop-50cm-light", name: "Micro Loop 50cm - Light/Ombre/Piano", price: "R2,800" },
                    { id: "microloop-55cm-dark", name: "Micro Loop 55cm - Dark Colours", price: "R2,800" },
                    { id: "microloop-55cm-light", name: "Micro Loop 55cm - Light/Ombre/Piano", price: "R3,000" },
                    { id: "microloop-60cm-dark", name: "Micro Loop 60cm - Dark Colours", price: "R3,000" },
                    { id: "microloop-60cm-light", name: "Micro Loop 60cm - Light/Ombre/Piano", price: "R3,200" },
                ],
            },
            {
                id: "clip-in-hair",
                title: "Clip in Hair",
                note: "7 pieces – 100g | Double Drawn",
                items: [
                    { id: "clip-35cm-dark", name: "Clip in 35cm - Dark Colours", price: "R1,600" },
                    { id: "clip-35cm-light", name: "Clip in 35cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "clip-40cm-dark", name: "Clip in 40cm - Dark Colours", price: "R1,800" },
                    { id: "clip-40cm-light", name: "Clip in 40cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "clip-45cm-dark", name: "Clip in 45cm - Dark Colours", price: "R2,000" },
                    { id: "clip-45cm-light", name: "Clip in 45cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "clip-50cm-dark", name: "Clip in 50cm - Dark Colours", price: "R2,200" },
                    { id: "clip-50cm-light", name: "Clip in 50cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "clip-55cm-dark", name: "Clip in 55cm - Dark Colours", price: "R2,400" },
                    { id: "clip-55cm-light", name: "Clip in 55cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "clip-60cm-dark", name: "Clip in 60cm - Dark Colours", price: "R2,600" },
                    { id: "clip-60cm-light", name: "Clip in 60cm - Light/Ombre/Piano", price: "R2,800" },
                ],
            },
            {
                id: "machine-weave",
                title: "Machine Weave",
                note: "100g | Double Drawn",
                items: [
                    { id: "machine-40cm-dark", name: "Machine Weave 40cm - Dark Colours", price: "R1,800" },
                    { id: "machine-40cm-light", name: "Machine Weave 40cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "machine-45cm-dark", name: "Machine Weave 45cm - Dark Colours", price: "R2,000" },
                    { id: "machine-45cm-light", name: "Machine Weave 45cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "machine-50cm-dark", name: "Machine Weave 50cm - Dark Colours", price: "R2,200" },
                    { id: "machine-50cm-light", name: "Machine Weave 50cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "machine-55cm-dark", name: "Machine Weave 55cm - Dark Colours", price: "R2,400" },
                    { id: "machine-55cm-light", name: "Machine Weave 55cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "machine-60cm-dark", name: "Machine Weave 60cm - Dark Colours", price: "R2,600" },
                    { id: "machine-60cm-light", name: "Machine Weave 60cm - Light/Ombre/Piano", price: "R2,800" },
                ],
            },
            {
                id: "ponytail",
                title: "Ponytail",
                note: "80g | Double Drawn",
                items: [
                    { id: "ponytail-40cm-dark", name: "Ponytail 40cm - Dark Colours", price: "R1,600" },
                    { id: "ponytail-40cm-light", name: "Ponytail 40cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "ponytail-45cm-dark", name: "Ponytail 45cm - Dark Colours", price: "R1,800" },
                    { id: "ponytail-45cm-light", name: "Ponytail 45cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "ponytail-50cm-dark", name: "Ponytail 50cm - Dark Colours", price: "R2,000" },
                    { id: "ponytail-50cm-light", name: "Ponytail 50cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "ponytail-55cm-dark", name: "Ponytail 55cm - Dark Colours", price: "R2,200" },
                    { id: "ponytail-55cm-light", name: "Ponytail 55cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "ponytail-60cm-dark", name: "Ponytail 60cm - Dark Colours", price: "R2,400" },
                    { id: "ponytail-60cm-light", name: "Ponytail 60cm - Light/Ombre/Piano", price: "R2,600" },
                ],
            },
            {
                id: "halo-hair",
                title: "Halo Hair",
                note: "80-100g | Double Drawn",
                items: [
                    { id: "halo-35cm-dark", name: "Halo Hair 35cm - Dark Colours", price: "R1,400" },
                    { id: "halo-35cm-light", name: "Halo Hair 35cm - Light/Ombre/Piano", price: "R1,600" },
                    { id: "halo-40cm-dark", name: "Halo Hair 40cm - Dark Colours", price: "R1,600" },
                    { id: "halo-40cm-light", name: "Halo Hair 40cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "halo-45cm-dark", name: "Halo Hair 45cm - Dark Colours", price: "R1,800" },
                    { id: "halo-45cm-light", name: "Halo Hair 45cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "halo-50cm-dark", name: "Halo Hair 50cm - Dark Colours", price: "R2,000" },
                    { id: "halo-50cm-light", name: "Halo Hair 50cm - Light/Ombre/Piano", price: "R2,200" },
                ],
            },
            {
                id: "genius-weave",
                title: "Genius Weave",
                note: "All Colours | Double Drawn",
                items: [
                    { id: "genius-40cm", name: "Genius Weave 40cm (100g)", price: "R2,200" },
                    { id: "genius-45cm", name: "Genius Weave 45cm (120g)", price: "R2,600" },
                    { id: "genius-50cm", name: "Genius Weave 50cm (140g)", price: "R3,200" },
                    { id: "genius-55cm", name: "Genius Weave 55cm (160g)", price: "R3,600" },
                    { id: "genius-60cm", name: "Genius Weave 60cm (160g)", price: "R4,000" },
                ],
            },
            {
                id: "butterfly-weave",
                title: "Butterfly Weave",
                note: "All Colours | Double Drawn",
                items: [
                    { id: "butterfly-40cm", name: "Butterfly Weave 40cm (80g)", price: "R2,000" },
                    { id: "butterfly-45cm", name: "Butterfly Weave 45cm (100g)", price: "R2,200" },
                    { id: "butterfly-50cm", name: "Butterfly Weave 50cm (100g)", price: "R2,600" },
                    { id: "butterfly-55cm", name: "Butterfly Weave 55cm (100g)", price: "R2,800" },
                    { id: "butterfly-60cm", name: "Butterfly Weave 60cm (100g)", price: "R3,000" },
                ],
            },
            {
                id: "hair-ext-extras",
                title: "Extras",
                note: "Processing: +-7 working days | Delivery: R99 or Self Pick Up",
                items: [
                    { id: "tape-strips-precut", name: "Tape in Strips (Pre-cut) - 60 pieces", price: "R200" },
                    { id: "tape-in-remover", name: "Tape in Remover - 100ml", price: "R150" },
                ],
            },
        ],
    },
];

export const serviceCategoriesContent = withGeneratedServiceKeywords(rawServiceCategoriesContent);


