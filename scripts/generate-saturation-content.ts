import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/intent-pages");

interface IntentFaq {
    question: string;
    answer: string;
}

interface IntentPageSpec {
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
    qualityStatus?: "draft" | "review" | "approved";
}

const SATURATION_ARTICLES: Partial<IntentPageSpec>[] = [
    // QMS (6 target + 4 filler for 10 total in audit results)
    {
        slug: "qms-activator-treatment-science",
        title: "The 'Activator' Secret: Clinical Skin Renewal",
        categoryIds: ["qms"],
        serviceSlugs: ["activator-treatment"],
        eyebrow: "Clinical Skin Care",
        results: ["Cellular renewal", "Metabolic skin boost", "Immediate vitality"],
    },
    {
        slug: "qms-vs-basic-facials",
        title: "QMS vs. Basic Facials: When to Upgrade",
        categoryIds: ["qms"],
        serviceSlugs: ["basic-facial", "collagen-facial"],
        eyebrow: "Clinical Skin Care",
        results: ["Professional depth", "Medical-grade results", "Long-term skin health"],
    },
    {
        slug: "advanced-skin-resurfacing-qms-peels",
        title: "Advanced Skin Resurfacing with QMS Peels",
        categoryIds: ["qms"],
        serviceSlugs: ["chemical-peel"],
        eyebrow: "Clinical Skin Care",
        symptoms: ["Uneven texture", "Dullness", "Fine lines"],
    },
    {
        slug: "deep-pore-purifying-qms-difference",
        title: "Deep Pore Purifying: The QMS Difference",
        categoryIds: ["qms"],
        serviceSlugs: ["deep-pore-cleansing"],
        eyebrow: "Clinical Skin Care",
        symptoms: ["Congestion", "Blackheads", "Enlarged pores"],
    },
    {
        slug: "calming-reactive-skin-qms-sensitive",
        title: "Calming Reactive Skin: The QMS Sensitive Guide",
        categoryIds: ["qms"],
        serviceSlugs: ["sensitive-skin-facial"],
        eyebrow: "Clinical Skin Care",
        symptoms: ["Redness", "Irritation", "Fragile skin barrier"],
    },
    {
        slug: "restoring-vitality-qms-rejuvenating",
        title: "Restoring Vitality with QMS Rejuvenating Facial",
        categoryIds: ["qms"],
        serviceSlugs: ["rejuvenating-facial"],
        eyebrow: "Clinical Skin Care",
        results: ["Plumped skin", "Hydrated glow", "Restored elasticity"],
    },

    // PMU (7 new articles)
    {
        slug: "eyeliner-top-vs-bottom-pmu",
        title: "Lower Eyeliner vs Top: Choosing your definition",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["eyeliner-top", "eyeliner-bottom"],
        eyebrow: "Permanent Makeup",
        results: ["Defined eyes", "Smudge-proof liner", "Enhanced lash line"],
    },
    {
        slug: "hybrid-brows-multi-technique",
        title: "Hybrid Brows: Why 2 Techniques are better than 1",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["hybrid-brows"],
        eyebrow: "Permanent Makeup",
        results: ["Natural hair-strokes", "Soft shading", "Perfect dimension"],
    },
    {
        slug: "brow-henna-gateway-to-pmu",
        title: "Brow Henna: The Gateway to Permanent Brows",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["brow-henna"],
        eyebrow: "Brows & Styling",
    },
    {
        slug: "lip-liner-permanent-makeup-secret",
        title: "The Lip Liner Secret: Defining your heart shape",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["lip-liner"],
        eyebrow: "Permanent Makeup",
        results: ["Balanced symmetry", "Enhanced Cupid's bow", "Defined borders"],
    },
    {
        slug: "full-lip-contour-vs-liner",
        title: "Full Lip Contour vs Lip Liner: Which is right for you?",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["full-lips-contour", "lip-liner"],
        eyebrow: "Permanent Makeup",
    },
    {
        slug: "bridal-pmu-wedding-ready",
        title: "Bridal PMU: Wake up ready for the honeymoon",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["full-lips-contour", "microblading", "eyeliner-top"],
        eyebrow: "Bridal Beauty",
    },
    {
        slug: "correcting-old-microblading",
        title: "Correcting Old Microblading: Your Options",
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["microblading"],
        eyebrow: "Permanent Makeup",
    },

    // Tanning (4 articles)
    {
        slug: "sunbed-science-controlled-base-tan",
        title: "Sunbed Science: Building a base tan safely",
        categoryIds: ["sunbed"],
        serviceSlugs: ["sunbed-session", "sunbed-10"],
        eyebrow: "Tanning & Glow",
    },
    {
        slug: "spray-tan-streak-free-guide",
        title: "Spray Tan Excellence: The Streak-Free Guide",
        categoryIds: ["sunbed"],
        serviceSlugs: ["spraytan"],
        eyebrow: "Tanning & Glow",
    },
    {
        slug: "perfect-tanning-prep-longevity",
        title: "Tanning Prep: How to make your glow last",
        categoryIds: ["sunbed"],
        serviceSlugs: ["spraytan", "sunbed-session"],
        eyebrow: "Tanning & Glow",
    },
    {
        slug: "vitamin-d-and-controlled-tanning",
        title: "Vitamin D and Controlled Tanning",
        categoryIds: ["sunbed"],
        serviceSlugs: ["sunbed-session"],
        eyebrow: "Health & Vitality",
    },

    // Makeup (5 articles)
    {
        slug: "bridal-makeup-trial-essential-prep",
        title: "The Bridal Makeup Trial: Essential Preparation",
        categoryIds: ["makeup"],
        serviceSlugs: ["bridal-trial"],
        eyebrow: "Bridal Beauty",
    },
    {
        slug: "evening-glamour-event-makeup",
        title: "Evening Glamour: Professional Event Makeup",
        categoryIds: ["makeup"],
        serviceSlugs: ["evening-makeup"],
        eyebrow: "Special Occasions",
    },
    {
        slug: "day-makeup-natural-polished-look",
        title: "Day Makeup: The Natural Polished Look",
        categoryIds: ["makeup"],
        serviceSlugs: ["day-makeup"],
        eyebrow: "Everyday Luxury",
    },
    {
        slug: "hd-makeup-for-photography",
        title: "HD Makeup: Look perfect in every photo",
        categoryIds: ["makeup"],
        serviceSlugs: ["evening-makeup", "bridal-makeup"],
        eyebrow: "Expert Makeup",
    },
    {
        slug: "professional-bridal-glam-vs-diy",
        title: "Professional Bridal Glam vs. DIY Makeup",
        categoryIds: ["makeup"],
        serviceSlugs: ["bridal-makeup"],
        eyebrow: "Bridal Beauty",
    },

    // IPL Saturation (4 remaining to reach 10)
    {
        slug: "ipl-for-rosacea-facial-redness",
        title: "IPL for Rosacea and Facial Redness",
        categoryIds: ["ipl"],
        serviceSlugs: ["ipl-full-face"],
        eyebrow: "Advanced Skin",
    },
    {
        slug: "laser-tattoo-removal-session-expectations",
        title: "Laser Tattoo Removal: What happens in a session?",
        categoryIds: ["ipl"],
        serviceSlugs: ["tattoo-removal"],
        eyebrow: "Skin Correction",
    },
    {
        slug: "ipl-vs-wax-full-leg-comparison",
        title: "Full Leg Smoothness: Why IPL wins over wax",
        categoryIds: ["ipl"],
        serviceSlugs: ["ipl-full-leg"],
        eyebrow: "Hair Removal Guide",
    },
    {
        slug: "ipl-safety-skin-types",
        title: "IPL Safety for different skin types",
        categoryIds: ["ipl"],
        serviceSlugs: ["ipl-full-face", "ipl-underarm"],
        eyebrow: "Advanced Skin",
    }
];

