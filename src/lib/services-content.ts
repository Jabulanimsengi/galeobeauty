
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
        image: "/images/gallery/Facials/professional-skin-facial-treatment-in-progress.jpeg",
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "face-lifts",
                title: "Face Lifts & Rejuvenation",
                items: [
                    { id: "nefertiti-lift", name: "Nefertiti Lift", duration: "1hr", price: "R7,950", description: "Named after the Egyptian queen, this treatment uses targeted injections along the jawline and neck to lift and define, creating a sleeker, more youthful profile." },
                    { id: "liquid-facelift", name: "Non Surgical Liquid Face Lift", duration: "1hr", price: "R10,000", description: "A comprehensive rejuvenation combining dermal fillers and muscle relaxants to restore volume, smooth wrinkles, and lift sagging skin without surgery." },
                    { id: "collagen-biostimulator", name: "Collagen Biostimulator Injections 10ml", duration: "1hr", price: "R5,000", description: "Stimulates your skin's natural collagen production for gradual, long-lasting skin tightening and rejuvenation that looks completely natural." },
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
                    { id: "undereye-2-treatments", name: "Under Eye Skin Booster (2 Treatments)", duration: "1hr", price: "R4,000", description: "Intensive hydration therapy for the delicate under-eye area. Two sessions of micro-injections to plump, brighten, and reduce dark circles." },
                    { id: "undereye-1-treatment", name: "Under Eye Skin Booster (1 Treatment)", duration: "1hr", price: "R2,800", description: "Targeted hydration boost using hyaluronic acid micro-injections to refresh tired eyes and reduce the appearance of fine lines." },
                ],
            },
            {
                id: "dermal-fillers",
                title: "Dermal Fillers",
                items: [
                    { id: "cheek-fillers-2ml", name: "Dermal Cheek Fillers 2ml", duration: "1hr", price: "R6,000", description: "Restore youthful volume to mid-face with premium hyaluronic acid filler. Lifts cheekbones and smooths nasolabial folds for a refreshed appearance." },
                    { id: "cheek-fillers-1ml", name: "Dermal Cheek Fillers 1ml", duration: "1hr", price: "R3,500", description: "Subtle cheek enhancement using premium filler to add definition and lift. Perfect for maintaining or light enhancement." },
                    { id: "russian-lip-1ml", name: "Dermal Russian Lip Fillers 1ml", duration: "1hr", price: "R3,000", description: "The sought-after Russian lip technique creates a flatter, more defined lip shape with height rather than projection. Creates a doll-like, heart-shaped pout." },
                    { id: "lip-filler-1ml", name: "Lip Filler 1ml", duration: "1hr", price: "R2,800", description: "Enhance your natural lip shape with premium hyaluronic acid filler. Adds volume, definition, and hydration for beautifully plump, natural-looking lips." },
                    { id: "dermal-filler-1ml", name: "Dermal Filler 1ml", duration: "1hr", price: "R2,800", description: "Versatile hyaluronic acid filler for lips, lines, or facial contouring. Customizable placement for natural-looking enhancement." },
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
        image: "/images/fat-freezing/fat-freezing-stomach-treatment.jpeg",
        subcategories: [
            {
                id: "cryolipolysis",
                title: "Cryolipolysis",
                items: [
                    { id: "fat-freezing-session", name: "Fat Freezing Session", duration: "45min", price: "R799.20", description: "Freeze away stubborn fat permanently in just one session. Cryolipolysis technology targets and crystallises fat cells, which your body naturally eliminates over 6–12 weeks. Zero needles, zero downtime." },
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
        image: "/images/massages/deep-relaxation-neck-massage.jpeg",
        subcategories: [
            {
                id: "body-massage",
                title: "Full Body",
                items: [
                    { id: "swedish-massage-60", name: "Swedish Massage (60min)", duration: "1hr", price: "R500", description: "The ultimate stress-reliever. Long, flowing strokes improve circulation, ease muscle tension, and leave you in a state of deep relaxation. Perfect for first-timers or anyone needing to unwind completely." },
                    { id: "aromatherapy-60", name: "Aromatherapy Massage (60min)", duration: "1hr", price: "R550", description: "A sensory journey combining therapeutic massage with pure essential oils chosen for your mood and needs. Calms the nervous system, lifts your mood, and leaves your skin silky smooth and fragrant." },
                    { id: "hot-stone-60", name: "Hot Stone Massage (60min)", duration: "1hr", price: "R600", description: "Warm basalt stones melt away deep muscle tension that hands alone can't reach. The heat penetrates tired muscles, improves blood flow, and creates an intensely relaxing, almost meditative experience." },
                    { id: "deep-tissue-60", name: "Deep Tissue Massage (60min)", duration: "1hr", price: "R600", description: "Targeted pressure on deep muscle layers to release chronic tension, knots, and tightness. Ideal if you carry stress in your shoulders, have a stiff neck, or suffer from persistent muscle aches." },
                    { id: "sports-massage-60", name: "Sports Massage (60min)", duration: "1hr", price: "R600", description: "Designed for active bodies. Reduces muscle soreness, speeds up recovery, and improves flexibility. Whether you're training hard or recovering from exertion, this massage gets you back at your best faster." },
                    { id: "back-neck-30", name: "Back & Neck Massage (30min)", duration: "30min", price: "R350", description: "A focused 30-minute treatment targeting the most common tension hotspots — upper back, shoulders, and neck. Quick enough to fit into a lunch break, effective enough to feel the difference immediately." },
                    { id: "back-neck-45", name: "Back & Neck Massage (45min)", duration: "45min", price: "R450", description: "Extra time to work through stubborn tension in your back, neck, and shoulders. The additional 15 minutes allows for deeper work on problem areas, leaving you genuinely relaxed and pain-free." },
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
        image: "/images/gallery/Facials/facial-treatment-room-steamer-dermalogica-products.jpeg",
        subcategories: [
            {
                id: "pro-skin",
                title: "Pro Skin Treatments",
                items: [
                    // New items from list
                    { id: "multivitamin-treatment", name: "Multivitamin Skin Treatment", duration: "45min", price: "R690", description: "A nutrient-rich boost for dull, tired skin. Vitamins A, C, and E work together to repair damage, improve elasticity, and restore a healthy glow." },
                    { id: "pro-dermaplaning-30", name: "Pro Dermaplaning 30 min", duration: "30min", price: "R490", description: "Exfoliates and removes peach fuzz for instantly smoother, brighter skin. Enhances product absorption and creates a flawless base for makeup." },
                    { id: "neurosculpt-30", name: "Neurosculpt 30 min", duration: "30min", price: "R650", description: "A targeted 30-minute treatment focusing on muscle relaxation and facial contouring to relieve tension and smooth fine lines." },

                    // Updated existing items
                    { id: "pro-skin-30", name: "Pro Skin 30", duration: "30min", price: "R450", description: "A precision 30-minute facial customised to your skin's exact needs. Dermalogica's expert mapping identifies your unique concerns and targets them directly — perfect for a quick but effective skin reset." }, // Updated to match "facial 30 min" price R450? Or keep old? List has "facial 30 min $450". I'll use that.
                    { id: "pro-skin-60", name: "Pro Skin 60", duration: "1hr", price: "R950", description: "The full Dermalogica experience. A comprehensive 60-minute treatment that deeply cleanses, exfoliates, and nourishes your skin using professional-grade products. Leaves skin visibly clearer, brighter, and healthier." }, // Matched to 'pro skin treatment' R950
                    { id: "pro-bright", name: "Pro Bright", duration: "1hr", price: "R990", description: "Fade dark spots, even skin tone, and restore your natural radiance. This brightening treatment targets hyperpigmentation, sun damage, and dullness using Dermalogica's most advanced brightening actives." },
                    { id: "pro-firm", name: "Pro Firm", duration: "1hr", price: "R1,100", description: "Lift, firm, and tighten ageing or lax skin. Pro Firm uses powerful peptides and collagen-stimulating actives to visibly reduce sagging and restore a more youthful, sculpted facial contour." }, // Updated to R1100
                    { id: "pro-clear", name: "Pro Clear", duration: "1hr", price: "R990", description: "The ultimate solution for breakout-prone and congested skin. Deep-cleans pores, reduces inflammation, and regulates oil production — leaving skin clearer, calmer, and less prone to future breakouts." },
                    { id: "pro-calm", name: "Pro Calm", duration: "1hr", price: "R1,100", description: "Designed for sensitive, reactive, or rosacea-prone skin. This ultra-gentle treatment soothes redness, reduces irritation, and strengthens the skin barrier — so your skin can finally feel comfortable in itself." }, // Updated to R1100
                    { id: "eye-peel", name: "Pro Eye Peel", duration: "30min", price: "R1,350", description: "A targeted infusion and peel for the delicate eye area. Reduces fine lines, puffiness, and dark circles. Gentle yet effective — wake up looking refreshed even when you haven't slept enough." }, // Matched to "infusion and under eye peel $1,350"?

                    // More New Items
                    { id: "pro-dermaplaning-full", name: "Pro Dermaplaning Skin Treatment", duration: "55min", price: "R890", description: "A complete 55-minute Dermaplaning facial. Combines deep exfoliation with Dermalogica's professional serums and masques for glass-like skin." },
                    { id: "neurosculpt-full", name: "Neurosculpt", duration: "55min", price: "R1,250", description: "Advanced structural facial massage and treatment that lifts, tones, and sculpts facial muscles for a non-surgical facelift effect." },
                    { id: "luminfusion", name: "Luminfusion", duration: "55min", price: "R1,100", description: "A high-tech glow treatment that combines exfoliation, nano-infusion, and LED light therapy for unparalleled skin luminosity." },
                    { id: "melanopro-peel", name: "Melanopro Peel", duration: "55min", price: "R6,999", description: "A comprehensive clinical peel system for hyperpigmentation. Dramatically fades dark spots and sun damage for an even, radiant complexion." },
                    { id: "hydraderm", name: "Hydraderm", duration: "55min", price: "R1,400", description: "Deep hydration and resurfacing. Uses vortex technology to cleanse, extract, and hydrate simultaneously." },
                    { id: "pro-microneedling", name: "Pro Microneedling", duration: "55min", price: "R1,950", description: "Professional microneedling to stimulate collagen, refine texture, and fade scars. Delivering active ingredients deeper into the skin for maximum regeneration." },
                    { id: "nanoinfusion", name: "Nanoinfusion", duration: "55min", price: "R1,400", description: "Non-invasive transdermal serum delivery. Resurfaces and infuses active ingredients for instant glow and plumpness without downtime." },
                    { id: "ultra-calming-facial", name: "Ultra Calming Facial", duration: "1hr", price: "R810", description: "Targeted relief for sensitized skin. Calms flare-ups and provides long-lasting relief from redness and irritation." },
                    { id: "skin-clearing-facial", name: "Skin Clearing Facial", duration: "1hr", price: "R810", description: "Deep cleansing and purification for adult acne and congestion. Clears current breakouts and prevents future ones." },
                    { id: "age-smart-facial", name: "Age Smart Facial", duration: "1hr", price: "R810", description: "Revitalise mature skin. Targets the visible signs of ageing like loss of elasticity and dullness." },
                ],
            },
            {
                id: "peels",
                title: "Chemical Peels",
                items: [
                    { id: "pro-power-peel", name: "Pro Power Peel", duration: "55min", price: "R1,100", description: "Dermalogica's strongest peel. Customised to your skin goals — ageing, pigmentation, or acne — for dramatic resurfacing and renewal." },
                    { id: "power-peel-60", name: "Power Peel 60 min", duration: "1hr", price: "R990", description: "The full-strength resurfacing experience. A 60-minute multi-acid peel that transforms skin texture, fades pigmentation, and stimulates cell renewal." },
                    { id: "power-peel-30", name: "Power Peel 30 min", duration: "30min", price: "R720", description: "A rapid resurfacing treatment. Removes dead skin and instantly refines texture in just 30 minutes." },
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
        subtitle: "Permanent Hair Reduction",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpeg",
        subcategories: [
            {
                id: "ipl-face",
                title: "Face",
                items: [
                    { id: "ipl-full-face", name: "IPL Full Face Hair Removal", duration: "30min", price: "R882", description: "Permanently reduce all unwanted facial hair in one comprehensive session. Covers the full face including upper lip, chin, cheeks, and sideburns. Smooth, hair-free skin that lasts." },
                    { id: "ipl-full-face-neck", name: "IPL Full Face & Neck Hair Removal", duration: "45min", price: "R945", description: "Complete facial and neck hair removal. Ideal for those with hormonal hair growth or those who want a completely seamless finish." },
                    { id: "ipl-lip", name: "IPL Upper Lip Hair Removal", duration: "15min", price: "R270", description: "Say goodbye to upper lip hair for good. A quick 15-minute session that targets the hair follicle at the root for permanent reduction." },
                    { id: "ipl-chin", name: "IPL Chin Hair Removal", duration: "15min", price: "R270", description: "Permanently reduce stubborn chin hair with targeted IPL light energy. Quick, effective, and far more lasting than any temporary hair removal method." }, // Price inferred/kept? List doesn't have plain 'Chin'. It has 'beardline'. I'll keep it at R270 to match lip.
                    { id: "ipl-beardline", name: "IPL Beardline Hair Removal", duration: "30min", price: "R495", description: "Shape and define your beard line permanently. Reduces regrowth for a consistently sharp, clean look." },
                    { id: "ipl-neck", name: "IPL Neck Hair Removal", duration: "30min", price: "R495", description: "Remove unwanted neck hair for a cleaner profile. Great for tidying low hairlines or hormonal growth." },
                    { id: "ipl-neck-men", name: "IPL Neck Hair Removal (Men)", duration: "30min", price: "R585", description: "Targeted treatment for coarser male neck hair. Reduces razor burn and ingrown hairs caused by daily shaving." },
                ],
            },
            {
                id: "ipl-body",
                title: "Body",
                items: [
                    { id: "ipl-underarm", name: "IPL Underarm Hair Removal", duration: "15min", price: "R495", description: "One of our most popular treatments. Permanently reduce underarm hair so you can wear sleeveless with confidence every day." },
                    { id: "ipl-bikini-sides", name: "IPL Bikini Sides Hair Removal", duration: "30min", price: "R540", description: "Tidy the bikini line permanently. Removes hair along the bikini edges for a clean, confident look." },
                    { id: "ipl-brazilian", name: "IPL Brazilian Hair Removal", duration: "45min", price: "R765", description: "Permanent hair reduction across the full bikini area, leaving a small strip. Freedom from monthly waxing appointments." },
                    { id: "ipl-hollywood", name: "IPL Hollywood Hair Removal", duration: "45min", price: "R990", description: "Complete permanent hair removal from the entire intimate area. The ultimate in smooth, carefree confidence." },
                    { id: "ipl-full-leg", name: "IPL Full Leg Hair Removal", duration: "1hr", price: "R2,565", description: "Silky smooth legs from hip to ankle, permanently. Treat both full legs in one session and say farewell to shaving, waxing, and razor bumps." },
                    { id: "ipl-half-leg", name: "IPL Half Leg Hair Removal", duration: "45min", price: "R1,305", description: "Target the lower or upper leg for permanent hair reduction. Great for those who want smooth calves or thighs." },
                    { id: "ipl-full-arm", name: "IPL Full Arm Hair Removal", duration: "45min", price: "R1,440", description: "Permanently reduce arm hair from shoulder to wrist. Smooth, hair-free arms that always look and feel polished." },
                    { id: "ipl-half-arm", name: "IPL Half Arm Hair Removal", duration: "30min", price: "R765", description: "Target the lower or upper arm for permanent hair reduction. A focused treatment for specific areas." },
                    { id: "ipl-back", name: "IPL Full Back Hair Removal", duration: "45min", price: "R1,200", description: "Permanently eliminate back hair with a comprehensive IPL treatment. Restore confidence and comfort." }, // Keep old price? List: none (has men back wax). Keep old.
                    { id: "ipl-buttocks", name: "IPL Full Buttocks Hair Removal", duration: "45min", price: "R1,170", description: "Remove unwanted hair from the buttocks for a smooth, confident finish." },
                    { id: "ipl-stomach", name: "IPL Stomach Hair Removal", duration: "30min", price: "R765", description: "Remove hair from the stomach area. Ideal for a smooth torso contour." },
                    { id: "ipl-belly-button", name: "IPL Belly Button Hair Removal", duration: "15min", price: "R450", description: "Targeted hair removal for the navel line/snail trail." },
                    { id: "ipl-toes-feet", name: "IPL Toes & Feet Hair Removal", duration: "15min", price: "R450", description: "Eliminate stray hairs on toes and feet for a cleaner look in open shoes." },
                    { id: "tattoo-removal", name: "Tattoo Removal", duration: "1hr", price: "R450", description: "Laser tattoo removal session. Price may vary based on size and ink density." },
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
        image: "/images/make-up/expert-bridal-makeup-application.jpeg",
        subcategories: [
            {
                id: "makeup-services",
                title: "Services",
                items: [

                    { id: "bridal-makeup", name: "Bridal Makeup", duration: "1hr 30min", price: "R1,620", description: "Look breathtaking on your wedding day. Our bridal makeup is designed to photograph beautifully, last all day, and make you feel like the most radiant version of yourself. Includes a touch-up kit." },
                    { id: "evening-makeup", name: "Evening Makeup", duration: "1hr", price: "R594", description: "Professional makeup application for date nights, functions, or photoshoots. Flawless, long-lasting, and tailored to your style." },
                    { id: "day-makeup", name: "Day Makeup", duration: "1hr", price: "R486", description: "A fresh, natural makeup look perfect for daytime events or professional settings. Enhances your features without looking heavy." },
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
        image: "/images/lashes-brows/Hybrid-Brows-Permanent-makeup.png",
        subcategories: [
            {
                id: "medical-treatments",
                title: "Medical Treatments",
                items: [
                    { id: "vaginal-tightening", name: "Vaginal Tightening", duration: "1hr", price: "R4,950", description: "Non-surgical vaginal rejuvenation using advanced radiofrequency technology. Restores tone, improves sensitivity, and addresses laxity caused by childbirth or ageing — in a private, professional, and judgement-free environment." },
                    { id: "fractional-laser", name: "Fractional Laser Full Face", duration: "1hr", price: "R2,430", description: "Medical-grade skin resurfacing that targets fine lines, acne scars, enlarged pores, and uneven texture. Fractional laser creates controlled micro-injuries that trigger your skin's natural collagen repair process for dramatic, lasting improvement." },
                    { id: "plasmage", name: "Plasmage", duration: "1hr", price: "R899.10", description: "The non-surgical alternative to eyelid surgery. Plasmage uses plasma energy to tighten and lift loose skin around the eyes, neck, and face — visible tightening without going under the knife." },
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
        image: "/images/lashes-brows/dramatic-volume-eyelash-extensions.png",
        subcategories: [
            {
                id: "brows",
                title: "Brows",
                items: [
                    { id: "microblading", name: "Microblading", duration: "1hr 30min", price: "R1,350", description: "Ultra-fine hair strokes implanted into the skin to create perfectly natural-looking brows. Ideal for sparse, over-plucked, or uneven brows." },
                    { id: "powderpixel-brows", name: "Powderpixel Brows", duration: "1hr 30min", price: "R1,710", description: "A soft, powdery brow effect created with tiny dots of pigment. Gives the appearance of filled-in brows without looking drawn-on." },
                    { id: "hybrid-brows", name: "Hybrid Brows", duration: "2hr", price: "R1,710", description: "The best of both worlds. Hair strokes at the front for a natural look, shading through the body and tail for depth and definition." },
                    { id: "brow-henna", name: "Brow Henna", duration: "45min", price: "R423", description: "A natural alternative to tinting that tints both the hair and the skin beneath for a fuller, more defined look. Lasts longer than regular tint." },
                ],
            },
            {
                id: "lips",
                title: "Lips",
                items: [
                    { id: "full-lips-contour", name: "Full Lips Contour", duration: "2hr 30min", price: "R2,430", description: "Complete lip colour from liner to full pigmentation. Wake up with perfectly tinted, defined lips every day." },
                    { id: "lip-liner", name: "Lip Liner", duration: "1hr 30min", price: "R1,710", description: "Define and enhance your lip shape with a permanent liner that makes lips appear fuller and more symmetrical." },
                ],
            },
            {
                id: "eyes",
                title: "Eyes",
                items: [
                    { id: "eyeliner-top", name: "Eyeliner Top", duration: "1hr", price: "R720", description: "A permanent upper lash line that makes eyes appear larger, more defined, and always made-up." },
                    { id: "eyeliner-bottom", name: "Eyeliner Bottom", duration: "1hr", price: "R720", description: "Define the lower lash line for added depth and intensity without the smudge." },
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

                    { id: "chemical-peel", name: "Chemical Peel", duration: "1hr", price: "R809.10", description: "A targeted chemical peel to resurface and renew skin texture." },
                    { id: "collagen-facial", name: "Collagen Facial", duration: "1hr", price: "R799.20", description: "QMS's signature collagen boosting treatment for firm, plump skin." },
                    { id: "rejuvenating-facial", name: "Rejuvenating Facial", duration: "1hr", price: "R765", description: "Restores vitality and moisture to tired, dull skin." },
                    { id: "deep-pore-cleansing", name: "Deep Pore Cleansing Facial", duration: "1hr", price: "R675", description: "Deeply purifies pores and balances oil production." },
                    { id: "basic-facial", name: "Basic Facial", duration: "1hr", price: "R657", description: "A classic maintenance facial for hydration and relaxation." },
                    { id: "activator-treatment", name: "Activator Treatment", duration: "1hr", price: "R648", description: "Intensive activation treatment to kickstart skin renewal." },
                    { id: "sensitive-skin-facial", name: "Sensitive Skin Facial", duration: "1hr", price: "R540", description: "Calming treatment specifically for reactive and sensitive skin." },
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
        image: "/images/gallery/Specials/galeo-beauty-nail-specials-price-list.jpeg",
        subcategories: [
            {
                id: "tanning-sessions",
                title: "Tanning Sessions",
                items: [

                    { id: "spraytan", name: "Spraytan", duration: "20min", price: "R486", description: "A flawless, streak-free spray tan for a natural golden glow. Customized to your skin tone." },
                    { id: "sunbed-20", name: "Sunbed 20 Sessions", duration: "N/A", price: "R630", description: "A 20-session package for regular tanners who want ongoing maintenance." },
                    { id: "sunbed-10", name: "Sunbed 10 Sessions", duration: "N/A", price: "R315", description: "Course of 10 sessions to build a lasting tan." },
                    { id: "sunbed-session", name: "Sunbed Per Session", duration: "20min", price: "R54", description: "Single high-performance tanning session." },
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
        image: "/images/waxing/full-leg-wax-salon-service.jpeg",
        subcategories: [
            {
                id: "face-wax",
                title: "Face",
                items: [
                    { id: "wax-eyebrow", name: "Eyebrow Wax", duration: "15min", price: "R108", description: "Clean, defined brows." }, // Derived from Ear wax price? No, list doesn't have eyebrow wax. Wait, it doesn't? Code has R100. List has nose, ear, lip, cheek. Missing eyebrow! I will keep R100 or update roughly. I'll leave R100. Actually list has NO eyebrow wax? It MUST have. I'll keep it R100.
                    { id: "wax-lip", name: "Lip Wax", duration: "10min", price: "R90", description: "Quick upper lip hair removal." },
                    { id: "wax-cheek", name: "Cheek Wax", duration: "15min", price: "R157.50", description: "Smooth cheeks and sideburns." },
                    { id: "wax-nose", name: "Nose Wax", duration: "10min", price: "R81", description: "Removal of nose hair." },
                    { id: "wax-ear", name: "Ear Wax", duration: "10min", price: "R108", description: "Removal of ear hair." },
                    { id: "wax-chin", name: "Chin Wax", duration: "10min", price: "R80", description: "Chin hair removal." }, // Keeping old price as list doesn't specifiy
                    { id: "wax-full-face", name: "Full Face Wax", duration: "30min", price: "R280", description: "Complete facial waxing." }, // Keeping old price
                ],
            },
            {
                id: "body-wax",
                title: "Body",
                items: [
                    { id: "wax-full-leg", name: "Full Leg Wax", duration: "45min", price: "R486", description: "Silky smooth legs from hip to ankle." },
                    { id: "wax-half-leg", name: "Half Leg Wax", duration: "30min", price: "R261", description: "Lower or upper leg wax." },
                    { id: "wax-hollywood", name: "Hollywood Wax", duration: "45min", price: "R450", description: "Complete intimate hair removal." },
                    { id: "wax-brazilian", name: "Brazilian Wax", duration: "45min", price: "R387", description: "Intimate waxing with a strip remaining." },
                    { id: "wax-underarm", name: "Underarm Wax", duration: "15min", price: "R157.50", description: "Smooth underarms." },
                    { id: "wax-full-arm", name: "Full Arm Wax", duration: "30min", price: "R234", description: "Hair removal from shoulder to wrist." },
                    { id: "wax-half-arm", name: "Half Arm Wax", duration: "20min", price: "R130.50", description: "Lower or upper arm wax." },
                    { id: "wax-full-back", name: "Full Back Wax", duration: "30min", price: "R261", description: "Complete back hair removal." },
                    { id: "wax-half-back", name: "Half Back Wax", duration: "20min", price: "R225", description: "Upper or lower back wax." },
                    { id: "wax-men-back", name: "Men Back Wax", duration: "30min", price: "R522", description: "Back waxing for men." },
                    { id: "wax-chest", name: "Chest Wax", duration: "30min", price: "R216", description: "Chest hair removal." },
                    { id: "wax-tummy", name: "Full Tummy Wax", duration: "30min", price: "R180", description: "Stomach hair removal." },
                    { id: "wax-butt", name: "Butt Wax", duration: "30min", price: "R180", description: "Buttocks hair removal." },
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
        image: "/images/gallery/Laser-and-IPL/ipl-laser-hair-removal-underarm-treatment.jpeg",
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
                    { id: "blow-medium", name: "Blow Dry (Medium)", duration: "45min", price: "R315", description: "Smooth, bouncy finish for shoulder-length hair." },
                    { id: "blow-long", name: "Blow Dry (Long)", duration: "1hr", price: "R351", description: "Sleek straight or Hollywood waves for long hair." },
                    { id: "blow-xl", name: "Blow Dry (Extra Long)", duration: "1hr 15min", price: "R405", description: "Professional styling for very long or thick hair." },

                    // Kids & Pensioners
                    { id: "cut-pensioner", name: "Pensioner Cut", duration: "30min", price: "R225", description: "Standard cut for seniors." },
                    { id: "cut-0-5-boys", name: "Cut 0-5yrs (Boys)", duration: "20min", price: "R126", description: "Gentle trim for little ones." },
                    { id: "cut-0-5-girls", name: "Cut 0-5yrs (Girls)", duration: "20min", price: "R153", description: "Gentle trim for little ones." },
                    { id: "cut-6-12-boys", name: "Cut 6-12yrs (Boys)", duration: "30min", price: "R153", description: "School cut for boys." },
                    { id: "cut-6-12-girls", name: "Cut 6-12yrs (Girls)", duration: "30min", price: "R189", description: "Trim and tidy for girls." },
                    { id: "cut-13-18-boys", name: "Cut 13-18yrs (Boys)", duration: "30min", price: "R180", description: "Teen cut for boys." },
                    { id: "cut-13-18-girls", name: "Cut 13-18yrs (Girls)", duration: "45min", price: "R225", description: "Teen cut for girls." },

                    // Upstyles
                    { id: "upstyle-short", name: "Upstyle (Short)", duration: "45min", price: "R540", description: "Creative styling for shorter lengths." },
                    { id: "upstyle-medium", name: "Upstyle (Medium)", duration: "1hr", price: "R630", description: "Elegant pinned styles for special occasions." },
                    { id: "upstyle-long", name: "Upstyle (Long)", duration: "1hr 15min", price: "R720", description: "Intricate bridal or matric dance styling." },
                ],
            },
            {
                id: "hair-color",
                title: "Colour & Foils",
                items: [
                    // Tints
                    { id: "tint-roots", name: "Root Tint", duration: "1hr", price: "R522", description: "Cover greys or regrowth." },
                    { id: "tint-short", name: "Full Tint (Short)", duration: "1hr 15min", price: "R594", description: "All-over colour for short hair." },
                    { id: "tint-medium", name: "Full Tint (Medium)", duration: "1hr 30min", price: "R702", description: "Rich, vibrant colour for medium lengths." },
                    { id: "tint-long", name: "Full Tint (Long)", duration: "1hr 45min", price: "R810", description: "Full head colour application for long hair." },
                    { id: "tint-xl", name: "Full Tint (Extra Long)", duration: "2hr", price: "R954", description: "Complete colour transformation for extra long hair." },

                    // Foils
                    { id: "foil-per", name: "Per Foil", duration: "15min", price: "R63", description: "Individual foil placement." },
                    { id: "highlights-full-short", name: "Full Head Foils (Short)", duration: "1hr 30min", price: "R873", description: "Brighten your entire look with full highlights." },
                    { id: "highlights-full-medium", name: "Full Head Foils (Medium)", duration: "2hr", price: "R1,107", description: "Dimensional blonde or colour for medium hair." },
                    { id: "highlights-full-long", name: "Full Head Foils (Long)", duration: "2hr 30min", price: "R1,287", description: "Full head lightening for long hair." },
                    { id: "highlights-full-xl", name: "Full Head Foils (Ex Long)", duration: "3hr", price: "R1,377", description: "Maximum impact highlights for extra long hair." },
                    { id: "highlights-half-short", name: "Half Head Foils (Short)", duration: "1hr", price: "R666", description: "Refresh your top section and crown." },
                    { id: "highlights-half-medium", name: "Half Head Foils (Medium)", duration: "1hr 30min", price: "R819", description: "Natural dimension for the top layers." },
                    { id: "highlights-half-long", name: "Half Head Foils (Long)", duration: "1hr 45min", price: "R927", description: "Sun-kissed look for long hair." },
                    { id: "highlights-half-xl", name: "Half Head Foils (Ex Long)", duration: "2hr", price: "R1,026", description: "Brighten up the front and crown." },

                    // Techniques
                    { id: "balayage", name: "Balayage", duration: "2hr 30min", price: "R765", description: "Freehand painting for a natural, lived-in blonde." },
                    { id: "toner-short", name: "Toner (Short)", duration: "30min", price: "R450", description: "Correct brassiness and add shine." },
                    { id: "toner-medium", name: "Toner (Medium)", duration: "30min", price: "R540", description: "Refresh tone on medium hair." },
                    { id: "toner-long", name: "Toner (Long)", duration: "45min", price: "R630", description: "Perfect shade for long blondes." },
                    { id: "toner-xl", name: "Toner (Extra Long)", duration: "45min", price: "R720", description: "Even tone for extra long hair." },
                ],
            },
            {
                id: "hair-treatments",
                title: "Treatments & Brazilian",
                items: [
                    { id: "brazilian-short", name: "Brazilian Blowout (Short)", duration: "1hr 30min", price: "R990", description: "Smooth, frizz-free hair for up to 3 months." },
                    { id: "brazilian-medium", name: "Brazilian Blowout (Medium)", duration: "2hr", price: "R1,215", description: "Sleek, manageable medium length hair." },
                    { id: "brazilian-long", name: "Brazilian Blowout (Long)", duration: "2hr 30min", price: "R1,530", description: "Transform coarse or frizzy long hair." },
                    { id: "brazilian-xl", name: "Brazilian Blowout (Ex Long)", duration: "3hr", price: "R1,800", description: "Ultimate smoothing for extra long, thick hair." },
                    { id: "botox", name: "Hair Botox", duration: "1hr", price: "R810", description: "Deep conditioning anti-ageing treatment." },
                    { id: "keratin", name: "Keratin Treatment", duration: "1hr", price: "R585", description: "Strengthen and smooth damaged hair." },
                    { id: "vital", name: "Vital Treatment", duration: "30min", price: "R153", description: "Essential nutrient boost." },
                    { id: "silver", name: "Silver Treatment", duration: "15min", price: "R108", description: "Neutralise yellow tones." },
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
        image: "/images/gallery/Nails/nude-almond-gel-nails-galeo-beauty-salon.jpeg",
        subcategories: [
            {
                id: "hands-feet",
                title: "Hands & Feet",
                items: [
                    { id: "gel-overlay-hands", name: "Gel Overlay (Hands)", duration: "1hr", price: "R342", description: "Strengthen natural nails with a durable gel coating." },
                    { id: "gel-tips", name: "Gel & Tips", duration: "1hr 30min", price: "R414", description: "Length extension with tips and strong gel overlay." },
                    { id: "acrylic-overlay", name: "Acrylic Overlay", duration: "1hr 15min", price: "R414", description: "Hard-wearing acrylic coating for natural nails." },
                    { id: "acrylic-tips", name: "Acrylic Tips", duration: "1hr 45min", price: "R432", description: "Classic durable extensions." },
                    { id: "rubber-base", name: "Rubber Base", duration: "1hr", price: "R360", description: "Flexible, strong base for natural nails." },
                    { id: "rubber-base-toes", name: "Rubber Base (Toes)", duration: "1hr", price: "R342", description: "Long-lasting rubber base for toes." },
                    { id: "sculpted-forms", name: "Sculpted with Forms", duration: "2hr", price: "R495", description: "Custom sculpted extensions without tips." },
                    { id: "designer-nails", name: "Designer Nails", duration: "2hr", price: "R450", description: "Intricate art and custom shaping." },
                    { id: "gel-toes", name: "Gel Toes", duration: "45min", price: "R297", description: "Chip-free colour for your toes." },
                    { id: "mani-pedi-combo", name: "Mani & Pedi Combo", duration: "2hr", price: "R477", description: "Complete package for hands and feet." },
                    { id: "full-manicure", name: "Manicure", duration: "45min", price: "R225", description: "Cuticle work, shape, and paint." },
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
        image: "/images/lashes-brows/eyebrow-microblading-hair-strokes-transformation.png",
        subcategories: [
            {
                id: "lashes-brows-all",
                title: "All",
                items: [
                    { id: "classic-lashes", name: "Classic Lashes", duration: "1hr 30min", price: "R450", description: "One extension applied to one natural lash. Clean, natural definition." },
                    { id: "volume-lashes", name: "Volume Lashes", duration: "2hr", price: "R540", description: "Multiple fine lashes per natural lash for fluffier volume." },
                    { id: "glamour-lashes", name: "Glamour Lashes", duration: "2hr", price: "R630", description: "High impact, dramatic volume." },
                    { id: "silk-lashes", name: "Silk Lashes", duration: "1hr 30min", price: "R540", description: "Soft, glossy finish for a natural look." },
                    { id: "hybrid-lashes", name: "Hybrid Lashes", duration: "1hr 45min", price: "R500", description: "Mix of classic and volume for textured density." },
                    { id: "lash-fill-2", name: "Lash Fill (2 Week)", duration: "1hr", price: "R270", description: "Maintenance fill at 2 weeks." },
                    { id: "lash-fill-3", name: "Lash Fill (3 Week)", duration: "1hr 15min", price: "R315", description: "Maintenance fill at 3 weeks." },
                    { id: "lash-lift-tint", name: "Lash Lift & Tint", duration: "45min", price: "R405", description: "Curl and darken natural lashes for an open-eyed look." },
                    { id: "lash-lamination", name: "Lash Lamination", duration: "45min", price: "R405", description: "Advanced lifting treatment for thicker, darker looking lashes." },
                    { id: "lash-tint", name: "Lash Tint", duration: "15min", price: "R99", description: "Darken pale lashes." },
                    { id: "brow-tint", name: "Brow Tint", duration: "15min", price: "R90", description: "Define brows with colour." },
                    { id: "lash-removal", name: "Lash Removal", duration: "30min", price: "R135", description: "Safe removal of extensions." },
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


