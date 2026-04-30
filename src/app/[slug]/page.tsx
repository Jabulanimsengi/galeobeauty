import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { getCategoryById } from "@/lib/services-data";
import { buildIntentPageMetadataKeywords } from "@/lib/seo-keywords";
import {
    getPublishedIntentPages,
    getIntentPageBySlug,
    getIntentPageRedirectPath,
    getIntentPageServiceLinks,
    canonicalizeIntentPageHref,
    isIntentPageIndexable,
    getGuideCategoryLabel,
    getPrimaryGuideCategoryId,
    getRelatedIntentPages,
} from "@/lib/intent-pages";
import { resolveIntentPageHeroImage } from "@/lib/editorial-image-resolver";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

function IntentPageMdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
    const resolvedHref = canonicalizeIntentPageHref(href);

    if (resolvedHref.startsWith("/")) {
        return <Link href={resolvedHref} {...props} />;
    }

    return <a href={resolvedHref} {...props} />;
}

export function generateStaticParams() {
    if (process.env.NODE_ENV === "development") return [];
    return getPublishedIntentPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const redirectPath = getIntentPageRedirectPath(slug);

    if (redirectPath) {
        return {
            title: "Redirecting...",
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    const page = getIntentPageBySlug(slug);

    if (!page || !isIntentPageIndexable(page)) {
        return {
            title: "Page Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const heroImage = resolveIntentPageHeroImage({
        title: page.title,
        description: `${page.heroDescription} ${page.whyItHappens} ${page.treatmentApproach}`,
        categoryIds: page.categoryIds,
        serviceSlugs: page.serviceSlugs,
        fallbackImage: page.heroImage,
        fallbackAlt: page.heroImageAlt,
    });

    return {
        title: page.metaTitle,
        description: page.metaDescription,
        keywords: buildIntentPageMetadataKeywords(page),
        alternates: {
            canonical: `https://www.galeobeauty.com/${page.slug}`,
        },
        openGraph: {
            title: page.metaTitle,
            description: page.metaDescription,
            url: `https://www.galeobeauty.com/${page.slug}`,
            type: "website",
            images: [{ url: heroImage.image, alt: heroImage.imageAlt }],
        },
        twitter: {
            card: "summary_large_image",
            title: page.metaTitle,
            description: page.metaDescription,
            images: [heroImage.image],
        },
    };
}

export default async function IntentLandingPage({ params }: PageProps) {
    const { slug } = await params;
    const redirectPath = getIntentPageRedirectPath(slug);

    if (redirectPath) {
        permanentRedirect(redirectPath);
    }

    const page = getIntentPageBySlug(slug);

    if (!page || !isIntentPageIndexable(page)) {
        notFound();
    }

    const categoryLinks = page.categoryIds
        .map((categoryId) => getCategoryById(categoryId))
        .filter((category): category is NonNullable<typeof category> => Boolean(category))
        .map((category) => ({
            label: category.title,
            href: `/services/${category.id}`,
            description: category.subtitle,
        }));

    const serviceLinks = getIntentPageServiceLinks(page);
    const primaryGuideCategoryId = getPrimaryGuideCategoryId(page);
    const relatedGuides = getRelatedIntentPages(page, 6);
    const heroImage = resolveIntentPageHeroImage({
        title: page.title,
        description: `${page.heroDescription} ${page.whyItHappens} ${page.treatmentApproach}`,
        categoryIds: page.categoryIds,
        serviceSlugs: page.serviceSlugs,
        fallbackImage: page.heroImage,
        fallbackAlt: page.heroImageAlt,
    });
    const breadcrumbs: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        { label: getGuideCategoryLabel(primaryGuideCategoryId), href: `/guides/${primaryGuideCategoryId}` },
        { label: page.h1 },
    ];
    const sectionLinks = [
        { href: "#overview", label: "Overview" },
        { href: "#options", label: "Options" },
        { href: "#related", label: "Related" },
        { href: "#faq", label: "FAQ" },
        { href: "#book", label: "Book" },
    ];

    const whatsappMessage =
        `Hi! I found you on www.galeobeauty.com and I want help with ${page.title}. Can you recommend the right treatment?`;
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.galeobeauty.com" },
            { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.galeobeauty.com/guides" },
            { "@type": "ListItem", position: 3, name: getGuideCategoryLabel(primaryGuideCategoryId), item: `https://www.galeobeauty.com/guides/${primaryGuideCategoryId}` },
            { "@type": "ListItem", position: 4, name: page.h1, item: `https://www.galeobeauty.com/${page.slug}` },
        ],
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.metaTitle,
        description: page.metaDescription,
        url: `https://www.galeobeauty.com/${page.slug}`,
        about: page.primaryKeywords,
        audience: page.audiences.map((audience) => ({
            "@type": "Audience",
            audienceType: audience,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, breadcrumbSchema, articleSchema]) }}
            />
            <Header />
            <main className="bg-background min-h-screen">
                <div className="bg-secondary/15">
                    <Breadcrumbs items={breadcrumbs} />
                </div>

                <section id="overview" className="pb-20 pt-10 lg:pb-24">
                    <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                        <div className="space-y-8">
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-px w-10 bg-gold" />
                                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                                        {page.eyebrow}
                                    </span>
                                </div>
                                <h1 className="font-sans text-4xl text-foreground sm:text-5xl lg:text-6xl">
                                    {page.h1}
                                </h1>
                            </div>

                            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                                <p>{page.heroDescription}</p>
                                <p>{page.whyItHappens}</p>
                                <p>{page.treatmentApproach}</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg" className="rounded-none bg-gold text-foreground hover:bg-gold-dark">
                                    <TrackedWhatsAppLink
                                        message={whatsappMessage}
                                        trackingContext={`intent_page_hero_${page.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Book via WhatsApp
                                    </TrackedWhatsAppLink>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="rounded-none">
                                    <Link href="/contact">Contact the Salon</Link>
                                </Button>
                            </div>

                        </div>

                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <div className="overflow-hidden border border-border bg-secondary/20 shadow-2xl [border-radius:0]">
                                <div className="relative aspect-square w-full [border-radius:0]">
                                    <CloudinaryImage
                                        src={heroImage.image}
                                        alt={heroImage.imageAlt}
                                        fill
                                        priority
                                        className="object-contain [border-radius:0]"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-border/30 bg-background/95 py-4 backdrop-blur-sm">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {sectionLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="border border-gold/20 bg-secondary/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="mb-10 max-w-3xl">
                            <h2 className="font-sans text-3xl text-foreground sm:text-4xl">How Galeo Guides This Journey</h2>
                            <p className="mt-3 text-muted-foreground">
                                Every concern needs a thoughtful treatment path. We use consultation, skin or treatment assessment,
                                and realistic planning to guide clients toward the most suitable next step.
                            </p>
                        </div>

                        <div className="prose prose-p:text-muted-foreground prose-headings:font-sans prose-headings:text-foreground prose-a:text-gold max-w-none border border-border bg-secondary/10 p-8 md:p-12">
                            <MDXRemote
                                source={page.content}
                                components={{
                                    a: IntentPageMdxLink,
                                }}
                            />
                        </div>
                    </div>
                </section>

                <section id="options" className="bg-secondary/15 py-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h2 className="mb-4 font-sans text-3xl text-foreground">Recommended Treatment Options</h2>
                                <p className="mb-6 text-muted-foreground">
                                    These treatment options are often the most relevant next step for this concern, depending on
                                    your goals, comfort level, maintenance preference and desired result.
                                </p>
                                <div id="related" className="space-y-4">
                                    {serviceLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="block border border-border bg-background p-5 transition-colors hover:border-gold/50"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-medium text-foreground">{link.label}</h3>
                                                    <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                                                </div>
                                                <span className="text-sm font-medium text-gold">View treatment</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 font-sans text-3xl text-foreground">Explore Related Services</h2>
                                <p className="mb-6 text-muted-foreground">
                                    If you are still exploring, these broader service collections can help you compare treatments,
                                    understand the menu more clearly, and decide what feels like the right fit.
                                </p>
                                <div className="space-y-4">
                                    {categoryLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="block border border-border bg-background p-5 transition-colors hover:border-gold/50"
                                        >
                                            <h3 className="font-medium text-foreground">{link.label}</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-8 border border-gold/20 bg-background p-6">
                                    <h3 className="font-sans text-2xl text-foreground">Best For</h3>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {page.bestFor.map((item) => (
                                            <span key={item} className="bg-gold/10 px-3 py-1.5 text-sm text-gold">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faq" className="py-16">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                        <h2 className="mb-8 text-center font-sans text-3xl text-foreground sm:text-4xl">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {page.faqs.map((faq) => (
                                <details key={faq.question} className="group border border-border bg-background p-6">
                                    <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-foreground marker:hidden">
                                        {faq.question}
                                    </summary>
                                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {relatedGuides.length > 0 && (
                    <section className="border-y border-border/40 bg-stone-50/70 py-16">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <div className="mx-auto mb-10 max-w-3xl text-center">
                                <h2 className="font-sans text-3xl text-foreground sm:text-4xl">Related Guides</h2>
                                <p className="mt-3 text-muted-foreground">
                                    Continue reading related Galeo Beauty guides before choosing your treatment.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {relatedGuides.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/${guide.slug}`}
                                        className="group border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                            {getGuideCategoryLabel(getPrimaryGuideCategoryId(guide))}
                                        </p>
                                        <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                                            {guide.h1}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {guide.heroDescription}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="book" className="bg-stone-50/70 px-4 py-16 sm:px-6 lg:py-20">
                    <div className="mx-auto max-w-4xl border border-[#2b2b2f] bg-[#171719] p-8 text-center text-white sm:p-10 lg:p-12">
                        <h2 className="font-sans text-3xl sm:text-4xl">Need help choosing the right treatment?</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-white/70">
                            Tell us what you&apos;d like to improve and the results you&apos;re looking for. Our team will recommend the most relevant next step instead of making you guess from the menu.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="rounded-none bg-gold text-foreground hover:bg-gold-dark">
                                <TrackedWhatsAppLink
                                    message={whatsappMessage}
                                    trackingContext={`intent_page_cta_${page.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ask on WhatsApp
                                </TrackedWhatsAppLink>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-none border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                                <Link href="/services">Browse All Services</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
