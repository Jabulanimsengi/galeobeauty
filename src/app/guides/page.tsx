import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { getGuideCategorySummaries, getPublishedIntentPages } from "@/lib/intent-pages";

export const metadata: Metadata = {
    title: "Beauty Treatment Guides | Galeo Beauty Hartbeespoort",
    description:
        "Browse Galeo Beauty treatment guides for skin, hair, nails, lashes, waxing, massage, IPL, aesthetics and beauty concerns in Hartbeespoort.",
    alternates: {
        canonical: "https://www.galeobeauty.com/guides",
    },
    openGraph: {
        title: "Beauty Treatment Guides | Galeo Beauty Hartbeespoort",
        description:
            "Helpful treatment guides for choosing the right beauty service at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/guides",
        type: "website",
    },
};

export default function GuidesPage() {
    const guides = getPublishedIntentPages().sort((a, b) => a.title.localeCompare(b.title));
    const guideCategories = getGuideCategorySummaries();
    const featuredGuides = guides.slice(0, 12);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Galeo Beauty Treatment Guides",
        url: "https://www.galeobeauty.com/guides",
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
                            Galeo Beauty Hartbeespoort
                        </p>
                        <h1 className="mx-auto mt-5 max-w-4xl font-sans text-[2rem] font-bold uppercase leading-[1.08] tracking-[0.08em] text-foreground sm:text-[2.6rem] lg:text-[3.3rem]">
                            Beauty Treatment Guides
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Practical guides for comparing treatments, understanding beauty concerns, and choosing the right next step before you book.
                        </p>
                    </div>
                </section>

                <section className="border-b border-border/40 bg-background py-12 sm:py-16">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Browse Guides by Topic
                            </h2>
                            <p className="mt-3 text-base leading-8 text-muted-foreground">
                                Start with the treatment category that matches what you are researching.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {guideCategories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/guides/${category.id}`}
                                    className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                        {category.count} guides
                                    </p>
                                    <h2 className="mt-3 font-sans text-lg font-bold uppercase tracking-[0.06em] text-foreground transition-colors group-hover:text-gold">
                                        {category.title}
                                    </h2>
                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                        {category.description}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                                        View topic
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-stone-50/40 py-12 sm:py-16">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Featured Guides
                            </h2>
                            <p className="mt-3 text-base leading-8 text-muted-foreground">
                                A selection of practical beauty guides from the full Galeo Beauty library.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {featuredGuides.map((guide) => (
                                <Link
                                    key={guide.slug}
                                    href={`/${guide.slug}`}
                                    className="group border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_60px_-45px_rgba(0,0,0,0.35)]"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                        {guide.eyebrow}
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
                        <div className="mt-10 text-center">
                            <p className="text-sm text-muted-foreground">
                                Use the topic links above to explore the full library of {guides.length} treatment guides.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
