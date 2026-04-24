import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    getCanonicalLocationSlug,
    getLocationBySlug,
    getDrivingContext,
    getPrebuildLocationHubParams,
    getLocationInsights,
    getLocationClusterLinks,
    getLocationPopularTreatmentGroups,
    isBroadLocationHub,
    type SEOLocation,
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";
import { CheckCircle, ArrowRight, MapPin } from "lucide-react";
import { buildLocationHubKeywords } from "@/lib/seo-keywords";
import { serviceCategories } from "@/lib/services-data";

function getBroadHubCopy(location: SEOLocation) {
    if (location.slug === "south-africa") {
        return {
            eyebrow: "South Africa",
            title: "Beauty Services for Clients Across South Africa",
            metadataDescription:
                "Explore Galeo Beauty for clients travelling from across South Africa, with popular destinations, premium beauty treatments, and reasons to book around a Hartbeespoort visit.",
            heroDescription:
                "Galeo Beauty welcomes destination beauty bookings from across South Africa. Explore the places clients travel from most often and the treatments they usually book around a Hartbeespoort visit.",
            coverageHeading: "Places our clients travel from across South Africa",
            coverageDescription:
                "Start with the provinces and towns clients most often search before booking their Hartbeespoort appointment.",
            servicesHeading: "Popular Galeo Beauty services for South African clients",
            servicesDescription:
                "These are the treatments most often researched before clients plan a destination beauty visit to Hartbeespoort.",
            whyTitle: "Why South African Clients Choose Galeo Beauty",
            worthTitle: "A Destination Worth Planning",
            worthDescription:
                "A premium Hartbeespoort salon experience with treatment quality, pricing clarity, and enough value to justify a planned trip.",
            expertDescription:
                "Clients travelling in from across South Africa usually want trusted treatment standards, polished execution, and a calmer environment than busier metro salons or clinics.",
            luxuryDescription:
                "Many national bookings are paired with weekends away, event prep, or dedicated self-care days built around the Hartbeespoort experience.",
        };
    }

    if (location.slug === "north-west") {
        return {
            eyebrow: "North West",
            title: "Beauty Services for North West Clients",
            metadataDescription:
                "Explore Galeo Beauty for North West clients, including nearby estates, commuter towns, and premium beauty treatments for planned and repeat visits.",
            heroDescription:
                "Explore the North West towns, estates, and nearby areas most likely to book with Galeo Beauty, along with the treatments clients regularly plan around Hartbeespoort visits.",
            coverageHeading: "North West areas we regularly serve",
            coverageDescription:
                "See the North West places clients search most often when deciding where to book with Galeo Beauty.",
            servicesHeading: "Popular beauty services for North West clients",
            servicesDescription:
                "These are some of the treatments North West clients most often research when comparing local convenience with Hartbeespoort quality.",
            whyTitle: "Why North West Clients Choose Galeo Beauty",
            worthTitle: "Easy Access to Hartbeespoort",
            worthDescription:
                "North West clients can plan repeat visits, maintenance bookings, and premium treatments without defaulting to larger Gauteng salon corridors.",
            expertDescription:
                "Clients from North West usually want treatment quality, easier travel planning, and a setting that feels more relaxed than a high-traffic metro salon.",
            luxuryDescription:
                "For many North West clients, Galeo Beauty balances local convenience with a destination feel, making appointments easier to combine with daily life or weekends around Hartbeespoort.",
        };
    }

    return {
        eyebrow: "Gauteng",
        title: "Beauty Services for Gauteng Clients",
        metadataDescription:
            "Explore Galeo Beauty for Gauteng clients, including metro commuter routes, nearby areas, and premium beauty treatments for planned visits.",
        heroDescription:
            "Explore the Gauteng metros and nearby areas that most often book with Galeo Beauty, together with the treatments clients regularly plan around Hartbeespoort visits.",
        coverageHeading: "Key Gauteng areas we serve",
        coverageDescription:
            "See the Gauteng areas clients most often search when deciding whether to book in Hartbeespoort.",
        servicesHeading: "Popular beauty services for Gauteng clients",
        servicesDescription:
            "These are the services Gauteng clients most often research before choosing a Hartbeespoort salon visit over a standard in-city appointment.",
        whyTitle: "Why Gauteng Clients Choose Galeo Beauty",
        worthTitle: "Worth Leaving the City For",
        worthDescription:
            "Galeo Beauty gives Gauteng clients a calmer Hartbeespoort salon setting, premium treatment mix, and a booking experience that feels planned rather than rushed.",
        expertDescription:
            "Clients from Johannesburg, Pretoria, Centurion, Midrand, the East Rand, Sedibeng, and the West Rand usually want visible quality and confidence before they commit to the trip.",
        luxuryDescription:
            "Many Gauteng bookings are built around weekends, events, or planned self-care days, making Hartbeespoort a practical destination rather than just another suburb stop.",
    };
}

