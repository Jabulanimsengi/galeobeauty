import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { businessInfo } from "@/lib/constants";
import { getCategoryById } from "@/lib/services-data";
import {
    getAllIntentPages,
    getIntentPageBySlug,
    getIntentPageServiceLinks,
} from "@/lib/intent-pages";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
    return getAllIntentPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getIntentPageBySlug(slug);

    if (!page) {
        return { title: "Page Not Found" };
    }

    return {
        title: `${page.metaTitle} | Galeo Beauty`,
        description: page.metaDescription,
        keywords: [...page.primaryKeywords, ...page.supportingKeywords],
        alternates: {
            canonical: `https://www.galeobeauty.com/${page.slug}`,
        },
        openGraph: {
            title: `${page.metaTitle} | Galeo Beauty`,
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

    const whatsappMessage = encodeURIComponent(
        `Hi! I found you on www.galeobeauty.com and I want help with ${page.title}. Can you recommend the right treatment?`
    );

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
                                    <a
                                        href={`https://wa.me/${businessInfo.socials.whatsapp}?text=${whatsappMessage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Book via WhatsApp
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/contact">Contact the Salon</Link>
                                </Button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[2rem] border border-border bg-secondary/10 p-6">
                                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                        Common Concerns
                                    </span>
                                    <h2 className="mt-3 font-serif text-2xl text-foreground">What You Might Be Noticing</h2>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                        Most journeys don&apos;t begin with a treatment name. They start with something you notice in the mirror,
                                        feel in your body, or simply want to improve.
                                    </p>
                                    <ul className="mt-5 space-y-3">
                                        {page.symptoms.map((item) => (
                                            <li
                                                key={item}
                                                className="rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm leading-relaxed text-foreground"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="rounded-[2rem] border border-border bg-secondary/10 p-6">
                                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                        The Expected Result
                                    </span>
                                    <h2 className="mt-3 font-serif text-2xl text-foreground">What You Can Look Forward To</h2>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                        This is the finished look, feeling, or improvement you can hope to walk away with
                                        after the right treatment plan.
                                    </p>
                                    <ul className="mt-5 space-y-3">
                                        {page.results.map((item) => (
                                            <li
                                                key={item}
                                                className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-foreground"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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

                <section className="border-y border-border/30 bg-white py-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="rounded-[2rem] border border-border bg-background p-6">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    Exploring Your Options
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">How to Choose the Right Path for You</h2>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    Once you know what you want to address, the next step is determining the best approach. It helps to
                                    understand the tradeoffs, what heals faster, and which route matches your goals.
                                </p>
                                <div className="mt-5 space-y-3 rounded-2xl border border-border/60 bg-secondary/15 p-5 text-sm leading-relaxed text-foreground">
                                    <p>We&apos;ll help you compare the realistic options between different treatment paths.</p>
                                    <p>That includes understanding what each option is designed to improve, how healing fits into your schedule, and which route best suits your desired result.</p>
                                    <p>We treat this as a collaborative decision-making step, not a push toward a single treatment.</p>
                                </div>
                            </div>
                            <div className="rounded-[2rem] border border-border bg-background p-6">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    Peace of Mind
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">What to Know Before You Commit</h2>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    It&apos;s normal to have questions before committing. You might want clarity around suitability,
                                    comfort, healing, maintenance, and whether the treatment fits your timeline.
                                </p>
                                <div className="mt-5 space-y-3 rounded-2xl border border-border/60 bg-background p-5 text-sm leading-relaxed text-foreground">
                                    <p>We provide clear guidance about comfort, suitability, aftercare, and how visible your recovery might be.</p>
                                    <p>We also help you determine if the treatment fits your specific needs right now, like event prep, maintenance, or a more corrective plan.</p>
                                    <p>This guidance matters just as much as the treatment itself, as it builds your confidence before booking.</p>
                                </div>
                            </div>
                            <div className="rounded-[2rem] border border-border bg-background p-6">
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                    The Perfect Fit
                                </span>
                                <h2 className="mt-3 font-serif text-2xl text-foreground">When This Treatment Makes Sense</h2>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    These are some of the real-life moments and situations where this treatment is often the most suitable choice.
                                </p>
                                <div className="mt-5 space-y-3 rounded-2xl border border-gold/20 bg-gold/5 p-5 text-sm leading-relaxed text-foreground">
                                    <p>This path is perfect if you&apos;re ready for a more personalized recommendation rather than browsing a generic menu.</p>
                                    <p>It could be before a special event, during a maintenance phase, or when an ongoing concern needs a carefully considered plan.</p>
                                    <p>Our consultation ensures we match the right treatment to you and your timing.</p>
                                </div>
                            </div>
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
                                <a
                                    href={`https://wa.me/${businessInfo.socials.whatsapp}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ask on WhatsApp
                                </a>
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
