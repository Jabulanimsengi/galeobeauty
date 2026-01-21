import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { ArrowRight, Phone, MapPin, Clock, CheckCircle, Star, Sparkles } from "lucide-react";
import { serviceCategories, getCategoryById } from "@/lib/services-data";
import { businessInfo } from "@/lib/constants";

// ============================================
// INDIVIDUAL SERVICE PAGES FOR SEO
// ============================================
// These pages target specific service keywords like
// "microblading pretoria", "fat freezing hartbeespoort", etc.

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

// Service definitions with SEO content
interface ServicePageData {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    categoryId: string;
    heroTitle: string;
    heroSubtitle: string;
    intro: string;
    benefits: string[];
    process: { title: string; description: string }[];
    faqs: { q: string; a: string }[];
    price: string;
    duration: string;
    relatedServices: string[];
}

const servicePages: ServicePageData[] = [
    {
        slug: "microblading",
        title: "Microblading",
        metaTitle: "Microblading Near Pretoria | Semi-Permanent Brows",
        metaDescription: "Professional microblading in Hartbeespoort, 45 min from Pretoria. Natural hair-stroke eyebrows that last 12-18 months. R1,350. Book your consultation today.",
        keywords: ["microblading Pretoria", "microblading near me", "eyebrow microblading", "semi-permanent brows", "microblading Hartbeespoort", "eyebrow tattoo"],
        categoryId: "permanent-makeup",
        heroTitle: "Microblading",
        heroSubtitle: "Natural Hair-Stroke Eyebrows",
        intro: "Wake up every morning with perfect brows. Microblading is a semi-permanent eyebrow technique that creates natural-looking hair strokes, giving you beautifully defined brows that last 12-18 months.",
        benefits: [
            "Natural, hair-like strokes that blend seamlessly",
            "Saves time on your daily makeup routine",
            "Waterproof and smudge-proof results",
            "Customized shape to suit your face",
            "Long-lasting results (12-18 months)",
            "Minimal downtime"
        ],
        process: [
            { title: "Consultation", description: "We discuss your desired brow shape, color, and style. Your face is mapped for the perfect symmetrical brows." },
            { title: "Numbing", description: "Topical anesthetic is applied for your comfort during the procedure." },
            { title: "Microblading", description: "Using a specialized hand tool, fine hair strokes are created and pigment is deposited." },
            { title: "Healing", description: "Brows will appear darker initially, fading 30-40% as they heal over 4-6 weeks." },
            { title: "Touch-up", description: "A follow-up appointment 4-6 weeks later perfects your brows." }
        ],
        faqs: [
            { q: "How long does microblading last?", a: "Microblading typically lasts 12-18 months, depending on skin type and aftercare. Annual touch-ups maintain the look." },
            { q: "Is microblading painful?", a: "Most clients describe it as mild discomfort. We use numbing cream to ensure your comfort throughout the procedure." },
            { q: "Who is microblading suitable for?", a: "Microblading works best on normal to dry skin. Those with oily skin may see faster fading and may prefer powder brows instead." },
            { q: "What's the difference between microblading and powder brows?", a: "Microblading creates hair-like strokes for a natural look, while powder brows give a soft, filled-in makeup appearance. We offer both!" }
        ],
        price: "R1,350",
        duration: "2-3 hours",
        relatedServices: ["powder-brows", "brow-lamination", "brow-tint"]
    },
    {
        slug: "fat-freezing-treatment",
        title: "Fat Freezing",
        metaTitle: "Fat Freezing Hartbeespoort | Cryolipolysis Near Pretoria",
        metaDescription: "CE-approved fat freezing (cryolipolysis) in Hartbeespoort. Non-invasive body contouring from R799.20. Target stubborn belly fat, love handles, thighs. Book now.",
        keywords: ["fat freezing Hartbeespoort", "fat freezing Pretoria", "cryolipolysis South Africa", "body contouring", "non-surgical fat removal", "coolsculpting alternative"],
        categoryId: "fat-freezing",
        heroTitle: "Fat Freezing",
        heroSubtitle: "Cryolipolysis Body Contouring",
        intro: "Eliminate stubborn fat without surgery. Fat freezing uses controlled cooling to target and destroy fat cells in problem areas like the belly, love handles, arms, and thighs. Results are permanent because the treated fat cells are gone for good.",
        benefits: [
            "Non-invasive - no surgery, no needles",
            "No downtime - return to activities immediately",
            "Permanent fat cell reduction",
            "CE-approved equipment",
            "Targets stubborn fat that resists diet and exercise",
            "Natural-looking, gradual results"
        ],
        process: [
            { title: "Consultation", description: "We assess your problem areas and create a personalized treatment plan." },
            { title: "Preparation", description: "A gel pad is placed to protect your skin during treatment." },
            { title: "Treatment", description: "The applicator cools the area to -5 to -10 degrees for 30-60 minutes." },
            { title: "Massage", description: "Post-treatment massage helps break down the frozen fat cells." },
            { title: "Results", description: "Fat cells die naturally and are eliminated over 2-3 months. 20-25% fat reduction per session." }
        ],
        faqs: [
            { q: "How much does fat freezing cost in South Africa?", a: "At Galeo Beauty, fat freezing costs R799.20 per session - one of the most affordable prices in South Africa." },
            { q: "Is fat freezing safe?", a: "Yes! Cryolipolysis is FDA-cleared and CE-approved. Our equipment meets all safety standards." },
            { q: "How many sessions do I need?", a: "Most clients see optimal results after 1-3 sessions per treatment area, spaced 4-6 weeks apart." },
            { q: "Does fat freezing hurt?", a: "You'll feel intense cold initially, then the area goes numb. Most clients read or relax during treatment." }
        ],
        price: "R799.20",
        duration: "30-60 minutes",
        relatedServices: ["tesla-ems-slimming", "body-wrap"]
    },
    {
        slug: "lash-extensions",
        title: "Lash Extensions",
        metaTitle: "Lash Extensions Near Pretoria | Volume & Classic Lashes",
        metaDescription: "Professional lash extensions in Hartbeespoort. Classic, volume, and hybrid lashes from R630. Certified lash technicians. Wake up beautiful every day.",
        keywords: ["lash extensions Pretoria", "eyelash extensions near me", "volume lashes", "Russian volume lashes", "classic lashes", "lash extensions Hartbeespoort"],
        categoryId: "lashes",
        heroTitle: "Lash Extensions",
        heroSubtitle: "Wake Up Beautiful Every Day",
        intro: "Transform your eyes with our professional lash extensions. From natural classic lashes to dramatic Russian volume, our certified technicians create custom looks that enhance your natural beauty and last for weeks.",
        benefits: [
            "Wake up with perfect lashes every day",
            "No more mascara needed",
            "Customized to your eye shape and style",
            "Lightweight and comfortable",
            "Water-resistant for active lifestyles",
            "Certified, experienced technicians"
        ],
        process: [
            { title: "Consultation", description: "We discuss your desired look - natural, dramatic, or somewhere in between." },
            { title: "Preparation", description: "Your eyes are cleansed and lower lashes protected with pads." },
            { title: "Application", description: "Individual lash extensions are carefully applied to each natural lash." },
            { title: "Setting", description: "Lashes are fanned and set for the perfect finish." },
            { title: "Aftercare", description: "We provide aftercare instructions and recommend fills every 2-3 weeks." }
        ],
        faqs: [
            { q: "How long do lash extensions last?", a: "Lash extensions last 2-4 weeks depending on your natural lash cycle. We recommend fills every 2-3 weeks." },
            { q: "Will lash extensions damage my natural lashes?", a: "When applied correctly by certified technicians, extensions won't damage your natural lashes." },
            { q: "What's the difference between classic and volume lashes?", a: "Classic uses one extension per natural lash for a natural look. Volume uses multiple fine extensions for a fuller, more dramatic effect." },
            { q: "Can I wear makeup with lash extensions?", a: "Yes, but avoid oil-based products and waterproof mascara. Most clients find they don't need eye makeup!" }
        ],
        price: "From R630",
        duration: "1-2 hours",
        relatedServices: ["lash-lift", "lash-tint", "brow-lamination"]
    },
    {
        slug: "lip-fillers",
        title: "Lip Fillers",
        metaTitle: "Lip Fillers Near Pretoria | Dermal Lip Enhancement",
        metaDescription: "Professional lip fillers in Hartbeespoort. Dermal and Russian lip techniques from R2,800. Natural-looking enhancement by qualified practitioners. Book consultation.",
        keywords: ["lip fillers Pretoria", "lip fillers near me", "dermal fillers", "Russian lips", "lip enhancement", "lip injections South Africa"],
        categoryId: "hart-aesthetics",
        heroTitle: "Lip Fillers",
        heroSubtitle: "Natural Lip Enhancement",
        intro: "Achieve the perfect pout with our professional lip filler treatments. Using premium hyaluronic acid fillers, we create natural-looking volume and definition tailored to your face and desired outcome.",
        benefits: [
            "Natural-looking volume and definition",
            "Premium hyaluronic acid fillers",
            "Qualified, experienced practitioners",
            "Results last 6-12 months",
            "Reversible if needed",
            "Minimal downtime"
        ],
        process: [
            { title: "Consultation", description: "We discuss your goals and assess your natural lip shape and facial proportions." },
            { title: "Numbing", description: "Topical anesthetic is applied, plus the filler contains lidocaine for comfort." },
            { title: "Injection", description: "Filler is carefully injected using precise techniques for your desired result." },
            { title: "Molding", description: "The filler is gently molded for perfect symmetry and shape." },
            { title: "Aftercare", description: "We provide aftercare instructions. Swelling subsides within 24-48 hours." }
        ],
        faqs: [
            { q: "How much do lip fillers cost?", a: "Dermal lip fillers cost R2,800 for 1ml. Russian lip technique costs R3,000 for 1ml." },
            { q: "How long do lip fillers last?", a: "Lip fillers typically last 6-12 months depending on the product used and your metabolism." },
            { q: "What's the difference between regular and Russian lips?", a: "Russian lips create a flatter, more defined shape with a heart-shaped cupid's bow. Classic fillers add volume with a more projected appearance." },
            { q: "Is it painful?", a: "We use numbing cream and fillers contain lidocaine. Most clients describe mild pressure, not pain." }
        ],
        price: "From R2,800",
        duration: "30-45 minutes",
        relatedServices: ["cheek-fillers", "dermal-fillers"]
    },
    {
        slug: "brazilian-wax",
        title: "Brazilian Wax",
        metaTitle: "Brazilian Wax Near Pretoria | Professional Waxing",
        metaDescription: "Professional Brazilian waxing in Hartbeespoort. Hygienic, gentle technique from R279. Hollywood wax also available. Book your appointment today.",
        keywords: ["Brazilian wax Pretoria", "Brazilian wax near me", "Hollywood wax", "bikini wax", "waxing salon", "intimate waxing"],
        categoryId: "waxing",
        heroTitle: "Brazilian Wax",
        heroSubtitle: "Smooth, Long-Lasting Results",
        intro: "Achieve silky smooth skin with our professional Brazilian waxing service. Our experienced therapists use gentle techniques and premium wax for minimal discomfort and long-lasting results.",
        benefits: [
            "Long-lasting smoothness (3-6 weeks)",
            "Hygienic, sterile environment",
            "Gentle technique for minimal discomfort",
            "Premium quality wax",
            "Experienced, professional therapists",
            "Includes post-wax soothing treatment"
        ],
        process: [
            { title: "Preparation", description: "The area is cleansed and prepped. Hair should be at least 5mm long." },
            { title: "Waxing", description: "Premium hard wax is applied and removed in sections, working quickly and efficiently." },
            { title: "Detailing", description: "Tweezers are used for any remaining hairs for a perfect finish." },
            { title: "Soothing", description: "Cooling, soothing lotion is applied to calm the skin." },
            { title: "Aftercare", description: "We provide aftercare tips to prevent ingrown hairs and maintain smoothness." }
        ],
        faqs: [
            { q: "What's the difference between Brazilian and Hollywood?", a: "Brazilian removes all hair from the front, leaving a small strip or triangle. Hollywood removes ALL hair, front and back." },
            { q: "How long does a Brazilian wax last?", a: "Results last 3-6 weeks depending on your hair growth cycle." },
            { q: "How long should hair be for waxing?", a: "Hair should be at least 5mm (about 2-3 weeks of growth) for best results." },
            { q: "Does it hurt?", a: "The first time can be uncomfortable, but it gets easier with regular waxing. Our therapists work quickly to minimize discomfort." }
        ],
        price: "R279",
        duration: "30-45 minutes",
        relatedServices: ["hollywood-wax", "full-leg-wax", "ipl-hair-removal"]
    },
    {
        slug: "dermalogica-facial",
        title: "Dermalogica Facial",
        metaTitle: "Dermalogica Facial Near Pretoria | Professional Skincare",
        metaDescription: "Professional Dermalogica facials in Hartbeespoort. Face Mapping analysis, customized treatments from R950. Pro Skin certified therapists. Book now.",
        keywords: ["Dermalogica facial Pretoria", "professional facial near me", "skincare treatment", "face mapping", "anti-aging facial", "acne facial"],
        categoryId: "dermalogica",
        heroTitle: "Dermalogica Facial",
        heroSubtitle: "Professional Skincare Treatment",
        intro: "Experience world-class skincare with our Dermalogica professional facials. Using Face Mapping skin analysis and professional-grade products, our trained therapists customize each treatment to address your unique skin concerns.",
        benefits: [
            "Face Mapping skin analysis included",
            "Customized to your skin type and concerns",
            "Professional-grade Dermalogica products",
            "Trained, certified skin therapists",
            "Visible results after one treatment",
            "Relaxing spa experience"
        ],
        process: [
            { title: "Face Mapping", description: "Your therapist analyzes your skin zone by zone to identify concerns." },
            { title: "Double Cleanse", description: "Professional cleansing removes makeup, dirt, and excess oil." },
            { title: "Exfoliation", description: "Customized exfoliation removes dead skin cells for smoother texture." },
            { title: "Treatment", description: "Targeted serums and masques address your specific concerns." },
            { title: "Hydration", description: "Intensive moisturizing and SPF protection complete your treatment." }
        ],
        faqs: [
            { q: "How often should I get a facial?", a: "We recommend professional facials every 4-6 weeks to maintain optimal skin health." },
            { q: "What makes Dermalogica different?", a: "Dermalogica is a professional-grade skincare brand free from common irritants. It's used by skin therapists worldwide." },
            { q: "Which facial is right for me?", a: "Our therapists use Face Mapping to identify your skin concerns and recommend the ideal treatment." },
            { q: "Can I wear makeup after?", a: "We recommend leaving your skin bare for a few hours to maximize product absorption. Mineral makeup is fine if needed." }
        ],
        price: "From R950",
        duration: "55-75 minutes",
        relatedServices: ["pro-power-peel", "microneedling", "chemical-peel"]
    },
    {
        slug: "nail-art",
        title: "Nail Art & Manicure",
        metaTitle: "Nail Art & Manicure Near Pretoria | Gel, Acrylic Nails",
        metaDescription: "Professional nail services in Hartbeespoort. Gel manicures, acrylic nails, nail art from R315. Skilled nail technicians. Walk-ins welcome.",
        keywords: ["nail salon Pretoria", "nail art near me", "gel nails", "acrylic nails", "manicure Hartbeespoort", "nail technician"],
        categoryId: "nails",
        heroTitle: "Nail Art & Manicure",
        heroSubtitle: "Beautiful Nails, Your Way",
        intro: "Pamper your hands with our professional nail services. From classic gel manicures to stunning nail art and durable acrylics, our skilled technicians create beautiful nails that last.",
        benefits: [
            "Skilled, experienced nail technicians",
            "Wide range of gel and acrylic options",
            "Custom nail art designs",
            "Hygienic, sterilized tools",
            "Long-lasting, chip-free results",
            "Relaxing salon experience"
        ],
        process: [
            { title: "Consultation", description: "Choose your nail shape, length, and design preferences." },
            { title: "Preparation", description: "Nails are shaped, cuticles are cared for, and hands are prepped." },
            { title: "Application", description: "Gel or acrylic is applied according to your chosen style." },
            { title: "Design", description: "Nail art and embellishments are added if desired." },
            { title: "Finish", description: "Top coat is applied and cured for a long-lasting, glossy finish." }
        ],
        faqs: [
            { q: "How long do gel nails last?", a: "Gel manicures last 2-3 weeks without chipping. Acrylic nails need fills every 2-3 weeks." },
            { q: "What's the difference between gel and acrylic?", a: "Gel is more flexible and natural-looking. Acrylic is stronger and better for length. We'll help you choose." },
            { q: "Do you sterilize your tools?", a: "Yes! We follow strict hygiene protocols and sterilize all reusable tools between clients." },
            { q: "Can I get custom nail art?", a: "Absolutely! Bring us your inspiration photos and our technicians will create custom designs." }
        ],
        price: "From R315",
        duration: "45-90 minutes",
        relatedServices: ["pedicure", "nail-repair"]
    },
    {
        slug: "massage-therapy",
        title: "Massage Therapy",
        metaTitle: "Massage Therapy Near Pretoria | Swedish & Deep Tissue",
        metaDescription: "Professional massage therapy in Hartbeespoort. Swedish, deep tissue, aromatherapy massages. Relax and unwind at our day spa near Pretoria.",
        keywords: ["massage near me", "massage Pretoria", "Swedish massage", "deep tissue massage", "aromatherapy massage", "spa massage Hartbeespoort"],
        categoryId: "prices",
        heroTitle: "Massage Therapy",
        heroSubtitle: "Relax, Restore, Rejuvenate",
        intro: "Melt away stress and tension with our therapeutic massage treatments. Using premium Lillian Terry aromatherapy oils, our expert therapists deliver customized massages that leave you feeling refreshed and renewed.",
        benefits: [
            "Relieves muscle tension and pain",
            "Reduces stress and anxiety",
            "Improves circulation",
            "Premium aromatherapy oils",
            "Experienced, qualified therapists",
            "Peaceful spa environment"
        ],
        process: [
            { title: "Consultation", description: "We discuss your concerns, pressure preferences, and any problem areas." },
            { title: "Preparation", description: "You'll relax on our comfortable massage bed with soft music and dim lighting." },
            { title: "Massage", description: "Your therapist works through muscle groups using your chosen technique." },
            { title: "Focus Areas", description: "Extra attention is given to areas of tension or concern." },
            { title: "Relaxation", description: "Take a moment to relax afterward and enjoy the benefits of your treatment." }
        ],
        faqs: [
            { q: "What type of massage is best for me?", a: "Swedish is great for relaxation, deep tissue for muscle tension. Our therapists can recommend based on your needs." },
            { q: "How long should my massage be?", a: "60 minutes is standard for full body. 90 minutes allows more time for problem areas." },
            { q: "Should I talk during the massage?", a: "It's your choice! Feel free to relax in silence or chat - whatever helps you unwind." },
            { q: "What should I wear?", a: "You'll undress to your comfort level and be properly draped throughout. We provide towels and robes." }
        ],
        price: "From R450",
        duration: "30-90 minutes",
        relatedServices: ["hot-stone-massage", "aromatherapy", "reflexology"]
    }
];

