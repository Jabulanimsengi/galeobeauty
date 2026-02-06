import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Phone, MapPin, Clock, Star, Shield, Sparkles } from "lucide-react";
import { serviceCategories, getCategoryById } from "@/lib/services-data";
import { CategoryContent } from "./category-content";

// Comprehensive SEO metadata for each category - optimized for South African search
const categoryMeta: Record<string, {
    title: string;
    description: string;
    keywords: string[];
    h1: string;
    intro: string;
    benefits: string[];
    faqs: { q: string; a: string }[];
}> = {
    "hart-aesthetics": {
        title: "Hart Aesthetics - Dermal Fillers & Injectables",
        description: "Professional dermal fillers, lip fillers, cheek fillers, and Botox treatments in Hartbeespoort. Medical-grade injectables by certified practitioners. Book your consultation today.",
        keywords: ["dermal fillers Hartbeespoort", "lip fillers price South Africa", "cheek fillers near me", "Botox alternative Pretoria", "how much do lip fillers cost", "anti-wrinkle injections near me", "non-surgical facelift Hartbeespoort", "cosmetic injectables Gauteng"],
        h1: "Hart Aesthetics - Professional Injectables",
        intro: "Transform your appearance with our medical-grade injectable treatments. Our certified practitioners use premium dermal fillers and Botox to deliver natural-looking, rejuvenating results.",
        benefits: ["Medical-grade products", "Certified practitioners", "Natural-looking results", "Personalized treatment plans"],
        faqs: [
            { q: "How long do dermal fillers last?", a: "Dermal fillers typically last 6-18 months depending on the type and treatment area." },
            { q: "Is the procedure painful?", a: "We use numbing cream and the fillers contain lidocaine for maximum comfort." },
        ],
    },
    "fat-freezing": {
        title: "Fat Freezing Cryolipolysis Treatment",
        description: "Non-invasive fat freezing (cryolipolysis) treatments in Hartbeespoort. Target stubborn fat on belly, love handles, arms, and thighs. CE approved, safe and effective body contouring.",
        keywords: ["fat freezing cost South Africa", "cryolipolysis prices Hartbeespoort", "body contouring near me", "how much does fat freezing cost", "stubborn belly fat treatment", "love handles removal Pretoria", "non-surgical fat removal Gauteng", "coolsculpting alternative near me"],
        h1: "Fat Freezing - Cryolipolysis Body Contouring",
        intro: "Eliminate stubborn fat without surgery using our CE-approved cryolipolysis treatment. Fat freezing targets and destroys fat cells that diet and exercise can't reach.",
        benefits: ["Non-invasive procedure", "No downtime required", "Permanent fat cell reduction", "CE approved equipment"],
        faqs: [
            { q: "How does fat freezing work?", a: "Cryolipolysis freezes fat cells to -5°C, causing them to die and be naturally eliminated by your body over 2-3 months." },
            { q: "How many sessions do I need?", a: "Most clients see optimal results after 1-3 sessions per treatment area." },
        ],
    },
    "slimming": {
        title: "Tesla EMS Slimming & Weight Loss Treatment",
        description: "Revolutionary Tesla EMS slimming machine in Hartbeespoort. Build muscle and burn fat simultaneously with High-Intensity Focused Electromagnetic technology. No gym required.",
        keywords: ["EMS slimming prices Hartbeespoort", "Tesla body sculpting near me", "muscle toning treatment cost", "non-invasive weight loss Pretoria", "body toning near me", "HIFEM technology South Africa", "slimming spa Gauteng", "tummy toning treatment"],
        h1: "Tesla EMS Slimming - Build Muscle, Burn Fat",
        intro: "Experience the revolutionary Tesla EMS Slimming Machine. Using High-Intensity Focused Electromagnetic technology, it induces powerful muscle contractions equivalent to 20,000 sit-ups in 30 minutes.",
        benefits: ["Builds muscle & burns fat", "30-minute treatments", "No downtime", "Visible results in weeks"],
        faqs: [
            { q: "How does Tesla EMS work?", a: "HIFEM technology induces supramaximal muscle contractions, building muscle while triggering fat breakdown." },
            { q: "Is it safe?", a: "Yes, EMS technology is FDA-cleared and CE approved for muscle toning and fat reduction." },
        ],
    },
    "dermalogica": {
        title: "Dermalogica Facial Treatments & Skincare",
        description: "Professional Dermalogica facial treatments in Hartbeespoort. Pro skin treatments including microneedling, power peels, dermaplaning, and customized facials. Expert skincare specialists.",
        keywords: ["Dermalogica facial prices Hartbeespoort", "professional facial near me", "acne treatment facial", "oily skin facial near me", "best facial for anti-aging", "skincare treatment Pretoria", "deep cleansing facial prices", "skin specialist Gauteng"],
        h1: "Dermalogica Professional Skincare Treatments",
        intro: "Experience world-class skincare with our Dermalogica professional treatments. Our trained skin therapists customize each treatment to address your unique skin concerns.",
        benefits: ["Customized skin analysis", "Professional-grade products", "Trained skin therapists", "Visible results"],
        faqs: [
            { q: "What makes Dermalogica different?", a: "Dermalogica is a professional-grade skincare brand used by skin therapists worldwide, free from common irritants." },
            { q: "How often should I get a facial?", a: "We recommend professional facials every 4-6 weeks to maintain optimal skin health." },
        ],
    },
    "ipl": {
        title: "IPL Laser Hair Removal - Ladies & Gents",
        description: "CE-approved IPL laser hair removal in Hartbeespoort. Permanent hair reduction for face, body, bikini, and intimate areas. Safe treatments for ladies and gents.",
        keywords: ["IPL hair removal prices Hartbeespoort", "laser hair removal cost South Africa", "permanent hair removal near me", "painless hair removal Pretoria", "Brazilian IPL prices", "full body laser near me", "mens laser hair removal Gauteng", "how much does laser hair removal cost"],
        h1: "IPL Laser Hair Removal - Permanent Results",
        intro: "Achieve silky smooth skin with our advanced CE-approved IPL laser hair removal. Safe, effective treatments for all body areas including face, arms, legs, and intimate areas for both ladies and gents.",
        benefits: ["CE approved equipment", "Permanent hair reduction", "Suitable for all areas", "Ladies & gents welcome"],
        faqs: [
            { q: "How many IPL sessions do I need?", a: "Most clients need 6-8 sessions for optimal permanent hair reduction, spaced 4-6 weeks apart." },
            { q: "Is IPL painful?", a: "IPL feels like a rubber band snap. Most clients find it very tolerable, and we can adjust settings for comfort." },
        ],
    },
    "makeup": {
        title: "Professional Make-Up Services",
        description: "Professional make-up services in Hartbeespoort. Kryolan trained artists for bridal, evening, and special occasion make-up. Flawless looks for your special day.",
        keywords: ["bridal makeup Hartbeespoort", "wedding makeup artist near me", "matric dance makeup prices", "matric farewell makeup Pretoria", "professional makeup Gauteng", "evening makeup near me", "how much does bridal makeup cost"],
        h1: "Professional Make-Up Artistry",
        intro: "Look stunning for any occasion with our professional make-up services. Our Kryolan-trained artists create flawless looks from natural day makeup to glamorous bridal transformations.",
        benefits: ["Kryolan professional products", "Trained makeup artists", "Long-lasting formulas", "Personalized looks"],
        faqs: [
            { q: "Do you offer bridal trials?", a: "Yes, we highly recommend a bridal trial 2-4 weeks before your wedding to perfect your look." },
            { q: "How long does bridal makeup take?", a: "Bridal makeup typically takes 60-90 minutes to ensure a flawless, long-lasting finish." },
        ],
    },
    "medical": {
        title: "Medical Aesthetic Treatments",
        description: "Advanced medical aesthetic treatments in Hartbeespoort. Vaginal tightening, fractional laser, and Plasmage treatments by certified practitioners. Medical-grade results.",
        keywords: ["medical aesthetics prices Hartbeespoort", "fractional laser cost South Africa", "skin tightening treatment near me", "Plasmage treatment prices", "scar treatment near me", "medical spa Pretoria", "aesthetic clinic Gauteng"],
        h1: "Medical Aesthetic Treatments",
        intro: "Advanced medical-grade aesthetic treatments performed by certified practitioners. We offer cutting-edge solutions for skin tightening, rejuvenation, and intimate wellness.",
        benefits: ["Medical-grade equipment", "Certified practitioners", "Private consultations", "Proven results"],
        faqs: [
            { q: "Are medical treatments safe?", a: "All our medical treatments use CE-approved equipment and are performed by trained, certified practitioners." },
            { q: "Is there downtime?", a: "Downtime varies by treatment. We'll discuss expectations during your consultation." },
        ],
    },
    "permanent-makeup": {
        title: "Permanent Make-Up - Brows, Lips & Eyes",
        description: "Semi-permanent makeup in Hartbeespoort. Microblading, powder brows, lip contour, and eyeliner. Wake up beautiful every day with long-lasting results.",
        keywords: ["microblading cost South Africa", "powder brows prices Hartbeespoort", "permanent makeup near me", "how much does microblading cost", "lip blush tattoo prices", "permanent eyeliner Pretoria", "semi-permanent brows Gauteng", "best microblading near me"],
        h1: "Permanent Make-Up - Wake Up Beautiful",
        intro: "Simplify your beauty routine with our semi-permanent makeup services. From perfectly shaped brows to defined lips and eyes, wake up looking flawless every day.",
        benefits: ["Long-lasting results", "Natural-looking enhancement", "Time-saving beauty", "Certified technicians"],
        faqs: [
            { q: "How long does permanent makeup last?", a: "Semi-permanent makeup typically lasts 1-3 years depending on skin type and aftercare." },
            { q: "Is it painful?", a: "We use topical numbing cream to ensure maximum comfort during the procedure." },
        ],
    },
    "pro-skin": {
        title: "Pro Skin Treatments - Advanced Skincare",
        description: "Professional skin treatments in Hartbeespoort. Dermaplaning, microneedling, and high-frequency facials. Advanced solutions for all skin concerns.",
        keywords: ["dermaplaning prices Hartbeespoort", "microneedling cost South Africa", "acne scar treatment near me", "pigmentation treatment Pretoria", "skin rejuvenation prices", "how much does microneedling cost", "best facial for acne scars"],
        h1: "Pro Skin - Advanced Skin Treatments",
        intro: "Transform your skin with our professional-grade treatments. From dermaplaning to microneedling, we offer advanced solutions targeting ageing, acne, scarring, and uneven skin tone.",
        benefits: ["Advanced techniques", "Visible improvements", "Customized treatments", "Expert therapists"],
        faqs: [
            { q: "What is dermaplaning?", a: "Dermaplaning gently exfoliates dead skin and removes peach fuzz, leaving skin smooth and radiant." },
            { q: "How often can I do microneedling?", a: "Microneedling is typically done every 4-6 weeks for a series of 3-6 treatments." },
        ],
    },
    "qms-facial": {
        title: "QMS Medicosmetics Facials",
        description: "Premium QMS Medicosmetics facials in Hartbeespoort. Medical-grade skincare with collagen treatments, chemical peels, and rejuvenating facials. German precision skincare.",
        keywords: ["QMS facial prices Hartbeespoort", "collagen facial near me", "best anti-aging facial South Africa", "fine lines treatment near me", "luxury facial prices Pretoria", "wrinkle treatment facial", "premium skincare Gauteng"],
        h1: "QMS Medicosmetics - Premium Facials",
        intro: "Experience German precision skincare with QMS Medicosmetics. Our premium facials use medical-grade formulations to deliver visible anti-ageing and rejuvenating results.",
        benefits: ["German precision formulas", "Medical-grade ingredients", "Collagen-boosting treatments", "Visible results"],
        faqs: [
            { q: "What makes QMS special?", a: "QMS Medicosmetics combines German engineering with medical-grade active ingredients for superior results." },
            { q: "Which QMS facial is best for me?", a: "Our therapists will assess your skin and recommend the ideal treatment during your consultation." },
        ],
    },
    "sunbed": {
        title: "Sunbed Tanning & Spray Tan",
        description: "Safe sunbed tanning and professional spray tan services in Hartbeespoort. Achieve a beautiful golden glow year-round. Package deals available.",
        keywords: ["sunbed prices Hartbeespoort", "spray tan near me", "tanning salon Pretoria", "sunbed packages near me", "how much does spray tan cost", "indoor tanning Gauteng", "bridal tan near me"],
        h1: "Sunbed & Spray Tan Services",
        intro: "Achieve a beautiful sun-kissed glow safely with our sunbed and spray tan services. Perfect for special occasions or maintaining your tan year-round.",
        benefits: ["Controlled UV exposure", "Professional spray tans", "Package savings", "Year-round glow"],
        faqs: [
            { q: "How long should I tan?", a: "We'll recommend session times based on your skin type, starting with shorter sessions." },
            { q: "How long does spray tan last?", a: "A professional spray tan typically lasts 5-7 days with proper care." },
        ],
    },
    "waxing": {
        title: "Professional Waxing Services",
        description: "Professional waxing services in Hartbeespoort. Brazilian, Hollywood, full body waxing for ladies and gents. Hygienic, gentle techniques for smooth skin.",
        keywords: ["waxing prices Hartbeespoort", "Brazilian wax cost near me", "Hollywood wax prices", "how much does a Brazilian wax cost", "mens waxing near me", "full body wax Pretoria", "painless waxing Gauteng", "affordable waxing near me"],
        h1: "Professional Waxing - Smooth & Silky Skin",
        intro: "Achieve silky smooth skin with our professional waxing services. We use gentle techniques and premium wax for minimal discomfort and long-lasting results.",
        benefits: ["Hygienic environment", "Premium quality wax", "Gentle techniques", "Long-lasting smoothness"],
        faqs: [
            { q: "How long does waxing last?", a: "Waxing results typically last 3-6 weeks depending on your hair growth cycle." },
            { q: "How long should hair be for waxing?", a: "Hair should be at least 5mm (about 2 weeks of growth) for best results." },
        ],
    },
    "hair": {
        title: "Hair Salon - Cuts, Colour & Styling",
        description: "Professional hair salon in Hartbeespoort. Haircuts, blow dry, colour, foils, balayage, and Brazilian blow treatments. Expert stylists for all hair types.",
        keywords: ["hair salon prices Hartbeespoort", "balayage cost South Africa", "haircut near me", "hair colour prices Pretoria", "keratin treatment cost", "highlights near me", "blow dry bar Gauteng", "best hair salon near me"],
        h1: "Hair Salon - Expert Cuts & Colour",
        intro: "Transform your look with our professional hair services. From precision cuts to stunning colour transformations, our expert stylists create beautiful results for all hair types.",
        benefits: ["Expert stylists", "Premium products", "All hair types welcome", "Latest techniques"],
        faqs: [
            { q: "Do I need to book in advance?", a: "Yes, we recommend booking in advance, especially for colour services and weekend appointments." },
            { q: "What products do you use?", a: "We use professional-grade products to ensure the health and beauty of your hair." },
        ],
    },
    "nails": {
        title: "Nail Salon - Manicure, Pedicure & Nail Art",
        description: "Professional nail services in Hartbeespoort. Manicures, pedicures, acrylic nails, gel nails, and nail art. Hygienic nail artistry with premium products.",
        keywords: ["nail prices Hartbeespoort", "gel nails cost near me", "acrylic nails prices South Africa", "manicure pedicure near me", "how much do acrylic nails cost", "nail salon Pretoria", "affordable nails Gauteng", "best nail salon near me"],
        h1: "Nail Artistry - Manicure & Pedicure",
        intro: "Pamper your hands and feet with our professional nail services. From classic manicures to stunning nail art and durable acrylics, we create beautiful nails you'll love.",
        benefits: ["Hygienic practices", "Premium nail products", "Skilled nail technicians", "Lasting results"],
        faqs: [
            { q: "How long do acrylic nails last?", a: "Acrylic nails last 2-3 weeks before needing a fill to maintain their appearance." },
            { q: "Do you sterilize your tools?", a: "Yes, we follow strict hygiene protocols and sterilize all reusable tools between clients." },
        ],
    },
    "lashes": {
        title: "Lash Extensions & Brow Services",
        description: "Professional lash extensions and brow treatments in Hartbeespoort. Russian volume lashes, classic lashes, lash lifts, brow lamination, and tinting. Certified lash technicians.",
        keywords: ["lash extensions prices Hartbeespoort", "how much do lash extensions cost", "volume lashes near me", "lash lift prices South Africa", "brow lamination cost", "best lash extensions Pretoria", "eyelash extensions Gauteng", "lash fill near me"],
        h1: "Lashes & Brows - Eye Enhancement",
        intro: "Enhance your natural beauty with our professional lash and brow services. From stunning volume lash extensions to perfectly shaped brows, we perfect every detail.",
        benefits: ["Certified lash technicians", "Premium lash materials", "Customized looks", "Long-lasting results"],
        faqs: [
            { q: "How long do lash extensions last?", a: "Lash extensions last 2-4 weeks before needing a fill, depending on your natural lash cycle." },
            { q: "Will lash extensions damage my natural lashes?", a: "When applied correctly by certified technicians, extensions won't damage your natural lashes." },
        ],
    },
    "hair-extensions": {
        title: "Hair Extensions - European Remy Human Hair",
        description: "Premium European Remy human hair extensions in Hartbeespoort. Tape-in, clip-in, keratin U-tip, micro loop, and halo hair. Double drawn, premium quality.",
        keywords: ["hair extensions prices Hartbeespoort", "tape-in extensions cost South Africa", "clip-in hair near me", "Remy human hair extensions prices", "best hair extensions Pretoria", "how much do hair extensions cost", "hair extension salon Gauteng"],
        h1: "Hair Extensions - Premium Remy Human Hair",
        intro: "Add length, volume, and dimension with our premium European Remy human hair extensions. We offer various application methods to suit your lifestyle and desired look.",
        benefits: ["100% Remy human hair", "Double drawn quality", "Multiple methods available", "Expert application"],
        faqs: [
            { q: "How long do hair extensions last?", a: "With proper care, Remy hair extensions can last 6-12 months or longer." },
            { q: "Which extension method is best?", a: "The best method depends on your hair type and lifestyle. We'll help you choose during consultation." },
        ],
    },
};