function getLocationHeroContent(
    location: SEOLocation,
    nearbyAreas: ReturnType<typeof getLocationClusterLinks>,
    popularTreatmentGroups: ReturnType<typeof getLocationPopularTreatmentGroups>,
    drivingContext: string
) {
    const nearbyLabel = nearbyAreas.slice(0, 3).map((area) => area.name).join(", ");
    const popularLabel = popularTreatmentGroups.slice(0, 3).map((group) => group.title).join(", ");

    const fallback = {
        eyebrow: `Serving ${location.region}`,
        description: `${drivingContext}. ${location.name} residents choose Galeo Beauty for premium treatments, easier planning, and a calmer visit than a busy in-city appointment.`,
        highlights: [
            {
                label: "Nearby searches",
                text: nearbyLabel || `Clients also compare nearby areas around ${location.name}.`,
            },
            {
                label: "Often booked",
                text: popularLabel || "Nails, facials, injectables, and beauty maintenance appointments.",
            },
            {
                label: "Why clients choose us",
                text: "Clear pricing, polished treatments, and a more considered salon visit.",
            },
        ],
    };

    switch (location.slug) {
        case "hartbeespoort":
            return {
                eyebrow: "Hartbeespoort / Harties",
                description: "For Hartbeespoort and Harties clients, Galeo Beauty offers a polished local option for regular maintenance, beauty prep, and weekend-ready appointments around the dam.",
                highlights: [
                    {
                        label: "Nearby areas",
                        text: nearbyLabel || "Melodie, Meerhof, Schoemansville, Ifafi, and nearby dam areas.",
                    },
                    {
                        label: "Most searched here",
                        text: popularLabel || "Hair, nails, facials, and beauty treatments booked close to home.",
                    },
                    {
                        label: "Why it suits this area",
                        text: "Easy to fit into a relaxed local day without needing a long city trip.",
                    },
                ],
            };
        case "pretoria":
            return {
                eyebrow: "Pretoria",
                description: "Pretoria clients often choose Galeo Beauty when they want a calmer setting, premium treatment mix, and a salon visit that feels more intentional than a quick city stop.",
                highlights: [
                    {
                        label: "Common nearby searches",
                        text: nearbyLabel || "Pretoria East, Pretoria North, Lynnwood, and nearby Pretoria areas.",
                    },
                    {
                        label: "Popular choices",
                        text: popularLabel || "Injectables, facials, nails, and event-ready beauty appointments.",
                    },
                    {
                        label: "Why it works",
                        text: "A good fit for planned visits when treatment quality matters more than staying in traffic.",
                    },
                ],
            };
        case "centurion":
            return {
                eyebrow: "Centurion",
                description: "Centurion clients often book with Galeo Beauty for treatments they want to plan properly, especially when they are balancing convenience, quality, and a more relaxed setting.",
                highlights: [
                    {
                        label: "Nearby searches",
                        text: nearbyLabel || "Midstream, Rooihuiskraal, Eldoraigne, and nearby Centurion areas.",
                    },
                    {
                        label: "Often booked",
                        text: popularLabel || "Hair, facials, lash treatments, and regular beauty maintenance.",
                    },
                    {
                        label: "Why it works",
                        text: "Ideal for a more polished visit that still feels accessible from Centurion.",
                    },
                ],
            };
        case "johannesburg":
            return {
                eyebrow: "Johannesburg",
                description: "Johannesburg clients often choose Galeo Beauty when they want to trade city rush for a calmer appointment, clearer planning, and treatments worth making time for.",
                highlights: [
                    {
                        label: "Common nearby searches",
                        text: nearbyLabel || "Rosebank, Sandton, Bryanston, and other Johannesburg areas.",
                    },
                    {
                        label: "Popular choices",
                        text: popularLabel || "Facials, injectables, lashes, and beauty appointments planned in advance.",
                    },
                    {
                        label: "Why it works",
                        text: "A strong option when you want the visit to feel like a planned reset, not a rushed errand.",
                    },
                ],
            };
        default:
            return fallback;
    }
}

