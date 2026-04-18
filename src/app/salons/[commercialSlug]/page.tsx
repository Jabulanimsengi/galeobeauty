import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { Star, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import {
    getCommercialPageBySlug,
    getCommercialPageParams,
    isCommercialPageIndexable,
} from "@/lib/commercial-seo";
import { getAllSEOServices } from "@/lib/seo-data";
import { getIntentPagesForCategory } from "@/lib/intent-pages";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
    return getCommercialPageParams();
}

export async function generateMetadata({ params }: { params: Promise<{ commercialSlug: string }> }): Promise<Metadata> {
    const { commercialSlug } = await params;
    const page = getCommercialPageBySlug(commercialSlug);

    if (!page) {
        return { title: "Location Not Found" };
    }

    const title = `${page.modifierLabel} ${page.categoryName} in ${page.locationName} | Galeo Beauty`;
    const description = `Browse Galeo Beauty services relevant to ${page.locationName} and explore treatments across ${page.categoryName.toLowerCase()}.`;

    return {
        title,
        description,
        robots: {
            index: isCommercialPageIndexable(page),
            follow: true,
        },
        alternates: {
            canonical: `https://www.galeobeauty.com/salons/${page.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.galeobeauty.com/salons/${page.slug}`,
            type: "website",
            images: [
                {
                    url: "https://www.galeobeauty.com/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
                    alt: `${page.categoryName} in ${page.locationName}`,
                },
            ],
        },
    };
}

export default async function CommercialPage({ params }: { params: Promise<{ commercialSlug: string }> }) {
    const { commercialSlug } = await params;
    const page = getCommercialPageBySlug(commercialSlug);

    if (!page) {
        notFound();
    }

    const allServices = getAllSEOServices();
    const matchedServices = allServices
        .filter((service) => page.targetSystemCategoryIds.includes(service.categoryId))
        .slice(0, 8);
    const relatedPages = page.targetSystemCategoryIds
        .flatMap((categoryId) => getIntentPagesForCategory(categoryId))
        .filter((guide, index, guides) => guides.findIndex((candidate) => candidate.slug === guide.slug) === index)
        .slice(0, 3);
    const isBudget = page.intent === "budget";

    return (
        <>
            <Header />
            <main className="bg-background">
                <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
                    <div className="absolute right-0 top-0 -z-10 h-full w-2/3 skew-x-12 bg-secondary/5" />
                    <div className="container mx-auto max-w-6xl">
                        <div className="max-w-3xl">
                            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <Link href="/" className="transition-colors hover:text-gold">
                                    Home
                                </Link>
                                <span>/</span>
                                <Link href="/salons" className="transition-colors hover:text-gold">
                                    Salon Directory
                                </Link>
                                <span>/</span>
                                <span className="text-foreground">{page.locationName}</span>
                            </div>

                            <h1 className="mb-6 font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                <span className="text-gold">{page.modifierLabel}</span> {page.categoryName} in {page.locationName}
                            </h1>

                            <div className="mb-8 space-y-4 text-base text-muted-foreground sm:text-lg">
                                <p className="font-medium leading-8 text-foreground/80">
                                    Looking for a trusted {page.categoryName.toLowerCase()} option within reach of {page.locationName}?
                                </p>
                                <p className="leading-8">
                                    {isBudget
                                        ? "This directory page highlights services that give budget-conscious clients a practical place to start. We keep it live for navigation, but we only plan to index pages once they have enough unique local proof and comparisons to earn search visibility."
                                        : "This page gives you a quick overview of the category, the nearby service mix, and the treatments most relevant to this area. We are keeping commercial directory pages accessible while we upgrade them with stronger location-specific proof."}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark">
                                    <NavLink href="/prices">Explore All Prices</NavLink>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/contact">Get Directions</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-20">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
                                Popular {page.categoryName} Services
                            </h2>
                            <p className="mt-4 text-muted-foreground">
                                Explore some of our most booked treatments for clients traveling from or near {page.locationName}.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {matchedServices.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/prices/${service.categoryId}/${service.slug}`}
                                    className="group rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:border-gold/50 hover:shadow-lg"
                                >
                                    <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                                        {service.keyword}
                                    </h3>
                                    <p className="mb-4 text-lg font-bold text-muted-foreground">{service.price}</p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gold">
                                        <span>View details</span>
                                        <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-secondary/10 py-20">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid gap-10 md:grid-cols-3">
                            <div className="flex flex-col gap-3">
                                <Star className="h-8 w-8 text-gold" />
                                <h3 className="font-serif text-xl font-semibold">Trusted Service Mix</h3>
                                <p className="text-muted-foreground">
                                    Use this page as a quick way to compare the treatments in this category before you move into the detailed service pages.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <CheckCircle className="h-8 w-8 text-gold" />
                                <h3 className="font-serif text-xl font-semibold">Canonical Next Steps</h3>
                                <p className="text-muted-foreground">
                                    Every card above takes you to the actual treatment page, so you can check pricing, fit, and booking details without guesswork.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <MapPin className="h-8 w-8 text-gold" />
                                <h3 className="font-serif text-xl font-semibold">Location Context</h3>
                                <p className="text-muted-foreground">
                                    We keep directory pages live for nearby-area discovery while we rewrite them with stronger proof, travel context, and local relevance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {page.locationName !== "Hartbeespoort" && (
                    <section className="bg-foreground py-20 text-background">
                        <div className="container mx-auto max-w-4xl px-4 text-center">
                            <h2 className="mb-6 font-serif text-3xl sm:text-4xl">The Hartbeespoort Destination Experience</h2>
                            <p className="mb-8 text-lg leading-relaxed text-background/80">
                                While we serve clients from {page.locationName}, our flagship studio is located in the secure, tranquil environment of Hartbeespoort Estate. Many clients find the drive becomes part of the reset, giving them a calmer and more focused beauty experience than a busy mall setting.
                            </p>
                            <div className="inline-block rounded-2xl border border-gold/30 bg-gold/5 p-6">
                                <p className="font-sans font-medium text-gold">Why drive from {page.locationName}?</p>
                                <p className="text-sm text-background/60">
                                    Secure parking | Estate tranquility | Medical-grade privacy | Estate cafe access
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {relatedPages.length > 0 && (
                    <section className="bg-white py-20">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <div className="mb-12">
                                <h2 className="mb-4 font-serif text-3xl text-foreground">Expert {page.categoryName} Insights</h2>
                                <p className="text-muted-foreground">
                                    Read our professional guides before you choose a service.
                                </p>
                            </div>
                            <div className="grid gap-8 md:grid-cols-3">
                                {relatedPages.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/${guide.slug}`}
                                        className="group block border-b border-border pb-8"
                                    >
                                        <h3 className="mb-3 font-serif text-xl transition-colors group-hover:text-gold">
                                            {guide.title}
                                        </h3>
                                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                                            {guide.metaDescription}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                                            Read guide <ArrowRight className="h-3 w-3" />
                                        </div>
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
