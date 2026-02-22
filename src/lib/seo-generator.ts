import { ServiceItem } from './services-data';

// ==========================================
// SEEDED RANDOM NUMBER GENERATOR
// ==========================================

/**
 * Creates a simple 32-bit hash from a string to use as a seed
 */
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

/**
 * Pseudo-random number generator (Mulberry32)
 * Ensures the same location+service ALWAYS generates the exact same content,
 * but different combinations yield completely different content.
 */
function createSeededRandom(seed: number) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// ==========================================
// SPINTAX PARSER
// ==========================================

/**
 * Parses Spintax formatted strings: "I {love|like|enjoy} {coding|programming}."
 * Picks options consistently based on the provided random function.
 */
function parseSpintax(text: string, randomFn: () => number): string {
    const spintaxRegex = /\{([^{}]*)\}/g;

    // Check if there are any spintax blocks left
    if (!spintaxRegex.test(text)) {
        return text;
    }

    // Replace innermost spintax blocks first (allows nesting if we ever need it)
    const result = text.replace(spintaxRegex, (match, contents) => {
        const options = contents.split('|');
        // Pick an option using the seeded randomizer
        const choiceIndex = Math.floor(randomFn() * options.length);
        return options[choiceIndex];
    });

    // Recursively parse in case of nested spintax
    return parseSpintax(result, randomFn);
}


// ==========================================
// DESCRIPTIONS GENERATOR
// ==========================================

/**
 * Generates a highly unique, seeded description for a service.
 * Mixes spintax templates based on the category.
 */