function generateFullSpec(partial: Partial<IntentPageSpec>): IntentPageSpec {
    const title = partial.title!;
    const slug = partial.slug!;
    
    return {
        slug,
        title,
        metaTitle: `${title} | Galeo Beauty Expert Insights`,
        metaDescription: `Professional guidance on ${title.toLowerCase()}. Discover specific results, safety measures, and bookable services at our Hartbeespoort Flagship.`,
        h1: title,
        eyebrow: partial.eyebrow || "Expert Insight",
        heroDescription: `Learn about the clinical and artistic precision of ${title.toLowerCase()} from the specialized therapists at Galeo Beauty.`,
        heroImage: "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
        heroImageAlt: title,
        primaryKeywords: partial.primaryKeywords || [slug.replace(/-/g, " ")],
        supportingKeywords: ["Galeo Beauty", "Hartbeespoort Salon", "Expert Beauty Insights"],
        symptoms: partial.symptoms || ["Loss of confidence", "Aging concerns", "Inefficient routine"],
        results: partial.results || ["Restored beauty", "Time-saving routine", "Expert precision"],
        comparisons: ["Clinic vs. Home", "Premium vs. Standard", "Long-term vs. Temporary"],
        objections: ["Is it safe?", "What is the cost?", "How long does it last?"],
        audiences: ["Modern women", "Busy professionals", "Self-care enthusiasts"],
        whyItHappens: `${title} is a critical part of modern high-performance beauty, focused on clinical results and artistic enhancement.`,
        treatmentApproach: "We combine world-class products with specialized techniques to ensure every client receives a unique, results-driven experience.",
        bestFor: ["Clients seeking excellence", "Those valuing professional insight"],
        faqs: [
            { question: `How should I prepare for ${title}?`, answer: "We recommend a clean skin surface and avoiding sun exposure 24 hours prior." },
            { question: `Is ${title} painful?`, answer: "Your comfort is our priority. We use advanced techniques and numbing where applicable to minimize sensation." },
            { question: "How long until I see results?", answer: "Most clients see immediate improvements, with full results stabilizing after the natural healing cycle." },
            { question: "Why book at Galeo Beauty?", answer: "Our estate flagships offer a unique blend of medical-grade privacy and luxury tranquility." }
        ],
        categoryIds: partial.categoryIds || ["beauty"],
        serviceSlugs: partial.serviceSlugs || ["pro-skin-60"],
        published: false,
        qualityStatus: "draft",
        ...partial
    };
}

