import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    getLocationBySlug,
    getAllSEOServices,
    getDrivingContext,
    TARGET_LOCATIONS
} from "@/lib/seo-data";
import { serviceCategories } from "@/lib/services-data";
import { MapPin, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

// Pre-build priority locations
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
    return TARGET_LOCATIONS.map(loc => ({
        location: loc.slug
    }));
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
        return { title: "Location Not Found" };
    }

    return {
        title: `Beauty Salon Services targeting ${location.name} | Galeo Beauty`,
        description: `Premium beauty salon services for clients in ${location.name}. Facials, nails, lashes, and aesthetic treatments just a drive away. Book your appointment today.`,
    };
}

export default async function LocationHubPage({ params }: PageProps) {
    const { location: locationSlug } = await params;
    const location = getLocationBySlug(locationSlug);

    if (!location) {
        notFound();
    }

    const drivingContext = getDrivingContext(location);
    const services = getAllSEOServices();

    // Group services by category for better organization
    const servicesByCategory = serviceCategories.map(cat => ({
        ...cat,
        services: services.filter(s => s.categoryId === cat.id)
    })).filter(cat => cat.services.length > 0);

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

                {/* Service Categories Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-6xl">
                        {servicesByCategory.map((category) => (
                            <div key={category.id} className="mb-16 last:mb-0">
                                <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <h2 className="font-serif text-3xl text-foreground">
                                        {category.title}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.services.map((service) => (
                                        <Link
                                            key={service.slug}
                                            href={`/locations/${location.slug}/${service.slug}`}
                                            className="group bg-white p-5 rounded-xl border border-border hover:border-gold transition-all duration-300 hover:shadow-lg flex flex-col"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-foreground group-hover:text-gold transition-colors text-lg">
                                                    {service.keyword}
                                                </h3>
                                                <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-auto">
                                                Professional {service.keyword.toLowerCase()} treatment available for {location.name} clients.
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

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
