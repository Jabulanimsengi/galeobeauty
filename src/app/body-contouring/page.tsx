import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Body Contouring Hartbeespoort | Non-Surgical Fat Reduction & Body Sculpting",
    description: "Transform your body with advanced body contouring treatments in Hartbeespoort. Fat freezing, EMS body sculpting & non-surgical fat reduction. CE-approved technology with proven results.",
    keywords: [
        "fat freezing before and after Hartbeespoort",
        "cryolipolysis cost South Africa",
        "double chin fat freezing near me",
        "Tesla EMS body sculpting results",
        "non-surgical fat removal Pretoria",
        "love handles treatment before and after",
        "stubborn belly fat treatment Gauteng",
        "body contouring prices near me",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/body-contouring",
    },
    openGraph: {
        title: "Body Contouring Hartbeespoort | Non-Surgical Fat Reduction",
        description: "Advanced body contouring & sculpting treatments. Fat freezing, EMS technology. No surgery, no downtime.",
        url: "https://www.galeobeauty.com/body-contouring",
        type: "website",
    },
};

const schemas = [
    generateServiceSchema({
        name: "Body Contouring Treatments",
        description: "Non-surgical body sculpting including fat freezing (cryolipolysis) and Tesla EMS muscle building at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/body-contouring",
        image: "https://www.galeobeauty.com/images/services/slimming_weightloss/EMS01.png",
        priceRange: "R799 - R9,000",
        offers: [
            { name: "Fat Freezing (Cryolipolysis)", price: "R799" },
            { name: "Tesla EMS Body Sculpting", price: "R1,850" },
            { name: "EMS Package (4 Sessions)", price: "R6,290" },
        ],
    }),
    generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Services", url: "https://www.galeobeauty.com/services" },
        { name: "Body Contouring", url: "https://www.galeobeauty.com/body-contouring" },
    ]),
    generateFAQSchema([
        { question: "How much does fat freezing cost at Galeo Beauty?", answer: "Fat freezing (cryolipolysis) starts at R799 per session at Galeo Beauty in Hartbeespoort. Tesla EMS body sculpting is R1,850 per session, with package deals available from R6,290 for 4 sessions." },
        { question: "How many body contouring sessions do I need?", answer: "Most clients see results after 1-2 fat freezing sessions per area. For Tesla EMS, we recommend 4 sessions for optimal muscle building and fat reduction. Results are visible within 6-12 weeks as your body naturally processes eliminated fat cells." },
        { question: "Is body contouring painful?", answer: "No, body contouring treatments at Galeo Beauty are non-invasive and generally comfortable. Fat freezing may cause a cold sensation initially, and EMS treatments create muscle contractions similar to an intense workout. Both require zero downtime." },
    ]),
];

export default function BodyContouringPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <SEOLandingPage
                heroTitle="Non-Surgical Body Sculpting in Hartbeespoort"
                heroSubtitle="Advanced Body Contouring"
                heroDescription="Transform stubborn fat into your dream silhouette without surgery. Our CE-approved body contouring treatments combine cutting-edge technology with proven results for safe, effective body sculpting."
                heroImage="/images/services/slimming_weightloss/EMS01.png"
                heroImageAlt="EMS body contouring and sculpting treatment"
                benefits={[
                    "No surgery required - completely non-invasive treatments",
                    "Quick 30-60 minute sessions that fit your busy schedule",
                    "CE-approved technology with certified practitioners",
                    "Proven results backed by clinical science",
                    "Zero recovery time - resume activities immediately",
                    "Long-lasting effects with permanent fat cell elimination"
                ]}
                pricing={{
                    title: "Body Contouring Treatment Options",
                    items: [
                        {
                            name: "Fat Freezing (Cryolipolysis)",
                            price: "R799",
                            duration: "1 hour",
                            description: "Freeze away stubborn fat cells permanently. Non-invasive cryolipolysis technology targets and eliminates fat cells without surgery. Results visible in 6-12 weeks."
                        },
                        {
                            name: "Tesla EMS Body Sculpting",
                            price: "R1,850",
                            duration: "30 minutes",
                            description: "Build muscle while burning fat! High-Intensity Focused Electromagnetic technology delivers 20,000 muscle contractions. Sculpt abs, lift buttocks, and tone arms."
                        },
                        {
                            name: "EMS Package (4 Sessions)",
                            price: "R6,290 - R9,000",
                            duration: "4 x 30 mins",
                            description: "Recommended treatment course for optimal muscle building and fat reduction. Visible results after the first few sessions."
                        }
                    ]
                }}
                services={{
                    title: "Why Choose Body Contouring?",
                    items: [
                        {
                            icon: "Zap",
                            title: "No Surgery Required",
                            description: "Non-invasive treatments with zero downtime. Walk in, transform, walk out."
                        },
                        {
                            icon: "Clock",
                            title: "Quick Sessions",
                            description: "30-60 minute sessions that fit your schedule. See results in weeks."
                        },
                        {
                            icon: "Shield",
                            title: "CE-Approved Technology",
                            description: "Safe, clinically proven equipment with certified practitioners."
                        },
                        {
                            icon: "TrendingUp",
                            title: "Proven Results",
                            description: "Visible fat reduction and muscle toning backed by science."
                        },
                        {
                            icon: "CheckCircle",
                            title: "No Recovery Time",
                            description: "Resume normal activities immediately after treatment."
                        },
                        {
                            icon: "Sparkles",
                            title: "Long-Lasting Effects",
                            description: "Permanent fat cell elimination with proper maintenance."
                        }
                    ]
                }}
                secondaryContent={{
                    title: "How Body Contouring Works",
                    description: "Our body contouring treatments use advanced technology to target and eliminate stubborn fat cells while building muscle tone. Fat freezing (cryolipolysis) crystallizes fat cells, which your body then naturally eliminates over time. Tesla EMS uses high-intensity electromagnetic energy to create powerful muscle contractions, equivalent to 20,000 sit-ups in just 30 minutes. Both treatments are completely non-invasive, FDA/CE-approved, and require zero downtime.",
                    image: "/images/services/fat_freezing/fat_freezing_03.jpeg",
                    imageAlt: "Fat freezing cryolipolysis body contouring treatment",
                    features: [
                        "Free consultation to assess your goals and create personalized treatment plan",
                        "Relax during your 30-60 minute session with no pain or needles",
                        "Walk out and continue your day immediately with zero downtime",
                        "Notice visible changes within weeks as your body processes fat and builds muscle",
                        "Ideal for those near target weight with stubborn fat pockets",
                        "Complement results with healthy lifestyle for best outcomes"
                    ]
                }}
                ctaTitle="Ready to Transform Your Body?"
                ctaDescription="Book your free consultation today and discover which body contouring treatment is right for you. Our certified specialists will create a personalized plan to help you achieve your body goals."
            />
        </>
    );
}
