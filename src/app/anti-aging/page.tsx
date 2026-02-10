import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Anti-Aging Treatments Hartbeespoort | Non-Surgical Facial Rejuvenation",
    description: "Turn back the clock with advanced anti-aging treatments. Botox alternatives, dermal fillers, liquid facelifts & collagen stimulators. Medical-grade skincare at Galeo Beauty.",
    keywords: [
        "liquid facelift Hartbeespoort",
        "Nefertiti lift cost Pretoria",
        "collagen biostimulator injections South Africa",
        "non-surgical facial rejuvenation near me",
        "skin boosters under eye Gauteng",
        "dermal fillers before and after",
        "anti-aging treatment results Hartbeespoort",
        "best injector for fillers near me",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/anti-aging",
    },
    openGraph: {
        title: "Anti-Aging Treatments Hartbeespoort | Non-Surgical Rejuvenation",
        description: "Advanced anti-aging solutions. Botox alternatives, dermal fillers, collagen stimulators. Medical-grade results.",
        url: "https://www.galeobeauty.com/anti-aging",
        type: "website",
    },
};

const schemas = [
    generateServiceSchema({
        name: "Anti-Aging Treatments",
        description: "Medical-grade anti-aging treatments including injectables, dermal fillers, collagen biostimulators, liquid facelifts, and Nefertiti lifts at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/anti-aging",
        image: "https://www.galeobeauty.com/images/services/anti_ageing/anti_ageing_01.jpeg",
        priceRange: "R59.60 - R10,000",
        offers: [
            { name: "Tox Treatment Per Unit", price: "R59.60" },
            { name: "Dermal Filler 1ml", price: "R2,800" },
            { name: "Liquid Facelift", price: "R10,000" },
            { name: "Collagen Biostimulator 10ml", price: "R5,000" },
            { name: "Nefertiti Lift", price: "R7,950" },
            { name: "Under Eye Skin Booster", price: "R2,800" },
        ],
    }),
    generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Services", url: "https://www.galeobeauty.com/services" },
        { name: "Anti-Aging", url: "https://www.galeobeauty.com/anti-aging" },
    ]),
    generateFAQSchema([
        { question: "How long do dermal fillers last?", answer: "Dermal fillers at Galeo Beauty typically last 6-18 months depending on the product used, area treated, and your metabolism. Hyaluronic acid fillers for lips last around 6-12 months, while cheek and jawline fillers can last 12-18 months. Collagen biostimulators can provide results for up to 2 years." },
        { question: "What is a liquid facelift?", answer: "A liquid facelift at Galeo Beauty combines dermal fillers and muscle relaxant injections to restore facial volume, smooth wrinkles, and lift sagging skin without surgery. Priced at R10,000, it provides facelift-like results with no downtime and takes about 1 hour." },
        { question: "Are anti-aging injectables safe?", answer: "Yes, all injectable treatments at Galeo Beauty use FDA and CE-approved products administered by certified practitioners. Anti-wrinkle injectables and dermal fillers have been used safely worldwide for decades. We perform a thorough consultation before any treatment to ensure suitability." },
    ]),
];