// Generate static params
export function generateStaticParams() {
    return servicePages.map((service) => ({
        service: service.slug,
    }));
}

// Get service by slug
function getServiceBySlug(slug: string): ServicePageData | undefined {
    return servicePages.find((s) => s.slug === slug);
}

interface PageProps {
    params: Promise<{ service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service: serviceSlug } = await params;
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        return { title: "Service Not Found" };
    }

    return {
        title: service.metaTitle,
        description: service.metaDescription,
        keywords: service.keywords,
        openGraph: {
            title: service.metaTitle,
            description: service.metaDescription,
            type: "website",
            locale: "en_ZA",
        },
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { service: serviceSlug } = await params;
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        notFound();
    }

    const category = getCategoryById(service.categoryId);

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center">
                            <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                                {service.heroSubtitle}
                            </span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                                {service.heroTitle}
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                                {service.intro}
                            </p>

                            {/* Price & Duration */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gold/20">
                                    <span className="text-gold font-bold text-xl">{service.price}</span>
                                </div>
                                <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-border">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {service.duration}
                                    </span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white px-8">
                                    <a href={`https://wa.me/${businessInfo.socials.whatsapp.replace(/\D/g, '')}?text=Hi, I'd like to book a ${service.title} appointment`}>
                                        Book on WhatsApp
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8">
                                    <a href={`tel:${businessInfo.phone}`}>
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call to Book
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-center mb-12">
                            Why Choose <span className="text-gold">{service.title}</span>?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
                                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-16 lg:py-24 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-center mb-4">
                            The Treatment Process
                        </h2>
                        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                            Here's what to expect during your {service.title.toLowerCase()} treatment at Galeo Beauty.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {service.process.map((step, index) => (
                                <div key={index} className="relative">
                                    <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-border">
                                        <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold mb-4">
                                            {index + 1}
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground text-sm">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {service.faqs.map((faq, index) => (
                                <div key={index} className="bg-secondary/30 rounded-xl p-6">
                                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                                    <p className="text-muted-foreground">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 lg:py-24 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
                        <h2 className="font-serif text-3xl lg:text-4xl mb-4">
                            Ready to Book Your {service.title}?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-2xl mx-auto">
                            Contact us today to schedule your appointment. Walk-ins welcome, but booking ensures your preferred time slot.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white px-8">
                                <a href={`https://wa.me/${businessInfo.socials.whatsapp.replace(/\D/g, '')}?text=Hi, I'd like to book a ${service.title} appointment`}>
                                    Book on WhatsApp
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 px-8">
                                <Link href={category ? `/prices/${category.id}` : "/prices"}>
                                    View All {category?.title || "Services"}
                                </Link>
                            </Button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-background/70">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Hartbeespoort Dam (45 min from Pretoria)
                            </span>
                            <span className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {businessInfo.phone}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}
                <ReviewsSection />

                {/* Internal Links */}
                <section className="py-12 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h3 className="font-serif text-xl text-foreground mb-6 text-center">
                            Explore More Services
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {servicePages
                                .filter((s) => s.slug !== service.slug)
                                .slice(0, 6)
                                .map((s) => (
                                    <Link
                                        key={s.slug}
                                        href={`/services/${s.slug}`}
                                        className="px-4 py-2 bg-white rounded-full text-sm text-foreground hover:bg-gold hover:text-white transition-colors border border-border"
                                    >
                                        {s.title}
                                    </Link>
                                ))}
                            <Link
                                href="/prices"
                                className="px-4 py-2 bg-foreground rounded-full text-sm text-background hover:bg-gold transition-colors"
                            >
                                View All Services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: service.title,
                        description: service.intro,
                        provider: {
                            "@type": "BeautySalon",
                            name: "Galeo Beauty",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "Shop 6, Landsmeer Estate, Jan Smuts Ave",
                                addressLocality: "Hartbeespoort Dam",
                                addressRegion: "North West",
                                addressCountry: "ZA",
                            },
                        },
                        areaServed: ["Hartbeespoort", "Pretoria", "Johannesburg", "Centurion", "Midrand"],
                        offers: {
                            "@type": "Offer",
                            price: service.price.replace(/[^0-9.]/g, ""),
                            priceCurrency: "ZAR",
                        },
                    }),
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: service.faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.q,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.a,
                            },
                        })),
                    }),
                }}
            />
        </>
    );
}
