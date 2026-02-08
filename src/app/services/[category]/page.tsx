import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { ArrowRight, Clock, Star, CheckCircle } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { businessInfo } from "@/lib/constants";

//============================================
// DYNAMIC CATEGORY PAGES
// ============================================

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

// Generate static params for all categories
export function generateStaticParams() {
    return serviceCategories.map((category) => ({
        category: category.id,
    }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = serviceCategories.find((c) => c.id === categoryId);

    if (!category) {
        return { title: "Category Not Found" };
    }

    return {
        title: `${category.title} Services | Galeo Beauty Hartbeespoort`,
        description: `Everything you need to know about ${category.title} at Galeo Beauty. Professional treatments via ${category.subtitle}. Book your appointment today!`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categoryId } = await params;
    const category = serviceCategories.find((c) => c.id === categoryId);

    if (!category) {
        notFound();
    }

    const Icon = category.Icon;

    return (
        <>
            <Header />
            <main className="bg-background min-h-[110vh] overflow-x-hidden">
                {/* Hero Section */}
                {/* Hero Section */}
                <section className="pt-32 pb-10 px-4 md:px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="relative bg-black text-white rounded-[2.5rem] overflow-hidden p-8 md:p-12 lg:p-16">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-2/3 h-full bg-zinc-900/50 -z-0 skew-x-12 pointer-events-none" />

                            <div className="relative z-10 max-w-3xl">
                                {/* Breadcrumb */}
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                                    <span>/</span>
                                    <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                                    <span>/</span>
                                    <span className="text-white">{category.title}</span>
                                </div>

                                <div className="mb-6">
                                    <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm">
                                        {category.subtitle}
                                    </span>
                                </div>

                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
                                    {category.title}
                                </h1>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-black border-none rounded-full px-8">
                                        <NavLink href={`/prices?category=${category.id}`}>Book Appointment</NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Subcategories & Services List */}
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-5xl space-y-16">
                        {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="scroll-mt-24" id={subcategory.id}>
                                <div className="flex items-baseline gap-4 mb-8 border-b border-border/50 pb-4">
                                    <h2 className="font-serif text-3xl text-foreground">
                                        {subcategory.title}
                                    </h2>
                                    {subcategory.note && (
                                        <span className="text-sm font-medium text-gold px-3 py-1 rounded-full bg-gold/10">
                                            {subcategory.note}
                                        </span>
                                    )}
                                </div>

                                <div className="grid gap-4">
                                    {subcategory.items.map((service) => (
                                        <Link
                                            key={service.id}
                                            href={`/services/${category.id}/${service.id}`}
                                            className="group block bg-card hover:bg-secondary/5 rounded-xl border border-border/50 hover:border-gold/30 p-6 transition-all duration-300 hover:shadow-md"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="font-semibold text-lg text-foreground group-hover:text-gold transition-colors">
                                                            {service.name}
                                                        </h3>
                                                        <ArrowRight className="w-4 h-4 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                    </div>

                                                    {service.description && (
                                                        <p className="text-muted-foreground text-sm max-w-2xl">
                                                            {service.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-6 text-sm font-medium flex-shrink-0">
                                                    {service.duration && (
                                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{service.duration}</span>
                                                        </div>
                                                    )}
                                                    <div className="text-gold font-bold text-base min-w-[80px] text-right">
                                                        {service.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto max-w-4xl text-center px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Ready to Experience our {category.title}?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Book your appointment today and let our experts take care of you.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href={`/prices?category=${category.id}`}>Book Now</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <a href={`tel:${businessInfo.phone}`}>Call {businessInfo.phone}</a>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