export default function AntiAgingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <SEOLandingPage
                heroTitle="Turn Back Time with Advanced Rejuvenation"
                heroSubtitle="Medical-Grade Anti-Aging"
                heroDescription="Erase years without surgery. Our medical-grade anti-aging treatments combine innovative injectables, collagen stimulators, and professional skincare for natural, youthful results that last."
                heroImage="/images/services/anti_ageing/anti_ageing_01.jpeg"
                heroImageAlt="Anti-aging facial rejuvenation injectable treatments"
                benefits={[
                    "Medical-grade results performed by certified practitioners",
                    "Natural-looking enhancements that refresh without looking 'overdone'",
                    "No surgery required - achieve facelift-like results non-invasively",
                    "FDA & CE-approved treatments backed by clinical research",
                    "Minimal downtime - most treatments take 30-60 minutes",
                    "Long-lasting effects - results last months to years"
                ]}
                pricing={{
                    title: "Anti-Aging Treatment Options",
                    items: [
                        {
                            name: "Tox Treatment Per Unit",
                            price: "R59.60",
                            duration: "1 hour",
                            description: "Precision muscle relaxant injections that smooth fine lines and wrinkles. Units customized to your needs for natural-looking results."
                        },
                        {
                            name: "Dermal Filler 1ml",
                            price: "R2,800 - R3,500",
                            duration: "1 hour",
                            description: "Versatile hyaluronic acid filler for lips, lines, or facial contouring. Customizable placement for natural-looking enhancement."
                        },
                        {
                            name: "Liquid Facelift",
                            price: "R10,000",
                            duration: "1 hour",
                            description: "Comprehensive rejuvenation combining dermal fillers and muscle relaxants to restore volume, smooth wrinkles, and lift sagging skin without surgery."
                        },
                        {
                            name: "Collagen Biostimulator 10ml",
                            price: "R5,000",
                            duration: "1 hour",
                            description: "Stimulates your skin's natural collagen production for gradual, long-lasting skin tightening and rejuvenation that looks completely natural."
                        },
                        {
                            name: "Nefertiti Lift",
                            price: "R7,950",
                            duration: "1 hour",
                            description: "Targeted injections along the jawline and neck to lift and define, creating a sleeker, more youthful profile."
                        },
                        {
                            name: "Under Eye Skin Booster",
                            price: "R2,800 - R4,000",
                            duration: "1 hour",
                            description: "Targeted hydration boost using hyaluronic acid micro-injections to refresh tired eyes and reduce dark circles."
                        }
                    ]
                }}
                services={{
                    title: "Why Choose Our Anti-Aging Treatments?",
                    items: [
                        {
                            icon: "Shield",
                            title: "Medical-Grade Results",
                            description: "Professional aesthetic treatments performed by certified practitioners using premium products."
                        },
                        {
                            icon: "Sparkles",
                            title: "Natural-Looking",
                            description: "Subtle enhancements that refresh and rejuvenate without looking 'done'."
                        },
                        {
                            icon: "Zap",
                            title: "No Surgery Required",
                            description: "Achieve facelift-like results without going under the knife."
                        },
                        {
                            icon: "Award",
                            title: "Proven Technology",
                            description: "FDA & CE-approved treatments backed by clinical research."
                        },
                        {
                            icon: "Heart",
                            title: "Minimal Downtime",
                            description: "Most treatments take 30-60 minutes with little to no recovery time."
                        },
                        {
                            icon: "CheckCircle",
                            title: "Long-Lasting Effects",
                            description: "Results that last months to years depending on treatment type."
                        }
                    ]
                }}
                secondaryContent={{
                    title: "Our Anti-Aging Philosophy: Natural Enhancement",
                    description: "At Galeo Beauty, we believe in enhancing your natural beauty, not changing who you are. Our approach combines medical expertise with aesthetic artistry. Whether you're looking to prevent early signs of aging in your 20s and 30s, or reverse decades of sun damage and aging in your 50s and beyond, we create personalized treatment plans tailored to your unique needs. From anti-wrinkle injectables that relax expression lines, to dermal fillers that restore lost volume, to collagen stimulators that rebuild your skin's foundation - we offer comprehensive solutions for every age and concern.",
                    image: "/images/services/anti_ageing/anti_ageing_02.jpeg",
                    imageAlt: "Dermal filler and collagen biostimulator anti-aging treatment",
                    features: [
                        "Complimentary consultation to discuss your goals and concerns",
                        "Customized treatment plans combining multiple modalities for best results",
                        "Anti-wrinkle injectables last 3-4 months, dermal fillers 6-18 months",
                        "Collagen stimulators provide results up to 2 years",
                        "Professional Dermalogica facials maintain and enhance injectable results",
                        "Advanced laser treatments for skin resurfacing and texture improvement"
                    ]
                }}
                ctaTitle="Ready to Turn Back the Clock?"
                ctaDescription="Book your complimentary consultation to discover which anti-aging treatments will help you achieve your aesthetic goals. Our certified practitioners will create a personalized rejuvenation plan just for you."
            />
        </>
    );
}
