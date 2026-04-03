import type { Metadata } from "next";
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
} from "@/lib/intent-pages";
import { limitStaticParams } from "@/lib/build-config";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
    return limitStaticParams(
        getPublishedIntentPages().map((page) => ({ slug: page.slug })),
        "intentPages"
    );
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

    if (!page) {
        return { title: "Page Not Found" };
    }

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
            images: [{ url: page.heroImage, alt: page.heroImageAlt }],
        },
        twitter: {
            card: "summary_large_image",
            title: page.metaTitle,
            description: page.metaDescription,
            images: [page.heroImage],
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

    if (!page) {
        notFound();
    }

    const categoryLinks = page.categoryIds
        .map((categoryId) => getCategoryById(categoryId))
        .filter((category): category is NonNullable<typeof category> => Boolean(category))
        .map((category) => ({
            label: category.title,
            href: `/prices/${category.id}`,
            description: category.subtitle,
        }));

    const serviceLinks = getIntentPageServiceLinks(page);
    const breadcrumbs: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/prices" },
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
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.galeobeauty.com/prices" },
            { "@type": "ListItem", position: 3, name: page.h1, item: `https://www.galeobeauty.com/${page.slug}` },
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
                                <h1 className="font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">
                                    {page.h1}
                                </h1>
                            </div>

                            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                                <p>{page.heroDescription}</p>
                                <p>{page.whyItHappens}</p>
                                <p>{page.treatmentApproach}</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground">
                                    <TrackedWhatsAppLink
                                        message={whatsappMessage}
                                        trackingContext={`intent_page_hero_${page.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Book via WhatsApp
                                    </TrackedWhatsAppLink>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/contact">Contact the Salon</Link>
                                </Button>
                            </div>

                        </div>

                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                                <div className="relative aspect-[4/5] w-full">
                                    <CloudinaryImage
                                        src={page.heroImage}
                                        alt={page.heroImageAlt}
                                        fill
                                        priority
                                        className="object-cover"
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
                                    className="rounded-full border border-gold/20 bg-secondary/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
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
                            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">How Galeo Guides This Journey</h2>
                            <p className="mt-3 text-muted-foreground">
                                Every concern needs a thoughtful treatment path. We use consultation, skin or treatment assessment,
                                and realistic planning to guide clients toward the most suitable next step.
                            </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {page.sections.map((section) => (
                                <article key={section.title} className="rounded-2xl border border-border bg-secondary/10 p-6">
                                    <h3 className="mb-3 font-serif text-2xl text-foreground">{section.title}</h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="options" className="bg-secondary/15 py-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h2 className="mb-4 font-serif text-3xl text-foreground">Recommended Treatment Options</h2>
                                <p className="mb-6 text-muted-foreground">
                                    These treatment options are often the most relevant next step for this concern, depending on
                                    your goals, comfort level, maintenance preference and desired result.
                                </p>
                                <div id="related" className="space-y-4">
                                    {serviceLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="block rounded-2xl border border-border bg-background p-5 transition-colors hover:border-gold/50"
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
                                <h2 className="mb-4 font-serif text-3xl text-foreground">Explore Related Services</h2>
                                <p className="mb-6 text-muted-foreground">
                                    If you are still exploring, these broader service collections can help you compare treatments,
                                    understand the menu more clearly, and decide what feels like the right fit.
                                </p>
                                <div className="space-y-4">
                                    {categoryLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="block rounded-2xl border border-border bg-background p-5 transition-colors hover:border-gold/50"
                                        >
                                            <h3 className="font-medium text-foreground">{link.label}</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-2xl border border-gold/20 bg-background p-6">
                                    <h3 className="font-serif text-2xl text-foreground">Best For</h3>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {page.bestFor.map((item) => (
                                            <span key={item} className="rounded-full bg-gold/10 px-3 py-1.5 text-sm text-gold">
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
                        <h2 className="mb-8 text-center font-serif text-3xl text-foreground sm:text-4xl">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {page.faqs.map((faq) => (
                                <details key={faq.question} className="rounded-2xl border border-border bg-background p-6 group">
                                    <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-foreground marker:hidden">
                                        {faq.question}
                                    </summary>
                                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="book" className="bg-foreground py-20 text-background">
                    <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
                        <h2 className="font-serif text-3xl sm:text-4xl">Need help choosing the right treatment?</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-background/70">
                            Tell us what you&apos;d like to improve and the results you&apos;re looking for. Our team will recommend the most relevant next step instead of making you guess from the menu.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground">
                                <TrackedWhatsAppLink
                                    message={whatsappMessage}
                                    trackingContext={`intent_page_cta_${page.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ask on WhatsApp
                                </TrackedWhatsAppLink>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                                <Link href="/prices">Browse All Services</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
