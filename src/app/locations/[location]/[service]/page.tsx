import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import {
    getLocationBySlug,
    getServiceBySlug,
    getCategoryForService,
    getPriorityParams,
    getNearbyLocations,
    getRelatedServices,
    getPopularServicesFromOtherCategories,
    getCategoryBenefits,
    generateServiceIntro,
    getDrivingContext,
    type SEOLocation,
    type SEOService,
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";

// ============================================
// INCREMENTAL STATIC REGENERATION (ISR)
// ============================================
// Pre-build only high-priority pages at build time.
// Remaining pages are generated on-demand when first visited.

export const dynamicParams = true;
export const revalidate = 86400; // Revalidate every 24 hours

export function generateStaticParams() {
    // Only pre-build priority location/service combinations
    return getPriorityParams();
}

// ============================================
// METADATA
// ============================================

interface PageProps {
    params: Promise<{
        location: string;
        service: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: locationSlug, service: serviceSlug } = await params;
    const location = getLocationBySlug(locationSlug);
    const service = getServiceBySlug(serviceSlug);

    if (!location || !service) {
        return { title: "Service Not Found" };
    }

    const title = `${service.keyword} in ${location.name} | Galeo Beauty`;
    const description = `Professional ${service.keyword} near ${location.name}, ${location.region}. Premium beauty treatments at Galeo Beauty Hartbeespoort. Book now - prices from ${service.price}.`;

    return {
        title,
        description,
        keywords: [
            service.keyword,
            location.name,
            `${service.keyword} ${location.name}`,
            `${service.keyword} near me`,
            `beauty salon ${location.name}`,
            `${service.keyword} ${location.region}`,
            "Galeo Beauty",
            "Hartbeespoort beauty salon",
        ],
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
        },
        alternates: {
            canonical: `https://galeobeauty.com/locations/${locationSlug}/${serviceSlug}`,
        },
    };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function LocationServicePage({ params }: PageProps) {
    const { location: locationSlug, service: serviceSlug } = await params;
    const location = getLocationBySlug(locationSlug);
    const service = getServiceBySlug(serviceSlug);
    const category = getCategoryForService(serviceSlug);

    if (!location || !service) {
        notFound();
    }

    // Get data for internal linking
    const nearbyLocations = getNearbyLocations(locationSlug, 5);
    const relatedServices = getRelatedServices(serviceSlug, 4);
    const otherCategoryServices = getPopularServicesFromOtherCategories(service.categoryId, 3);

    // Get unique content
    const benefits = getCategoryBenefits(service.categoryId);
    const introText = generateServiceIntro(service, location);
    const drivingContext = getDrivingContext(location);

    const whatsappMessage = encodeURIComponent(
        `Hi! I'm interested in ${service.keyword} and I'm based in ${location.name}. Can I book an appointment?`
    );
    const whatsappLink = `https://wa.me/${businessInfo.socials.whatsapp}?text=${whatsappMessage}`;

    // Schema.org structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.keyword,
        provider: {
            "@type": "BeautySalon",
            name: "Galeo Beauty",
            image: "https://galeobeauty.com/images/logo.png",
            address: {
                "@type": "PostalAddress",
                streetAddress: businessInfo.address.street,
                addressLocality: "Hartbeespoort",
                addressRegion: "North West",
                postalCode: "0216",
                addressCountry: "ZA",
            },
            telephone: businessInfo.phone,
            url: "https://galeobeauty.com",
        },
        areaServed: {
            "@type": "Place",
            name: location.name,
            containedInPlace: {
                "@type": "AdministrativeArea",
                name: location.region,
            },
        },
        offers: {
            "@type": "Offer",
            price: service.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "ZAR",
        },
    };

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Schema.org JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />

                    <div className="container mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-2">
                                <li>
                                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                                </li>
                                <li><span className="mx-1">/</span></li>
                                <li>
                                    <Link href="/prices" className="hover:text-gold transition-colors">Services</Link>
                                </li>
                                {category && (
                                    <>
                                        <li><span className="mx-1">/</span></li>
                                        <li>
                                            <Link href={`/prices/${category.id}`} className="hover:text-gold transition-colors">
                                                {category.title}
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li><span className="mx-1">/</span></li>
                                <li className="text-foreground">{location.name}</li>
                            </ol>
                        </nav>

                        {/* Main Heading */}
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                            Professional <span className="text-gold italic">{service.keyword}</span>
                            <br />near <span className="text-gold">{location.name}</span>
                        </h1>

                        {/* Unique intro paragraph */}
                        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                            {introText}
                        </p>

                        {/* Price & Duration */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="bg-gold/10 border border-gold/20 rounded-full px-6 py-3">
                                <span className="text-gold font-bold text-lg">{service.price}</span>
                            </div>
                            {service.duration && (
                                <div className="bg-secondary/50 border border-border rounded-full px-6 py-3 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground">{service.duration}</span>
                                </div>
                            )}
                            {category && (
                                <div className="bg-secondary/50 border border-border rounded-full px-6 py-3">
                                    <span className="text-foreground text-sm">{category.badge}</span>
                                </div>
                            )}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Book via WhatsApp
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                                <Link href="/prices">
                                    View All Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section - Category-specific benefits */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-8">
                            Why Choose Galeo Beauty for <span className="text-gold">{service.keyword}</span>?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Location Info - Unique driving context */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-6">
                            Serving <span className="text-gold">{location.name}</span> & {location.region}
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            {drivingContext}. We proudly welcome clients from <strong>{location.name}</strong> and
                            surrounding areas in {location.region}. Our salon is nestled in the beautiful
                            Hartbeespoort area, offering a peaceful escape for your beauty treatments.
                        </p>

                        <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground mb-1">Our Location</p>
                                    <p className="text-muted-foreground">
                                        {businessInfo.address.street}<br />
                                        {businessInfo.address.area}<br />
                                        {businessInfo.address.city}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 mt-4 pt-4 border-t border-border">
                                <Phone className="w-6 h-6 text-gold flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground mb-1">Call or WhatsApp</p>
                                    <a href={`tel:${businessInfo.phone}`} className="text-gold hover:underline">
                                        012 111 1730
                                    </a>
                                    <span className="text-muted-foreground mx-2">|</span>
                                    <a href={whatsappLink} className="text-gold hover:underline">
                                        {businessInfo.cell}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Services - Same Category */}
                {relatedServices.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                More {category?.title} Services in {location.name}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Explore our other {category?.title.toLowerCase()} treatments available for {location.name} residents:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedServices.map((relatedService) => (
                                    <Link
                                        key={relatedService.slug}
                                        href={`/locations/${locationSlug}/${relatedService.slug}`}
                                        className="group bg-background rounded-xl p-5 border border-border hover:border-gold/40 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-foreground group-hover:text-gold transition-colors">
                                                    {relatedService.keyword}
                                                </h3>
                                                {relatedService.duration && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {relatedService.duration}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-gold font-semibold">{relatedService.price}</span>
                                        </div>
                                        <div className="mt-3 text-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            View details <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {category && (
                                <div className="mt-8">
                                    <Button asChild variant="outline" className="rounded-full">
                                        <Link href={`/prices/${category.id}`}>
                                            View All {category.title} Services
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Other Services - Cross-category */}
                {otherCategoryServices.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                <Sparkles className="w-6 h-6 inline-block text-gold mr-2" />
                                Also Popular in {location.name}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Discover more of our premium beauty services:
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {otherCategoryServices.map((otherService) => (
                                    <Link
                                        key={otherService.slug}
                                        href={`/locations/${locationSlug}/${otherService.slug}`}
                                        className="bg-secondary/50 hover:bg-gold hover:text-white rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300"
                                    >
                                        {otherService.keyword}
                                    </Link>
                                ))}
                                <Link
                                    href="/prices"
                                    className="bg-gold/10 hover:bg-gold hover:text-white rounded-full px-5 py-2.5 text-sm font-medium text-gold transition-all duration-300"
                                >
                                    View All Services →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Nearby Areas - Location internal linking */}
                {nearbyLocations.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                {service.keyword} Near Other {location.region} Areas
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                We also serve clients from these nearby areas:
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {nearbyLocations.map((nearbyLoc) => (
                                    <Link
                                        key={nearbyLoc.slug}
                                        href={`/locations/${nearbyLoc.slug}/${serviceSlug}`}
                                        className="bg-background hover:bg-gold hover:text-white rounded-full px-5 py-2.5 text-sm font-medium text-foreground border border-border hover:border-gold transition-all duration-300"
                                    >
                                        {nearbyLoc.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section className="py-20 text-center bg-foreground text-background">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">
                            Ready for Your <span className="text-gold">{service.keyword}</span>?
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                            Book your appointment today. {location.name} residents can enjoy premium
                            beauty treatments at our Hartbeespoort sanctuary.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground h-14 px-10 text-lg rounded-full">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Book Now via WhatsApp
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/30 text-white hover:bg-white/10">
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
