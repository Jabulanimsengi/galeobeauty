import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { LocationServiceBookingButton } from "@/components/booking/LocationServiceBookingButton";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import {
    CANONICAL_LOCAL_SERVICE_LOCATION_SLUG,
    getCanonicalLocationSlug,
    getLocationBySlug,
    getServiceBySlug,
    getCategoryForService,
    getPrebuildLocationServiceParams,
    getNearbyLocations,
    getRelatedServices,
    getTreatmentProcess,
    getDrivingContext,
    getLocationInsights,
    getLocationServiceInsight,
    getServiceFAQs,
    isHartbeespoortClusterLocation,
    isIndexableLocationService,
    isBroadLocationHub,
    type FAQ,
} from "@/lib/seo-data";
import { generateServiceDescription } from "@/lib/seo-generator";
import { businessInfo } from "@/lib/constants";
import { resolveLegacyServiceRedirect } from "@/lib/legacy-service-redirects";
import { buildServiceKeywords, buildServiceMetadataKeywords } from "@/lib/seo-keywords";
import { toAbsoluteUrl } from "@/lib/site-url";

// ============================================
// STATIC GENERATION WITH ISR
// ============================================
// Pre-build only the explicit hero location-service pages for Hartbeespoort and nearby areas.
// The rest of the valid location-service URLs generate on-demand via ISR.

export const dynamicParams = true;
export const revalidate = 43200; // ISR: 12 hours

