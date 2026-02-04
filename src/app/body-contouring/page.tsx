import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";

export const metadata: Metadata = {
    title: "Body Contouring Hartbeespoort | Non-Surgical Fat Reduction & Body Sculpting",
    description: "Transform your body with advanced body contouring treatments in Hartbeespoort. Fat freezing, EMS body sculpting & non-surgical fat reduction. CE-approved technology with proven results.",
    keywords: "body contouring hartbeespoort, body sculpting south africa, non-surgical fat reduction, EMS body sculpting, fat freezing, cryolipolysis, body shaping salon, cellulite reduction",
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

export default function BodyContouringPage() {
    return (
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
    );
}
