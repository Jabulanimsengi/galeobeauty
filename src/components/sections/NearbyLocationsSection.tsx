import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface Location {
    name: string;
    slug: string;
    description: string;
}

interface NearbyLocationsSectionProps {
    /** The service name (e.g., "Body Contouring", "Permanent Makeup") */
    serviceName: string;
    /** Optional: Custom title. Defaults to "Find {serviceName} Near You" */
    title?: string;
    /** Optional: Custom description */
    description?: string;
}

const FEATURED_LOCATIONS: Location[] = [
    { name: "Hartbeespoort", slug: "hartbeespoort", description: "Main town - full service range" },
    { name: "Landsmeer", slug: "landsmeer", description: "Our salon location - Shop 6" },
    { name: "Pecanwood Estate", slug: "pecanwood", description: "Luxury golf estate" },
    { name: "The Islands Estate", slug: "the-islands-estate", description: "Waterfront living" },
    { name: "Melodie", slug: "melodie", description: "Commercial heart" },
    { name: "Schoemansville", slug: "schoemansville", description: "Waterfront area" },
    { name: "Pretoria", slug: "pretoria", description: "45min drive - capital city" },
    { name: "Centurion", slug: "centurion", description: "35min drive" },
    { name: "Johannesburg", slug: "johannesburg", description: "1hr drive - major metro" },
    { name: "Sandton", slug: "sandton", description: "Wealthy suburb" },
    { name: "Midrand", slug: "midrand", description: "Business hub" },
    { name: "Brits", slug: "brits", description: "20min drive" },
];

export function NearbyLocationsSection({
    serviceName,
    title,
    description
}: NearbyLocationsSectionProps) {
    const defaultTitle = `Find ${serviceName} Near You`;
    const defaultDescription = `We serve clients from across Hartbeespoort, Pretoria, Johannesburg, and surrounding areas. Click your location to see ${serviceName.toLowerCase()} services and pricing in your area.`;

    return (
        <section className="py-20 px-6 bg-secondary/10">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-4 border border-gold/20">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">Serving 43+ Locations</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                        {title || defaultTitle}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        {description || defaultDescription}
                    </p>
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {FEATURED_LOCATIONS.map((location) => (
                        <Link
                            key={location.slug}
                            href={`/locations/${location.slug}`}
                            className="group bg-white p-4 rounded-xl border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors text-sm leading-tight">
                                    {location.name}
                                </h3>
                                <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 transform group-hover:translate-x-1" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                                {location.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center">
                    <Link
                        href="/locations"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-medium transition-colors group"
                    >
                        <span>View All 60+ Locations We Serve</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
