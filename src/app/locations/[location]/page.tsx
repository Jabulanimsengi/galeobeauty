import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    getLocationBySlug,
    getDrivingContext,
    TARGET_LOCATIONS
} from "@/lib/seo-data";
import { CheckCircle } from "lucide-react";
import { LocationServicesClient } from "@/components/location/LocationServicesClient";

// Pre-build priority locations
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
    return TARGET_LOCATIONS.map(loc => ({
        location: loc.slug
    }));
}

export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
    const location = getLocationBySlug(params.location);

    if (!location) {
        return {
            title: "Location Not Found",
        };
    }

    const title = `Beauty Services in ${location.name} | Galeo Beauty`;
    const description = `Professional beauty treatments for ${location.name} residents. Facials, lash extensions, nails, fat freezing, permanent makeup & more at our Hartbeespoort salon near ${location.region}.`;

    return {
        title,
        description,
        keywords: [
            `beauty salon ${location.name.toLowerCase()}`,
            `spa near ${location.name.toLowerCase()}`,
            `facials ${location.name.toLowerCase()}`,
            `lash extensions ${location.name.toLowerCase()}`,
            `beauty treatments ${location.region.toLowerCase()}`,
            `salon near ${location.name.toLowerCase()}`,
            `day spa ${location.name.toLowerCase()}`,
        ],
        alternates: {
            canonical: `https://www.galeobeauty.com/locations/${params.location}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.galeobeauty.com/locations/${params.location}`,
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

interface PageProps {
    params: {
        location: string;
    };
}

export default async function LocationHubPage({ params }: PageProps) {
    const locationSlug = params.location;
    const location = getLocationBySlug(locationSlug);

    if (!location) {
        notFound();
    }

    const drivingContext = getDrivingContext(location);

    return (
        <>
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

                {/* Service Categories - Accordion Layout with Booking */}
                <LocationServicesClient locationSlug={locationSlug} location={location} />

                {/* Why Choose Us */}
                <section className="py-16 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="font-serif text-3xl mb-12">Why {location.name} Clients Love Us</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Worth the Drive</h3>
                                <p className="text-sm text-white/70">A peaceful sanctuary away from the hustle, perfect for a pamper day.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Expert Care</h3>
                                <p className="text-sm text-white/70">Qualified therapists using premium international brands.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <CheckCircle className="w-8 h-8 text-gold mb-4" />
                                <h3 className="font-bold mb-2">Luxury Experience</h3>
                                <p className="text-sm text-white/70">From the moment you arrive, you're treated to 5-star service.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
