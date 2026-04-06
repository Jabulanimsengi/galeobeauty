import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { ArrowRight } from "lucide-react";
import { serviceCategories, getCategoryById } from "@/lib/services-data";
import { CategoryContent } from "./category-content";
import { buildCategoryMetadataKeywords } from "@/lib/seo-keywords";
import { getIntentPagesForCategory } from "@/lib/intent-pages";
import { toAbsoluteUrl } from "@/lib/site-url";

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
        intro: "If you want to look fresher, less tired or more lifted without losing what makes your face yours, our Hartbeespoort medical aesthetics offering is built around the result you want to see in the mirror. We combine anti-wrinkle injections, fillers, skin boosters and non-surgical rejuvenation with a natural-looking approach for clients from Hartbeespoort, Pretoria, and Centurion.",
        benefits: ["Qualified medical professionals", "Comprehensive treatment menu", "Premium FDA-approved products", "Natural-looking results"],
        faqs: [
            { q: "Which Hart Aesthetics treatments can I book in Hartbeespoort?", a: "You can book Botox, dermal fillers, Russian lips, skin boosters, liquid facelifts, Nefertiti lifts and selected advanced injectable treatments through our Hart Aesthetics offering at Galeo Beauty." },
            { q: "How do I know which injectable treatment is right for me?", a: "We start with a consultation to assess your goals, facial structure, previous treatment history and downtime preferences, then recommend the most suitable option instead of pushing a single treatment." },
            { q: "Are your medical aesthetics practitioners qualified?", a: "Yes. Advanced injectable and aesthetic treatments are performed by qualified professionals using approved products and treatment protocols." },
        ],
    },
    "fat-freezing": {
        title: "Fat Freezing Hartbeespoort | Cryolipolysis & Body Contouring",
        description: "Fat freezing in Hartbeespoort for stubborn belly fat, love handles and other gym-resistant areas. Explore non-surgical body contouring at Galeo Beauty.",
        h1: "Fat Freezing in Hartbeespoort",
        intro: "This category is for clients who feel close to their goal weight but still feel bothered by a few stubborn areas that refuse to shift. Our Hartbeespoort fat-freezing treatments focus on non-surgical contouring for targeted pockets like the tummy, waistline and thighs, helping clients from Hartbeespoort, Pretoria, and Centurion refine shape without downtime.",
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
        intro: "If your skin feels congested, breakout-prone, dull or uneven, our Hartbeespoort Dermalogica treatments are designed to match the concern you actually want solved. From peels and microneedling to deep-cleansing and glow-focused facials, we help clients from Hartbeespoort, Pretoria, and Centurion choose the right level of correction for their skin.",
        benefits: ["Expert skin analysis", "Advanced chemical peels", "Clinical microneedling", "Personalized treatment plans"],
        faqs: [
            { q: "Do you offer chemical peels and microneedling in Hartbeespoort?", a: "Yes. Our Dermalogica category includes professional peels, Pro Microneedling, dermaplaning and customized skin treatments based on your concern." },
            { q: "Which Dermalogica treatment is best for acne, pigmentation or dull skin?", a: "The right option comes down to your skin barrier, sensitivity and goals. We usually recommend a peel, microneedling or Pro Skin treatment only after assessing your skin properly." },
            { q: "Is Dermalogica suitable for sensitive skin?", a: "Yes, many Dermalogica treatments can be adapted for sensitive skin, but the exact products and intensity should be customized to your tolerance level." },
        ],
    },
    "ipl": {
        title: "IPL Hair Removal & Laser Tattoo Removal Hartbeespoort",
        description: "Intense Pulsed Light (IPL) hair removal in Hartbeespoort for unwanted facial and body hair, shaving rash and ingrowns. Explore long-term hair reduction and tattoo removal at Galeo Beauty.",
        h1: "IPL Hair Removal & Laser Tattoo Removal in Hartbeespoort",
        intro: "This category suits clients who are tired of constant shaving, fast regrowth, bumps or ingrowns and want a lower-maintenance way to stay smoother for longer. Our Hartbeespoort Intense Pulsed Light (IPL) treatments support long-term hair reduction for face and body, with tattoo-removal options available for clients who want to fade unwanted ink.",
        benefits: ["Permanent hair reduction", "Effective tattoo removal", "CE approved technology", "Safe for most skin types"],
        faqs: [
            { q: "Do you offer both IPL hair removal and tattoo removal in Hartbeespoort?", a: "Yes. This category covers both IPL hair reduction for unwanted hair and laser-style tattoo removal services for fading unwanted ink." },
            { q: "Is IPL hair removal permanent?", a: "IPL is best described as permanent hair reduction. Most clients see a major drop in regrowth after a full course, with occasional maintenance depending on the area." },
            { q: "How many sessions are usually needed?", a: "Most IPL and tattoo-removal plans require multiple sessions because hair and pigment clear in stages, so we build a course based on the area being treated." },
        ],
    },
    "makeup": {
        title: "Professional Make-Up Hartbeespoort | Bridal & Event Makeup",
        description: "Professional makeup in Hartbeespoort for bridal, evening and event glam that lasts, photographs beautifully and still feels like you.",
        h1: "Professional Make-Up in Hartbeespoort",
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
        title: "Permanent Makeup Hartbeespoort | Microblading & Powder Brows",
        description: "Permanent makeup in Hartbeespoort for brows, lips and eyeliner that cut down daily makeup time and still look soft and natural. Book semi-permanent beauty at Galeo Beauty.",
        h1: "Permanent Makeup, Microblading & Powder Brows in Hartbeespoort",
        intro: "If you spend too much time filling in brows, reapplying liner or wishing your lip colour looked more even, our Hartbeespoort permanent makeup services are designed to make mornings easier. We offer brow, lip and eyeliner options for clients who want a put-together look that stays soft, flattering and low maintenance.",
        benefits: ["Long-lasting results", "Natural-looking enhancement", "Time-saving beauty", "Certified technicians"],
        faqs: [
            { q: "Where can I book microblading or powder brows in Hartbeespoort?", a: "Galeo Beauty offers microblading, powder brows and hybrid brows near Hartbeespoort Dam for clients who want fuller, more defined brows with less daily makeup." },
            { q: "What is the difference between microblading and powder brows?", a: "Microblading creates finer hair-like strokes, while powder brows create a softer shaded finish that often suits oily skin and clients who like a more defined brow." },
            { q: "How long does permanent makeup last?", a: "Most permanent makeup results last around 1 to 3 years depending on the treatment, your skin type, sun exposure and whether you maintain touch-up appointments." },
        ],
    },
    "massages": {
        title: "Massage Hartbeespoort | Relaxing & Deep Tissue Massage",
        description: "Massage therapy in Hartbeespoort for stress, tight shoulders, muscle knots and full-body relaxation. Book Swedish, deep tissue, hot stone and aromatherapy massage at Galeo Beauty.",
        h1: "Massage Therapy in Hartbeespoort",
        intro: "Whether your body feels tight and overworked or you simply need a proper reset, our Hartbeespoort massage therapy offering is built around relief, recovery and real relaxation. We offer Swedish, deep tissue, hot stone and aromatherapy massage for clients from Hartbeespoort, Pretoria, and Centurion who want to leave feeling lighter than they arrived.",
        benefits: ["Certified massage therapists", "Aromatherapy oils", "Multiple massage styles", "Relaxing environment"],
        faqs: [
            { q: "Where can I get a massage in Hartbeespoort?", a: "Galeo Beauty offers massage therapy near Hartbeespoort Dam, including relaxation, deep tissue, aromatherapy and hot stone options." },
            { q: "Which massage is best for stress relief versus muscle tension?", a: "Swedish and aromatherapy are usually best for relaxation, while deep tissue and targeted treatments suit clients with tight muscles or recovery needs." },
            { q: "How long should I book for a massage?", a: "A 60-minute massage is the most balanced option for most clients, while shorter sessions suit focused tension relief and longer sessions suit a more indulgent spa experience." },
        ],
    },
    "qms": {
        title: "QMS Medicosmetics Facials Hartbeespoort | Premium Skincare",
        description: "QMS facials in Hartbeespoort for dehydrated, tired and mature skin that needs firmer, fresher-looking results. Explore collagen-focused facials at Galeo Beauty.",
        h1: "QMS Medicosmetics Facials in Hartbeespoort",
        intro: "If your skin feels dry, dull, depleted or less firm than it used to, our Hartbeespoort QMS facials are designed to bring back comfort, bounce and a healthier glow. These treatments are especially popular for clients who want a more polished, collagen-focused facial experience with visible skin-renewing benefits.",
        benefits: ["German precision formulas", "Medical-grade ingredients", "Collagen-boosting treatments", "Visible results"],
        faqs: [
            { q: "What makes QMS different from a standard facial?", a: "QMS focuses on premium medical-grade skincare, collagen support and more corrective anti-aging results than a basic relaxation facial." },
            { q: "Which QMS facial is best for me?", a: "The best fit depends on whether you are targeting dehydration, dullness, fine lines or firmness. We match the facial to your skin goals after assessment." },
            { q: "Are QMS facials mainly for mature skin?", a: "They are especially popular for anti-aging concerns, but they can also suit younger clients who want stronger corrective skincare and visible skin-refining results." },
        ],
    },
    "sunbed": {
        title: "Sunbed Tanning & Spray Tan Hartbeespoort | Tanning",
        description: "Spray tan and sunbed tanning in Hartbeespoort for an even glow before holidays, weddings and events. Get a natural-looking tan at Galeo Beauty.",
        h1: "Sunbed & Spray Tan in Hartbeespoort",
        intro: "If you want to look warmer, fresher and more confident in photos or open outfits, our Hartbeespoort tanning services are designed around that result. We offer spray tans and sunbed options for clients who want believable colour without streaks, patchiness or a rushed last-minute finish.",
        benefits: ["Controlled UV exposure", "Professional spray tans", "Package savings", "Year-round glow"],
        faqs: [
            { q: "Can I book both sunbed tanning and spray tanning in Hartbeespoort?", a: "Yes. We offer both spray tans and controlled sunbed sessions, so you can choose either an immediate cosmetic glow or a more gradual tanning route." },
            { q: "How long does a spray tan last?", a: "A spray tan usually lasts around 5 to 7 days with proper prep and aftercare, including gentle showering and moisturising." },
            { q: "How often should I use a sunbed?", a: "That should be guided by your skin type and tanning history. We keep sessions controlled and spaced responsibly rather than recommending overuse." },
        ],
    },
    "waxing": {
        title: "Professional Waxing Hartbeespoort | Brazilian Wax & Body Waxing",
        description: "Professional waxing in Hartbeespoort for smoother skin, longer-lasting hair removal and less daily shaving hassle. Book Brazilian, Hollywood and body waxing at Galeo Beauty.",
        h1: "Professional Waxing in Hartbeespoort",
        intro: "This category is for clients who are tired of shaving, fast regrowth and the constant effort of keeping everything neat. Our Hartbeespoort waxing services cover face, body and intimate areas with a focus on smoother skin, slower regrowth and a gentler, more comfortable experience.",
        benefits: ["Hygienic environment", "Premium quality wax", "Gentle techniques", "Long-lasting smoothness"],
        faqs: [
            { q: "How long should hair be before waxing?", a: "Hair should usually be at least 5 mm long so the wax can grip properly without causing unnecessary irritation." },
            { q: "What is the difference between a Brazilian and a Hollywood wax?", a: "A Brazilian usually leaves a small strip or shape, while a Hollywood removes everything. If you are unsure, we can explain both before treatment starts." },
            { q: "How often should I book waxing appointments?", a: "Most clients rebook every 3 to 6 weeks depending on the area and how quickly their hair grows back." },
        ],
    },
    "hair": {
        title: "Hair Salon Hartbeespoort | Hairdresser, Colour, Blowouts & Keratin",
        description: "Hair salon and hairdresser in Hartbeespoort for cuts, blow-dries, balayage, grey coverage, keratin and polished styling. Book your Galeo Beauty hair appointment.",
        h1: "Hair Salon & Styling in Hartbeespoort",
        intro: "If your hair feels flat, brassy, frizzy or simply overdue for a proper refresh, our Hartbeespoort hair appointments are designed around the problem you want fixed first. We help clients choose between cuts, blow-dries, colour, blonding, smoothing, repair and styling services that bring hair back to a more polished, healthy-looking finish.",
        benefits: ["Expert stylists", "Premium products", "All hair types welcome", "Latest techniques"],
        faqs: [
            { q: "Where can I find a hairdresser in Hartbeespoort for colour and styling?", a: "Galeo Beauty offers hairdresser services in Hartbeespoort including cuts, blow-dries, balayage, foils, toner and Brazilian treatments from our salon near Hartbeespoort Dam." },
            { q: "Do you offer cuts, blow-dries, colour and keratin treatments?", a: "Yes. We offer cuts, blow-dries, colour services, foils, toner, balayage, keratin and Brazilian smoothing treatments using professional salon products." },
            { q: "How often should I book cuts or colour maintenance?", a: "Rebooking depends on your service, but many clients book cuts every 6 to 8 weeks and schedule colour or toner maintenance around fading, regrowth and the look they want to maintain." },
        ],
    },
    "nails": {
        title: "Nail Salon Hartbeespoort | Gel Nails, Acrylics, Manicures & Pedicures",
        description: "Nail salon in Hartbeespoort for long-lasting manicures, gel nails, acrylics, stronger natural nails and polished pedicures. Book your nail appointment at Galeo Beauty.",
        h1: "Nail Salon in Hartbeespoort",
        intro: "If your manicures chip too quickly, your natural nails feel weak, or you just want hands and feet to look more refined, our Hartbeespoort nail services are built around durability and finish. We offer gel, acrylic, builder support and pedicure care for clients who want polished results that actually hold up.",
        benefits: ["Hygienic practices", "Premium nail products", "Skilled nail technicians", "Lasting results"],
        faqs: [
            { q: "Where can I get my nails done in Hartbeespoort for gel and acrylic nails?", a: "Galeo Beauty offers gel nails, acrylic nails, manicures, pedicures and nail art from our Hartbeespoort salon near Hartbeespoort Dam." },
            { q: "Do you do both gel nails and acrylic nails in Hartbeespoort?", a: "Yes. We offer gel overlays, acrylic full sets, fills, manicures and pedicures with strict hygiene protocols and professional nail products." },
            { q: "How often should I book a fill or maintenance appointment?", a: "Most nail clients rebook every 2 to 3 weeks for fills, rebalancing or soak-offs depending on growth, wear and the system they are wearing." },
        ],
    },
    "lashes-brows": {
        title: "Lash Extensions Hartbeespoort | Eyelash Extensions, Lash Lift & Brows",
        description: "Lash extensions, lash lift and tint, and brow treatments in Hartbeespoort for fuller-looking lashes, better brow shape and easier everyday beauty.",
        h1: "Lash Extensions & Brows in Hartbeespoort",
        intro: "If you want to wake up looking more put together without doing a full makeup routine, our Hartbeespoort lash and brow services are designed for that exact goal. We offer lash extensions, lash lift and tint appointments, and brow styling for clients who want more eye definition, softer features and a lower-maintenance beauty routine.",
        benefits: ["Certified lash technicians", "Premium lash materials", "Customized looks", "Long-lasting results"],
        faqs: [
            { q: "Where can I get eyelash extensions in Hartbeespoort?", a: "Galeo Beauty offers eyelash extensions near Hartbeespoort Dam, including classic, hybrid and volume lash sets tailored to the level of fullness you want." },
            { q: "Can I book a lash lift and tint in Hartbeespoort?", a: "Yes. Galeo Beauty offers lash lift and tint appointments in Hartbeespoort for clients who want more lifted, darker-looking natural lashes without extensions." },
            { q: "Will lash extensions damage my natural lashes?", a: "Not when they are applied correctly and maintained properly. Healthy natural lashes should be protected by correct lash mapping, weight selection and aftercare." },
            { q: "How often do I need lash fills or brow maintenance?", a: "Most lash extension clients need fills every 2 to 3 weeks, while brow tinting, lamination and similar services vary based on growth and aftercare." },
        ],
    },
    "hair-extensions": {
        title: "Hair Extensions Hartbeespoort | Remy Human Hair",
        description: "Hair extensions in Hartbeespoort for instant length, fuller volume and better thickness through fine or short hair. Explore tape-ins, clip-ins and Remy hair at Galeo Beauty.",
        h1: "Hair Extensions in Hartbeespoort",
        intro: "If your hair feels too fine, too short or too flat to create the look you want, our Hartbeespoort hair extensions are designed to add length and fullness without sacrificing a natural blend. We offer multiple extension methods for clients who want thicker styling, a fuller ponytail or instant transformation with premium Remy hair.",
        benefits: ["100% Remy human hair", "Double drawn quality", "Multiple methods available", "Expert application"],
        faqs: [
            { q: "Where can I get hair extensions in Hartbeespoort?", a: "Galeo Beauty offers premium hair extensions near Hartbeespoort Dam, including tape-ins, clip-ins, U-tip, micro loop and halo options." },
            { q: "Which hair extension method is best for me?", a: "The best method depends on your hair density, lifestyle, maintenance budget and styling goals. We recommend a method only after checking your natural hair properly." },
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
export const dynamicParams = true;
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
    if (!description.toLowerCase().includes("hartbeespoort")) {
        description = `${description} Serving Hartbeespoort and nearby Pretoria, Centurion, and Johannesburg.`;
    }
    const categoryImageUrl = toAbsoluteUrl(category.image);

    return {
        title,
        description,
        keywords: buildCategoryMetadataKeywords(category),
        openGraph: {
            title,
            description,
            type: "website",
            images: [{ url: categoryImageUrl, alt: `${category.title} treatments at Galeo Beauty` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [categoryImageUrl],
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
    const relatedIntentPages = getIntentPagesForCategory(category.id);
    const categoryImageUrl = toAbsoluteUrl(category.image);

    // JSON-LD structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": category.title,
        "description": meta?.description || category.subtitle,
        "url": `https://www.galeobeauty.com/prices/${categoryId}`,
        "image": categoryImageUrl,
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
                <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden">
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

                    <div className="container mx-auto px-4 sm:px-6 mt-4">
                        <div className="max-w-4xl">
                            <h1 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                {h1}
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                {intro}
                            </p>
                            {/* Benefits */}
                            {benefits.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {benefits.map((benefit, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 border border-border/60 bg-background/80 px-4 py-1.5 rounded-full text-sm font-medium text-foreground/80 shadow-sm backdrop-blur-sm transition-colors hover:border-gold/30"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            )}
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
                            <h2 className="mb-8 text-center font-sans text-2xl font-semibold text-foreground sm:text-3xl">
                                FAQs
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                                        <h3 className="mb-2 font-sans font-semibold text-foreground">{faq.q}</h3>
                                        <p className="text-muted-foreground text-sm">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Helpful Treatment Guides Moved to Bottom */}
                {relatedIntentPages.length > 0 && (
                    <section className="py-16 bg-background border-t border-border/30">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-3xl mb-10 text-center mx-auto">
                                <h2 className="mb-3 font-sans text-3xl font-semibold text-foreground">Related Guides</h2>
                                <p className="text-base text-muted-foreground">
                                    Read a few useful guides if you want help choosing the right treatment before you book.
                                </p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
                                {relatedIntentPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/${page.slug}`}
                                        className="group rounded-3xl border border-border/50 bg-secondary/5 p-8 transition-all hover:border-gold/30 hover:shadow-sm"
                                    >
                                        <h3 className="mb-3 font-sans text-xl font-semibold text-foreground">{page.title}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground mb-6 line-clamp-3">{page.metaDescription}</p>
                                        <span className="inline-flex items-center text-sm font-medium text-gold group-hover:underline underline-offset-4">
                                            Explore guide <ArrowRight className="w-4 h-4 ml-1" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-4 font-sans text-3xl font-semibold md:text-4xl">
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
