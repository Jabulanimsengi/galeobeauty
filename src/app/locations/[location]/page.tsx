import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    getLocationBySlug,
    getDrivingContext,
    TARGET_LOCATIONS,
    getLocationInsights,
    getLocationClusterLinks,
    getFeaturedLocationServices,
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";
import { CheckCircle, ArrowRight, MapPin } from "lucide-react";
import { LocationServicesClient } from "@/components/location/LocationServicesClient";
import { buildLocationHubKeywords } from "@/lib/seo-keywords";
import { limitStaticParams } from "@/lib/build-config";

// Pre-build priority locations
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
    return limitStaticParams(TARGET_LOCATIONS.map(loc => ({
        location: loc.slug
    })), "locations");
}

interface PageProps {
    params: Promise<{
        location: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: locationSlug } = await params;
    const location = getLocationBySlug(locationSlug);

    if (!location) {
        return {
            title: "Location Not Found",
        };
    }

    const relatedAreas = getLocationClusterLinks(locationSlug, 4);
    const relatedAreaLabel = relatedAreas.map((area) => area.name).join(", ");
    const title = `Beauty Services in ${location.name} | Galeo Beauty`;
    const description = relatedAreaLabel.length > 0
        ? `Professional beauty treatments for ${location.name} residents and nearby areas like ${relatedAreaLabel}. Facials, injectables, nails, body treatments and more from our Hartbeespoort salon.`
        : `Professional beauty treatments for ${location.name} residents. Facials, lash extensions, nails, fat freezing, permanent makeup & more at our Hartbeespoort salon near ${location.region}.`;

    return {
        title,
        description,
        keywords: buildLocationHubKeywords(location),
        alternates: {
            canonical: `https://www.galeobeauty.com/locations/${locationSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.galeobeauty.com/locations/${locationSlug}`,
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

    const drivingContext = getDrivingContext(location);
    const locationInsights = getLocationInsights(location);
    const nearbyAreas = getLocationClusterLinks(locationSlug, 12);
    const featuredServices = getFeaturedLocationServices(6);

    // JSON-LD Structured Data
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: `Galeo Beauty - Serving ${location.name}`,
        description: `Professional beauty treatments for ${location.name} residents. Facials, lash extensions, nails, fat freezing, permanent makeup & more at our Hartbeespoort salon.`,
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
            "@type": "Place",
            name: location.name,
            containedInPlace: { "@type": "AdministrativeArea", name: location.region },
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
                            Serving {location.region}
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Beauty Services for <span className="text-gold">{location.name}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                            {drivingContext}. {location.name} residents choose Galeo Beauty for premium treatments and a relaxing escape tailored to your needs.
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
                                    Local Coverage Around {location.name}
                                </span>
                                <h2 className="mt-3 font-serif text-3xl text-foreground">
                                    Nearby areas we also serve from Hartbeespoort
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    These nearby areas strengthen the {location.name} service cluster and help you explore
                                    beauty treatments by suburb, estate, or neighbouring metro.
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

                {featuredServices.length > 0 && (
                    <section className="py-16 bg-stone-50/70">
                        <div className="container mx-auto max-w-5xl px-6">
                            <div className="max-w-3xl">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                                    Popular Search Paths
                                </span>
                                <h2 className="mt-3 font-serif text-3xl text-foreground">
                                    Popular treatments for {location.name} searches
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    These are the location-specific treatment pages most likely to matter for broader searches
                                    around {location.name}, {location.region}, and the Hartbeespoort catchment.
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {featuredServices.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/locations/${locationSlug}/${service.slug}`}
                                        className="group rounded-[1.5rem] border border-border bg-background p-5 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_55px_-35px_rgba(0,0,0,0.35)]"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                                                    {service.categoryId.replace(/-/g, " ")}
                                                </p>
                                                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-gold">
                                                    {service.keyword}
                                                </h3>
                                            </div>
                                            <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-colors group-hover:text-gold" />
                                        </div>
                                        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                                            <span>{service.price}</span>
                                            {service.duration && <span>{service.duration}</span>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Service Categories - Accordion Layout with Booking */}
                <LocationServicesClient locationSlug={locationSlug} location={location} />

                {/* Why Choose Us */}
                <section className="py-16 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="font-serif text-3xl mb-12">Why {location.name} Clients Love Us</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <MapPin className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Worth the Drive</h3>
                                <p className="text-sm text-white/70">{drivingContext} and easy to pair with a day out in Hartbeespoort.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Expert Care</h3>
                                <p className="text-sm text-white/70">{locationInsights.clientProfile}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Luxury Experience</h3>
                                <p className="text-sm text-white/70">{locationInsights.travelNote}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
