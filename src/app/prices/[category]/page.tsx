import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
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
        title: "Medical Aesthetics & Anti-Aging Hartbeespoort | Botox & Fillers",
        description: "Premier medical aesthetics in Hartbeespoort (Harties). Specializing in Botox, Dermal Fillers, Liquid Facelifts, Threads, and IV Drips. Advanced anti-aging treatments near Hartbeespoort Dam.",
        keywords: ["medical aesthetics Hartbeespoort", "Botox Harties", "dermal fillers Hartbeespoort", "thread lifts Harties", "IV drip bar Hartbeespoort", "liquid facelift Harties", "anti-aging clinic North West", "skin boosters Pretoria", "aesthetic doctor Hartbeespoort", "Nefertiti lift Harties", "lip fillers Hartbeespoort"],
        h1: "Medical Aesthetics & Anti-Aging in Hartbeespoort",
        intro: "Experience world-class medical aesthetics at Galeo Beauty in Hartbeespoort. Our comprehensive range of advanced treatments includes Botulinum Toxin, Dermal Fillers, Thread Lifts, and IV Vitamin Therapy. We combine medical expertise with artistic precision to deliver natural, rejuvenating results for clients from Harties, Pretoria, and Centurion.",
        benefits: ["Qualified medical professionals", "Comprehensive treatment menu", "Premium FDA-approved products", "Natural-looking results"],
        faqs: [
            { q: "What aesthetic treatments do you offer in Hartbeespoort?", a: "We offer a full range of medical aesthetics including Botox, Dermal Fillers, Thread Lifts, Liquid Facelifts, and IV Vitamin Drips at our Hartbeespoort salon." },
            { q: "Are your aesthetic practitioners qualified?", a: "Yes, all medical aesthetic treatments at Galeo Beauty are performed by qualified medical professionals specializing in aesthetic medicine." },
        ],
    },
    "fat-freezing": {
        title: "Fat Freezing Hartbeespoort | Cryolipolysis Harties Dam Area",
        description: "Non-invasive fat freezing (cryolipolysis) in Hartbeespoort & Harties. Target stubborn belly fat, love handles & thighs near Hartbeespoort Dam. CE approved. Near Centurion & Pretoria.",
        keywords: ["fat freezing Hartbeespoort", "cryolipolysis Harties", "fat freezing near Hartbeespoort Dam", "body contouring Harties Dam", "fat freezing near Centurion", "belly fat removal Hartbeespoort", "love handles treatment Harties", "non-surgical fat removal North West", "fat freezing near Pretoria", "body sculpting around Harties", "cryolipolysis prices Hartbeespoort Dam area"],
        h1: "Fat Freezing in Hartbeespoort & Harties",
        intro: "Eliminate stubborn fat without surgery at Galeo Beauty in Hartbeespoort (Harties). Our CE-approved cryolipolysis treatment near Hartbeespoort Dam targets fat cells that diet and exercise can't reach. Serving clients from Harties Village, Centurion, Pretoria, and North West.",
        benefits: ["Non-invasive procedure", "No downtime required", "Permanent fat cell reduction", "CE approved equipment"],
        faqs: [
            { q: "Where can I get fat freezing near Harties Dam?", a: "Galeo Beauty offers CE-approved fat freezing in Hartbeespoort, conveniently located near Hartbeespoort Dam. We serve Harties, Centurion, and Pretoria." },
            { q: "How many sessions do I need?", a: "Most clients see optimal results after 1-3 sessions per treatment area." },
        ],
    },
    "slimming": {
        title: "Medical Weight Loss & Body Contouring Hartbeespoort | Slimming Injections",
        description: "Advanced weight loss & body contouring in Hartbeespoort (Harties). Lemon Bottle fat dissolving, Slimming Injections & Tesla EMS. Effective results near Hartbeespoort Dam. Serving Centurion & Pretoria.",
        keywords: ["weight loss Hartbeespoort", "slimming injections Harties", "Lemon Bottle fat dissolving Hartbeespoort", "body contouring Harties Dam", "Tesla EMS slimming Hartbeespoort", "medical weight loss North West", "fat loss injections Pretoria", "slimming clinic Harties", "cellulite treatment Hartbeespoort Dam area"],
        h1: "Medical Weight Loss & Body Contouring in Hartbeespoort",
        intro: "Achieve your body goals with our medical weight loss and contouring solutions at Galeo Beauty in Hartbeespoort (Harties). We offer advanced treatments including Lemon Bottle fat dissolving injections and Tesla EMS muscle toning. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Medical-grade solutions", "Targeted fat reduction", "Non-surgical options", "Visible results"],
        faqs: [
            { q: "What weight loss treatments do you offer?", a: "We offer medical-grade slimming injections like Lemon Bottle and advanced body contouring technologies." },
            { q: "Are the treatments safe?", a: "Yes, all our weight loss and body contouring treatments are performed using safe, approved protocols." },
        ],
    },
    "dermalogica": {
        title: "Dermalogica Skincare, Peels & Microneedling Hartbeespoort",
        description: "Advanced Dermalogica skincare in Hartbeespoort (Harties). Chemical peels, microneedling, dermaplaning & pro skin treatments near Hartbeespoort Dam. Expert skin therapists. Near Centurion & Pretoria.",
        keywords: ["Dermalogica skincare Hartbeespoort", "chemical peels Harties", "microneedling near Hartbeespoort Dam", "dermaplaning Harties Dam area", "pro skin treatments Hartbeespoort", "acne treatment North West", "anti-aging facials Pretoria", "pigmentation treatment Harties", "Dermalogica expert Hartbeespoort Dam area"],
        h1: "Dermalogica Skincare & Advanced Peels in Hartbeespoort",
        intro: "Transform your skin with advanced Dermalogica treatments at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, our expert therapists specialise in chemical peels, microneedling, dermaplaning, and customised Pro Skin facials. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Expert skin analysis", "Advanced chemical peels", "Clinical microneedling", "Personalized treatment plans"],
        faqs: [
            { q: "Do you offer chemical peels in Hartbeespoort?", a: "Yes, we offer a range of professional Dermalogica chemical peels tailored to your skin concerns." },
            { q: "Is microneedling available?", a: "we offer professional Pro Microneedling to stimulate collagen and refine skin texture." },
        ],
    },
    "ipl": {
        title: "IPL Hair Removal & Laser Tattoo Removal Hartbeespoort",
        description: "Permanent IPL hair removal & laser tattoo removal in Hartbeespoort (Harties). Safe, CE-approved treatments for face & body near Hartbeespoort Dam. Ladies & gents. Near Centurion & Pretoria.",
        keywords: ["IPL hair removal Hartbeespoort", "laser tattoo removal Harties", "permanent hair reduction Hartbeespoort Dam", "tattoo removal near Centurion", "IPL laser Harties", "hair removal clinic North West", "laser treatments Pretoria", "tattoo fading Hartbeespoort", "mens hair removal Harties"],
        h1: "IPL Hair Removal & Laser Tattoo Removal in Hartbeespoort",
        intro: "Achieve smooth, hair-free skin and remove unwanted tattoos at Galeo Beauty in Hartbeespoort (Harties). We use CE-approved IPL technology for permanent hair reduction and laser tattoo removal. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Permanent hair reduction", "Effective tattoo removal", "CE approved technology", "Safe for most skin types"],
        faqs: [
            { q: "Do you offer tattoo removal in Hartbeespoort?", a: "Yes, we offer laser tattoo removal sessions using advanced technology." },
            { q: "Is IPL hair removal permanent?", a: "IPL offers permanent hair reduction, significantly reducing regrowth over a course of treatments." },
        ],
    },
    "makeup": {
        title: "Professional Make-Up Hartbeespoort | Bridal Makeup Harties",
        description: "Professional make-up services in Hartbeespoort & Harties. Kryolan trained artists for bridal, evening & matric dance makeup near Hartbeespoort Dam. Near Centurion & Pretoria.",
        keywords: ["bridal makeup Hartbeespoort", "makeup artist Harties", "wedding makeup near Hartbeespoort Dam", "makeup Harties Dam area", "bridal makeup near Centurion", "matric dance makeup Hartbeespoort", "professional makeup Harties", "evening makeup North West", "makeup artist near Pretoria", "makeup around Harties", "Kryolan makeup Hartbeespoort Dam area"],
        h1: "Professional Make-Up in Hartbeespoort & Harties",
        intro: "Look stunning for any occasion with professional make-up at Galeo Beauty in Hartbeespoort (Harties). Our Kryolan-trained artists near Hartbeespoort Dam create flawless bridal, evening, and special occasion looks. Serving Harties Village, Centurion, Pretoria, and North West.",
        benefits: ["Kryolan professional products", "Trained makeup artists", "Long-lasting formulas", "Personalized looks"],
        faqs: [
            { q: "Where can I find a bridal makeup artist near Harties Dam?", a: "Galeo Beauty in Hartbeespoort (Harties) has Kryolan-trained bridal makeup artists. We're located near Hartbeespoort Dam, serving Centurion and Pretoria." },
            { q: "How long does bridal makeup take?", a: "Bridal makeup typically takes 60-90 minutes to ensure a flawless, long-lasting finish." },
        ],
    },
    "medical": {
        title: "Clinical Skin & Laser Treatments Hartbeespoort | Advanced Aesthetics",
        description: "Advanced clinical skin treatments in Hartbeespoort (Harties). Fractional laser, Plasmage, Vaginal Tightening & IV Drips near Hartbeespoort Dam. Medical-grade technology. Near Centurion & Pretoria.",
        keywords: ["clinical skin treatments Hartbeespoort", "fractional laser Harties", "plasmage non-surgical lift Hartbeespoort", "vaginal tightening Harties", "IV drip clinic Hartbeespoort", "laser skin resurfacing North West", "advanced aesthetics Pretoria", "medical skin clinic Harties"],
        h1: "Advanced Clinical Skin & Laser Treatments in Hartbeespoort",
        intro: "Experience advanced clinical skin and laser treatments at Galeo Beauty in Hartbeespoort (Harties). Our medical-grade offering includes Fractional Laser resurfacing, Plasmage non-surgical lifting, Vaginal Tightening, and IV Vitamin Therapy. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Clinical-grade technology", "Non-surgical solutions", "Advanced skin rejuvenation", "Private & professional"],
        faqs: [
            { q: "What clinical treatments do you offer?", a: "We offer Fractional Laser, Plasmage, Vaginal Tightening, and IV Drips using medical-grade technology." },
            { q: "Is the fractional laser treatment painful?", a: "We use topical anaesthetics to minimise discomfort during fractional laser treatments." },
        ],
    },
    "permanent-makeup": {
        title: "Permanent Make-Up Hartbeespoort | Microblading Harties",
        description: "Semi-permanent makeup in Hartbeespoort & Harties. Microblading, powder brows, lip contour & eyeliner near Hartbeespoort Dam. Wake up beautiful. Near Centurion & Pretoria, North West.",
        keywords: ["permanent makeup Hartbeespoort", "microblading Harties", "powder brows near Hartbeespoort Dam", "lip contour Harties Dam area", "microblading near Centurion", "permanent brows Hartbeespoort", "lip blush Harties", "eyeliner tattoo North West", "microblading near Pretoria", "permanent makeup around Harties", "semi-permanent makeup Hartbeespoort Dam area"],
        h1: "Permanent Make-Up in Hartbeespoort & Harties",
        intro: "Simplify your beauty routine with semi-permanent makeup at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer microblading, powder brows, lip contour, and eyeliner. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Long-lasting results", "Natural-looking enhancement", "Time-saving beauty", "Certified technicians"],
        faqs: [
            { q: "Where can I get microblading near Harties?", a: "Galeo Beauty in Hartbeespoort (Harties) offers professional microblading near Hartbeespoort Dam. We serve clients from Centurion, Pretoria, and North West." },
            { q: "Is it painful?", a: "We use topical numbing cream to ensure maximum comfort during the procedure." },
        ],
    },
    "massages": {
        title: "Massage Therapy Hartbeespoort | Relaxation & Deep Tissue Harties",
        description: "Professional massage therapy in Hartbeespoort & Harties. Swedish, aromatherapy, hot stone & deep tissue massages near Hartbeespoort Dam. Near Centurion & Pretoria, North West.",
        keywords: ["massage Hartbeespoort", "Swedish massage Harties", "massage near Hartbeespoort Dam", "aromatherapy massage Harties Dam area", "deep tissue massage near Centurion", "hot stone massage Hartbeespoort", "relaxation massage Harties", "sports massage North West", "massage near Pretoria", "massage therapy around Harties", "back massage Hartbeespoort Dam area"],
        h1: "Massage Therapy in Hartbeespoort & Harties",
        intro: "Unwind and restore balance with professional massage therapy at Galeo Beauty in Hartbeespoort (Harties). Located near Hartbeespoort Dam, our expert therapists offer Swedish, aromatherapy, hot stone, deep tissue, and sports massages. Serving Harties Village, Centurion, Pretoria, and North West.",
        benefits: ["Certified massage therapists", "Aromatherapy oils", "Multiple massage styles", "Relaxing environment"],
        faqs: [
            { q: "Where can I get a massage near Harties Dam?", a: "Galeo Beauty in Hartbeespoort (Harties) offers professional massage therapy near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "What types of massages do you offer?", a: "We offer Swedish, aromatherapy, hot stone, deep tissue, sports, and back & neck massages." },
        ],
    },
    "qms": {
        title: "QMS Medicosmetics Facials Hartbeespoort | Premium Skincare Harties",
        description: "Premium QMS Medicosmetics facials in Hartbeespoort & Harties. Medical-grade collagen treatments & chemical peels near Hartbeespoort Dam. German precision skincare. Near Centurion & Pretoria.",
        keywords: ["QMS facial Hartbeespoort", "collagen facial Harties", "premium facial near Hartbeespoort Dam", "QMS Harties Dam area", "luxury facial near Centurion", "anti-aging facial Hartbeespoort", "QMS Medicosmetics Harties", "collagen treatment North West", "skin rejuvenation near Pretoria", "QMS around Harties", "medical grade facial Hartbeespoort Dam area"],
        h1: "QMS Medicosmetics Facials in Hartbeespoort & Harties",
        intro: "Experience German precision skincare with QMS Medicosmetics at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, our premium facials use medical-grade collagen formulations. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["German precision formulas", "Medical-grade ingredients", "Collagen-boosting treatments", "Visible results"],
        faqs: [
            { q: "Where can I get a QMS facial near Harties?", a: "Galeo Beauty in Hartbeespoort (Harties) offers premium QMS Medicosmetics facials near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "Which QMS facial is best for me?", a: "Our therapists will assess your skin and recommend the ideal treatment during your consultation." },
        ],
    },
    "sunbed": {
        title: "Sunbed Tanning & Spray Tan Hartbeespoort | Tanning Harties",
        description: "Safe sunbed tanning & professional spray tan in Hartbeespoort & Harties. Golden glow year-round near Hartbeespoort Dam. Package deals available. Near Centurion & Pretoria, North West.",
        keywords: ["sunbed Hartbeespoort", "spray tan Harties", "tanning near Hartbeespoort Dam", "sunbed Harties Dam area", "spray tan near Centurion", "tanning salon Hartbeespoort", "indoor tanning Harties", "spray tan North West", "sunbed near Pretoria", "tanning around Harties", "bridal spray tan Hartbeespoort Dam area"],
        h1: "Sunbed & Spray Tan in Hartbeespoort (Harties)",
        intro: "Achieve a beautiful sun-kissed glow at Galeo Beauty in Hartbeespoort (Harties). Located near Hartbeespoort Dam, we offer safe sunbed tanning and professional spray tans. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Controlled UV exposure", "Professional spray tans", "Package savings", "Year-round glow"],
        faqs: [
            { q: "Where can I get a spray tan near Harties Dam?", a: "Galeo Beauty in Hartbeespoort (Harties) offers professional spray tans near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "How long does spray tan last?", a: "A professional spray tan typically lasts 5-7 days with proper care." },
        ],
    },
    "waxing": {
        title: "Professional Waxing Hartbeespoort | Brazilian Wax Harties",
        description: "Professional waxing in Hartbeespoort & Harties. Brazilian, Hollywood & full body waxing near Hartbeespoort Dam. Ladies & gents. Gentle techniques. Near Centurion & Pretoria, North West.",
        keywords: ["waxing Hartbeespoort", "Brazilian wax Harties", "waxing near Hartbeespoort Dam", "Hollywood wax Harties Dam area", "waxing near Centurion", "bikini wax Hartbeespoort", "intimate waxing Harties", "full body wax North West", "waxing near Pretoria", "waxing around Harties", "painless wax Hartbeespoort Dam area"],
        h1: "Professional Waxing in Hartbeespoort & Harties",
        intro: "Achieve silky smooth skin with professional waxing at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we use gentle techniques and premium wax for minimal discomfort. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Hygienic environment", "Premium quality wax", "Gentle techniques", "Long-lasting smoothness"],
        faqs: [
            { q: "Where can I get a Brazilian wax near Harties?", a: "Galeo Beauty in Hartbeespoort (Harties) offers professional Brazilian waxing near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "How long should hair be for waxing?", a: "Hair should be at least 5mm (about 2 weeks of growth) for best results." },
        ],
    },
    "hair": {
        title: "Hair & Styling Hartbeespoort | Cuts, Colour & Styling Harties",
        description: "Professional hair & styling in Hartbeespoort & Harties. Haircuts, balayage, colour, foils & Brazilian blow near Hartbeespoort Dam. Expert stylists. Near Centurion & Pretoria, North West.",
        keywords: ["hair salon Hartbeespoort", "hairdresser Harties", "haircut near Hartbeespoort Dam", "balayage Harties Dam area", "hair colour near Centurion", "blow dry Hartbeespoort", "Brazilian blowout Harties", "foils and toner North West", "hair stylist near Pretoria", "hair salon around Harties", "best hairdresser Hartbeespoort Dam area"],
        h1: "Hair & Styling in Hartbeespoort & Harties",
        intro: "Transform your look at Galeo Beauty hair salon in Hartbeespoort (Harties). Located near Hartbeespoort Dam, our expert stylists create precision cuts, stunning colour, and beautiful styling for all hair types. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Expert stylists", "Premium products", "All hair types welcome", "Latest techniques"],
        faqs: [
            { q: "Where is the best hair salon near Harties Dam?", a: "Galeo Beauty in Hartbeespoort (Harties) is a premier hair salon near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "What products do you use?", a: "We use professional-grade products to ensure the health and beauty of your hair." },
        ],
    },
    "nails": {
        title: "Nail Salon Hartbeespoort | Manicure & Pedicure Harties",
        description: "Professional nail salon in Hartbeespoort & Harties. Manicures, pedicures, acrylic & gel nails near Hartbeespoort Dam. Hygienic nail artistry. Near Centurion & Pretoria, North West.",
        keywords: ["nail salon Hartbeespoort", "manicure Harties", "gel nails near Hartbeespoort Dam", "acrylic nails Harties Dam area", "nail salon near Centurion", "pedicure Hartbeespoort", "nail art Harties", "gel manicure North West", "nail technician near Pretoria", "nails around Harties", "acrylic full set Hartbeespoort Dam area"],
        h1: "Nail Salon in Hartbeespoort & Harties",
        intro: "Pamper your hands and feet at Galeo Beauty nail salon in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer manicures, pedicures, acrylics, gel nails, and stunning nail art. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Hygienic practices", "Premium nail products", "Skilled nail technicians", "Lasting results"],
        faqs: [
            { q: "Where can I find a nail salon near Harties Dam?", a: "Galeo Beauty in Hartbeespoort (Harties) offers professional nail services near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "Do you sterilize your tools?", a: "Yes, we follow strict hygiene protocols and sterilize all reusable tools between clients." },
        ],
    },
    "lashes-brows": {
        title: "Lash Extensions Hartbeespoort | Brow Services Harties",
        description: "Professional lash extensions & brow treatments in Hartbeespoort & Harties. Volume lashes, lash lifts & brow lamination near Hartbeespoort Dam. Near Centurion & Pretoria, North West.",
        keywords: ["lash extensions Hartbeespoort", "eyelash extensions Harties", "lashes near Hartbeespoort Dam", "brow lamination Harties Dam area", "lash lift near Centurion", "volume lashes Hartbeespoort", "classic lashes Harties", "brow tint North West", "lash fill near Pretoria", "lash extensions around Harties", "lash lift Hartbeespoort Dam area"],
        h1: "Lash Extensions & Brows in Hartbeespoort (Harties)",
        intro: "Enhance your natural beauty with professional lash and brow services at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer volume lashes, classic sets, lash lifts, and brow lamination. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Certified lash technicians", "Premium lash materials", "Customized looks", "Long-lasting results"],
        faqs: [
            { q: "Where can I get lash extensions near Harties?", a: "Galeo Beauty in Hartbeespoort (Harties) offers certified lash extensions near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
            { q: "Will lash extensions damage my natural lashes?", a: "When applied correctly by certified technicians, extensions won't damage your natural lashes." },
        ],
    },
    "hair-extensions": {
        title: "Hair Extensions Hartbeespoort | Remy Human Hair Harties",
        description: "Premium European Remy hair extensions in Hartbeespoort & Harties. Tape-in, clip-in, U-tip & micro loop near Hartbeespoort Dam. Double drawn quality. Near Centurion & Pretoria, North West.",
        keywords: ["hair extensions Hartbeespoort", "tape-in extensions Harties", "hair extensions near Hartbeespoort Dam", "clip-in hair Harties Dam area", "extensions near Centurion", "keratin extensions Hartbeespoort", "Remy hair Harties", "micro loop extensions North West", "hair extensions near Pretoria", "extensions around Harties", "halo hair Hartbeespoort Dam area"],
        h1: "Hair Extensions in Hartbeespoort & Harties",
        intro: "Add length, volume, and dimension with premium European Remy hair extensions at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer tape-in, clip-in, U-tip, micro loop, and halo extensions. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["100% Remy human hair", "Double drawn quality", "Multiple methods available", "Expert application"],
        faqs: [
            { q: "Where can I get hair extensions near Harties Dam?", a: "Galeo Beauty in Hartbeespoort (Harties) offers premium Remy hair extensions near Hartbeespoort Dam. Serving Centurion, Pretoria, and North West." },
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

    // 1. Generate Dynamic Service Keywords
    const serviceKeywords: string[] = [];

    // Add variations for each service
    category.subcategories.forEach(sub => {
        sub.items.forEach(item => {
            // Add raw service name
            serviceKeywords.push(item.name.toLowerCase());
            // Add location variations
            serviceKeywords.push(`${item.name.toLowerCase()} hartbeespoort`);
            serviceKeywords.push(`${item.name.toLowerCase()} harties`);
        });
    });

    // 2. Base Keywords from Category Meta (or default)
    const baseKeywords = meta?.keywords || [category.title.toLowerCase(), "beauty salon", "spa"];

    // 3. Combine and Deduplicate
    const allKeywords = Array.from(new Set([
        ...baseKeywords,
        ...serviceKeywords
    ]));

    // 4. Construct Title & Description
    const title = meta?.title || `${category.title} | Prices & Booking Hartbeespoort`;

    // Ensure Description has location
    let description = meta?.description || `${category.title} treatments at Galeo Beauty Hartbeespoort. ${category.subtitle}. View prices and book your appointment online.`;
    if (!description.toLowerCase().includes("hartbeespoort") || !description.toLowerCase().includes("harties")) {
        description = `${description} Serving Hartbeespoort | Harties.`;
    }

    return {
        title: `${title} | Galeo Beauty`,
        description,
        keywords: allKeywords, // Now includes every single service + location variants
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
