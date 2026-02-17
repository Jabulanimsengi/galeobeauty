import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Laser Hair Removal Hartbeespoort | IPL Permanent Hair Removal",
    description: "Say goodbye to shaving forever! Professional IPL laser hair removal for face, body, bikini & legs. CE-approved technology with permanent results in Hartbeespoort.",
    keywords: [
        "IPL Brazilian hair removal Hartbeespoort",
        "full body laser hair removal cost South Africa",
        "laser hair removal for men near me",
        "IPL face and neck hair removal Pretoria",
        "permanent hair removal results",
        "Brazilian and Hollywood IPL prices",
        "full leg IPL hair removal Gauteng",
        "is IPL safe for face near me",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/laser-hair-removal",
    },
    openGraph: {
        title: "Laser Hair Removal Hartbeespoort | IPL Permanent Hair Removal",
        description: "Permanent hair removal with IPL technology. Face, body, bikini, legs. CE-approved. Say goodbye to razors!",
        url: "https://www.galeobeauty.com/laser-hair-removal",
        type: "website",
    },
};

const schemas = [
    generateServiceSchema({
        name: "IPL Laser Hair Removal",
        description: "Professional IPL (Intense Pulsed Light) permanent hair removal for face, body, bikini, and legs with CE-approved technology at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/laser-hair-removal",
        image: "https://www.galeobeauty.com/images/services/IPL_Hair_removal/IPL_image_06.jpeg",
        priceRange: "R270 - R2,070",
        offers: [
            { name: "Upper Lip / Face", price: "R270" },
            { name: "Underarms", price: "R495" },
            { name: "Bikini / Brazilian / Hollywood", price: "R540" },
            { name: "Full Arms", price: "R1,350" },
            { name: "Half Legs", price: "R1,305" },
            { name: "Full Legs", price: "R2,070" },
        ],
    }),
    generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Services", url: "https://www.galeobeauty.com/prices" },
        { name: "Laser Hair Removal", url: "https://www.galeobeauty.com/laser-hair-removal" },
    ]),
    generateFAQSchema([
        { question: "How many IPL hair removal sessions do I need?", answer: "Most areas require 6-8 IPL sessions spaced 4-6 weeks apart for optimal permanent results. Since only 20-30% of hair is actively growing at any time, multiple sessions are needed to target all follicles during their growth phase. You'll notice significant reduction after just 2-3 sessions." },
        { question: "Does IPL laser hair removal hurt?", answer: "IPL at Galeo Beauty feels like a mild rubber band snap — far less painful than waxing. Most clients find it very comfortable. Sensitive areas like the bikini line may feel slightly more intense, but treatment is quick. There's no downtime and mild redness fades within hours." },
        { question: "Is IPL safe for all skin types?", answer: "IPL works best on light to medium skin with dark hair, as the technology targets melanin (pigment) in the hair follicle. During your free consultation at Galeo Beauty, we assess your skin type and hair colour to determine candidacy and create a personalised treatment plan." },
    ]),
];

