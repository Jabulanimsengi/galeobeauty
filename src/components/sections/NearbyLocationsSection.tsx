import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getCanonicalLocationSlug, isIndexableLocationService } from "@/lib/seo-data";

interface Location {
    name: string;
    slug: string;
    description: string;
}

interface NearbyLocationsSectionProps {
    /** The service name (e.g., "Body Contouring", "Permanent Makeup") */
    serviceName: string;
    /** Optional: service slug so cards can deep link into local service pages */
    serviceSlug?: string;
    /** Optional: Custom title. Defaults to "Visiting Us for {serviceName}" */
    title?: string;
    /** Optional: Custom description */
    description?: string;
}

const FEATURED_LOCATIONS: Location[] = [
    { name: "Hartbeespoort", slug: "hartbeespoort", description: "Local clients from around the dam" },
    { name: "Harties", slug: "harties", description: "A common local search variation around the dam" },
    { name: "Landsmeer", slug: "landsmeer", description: "Home of our salon on Jan Smuts Road" },
    { name: "Pecanwood", slug: "pecanwood", description: "A short drive from the estate" },
    { name: "The Islands", slug: "the-islands-estate", description: "Easy access from the waterfront estates" },
    { name: "Melodie", slug: "melodie", description: "Convenient for everyday appointments" },
    { name: "Schoemansville", slug: "schoemansville", description: "Close by for regular visits" },
    { name: "Brits", slug: "brits", description: "Popular for clients travelling in from nearby" },
    { name: "Pretoria", slug: "pretoria", description: "Often combined with a planned beauty day" },
    { name: "Centurion", slug: "centurion", description: "Straightforward trip for advance bookings" },
    { name: "Johannesburg", slug: "johannesburg", description: "Worth the drive for a dedicated appointment" },
];

export function NearbyLocationsSection({
    serviceName,
    serviceSlug,
    title,
    description
}: NearbyLocationsSectionProps) {
    const defaultTitle = `Visiting Us for ${serviceName}`;
    const defaultDescription = `Clients often visit our Landsmeer salon from Hartbeespoort, Harties, the nearby estates, Brits, Pretoria, Centurion, and Johannesburg. If you are planning around travel time, we are happy to help you choose a booking slot that feels easy and worthwhile.`;

    return (
        <section className="py-20 px-6 bg-secondary/10">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-4 border border-gold/20">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">Easy to Reach From Nearby Areas</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                        {title || defaultTitle}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        {description || defaultDescription}
                    </p>
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    {FEATURED_LOCATIONS.map((location) => {
                        const canonicalSlug = getCanonicalLocationSlug(location.slug);
                        const href = serviceSlug && (canonicalSlug === "hartbeespoort" || isIndexableLocationService(canonicalSlug, serviceSlug))
                            ? `/locations/${canonicalSlug}/${serviceSlug}`
                            : `/locations/${location.slug}`;

                        return (
                        <Link
                            key={location.slug}
                            href={href}
                            className="bg-white p-4 rounded-xl border border-border"
                        >
                            <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                                {location.name}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {location.description}
                            </p>
                        </Link>
                    )})}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                    <Link
                        href="/contact#location"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
                    >
                        <span>Get Directions to the Salon</span>
                        <ArrowRight className="w-4 h-4 transition-transform" />
                    </Link>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Galeo Beauty is based in Landsmeer, Hartbeespoort, with parking on site and a calm salon setting that many clients prefer over a rushed in-city stop.
                    </p>
                </div>
            </div>
        </section>
    );
}
