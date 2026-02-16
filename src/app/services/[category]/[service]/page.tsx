import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { NearbyLocationsSection } from "@/components/sections/NearbyLocationsSection";
import { Button } from "@/components/ui/button";
import { ServiceBookingButton } from "@/components/booking/ServiceBookingButton";
import { NavLink } from "@/components/ui/nav-link";
import { CheckCircle, Clock, MapPin, ArrowRight, Star } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { getAllSEOServices, getAllServiceParams } from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";
import { generateServiceDescription, generateServiceBenefits } from "@/lib/seo-generator";

//============================================
// DYNAMIC SERVICE PAGES FOR ALL 262 TREATMENTS
// ============================================
// Auto-generates SEO-optimized pages for every service
// Targets generic keywords like "gel nails", "microblading", etc.

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

// Generate static pages for all 262 services
export function generateStaticParams() {
    return getAllServiceParams();
}

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }): Promise<Metadata> {
    const { category: categoryId, service: serviceSlug } = await params;
    const allServices = getAllSEOServices();
    const service = allServices.find((s) => s.slug === serviceSlug && s.categoryId === categoryId);

    if (!service) {
        return { title: "Service Not Found" };
    }

    const category = serviceCategories.find((c) => c.id === service.categoryId);
    const subcategory = category?.subcategories.find(sub => sub.id === service.subcategoryId);

    const categoryTitle = category?.title || "Beauty Services";
    const subcategoryTitle = subcategory?.title || "";

    // Generate a rich description if one is missing
    const description = generateServiceDescription(
        // @ts-ignore - mapping simplified for this utility
        { ...service, name: service.keyword },
        categoryTitle,
        subcategoryTitle
    );

    const kw = service.keyword.toLowerCase();

    return {
        title: `${service.keyword} ${service.price} | ${categoryTitle} Hartbeespoort`,
        description: description.substring(0, 160), // Truncate for meta description
        keywords: [
            `${kw} Hartbeespoort`,
            `${kw} near me`,
            `${kw} prices South Africa`,
            `${kw} Pretoria`,
            `best ${kw} near me`,
            `affordable ${kw}`,
            `how much does ${kw} cost`,
            categoryTitle.toLowerCase(),
            subcategoryTitle.toLowerCase(),
            "Galeo Beauty",
        ],
        alternates: {
            canonical: `https://www.galeobeauty.com/services/${categoryId}/${service.slug}`,
        },
        openGraph: {
            title: `${service.keyword} - ${service.price}`,
            description: description.substring(0, 200),
            url: `https://www.galeobeauty.com/services/${categoryId}/${service.slug}`,
            type: "website",
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
    const { category: categoryId, service: serviceSlug } = await params;

    // Validate that category matches the service
    const allServices = getAllSEOServices();
    const service = allServices.find((s) => s.slug === serviceSlug);

    if (!service || service.categoryId !== categoryId) {
        notFound();
    }

    // Get full service details
    const category = serviceCategories.find((c) => c.id === service.categoryId);
    const subcategory = category?.subcategories.find((sc) => sc.id === service.subcategoryId);
    const fullServiceItem = subcategory?.items.find((item) => item.id === service.itemId);

    if (!category || !fullServiceItem) {
        notFound();
    }

    // Get related services from same category (max 6)
    const relatedServices = allServices
        .filter((s) => s.categoryId === service.categoryId && s.slug !== service.slug)
        .slice(0, 6);

    // Generate dynamic content
    const categoryTitle = category.title;
    const subcategoryTitle = subcategory?.title || "";

    const richDescription = generateServiceDescription(fullServiceItem, categoryTitle, subcategoryTitle);
    const benefits = generateServiceBenefits(categoryTitle, subcategoryTitle);

    // JSON-LD Structured Data
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${service.keyword} at Galeo Beauty`,
        description: richDescription,
        serviceType: [service.keyword, category.title, subcategoryTitle, "Beauty Treatment"].filter(Boolean),
        provider: {
            "@type": "BeautySalon",
            name: "Galeo Beauty Salon & Spa",
            image: "https://www.galeobeauty.com/images/logo.png",
            priceRange: "$$",
            address: {
                "@type": "PostalAddress",
                streetAddress: businessInfo.address.street,
                addressLocality: "Hartbeespoort",
                addressRegion: "North West",
                postalCode: "0216",
                addressCountry: "ZA",
            },
            telephone: businessInfo.phone,
            url: "https://www.galeobeauty.com",
        },
        offers: {
            "@type": "Offer",
            price: service.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "ZAR",
            availability: "https://schema.org/InStock",
        },
        areaServed: [
            { "@type": "City", name: "Hartbeespoort" },
            { "@type": "City", name: "Pretoria" },
            { "@type": "City", name: "Johannesburg" },
        ],
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.galeobeauty.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.galeobeauty.com/services" },
            { "@type": "ListItem", position: 3, name: category.title, item: `https://www.galeobeauty.com/services/${category.id}` },
            { "@type": "ListItem", position: 4, name: service.keyword, item: `https://www.galeobeauty.com/services/${category.id}/${service.slug}` },
        ],
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
            />
            <Header />
            <main className="bg-background">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/10 -z-10 skew-x-12" />
                    <div className="container mx-auto max-w-6xl">
                        <div className="max-w-3xl">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                                <span>/</span>
                                <Link href={`/services/${category.id}`} className="hover:text-gold transition-colors">{category.title}</Link>
                                <span>/</span>
                                <span className="text-foreground">{service.keyword}</span>
                            </div>

                            {/* Category Badge */}
                            <span className="inline-block text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">
                                {category.title}
                            </span>

                            {/* Title */}
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                {service.keyword}
                            </h1>

                            {/* Description - NOW DYNAMICALLY GENERATED */}
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                {richDescription}
                            </p>

                            {/* Quick Info + Book Button */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex flex-wrap items-center gap-6">
                                    <span className="text-2xl font-bold text-gold">{service.price}</span>
                                    {service.duration && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="w-5 h-5" />
                                            <span>{service.duration}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-5 h-5" />
                                        <span>Hartbeespoort</span>
                                    </div>
                                </div>
                                <ServiceBookingButton
                                    item={fullServiceItem}
                                    categoryId={category.id}
                                    categoryTitle={category.title}
                                    subcategoryId={subcategory?.id || ""}
                                    subcategoryTitle={subcategory?.title || ""}
                                />
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4">
                                <Button asChild size="lg" variant="outline">
                                    <NavLink href={`/services/${category.id}`}>View All {category.title}</NavLink>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section - DYNAMIC */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
                            Why Choose {service.keyword}?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-6 bg-secondary/5 rounded-xl">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Note (if exists) */}
                {fullServiceItem.note && (
                    <section className="py-12 bg-secondary/5">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <div className="bg-white p-6 rounded-xl border border-gold/20">
                                <p className="text-muted-foreground text-sm">
                                    <strong>Note:</strong> {fullServiceItem.note}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 text-center">
                                Related Treatments
                            </h2>
                            <p className="text-muted-foreground text-center mb-12">
                                Explore more {category.title.toLowerCase()} services
                            </p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedServices.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/services/${category.id}/${related.slug}`}
                                        className="group p-6 bg-secondary/5 rounded-xl border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                                    >
                                        <h3 className="font-semibold text-lg text-foreground group-hover:text-gold transition-colors mb-2">
                                            {related.keyword}
                                        </h3>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>{related.price}</span>
                                            {related.duration && <span>{related.duration}</span>}
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>Learn more</span>
                                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Nearby Locations - Internal Linking for SEO */}
                <NearbyLocationsSection serviceName={service.keyword} />

                {/* CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-br from-secondary/20 to-background">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Ready to Book Your {service.keyword}?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Experience professional beauty treatments at Galeo Beauty in Hartbeespoort
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href={`/prices?category=${category.id}`}>Book Appointment</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <a href={`tel:${businessInfo.phone}`}>Call {businessInfo.phone}</a>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-gold fill-gold" />
                                <span>Certified Professionals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-gold" />
                                <span>Premium Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gold" />
                                <span>Flexible Scheduling</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