export default function LaserHairRemovalPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <SEOLandingPage
                heroTitle="Never Shave Again"
                heroSubtitle="Permanent Hair Removal"
                heroDescription="Experience the freedom of smooth, hair-free skin all year round. Our CE-approved IPL laser hair removal targets unwanted hair at the root for permanent reduction. No more razors, waxing, or ingrown hairs – just effortlessly silky skin."
                heroImage="/images/services/IPL_Hair_removal/IPL_image_06.jpeg"
                heroImageAlt="IPL laser hair removal permanent treatment"
                benefits={[
                    "Permanent results - reduce hair growth by 80-95% permanently",
                    "Save money long-term - stop spending on razors, waxing, and shaving cream",
                    "Save time daily - no more daily shaving or monthly waxing appointments",
                    "Safe & effective - CE-approved IPL technology with minimal discomfort",
                    "Fast sessions - underarms in 5 minutes, full legs under an hour",
                    "No ingrown hairs - say goodbye to razor bumps and irritation forever"
                ]}
                pricing={{
                    title: "IPL Hair Removal Treatment Areas & Pricing",
                    items: [
                        {
                            name: "Upper Lip / Face",
                            price: "R270 - R945",
                            description: "Smooth, hair-free facial areas. Upper lip R270, full face R882, full face & neck R945. Perfect for eliminating facial hair permanently."
                        },
                        {
                            name: "Underarms",
                            price: "R495",
                            description: "Most popular choice with quick 5-minute sessions. Stop shaving daily and enjoy smooth, confident underarms year-round."
                        },
                        {
                            name: "Bikini / Brazilian / Hollywood",
                            price: "R540 - R990",
                            description: "Bikini line R540, Brazilian (leave strip) R765, Hollywood (complete removal) R990. Say goodbye to painful waxing forever."
                        },
                        {
                            name: "Full Arms",
                            price: "R1,350",
                            description: "Smooth arms from shoulder to wrist. No more daily shaving or prickly regrowth."
                        },
                        {
                            name: "Half Legs",
                            price: "R1,305",
                            description: "Knee to ankle hair removal. Perfect for those who only need lower leg treatments."
                        },
                        {
                            name: "Full Legs",
                            price: "R2,070",
                            description: "Most popular leg treatment. Thigh to ankle complete hair removal for silky smooth legs all year."
                        }
                    ]
                }}
                services={{
                    title: "Why Choose IPL Laser Hair Removal?",
                    items: [
                        {
                            icon: "CheckCircle",
                            title: "Permanent Results",
                            description: "Reduce hair growth by 80-95% permanently. After treatment series, enjoy smooth skin for years."
                        },
                        {
                            icon: "TrendingDown",
                            title: "Save Money Long-Term",
                            description: "Stop spending on razors, waxing, and shaving cream. IPL pays for itself within 2-3 years."
                        },
                        {
                            icon: "Clock",
                            title: "Save Time Daily",
                            description: "No more daily shaving or monthly waxing appointments. Reclaim hours every week."
                        },
                        {
                            icon: "Shield",
                            title: "Safe & Effective",
                            description: "CE-approved IPL technology used safely on millions worldwide. Minimal discomfort."
                        },
                        {
                            icon: "Zap",
                            title: "Fast Sessions",
                            description: "Quick treatments – underarms in 5 minutes, full legs in under an hour."
                        },
                        {
                            icon: "Award",
                            title: "No Ingrown Hairs",
                            description: "Say goodbye to razor bumps, irritation, and painful ingrown hairs forever."
                        }
                    ]
                }}
                secondaryContent={{
                    title: "How IPL Laser Hair Removal Works",
                    description: "IPL (Intense Pulsed Light) technology targets melanin (pigment) in hair follicles. Dark hair absorbs the light energy, which converts to heat, warming the follicle to 70°C. This heat damages the follicle's ability to regrow hair without harming surrounding skin. Treated hairs fall out naturally over 1-2 weeks, and those follicles don't regenerate. Hair grows in cycles - active growth (anagen), transitional (catagen), and resting (telogen). Since IPL only works on actively growing hair, and only 20-30% of hair is in active growth at any time, multiple sessions are required to catch all follicles during their growth phase. Most areas require 6-8 sessions spaced 4-6 weeks apart for optimal permanent results.",
                    image: "/images/services/IPL_Hair_removal/IPL_image_06.jpeg",
                    imageAlt: "IPL laser hair removal technology treatment process",
                    features: [
                        "Free consultation to assess candidacy and create treatment plan",
                        "Works best on light to medium skin with dark hair (high contrast)",
                        "Shave treatment area 24 hours before (don't wax or pluck)",
                        "Avoid sun exposure for 2 weeks before and after treatment",
                        "Quick rubber band snap sensation - far less painful than waxing",
                        "Mild redness fades within hours - zero downtime needed"
                    ]
                }}
                ctaTitle="Ready for Smooth, Hair-Free Skin?"
                ctaDescription="Book your free consultation to discuss treatment areas, see our CE-approved technology, and get a personalized treatment plan with pricing. Start your journey to permanent hair removal today."
                currentPageHref="/laser-hair-removal"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/prices" },
                    { label: "Laser Hair Removal" },
                ]}
            />
        </>
    );
}
