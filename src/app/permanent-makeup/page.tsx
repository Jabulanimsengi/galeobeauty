import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";

export const metadata: Metadata = {
    title: "Permanent Makeup Hartbeespoort | Microblading, Powder Brows & Lip Blush",
    description: "Wake up with perfect makeup! Certified permanent makeup artist offering microblading, powder brows, hybrid brows, permanent eyeliner & lip blush in Hartbeespoort.",
    keywords: "permanent makeup hartbeespoort, semi-permanent makeup south africa, microblading, powder brows, eyebrow tattoo, permanent eyeliner, cosmetic tattooing, ombre brows, lip blush",
    alternates: {
        canonical: "https://www.galeobeauty.com/permanent-makeup",
    },
    openGraph: {
        title: "Permanent Makeup Hartbeespoort | Microblading & Powder Brows",
        description: "Professional semi-permanent makeup. Microblading, powder brows, lip blush, permanent eyeliner. Wake up beautiful daily.",
        url: "https://www.galeobeauty.com/permanent-makeup",
        type: "website",
    },
};

export default function PermanentMakeupPage() {
    return (
        <SEOLandingPage
            heroTitle="Wake Up Beautiful Every Day"
            heroSubtitle="Semi-Permanent Beauty"
            heroDescription="Save hours of makeup application with professional permanent makeup. From flawless brows to defined eyes and tinted lips, our certified cosmetic tattoo artist creates natural, long-lasting results."
            heroImage="/images/services/makeup/makeup_01.jpeg"
            heroImageAlt="Professional permanent makeup microblading treatment"
            benefits={[
                "Save time daily - skip the morning makeup routine",
                "Always picture-perfect - smudge-proof, waterproof, gym-proof makeup",
                "Safe & certified - performed by certified permanent makeup artists",
                "Natural-looking results customized to your face shape and style",
                "Long-lasting beauty - results last 1-3 years with touch-ups",
                "Perfect symmetry - balanced features impossible with hand-drawn makeup"
            ]}
            pricing={{
                title: "Permanent Makeup Services & Pricing",
                items: [
                    {
                        name: "Microblading",
                        price: "R1,350",
                        description: "Hair-stroke technique creating ultra-natural brows. Perfect for filling sparse areas or creating entirely new brows. Lasts 12-18 months."
                    },
                    {
                        name: "Powder Pixel Brows",
                        price: "R1,710",
                        description: "Soft, powdery brow effect mimicking filled-in makeup. Perfect for oily skin. Lasts 2-3 years with proper care."
                    },
                    {
                        name: "Hybrid Brows",
                        price: "R1,710",
                        description: "Best of both worlds! Combines microblading hair strokes with powder shading for full, defined, natural-looking brows."
                    },
                    {
                        name: "Permanent Eyeliner",
                        price: "R720",
                        description: "Wake up with perfectly defined eyes. From subtle lash enhancement to dramatic winged liner. Waterproof eyeliner that never smudges."
                    },
                    {
                        name: "Full Lip Blush",
                        price: "R2,430",
                        description: "Fuller, more defined lips with natural-looking color. Complete lip color & contour for perfectly tinted lips that last."
                    },
                    {
                        name: "Lip Liner",
                        price: "R1,710",
                        description: "Define & enhance lip shape with subtle liner. Creates fuller appearance without full color."
                    }
                ]
            }}
            services={{
                title: "Why Choose Permanent Makeup?",
                items: [
                    {
                        icon: "Clock",
                        title: "Save Time Daily",
                        description: "Skip the morning makeup routine. Wake up with perfect brows, eyeliner, and lips ready to go."
                    },
                    {
                        icon: "Award",
                        title: "Always Picture-Perfect",
                        description: "Smudge-proof, waterproof, gym-proof. Your makeup stays flawless 24/7 in any situation."
                    },
                    {
                        icon: "Shield",
                        title: "Safe & Certified",
                        description: "Performed by certified permanent makeup artists using sterile, single-use equipment and premium pigments."
                    },
                    {
                        icon: "Palette",
                        title: "Natural-Looking Results",
                        description: "Customized to your face shape, skin tone, and personal style. Subtle enhancement, not overdone."
                    },
                    {
                        icon: "CheckCircle",
                        title: "Long-Lasting Beauty",
                        description: "Results last 1-3 years depending on technique. Touch-ups maintain perfect appearance."
                    },
                    {
                        icon: "Eye",
                        title: "Perfect Symmetry",
                        description: "Achieve balanced, symmetrical features that are impossible with hand-drawn makeup."
                    }
                ]
            }}
            secondaryContent={{
                title: "The Permanent Makeup Process",
                description: "Your permanent makeup journey begins with a thorough consultation where we discuss your goals, measure facial features for symmetry, and custom-design your perfect shape and color. You'll see and approve the design before any work begins. Professional topical numbing cream is applied for 20-30 minutes to ensure your comfort. Using sterile, single-use equipment, we carefully apply pigment using the chosen technique. Most procedures take 1-2 hours. Initial healing takes 7-14 days, with color appearing darker initially and lightening to the final result. A perfecting touch-up session 6-8 weeks later ensures optimal color retention and perfect results.",
                image: "/images/services/makeup/makeup_02.jpeg",
                imageAlt: "Permanent makeup microblading powder brows procedure",
                features: [
                    "Complimentary consultation to design your perfect look",
                    "Professional numbing cream ensures comfortable experience",
                    "Sterile, single-use equipment and premium pigments",
                    "Most procedures take 1-2 hours with minimal discomfort",
                    "Initial healing takes 7-14 days with provided aftercare",
                    "Touch-up session 6-8 weeks later perfects final results"
                ]
            }}
            ctaTitle="Ready for Effortless Beauty?"
            ctaDescription="Book your consultation to discuss which permanent makeup service is right for you. Our certified artist will create a personalized plan to help you wake up beautiful every day."
        />
    );
}
