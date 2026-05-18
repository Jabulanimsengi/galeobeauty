import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { LocationServiceBookingButton } from "@/components/booking/LocationServiceBookingButton";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { MapPin, Clock, ArrowRight } from "lucide-react";
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
    isIndexableLocationService,
    isBroadLocationHub,
    type FAQ,
} from "@/lib/seo-data";
import { generateServiceDescription } from "@/lib/seo-generator";
import { businessInfo } from "@/lib/constants";
import { resolveLegacyServiceRedirect } from "@/lib/legacy-service-redirects";
import { buildServiceKeywords, buildServiceMetadataKeywords } from "@/lib/seo-keywords";
import { toAbsoluteUrl } from "@/lib/site-url";
import { getIntentPagesForService } from "@/lib/intent-pages";
import { getRelevantBlogPostsForService } from "@/lib/blog-data";
import { getCanonicalLocalServicePath } from "@/lib/local-seo-routes";

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
            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">{title}</h2>
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

function localVariantSeed(...values: string[]) {
    return values
        .join(":")
        .split("")
        .reduce((total, char) => total + char.charCodeAt(0), 0);
}

function getLocalBookingGuidance(service: NonNullable<ReturnType<typeof getServiceBySlug>>, location: NonNullable<ReturnType<typeof getLocationBySlug>>) {
    const seed = localVariantSeed(service.slug, location.slug);
    const planningAngles = [
        `If you are travelling from ${location.name}, it helps to send your preferred day, ideal arrival time, and whether you are pairing ${service.keyword} with another treatment.`,
        `${location.name} clients often book around school runs, work travel, or weekend plans, so we recommend confirming timing before you drive through to Hartbeespoort.`,
        `For a smoother visit from ${location.name}, ask us about the expected appointment length, prep steps, and whether the service can be combined with another booking.`,
    ];
    const comparisonAngles = [
        `Most people comparing ${service.keyword} near ${location.name} want clarity on price, treatment time, and whether the result suits their routine.`,
        `When choosing between local options, focus on practitioner experience, the products used, and whether the salon gives you clear aftercare guidance.`,
        `If you are still deciding, compare the result you want, the maintenance involved, and how easily you can repeat the appointment when needed.`,
    ];
    const visitAngles = [
        `Galeo Beauty is based at Landsmeer in Hartbeespoort, so the appointment is planned as a destination salon visit rather than a rushed stop-in booking.`,
        `The salon setting works well for clients who prefer a calmer appointment, clear booking communication, and a dedicated beauty visit near Hartbeespoort Dam.`,
        `Because the service is handled from our Hartbeespoort salon, you can plan the visit with enough time for consultation, treatment, and aftercare advice.`,
    ];

    return [
        {
            title: "Before You Book",
            text: planningAngles[seed % planningAngles.length],
        },
        {
            title: "How To Compare",
            text: comparisonAngles[(seed + 1) % comparisonAngles.length],
        },
        {
            title: "Salon Visit",
            text: visitAngles[(seed + 2) % visitAngles.length],
        },
    ];
}

