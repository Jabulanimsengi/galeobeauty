import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Bridal Beauty Packages Hartbeespoort | Wedding Hair & Makeup",
    description: "Look flawless on your big day! Complete bridal beauty packages including makeup, hair styling, lash extensions, nails & trial sessions. Wedding day perfection in Hartbeespoort.",
    keywords: [
        "bridal makeup artist Hartbeespoort",
        "wedding makeup trial near me",
        "bridal beauty packages prices South Africa",
        "Kryolan bridal makeup Pretoria",
        "bridesmaids hair and makeup Gauteng",
        "wedding day lashes and nails near me",
        "bridal spray tan packages",
        "best wedding makeup Hartbeespoort Dam",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/bridal-beauty",
    },
    openGraph: {
        title: "Bridal Beauty Packages Hartbeespoort | Wedding Hair & Makeup",
        description: "Complete bridal beauty services. Professional makeup, hair styling, lashes, nails. Look stunning on your wedding day.",
        url: "https://www.galeobeauty.com/bridal-beauty",
        type: "website",
    },
};

const schemas = [
    generateServiceSchema({
        name: "Bridal Beauty Packages",
        description: "Complete wedding day beauty services including bridal makeup, hair styling, lash extensions, gel nails, and spray tan packages at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/bridal-beauty",
        image: "https://www.galeobeauty.com/images/services/bridal/bridal_01.jpeg",
        priceRange: "R594 - R5,940",
        offers: [
            { name: "Bridal Makeup (Kryolan)", price: "R1,080" },
            { name: "Bridal Hair Styling", price: "R810" },
            { name: "Bridal Trial Session", price: "R810" },
            { name: "Bridesmaids Makeup", price: "R810" },
            { name: "Full Bridal Package", price: "R5,940" },
        ],
    }),
    generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Services", url: "https://www.galeobeauty.com/prices" },
        { name: "Bridal Beauty", url: "https://www.galeobeauty.com/bridal-beauty" },
    ]),
    generateFAQSchema([
        { question: "How far in advance should I book bridal beauty?", answer: "We recommend booking your bridal beauty package 3-6 months before your wedding date, especially during peak wedding season (September to April). Your trial session should be booked 4-6 weeks before the wedding to finalize your look." },
        { question: "What is included in a full bridal beauty package?", answer: "Our full bridal package at R5,940 includes a trial session, wedding day professional makeup with premium Kryolan products, hair styling, lash extensions, gel overlay nails on hands and feet, and a spray tan. Individual services can also be booked separately." },
        { question: "Do you offer on-location bridal services?", answer: "Yes, Galeo Beauty offers on-location bridal beauty services within the Hartbeespoort and surrounding areas. A travel fee may apply depending on the venue location. Contact us for a customized quote for your wedding venue." },
    ]),
];

export default function BridalBeautyPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <SEOLandingPage
                heroTitle="Look Breathtaking on Your Special Day"
                heroSubtitle="Wedding Day Beauty"
                heroDescription="Your wedding day deserves perfection. Our complete bridal beauty packages ensure you look and feel absolutely stunning from ceremony to last dance. Professional makeup, hair styling, lashes, and nails – all coordinated for flawless results."
                heroImage="/images/services/bridal/bridal_01.jpeg"
                heroImageAlt="Bridal makeup and hair styling wedding services"
                benefits={[
                    "Professional expertise - certified makeup artists and hair stylists",
                    "Trial sessions included - perfect your look before the big day",
                    "Stress-free experience - we handle all beauty needs on schedule",
                    "Photography-perfect - designed to look flawless in person and photos",
                    "Long-lasting results - tear-proof, kiss-proof, dance-proof beauty",
                    "Complete packages - makeup, hair, lashes, nails, and bridal party services"
                ]}
                pricing={{
                    title: "Bridal Beauty Package Options",
                    items: [
                        {
                            name: "Essential Bride Package",
                            price: "From R2,500",
                            description: "Perfect for intimate weddings. Includes professional bridal makeup, wedding day hair styling, complimentary makeup trial, premium Kryolan products, and touch-up kit."
                        },
                        {
                            name: "Glamour Bride Package",
                            price: "From R4,200",
                            description: "Complete bridal experience. Everything in Essential plus full set lash extensions, gel manicure & pedicure, hair trial session, airbrush makeup option, and pre-wedding bridal skincare facial."
                        },
                        {
                            name: "Luxury Bride Package",
                            price: "From R6,500",
                            description: "Ultimate wedding day pampering. Everything in Glamour plus on-location service, 2 bridesmaids makeup & hair, professional skincare series (3 sessions), relaxing massage before wedding, and emergency beauty kit for venue."
                        }
                    ]
                }}
                services={{
                    title: "Why Brides Choose Galeo Beauty",
                    items: [
                        {
                            icon: "Award",
                            title: "Professional Expertise",
                            description: "Certified makeup artists and hair stylists with years of bridal experience using premium Kryolan products."
                        },
                        {
                            icon: "Heart",
                            title: "Trial Sessions Included",
                            description: "Perfect your look before the big day with complimentary trial sessions to test makeup and hair."
                        },
                        {
                            icon: "Clock",
                            title: "Stress-Free Experience",
                            description: "Relax on your wedding morning. We handle all beauty needs on schedule, in-salon or on-location."
                        },
                        {
                            icon: "Sparkles",
                            title: "Photography-Perfect",
                            description: "Makeup and hair designed to look flawless in person and stunning in photos all day long."
                        },
                        {
                            icon: "Shield",
                            title: "Long-Lasting Results",
                            description: "Tear-proof, kiss-proof, dance-proof beauty that stays perfect from first look to final dance."
                        },
                        {
                            icon: "CheckCircle",
                            title: "Complete Packages",
                            description: "Everything you need: makeup, hair, lashes, nails, and even bridal party services available."
                        }
                    ]
                }}
                secondaryContent={{
                    title: "Your Bridal Beauty Timeline",
                    description: "Planning ahead ensures wedding day perfection. Book your bridal consultation 3-6 months before to secure your date and discuss your vision. Start professional skincare treatments 2-3 months prior for glowing skin. Schedule your makeup and hair trial 4-6 weeks before to test your complete look and make any adjustments. Apply lash extensions and complete final facial 2 weeks before. Get gel manicure and pedicure 1 week before, plus optional massage for stress relief. On your wedding day, arrive 3-4 hours before the ceremony to relax while we create your perfect bridal look. We use professional-grade Kryolan products designed for photography and all-day wear - tear-proof, kiss-proof, and humidity-resistant.",
                    image: "/images/services/bridal/bridal_01.jpeg",
                    imageAlt: "Bridal beauty wedding makeup hair styling",
                    features: [
                        "Book early - popular dates fill up 6-12 months in advance",
                        "Full bridal makeup application trial with inspiration photos",
                        "On-location services available for venue, hotel, or home",
                        "Plan 2-3 hours for bride (makeup + hair styling)",
                        "Bridesmaid packages available with additional stylists for large parties",
                        "All packages customizable to create your perfect bridal beauty experience"
                    ]
                }}
                ctaTitle="Ready to Look Stunning on Your Wedding Day?"
                ctaDescription="Book your complimentary bridal consultation to discuss packages, trial dates, and create your perfect wedding day beauty plan. Our certified team will ensure you look absolutely breathtaking."
                currentPageHref="/bridal-beauty"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/prices" },
                    { label: "Bridal Beauty" },
                ]}
            />
        </>
    );
}
