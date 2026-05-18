import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import {
    getCanonicalLocationSlug,
    getLocationBySlug,
    getDrivingContext,
    getPrebuildLocationHubParams,
    getLocationInsights,
    getLocationClusterLinks,
    getLocationPopularTreatmentGroups,
    isIndexableLocationService,
    isBroadLocationHub,
    type SEOLocation,
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { buildLocationHubKeywords } from "@/lib/seo-keywords";
import { serviceCategories } from "@/lib/services-data";
import { getIntentPagesForCategory } from "@/lib/intent-pages";
import { getCanonicalLocalCategoryPath, getCanonicalLocalServicePath } from "@/lib/local-seo-routes";

const HARTBEESPOORT_APPOINTMENT_LINKS = [
    {
        label: "Hair appointments",
        href: "/services/hair",
        description: "Cuts, blow-dries, colour, balayage and smoothing treatments for everyday maintenance or bigger changes.",
    },
    {
        label: "Nail appointments",
        href: "/services/nails",
        description: "Gel overlays, rubber base, acrylics, manicures, pedicures and nail art for hands and feet.",
    },
    {
        label: "Lashes and brows",
        href: "/services/lashes-brows",
        description: "Classic lashes, hybrid lashes, lash lifts, tinting, microblading and brow treatments with a wearable finish.",
    },
    {
        label: "Massage sessions",
        href: "/services/massages",
        description: "Relaxation, deep tissue, hot stone, sports and focused back-and-neck treatments.",
    },
    {
        label: "Waxing",
        href: "/services/waxing",
        description: "Intimate, facial and body waxing planned around hygiene, privacy and comfort.",
    },
    {
        label: "Skin and aesthetics",
        href: "/services/dermalogica",
        description: "Facials, peels, microneedling, Plasmage planning and skin treatments chosen by concern and intensity.",
    },
    {
        label: "IPL and tattoo removal",
        href: "/services/ipl",
        description: "IPL hair-reduction and tattoo-fading options that usually need a planned series.",
    },
    {
        label: "Injectables and fillers",
        href: "/services/hart-aesthetics",
        description: "Lip filler, Russian lips, anti-wrinkle planning and advanced aesthetic treatments with suitability in mind.",
    },
];

const HARTBEESPOORT_CONFIDENCE_POINTS = [
    {
        title: "Choose by goal",
        description: "Start with the result you want, then compare the treatment menu before booking.",
    },
    {
        title: "Ask before booking",
        description: "If you are choosing between two treatments, contact the salon so the appointment matches the concern.",
    },
    {
        title: "Plan the visit",
        description: "Some treatments are quick maintenance appointments, while colour, IPL and advanced services need more time.",
    },
];

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
    const title = broadHub
        ? broadHubCopy!.title
        : canonicalLocationSlug === "hartbeespoort"
            ? "Beauty Salon in Hartbeespoort | Hair, Nails & Aesthetics"
            : `Beauty Services in ${location.name}`;
    const description = broadHub
        ? broadHubCopy!.metadataDescription
        : canonicalLocationSlug === "hartbeespoort"
            ? "Galeo Beauty is a Hartbeespoort beauty salon for hair salon appointments, nail salon services, lashes, brows, waxing, massage, facials and aesthetics near Harties."
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

    const localCategoryPath = getCanonicalLocalCategoryPath("nails", canonicalLocationSlug);
    if (localCategoryPath) {
        permanentRedirect(localCategoryPath);
    }

    const drivingContext = getDrivingContext(location);
    const locationInsights = getLocationInsights(location);
    const nearbyAreas = getLocationClusterLinks(canonicalLocationSlug, 12);
    const popularTreatmentGroups = getLocationPopularTreatmentGroups(location);
    const broadHub = isBroadLocationHub(location);
    const broadHubCopy = broadHub ? getBroadHubCopy(location) : undefined;
    const showHartbeespoortAppointmentGuide = !broadHub && canonicalLocationSlug === "hartbeespoort";
    const heroContent = broadHub
        ? null
        : getLocationHeroContent(location, nearbyAreas, popularTreatmentGroups, drivingContext);
    const locationGuideCategoryIds = Array.from(
        new Set(popularTreatmentGroups.flatMap((group) => group.services.map((service) => service.categoryId)))
    ).slice(0, 4);
    const locationGuides = locationGuideCategoryIds
        .flatMap((categoryId) => getIntentPagesForCategory(categoryId).slice(0, 2))
        .filter((guide, index, guides) => guides.findIndex((item) => item.slug === guide.slug) === index)
        .slice(0, 6);

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
                <section className="border-b border-border/60 bg-white pt-24 sm:pt-28 lg:pt-32">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="overflow-hidden border-x border-border/60">
                            <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
                                <CloudinaryImage
                                    src="/images/interior/galeo-beauty-interior-p1.jpg"
                                    alt="Galeo Beauty salon interior in Hartbeespoort"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                    noSpinner
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08),rgba(10,8,6,0.32))]" />
                            </div>
                        </div>
                    </div>

                    {broadHub ? (
                        <div className="container mx-auto max-w-5xl px-6 py-10 text-center sm:py-12 lg:py-14">
                            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                {broadHubCopy!.eyebrow}
                            </span>
                            <h1 className="mx-auto mb-6 max-w-4xl font-sans text-[2.5rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                                {broadHubCopy!.title}
                            </h1>
                            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                                {broadHubCopy!.heroDescription}
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button asChild size="lg" className="rounded-none bg-gold px-8 text-white hover:bg-gold-dark">
                                    <Link href="/contact">
                                        Visit Us
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="container mx-auto max-w-5xl px-6 py-10 text-center sm:py-12 lg:py-14">
                            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                {heroContent!.eyebrow}
                            </span>
                            <h1 className="mx-auto mb-6 max-w-4xl font-sans text-[2.5rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                                {canonicalLocationSlug === "hartbeespoort" ? (
                                    <>
                                        Beauty Salon, Hair And Nails In <span className="text-gold">Hartbeespoort</span>
                                    </>
                                ) : (
                                    <>
                                        Beauty Services for <span className="text-gold">{location.name}</span>
                                    </>
                                )}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
                                {heroContent!.description}
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <Button asChild size="lg" className="rounded-none bg-gold px-8 text-white hover:bg-gold-dark">
                                    <Link href="/contact">
                                        Visit Us
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="rounded-none px-8">
                                    <Link href="/services">
                                        View Services
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </section>

                <section className="bg-background py-14">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="border border-border bg-white p-6 sm:p-8 lg:p-10">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                What This Area Page Covers
                            </h2>
                            <div className="mt-6 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-3">
                                <p>{broadHub ? broadHubCopy!.coverageDescription : locationInsights.characteristic}</p>
                                <p>{broadHub ? broadHubCopy!.servicesDescription : locationInsights.clientProfile}</p>
                                <p>{broadHub ? broadHubCopy!.worthDescription : `${drivingContext}. ${locationInsights.travelNote}`}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {showHartbeespoortAppointmentGuide && (
                    <section className="border-y border-border/60 bg-white py-14 sm:py-16">
                        <div className="container mx-auto max-w-6xl px-6">
                            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                                        Plan Your Visit
                                    </p>
                                    <h2 className="mt-4 font-sans text-[1.45rem] font-bold uppercase leading-tight tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                        Choose The Right Hartbeespoort Appointment
                                    </h2>
                                    <p className="mt-5 text-base leading-8 text-muted-foreground">
                                        Most clients arrive with a goal rather than a category. Use these starting points to
                                        move from the result you want to the treatment menu that fits it.
                                    </p>
                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                        <Button asChild className="rounded-none bg-gold px-7 text-white hover:bg-gold-dark">
                                            <Link href="/contact">
                                                Contact The Salon
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" className="rounded-none px-7">
                                            <Link href="/reviews">
                                                Galeo Beauty Reviews
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {HARTBEESPOORT_APPOINTMENT_LINKS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="group border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_18px_48px_-36px_rgba(0,0,0,0.28)]"
                                        >
                                            <span className="flex items-start justify-between gap-4">
                                                <span>
                                                    <span className="block text-sm font-semibold text-foreground group-hover:text-gold">
                                                        {item.label}
                                                    </span>
                                                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                                                        {item.description}
                                                    </span>
                                                </span>
                                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-3">
                                {HARTBEESPOORT_CONFIDENCE_POINTS.map((point) => (
                                    <div key={point.title}>
                                        <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                                            {point.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                            {point.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {popularTreatmentGroups.length > 0 && (
                    <section className="bg-stone-50/70 py-16">
                        <div className="container mx-auto max-w-5xl px-6">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                    {broadHub ? broadHubCopy!.servicesHeading : `Popular Beauty Services Near ${location.name}`}
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
                                        className="border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_22px_60px_-38px_rgba(0,0,0,0.32)]"
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
                                                    href={!broadHub && isIndexableLocationService(canonicalLocationSlug, service.slug)
                                                        ? getCanonicalLocalServicePath(service.categoryId, service.slug, canonicalLocationSlug) ?? `/services/${service.categoryId}/${service.slug}`
                                                        : `/services/${service.categoryId}/${service.slug}`}
                                                    className="group flex items-center justify-between gap-4 border border-border/70 bg-secondary/10 px-4 py-3 text-sm transition-colors hover:border-gold/30 hover:bg-secondary/20"
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

                {nearbyAreas.length > 0 && (
                    <section className="border-y border-border/60 bg-background py-14">
                        <div className="container mx-auto max-w-5xl px-6 text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                {broadHub ? broadHubCopy!.coverageHeading : `Nearby Areas Around ${location.name}`}
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                {broadHub
                                    ? broadHubCopy!.coverageDescription
                                    : "Compare nearby area pages before you book, especially if you are planning travel time or looking for the closest service fit."}
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                {nearbyAreas.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={`/locations/${area.slug}`}
                                        className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:bg-background hover:text-gold"
                                    >
                                        {area.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {locationGuides.length > 0 && (
                    <section className="bg-stone-50/70 py-16">
                        <div className="container mx-auto max-w-6xl px-6">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                    Beauty Guides for {location.name} Clients
                                </h2>
                                <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                    Helpful guides for comparing treatments before planning a visit to Galeo Beauty.
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {locationGuides.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/${guide.slug}`}
                                        className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                            Guide
                                        </p>
                                        <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                                            {guide.h1}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {guide.heroDescription}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                {broadHub ? "See All Treatment Categories" : `More Services Near ${location.name}`}
                            </h2>
                            <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                Choose a category below to compare treatments, prices, and service details.
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
                                        href={`/services/${category.id}`}
                                        className="border border-border bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_22px_60px_-38px_rgba(0,0,0,0.32)]"
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

                <section className="bg-stone-50/70 px-6 py-14">
                    <div className="container mx-auto max-w-4xl">
                        <div className="border border-[#2b2b2f] bg-[#171719] px-6 py-10 text-center text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.65)] sm:px-10">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-white sm:text-[2rem] lg:text-[2.25rem]">
                                {broadHub ? broadHubCopy!.whyTitle : `Ready To Book Near ${location.name}?`}
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/70">
                                {broadHub
                                    ? broadHubCopy!.worthDescription
                                    : `${drivingContext}. Book with Galeo Beauty when you want clear pricing, polished treatment care, and a calmer Hartbeespoort salon visit.`}
                            </p>
                            <div className="mt-7 flex flex-wrap justify-center gap-3">
                                <Button asChild size="lg" className="rounded-none bg-gold px-8 text-white hover:bg-gold-dark">
                                    <Link href="/contact">Contact Galeo Beauty</Link>
                                </Button>
                                <Button asChild size="lg" className="rounded-none border border-white/15 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white">
                                    <Link href="/services">View Services</Link>
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
