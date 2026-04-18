import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content/intent-pages");

// Make sure the directory exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

const HAIR_QUERIES = [
    "how to fix damaged hair", "how to grow hair faster", "best treatment for frizzy hair",
    "why hair is not growing", "how to stop hair breakage", "keratin vs brazilian blowout",
    "keratin vs hair botox", "what is a keratin treatment", "what is hair botox",
    "how often should you wash your hair", "best oils for hair growth", "how to moisturize dry hair",
    "how to repair heat damaged hair", "how to maintain hair extensions",
    "how long does a keratin treatment last", "how long does hair botox last",
    "how to reduce frizz naturally", "what causes dry hair", "best hairstyles for damaged hair",
    "how to care for curly hair", "how to care for straight hair", "how to care for 4c hair",
    "difference between curly and coily hair", "best products for frizzy hair",
    "how to detangle hair properly", "how to avoid split ends", "how to strengthen weak hair",
    "how to protect hair at night", "how to wash hair correctly", "how to treat scalp dryness",
    "best treatments for thinning hair", "how to prevent hair loss", "how to grow edges back",
    "how to maintain relaxed hair", "how to take care of natural hair", "how to reduce hair shedding",
    "how to use hair masks", "how to fix over-processed hair", "how to fix bleached hair",
    "best treatments for damaged hair", "what is a brazilian blowout", "how to make hair soft and shiny",
    "how to deal with oily hair", "how to maintain colored hair", "best hairstyles for frizzy hair",
    "how to prevent breakage in 4c hair", "how to keep braids fresh", "how to maintain wigs",
    "how to choose the right hairstyle", "how to improve hair texture"
];

const SKIN_QUERIES = [
    "best facial for acne", "how to get clear skin", "what is microneedling",
    "what is a collagen facial", "how to remove dark spots", "how to treat acne",
    "how to reduce wrinkles", "best skincare routine for oily skin",
    "best skincare routine for dry skin", "how often should you do facials",
    "benefits of facials", "how to exfoliate skin properly", "how to hydrate your skin",
    "what causes acne", "how to treat hyperpigmentation", "best treatments for aging skin",
    "how to prevent acne", "how to reduce pores", "best treatments for glowing skin",
    "how to improve skin texture", "what is IPL treatment", "how IPL works",
    "benefits of microneedling", "microneedling vs facial", "chemical peel vs facial",
    "how to treat sensitive skin", "best anti-aging treatments", "how to remove blackheads",
    "how to treat oily skin", "how to treat dry skin", "how to remove acne scars",
    "how to brighten skin", "how to care for your skin daily", "how to choose the right facial",
    "best treatments for dull skin", "how to improve skin tone", "how to prevent wrinkles",
    "how to reduce dark circles", "how to treat uneven skin tone", "how to get glowing skin naturally",
    "how to treat sun damage", "how to repair skin barrier", "how to treat pigmentation",
    "how to clean your skin properly", "how to maintain healthy skin", "how to reduce redness",
    "how to treat acne scars", "how to use serums", "how to use sunscreen properly",
    "how to build a skincare routine"
];

const BEAUTY_QUERIES = [
    "gel nails vs acrylic nails", "how long do lash extensions last", "lash lift vs extensions",
    "what is brow henna", "how long does brow henna last", "how to take care of nails",
    "how to maintain lashes", "best nail shapes", "how to remove gel nails safely",
    "how to strengthen nails", "how to prevent nail breakage", "how to care for acrylic nails",
    "how to maintain gel nails", "how to clean nails properly", "how to grow nails faster",
    "how to remove acrylic nails", "how to choose lash extensions", "how to maintain lash extensions",
    "how to prepare for a facial", "how to prepare for a nail appointment",
    "how to prepare for lash appointment", "how to choose a salon", "what to expect at a salon",
    "how to get long-lasting nails", "how to prevent lash damage", "how to fix broken nails",
    "how to remove lash extensions", "how to choose nail colors", "how to maintain pedicure",
    "how to care for feet", "best nail designs", "how to maintain brow henna",
    "how to shape eyebrows", "how to maintain eyebrow tint", "how to choose beauty treatments",
    "how to prepare for waxing", "how to reduce waxing pain", "how to care after waxing",
    "how to prevent ingrown hairs", "waxing vs shaving", "how to choose waxing type",
    "how to maintain smooth skin", "how to care for lashes after lift", "how to prepare for IPL",
    "what to expect after IPL", "how to maintain IPL results", "how to choose beauty products",
    "how to maintain beauty results", "how to improve appearance", "beauty tips for beginners"
];

function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function toSlug(str: string): string {
    return str.toLowerCase().trim().replace(/\s+/g, '-');
}

function getSystemCategory(queueId: string): string {
    if (queueId === "HAIR") return "hair";
    if (queueId === "SKIN") return "dermalogica";
    if (queueId === "BEAUTY") return "nails";
    return "hair";
}

function getImage(queueId: string): string {
    if (queueId === "HAIR") return "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg";
    if (queueId === "SKIN") return "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg";
    if (queueId === "BEAUTY") return "/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg";
    return "/images/gallery/hair/blowdry-styling-session-two-stylists-salon.jpg";
}

function processQueries(queries: string[], categoryLabel: string) {
    let created = 0;
    
    for (const query of queries) {
        const slug = toSlug(query);
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
        
        // Skip if it already exists to prevent accidental overwrites
        if (fs.existsSync(filePath)) continue;

        const title = toTitleCase(query);
        const metaDescription = `Complete guide evaluating ${query}. Gain expert insights and tips from the professionals at Galeo Beauty.`;
        
        const mdxTemplate = `---
slug: ${slug}
title: "${title}"
metaTitle: "${title} | Galeo Beauty Guide"
metaDescription: "${metaDescription}"
h1: "${title}"
eyebrow: "${categoryLabel} Care Guide"
heroDescription: "Everything you need to know about ${query}, explained by the professionals."
heroImage: "${getImage(categoryLabel)}"
heroImageAlt: "${title}"
primaryKeywords:
  - "${query}"
  - "expert ${categoryLabel.toLowerCase()} tips"
supportingKeywords:
  - "${categoryLabel.toLowerCase()} routine"
symptoms: []
results: []
comparisons: []
objections: []
audiences: []
whyItHappens: "When it comes to your ${categoryLabel.toLowerCase()} care, having the right routine is essential. In this guide, we break down exactly how you should approach this."
treatmentApproach: "Read our comprehensive professional advice below."
bestFor: []
faqs: []
categoryIds:
  - "${getSystemCategory(categoryLabel)}"
serviceSlugs: []
published: false
qualityStatus: "draft"
---

## Understanding ${title}
(Please add your article content here)

## Our Professional Advice
(Please add your article content here)
`;

        fs.writeFileSync(filePath, mdxTemplate, "utf-8");
        created++;
    }
    
    console.log(`Generated ${created} new generic queries for ${categoryLabel}`);
}

processQueries(HAIR_QUERIES, "HAIR");
processQueries(SKIN_QUERIES, "SKIN");
processQueries(BEAUTY_QUERIES, "BEAUTY");
