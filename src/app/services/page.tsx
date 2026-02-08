import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { serviceCategories } from "@/lib/services-data";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
    title: "All Beauty Services | Treatments & Prices",
    description:
        "Browse 260+ beauty treatments at Galeo Beauty in Hartbeespoort. Facials, injectables, lash extensions, nails, IPL hair removal, permanent makeup, waxing, massages & more. View all services and book online.",
    keywords: [
        "beauty services Hartbeespoort",
        "salon treatments near me",
        "beauty treatments Pretoria",
        "facial treatments Hartbeespoort",
        "IPL hair removal prices",
        "nail salon services Hartbeespoort",
        "lash extensions services near me",
        "dermal fillers services Pretoria",
        "permanent makeup services Gauteng",
        "Galeo Beauty treatments",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/services",
    },
    openGraph: {
        title: "All Beauty Services | Galeo Beauty Hartbeespoort",
        description:
            "Browse 260+ beauty treatments. Facials, injectables, lash extensions, nails, IPL, permanent makeup & more.",
        url: "https://www.galeobeauty.com/services",
        type: "website",
    },
};

// Hair extension variant pattern — these are thin size/color combo pages
const HAIR_EXT_VARIANT = /^(tape|utip|microloop|clip|halo|ponytail|machine|butterfly|genius)-/;

export default function ServicesIndexPage() {
    // Count total services
    const totalServices = serviceCategories.reduce(
        (sum, cat) =>
            sum + cat.subcategories.reduce((s, sub) => s + sub.items.length, 0),
        0
    );

    // Schema markup
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.galeobeauty.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.galeobeauty.com/services",
            },
        ],
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Galeo Beauty Services",
        description: "Complete list of beauty service categories at Galeo Beauty Hartbeespoort",
        numberOfItems: serviceCategories.length,
        itemListElement: serviceCategories.map((cat, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: cat.title,
            url: `https://www.galeobeauty.com/services/${cat.id}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([breadcrumbSchema, itemListSchema]),
                }}
            />
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-gradient-to-b from-secondary/20 to-background">
                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6 border border-gold/20">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">{serviceCategories.length} Categories</span>
                        </div>

                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Our <span className="text-gold">Services</span>
                        </h1>

                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
                            Explore our comprehensive range of beauty and wellness treatments. Select a category below to view detailed services and pricing.
                        </p>
                    </div>
                </section>

                {/* Categories List */}
                <section className="pb-20 px-6">
                    <div className="container mx-auto max-w-3xl space-y-4">
                        {serviceCategories.map((category) => {
                            return (
                                <Link
                                    key={category.id}
                                    href={`/services/${category.id}`}
                                    className="group flex items-center justify-between px-6 py-4 bg-neutral-900 text-white rounded-full hover:bg-gold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    <span className="text-base sm:text-lg font-medium group-hover:text-white transition-colors">
                                        {category.title}
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                            Need Assistance?
                        </h2>
                        <p className="text-background/70 max-w-2xl mx-auto mb-8">
                            Unsure which treatment is right for you? Contact us for a personalized consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/prices"
                                className="inline-flex items-center gap-2 border border-background/30 hover:border-background/60 text-background px-8 py-3 rounded-full font-semibold transition-colors"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
