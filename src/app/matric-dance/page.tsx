import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/seo/SEOLandingPage";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Matric Dance Makeup & Hair Hartbeespoort | Matric Farewell Packages",
    description: "Look stunning at your matric dance! Professional makeup, hair styling, lash extensions, nails & spray tan for your matric farewell. Packages from R594 at Galeo Beauty Hartbeespoort.",
    keywords: [
        "matric dance makeup and hair Hartbeespoort",
        "matric farewell lashes and nails near me",
        "matric ball glam package Pretoria",
        "matric dance beauty packages prices",
        "matric farewell spray tan and makeup Gauteng",
        "best matric dance makeup artist near me",
        "matric afskeid grimering en hare",
        "matric ball full beauty package near me",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/matric-dance",
    },
    openGraph: {
        title: "Matric Dance Makeup & Hair | Galeo Beauty Hartbeespoort",
        description: "Professional matric dance makeup, hair styling, lashes & nails. Look picture-perfect for your matric farewell.",
        url: "https://www.galeobeauty.com/matric-dance",
        type: "website",
    },
};

const schemas = [
    generateServiceSchema({
        name: "Matric Dance Beauty Packages",
        description: "Professional matric dance and farewell beauty services including glamour makeup, hair styling, lash extensions, nails, and spray tan packages at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/matric-dance",
        priceRange: "R594 - R3,780",
        offers: [
            { name: "Matric Dance Makeup", price: "R810" },
            { name: "Hair Styling (Updo/Curls)", price: "R594" },
            { name: "Classic Lash Extensions", price: "R540" },
            { name: "Gel Nails Overlay", price: "R450" },
            { name: "Full Matric Dance Package", price: "R3,780" },
        ],
    }),
    generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Services", url: "https://www.galeobeauty.com/services" },
        { name: "Matric Dance", url: "https://www.galeobeauty.com/matric-dance" },
    ]),
    generateFAQSchema([
        { question: "How much does matric dance makeup cost?", answer: "Professional matric dance makeup at Galeo Beauty starts at R810. A full matric dance package including makeup, hair styling, lash extensions, nails, and spray tan is available from R3,780. Individual services can be booked separately." },
        { question: "How early should I book for matric dance?", answer: "We recommend booking 2-4 weeks before your matric dance, especially during the busy September to November matric farewell season. Popular time slots fill up fast, so early booking secures your preferred date and time." },
        { question: "Do you offer group bookings for matric dance?", answer: "Yes! We welcome group bookings for matric dance preparations. Groups of 3 or more can enjoy discounted package rates. Contact us via WhatsApp to arrange group bookings and we'll create a schedule that works for everyone." },
    ]),
];

export default function MatricDancePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <SEOLandingPage
                heroTitle="Shine at Your Matric Dance"
                heroSubtitle="Matric Farewell Beauty"
                heroDescription="Your matric farewell is one of the most unforgettable nights of your life. Let our professional makeup artists and hair stylists create a show-stopping look that turns heads and photographs beautifully. From glamorous evening makeup to elegant updos, we make sure you feel like the star you are."
                heroImage="/images/services/makeup/makeup_01.jpeg"
                heroImageAlt="Professional matric dance makeup and hair styling"
                benefits={[
                    "Professional Kryolan makeup - designed for flash photography and all-night wear",
                    "Expert hair styling - updos, curls, braids, and sleek styles to match your dress",
                    "Lash extensions available - add drama with volume or wispy lashes",
                    "Gel nails and nail art - complete your look from head to fingertips",
                    "Long-lasting results - dance, laugh, and celebrate without touch-ups",
                    "Group bookings welcome - bring your friends for a fun pre-dance pamper session"
                ]}
                pricing={{
                    title: "Matric Dance Beauty Options",
                    items: [
                        {
                            name: "Matric Dance Makeup",
                            price: "R594",
                            description: "Professional evening makeup application with premium Kryolan products. Long-lasting, photography-perfect finish designed for your matric farewell."
                        },
                        {
                            name: "Matric Glam Package",
                            price: "From R1,200",
                            description: "Complete matric dance look. Includes professional makeup, hair styling (updo, curls, or sleek), and false lash application. Everything you need for a stunning entrance."
                        },
                        {
                            name: "Ultimate Matric Package",
                            price: "From R2,100",
                            description: "The full experience. Everything in Glam plus gel manicure, spray tan (done 2 days prior), and a pre-dance facial for glowing skin. Arrive at your matric dance looking absolutely flawless."
                        }
                    ]
                }}
                services={{
                    title: "Why Matric Dancers Choose Galeo Beauty",
                    items: [
                        {
                            icon: "Sparkles",
                            title: "Picture-Perfect Makeup",
                            description: "Professional Kryolan products designed for photography. Your makeup will look flawless in every photo, selfie, and video."
                        },
                        {
                            icon: "Award",
                            title: "Expert Hair Styling",
                            description: "Whether you want a glamorous updo, flowing curls, or sleek straight hair, our stylists create the perfect look to match your outfit."
                        },
                        {
                            icon: "Heart",
                            title: "Group Pamper Sessions",
                            description: "Bring your friends! Group bookings make getting ready part of the fun. We can accommodate multiple matric dancers at once."
                        },
                        {
                            icon: "Clock",
                            title: "All-Night Wear",
                            description: "Our makeup and hair styling is designed to last all night. Dance, celebrate, and enjoy without worrying about touch-ups."
                        },
                        {
                            icon: "Shield",
                            title: "Trial Sessions Available",
                            description: "Not sure about your look? Book a trial session to test your makeup and hair before the big night."
                        },
                        {
                            icon: "Eye",
                            title: "Complete Beauty Services",
                            description: "Makeup, hair, lashes, nails, spray tan, and skincare facials. Get everything done in one convenient visit."
                        }
                    ]
                }}
                secondaryContent={{
                    title: "Your Matric Dance Beauty Timeline",
                    description: "Start planning early for the best results. Book your appointment 4-6 weeks before your matric dance to secure your preferred date and time. If you want lash extensions, book them 3-5 days before the event so they look fresh and natural. Schedule your spray tan 2 days before for the perfect golden glow. Get your gel manicure 2-3 days before so your nails are flawless. On your matric dance day, plan to arrive 2-3 hours before you need to leave. We use professional Kryolan products that are long-lasting, humidity-resistant, and designed to look stunning in flash photography. Group bookings are our speciality - bring your friends and make getting ready the start of an unforgettable evening!",
                    image: "/images/services/makeup/makeup_03.jpeg",
                    imageAlt: "Matric dance makeup application and hair styling",
                    features: [
                        "Book 4-6 weeks early - popular dates fill up fast!",
                        "Bring photos of your dress for colour-matched makeup",
                        "Lash extensions 3-5 days before for a fresh look",
                        "Spray tan 2 days before for a natural golden glow",
                        "Plan 2-3 hours on the day for makeup and hair",
                        "Group discounts available for 4+ matric dancers"
                    ]
                }}
                ctaTitle="Ready to Shine at Your Matric Dance?"
                ctaDescription="Book your matric dance beauty appointment today. Whether it's just makeup or the full package, we'll make sure you look and feel absolutely amazing on your special night."
            />
        </>
    );
}
