import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Areas We Serve | Beauty Salon Services Across Hartbeespoort & Gauteng",
    description: "Galeo Beauty serves 60+ locations in Hartbeespoort, Pretoria, Johannesburg, and surrounding areas. Find premium beauty treatments near you - from luxury estates to major metros.",
    keywords: [
        "beauty salon Hartbeespoort",
        "Galeo Beauty locations",
        "areas we serve Hartbeespoort",
        "Hartbeespoort estates salon",
        "Pretoria beauty salon",
        "Johannesburg beauty services",
        "salon near me Hartbeespoort Dam",
        "beauty treatments Gauteng",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/locations",
    },
    openGraph: {
        title: "Areas We Serve | Galeo Beauty Hartbeespoort & Gauteng",
        description:
            "Find Galeo Beauty services across 60+ locations in Hartbeespoort, Pretoria, Johannesburg & surrounding areas.",
        url: "https://www.galeobeauty.com/locations",
        type: "website",
    },
};

// Location data grouped by region for users
const locationGroups = [
    {
        title: "Hartbeespoort & Surrounds",
        locations: [
            { name: "Hartbeespoort", slug: "hartbeespoort" },
            { name: "Harties", slug: "harties" },
            { name: "Landsmeer", slug: "landsmeer", badge: "Our Salon" },
            { name: "Schoemansville", slug: "schoemansville" },
            { name: "Melodie", slug: "melodie" },
            { name: "Ifafi", slug: "ifafi" },
            { name: "Meerhof", slug: "meerhof" },
            { name: "Kosmos", slug: "kosmos" },
            { name: "Hartbeespoort Dam", slug: "hartbeespoort-dam" },
            { name: "Damdoryn", slug: "damdoryn" },
            { name: "Broederstroom", slug: "broederstroom" },
            { name: "Skeerpoort", slug: "skeerpoort" },
            { name: "Saartjiesnek", slug: "saartjiesnek" },
            { name: "Silkaatsnek", slug: "silkaatsnek" },
            { name: "Magaliesburg", slug: "magaliesburg" },
        ],
    },
    {
        title: "Estates & Lifestyle Living",
        locations: [
            { name: "Pecanwood Estate", slug: "pecanwood" },
            { name: "The Islands Estate", slug: "the-islands-estate" },
            { name: "Caribbean Beach Club", slug: "caribbean-beach-club" },
            { name: "Xanadu Nature Estate", slug: "xanadu" },
            { name: "Westlake Country & Safari Estate", slug: "westlake-country-safari-estate" },
            { name: "The Coves", slug: "the-coves" },
            { name: "Estate d'Afrique", slug: "estate-dafrique" },
            { name: "Leloko Lifestyle Estate", slug: "leloko-lifestyle-estate" },
            { name: "Birdwood Estate", slug: "birdwood-estate" },
            { name: "Seasons Lifestyle Estate", slug: "seasons-lifestyle-estate" },
            { name: "Magalies Park", slug: "magalies-park" },
            { name: "Redstone Estate", slug: "redstone-estate" },
            { name: "La Camargue Estate", slug: "la-camargue-estate" },
            { name: "Eagles Landing", slug: "eagles-landing" },
            { name: "Falcon View Estate", slug: "falcon-view-estate" },
            { name: "Gateway Manor", slug: "gateway-manor" },
            { name: "K'Shane Estate", slug: "k-shane-estate" },
            { name: "Lakeland Estate", slug: "lakeland-estate" },
            { name: "Landsmeer Equestrian Estate", slug: "landsmeer-equestrian-estate" },
            { name: "Leisure Bay", slug: "leisure-bay" },
            { name: "Safari Gardens", slug: "safari-gardens" },
        ],
    },
    {
        title: "Greater Gauteng",
        locations: [
            { name: "Pretoria", slug: "pretoria" },
            { name: "Johannesburg", slug: "johannesburg" },
            { name: "Centurion", slug: "centurion" },
            { name: "Sandton", slug: "sandton" },
            { name: "Midrand", slug: "midrand" },
            { name: "Brits", slug: "brits" },
            { name: "Lanseria", slug: "lanseria" },
            { name: "De Wildt", slug: "de-wildt" },
            { name: "Mooinooi", slug: "mooinooi" },
            { name: "Sonop", slug: "sonop" },
            { name: "Pelindaba", slug: "pelindaba" },
        ],
    },
    {
        title: "Agricultural Holdings & Rural",
        locations: [
            { name: "Melodie AH", slug: "melodie-ah" },
            { name: "Rietfontein AH", slug: "rietfontein-ah" },
            { name: "Zandfontein", slug: "zandfontein" },
            { name: "Bokfontein", slug: "bokfontein" },
            { name: "Syferfontein", slug: "syferfontein" },
            { name: "Zilkaatsnek", slug: "zilkaatsnek" },
            { name: "Village Mall Hartbeespoort", slug: "village-mall-hartbeespoort" },
            { name: "Islands Shopping Mall", slug: "islands-shopping-mall" },
        ],
    },
];

export default function LocationsIndexPage() {
    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero */}
                <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6 bg-secondary/20">
                    <div className="container mx-auto max-w-3xl text-center">
                        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
                            Areas We Serve
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                            Find Galeo Beauty services near you. Based in Hartbeespoort, serving clients across Gauteng.
                        </p>
                    </div>
                </section>

                {/* Salon Location Banner */}
                <section className="py-5 px-6 bg-foreground text-background">
                    <div className="container mx-auto max-w-3xl flex items-center justify-center gap-3 text-sm sm:text-base">
                        <MapPin className="w-4 h-4 text-gold shrink-0" />
                        <span>
                            <strong>Visit us:</strong> Shop 6, Landsmeer Estate, Jan Smuts Rd, Hartbeespoort
                        </span>
                    </div>
                </section>

                {/* Locations Grid */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="space-y-14">
                            {locationGroups.map((group, idx) => (
                                <div key={idx}>
                                    <h2 className="font-serif text-2xl text-foreground mb-6 pb-3 border-b border-border">
                                        {group.title}
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {group.locations.map((location) => (
                                            <Link
                                                key={location.slug}
                                                href={`/locations/${location.slug}`}
                                                className="group flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-white hover:border-gold/50 hover:bg-gold/5 transition-all duration-200"
                                            >
                                                <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate flex-1">
                                                    {location.name}
                                                </span>
                                                {"badge" in location && location.badge && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-1.5 py-0.5 rounded shrink-0">
                                                        {location.badge}
                                                    </span>
                                                )}
                                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-foreground text-background text-center">
                    <div className="container mx-auto px-6 max-w-2xl">
                        <h2 className="font-serif text-2xl sm:text-3xl mb-4">
                            Don&apos;t see your area?
                        </h2>
                        <p className="text-background/70 mb-6">
                            We welcome clients from all areas. Contact us to book your appointment.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-foreground font-semibold px-8 py-3 rounded-full transition-all"
                        >
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
