import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { PRIORITY_LOCATIONS } from "@/lib/seo-data";
import { MapPin, Star, Building2, Home, Landmark, TrendingUp, Plane } from "lucide-react";

export const metadata: Metadata = {
    title: "Areas We Serve | Beauty Salon Services Across Hartbeespoort & Gauteng",
    description: "Galeo Beauty serves 60+ locations in Hartbeespoort, Pretoria, Johannesburg, and surrounding areas. Find premium beauty treatments near you - from luxury estates to major metros.",
    keywords: "beauty salon hartbeespoort, galeo beauty locations, areas we serve, hartbeespoort estates, pretoria beauty salon, johannesburg beauty services",
    alternates: {
        canonical: "https://www.galeobeauty.com/locations",
    },
};

// Comprehensive location data structured by search intent
const locationCategories = [
    {
        title: "The Big 5 Suburbs",
        description: "Hartbeespoort's main residential and commercial hubs - highest search volume for general services",
        icon: Home,
        color: "text-gold",
        locations: [
            { name: "Hartbeespoort", slug: "hartbeespoort", priority: true, description: "Main town - complete beauty services" },
            { name: "Harties", slug: "harties", priority: true, description: "Local short name for Hartbeespoort" },
            { name: "Landsmeer", slug: "landsmeer", priority: true, description: "🏢 Our salon location - Shop 6, Jan Smuts Rd" },
            { name: "Schoemansville", slug: "schoemansville", priority: true, description: "Old town hub, waterfront area" },
            { name: "Melodie", slug: "melodie", priority: true, description: "Commercial heart, Village Mall area" },
            { name: "Ifafi", slug: "ifafi", priority: true, description: "Residential area with mountain views" },
            { name: "Meerhof", slug: "meerhof", priority: true, description: "Pretoria gateway, large stands" },
            { name: "Kosmos", slug: "kosmos", priority: true, description: "Iconic tourism village" },
        ],
    },
    {
        title: "Luxury Estates",
        description: "High-value estates perfect for premium beauty services, secure living, and lifestyle amenities",
        icon: Building2,
        color: "text-purple-600",
        locations: [
            { name: "Pecanwood Estate", slug: "pecanwood", priority: true, description: "Golf & country living - very high volume" },
            { name: "The Islands Estate", slug: "the-islands-estate", priority: true, description: "Waterfront canals, luxury living" },
            { name: "Caribbean Beach Club", slug: "caribbean-beach-club", priority: true, description: "Golf & marina lifestyle" },
            { name: "Xanadu Nature Estate", slug: "xanadu", priority: true, description: "Eco-living, wildlife, central location" },
            { name: "Westlake Country & Safari Estate", slug: "westlake-country-safari-estate", priority: true, description: "Equestrian & open space living" },
            { name: "The Coves", slug: "the-coves", priority: true, description: "Aviation & lifestyle estate" },
            { name: "Estate d'Afrique", slug: "estate-dafrique", priority: true, description: "French Provencal style, upscale" },
            { name: "Leloko Lifestyle Estate", slug: "leloko-lifestyle-estate", priority: true, description: "Waterfront, growing fast" },
            { name: "Birdwood Estate", slug: "birdwood-estate", priority: true, description: "Clubhouse, mountain views" },
            { name: "Seasons Lifestyle Estate", slug: "seasons-lifestyle-estate", priority: true, description: "Golf, spa, resort living" },
            { name: "Magalies Park", slug: "magalies-park", priority: true, description: "Timeshare & residential resort" },
            { name: "Redstone Estate", slug: "redstone-estate", priority: true, description: "Newer development, high value" },
            { name: "La Camargue Estate", slug: "la-camargue-estate", priority: true, description: "Wildlife estate, growing" },
            { name: "Eagles Landing", slug: "eagles-landing", priority: true, description: "Smaller, exclusive estate" },
            { name: "Falcon View Estate", slug: "falcon-view-estate", priority: false, description: "Secure estate living" },
            { name: "Gateway Manor", slug: "gateway-manor", priority: false, description: "Gated community" },
            { name: "K'Shane Estate", slug: "k-shane-estate", priority: false, description: "Exclusive, large stands" },
            { name: "Lakeland Estate", slug: "lakeland-estate", priority: false, description: "Waterfront living" },
            { name: "Landsmeer Equestrian Estate", slug: "landsmeer-equestrian-estate", priority: false, description: "Equestrian facilities" },
            { name: "Leisure Bay", slug: "leisure-bay", priority: false, description: "Resort-style living" },
        ],
    },
    {
        title: "Tourism & Commercial Nodes",
        description: "High-traffic areas perfect for directions, activities, shopping, and entertainment",
        icon: Landmark,
        color: "text-blue-600",
        locations: [
            { name: "Village Mall Hartbeespoort", slug: "village-mall-hartbeespoort", priority: true, description: "Main shopping center" },
            { name: "Islands Shopping Mall", slug: "islands-shopping-mall", priority: true, description: "Retail & dining destination" },
            { name: "Hartbeespoort Dam", slug: "hartbeespoort-dam", priority: true, description: "Tourist landmark, water activities" },
            { name: "Damdoryn", slug: "damdoryn", priority: true, description: "4-way stop area, Chameleon Village" },
            { name: "Broederstroom", slug: "broederstroom", priority: true, description: "Lion Park, craft market area" },
            { name: "Skeerpoort", slug: "skeerpoort", priority: true, description: "Hot air ballooning, MTB trails" },
            { name: "Saartjiesnek", slug: "saartjiesnek", priority: false, description: "Mountain pass entry point" },
            { name: "Silkaatsnek", slug: "silkaatsnek", priority: false, description: "Nature reserve area" },
        ],
    },
    {
        title: "Agricultural Holdings & Venues",
        description: "Popular areas for wedding venues, guesthouses, lodges, and light industry",
        icon: TrendingUp,
        color: "text-green-600",
        locations: [
            { name: "Rietfontein AH", slug: "rietfontein-ah", priority: false, description: "Major wedding venue area" },
            { name: "Melodie AH", slug: "melodie-ah", priority: false, description: "Plots near the mall" },
            { name: "Zandfontein", slug: "zandfontein", priority: false, description: "Industrial & plots area" },
            { name: "Bokfontein", slug: "bokfontein", priority: false, description: "Agricultural holdings" },
            { name: "Syferfontein", slug: "syferfontein", priority: false, description: "Smallholdings area" },
            { name: "Zilkaatsnek", slug: "zilkaatsnek", priority: false, description: "Rural plots" },
        ],
    },
    {
        title: "Regional Destinations",
        description: "Nearby tourist towns and scenic destinations",
        icon: MapPin,
        color: "text-orange-600",
        locations: [
            { name: "Magaliesburg", slug: "magaliesburg", priority: true, description: "Tourist town, hiking, 25km away" },
            { name: "Safari Gardens", slug: "safari-gardens", priority: true, description: "Wildlife estate, 12km" },
        ],
    },
    {
        title: "Major Cities - Commuter Belt",
        description: "Key metro areas driving in to Hartbeespoort - capture 'near me' searches from city dwellers",
        icon: Plane,
        color: "text-indigo-600",
        locations: [
            { name: "Johannesburg", slug: "johannesburg", priority: true, description: "1hr drive - major metro" },
            { name: "Sandton", slug: "sandton", priority: true, description: "1hr drive - wealthy suburb" },
            { name: "Pretoria", slug: "pretoria", priority: true, description: "45min drive - capital city" },
            { name: "Centurion", slug: "centurion", priority: true, description: "35min drive - between PTA/JHB" },
            { name: "Midrand", slug: "midrand", priority: true, description: "40min drive - business hub" },
            { name: "Brits", slug: "brits", priority: true, description: "20min drive - closest town" },
            { name: "Mooinooi", slug: "mooinooi", priority: false, description: "Mining town nearby" },
            { name: "Sonop", slug: "sonop", priority: false, description: "Small town, 30min away" },
            { name: "De Wildt", slug: "de-wildt", priority: false, description: "Cheetah centre, 4x4 area" },
            { name: "Lanseria", slug: "lanseria", priority: false, description: "Airport connection" },
            { name: "Pelindaba", slug: "pelindaba", priority: false, description: "Nuclear facility area" },
        ],
    },
];

