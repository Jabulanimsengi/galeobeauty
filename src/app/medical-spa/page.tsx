import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Medical Spa Hartbeespoort | Aesthetic Clinic & Advanced Treatments",
    description: "Premier medical spa offering advanced aesthetic treatments. Injectable fillers, laser treatments, body contouring, medical-grade facials & skin rejuvenation in Hartbeespoort.",
    keywords: [
        "fractional laser for acne scars Hartbeespoort",
        "Plasmage skin tightening results",
        "medical aesthetics prices South Africa",
        "non-surgical vaginal tightening Pretoria",
        "scar treatment before and after Gauteng",
        "skin tightening treatment near me",
        "best medical spa near me",
        "aesthetic clinic Hartbeespoort Dam",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/medical-spa",
    },
    openGraph: {
        title: "Medical Spa Hartbeespoort | Advanced Aesthetic Clinic",
        description: "Medical-grade beauty treatments. Injectable aesthetics, laser therapy, body sculpting. Clinical results.",
        url: "https://www.galeobeauty.com/medical-spa",
        type: "website",
    },
};

const schemas = [
    generateServiceSchema({
        name: "Medical Spa Treatments",
        description: "Premier medical-grade aesthetic treatments including fractional laser, Plasmage skin tightening, vaginal rejuvenation, scar treatment, and injectable aesthetics at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/medical-spa",
        priceRange: "R350 - R10,000",
        offers: [
            { name: "Fractional Laser Resurfacing", price: "R1,800" },
            { name: "Plasmage Skin Tightening", price: "R1,500" },
            { name: "Medical-Grade Facial", price: "R750" },
            { name: "Scar Revision Treatment", price: "R350" },
            { name: "Non-Surgical Vaginal Tightening", price: "R3,000" },
        ],
    }),
    generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Services", url: "https://www.galeobeauty.com/prices" },
        { name: "Medical Spa", url: "https://www.galeobeauty.com/medical-spa" },
    ]),
    generateFAQSchema([
        { question: "What is the difference between a medical spa and a day spa?", answer: "A medical spa (like Galeo Beauty in Hartbeespoort) offers clinical-grade treatments such as injectable fillers, laser therapy, skin tightening, and body contouring under qualified practitioners. A day spa focuses on relaxation treatments like facials and massages. We combine both for a luxury medical spa experience." },
        { question: "What medical-grade treatments does Galeo Beauty offer?", answer: "Our medical spa offers fractional laser skin resurfacing, Plasmage skin tightening, injectable aesthetics (fillers and muscle relaxants), IPL treatments, non-surgical vaginal rejuvenation, scar revision, and medical-grade facials. All treatments use CE-approved technology." },
        { question: "Are the practitioners at Galeo Beauty certified?", answer: "Yes, all medical aesthetic treatments at Galeo Beauty are performed by certified and qualified practitioners with specific training in injectable aesthetics, laser therapy, and advanced skincare. We are registered with the relevant South African health authorities." },
    ]),
];

