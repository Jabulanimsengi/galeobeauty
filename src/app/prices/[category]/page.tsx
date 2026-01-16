import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import { serviceCategories, getCategoryById } from "@/lib/services-data";
import { CategoryContent } from "./category-content";

// SEO-optimized metadata for each category
const categoryMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
    facials: {
        title: "Facial Treatments & Skincare",
        description: "Premium facials including anti-ageing, moisturising, and medical-grade skin treatments. Professional skincare services in Hartbeespoort.",
        keywords: ["facials Hartbeespoort", "anti-ageing facial", "skin treatment", "skincare spa"],
    },
    nails: {
        title: "Nail Services & Pedicures",
        description: "Professional acrylic nails, gel overlays, and medical pedicures. Hygienic nail artistry at Galeo Beauty Hartbeespoort.",
        keywords: ["nail salon", "acrylic nails", "gel nails", "pedicure", "nail art Hartbeespoort"],
    },
    lashes: {
        title: "Lash Extensions & Brow Services",
        description: "Russian volume lashes, silk lash extensions, and brow tinting. Certified lash technicians at Galeo Beauty.",
        keywords: ["lash extensions", "Russian volume lashes", "brow tint", "eyelash salon Hartbeespoort"],
    },
    waxing: {
        title: "Waxing Services",
        description: "Professional waxing including Brazilian, Hollywood, and full body waxing. Gentle techniques for smooth, lasting results.",
        keywords: ["waxing salon", "Brazilian wax", "Hollywood wax", "body waxing Hartbeespoort"],
    },
    makeup: {
        title: "Make-up & Permanent Make-up",
        description: "Professional Kryolan make-up, bridal packages, and permanent make-up including Phi-Brows and lip contour.",
        keywords: ["bridal makeup", "permanent makeup", "Phi-Brows", "wedding makeup Hartbeespoort"],
    },
    ipl: {
        title: "IPL Laser Hair Removal",
        description: "CE-approved IPL laser hair removal for ladies and gents. Permanent hair reduction on face, body, and intimate areas.",
        keywords: ["IPL hair removal", "laser hair removal", "permanent hair removal Hartbeespoort"],
    },
    slimming: {
        title: "Slimming & Body Contouring",
        description: "Cryolipolysis fat freeze treatments for chin, arms, stomach, and love handles. Non-invasive body sculpting with visible results.",
        keywords: ["cryolipolysis", "fat freeze", "body contouring", "slimming treatment Hartbeespoort"],
    },
};

// Generate static paths for all categories
export function generateStaticParams() {
    return serviceCategories.map((category) => ({
        category: category.id,
    }));
}

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);
    const meta = categoryMeta[categoryId];

    if (!category || !meta) {
        return { title: "Service Not Found" };
    }

    return {
        title: `${meta.title} | Prices`,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: {
            title: `${meta.title} | Galeo Beauty`,
            description: meta.description,
            type: "website",
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6">
                        {/* Breadcrumb */}
                        <Link
                            href="/prices"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6 text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Services
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <TrustBadge variant={category.badgeVariant}>
                                    {category.badge}
                                </TrustBadge>
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
                                {category.title}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl">
                                {category.subtitle}. Browse our treatments and book your appointment today.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Price Groups - Client Component for animations */}
                <CategoryContent subcategories={category.subcategories} />

                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to book your {category.title.toLowerCase()} treatment?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-lg mx-auto">
                            Our specialists are ready to help you achieve your beauty goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-10">
                                <Link href="/booking">
                                    Book Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground px-10">
                                <Link href="/prices">
                                    View All Services
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