export default function LocationsIndexPage() {
    // Count priority vs total locations
    const totalLocations = locationCategories.reduce((sum, cat) => sum + cat.locations.length, 0);
    const priorityCount = locationCategories.reduce(
        (sum, cat) => sum + cat.locations.filter(loc => loc.priority).length,
        0
    );

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-gradient-to-b from-secondary/20 to-background">
                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6 border border-gold/20">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">Serving 60+ Locations</span>
                        </div>

                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Areas We <span className="text-gold">Serve</span>
                        </h1>

                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                            From luxury estates in Hartbeespoort to major metros in Gauteng,
                            Galeo Beauty brings premium salon services to your neighborhood.
                        </p>

                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-gold fill-gold" />
                                <span><strong>{priorityCount}</strong> Priority Locations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gold" />
                                <span><strong>{totalLocations}</strong> Total Coverage</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Salon Location Callout */}
                <section className="py-8 px-6 bg-gold/5 border-y border-gold/20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <p className="text-foreground">
                            🏢 <strong>Visit us at:</strong> Shop 6, Landsmeer Estate, Jan Smuts Rd, Hartbeespoort, 0216
                        </p>
                    </div>
                </section>

                {/* Locations by Category */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-7xl">
                        {locationCategories.map((category, idx) => {
                            const Icon = category.icon;
                            return (
                                <div key={idx} className="mb-20 last:mb-0">
                                    {/* Category Header */}
                                    <div className="mb-8">
                                        <div className="flex items-start gap-4 mb-3">
                                            <Icon className={`w-8 h-8 ${category.color} mt-1`} />
                                            <div>
                                                <h2 className="font-serif text-3xl text-foreground mb-2">
                                                    {category.title}
                                                </h2>
                                                <p className="text-muted-foreground max-w-3xl">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-px bg-border" />
                                    </div>

                                    {/* Locations Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {category.locations.map((location) => (
                                            <Link
                                                key={location.slug}
                                                href={`/locations/${location.slug}`}
                                                className="group relative bg-white p-5 rounded-xl border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                                            >
                                                {/* Priority Badge */}
                                                {location.priority && (
                                                    <div className="absolute top-3 right-3">
                                                        <Star className="w-4 h-4 text-gold fill-gold" />
                                                    </div>
                                                )}

                                                {/* Location Name */}
                                                <h3 className="font-semibold text-lg text-foreground group-hover:text-gold transition-colors mb-2 pr-6">
                                                    {location.name}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {location.description}
                                                </p>

                                                {/* View Services Link */}
                                                <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span>View Services</span>
                                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* SEO Footer Section */}
                <section className="py-16 px-6 bg-secondary/10">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="font-serif text-2xl text-foreground mb-4 text-center">
                            Complete Local Coverage
                        </h2>
                        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
                            Whether you're in a luxury estate, bustling suburb, or commuting from the city,
                            Galeo Beauty is your trusted partner for premium salon services. All locations
                            offer the same exceptional treatments with personalized care.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Star className="w-6 h-6 text-gold fill-gold" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Priority Locations</h3>
                                <p className="text-sm text-muted-foreground">
                                    Marked with ⭐ - these areas have dedicated pages with local SEO optimization
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <MapPin className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">All Locations</h3>
                                <p className="text-sm text-muted-foreground">
                                    Every location page shows available services, pricing, and booking options
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Building2 className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Estate Coverage</h3>
                                <p className="text-sm text-muted-foreground">
                                    Specialized service pages for 20+ luxury estates and residential developments
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
