import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { LocationServiceBookingButton } from "@/components/booking/LocationServiceBookingButton";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { MapPin, Clock, Phone, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import {
    getLocationBySlug,
    getServiceBySlug,
    getCategoryForService,
    getPrebuildLocationServiceParams,
    getNearbyLocations,
    getRelatedServices,
    getPopularServicesFromOtherCategories,
    getServiceSpecificBenefits,
    getTreatmentProcess,
    getDynamicRelatedServices,
    getDrivingContext,
    getLocationInsights,
    getLocationServiceInsight,
    getServiceFAQs,
    getPriorityLocationServiceContent,
    isHartbeespoortClusterLocation,
    isIndexableLocationService,
    isPriorityLocationService,
    isBroadLocationHub,
    type FAQ,
} from "@/lib/seo-data";
import { generateServiceDescription } from "@/lib/seo-generator";
import { businessInfo } from "@/lib/constants";
import { resolveLegacyServiceRedirect } from "@/lib/legacy-service-redirects";
import { buildServiceKeywords, buildServiceMetadataKeywords } from "@/lib/seo-keywords";
import { limitStaticParams } from "@/lib/build-config";
import { toAbsoluteUrl } from "@/lib/site-url";

// ============================================
// STATIC GENERATION WITH ISR
// ============================================
// Priority locations (Hartbeespoort core) pre-built at build time.
// All other Gauteng locations generate on-demand via ISR when first visited.

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 43200; // ISR: Revalidate every 12 hours

export function generateStaticParams() {
    // Pre-build the strongest location-service combinations across all target locations.
    return limitStaticParams(getPrebuildLocationServiceParams(), "locationServices");
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
    const legacyService = resolveLegacyServiceRedirect(serviceSlug);

    if (!location || (!service && !legacyService)) {
        return { title: "Service Not Found" };
    }

    if (!service) {
        return { title: "Service Not Found" };
    }

    const shouldIndex = isIndexableLocationService(locationSlug, serviceSlug);
    const category = getCategoryForService(serviceSlug);
    const categoryTitle = category?.title || "Beauty Services";
    const canonicalUrl = shouldIndex
        ? `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`
        : `https://www.galeobeauty.com/prices/${service.categoryId}/${service.slug}`;

    // Generate unique description
    const richDescription = generateServiceDescription(
        // @ts-expect-error - generator expects a service item shape with name
        { ...service, name: service.keyword },
        categoryTitle,
        location.name
    );
    const title = `${service.keyword} in ${location.name}`;
    const metadataDescription = `${richDescription.substring(0, 150)} Book from our Hartbeespoort salon, convenient for ${location.name} clients.`;
    const socialDescription = `${richDescription.substring(0, 140)} Serving ${location.name} and surrounding Hartbeespoort areas.`;
    const serviceImageUrl = toAbsoluteUrl(service.image);

    return {
        title,
        description: metadataDescription,
        keywords: buildServiceMetadataKeywords(service, location),
        openGraph: {
            title,
            description: socialDescription,
            type: "website",
            url: canonicalUrl,
            siteName: "Galeo Beauty Salon & Spa",
            locale: "en_ZA",
            images: [
                {
                    url: serviceImageUrl,
                    alt: service.imageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: socialDescription,
            images: [serviceImageUrl],
            site: "@galeobeauty",
        },
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: shouldIndex,
            follow: true,
            googleBot: {
                index: shouldIndex,
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
    const legacyService = resolveLegacyServiceRedirect(serviceSlug);

    if (!location && service) {
        redirect(`/prices/${service.categoryId}/${service.slug}`);
    }

    if (location && !service && legacyService) {
        if (legacyService.serviceSlug) {
            redirect(`/locations/${locationSlug}/${legacyService.serviceSlug}`);
        }
        redirect(`/prices/${legacyService.categoryId}`);
    }

    if (!location && legacyService) {
        if (legacyService.serviceSlug) {
            redirect(`/prices/${legacyService.categoryId}/${legacyService.serviceSlug}`);
        }
        redirect(`/prices/${legacyService.categoryId}`);
    }

    if (!location) {
        redirect("/locations");
    }

    if (!service) {
        notFound();
    }

    if (isBroadLocationHub(location)) {
        redirect(`/prices/${service.categoryId}/${service.slug}`);
    }

    if (isHartbeespoortClusterLocation(locationSlug)) {
        permanentRedirect(`/prices/${service.categoryId}/${service.slug}`);
    }

    const resolvedService = service;
    const category = getCategoryForService(resolvedService.slug);

    // Get data for internal linking
    const nearbyLocations = getNearbyLocations(locationSlug, 5);
    const relatedServices = getRelatedServices(serviceSlug, 4);
    const otherCategoryServices = getPopularServicesFromOtherCategories(resolvedService.categoryId, 3);
    const dynamicRelatedServices = getDynamicRelatedServices(serviceSlug, 5);

    // Get unique content
    const benefits = getServiceSpecificBenefits(resolvedService);

    // Use new generator for rich, attribute-based description
    const richDescription = generateServiceDescription(
        // @ts-expect-error - generator expects a service item shape with name
        { ...resolvedService, name: resolvedService.keyword },
        category?.title || "Beauty Services",
        location.name
    );
    const serviceKeywords = buildServiceKeywords(resolvedService, location);
    const serviceImage = resolvedService.image;
    const serviceImageAlt = resolvedService.imageAlt;
    const serviceImageUrl = toAbsoluteUrl(serviceImage);
    const relatedKeywordPool = serviceKeywords.filter(
        (keyword) => keyword.toLowerCase() !== resolvedService.keyword.toLowerCase()
    );
    const lsiKeyword = relatedKeywordPool.length > 0
        ? relatedKeywordPool[(resolvedService.slug.length + location.slug.length) % relatedKeywordPool.length]
        : "treatment";
    const introText = `${richDescription} ${location.name} residents can now enjoy this premium ${lsiKeyword} close to home.`;
    const serviceTypeKeywords = Array.from(
        new Set([
            resolvedService.keyword,
            ...serviceKeywords.slice(0, 8),
            "Beauty Treatment",
            "Spa Treatment",
            "Salon Service",
        ])
    );

    const drivingContext = getDrivingContext(location);
    const locationInsights = getLocationInsights(location);
    const locationServiceInsight = getLocationServiceInsight(resolvedService, location);
    const faqs = getServiceFAQs(resolvedService, location);
    const treatmentProcess = getTreatmentProcess(resolvedService, location);
    const priorityContent = getPriorityLocationServiceContent(resolvedService, location);
    const isPriorityCombination = isPriorityLocationService(locationSlug, serviceSlug);

    const whatsappMessage =
        `Hi! I found you on www.galeobeauty.com and I'm interested in ${resolvedService.keyword}. I'm based in ${location.name}. Can I book an appointment?`;
    const bookingService = {
        id: resolvedService.slug,
        name: resolvedService.keyword,
        price: resolvedService.price,
        duration: resolvedService.duration,
        description: resolvedService.description,
    };

    // Schema.org structured data — BeautySalon as top-level type
    // Google Review Snippets only support aggregateRating on LocalBusiness/BeautySalon,
    // NOT on Service type. Placing it on Service causes "Invalid object type for field '<parent_node>'" error.
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "@id": `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}#salon`,
        name: "Galeo Beauty Salon & Spa",
        alternateName: ["Galeo Beauty", "Galeo Beauty Spa", "Galeo Day Spa", "Galeo Beauty Parlour"],
        description: `${richDescription.substring(0, 150)} Available for ${location.name} clients from our Hartbeespoort salon.`,
        additionalType: ["https://schema.org/DaySpa", "https://schema.org/HealthAndBeautyBusiness"],
        image: serviceImageUrl,
        logo: "https://www.galeobeauty.com/images/logo.png",
        priceRange: "$$",
        url: `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
        telephone: businessInfo.phone,
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
        areaServed: {
            "@type": "Place",
            name: location.name,
            containedInPlace: {
                "@type": "AdministrativeArea",
                name: location.region,
            },
        },
        makesOffer: {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: `${resolvedService.keyword} at Galeo Beauty Salon & Spa`,
                description: introText,
                image: serviceImageUrl,
                serviceType: serviceTypeKeywords,
                url: `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
            },
            url: `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
            price: resolvedService.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "ZAR",
            availability: "https://schema.org/InStock",
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
        mainEntity: faqs.map((faq: FAQ) => ({
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

                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-start">
                            <div className="max-w-4xl">
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
                                <div className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl space-y-4">
                                    <p>{introText}</p>
                                </div>

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
                                    <LocationServiceBookingButton
                                        service={bookingService}
                                        categoryId={resolvedService.categoryId}
                                        categoryTitle={category?.title || "Beauty Services"}
                                        label="Book Now"
                                        className="h-[3.25rem] rounded-full bg-secondary/60 px-6 text-foreground hover:bg-gold hover:text-white"
                                    />
                                    <Button asChild variant="outline" size="lg" className="h-[3.25rem] rounded-full px-8">
                                        <Link href="/prices">
                                            View All Services
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <figure className="overflow-hidden rounded-[2rem] border border-border/60 bg-background/90 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)]">
                                <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                                    <CloudinaryImage
                                        src={serviceImage}
                                        alt={serviceImageAlt}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 34vw"
                                    />
                                </div>
                                <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                                    {resolvedService.keyword} for clients travelling from {location.name}. Prices start from {resolvedService.price}
                                    {resolvedService.duration ? ` and appointments typically take ${resolvedService.duration}.` : "."}
                                </figcaption>
                            </figure>
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

                {isPriorityCombination && priorityContent && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold mb-5">
                                Priority Location + Service Combination
                            </div>
                            <h2 className="font-serif text-3xl text-foreground mb-4">
                                {priorityContent.title}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                {priorityContent.intro}
                            </p>
                            <div className="space-y-4">
                                {priorityContent.bullets.map((bullet, index) => (
                                    <div key={index} className="flex items-start gap-3 rounded-xl border border-border bg-background p-5">
                                        <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground leading-relaxed">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

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
                                <TrackedWhatsAppLink
                                    message={whatsappMessage}
                                    trackingContext={`location_service_process_${location.slug}_${resolvedService.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Chat with Us on WhatsApp
                                </TrackedWhatsAppLink>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-6">
                            {service.keyword} Quick Facts for {location.name}
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Service</p>
                                <p className="font-medium text-foreground">{service.keyword}</p>
                                <p className="text-sm text-muted-foreground mt-2">From {service.price}{service.duration ? ` • ${service.duration}` : ""}</p>
                            </div>
                            <div className="rounded-xl border border-border bg-background p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Best For</p>
                                <p className="text-muted-foreground leading-relaxed">{locationServiceInsight}</p>
                            </div>
                            <div className="rounded-xl border border-border bg-background p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Travel Context</p>
                                <p className="text-muted-foreground leading-relaxed">{drivingContext}. {locationInsights.travelNote}</p>
                            </div>
                            <div className="rounded-xl border border-border bg-background p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Useful Links</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Link
                                        href={`/locations/${locationSlug}`}
                                        className="rounded-full bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-white"
                                    >
                                        {location.name} Hub
                                    </Link>
                                    {category && (
                                        <Link
                                            href={`/prices/${category.id}/${service.slug}`}
                                            className="rounded-full bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-white"
                                        >
                                            Main Service Page
                                        </Link>
                                    )}
                                    {category && (
                                        <Link
                                            href={`/prices/${category.id}`}
                                            className="rounded-full bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-white"
                                        >
                                            More {category.title}
                                        </Link>
                                    )}
                                </div>
                            </div>
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
                                    <TrackedExternalLink
                                        href={`tel:${businessInfo.phone}`}
                                        trackingContext={`location_service_phone_${location.slug}_${resolvedService.slug}`}
                                        linkType="phone"
                                        linkLabel="Location service phone"
                                        className="text-gold hover:underline"
                                    >
                                        012 111 1730
                                    </TrackedExternalLink>
                                    <span className="text-muted-foreground mx-2">|</span>
                                    <TrackedWhatsAppLink
                                        message={whatsappMessage}
                                        trackingContext={`location_service_contact_${location.slug}_${resolvedService.slug}`}
                                        className="text-gold hover:underline"
                                    >
                                        {businessInfo.cell}
                                    </TrackedWhatsAppLink>
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
                            {faqs.map((faq: FAQ, index: number) => (
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
                                <TrackedWhatsAppLink
                                    message={whatsappMessage}
                                    trackingContext={`location_service_faq_${location.slug}_${resolvedService.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ask Us on WhatsApp
                                </TrackedWhatsAppLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-stone-50/70 px-4 py-14 sm:px-6 lg:py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2rem] border border-[#2b2b2f] bg-[#171719] px-6 py-10 text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.65)] sm:px-8 lg:px-12 lg:py-14">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                            <div className="absolute -top-20 right-[-4rem] h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
                            <div className="absolute -bottom-24 left-[-3rem] h-52 w-52 rounded-full bg-white/5 blur-3xl" />

                            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.85fr)] lg:items-end">
                                <div>
                                    <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold/90">
                                        Book With Confidence
                                    </span>
                                    <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.9rem]">
                                        Ready for your <span className="text-gold">{service.keyword}</span> near {location.name}?
                                    </h2>
                                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
                                        We make it easy for {location.name} clients to book, plan travel time, and get clear
                                        guidance before the appointment so the whole visit feels smooth from start to finish.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                            Quick WhatsApp booking
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                            Clear treatment advice
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                            Easy trip planning from {location.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm sm:p-6">
                                    <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-gold/85">
                                        <Phone className="h-4 w-4" />
                                        Speak To The Salon
                                    </div>
                                    <p className="mt-4 text-sm leading-relaxed text-white/62">
                                        Reach out for availability, treatment advice, or help deciding whether {service.keyword}
                                        is the right fit for you.
                                    </p>

                                    <div className="mt-6 flex flex-col gap-3">
                                        <LocationServiceBookingButton
                                            service={bookingService}
                                            categoryId={resolvedService.categoryId}
                                            categoryTitle={category?.title || "Beauty Services"}
                                            label="Book Now"
                                            className="h-12 rounded-full bg-gold px-6 text-white hover:bg-gold-dark"
                                        />
                                        <Button
                                            asChild
                                            size="lg"
                                            className="h-12 rounded-full border border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
                                        >
                                            <Link href="/contact">
                                                Contact Galeo Beauty
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
