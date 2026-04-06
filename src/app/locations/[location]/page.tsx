import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { LocationServicesClient } from "@/components/location/LocationServicesClient";
import { buildLocationHubKeywords } from "@/lib/seo-keywords";
import { serviceCategories } from "@/lib/services-data";

function getBroadHubCopy(location: SEOLocation) {
    if (location.slug === "south-africa") {
        return {
            eyebrow: "National Coverage",
            title: "Beauty Services for Clients Across South Africa",
            metadataDescription:
                "Explore Galeo Beauty's national service footprint from Hartbeespoort, with provincial hubs, commuter locations, and premium beauty treatments worth planning around.",
            heroDescription:
                "Galeo Beauty welcomes destination beauty bookings from across South Africa. Use this national hub to explore our provincial coverage, key commuter areas, and the premium treatments clients plan around Hartbeespoort visits.",
            coverageHeading: "Provincial and local areas we serve across South Africa",
            coverageDescription:
                "Start with the provincial hubs or jump straight into the locations South African clients most often travel from when booking with Galeo Beauty.",
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
            eyebrow: "Provincial Hub",
            title: "Beauty Services for North West Clients",
            metadataDescription:
                "Explore Galeo Beauty's North West coverage from Hartbeespoort, including nearby estates, commuter towns, and premium beauty treatments for planned and repeat visits.",
            heroDescription:
                "This North West hub brings together the local towns, estates, and commuter areas most likely to book with Galeo Beauty. Explore nearby service areas and the treatments clients regularly plan around Hartbeespoort visits.",
            coverageHeading: "North West areas we regularly serve",
            coverageDescription:
                "Use this hub to browse Hartbeespoort, Brits, Magaliesburg, Broederstroom, and nearby North West locations connected to Galeo Beauty.",
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
        eyebrow: "Provincial Hub",
        title: "Beauty Services for Gauteng Clients",
        metadataDescription:
            "Explore Galeo Beauty's Gauteng coverage from Hartbeespoort, including metro commuter corridors, local hubs, and premium beauty treatments for planned visits.",
        heroDescription:
            "This Gauteng hub brings together the metros, commuter corridors, and local areas that most often book with Galeo Beauty. Explore the locations and treatments clients regularly plan around Hartbeespoort visits.",
        coverageHeading: "Key Gauteng areas we serve",
        coverageDescription:
            "Browse the Gauteng metros, suburbs, and commuter zones that feed into Galeo Beauty's Hartbeespoort catchment.",
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

// Pre-build a deterministic nearby-location hub set.
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
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
        return {
            title: "Location Not Found",
        };
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
        redirect("/locations");
    }

    const canonicalLocationSlug = getCanonicalLocationSlug(locationSlug);
    const drivingContext = getDrivingContext(location);
    const locationInsights = getLocationInsights(location);
    const nearbyAreas = getLocationClusterLinks(canonicalLocationSlug, 12);
    const popularTreatmentGroups = getLocationPopularTreatmentGroups(location);
    const broadHub = isBroadLocationHub(location);
    const broadHubCopy = broadHub ? getBroadHubCopy(location) : undefined;

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
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-secondary/20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                            {broadHub ? broadHubCopy!.eyebrow : `Serving ${location.region}`}
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            {broadHub ? (
                                broadHubCopy!.title
                            ) : (
                                <>
                                    Beauty Services for <span className="text-gold">{location.name}</span>
                                </>
                            )}
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                            {broadHub
                                ? broadHubCopy!.heroDescription
                                : `${drivingContext}. ${location.name} residents choose Galeo Beauty for premium treatments and a relaxing escape tailored to your needs.`}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
                                <Link href="/contact">
                                    Visit Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {nearbyAreas.length > 0 && (
                    <section className="py-14 border-y border-border/60 bg-background">
                        <div className="container mx-auto max-w-5xl px-6">
                            <div className="max-w-3xl">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    {broadHub ? "Coverage Overview" : `Local Coverage Around ${location.name}`}
                                </span>
                                <h2 className="mt-3 font-serif text-3xl text-foreground">
                                    {broadHub ? broadHubCopy!.coverageHeading : "Nearby areas we also serve from Hartbeespoort"}
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    {broadHub
                                        ? broadHubCopy!.coverageDescription
                                        : (
                                            <>
                                                These nearby areas strengthen the {location.name} service cluster and help you explore
                                                beauty treatments by suburb, estate, or neighbouring metro.
                                            </>
                                        )}
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {nearbyAreas.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={`/locations/${area.slug}`}
                                        className="rounded-full border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
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
                            <div className="rounded-[1.75rem] border border-border bg-secondary/10 p-6">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Local Context
                                </span>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    {locationInsights.characteristic}
                                </p>
                            </div>
                            <div className="rounded-[1.75rem] border border-border bg-secondary/10 p-6">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Typical Clients
                                </span>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    {locationInsights.clientProfile}
                                </p>
                            </div>
                            <div className="rounded-[1.75rem] border border-border bg-secondary/10 p-6">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Travel Note
                                </span>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
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
                                    Popular Treatment Areas
                                </span>
                                <h2 className="mt-3 font-serif text-3xl text-foreground">
                                    {broadHub ? broadHubCopy!.servicesHeading : `Popular beauty services near ${location.name}`}
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    {broadHub
                                        ? broadHubCopy!.servicesDescription
                                        : (
                                            <>
                                                These grouped links help you explore the services people most often search for around{" "}
                                                {location.name}, from nails and hair extensions to facial treatments, eyelash
                                                extensions and smoothing-focused hair treatments.
                                            </>
                                        )}
                                </p>
                            </div>

                            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {popularTreatmentGroups.map((group) => (
                                    <article
                                        key={group.id}
                                        className="rounded-[1.5rem] border border-border bg-background p-5 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_55px_-35px_rgba(0,0,0,0.35)]"
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

                                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                            {group.description}
                                        </p>

                                        <div className="mt-5 space-y-2">
                                            {group.services.map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    href={broadHub ? `/prices/${service.categoryId}/${service.slug}` : `/locations/${locationSlug}/${service.slug}`}
                                                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/10 px-4 py-3 text-sm transition-colors hover:border-gold/30 hover:bg-secondary/20"
                                                >
                                                    <div>
                                                        <p className="font-medium text-foreground group-hover:text-gold">
                                                            {service.keyword}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {service.price}
                                                            {service.duration ? ` · ${service.duration}` : ""}
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

                {broadHub ? (
                    <section className="py-16 bg-background border-y border-border/60">
                        <div className="container mx-auto max-w-5xl px-6">
                            <div className="max-w-3xl">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Browse Treatment Categories
                                </span>
                                <h2 className="mt-3 font-serif text-3xl text-foreground">
                                    Explore Galeo Beauty categories before you choose a service
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    We keep these hub pages focused on discovery and local coverage. When you are ready to compare exact treatments, browse the category pages below.
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
                                            className="rounded-[1.5rem] border border-border bg-secondary/10 p-5 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_55px_-35px_rgba(0,0,0,0.35)]"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                                                        {category.title}
                                                    </p>
                                                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                                                        Explore {category.title.toLowerCase()} services
                                                    </h3>
                                                </div>
                                                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors hover:text-gold" />
                                            </div>

                                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                                {examples}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ) : (
                    <LocationServicesClient locationSlug={locationSlug} location={location} />
                )}

                {/* Why Choose Us */}
                <section className="py-16 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="font-serif text-3xl mb-12">
                            {broadHub ? broadHubCopy!.whyTitle : `Why ${location.name} Clients Love Us`}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <MapPin className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">{broadHub ? broadHubCopy!.worthTitle : "Worth the Drive"}</h3>
                                <p className="text-sm text-white/70">
                                    {broadHub ? broadHubCopy!.worthDescription : `${drivingContext} and easy to pair with a day out in Hartbeespoort.`}
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Expert Care</h3>
                                <p className="text-sm text-white/70">{broadHub ? broadHubCopy!.expertDescription : locationInsights.clientProfile}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Luxury Experience</h3>
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
