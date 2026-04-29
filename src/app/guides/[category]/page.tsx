import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import {
    GUIDE_CATEGORY_SLUGS,
    getGuideCategoryLabel,
    getGuideCategorySummaries,
    getIntentPagesForGuideCategory,
} from "@/lib/intent-pages";
import { getCategoryById } from "@/lib/services-data";

interface PageProps {
    params: Promise<{ category: string }>;
}

export function generateStaticParams() {
    if (process.env.NODE_ENV === "development") return [];
    return GUIDE_CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const serviceCategory = getCategoryById(category);

    if (!serviceCategory) {
        return { title: "Guide Category Not Found" };
    }

    return {
        title: `${serviceCategory.title} Guides | Galeo Beauty`,
        description: `Browse Galeo Beauty ${serviceCategory.title.toLowerCase()} guides for treatment planning, comparisons, aftercare, and beauty concerns.`,
        alternates: {
            canonical: `https://www.galeobeauty.com/guides/${category}`,
        },
    };
}

export default async function GuideCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const serviceCategory = getCategoryById(category);
    const guides = getIntentPagesForGuideCategory(category);
    const otherCategories = getGuideCategorySummaries().filter((item) => item.id !== category).slice(0, 8);

    if (!serviceCategory || guides.length === 0) {
        notFound();
    }

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${serviceCategory.title} Guides`,
        url: `https://www.galeobeauty.com/guides/${category}`,
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://www.galeobeauty.com/${guide.slug}`,
            name: guide.title,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <Header />
            <main className="min-h-screen bg-background">
                <section className="border-b border-border/50 bg-white pt-28 pb-12 lg:pt-36 lg:pb-16">
                    <div className="container mx-auto px-4 text-center sm:px-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                            Treatment Guides
                        </p>
                        <h1 className="mx-auto mt-5 max-w-4xl font-sans text-[2rem] font-bold uppercase leading-[1.08] tracking-[0.08em] text-foreground sm:text-[2.6rem] lg:text-[3.3rem]">
                            {serviceCategory.title} Guides
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Compare treatments, understand concerns, and prepare for your {serviceCategory.title.toLowerCase()} appointment with Galeo Beauty.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                href={`/services/${serviceCategory.id}`}
                                className="inline-flex items-center justify-center bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                            >
                                View {serviceCategory.title} Services
                            </Link>
                            <Link
                                href="/guides"
                                className="inline-flex items-center justify-center border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
                            >
                                All Guides
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-stone-50/40 py-12 sm:py-16">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {guides.map((guide) => (
                                <Link
                                    key={guide.slug}
                                    href={`/${guide.slug}`}
                                    className="group border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_60px_-45px_rgba(0,0,0,0.35)]"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                        {getGuideCategoryLabel(category)}
                                    </p>
                                    <h2 className="mt-3 font-sans text-lg font-bold uppercase tracking-[0.06em] text-foreground transition-colors group-hover:text-gold">
                                        {guide.h1}
                                    </h2>
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                        {guide.heroDescription}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                                        Read guide
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {otherCategories.length > 0 && (
                    <section className="border-t border-border/40 bg-white py-12">
                        <div className="container mx-auto px-4 sm:px-6">
                            <h2 className="text-center font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem]">
                                More Guide Topics
                            </h2>
                            <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
                                {otherCategories.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/guides/${item.id}`}
                                        className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
