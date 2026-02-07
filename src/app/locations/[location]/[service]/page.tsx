import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import {
    getLocationBySlug,
    getServiceBySlug,
    getCategoryForService,
    getPriorityParams,
    getNearbyLocations,
    getRelatedServices,
    getPopularServicesFromOtherCategories,
    getServiceSpecificBenefits,
    generateServiceIntro,
    getDrivingContext,
    getLocationInsights,
    getLocationServiceInsight,
    getDynamicRelatedServices,
    getServiceFAQs,
    getTreatmentProcess,
    type SEOLocation,
    type SEOService,
    type FAQ,
    type TreatmentStep,
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";

// ============================================
// STATIC GENERATION WITH ISR
// ============================================
// Priority locations (Hartbeespoort core) pre-built at build time.
// All other Gauteng locations generate on-demand via ISR when first visited.

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 43200; // ISR: Revalidate every 12 hours

export function generateStaticParams() {
    // Only pre-build priority location/service combinations
    return getPriorityParams();
}

// ============================================
// METADATA
// ============================================

interface PageProps {
    params: Promise<{
        location: string;
        service: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: locationSlug, service: serviceSlug } = await params;
    const location = getLocationBySlug(locationSlug);
    const service = getServiceBySlug(serviceSlug);

    if (!location || !service) {
        return { title: "Service Not Found" };
    }

    const title = `${service.keyword} in ${location.name} | Galeo Beauty Salon & Spa`;
    const description = `Book ${service.keyword} at Galeo Beauty Salon near ${location.name}, ${location.region}. Professional beauty spa & day spa treatments in Hartbeespoort. Walk-in welcome, affordable prices from ${service.price}. Top-rated beauty parlour.`;

    // Category-specific keywords with treatment-specific names, problem/solution, and high-conversion intent
    const categoryKeywords: Record<string, string[]> = {
        "hart-aesthetics": [`liquid facelift ${location.name}`, `Russian lip fillers ${location.name}`, `Nefertiti lift cost ${location.name}`, "skin boosters under eye near me", "collagen biostimulator injections"],
        "fat-freezing": [`fat freezing cost ${location.name}`, `cryolipolysis before and after ${location.name}`, "stubborn belly fat treatment near me", "double chin fat freezing prices", "non-surgical fat removal results"],
        "slimming": [`Tesla EMS slimming ${location.name}`, `body sculpting ${location.name}`, "HIFEM muscle toning near me", "inch loss treatment results", "non-invasive weight loss near me"],
        "dermalogica": [`Dermalogica Pro Power Peel ${location.name}`, `chemical peel for pigmentation ${location.name}`, "microneedling with nanoinfusion near me", "deep pore cleansing facial for acne", "medical grade facial near me"],
        "qms-facial": [`QMS collagen facial ${location.name}`, `anti-aging facial results ${location.name}`, "collagen boosting treatment near me", "fine lines and wrinkle facial prices", "luxury medical facial near me"],
        "pro-skin": [`microneedling ${location.name}`, `dermaplaning results ${location.name}`, "chemical peel for acne scars near me", "pigmentation treatment before and after", "skin rejuvenation near me"],
        "ipl": [`IPL Brazilian hair removal ${location.name}`, `full body laser ${location.name}`, "laser hair removal for men near me", "permanent hair removal face and neck", "IPL hair removal results"],
        "hair": [`balayage stylist ${location.name}`, `Brazilian blowout ${location.name}`, "keratin treatment for frizzy hair near me", "full head foils and toner prices", "hair botox treatment near me"],
        "nails": [`gel nails ${location.name}`, `acrylic full set ${location.name}`, "rubber base gel manicure near me", "nail art designs prices", "pedicure with gel soak off near me"],
        "lashes": [`volume lash extensions ${location.name}`, `lash lift and tint ${location.name}`, "classic vs volume lashes near me", "silky soft master lashes prices", "lash lamination results"],
        "permanent-makeup": [`microblading ${location.name}`, `powder pixel brows ${location.name}`, "hybrid brows vs microblading near me", "lip contour permanent makeup prices", "permanent eyeliner top and bottom"],
        "waxing": [`Brazilian wax ${location.name}`, `Hollywood wax ${location.name}`, "mens back and chest waxing near me", "full body wax prices", "painless waxing near me"],
        "makeup": [`bridal makeup artist ${location.name}`, `matric dance makeup ${location.name}`, "wedding makeup trial near me", "Kryolan professional makeup prices", "evening glam makeup near me"],
        "sunbed": [`sunbed tanning ${location.name}`, `spray tan ${location.name}`, "bridal spray tan near me", "sunbed packages prices", "safe indoor tanning near me"],
        "medical": [`fractional laser for acne scars ${location.name}`, `Plasmage skin tightening ${location.name}`, "non-surgical vaginal tightening near me", "scar treatment before and after", "medical aesthetics results"],
        "hair-extensions": [`tape-in hair extensions ${location.name}`, `clip-in extensions ${location.name}`, "Remy human hair extensions prices", "keratin bond extensions near me", "hair extensions before and after"],
    };

    const serviceCategoryKeywords = categoryKeywords[service.categoryId] || [];

    // Noindex low-value variant pages (hair extension size/color combos, blow-dry packages)
    // These create near-identical thin content that wastes crawl budget
    const lowValuePatterns = /^(tape|utip|microloop|clip|halo|ponytail)-\d+cm-(dark|light)$/;
    const isLowValueVariant = lowValuePatterns.test(serviceSlug);

    return {
        title,
        description,
        keywords: [
            // PRIMARY: Core service + location
            `${service.keyword} ${location.name}`,
            `${service.keyword} near me`,

            // CONVERSION: Price & booking intent
            `${service.keyword} prices ${location.name}`,
            `best ${service.keyword} ${location.name}`,

            // DECISION STAGE: Results & before/after
            `${service.keyword} results`,
            `${service.keyword} before and after`,

            // CATEGORY-SPECIFIC (treatment names + problem/solution)
            ...serviceCategoryKeywords.slice(0, 5),
        ],
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
            siteName: "Galeo Beauty Salon & Spa",
            locale: "en_ZA",
            images: [
                {
                    url: "https://www.galeobeauty.com/images/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${service.keyword} at Galeo Beauty - Professional Beauty Salon in Hartbeespoort`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://www.galeobeauty.com/images/og-image.jpg"],
            site: "@galeobeauty",
        },
        alternates: {
            canonical: `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
        },
        robots: {
            index: !isLowValueVariant,
            follow: true,
            googleBot: {
                index: !isLowValueVariant,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function LocationServicePage({ params }: PageProps) {
    const { location: locationSlug, service: serviceSlug } = await params;
    const location = getLocationBySlug(locationSlug);
    const service = getServiceBySlug(serviceSlug);
    const category = getCategoryForService(serviceSlug);

    if (!location || !service) {
        notFound();
    }

    // Get data for internal linking
    const nearbyLocations = getNearbyLocations(locationSlug, 5);
    const relatedServices = getRelatedServices(serviceSlug, 4);
    const otherCategoryServices = getPopularServicesFromOtherCategories(service.categoryId, 3);
    const dynamicRelatedServices = getDynamicRelatedServices(serviceSlug, 5);

    // Get unique content
    const benefits = getServiceSpecificBenefits(service);
    const introText = generateServiceIntro(service, location);
    const drivingContext = getDrivingContext(location);
    const locationInsights = getLocationInsights(location);
    const locationServiceInsight = getLocationServiceInsight(service, location);
    const faqs = getServiceFAQs(service, location);
    const treatmentProcess = getTreatmentProcess(service, location);

    const whatsappMessage = encodeURIComponent(
        `Hi! I found you on www.galeobeauty.com and I'm interested in ${service.keyword}. I'm based in ${location.name}. Can I book an appointment?`
    );
    const whatsappLink = `https://wa.me/${businessInfo.socials.whatsapp}?text=${whatsappMessage}`;

    // Schema.org structured data with Reviews
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${service.keyword} at Galeo Beauty Salon & Spa`,
        description: `Professional ${service.keyword} salon and spa service near ${location.name}. Premium beauty parlour and day spa treatments at affordable prices. Book your appointment today.`,
        serviceType: [service.keyword, "Beauty Treatment", "Spa Treatment", "Salon Service"],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "159",
            bestRating: "5",
            worstRating: "1",
        },
        // Note: Individual reviews are only shown on the homepage to avoid duplicate content across 70k+ pages
        provider: {
            "@type": "BeautySalon",
            name: "Galeo Beauty Salon & Spa",
            alternateName: ["Galeo Beauty", "Galeo Beauty Spa", "Galeo Day Spa", "Galeo Beauty Parlour"],
            description: "Premium beauty salon, spa and day spa in Hartbeespoort offering skincare, facials, nails, hair care, lashes, waxing, body treatments and aesthetic treatments. Top-rated beauty parlour serving Gauteng and North West.",
            additionalType: ["https://schema.org/DaySpa", "https://schema.org/HealthAndBeautyBusiness"],
            image: "https://www.galeobeauty.com/images/logo.png",
            priceRange: "$$",
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "159",
                bestRating: "5",
                worstRating: "1",
            },
            address: {
                "@type": "PostalAddress",
                streetAddress: businessInfo.address.street,
                addressLocality: "Hartbeespoort",
                addressRegion: "North West",
                postalCode: "0216",
                addressCountry: "ZA",
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: -25.753414,
                longitude: 27.909252,
            },
            telephone: businessInfo.phone,
            url: "https://www.galeobeauty.com",
            openingHoursSpecification: [
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "08:00",
                    closes: "18:00",
                },
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "08:00",
                    closes: "16:00",
                },
            ],
        },
        areaServed: {
            "@type": "Place",
            name: location.name,
            containedInPlace: {
                "@type": "AdministrativeArea",
                name: location.region,
            },
        },
        offers: {
            "@type": "Offer",
            price: service.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "ZAR",
        },
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.galeobeauty.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Locations",
                item: "https://www.galeobeauty.com/locations",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: location.name,
                item: `https://www.galeobeauty.com/locations/${locationSlug}`,
            },
            {
                "@type": "ListItem",
                position: 4,
                name: service.keyword,
                item: `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
            },
        ],
    };

    // FAQPage Schema for rich snippets
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    // HowTo Schema for treatment process
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to Get ${service.keyword} at Galeo Beauty`,
        description: `Step-by-step guide to receiving ${service.keyword} treatment at our Hartbeespoort salon near ${location.name}.`,
        totalTime: service.duration || "PT1H",
        step: treatmentProcess.map((step) => ({
            "@type": "HowToStep",
            position: step.step,
            name: step.title,
            text: step.description,
            ...(step.duration && { itemListElement: { "@type": "HowToDirection", duringMedia: step.duration } }),
        })),
    };

    // Combine all schemas
    const allSchemas = [structuredData, breadcrumbSchema, faqSchema, howToSchema];

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Schema.org JSON-LD - Multiple schemas */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
                />

                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />

                    <div className="container mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-2">
                                <li>
                                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                                </li>
                                <li><span className="mx-1">/</span></li>
                                <li>
                                    <Link href="/prices" className="hover:text-gold transition-colors">Services</Link>
                                </li>
                                {category && (
                                    <>
                                        <li><span className="mx-1">/</span></li>
                                        <li>
                                            <Link href={`/prices/${category.id}`} className="hover:text-gold transition-colors">
                                                {category.title}
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li><span className="mx-1">/</span></li>
                                <li className="text-foreground">{location.name}</li>
                            </ol>
                        </nav>

                        {/* Main Heading */}
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                            Professional <span className="text-gold italic">{service.keyword}</span>
                            <br />near <span className="text-gold">{location.name}</span>
                        </h1>

                        {/* Unique intro paragraph */}
                        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                            {introText}
                        </p>

                        {/* Price & Duration */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="bg-gold/10 border border-gold/20 rounded-full px-6 py-3">
                                <span className="text-gold font-bold text-lg">{service.price}</span>
                            </div>
                            {service.duration && (
                                <div className="bg-secondary/50 border border-border rounded-full px-6 py-3 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground">{service.duration}</span>
                                </div>
                            )}
                            {category && (
                                <div className="bg-secondary/50 border border-border rounded-full px-6 py-3">
                                    <span className="text-foreground text-sm">{category.badge}</span>
                                </div>
                            )}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Book via WhatsApp
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                                <Link href="/prices">
                                    View All Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section - Category-specific benefits */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-8">
                            Why Choose Galeo Beauty for <span className="text-gold">{service.keyword}</span>?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Treatment Process - What to Expect */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-2 text-center">
                            What to Expect During {service.keyword}
                        </h2>
                        <p className="text-muted-foreground text-center mb-12">
                            Your step-by-step treatment journey at Galeo Beauty
                        </p>

                        <div className="space-y-6">
                            {treatmentProcess.map((step) => (
                                <div key={step.step} className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                                            <span className="text-gold font-bold text-lg">{step.step}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-foreground text-lg">
                                                {step.title}
                                            </h3>
                                            {step.duration && (
                                                <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                                    {step.duration}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 text-center p-6 bg-secondary/20 rounded-xl">
                            <p className="text-muted-foreground mb-4">
                                Have questions about the {service.keyword} process?
                            </p>
                            <Button asChild className="bg-gold hover:bg-gold-dark text-foreground rounded-full">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Chat with Us on WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Location Info - Location-specific insights for uniqueness */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-6">
                            Serving <span className="text-gold">{location.name}</span> & {location.region}
                        </h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {locationInsights.characteristic}
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {locationInsights.clientProfile}
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {drivingContext}. {locationInsights.travelNote}
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed bg-secondary/20 p-4 rounded-lg border-l-4 border-gold">
                                {locationServiceInsight}
                            </p>
                        </div>

                        <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground mb-1">Our Location</p>
                                    <p className="text-muted-foreground">
                                        {businessInfo.address.street}<br />
                                        {businessInfo.address.area}<br />
                                        {businessInfo.address.city}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 mt-4 pt-4 border-t border-border">
                                <Phone className="w-6 h-6 text-gold flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground mb-1">Call or WhatsApp</p>
                                    <a href={`tel:${businessInfo.phone}`} className="text-gold hover:underline">
                                        012 111 1730
                                    </a>
                                    <span className="text-muted-foreground mx-2">|</span>
                                    <a href={whatsappLink} className="text-gold hover:underline">
                                        {businessInfo.cell}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Services - Same Category */}
                {relatedServices.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                More {category?.title} Services in {location.name}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Explore our other {category?.title.toLowerCase()} treatments available for {location.name} residents:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedServices.map((relatedService) => (
                                    <Link
                                        key={relatedService.slug}
                                        href={`/locations/${locationSlug}/${relatedService.slug}`}
                                        className="group bg-background rounded-xl p-5 border border-border hover:border-gold/40 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-foreground group-hover:text-gold transition-colors">
                                                    {relatedService.keyword}
                                                </h3>
                                                {relatedService.duration && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {relatedService.duration}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-gold font-semibold">{relatedService.price}</span>
                                        </div>
                                        <div className="mt-3 text-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            View details <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {category && (
                                <div className="mt-8">
                                    <Button asChild variant="outline" className="rounded-full">
                                        <Link href={`/prices/${category.id}`}>
                                            View All {category.title} Services
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Other Services - Cross-category */}
                {otherCategoryServices.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                <Sparkles className="w-6 h-6 inline-block text-gold mr-2" />
                                Also Popular in {location.name}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Discover more of our premium beauty services:
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {otherCategoryServices.map((otherService) => (
                                    <Link
                                        key={otherService.slug}
                                        href={`/locations/${locationSlug}/${otherService.slug}`}
                                        className="bg-secondary/50 hover:bg-gold hover:text-white rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300"
                                    >
                                        {otherService.keyword}
                                    </Link>
                                ))}
                                <Link
                                    href="/prices"
                                    className="bg-gold/10 hover:bg-gold hover:text-white rounded-full px-5 py-2.5 text-sm font-medium text-gold transition-all duration-300"
                                >
                                    View All Services →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Nearby Areas - Location internal linking */}
                {nearbyLocations.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                {service.keyword} Near Other {location.region} Areas
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                We also serve clients from these nearby areas:
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {nearbyLocations.map((nearbyLoc) => (
                                    <Link
                                        key={nearbyLoc.slug}
                                        href={`/locations/${nearbyLoc.slug}/${serviceSlug}`}
                                        className="bg-background hover:bg-gold hover:text-white rounded-full px-5 py-2.5 text-sm font-medium text-foreground border border-border hover:border-gold transition-all duration-300"
                                    >
                                        {nearbyLoc.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Dynamic Related Services - Unique Per Page */}
                <section className="py-16 bg-background border-t border-b border-border">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-4 text-center">
                            <Sparkles className="w-6 h-6 inline-block text-gold mr-2" />
                            You Might Also Be Interested In
                        </h2>
                        <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
                            Discover complementary treatments popular with {location.name} clients
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {dynamicRelatedServices.map((relatedService) => (
                                <Link
                                    key={relatedService.slug}
                                    href={`/locations/${locationSlug}/${relatedService.slug}`}
                                    className="group bg-white hover:bg-gold rounded-xl p-5 border border-border hover:border-gold transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
                                >
                                    <div className="text-gold mb-2"><Sparkles className="w-6 h-6" /></div>
                                    <h3 className="font-medium text-foreground group-hover:text-white transition-colors text-sm">
                                        {relatedService.keyword}
                                    </h3>
                                    <p className="text-xs text-muted-foreground group-hover:text-white/80 mt-1">
                                        from {relatedService.price}
                                    </p>
                                    {relatedService.duration && (
                                        <p className="text-xs text-muted-foreground group-hover:text-white/70 mt-1">
                                            {relatedService.duration}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/prices"
                                className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                                View all services available in {location.name}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Service-specific questions */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-2 text-center">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground text-center mb-10">
                            Common questions about {service.keyword} in {location.name}
                        </p>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-background border border-border rounded-xl p-6">
                                    <h3 className="font-semibold text-foreground mb-3 text-lg">
                                        {faq.question}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <p className="text-muted-foreground mb-4">
                                Have more questions about {service.keyword}?
                            </p>
                            <Button asChild className="bg-gold hover:bg-gold-dark text-foreground rounded-full">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Ask Us on WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 text-center bg-foreground text-background">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">
                            Ready for Your <span className="text-gold">{service.keyword}</span>?
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                            Book your appointment today. {location.name} residents can enjoy premium
                            beauty treatments at our Hartbeespoort sanctuary.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground h-14 px-10 text-lg rounded-full">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Book Now via WhatsApp
                                </a>
                            </Button>
                            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                                <Link href="/contact">
                                    Contact Us
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