// Pre-build a deterministic nearby-location hub set.
export const dynamicParams = true;

export function generateStaticParams() {
    if (process.env.NODE_ENV === "development") return [];
    return getPrebuildLocationHubParams();
}

interface PageProps {
    params: Promise<{
        location: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: locationSlug } = await params;
    const canonicalLocationSlug = getCanonicalLocationSlug(locationSlug);
    const location = getLocationBySlug(canonicalLocationSlug);

    if (!location) {
        notFound();
    }

    const relatedAreas = getLocationClusterLinks(canonicalLocationSlug, 4);
    const relatedAreaLabel = relatedAreas.map((area) => area.name).join(", ");
    const broadHub = isBroadLocationHub(location);
    const broadHubCopy = broadHub ? getBroadHubCopy(location) : undefined;
    const title = broadHub ? broadHubCopy!.title : `Beauty Services in ${location.name}`;
    const description = broadHub
        ? broadHubCopy!.metadataDescription
        : relatedAreaLabel.length > 0
            ? `Professional beauty treatments for ${location.name} residents and nearby areas like ${relatedAreaLabel}. Facials, injectables, nails, body treatments and more from our Hartbeespoort salon.`
            : `Professional beauty treatments for ${location.name} residents. Facials, lash extensions, nails, fat freezing, permanent makeup & more at our Hartbeespoort salon near ${location.region}.`;

