import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { TARGET_LOCATIONS } from "@/lib/seo-data";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Areas We Serve | Galeo Beauty Salon Locations",
    description: "Find a Galeo Beauty salon service near you. We serve clients from Hartbeespoort, Pretoria, Johannesburg, Centurion, and surrounding areas.",
    alternates: {
        canonical: "https://www.galeobeauty.com/locations",
    },
};

export default function LocationsIndexPage() {
    // Group locations by region
    const locationsByRegion = TARGET_LOCATIONS.reduce((acc, location) => {
        if (!acc[location.region]) {
            acc[location.region] = [];
        }
        acc[location.region].push(location);
        return acc;
    }, {} as Record<string, typeof TARGET_LOCATIONS>);

    const regions = Object.keys(locationsByRegion).sort();

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-secondary/20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Areas We <span className="text-gold">Serve</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                            Galeo Beauty is successfully serving clients from across Gauteng and North West.
                            Find your local area below to see specialized beauty services available for you.
                        </p>
                    </div>
                </section>

                {/* Locations Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-6xl">
                        {regions.map((region) => (
                            <div key={region} className="mb-16 last:mb-0">
                                <h2 className="font-serif text-3xl text-foreground mb-8 border-b border-border pb-4 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-gold" />
                                    {region}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {locationsByRegion[region].map((location) => (
                                        <Link
                                            key={location.slug}
                                            href={`/locations/${location.slug}`}
                                            className="group bg-white p-4 rounded-xl border border-border hover:border-gold/50 hover:shadow-md transition-all duration-300 flex justify-between items-center"
                                        >
                                            <span className="font-medium text-foreground group-hover:text-gold transition-colors">
                                                {location.name}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
