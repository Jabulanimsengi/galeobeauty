import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { ArrowRight, ArrowLeft, Phone, Sparkles } from "lucide-react";
import { serviceCategories, getCategoryById } from "@/lib/services-data";
import { CategoryContent } from "./category-content";
import { buildCategoryIntentCopy, buildCategoryKeywords, getCategoryIntentSignals } from "@/lib/seo-keywords";
import { getIntentPagesForCategory } from "@/lib/intent-pages";

// Comprehensive SEO metadata for each category - optimized for South African search
const categoryMeta: Record<string, {
    title: string;
    description: string;
    h1: string;
    intro: string;
    benefits: string[];
    faqs: { q: string; a: string }[];
}> = {
    "hart-aesthetics": {
        title: "Medical Aesthetics & Anti-Aging Hartbeespoort | Botox & Fillers",
        description: "Medical aesthetics in Hartbeespoort for wrinkles, tired-looking eyes, volume loss and non-surgical facial rejuvenation. Explore Botox, fillers and skin boosters at Galeo Beauty.",
        h1: "Medical Aesthetics & Anti-Aging in Hartbeespoort",
        intro: "If you want to look fresher, less tired or more lifted without losing what makes your face yours, our Hartbeespoort medical aesthetics offering is built around the result you want to see in the mirror. We combine anti-wrinkle injections, fillers, skin boosters and non-surgical rejuvenation with a natural-looking approach for clients from Harties, Pretoria and Centurion.",
        benefits: ["Qualified medical professionals", "Comprehensive treatment menu", "Premium FDA-approved products", "Natural-looking results"],
        faqs: [
            { q: "Which Hart Aesthetics treatments can I book in Hartbeespoort?", a: "You can book Botox, dermal fillers, Russian lips, skin boosters, liquid facelifts, Nefertiti lifts and selected advanced injectable treatments through our Hart Aesthetics offering at Galeo Beauty." },
            { q: "How do I know which injectable treatment is right for me?", a: "We start with a consultation to assess your goals, facial structure, previous treatment history and downtime preferences, then recommend the most suitable option instead of pushing a single treatment." },
            { q: "Are your medical aesthetics practitioners qualified?", a: "Yes. Advanced injectable and aesthetic treatments are performed by qualified professionals using approved products and treatment protocols." },
        ],
    },
    "fat-freezing": {
        title: "Fat Freezing Hartbeespoort | Cryolipolysis Harties Dam Area",
        description: "Fat freezing in Hartbeespoort for stubborn belly fat, love handles and other gym-resistant areas. Explore non-surgical body contouring at Galeo Beauty in Harties.",
        h1: "Fat Freezing in Hartbeespoort & Harties",
        intro: "This category is for clients who feel close to their goal weight but still feel bothered by a few stubborn areas that refuse to shift. Our Hartbeespoort fat-freezing treatments focus on non-surgical contouring for targeted pockets like the tummy, waistline and thighs, helping clients from Harties, Pretoria and Centurion refine shape without downtime.",
        benefits: ["Non-invasive procedure", "No downtime required", "Permanent fat cell reduction", "CE approved equipment"],
        faqs: [
            { q: "How many fat freezing sessions do I usually need?", a: "Most clients need 1 to 3 sessions per area depending on how much stubborn fat they want to reduce and how their body responds after the first treatment." },
            { q: "When do fat freezing results start showing?", a: "You may notice early changes within a few weeks, but the clearest results usually show between 8 and 12 weeks as the body processes the treated fat cells." },
            { q: "Is fat freezing a weight-loss treatment?", a: "No. Fat freezing is best for shaping specific areas such as the stomach, thighs or love handles rather than for overall scale weight loss." },
        ],
    },
    "slimming": {
        title: "Medical Weight Loss & Body Contouring Hartbeespoort | Slimming Injections",
        description: "Slimming and body contouring in Hartbeespoort for stubborn areas, inch loss and more defined shape. Explore slimming injections and non-surgical contouring at Galeo Beauty.",
        h1: "Medical Weight Loss & Body Contouring in Hartbeespoort",
        intro: "If your goal is not general weight loss but a cleaner outline, better waist definition or help with a few frustrating pockets of fullness, these Hartbeespoort slimming treatments are designed around targeted shaping. We offer selected injections and contouring support for clients who want visible refinement without surgery.",
        benefits: ["Medical-grade solutions", "Targeted fat reduction", "Non-surgical options", "Visible results"],
        faqs: [
            { q: "What slimming and body contouring treatments do you offer?", a: "We offer selected slimming injections, fat-dissolving options and body contouring technologies designed for clients who want targeted shaping without surgery." },
            { q: "Will these treatments help with weight loss or inch loss?", a: "Most clients use these treatments for inch loss, contouring and stubborn areas rather than relying on them as a stand-alone weight-loss solution." },
            { q: "Are slimming treatments safe?", a: "Yes, when used appropriately. We review your goals and suitability first, then recommend only treatments that make sense for your body and medical history." },
        ],
    },
    "dermalogica": {
        title: "Dermalogica Skincare, Peels & Microneedling Hartbeespoort",
        description: "Dermalogica facials, peels and microneedling in Hartbeespoort for breakouts, pigmentation, dull skin and uneven texture. Professional skin treatments at Galeo Beauty.",
        h1: "Dermalogica Skincare & Advanced Peels in Hartbeespoort",
        intro: "If your skin feels congested, breakout-prone, dull or uneven, our Hartbeespoort Dermalogica treatments are designed to match the concern you actually want solved. From peels and microneedling to deep-cleansing and glow-focused facials, we help clients from Harties, Pretoria and Centurion choose the right level of correction for their skin.",
        benefits: ["Expert skin analysis", "Advanced chemical peels", "Clinical microneedling", "Personalized treatment plans"],
        faqs: [
            { q: "Do you offer chemical peels and microneedling in Hartbeespoort?", a: "Yes. Our Dermalogica category includes professional peels, Pro Microneedling, dermaplaning and customized skin treatments based on your concern." },
            { q: "Which Dermalogica treatment is best for acne, pigmentation or dull skin?", a: "That depends on your skin barrier, sensitivity and goals. We usually recommend a peel, microneedling or Pro Skin treatment only after assessing your skin properly." },
            { q: "Is Dermalogica suitable for sensitive skin?", a: "Yes, many Dermalogica treatments can be adapted for sensitive skin, but the exact products and intensity should be customized to your tolerance level." },
        ],
    },
    "ipl": {
        title: "IPL Hair Removal & Laser Tattoo Removal Hartbeespoort",
        description: "IPL hair removal in Hartbeespoort for unwanted facial and body hair, shaving rash and ingrowns. Explore long-term hair reduction and tattoo removal at Galeo Beauty.",
        h1: "IPL Hair Removal & Laser Tattoo Removal in Hartbeespoort",
        intro: "This category suits clients who are tired of constant shaving, fast regrowth, bumps or ingrowns and want a lower-maintenance way to stay smoother for longer. Our Hartbeespoort IPL treatments support long-term hair reduction for face and body, with tattoo-removal options available for clients who want to fade unwanted ink.",
        benefits: ["Permanent hair reduction", "Effective tattoo removal", "CE approved technology", "Safe for most skin types"],
        faqs: [
            { q: "Do you offer both IPL hair removal and tattoo removal in Hartbeespoort?", a: "Yes. This category covers both IPL hair reduction for unwanted hair and laser-style tattoo removal services for fading unwanted ink." },
            { q: "Is IPL hair removal permanent?", a: "IPL is best described as permanent hair reduction. Most clients see a major drop in regrowth after a full course, with occasional maintenance depending on the area." },
            { q: "How many sessions are usually needed?", a: "Most IPL and tattoo-removal plans require multiple sessions because hair and pigment clear in stages, so we build a course based on the area being treated." },
        ],
    },
    "makeup": {
        title: "Professional Make-Up Hartbeespoort | Bridal Makeup Harties",
        description: "Professional makeup in Hartbeespoort for bridal, evening and event glam that lasts, photographs beautifully and still feels like you. Book with Galeo Beauty in Harties.",
        h1: "Professional Make-Up in Hartbeespoort & Harties",
        intro: "If you want makeup that survives the full event, looks beautiful in photos and still feels true to your features, our Hartbeespoort makeup bookings are built around that outcome. We create bridal, occasion and event looks for clients who want to feel polished, confident and camera-ready without looking overdone.",
        benefits: ["Kryolan professional products", "Trained makeup artists", "Long-lasting formulas", "Personalized looks"],
        faqs: [
            { q: "Can I book bridal, evening and matric makeup in Hartbeespoort?", a: "Yes. We offer bridal makeup, special occasion makeup, day and evening makeup, plus matric dance bookings from our Hartbeespoort salon." },
            { q: "Do you recommend a bridal makeup trial?", a: "Yes. A trial helps us test your preferred look, skin prep and timing so there are no surprises on the wedding day." },
            { q: "How long should I allow for bridal makeup?", a: "Bridal makeup usually takes around 60 to 90 minutes depending on the look, skin prep and whether lashes are included." },
        ],
    },
    "medical": {
        title: "Clinical Skin & Laser Treatments Hartbeespoort | Advanced Aesthetics",
        description: "Clinical skin treatments in Hartbeespoort for acne scars, loose skin, uneven texture and advanced skin renewal. Explore fractional laser and Plasmage at Galeo Beauty.",
        h1: "Advanced Clinical Skin & Laser Treatments in Hartbeespoort",
        intro: "These treatments are for concerns that usually need more than a standard facial, like acne scarring, loose eyelid skin, rough texture or skin that needs a stronger corrective reset. Our Hartbeespoort clinical skin offering includes advanced resurfacing and lifting options for clients who want visible improvement with a medical-grade approach.",
        benefits: ["Clinical-grade technology", "Non-surgical solutions", "Advanced skin rejuvenation", "Private & professional"],
        faqs: [
            { q: "What advanced clinical treatments are available in this category?", a: "This category includes treatments such as fractional laser, Plasmage, vaginal tightening and selected advanced skin procedures depending on suitability." },
            { q: "How much downtime should I expect from clinical skin treatments?", a: "Downtime depends on the treatment. Some involve little to none, while stronger resurfacing treatments may need a few recovery days." },
            { q: "Is fractional laser painful?", a: "Most clients feel heat and discomfort rather than sharp pain, and we use topical numbing where appropriate to make treatment more manageable." },
        ],
    },
    "permanent-makeup": {
        title: "Permanent Makeup Hartbeespoort | Microblading & Powder Brows Harties",
        description: "Permanent makeup in Hartbeespoort for brows, lips and eyeliner that cut down daily makeup time and still look soft and natural. Book semi-permanent beauty at Galeo Beauty.",
        h1: "Permanent Makeup, Microblading & Powder Brows in Hartbeespoort",
        intro: "If you spend too much time filling in brows, reapplying liner or wishing your lip colour looked more even, our Hartbeespoort permanent makeup services are designed to make mornings easier. We offer brow, lip and eyeliner options for clients who want a put-together look that stays soft, flattering and low maintenance.",
        benefits: ["Long-lasting results", "Natural-looking enhancement", "Time-saving beauty", "Certified technicians"],
        faqs: [
            { q: "Where can I book microblading or powder brows in Hartbeespoort?", a: "Galeo Beauty offers microblading, powder brows, hybrid brows, lip blush and eyeliner near Hartbeespoort Dam for clients from Harties, Centurion and Pretoria." },
            { q: "What is the difference between microblading and powder brows?", a: "Microblading creates finer hair-like strokes, while powder brows create a softer shaded finish that often suits oily skin and clients who like a more defined brow." },
            { q: "How long does permanent makeup last?", a: "Most permanent makeup results last around 1 to 3 years depending on the treatment, your skin type, sun exposure and whether you maintain touch-up appointments." },
        ],
    },
    "massages": {
        title: "Massage Hartbeespoort | Relaxing & Deep Tissue Massage in Harties",
        description: "Massage therapy in Hartbeespoort for stress, tight shoulders, muscle knots and full-body relaxation. Book Swedish, deep tissue, hot stone and aromatherapy massage at Galeo Beauty.",
        h1: "Massage Therapy in Hartbeespoort & Harties",
        intro: "Whether your body feels tight and overworked or you simply need a proper reset, our Hartbeespoort massage therapy offering is built around relief, recovery and real relaxation. We offer Swedish, deep tissue, hot stone and aromatherapy massage for clients from Harties, Pretoria and Centurion who want to leave feeling lighter than they arrived.",
        benefits: ["Certified massage therapists", "Aromatherapy oils", "Multiple massage styles", "Relaxing environment"],
        faqs: [
            { q: "Where can I get a massage in Hartbeespoort?", a: "Galeo Beauty offers massage therapy near Hartbeespoort Dam, including relaxation, deep tissue, aromatherapy and hot stone options." },
            { q: "Which massage is best for stress relief versus muscle tension?", a: "Swedish and aromatherapy are usually best for relaxation, while deep tissue and targeted treatments suit clients with tight muscles or recovery needs." },
            { q: "How long should I book for a massage?", a: "A 60-minute massage is the most balanced option for most clients, while shorter sessions suit focused tension relief and longer sessions suit a more indulgent spa experience." },
        ],
    },
    "qms": {
        title: "QMS Medicosmetics Facials Hartbeespoort | Premium Skincare Harties",
        description: "QMS facials in Hartbeespoort for dehydrated, tired and mature skin that needs firmer, fresher-looking results. Explore collagen-focused facials at Galeo Beauty.",
        h1: "QMS Medicosmetics Facials in Hartbeespoort & Harties",
        intro: "If your skin feels dry, dull, depleted or less firm than it used to, our Hartbeespoort QMS facials are designed to bring back comfort, bounce and a healthier glow. These treatments are especially popular for clients who want a more polished, collagen-focused facial experience with visible skin-renewing benefits.",
        benefits: ["German precision formulas", "Medical-grade ingredients", "Collagen-boosting treatments", "Visible results"],
        faqs: [
            { q: "What makes QMS different from a standard facial?", a: "QMS focuses on premium medical-grade skincare, collagen support and more corrective anti-aging results than a basic relaxation facial." },
            { q: "Which QMS facial is best for me?", a: "That depends on whether you are targeting dehydration, dullness, fine lines or firmness. We match the facial to your skin goals after assessment." },
            { q: "Are QMS facials mainly for mature skin?", a: "They are especially popular for anti-aging concerns, but they can also suit younger clients who want stronger corrective skincare and visible skin-refining results." },
        ],
    },
    "sunbed": {
        title: "Sunbed Tanning & Spray Tan Hartbeespoort | Tanning Harties",
        description: "Spray tan and sunbed tanning in Hartbeespoort for an even glow before holidays, weddings and events. Get a natural-looking tan at Galeo Beauty in Harties.",
        h1: "Sunbed & Spray Tan in Hartbeespoort (Harties)",
        intro: "If you want to look warmer, fresher and more confident in photos or open outfits, our Hartbeespoort tanning services are designed around that result. We offer spray tans and sunbed options for clients who want believable colour without streaks, patchiness or a rushed last-minute finish.",
        benefits: ["Controlled UV exposure", "Professional spray tans", "Package savings", "Year-round glow"],
        faqs: [
            { q: "Can I book both sunbed tanning and spray tanning in Hartbeespoort?", a: "Yes. We offer both sunbed sessions and professional spray tanning, depending on whether you want a UV tan or a quicker cosmetic glow." },
            { q: "How long does a spray tan last?", a: "A spray tan usually lasts around 5 to 7 days with proper prep and aftercare, including gentle showering and moisturising." },
            { q: "How often should I use a sunbed?", a: "That depends on your skin type and tanning history. We keep sessions controlled and spaced responsibly rather than recommending overuse." },
        ],
    },
    "waxing": {
        title: "Professional Waxing Hartbeespoort | Brazilian Wax Harties",
        description: "Professional waxing in Hartbeespoort for smoother skin, longer-lasting hair removal and less daily shaving hassle. Book Brazilian, Hollywood and body waxing at Galeo Beauty.",
        h1: "Professional Waxing in Hartbeespoort & Harties",
        intro: "This category is for clients who are tired of shaving, fast regrowth and the constant effort of keeping everything neat. Our Hartbeespoort waxing services cover face, body and intimate areas with a focus on smoother skin, slower regrowth and a gentler, more comfortable experience.",
        benefits: ["Hygienic environment", "Premium quality wax", "Gentle techniques", "Long-lasting smoothness"],
        faqs: [
            { q: "How long should hair be before waxing?", a: "Hair should usually be at least 5 mm long so the wax can grip properly without causing unnecessary irritation." },
            { q: "What is the difference between a Brazilian and a Hollywood wax?", a: "A Brazilian usually leaves a small strip or shape, while a Hollywood removes everything. If you are unsure, we can explain both before treatment starts." },
            { q: "How often should I book waxing appointments?", a: "Most clients rebook every 3 to 6 weeks depending on the area and how quickly their hair grows back." },
        ],
    },
    "hair": {
        title: "Hair Salon Hartbeespoort | Hairdresser, Colour & Styling in Harties",
        description: "Hair salon in Hartbeespoort for brassy blonde correction, grey coverage, colour refresh, smoothing and polished styling. Book your Galeo Beauty hair appointment in Harties.",
        h1: "Hair Salon & Styling in Hartbeespoort",
        intro: "If your hair feels flat, brassy, frizzy or simply overdue for a proper refresh, our Hartbeespoort salon services are designed around the problem you want fixed first. We help clients choose between colour, blonding, smoothing, repair and styling services that bring hair back to a more polished, healthy-looking finish.",
        benefits: ["Expert stylists", "Premium products", "All hair types welcome", "Latest techniques"],
        faqs: [
            { q: "Where can I find a hair salon in Hartbeespoort for colour and styling?", a: "Galeo Beauty offers cuts, blow-dries, balayage, foils, toner and Brazilian treatments from our Hartbeespoort salon near Hartbeespoort Dam." },
            { q: "Do you offer colour, foils and Brazilian blowouts?", a: "Yes. We offer colour services, foils, toner, balayage and Brazilian smoothing treatments using professional salon products." },
            { q: "How often should I book cuts or colour maintenance?", a: "That depends on your service, but many clients rebook cuts every 6 to 8 weeks and colour or toner maintenance based on fading, regrowth and the look they want to maintain." },
        ],
    },
    "nails": {
        title: "Nail Salon Hartbeespoort | Gel Nails, Acrylics & Pedicures in Harties",
        description: "Nail salon in Hartbeespoort for long-lasting manicures, stronger natural nails, acrylics, gel and polished pedicures. Book your nail appointment at Galeo Beauty.",
        h1: "Nail Salon in Hartbeespoort & Harties",
        intro: "If your manicures chip too quickly, your natural nails feel weak, or you just want hands and feet to look more refined, our Hartbeespoort nail services are built around durability and finish. We offer gel, acrylic, builder support and pedicure care for clients who want polished results that actually hold up.",
        benefits: ["Hygienic practices", "Premium nail products", "Skilled nail technicians", "Lasting results"],
        faqs: [
            { q: "Where can I find a nail salon in Hartbeespoort for gel and acrylic nails?", a: "Galeo Beauty offers gel nails, acrylic nails, manicures, pedicures and nail art from our Hartbeespoort salon near Hartbeespoort Dam." },
            { q: "Do you do both gel nails and acrylic nails in Harties?", a: "Yes. We offer gel overlays, acrylic full sets, fills, manicures and pedicures with strict hygiene protocols and professional nail products." },
            { q: "How often should I book a fill or maintenance appointment?", a: "Most nail clients rebook every 2 to 3 weeks for fills, rebalancing or soak-offs depending on growth, wear and the system they are wearing." },
        ],
    },
    "lashes-brows": {
        title: "Lash Extensions Hartbeespoort | Eyelash Extensions & Brows in Harties",
        description: "Lash extensions and brow treatments in Hartbeespoort for fuller-looking lashes, better brow shape and easier everyday beauty. Book at Galeo Beauty in Harties.",
        h1: "Lash Extensions & Brows in Hartbeespoort",
        intro: "If you want to wake up looking more put together without doing a full makeup routine, our Hartbeespoort lash and brow services are designed for that exact goal. We offer lash extensions, lifts and brow styling for clients who want more eye definition, softer features and a lower-maintenance beauty routine.",
        benefits: ["Certified lash technicians", "Premium lash materials", "Customized looks", "Long-lasting results"],
        faqs: [
            { q: "Where can I get eyelash extensions in Hartbeespoort?", a: "Galeo Beauty offers eyelash extensions near Hartbeespoort Dam, including classic, hybrid and volume sets, plus lash lifts and brow treatments." },
            { q: "Will lash extensions damage my natural lashes?", a: "Not when they are applied correctly and maintained properly. Healthy natural lashes should be protected by correct lash mapping, weight selection and aftercare." },
            { q: "How often do I need lash fills or brow maintenance?", a: "Most lash extension clients need fills every 2 to 3 weeks, while brow tinting, lamination and similar services vary based on growth and aftercare." },
        ],
    },
    "hair-extensions": {
        title: "Hair Extensions Hartbeespoort | Remy Human Hair Harties",
        description: "Hair extensions in Hartbeespoort for instant length, fuller volume and better thickness through fine or short hair. Explore tape-ins, clip-ins and Remy hair at Galeo Beauty.",
        h1: "Hair Extensions in Hartbeespoort & Harties",
        intro: "If your hair feels too fine, too short or too flat to create the look you want, our Hartbeespoort hair extensions are designed to add length and fullness without sacrificing a natural blend. We offer multiple extension methods for clients who want thicker styling, a fuller ponytail or instant transformation with premium Remy hair.",
        benefits: ["100% Remy human hair", "Double drawn quality", "Multiple methods available", "Expert application"],
        faqs: [
            { q: "Where can I get hair extensions in Hartbeespoort?", a: "Galeo Beauty offers premium hair extensions near Hartbeespoort Dam, including tape-ins, clip-ins, U-tip, micro loop and halo options." },
            { q: "Which hair extension method is best for me?", a: "That depends on your hair density, lifestyle, maintenance budget and styling goals. We recommend a method only after checking your natural hair properly." },
            { q: "How long do hair extensions usually last?", a: "Longevity depends on the method, home care and how often you maintain them, but professional extensions can last from several weeks to a few months before refitting or replacement." },
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

    const title = meta?.title || `${category.title} | Prices & Booking Hartbeespoort`;
    let description = meta?.description || `${category.title} treatments at Galeo Beauty Hartbeespoort. ${category.subtitle}. View prices and book your appointment online.`;
    if (!description.toLowerCase().includes("hartbeespoort") || !description.toLowerCase().includes("harties")) {
        description = `${description} Serving Hartbeespoort | Harties.`;
    }

    return {
        title: `${title} | Galeo Beauty`,
        description,
        keywords: buildCategoryKeywords(category),
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
    const intentSignals = getCategoryIntentSignals(category.id);
    const intentCopy = buildCategoryIntentCopy(category.title, category.id);
    const relatedIntentPages = getIntentPagesForCategory(category.id);

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
                        <CloudinaryImage
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
                            <div className="mt-5 max-w-3xl space-y-3 text-sm sm:text-base text-muted-foreground">
                                <p>{intentCopy.problemStatement}</p>
                                <p>{intentCopy.resultStatement}</p>
                                <p>{intentCopy.reassuranceStatement}</p>
                            </div>

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

                <section className="py-12 border-y border-border/30 bg-secondary/10">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[2rem] border border-border/50 bg-background p-7">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    Common Concerns
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">What Brings You Here</h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                    Most journeys in this category start with a visible concern, a recurring frustration, or something
                                    that no longer feels right. Let us know what you'd like to address, and we'll guide you toward
                                    the treatment path that fits best.
                                </p>
                                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {intentSignals.painPoints.slice(0, 8).map((term) => (
                                        <li
                                            key={term}
                                            className="rounded-2xl border border-border/60 bg-secondary/20 px-4 py-3 text-sm leading-relaxed text-foreground"
                                        >
                                            {term}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-[2rem] border border-border/50 bg-background p-7">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    The Results
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">What to Expect Afterwards</h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                    You likely already know the result you're looking for—whether it's clearer,
                                    smoother, brighter, or more refined results. Our goal is to help you compare the options that will truly get you there.
                                </p>
                                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {intentSignals.results.slice(0, 8).map((term) => (
                                        <li
                                            key={term}
                                            className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-foreground"
                                        >
                                            {term}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-[2rem] border border-border/50 bg-background p-7">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    Weighing Your Options
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">How We Help You Decide</h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                    Before booking, it's natural to want to compare approaches side by side. We skip the jargon
                                    and help you understand which option truly fits your skin, goals, downtime, and budget.
                                </p>
                                <div className="mt-6 space-y-3 rounded-2xl border border-border/60 bg-secondary/15 p-5 text-sm leading-relaxed text-foreground">
                                    <p>We help you understand the real differences between treatments, not just the names on the menu.</p>
                                    <p>That means discussing comfort, recovery time, maintenance, and how realistic each result will be for your specific concern.</p>
                                    <p>Our priority is finding the most suitable path for you, not simply the strongest or most expensive option.</p>
                                </div>
                            </div>
                            <div className="rounded-[2rem] border border-border/50 bg-background p-7">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    Peace of Mind
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">What to Know Before Booking</h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                    It's completely normal to want full confidence before you commit. We're here to explain whether a treatment
                                    is suitable, gentle enough, worth the downtime, and appropriate for your specific situation.
                                </p>
                                <div className="mt-6 space-y-3 rounded-2xl border border-border/60 bg-background p-5 text-sm leading-relaxed text-foreground">
                                    <p>We gently talk you through suitability, sensitivity, aftercare, and exactly what to expect before you commit to any treatment path.</p>
                                    <p>This is especially helpful when timing matters—like booking before an event, starting a skin reset, or choosing an option with manageable downtime.</p>
                                    <p>Our focus is on absolute clarity, so you know exactly why a recommendation makes sense for you personally.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {relatedIntentPages.length > 0 && (
                    <section className="py-10 border-b border-border/30 bg-background">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-3xl mb-6">
                                <h2 className="font-serif text-2xl text-foreground">Helpful Treatment Guides</h2>
                                <p className="text-sm text-muted-foreground mt-2">
                                    If you are still deciding, these guides can help you understand common concerns, treatment
                                    options, and what may suit your goals best.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {relatedIntentPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/${page.slug}`}
                                        className="rounded-2xl border border-border bg-secondary/10 p-5 transition-colors hover:border-gold/40"
                                    >
                                        <h3 className="font-medium text-foreground">{page.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{page.metaDescription}</p>
                                        <span className="mt-4 inline-block text-sm font-medium text-gold">Read guide</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Booking Instructions */}
                <section className="py-6 border-b border-border/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="bg-secondary/30 rounded-2xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="font-medium text-foreground mb-1">How to Book</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Select the treatments you want, then click &quot;Book Now&quot; to complete your reservation. You can select multiple treatments.
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