    return {
        title,
        description,
        keywords: buildLocationHubKeywords(location),
        alternates: {
            canonical: `https://www.galeobeauty.com/locations/${canonicalLocationSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.galeobeauty.com/locations/${canonicalLocationSlug}`,
            type: "website",
            siteName: "Galeo Beauty",
            locale: "en_ZA",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function LocationHubPage({ params }: PageProps) {
    const { location: locationSlug } = await params;
    const location = getLocationBySlug(locationSlug);

    if (!location) {
        notFound();
    }

    const canonicalLocationSlug = getCanonicalLocationSlug(locationSlug);
    if (locationSlug !== canonicalLocationSlug) {
        permanentRedirect(`/locations/${canonicalLocationSlug}`);
    }

    const drivingContext = getDrivingContext(location);
    const locationInsights = getLocationInsights(location);
    const nearbyAreas = getLocationClusterLinks(canonicalLocationSlug, 12);
    const popularTreatmentGroups = getLocationPopularTreatmentGroups(location);
    const broadHub = isBroadLocationHub(location);
    const broadHubCopy = broadHub ? getBroadHubCopy(location) : undefined;
    const heroContent = broadHub
        ? null
        : getLocationHeroContent(location, nearbyAreas, popularTreatmentGroups, drivingContext);

    // JSON-LD Structured Data
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: `Galeo Beauty - Serving ${location.name}`,
        description: broadHub
            ? broadHubCopy!.metadataDescription
            : `Professional beauty treatments for ${location.name} residents. Facials, lash extensions, nails, fat freezing, permanent makeup & more at our Hartbeespoort salon.`,
        image: "https://www.galeobeauty.com/images/logo.png",
        priceRange: "$$",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "159",
            bestRating: "5",
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
        areaServed: {
            "@type": location.slug === "south-africa" ? "Country" : "Place",
            name: location.name,
            ...(location.slug !== "south-africa"
                ? { containedInPlace: { "@type": "AdministrativeArea", name: location.region } }
                : {}),
        },
        openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
        ],
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.galeobeauty.com" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.galeobeauty.com/locations" },
            { "@type": "ListItem", position: 3, name: location.name, item: `https://www.galeobeauty.com/locations/${locationSlug}` },
        ],
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema]) }}
            />
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-secondary/20 px-6 pb-16 pt-32 lg:pb-24 lg:pt-40">
                    <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
                    {broadHub ? (
                        <div className="container mx-auto max-w-5xl text-center">
                            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                {broadHubCopy!.eyebrow}
                            </span>
                            <h1 className="mb-6 font-sans text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                {broadHubCopy!.title}
                            </h1>
                            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                                {broadHubCopy!.heroDescription}
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button asChild size="lg" className="rounded-[0.35rem] bg-gold px-8 text-white hover:bg-gold-dark">
                                    <Link href="/contact">
                                        Visit Us
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="container mx-auto max-w-6xl">
                            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-start">
                                <div className="max-w-4xl">
                                    <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                        {heroContent!.eyebrow}
                                    </span>
                                    <h1 className="mb-6 font-sans text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                        Beauty Services for <span className="text-gold">{location.name}</span>
                                    </h1>
                                    <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                                        {heroContent!.description}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Button asChild size="lg" className="rounded-[0.35rem] bg-gold px-8 text-white hover:bg-gold-dark">
                                            <Link href="/contact">
                                                Visit Us
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg" className="rounded-[0.35rem] px-8">
                                            <Link href="/prices">
                                                View Services
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                <aside className="border border-border/60 bg-background/90 p-5 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.32)]">
                                    <div className="space-y-4">
                                        {heroContent!.highlights.map((item) => (
                                            <div key={item.label} className="border border-border/70 bg-secondary/10 p-4">
                                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold/85">
                                                    {item.label}
                                                </p>
                                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </aside>
                            </div>
                        </div>
                    )}
                </section>

                {nearbyAreas.length > 0 && (
                    <section className="py-14 border-y border-border/60 bg-background">
                        <div className="container mx-auto max-w-5xl px-6">
                            <div className="max-w-3xl">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    {broadHub ? "Nearby Places" : `Near ${location.name}`}
                                </span>
                                <h2 className="mt-3 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                                    {broadHub ? broadHubCopy!.coverageHeading : `Nearby places to consider around ${location.name}`}
                                </h2>
                                <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                    {broadHub
                                        ? broadHubCopy!.coverageDescription
                                        : (
                                            <>
                                                If you are comparing nearby areas before you book, these location pages can help you find
                                                the one that fits your area best.
                                            </>
                                        )}
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {nearbyAreas.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={`/locations/${area.slug}`}
                                        className="rounded-[0.35rem] border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:bg-background hover:text-gold"
                                    >
                                        {area.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-16 bg-background">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="rounded-[0.4rem] border border-border bg-secondary/10 p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.22)]">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    About {location.name}
                                </span>
                                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                    {locationInsights.characteristic}
                                </p>
                            </div>
                            <div className="rounded-[0.4rem] border border-border bg-secondary/10 p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.22)]">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    What People Usually Book
                                </span>
                                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                    {locationInsights.clientProfile}
                                </p>
                            </div>
                            <div className="rounded-[0.4rem] border border-border bg-secondary/10 p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.22)]">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Getting Here
                                </span>
                                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                    {locationInsights.travelNote}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {popularTreatmentGroups.length > 0 && (
                    <section className="py-16 bg-stone-50/70">
                        <div className="container mx-auto max-w-5xl px-6">
                            <div className="max-w-3xl">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Popular Services
                                </span>
                                <h2 className="mt-3 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                                    {broadHub ? broadHubCopy!.servicesHeading : `Popular beauty services near ${location.name}`}
                                </h2>
                                <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                    {broadHub
                                        ? broadHubCopy!.servicesDescription
                                        : (
                                            <>
                                                These grouped links highlight the treatments people most often look for around{" "}
                                                {location.name}, from nails and hair extensions to facial treatments, eyelash
                                                extensions, and hair smoothing.
                                            </>
                                        )}
                                </p>
                            </div>

                            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {popularTreatmentGroups.map((group) => (
                                    <article
                                        key={group.id}
                                        className="rounded-[0.4rem] border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_22px_60px_-38px_rgba(0,0,0,0.32)]"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                                                    {group.title}
                                                </p>
                                                <h3 className="mt-2 text-lg font-semibold text-foreground">
                                                    {group.headline}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                            {group.description}
                                        </p>

                                        <div className="mt-5 space-y-2">
                                            {group.services.map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    href={broadHub ? `/prices/${service.categoryId}/${service.slug}` : `/locations/${canonicalLocationSlug}/${service.slug}`}
                                                    className="group flex items-center justify-between gap-4 rounded-[0.35rem] border border-border/70 bg-secondary/10 px-4 py-3 text-sm transition-colors hover:border-gold/30 hover:bg-secondary/20"
                                                >
                                                    <div>
                                                        <p className="font-medium text-foreground group-hover:text-gold">
                                                            {service.keyword}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {service.price}
                                                            {service.duration ? ` | ${service.duration}` : ""}
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
                                                </Link>
                                            ))}
                                        </div>

                                        <Link
                                            href={group.categoryHref}
                                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-gold"
                                        >
                                            {group.categoryLabel}
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-16 bg-background border-y border-border/60">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="max-w-3xl">
                            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                More Services
                            </span>
                                <h2 className="mt-3 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                                    {broadHub ? "See all treatment categories" : `Looking for something else near ${location.name}?`}
                                </h2>
                            <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                {broadHub
                                    ? "Choose a category below to compare treatments, prices, and service details."
                                    : "Choose a category below to compare treatments, prices, and service details."}
                            </p>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {serviceCategories.map((category) => {
                                const examples = category.subcategories
                                    .flatMap((subcategory) => subcategory.items.map((item) => item.name))
                                    .slice(0, 3)
                                    .join(", ");

                                return (
                                    <Link
                                        key={category.id}
                                        href={`/prices/${category.id}`}
                                        className="rounded-[0.4rem] border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_22px_60px_-38px_rgba(0,0,0,0.32)]"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                                                    {category.title}
                                                </p>
                                                <h3 className="mt-2 text-lg font-semibold text-foreground">
                                                    {category.title}
                                                </h3>
                                            </div>
                                            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors hover:text-gold" />
                                        </div>

                                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                            {examples}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="mb-12 font-sans text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                            {broadHub ? broadHubCopy!.whyTitle : `Why ${location.name} clients choose Galeo Beauty`}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="rounded-[0.4rem] border border-white/10 bg-white/5 p-6">
                                <MapPin className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">{broadHub ? broadHubCopy!.worthTitle : "Easy To Plan"}</h3>
                                <p className="text-sm text-white/70">
                                    {broadHub ? broadHubCopy!.worthDescription : `${drivingContext} and easy to pair with a day out in Hartbeespoort.`}
                                </p>
                            </div>
                            <div className="rounded-[0.4rem] border border-white/10 bg-white/5 p-6">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Experienced Care</h3>
                                <p className="text-sm text-white/70">{broadHub ? broadHubCopy!.expertDescription : locationInsights.clientProfile}</p>
                            </div>
                            <div className="rounded-[0.4rem] border border-white/10 bg-white/5 p-6">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">A Relaxed Visit</h3>
                                <p className="text-sm text-white/70">{broadHub ? broadHubCopy!.luxuryDescription : locationInsights.travelNote}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