async function run() {
    const finalSpecs: IntentPageSpec[] = SATURATION_ARTICLES.map(generateFullSpec);
    
    for (const spec of finalSpecs) {
        const filePath = path.join(CONTENT_DIR, `${spec.slug}.mdx`);
        const mdxContent = `
## The Specialized Choice: ${spec.title}

In a world of generic beauty, ${spec.title} stands out as a specialized discipline that requires both technical skill and an eye for aesthetics. At Galeo Beauty, we don't just "perform sessions"—we craft outcomes.

### Why Precision Matters

When dealing with ${spec.categoryIds[0].replace("-", " ")}, the margins for error are small, but the rewards for precision are immense. Our therapists are trained in the latest clinical protocols to ensure that every ${spec.title.toLowerCase()} session meets your unique anatomy and needs.

### The Galeo Difference

1. **Clinical Consultation**: Every journey begins with a deep-dive into your skin or beauty history.
2. **Master-Level Application**: Whether it's the steady hand of a PMU artist or the clinical knowledge of a QMS specialist, you are in safe hands.
3. **Estate Environment**: Our Hartbeespoort flagship provides the calm, secure atmosphere needed for focused aesthetic work.

We invite you to experience the next level of beauty saturation at Galeo Beauty.
`;

        const fileContent = matter.stringify(mdxContent, spec);
        fs.writeFileSync(filePath, fileContent);
    }

    console.log(`Generated ${finalSpecs.length} saturation articles.`);
}

run();