// Generate static paths for all categories
export function generateStaticParams() {
    return serviceCategories.map((category) => ({
        category: category.id,
    }));
}

// Fully static - no ISR
export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);
    const meta = categoryMeta[categoryId];

    if (!category) {
        return { title: "Service Not Found" };
    }

    // Use custom meta if available, otherwise generate from category data
    const title = meta?.title || `${category.title} | Prices & Booking`;
    const description = meta?.description || `${category.title} treatments at Galeo Beauty Hartbeespoort. ${category.subtitle}. View prices and book your appointment online.`;
    const keywords = meta?.keywords || [category.title.toLowerCase(), "Hartbeespoort", "beauty salon", "spa"];

    return {
        title: `${title} | Galeo Beauty Hartbeespoort`,
        description,
        keywords,
        openGraph: {
            title: `${title} | Galeo Beauty`,
            description,
            type: "website",
            images: [{ url: category.image, alt: category.title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        alternates: {
            canonical: `https://www.galeobeauty.com/prices/${categoryId}`,
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    const meta = categoryMeta[categoryId];
    const h1 = meta?.h1 || category.title;
    const intro = meta?.intro || `${category.subtitle}. Browse our treatments and book your appointment today.`;
    const benefits = meta?.benefits || [];
    const faqs = meta?.faqs || [];

    // JSON-LD structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": category.title,
        "description": meta?.description || category.subtitle,
        "provider": {
            "@type": "BeautySalon",
            "name": "Galeo Beauty",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hartbeespoort",
                "addressRegion": "North West",
                "addressCountry": "ZA"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": "Hartbeespoort"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${category.title} Services`,
            "itemListElement": category.subcategories.flatMap(sub =>
                sub.items.map(item => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": item.name,
                    },
                    "price": item.price.replace(/[^\d.]/g, ''),
                    "priceCurrency": "ZAR"
                }))
            )
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.galeobeauty.com" },
            { "@type": "ListItem", "position": 2, "name": "Prices", "item": "https://www.galeobeauty.com/prices" },
            { "@type": "ListItem", "position": 3, "name": category.title, "item": `https://www.galeobeauty.com/prices/${categoryId}` },
        ],
    };

    const faqJsonLd = faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    } : null;

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6">
                        {/* Breadcrumb */}
                        <Link
                            href="/prices"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6 text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Services
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <TrustBadge variant={category.badgeVariant}>
                                    {category.badge}
                                </TrustBadge>
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
                                {h1}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl">
                                {intro}
                            </p>

                            {/* Benefits */}
                            {benefits.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {benefits.map((benefit, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 bg-gold/10 text-gold px-3 py-1.5 rounded-full text-sm font-medium"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Booking Instructions */}
                <section className="py-6 border-b border-border/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="bg-secondary/30 rounded-2xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="font-medium text-foreground mb-1">How to Book</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Select the treatments you want, then click "Book Now" to complete your reservation. You can select multiple treatments.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gold">
                                    <Phone className="w-4 h-4" />
                                    <span>Or call: 012 253 9850</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Treatment List with Booking - Client Component */}
                <CategoryContent
                    subcategories={category.subcategories}
                    categoryId={category.id}
                    categoryTitle={category.title}
                />

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                            <h2 className="font-serif text-2xl sm:text-3xl text-foreground text-center mb-8">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                                        <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
                                        <p className="text-muted-foreground text-sm">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <ReviewsSection />

                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to book your {category.title.toLowerCase()} treatment?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-lg mx-auto">
                            Our specialists are ready to help you achieve your beauty goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-10">
                                <Link href="/contact">
                                    Contact Us
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="border border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background px-10">
                                <Link href="/prices">
                                    View All Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