export function generateServiceDescription(
    item: ServiceItem,
    categoryTitle: string,
    locationName: string // Need location name for the seed
): string {
    // If the item already has a hardcoded description, use that as the base but maybe wrap it slightly.
    // However, to ensure maximum uniqueness for SEO, we should prioritize our spintax templates.
    const hasCustomDesc = item.description && item.description.length > 10;

    // Create a unique deterministic seed for this specific combination
    const seed = hashString(`${locationName}-${item.id}-${categoryTitle}`);
    const random = createSeededRandom(seed);

    const nameLower = item.name.toLowerCase();
    let template = "";

    // -- HAIR EXTENSIONS SPINTAX --
    if (categoryTitle.includes("Hair Extensions") || nameLower.includes("extensions")) {
        const lengthMatch = nameLower.match(/(\d+)cm/);
        const length = lengthMatch ? lengthMatch[1] + "cm" : "";

        template = `{Transform|Instantly elevate|Upgrade} your {look|style|appearance} with our {premium|luxury|top-tier|exclusive} **${item.name}**. ` +
            `These {high-quality|professional-grade|salons-quality} extensions are {perfect|ideal|designed} for {adding|creating} {luxurious|stunning|beautiful} {volume|thickness} and {length|body}${length ? ` (${length})` : ""}. ` +
            `{Made|Crafted} from {100%|Double Drawn} {European |}Remy Human Hair, they {ensure|guarantee|deliver} a {seamless|flawless|perfect|natural} {blend|match|integration}. ` +
            `{Whether you want|Perfect for} {everyday glamour|daily wear} or a {special occasion|wedding|matric dance}, these extensions provide a {comfortable|secure} fit. ` +
            `{Available|Book today|Secure your appointment} from just **${item.price}**.`;
    }

    // -- LASHES & BROWS SPINTAX --
    else if (categoryTitle.includes("Lash") || categoryTitle.includes("Brow") || nameLower.includes("microblading")) {
        template = `{Enhance|Highlight|Define} your natural {features|beauty|look} with our {expert|professional|precision} **${item.name}**. ` +
            `We focus on {precision|detail|symmetry} to {frame your face perfectly|enhance your eye shape|create a flawless look}. ` +
            `Using {gentle, high-quality products|premium materials|industry-leading techniques}, we ensure a {comfortable experience|relaxing session} and {stunning|beautiful|striking}, {long-lasting|durable} results. ` +
            `{Simplify|Streamline|Cut down} your {daily|morning} {beauty routine|makeup application} with this {transformative|popular|must-have} treatment. ` +
            `{Prices start at|Available for|Book your session for} **${item.price}**.`;
    }

    // -- SKINCARE / FACIALS / AESTHETICS SPINTAX --
    else if (categoryTitle.includes("Skin") || categoryTitle.includes("Facial") || categoryTitle.includes("Medical")) {
        template = `{Rejuvenate|Revitalize|Refresh|Transform} your {skin|complexion} with our {specialized|advanced|clinical-grade} **${item.name}**. ` +
            `{Carefully designed|Specifically tailored|Expertly formulated} to target {specific skin concerns|your unique needs|stubborn skin issues}, this {professional|medical-grade} treatment uses {advanced protocols|premium formulations|cutting-edge techniques} to {hydrate|brighten|restore|renew} your {complexion|skin barrier}. ` +
            `{Ideal|Perfect|Excellent} for {maintaining healthy skin|addressing problem areas|anti-aging prevention|achieving that radiant glow} in a {relaxing|clinical, safe|luxurious} spa environment. ` +
            `{Priced at|Available from|Invest in your skin from} **${item.price}**.`;
    }

    // -- NAILS SPINTAX --
    else if (categoryTitle.includes("Nail") || nameLower.includes("pedicure") || nameLower.includes("manicure") || nameLower.includes("gel")) {
        template = `{Treat|Pamper} your hands and feet to our {professional|signature|flawless} **${item.name}**. ` +
            `Using {top-tier products|premium brands|high-quality gels}, our {experienced|skilled} technicians ensure {long-lasting results|chip-free wear|stunning durability} and {pristine cuticle care|perfect prep}. ` +
            `{Whether you need a durability boost|If you are looking for gorgeous everyday wear|Preparing for a special event}, this treatment delivers the {perfect|ultimate|flawless} finish. ` +
            `{Look polished|Feel put-together|Treat yourself} for **${item.price}**.`;
    }

    // -- BODY / SLIMMING --
    else if (categoryTitle.includes("Fat") || categoryTitle.includes("Slimming")) {
        template = `{Sculpt|Contour|Reshape} your body with our {advanced|non-invasive|cutting-edge} **${item.name}**. ` +
            `This {targeted|specialized} treatment is {designed|proven} to {reduce stubborn fat|tone muscle|improve body contours} {effectively|safely|without surgery}. ` +
            `{Experience visible results|Achieve your body goals|Target localized problem areas} with {minimal|zero} downtime. ` +
            `{Start your journey|Book your consultation|Transform your silhouette} from **${item.price}**.`;
    }

    // -- GENERIC FALLBACK SPINTAX --
    else {
        template = `{Experience|Discover|Enjoy} the {best|ultimate|finest} **${item.name}** at Galeo Beauty. ` +
            `Part of our {professional|premium|exclusive} **${categoryTitle}** {range|collection}, this {treatment|service} is {carefully designed|tailored} to {enhance your beauty and confidence|make you look and feel your best}. ` +
            `{Book your appointment today|Secure your spot|Treat yourself today} for {just|only} **${item.price}**.`;
    }

    // If there is a manual description, we can prepend it or mix it in. For highly dynamic SEO, parsing the spintax is better.
    let finalDesc = parseSpintax(template, random);

    if (hasCustomDesc) {
        // Prepend the manual description occasionally, or just stick to the Spintax for uniformity & uniqueness
        const prepend = random() > 0.5;
        if (prepend) {
            finalDesc = `${item.description} ${finalDesc}`;
        } else {
            finalDesc = `${finalDesc} ${item.description}`;
        }
    }

    return finalDesc;
}

// ==========================================
// DYNAMIC BENEFITS GENERATOR
// ==========================================

export function generateServiceBenefits(categoryTitle: string, subcategoryTitle: string): string[] {
    // This is a simplified fallback if used elsewhere
    return [
        "Professional certified service",
        "Premium quality products",
        "Relaxing environment",
        "Satisfaction guaranteed",
        "Personalized consultation"
    ];
}