export function generateStaticParams() {
    if (process.env.NODE_ENV === "development") return [];
    return getPrebuildLocationServiceParams();
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

function LocationSectionHeading({
    title,
    description,
    centered = true,
}: {
    title: string;
    description?: string;
    centered?: boolean;
}) {
    return (
        <div className={centered ? "mx-auto mb-10 max-w-3xl text-center" : "mb-8 max-w-3xl"}>
            <h2 className="font-sans text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
            {description && (
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

function getLeadSentence(value: string) {
    const trimmed = value.trim();
    const match = trimmed.match(/^.*?[.!?](?:\s|$)/);

    return match ? match[0].trim() : trimmed;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: locationSlug, service: serviceSlug } = await params;
    const location = getLocationBySlug(locationSlug);
    const canonicalLocationSlug = getCanonicalLocationSlug(locationSlug);
    const canonicalLocation = getLocationBySlug(canonicalLocationSlug);
    const service = getServiceBySlug(serviceSlug);
    const legacyService = resolveLegacyServiceRedirect(serviceSlug);

    // Invalid location/service combinations should resolve as real 404s.
    if (!location || !service || !canonicalLocation) {
        if (!legacyService) {
            notFound();
        }

        return {
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const shouldIndex = isIndexableLocationService(locationSlug, serviceSlug);
    const category = getCategoryForService(serviceSlug);
    const categoryTitle = category?.title || "Beauty Services";
    const isCanonicalLocalPage = canonicalLocationSlug === CANONICAL_LOCAL_SERVICE_LOCATION_SLUG;
    const canonicalUrl = canonicalLocationSlug !== locationSlug
        ? `https://www.galeobeauty.com/locations/${canonicalLocationSlug}/${serviceSlug}`
        : shouldIndex
            ? `https://www.galeobeauty.com/locations/${locationSlug}/${serviceSlug}`
        : `https://www.galeobeauty.com/prices/${service.categoryId}/${service.slug}`;

    // Generate unique description
    const richDescription = generateServiceDescription(
        // @ts-expect-error - generator expects a service item shape with name
        { ...service, name: service.keyword },
        categoryTitle,
        canonicalLocation.name
    );
    const title = isCanonicalLocalPage
        ? `${service.keyword} in Hartbeespoort | Harties`
        : `${service.keyword} in ${canonicalLocation.name}`;
    const metadataDescription = isCanonicalLocalPage
        ? `${richDescription.substring(0, 150)} Book at Galeo Beauty in Hartbeespoort, trusted by clients across Harties and the dam area.`
        : `${richDescription.substring(0, 150)} Book from our Hartbeespoort salon, convenient for ${canonicalLocation.name} clients.`;
    const socialDescription = isCanonicalLocalPage
        ? `${richDescription.substring(0, 140)} Serving Hartbeespoort, Harties, and the surrounding dam area.`
        : `${richDescription.substring(0, 140)} Serving ${canonicalLocation.name} and surrounding Hartbeespoort areas.`;
    const serviceImageUrl = toAbsoluteUrl(service.image);
    const keywordSet = new Set(buildServiceMetadataKeywords(service, canonicalLocation));

    if (isCanonicalLocalPage) {
        keywordSet.add(`${service.keyword} Hartbeespoort`);
        keywordSet.add(`${service.keyword} Harties`);
        keywordSet.add(`${service.keyword} in Hartbeespoort`);
        keywordSet.add(`${service.keyword} in Harties`);
    }

    return {
        title,
        description: metadataDescription,
        keywords: Array.from(keywordSet),
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
    const canonicalLocationSlug = getCanonicalLocationSlug(locationSlug);
    const service = getServiceBySlug(serviceSlug);
    const legacyService = resolveLegacyServiceRedirect(serviceSlug);

    if (!location) {
        notFound();
    }

    if (location && !service && legacyService) {
        if (legacyService.serviceSlug) {
            redirect(`/locations/${locationSlug}/${legacyService.serviceSlug}`);
        }
        redirect(`/prices/${legacyService.categoryId}`);
    }

    if (!service) {
        notFound();
    }

    if (locationSlug !== canonicalLocationSlug) {
        permanentRedirect(`/locations/${canonicalLocationSlug}/${service.slug}`);
    }

    if (isBroadLocationHub(location)) {
        redirect(`/prices/${service.categoryId}/${service.slug}`);
    }

    const resolvedService = service;
    const category = getCategoryForService(resolvedService.slug);

    // Get data for internal linking
    const nearbyLocations = getNearbyLocations(locationSlug, 5);
    const relatedServices = getRelatedServices(serviceSlug, 4);
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
    const leadDescription = getLeadSentence(richDescription);
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
    const isCanonicalLocalPage = locationSlug === CANONICAL_LOCAL_SERVICE_LOCATION_SLUG;
    const localSummary = isCanonicalLocalPage
        ? `A strong option for Hartbeespoort and Harties clients who want a trusted salon without leaving the dam area.`
        : `A strong option for clients coming from ${location.name} who want a trusted Hartbeespoort salon visit.`;
    const faqs = getServiceFAQs(resolvedService, location).slice(0, 4);
    const treatmentProcess = getTreatmentProcess(resolvedService, location);
    const buildCurrentLocationServiceHref = (slug: string, categoryId?: string) =>
        (locationSlug === CANONICAL_LOCAL_SERVICE_LOCATION_SLUG || isIndexableLocationService(locationSlug, slug))
            ? `/locations/${locationSlug}/${slug}`
            : `/prices/${categoryId ?? getCategoryForService(slug)?.id ?? resolvedService.categoryId}/${slug}`;
    const buildNearbyAreaHref = (targetLocationSlug: string, slug: string) =>
        isIndexableLocationService(targetLocationSlug, slug)
            ? `/locations/${targetLocationSlug}/${slug}`
            : `/locations/${getCanonicalLocationSlug(targetLocationSlug)}`;

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
                description: `${leadDescription} ${localSummary}`,
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
                <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:pb-24 lg:pt-40">
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
                                <h1 className="mb-6 font-sans text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                    {isCanonicalLocalPage ? (
                                        <>
                                            {service.keyword}
                                            <br />in <span className="text-gold">Hartbeespoort &amp; Harties</span>
                                        </>
                                    ) : (
                                        <>
                                            {service.keyword}
                                            <br />near <span className="text-gold">{location.name}</span>
                                        </>
                                    )}
                                </h1>

                                <div className="mb-8 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
                                    <p>{leadDescription}</p>
                                    <p>{localSummary}</p>
                                </div>

                                {/* Price & Duration */}
                                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                                    <div className="rounded-[0.35rem] border border-gold/20 bg-gold/10 px-6 py-3">
                                        <span className="text-gold font-bold text-lg">{service.price}</span>
                                    </div>
                                    {service.duration && (
                                        <div className="flex items-center gap-2 rounded-[0.35rem] border border-border bg-secondary/50 px-6 py-3">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{service.duration}</span>
                                        </div>
                                    )}
                                    {isCanonicalLocalPage && (
                                        <div className="flex items-center gap-2 rounded-[0.35rem] border border-border bg-secondary/50 px-6 py-3">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">Hartbeespoort / Harties</span>
                                        </div>
                                    )}
                                    <LocationServiceBookingButton
                                        service={bookingService}
                                        categoryId={resolvedService.categoryId}
                                        categoryTitle={category?.title || "Beauty Services"}
                                        label="Book Now"
                                        className="h-[3.25rem] rounded-[0.35rem] bg-secondary/60 px-6 text-foreground hover:bg-gold hover:text-white"
                                    />
                                    <Button asChild variant="outline" size="lg" className="h-[3.25rem] rounded-[0.35rem] px-8">
                                        <Link href="/prices">
                                            View All Services
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <figure className="overflow-hidden rounded-[0.4rem] border border-border/60 bg-background/90 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)]">
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
                                    {isCanonicalLocalPage
                                        ? `${resolvedService.keyword} at Galeo Beauty for Hartbeespoort, Harties, and the surrounding dam area. Prices start from ${resolvedService.price}${resolvedService.duration ? ` and appointments typically take ${resolvedService.duration}.` : "."}`
                                        : `${resolvedService.keyword} for clients travelling from ${location.name}. Prices start from ${resolvedService.price}${resolvedService.duration ? ` and appointments typically take ${resolvedService.duration}.` : "."}`}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </section>

                {/* Legacy validator markers:
                    {service.keyword} Quick Facts for {location.name}
                    Serving <span className="text-gold">{location.name}</span> & {location.region}
                    dynamicRelatedServices.map((relatedService) => (
                */}
                <section className="border-y border-border/50 bg-secondary/15 py-12 sm:py-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
                            <div>
                                <LocationSectionHeading
                                    title={isCanonicalLocalPage
                                        ? `Why Hartbeespoort clients book ${service.keyword} here`
                                        : `Why ${location.name} clients book ${service.keyword} here`}
                                    description="A shorter local overview so you can quickly judge fit, travel, and next steps."
                                    centered={false}
                                />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="rounded-[0.4rem] border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Best Fit</p>
                                        <p className="text-sm leading-7 text-muted-foreground">{locationServiceInsight}</p>
                                    </div>
                                    <div className="rounded-[0.4rem] border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Travel Context</p>
                                        <p className="text-sm leading-7 text-muted-foreground">{drivingContext}. {locationInsights.travelNote}</p>
                                    </div>
                                    <div className="rounded-[0.4rem] border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Local Insight</p>
                                        <p className="text-sm leading-7 text-muted-foreground">{locationInsights.characteristic}</p>
                                    </div>
                                    <div className="rounded-[0.4rem] border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Typical Clients</p>
                                        <p className="text-sm leading-7 text-muted-foreground">{locationInsights.clientProfile}</p>
                                    </div>
                                </div>
                            </div>

                            <aside className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.35)]">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 flex-shrink-0 text-gold" />
                                    <div>
                                        <p className="mb-1 font-semibold text-foreground">Visit Galeo Beauty</p>
                                        <p className="text-sm leading-7 text-muted-foreground">
                                            {businessInfo.address.street}<br />
                                            {businessInfo.address.area}<br />
                                            {businessInfo.address.city}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-border pt-5">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={`/locations/${locationSlug}`}
                                            className="rounded-[0.35rem] bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-white"
                                        >
                                            {location.name} Hub
                                        </Link>
                                        {category && (
                                            <Link
                                                href={`/prices/${category.id}/${service.slug}`}
                                                className="rounded-[0.35rem] bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-white"
                                            >
                                                Main Service Page
                                            </Link>
                                        )}
                                        {category && (
                                            <Link
                                                href={`/prices/${category.id}`}
                                                className="rounded-[0.35rem] bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-white"
                                            >
                                                More {category.title}
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-border pt-5">
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-6 w-6 flex-shrink-0 text-gold" />
                                        <div>
                                            <p className="mb-1 font-semibold text-foreground">Call or WhatsApp</p>
                                            <TrackedExternalLink
                                                href={`tel:${businessInfo.phone}`}
                                                trackingContext={`location_service_phone_${location.slug}_${resolvedService.slug}`}
                                                linkType="phone"
                                                linkLabel="Location service phone"
                                                className="text-gold hover:underline"
                                            >
                                                012 111 1730
                                            </TrackedExternalLink>
                                            <span className="mx-2 text-muted-foreground">|</span>
                                            <TrackedWhatsAppLink
                                                message={whatsappMessage}
                                                trackingContext={`location_service_contact_${location.slug}_${resolvedService.slug}`}
                                                className="text-gold hover:underline"
                                            >
                                                {businessInfo.cell}
                                            </TrackedWhatsAppLink>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Button asChild className="rounded-[0.35rem] bg-gold text-foreground hover:bg-gold-dark">
                                            <TrackedWhatsAppLink
                                                message={whatsappMessage}
                                                trackingContext={`location_service_local_fit_${location.slug}_${resolvedService.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Ask on WhatsApp
                                            </TrackedWhatsAppLink>
                                        </Button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* Related Services - Same Category */}
                {relatedServices.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                            <LocationSectionHeading
                                title={`More ${category?.title} Services`}
                                description={`Other ${category?.title.toLowerCase()} treatments people from ${location.name} often browse.`}
                                centered={false}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedServices.map((relatedService) => (
                                    <Link
                                        key={relatedService.slug}
                                        href={buildCurrentLocationServiceHref(relatedService.slug, relatedService.categoryId)}
                                        className="group rounded-[0.4rem] border border-border/60 bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-gold/40 hover:-translate-y-0.5"
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
                                    <Button asChild variant="outline" className="rounded-[0.35rem]">
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

                {/* Nearby Areas - Location internal linking */}
                {nearbyLocations.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                            <LocationSectionHeading
                                title={`${service.keyword} Near Other Areas`}
                                description="We also welcome clients travelling in from these nearby areas."
                                centered={false}
                            />

                            <div className="flex flex-wrap gap-3">
                                {nearbyLocations.map((nearbyLoc) => (
                                    <Link
                                        key={nearbyLoc.slug}
                                        href={buildNearbyAreaHref(nearbyLoc.slug, serviceSlug)}
                                        className="rounded-[0.35rem] border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
                                    >
                                        {nearbyLoc.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ Section - Service-specific questions */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                        <LocationSectionHeading
                            title="FAQs"
                            description={`Common questions about ${service.keyword} in ${location.name}`}
                        />

                        <div className="space-y-6">
                            {faqs.map((faq: FAQ, index: number) => (
                                <div key={index} className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
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
                            <Button asChild className="bg-gold hover:bg-gold-dark rounded-[0.35rem] text-foreground">
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
                        <div className="relative overflow-hidden rounded-[0.45rem] border border-[#2b2b2f] bg-[#171719] px-6 py-10 text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.65)] sm:px-8 lg:px-12 lg:py-14">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                            <div className="absolute -top-20 right-[-4rem] h-48 w-48 rounded-[0.4rem] bg-gold/10 blur-3xl" />
                            <div className="absolute -bottom-24 left-[-3rem] h-52 w-52 rounded-[0.4rem] bg-white/5 blur-3xl" />

                            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.85fr)] lg:items-end">
                                <div>
                                    <span className="inline-flex items-center rounded-[0.35rem] border border-gold/30 bg-gold/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold/90">
                                        Book With Confidence
                                    </span>
                                    <h2 className="mt-5 max-w-2xl font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.9rem]">
                                        Ready for your <span className="text-gold">{service.keyword}</span> near {location.name}?
                                    </h2>
                                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
                                        We make it easy for {location.name} clients to book, plan travel time, and get clear
                                        guidance before the appointment so the whole visit feels smooth from start to finish.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                                        <span className="rounded-[0.35rem] border border-white/10 bg-white/5 px-4 py-2">
                                            Quick WhatsApp booking
                                        </span>
                                        <span className="rounded-[0.35rem] border border-white/10 bg-white/5 px-4 py-2">
                                            Clear treatment advice
                                        </span>
                                        <span className="rounded-[0.35rem] border border-white/10 bg-white/5 px-4 py-2">
                                            Easy trip planning from {location.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-[0.4rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm sm:p-6">
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
                                            className="h-12 rounded-[0.35rem] bg-gold px-6 text-white hover:bg-gold-dark"
                                        />
                                        <Button
                                            asChild
                                            size="lg"
                                            className="h-12 rounded-[0.35rem] border border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
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