export default function MedicalSpaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <SEOLandingPage
                heroTitle="Where Medicine Meets Beauty"
                heroSubtitle="Medical-Grade Excellence"
                heroDescription="Experience the pinnacle of aesthetic medicine. Our medical spa combines clinical expertise with luxury spa ambiance for safe, effective treatments that deliver transformative results."
                heroImage="/images/services/facials/Image_facial_02.jpeg"
                heroImageAlt="Medical spa aesthetic clinic treatments"
                benefits={[
                    "Medical oversight - certified practitioners perform all treatments",
                    "Advanced technology - CE & FDA-approved equipment used worldwide",
                    "Comprehensive solutions - all aesthetic needs under one roof",
                    "Personalized approach - custom treatment plans for your unique needs",
                    "Clinical results - medical-grade treatments deliver measurable improvements",
                    "Luxury experience - medical precision in a spa environment"
                ]}
                services={{
                    title: "Why Choose a Medical Spa?",
                    items: [
                        {
                            icon: "Shield",
                            title: "Medical Oversight",
                            description: "Certified practitioners perform treatments under medical protocols with highest safety standards."
                        },
                        {
                            icon: "Award",
                            title: "Advanced Technology",
                            description: "CE & FDA-approved equipment used in medical clinics worldwide for proven, clinical results."
                        },
                        {
                            icon: "Sparkles",
                            title: "Comprehensive Solutions",
                            description: "From injectables to laser therapy, all aesthetic needs under one roof."
                        },
                        {
                            icon: "Heart",
                            title: "Personalized Approach",
                            description: "Custom treatment plans based on your unique biology, goals, and concerns."
                        },
                        {
                            icon: "Zap",
                            title: "Clinical Results",
                            description: "Medical-grade treatments deliver measurable improvements backed by science."
                        },
                        {
                            icon: "CheckCircle",
                            title: "Luxury Experience",
                            description: "Medical precision in a spa environment - effective treatments that feel indulgent."
                        }
                    ]
                }}
                pricing={{
                    title: "Medical Spa Treatment Categories",
                    items: [
                        {
                            name: "Injectable Aesthetics",
                            price: "R59.60 - R10,000",
                            description: "Hart Aesthetics injectable treatments including anti-wrinkle tox, dermal fillers, collagen biostimulators, liquid facelifts, and Nefertiti lifts."
                        },
                        {
                            name: "Laser & IPL Treatments",
                            price: "R270 - R2,565",
                            description: "IPL permanent hair removal for all body areas. Advanced laser skin resurfacing, Plasmage skin tightening, and fractional laser treatments."
                        },
                        {
                            name: "Body Contouring",
                            price: "R799 - R9,000",
                            description: "Non-surgical body sculpting with cryolipolysis fat freezing and Tesla EMS muscle building. CE-approved technology with zero downtime."
                        },
                        {
                            name: "Medical-Grade Facials",
                            price: "R490 - R6,999",
                            description: "Dermalogica Pro treatments, QMS medical skincare, microneedling, dermaplaning, chemical peels, and LED therapy for clinical skin results."
                        },
                        {
                            name: "Permanent Makeup",
                            price: "R720 - R2,430",
                            description: "Semi-permanent cosmetic tattooing including microblading, powder brows, permanent eyeliner, and lip blush by certified artists."
                        },
                        {
                            name: "Professional Massages",
                            price: "R330 - R590",
                            description: "Therapeutic massages including Swedish, deep tissue, aromatherapy, and Indian head massage for relaxation and stress relief."
                        }
                    ]
                }}
                secondaryContent={{
                    title: "Medical Spa vs Traditional Day Spa",
                    description: "The difference is profound. Traditional day spas focus on relaxation and pampering with surface-level treatments using retail-grade products. Limited clinical equipment means temporary, subtle results. At Galeo Beauty Medical Spa, we're results-driven with clinical oversight. Our treatments target deep tissue and structural improvements using medical-grade products and advanced technology. From laser and injectable equipment to RF devices, our certified medical practitioners deliver measurable, long-lasting transformation. We combine medical expertise with a luxury spa experience - you get the clinical results of a medical clinic with the comfort and ambiance of a high-end spa.",
                    image: "/images/services/facials/Image_facial_03.jpeg",
                    imageAlt: "Medical spa injectable treatments and aesthetic procedures",
                    features: [
                        "Certified practitioners trained in medical aesthetic procedures",
                        "CE & FDA-approved technology used in medical clinics worldwide",
                        "Hospital-grade sterilization and single-use supplies",
                        "Comprehensive consultation to create personalized treatment plan",
                        "Combination treatments for optimal synergistic results",
                        "Follow-up care and maintenance plans for long-term success"
                    ]
                }}
                ctaTitle="Experience Medical Spa Excellence"
                ctaDescription="Book your complimentary consultation to discover how our medical spa treatments can help you achieve your aesthetic goals safely and effectively. Our certified team will design a personalized plan just for you."
                currentPageHref="/medical-spa"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/prices" },
                    { label: "Medical Spa" },
                ]}
            />
        </>
    );
}
