import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, CheckCircle, ArrowRight } from "lucide-react";
import {
    ALL_SEO_PARAMS,
    getLocationBySlug,
    getServiceBySlug,
    getCategoryForService,
    type SEOLocation,
    type SEOService,
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";

// ============================================
// STATIC GENERATION
// ============================================

export const dynamic = "force-static";

export function generateStaticParams() {
    return ALL_SEO_PARAMS;
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
    const description = `Looking for professional ${service.keyword} near ${location.name}? Galeo Beauty offers premium ${service.keyword} treatments. Book your appointment today. Prices from ${service.price}.`;

    return {
        title,
        description,
        keywords: [
            service.keyword,
            location.name,
            `${service.keyword} ${location.name}`,
            `${service.keyword} near me`,
            `beauty salon ${location.name}`,
            "Galeo Beauty",
            "Hartbeespoort",
        ],
        openGraph: {
            title,
            description,
            type: "website",
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

    const whatsappMessage = encodeURIComponent(
        `Hi! I'm interested in ${service.keyword} and I'm based in ${location.name}. Can I book an appointment?`
    );
    const whatsappLink = `https://wa.me/${businessInfo.socials.whatsapp}?text=${whatsappMessage}`;

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />

                    <div className="container mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="text-sm text-muted-foreground mb-6">
                            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href="/prices" className="hover:text-gold transition-colors">Services</Link>
                            <span className="mx-2">/</span>
                            <span className="text-foreground">{service.keyword}</span>
                        </nav>

                        {/* Main Heading */}
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                            Professional <span className="text-gold italic">{service.keyword}</span>
                            <br />near <span className="text-gold">{location.name}</span>
                        </h1>

                        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                            Looking for the best {service.keyword} near {location.name}?
                            Discover why clients from {location.region} choose Galeo Beauty
                            for premium beauty treatments worth the drive.
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

                {/* Why Choose Us Section */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-8">
                            Why Choose Galeo Beauty for {service.keyword}?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Premium products from world-renowned brands",
                                "Experienced and certified therapists",
                                "Luxurious, relaxing environment",
                                "Competitive pricing with exceptional results",
                                "Easy booking via WhatsApp or phone",
                                "Convenient location near Hartbeespoort Dam",
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Location Info */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-serif text-3xl text-foreground mb-6">
                            {service.keyword} for {location.name} Residents
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            We proudly serve clients from <strong>{location.name}</strong> and the greater {location.region} area.
                            Galeo Beauty is conveniently located at {businessInfo.address.street}, {businessInfo.address.area},
                            making it an easy and scenic drive for your beauty appointment.
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                {category && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                More {category.title} Services
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Explore our full range of {category.title.toLowerCase()} treatments:
                            </p>
                            <Button asChild className="bg-gold hover:bg-gold-dark text-white rounded-full">
                                <Link href={`/prices/${category.id}`}>
                                    View {category.title} Menu
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section className="py-20 text-center bg-foreground text-background">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">
                            Ready for Your {service.keyword}?
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                            Book your appointment today and experience the Galeo Beauty difference.
                        </p>
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground h-14 px-10 text-lg rounded-full">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                Book Now via WhatsApp
                            </a>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