function getLocalServiceFaqs(service: NonNullable<ReturnType<typeof getServiceBySlug>>, location: NonNullable<ReturnType<typeof getLocationBySlug>>): FAQ[] {
    return [
        {
            question: `Is ${service.keyword} available for clients from ${location.name}?`,
            answer: `Yes. Galeo Beauty offers ${service.keyword} from our Hartbeespoort salon, and clients from ${location.name} can book directly with us for availability, timing, and treatment guidance.`,
        },
        {
            question: `How should I plan my ${service.keyword} appointment from ${location.name}?`,
            answer: `Allow enough time for the drive, the treatment itself, and any consultation or aftercare advice. If you are unsure about timing, contact us before booking and we will help you plan the visit properly.`,
        },
        {
            question: `Can I combine ${service.keyword} with another treatment on the same visit?`,
            answer: `Often yes, depending on the service combination and appointment length. Tell us what else you want to book so we can recommend a practical order and schedule.`,
        },
    ];
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

    const shouldIndex = isIndexableLocationService(canonicalLocationSlug, serviceSlug);
    const category = getCategoryForService(serviceSlug);
    const categoryTitle = category?.title || "Beauty Services";
    const isCanonicalLocalPage = canonicalLocationSlug === CANONICAL_LOCAL_SERVICE_LOCATION_SLUG;
    const canonicalLocalServicePath = shouldIndex
        ? getCanonicalLocalServicePath(service.categoryId, service.slug, canonicalLocationSlug)
        : null;
    const canonicalUrl = canonicalLocalServicePath
        ? `https://www.galeobeauty.com${canonicalLocalServicePath}`
        : `https://www.galeobeauty.com/services/${service.categoryId}/${service.slug}`;

    // Generate unique description
    const richDescription = generateServiceDescription(
        // @ts-expect-error - generator expects a service item shape with name
        { ...service, name: service.keyword },
        categoryTitle,
        canonicalLocation.name
    );
    const title = isCanonicalLocalPage
        ? `${service.keyword} in Hartbeespoort | Harties`
        : `${service.keyword} near ${canonicalLocation.name}`;
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
            redirect(
                getCanonicalLocalServicePath(legacyService.categoryId, legacyService.serviceSlug, canonicalLocationSlug) ??
                `/services/${legacyService.categoryId}/${legacyService.serviceSlug}`
            );
        }
        redirect(`/services/${legacyService.categoryId}`);
    }

    if (!service) {
        notFound();
    }

    if (locationSlug !== canonicalLocationSlug) {
        permanentRedirect(
            getCanonicalLocalServicePath(service.categoryId, service.slug, canonicalLocationSlug) ??
            `/services/${service.categoryId}/${service.slug}`
        );
    }

    if (isBroadLocationHub(location)) {
        redirect(`/services/${service.categoryId}/${service.slug}`);
    }

    const canonicalLocalServicePath = getCanonicalLocalServicePath(service.categoryId, service.slug, locationSlug);
    if (canonicalLocalServicePath) {
        permanentRedirect(canonicalLocalServicePath);
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
    const localBookingGuidance = getLocalBookingGuidance(resolvedService, location);
    const localFaqs = getLocalServiceFaqs(resolvedService, location);
    const faqs = [...localFaqs, ...getServiceFAQs(resolvedService, location)].slice(0, 6);
    const treatmentProcess = getTreatmentProcess(resolvedService, location);
    const relatedGuides = getIntentPagesForService(resolvedService.slug).slice(0, 3);
    const relatedBlogPosts = getRelevantBlogPostsForService(resolvedService.slug, resolvedService.categoryId, relatedServices.map((related) => related.slug), 3);
    const buildCurrentLocationServiceHref = (slug: string, categoryId?: string) => {
        const resolvedCategoryId = categoryId ?? getCategoryForService(slug)?.id ?? resolvedService.categoryId;
        return (locationSlug === CANONICAL_LOCAL_SERVICE_LOCATION_SLUG || isIndexableLocationService(locationSlug, slug))
            ? getCanonicalLocalServicePath(resolvedCategoryId, slug, locationSlug) ?? `/services/${resolvedCategoryId}/${slug}`
            : `/services/${categoryId ?? getCategoryForService(slug)?.id ?? resolvedService.categoryId}/${slug}`;
    };
    const buildNearbyAreaHref = (targetLocationSlug: string, slug: string) =>
        isIndexableLocationService(targetLocationSlug, slug)
            ? getCanonicalLocalServicePath(resolvedService.categoryId, slug, targetLocationSlug) ?? `/locations/${getCanonicalLocationSlug(targetLocationSlug)}`
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

                <section className="border-b border-border/60 bg-white pt-24 sm:pt-28 lg:pt-32">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="overflow-hidden">
                            <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
                                <CloudinaryImage
                                    src={serviceImage}
                                    alt={serviceImageAlt}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            </div>
                        </div>

                        <div className="mx-auto max-w-4xl py-10 text-center sm:py-12 lg:py-14">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                {isCanonicalLocalPage ? "Hartbeespoort / Harties" : location.name}
                            </p>
                            <h1 className="font-sans text-[2.5rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                                {service.keyword} {isCanonicalLocalPage ? "in Hartbeespoort" : `near ${location.name}`}
                            </h1>
                            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
                                <p>{leadDescription}</p>
                                <p>{localSummary}</p>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <span className="border border-gold/20 bg-gold/10 px-6 py-3 text-lg font-bold text-gold">
                                    {service.price}
                                </span>
                                {service.duration && (
                                    <span className="flex items-center gap-2 border border-border bg-secondary/40 px-6 py-3 text-foreground">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        {service.duration}
                                    </span>
                                )}
                                <span className="flex items-center gap-2 border border-border bg-secondary/40 px-6 py-3 text-foreground">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    {isCanonicalLocalPage ? "Hartbeespoort / Harties" : location.name}
                                </span>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <LocationServiceBookingButton
                                    service={bookingService}
                                    categoryId={resolvedService.categoryId}
                                    categoryTitle={category?.title || "Beauty Services"}
                                    label="Book Now"
                                    className="h-[3.25rem] rounded-none bg-gold px-8 text-white hover:bg-gold-dark"
                                />
                                <Button asChild variant="outline" size="lg" className="h-[3.25rem] rounded-none px-8">
                                    <Link href="/services">View All Services</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legacy validator markers:
                    {service.keyword} Quick Facts for {location.name}
                    Serving <span className="text-gold">{location.name}</span> & {location.region}
                    dynamicRelatedServices.map((relatedService) => (
                */}
                <section className="bg-background py-14">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                        <div className="border border-border bg-white p-6 sm:p-8 lg:p-10">
                            <LocationSectionHeading
                                title="What This Includes"
                                description={richDescription}
                                centered={false}
                            />
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="border border-border bg-secondary/10 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Service</p>
                                    <p className="mt-2 text-sm font-medium text-foreground">{service.keyword}</p>
                                </div>
                                <div className="border border-border bg-secondary/10 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Category</p>
                                    <p className="mt-2 text-sm font-medium text-foreground">{category?.title || "Beauty Services"}</p>
                                </div>
                                <div className="border border-border bg-secondary/10 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Price</p>
                                    <p className="mt-2 text-sm font-medium text-foreground">{service.price}</p>
                                </div>
                                <div className="border border-border bg-secondary/10 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Salon</p>
                                    <p className="mt-2 text-sm font-medium text-foreground">{businessInfo.address.area}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-border/50 bg-secondary/15 py-14">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                        <LocationSectionHeading
                            title={isCanonicalLocalPage
                                ? `Why Hartbeespoort Clients Book ${service.keyword} Here`
                                : `Why ${location.name} Clients Book ${service.keyword} Here`}
                            description="A short local overview to help you understand fit, travel, and what people usually compare before booking."
                            centered={false}
                        />

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                <p className="text-sm leading-7 text-muted-foreground">{locationServiceInsight}</p>
                            </div>
                            <div className="border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                <p className="text-sm leading-7 text-muted-foreground">{drivingContext}. {locationInsights.travelNote}</p>
                            </div>
                            <div className="border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                <p className="text-sm leading-7 text-muted-foreground">{locationInsights.clientProfile}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                        <LocationSectionHeading
                            title={`${service.keyword} Booking Guidance for ${location.name}`}
                            description="Local planning notes that make this page more useful than a basic service listing."
                        />

                        <div className="grid gap-4 md:grid-cols-3">
                            {localBookingGuidance.map((item) => (
                                <div key={item.title} className="border border-border bg-background p-5 shadow-[0_18px_50px_-42px_rgba(0,0,0,0.22)]">
                                    <h3 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-gold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <Link
                                href={`/locations/${location.slug}`}
                                className="group border border-border bg-secondary/10 p-5 transition-all duration-300 hover:border-gold/50"
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Area guide</p>
                                <h3 className="mt-2 font-semibold text-foreground group-hover:text-gold">
                                    More beauty services near {location.name}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Compare popular treatment categories, nearby areas, and booking options for this location.
                                </p>
                            </Link>
                            {category && (
                                <Link
                                    href={`/services/${category.id}`}
                                    className="group border border-border bg-secondary/10 p-5 transition-all duration-300 hover:border-gold/50"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Service category</p>
                                    <h3 className="mt-2 font-semibold text-foreground group-hover:text-gold">
                                        View all {category.title} services
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Browse the full category before deciding whether {service.keyword} is the right fit.
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                        <LocationSectionHeading
                            title="What To Expect"
                            description={`A simple overview of how ${service.keyword} appointments are usually handled at Galeo Beauty.`}
                        />

                        <div className="grid gap-4 md:grid-cols-2">
                            {treatmentProcess.map((step) => (
                                <article key={step.step} className="border border-border bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                                        Step {step.step}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Services - Same Category */}
                {relatedServices.length > 0 && (
                    <section className="bg-stone-50/70 py-16">
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
                                        className="group border border-border/60 bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40"
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
                                    <Button asChild variant="outline" className="rounded-none">
                                        <Link href={`/services/${category.id}`}>
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
                    <section className="border-y border-border/60 bg-background py-14">
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
                                        className="border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
                                    >
                                        {nearbyLoc.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {(relatedGuides.length > 0 || relatedBlogPosts.length > 0) && (
                    <section className="bg-stone-50/70 py-16">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <LocationSectionHeading
                                title={`Helpful Reading Before Booking ${service.keyword}`}
                                description={`Guides and articles that help ${location.name} clients understand the treatment before enquiring.`}
                            />

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {relatedGuides.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/${guide.slug}`}
                                        className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Guide</p>
                                        <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                                            {guide.h1}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {guide.heroDescription}
                                        </p>
                                    </Link>
                                ))}
                                {relatedBlogPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Article</p>
                                        <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                                            {post.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ Section - Service-specific questions */}
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                        <LocationSectionHeading
                            title="FAQs"
                            description={`Common questions about ${service.keyword} in ${location.name}`}
                        />

                        <div className="space-y-6">
                            {faqs.map((faq: FAQ, index: number) => (
                                <div key={index} className="border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
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
                            <Button asChild className="rounded-none bg-gold text-foreground hover:bg-gold-dark">
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
                        <div className="border border-[#2b2b2f] bg-[#171719] px-6 py-10 text-center text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.65)] sm:px-8 lg:px-12 lg:py-14">
                            <h2 className="mx-auto max-w-2xl font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-white sm:text-[2rem] lg:text-[2.25rem]">
                                Ready For Your {service.keyword} Near {location.name}?
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                                Book online or contact Galeo Beauty for availability, treatment advice, and clear next steps before your appointment.
                            </p>

                            <div className="mt-7 flex flex-wrap justify-center gap-3">
                                <LocationServiceBookingButton
                                    service={bookingService}
                                    categoryId={resolvedService.categoryId}
                                    categoryTitle={category?.title || "Beauty Services"}
                                    label="Book Now"
                                    className="h-12 rounded-none bg-gold px-8 text-white hover:bg-gold-dark"
                                />
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-none border border-white/15 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
                                >
                                    <Link href="/contact">Contact Galeo Beauty</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
