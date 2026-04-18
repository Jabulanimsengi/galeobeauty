import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { NearbyLocationsSection } from "@/components/sections/NearbyLocationsSection";
import { Button } from "@/components/ui/button";
import { ServiceBookingButton } from "@/components/booking/ServiceBookingButton";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { CheckCircle, Clock, MapPin, ArrowRight, Star } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import {
    CANONICAL_LOCAL_SERVICE_LOCATION_SLUG,
    getAllSEOServices,
    getPrebuildServiceParams,
    getServiceFAQs,
    getTreatmentProcess,
    getLocationBySlug,
    isIndexableLocationService,
    // New imports for enhanced uniqueness
    generateServiceIntro,
    getServiceSpecificBenefits
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";
import { generateServiceDescription } from "@/lib/seo-generator";
import { buildServiceMetadataKeywords } from "@/lib/seo-keywords";
import { getIntentPagesForService } from "@/lib/intent-pages";
import { toAbsoluteUrl } from "@/lib/site-url";
import { getRelevantBlogPostsForService } from "@/lib/blog-data";
import {
    getAllBespokeServicePageParams,
    getBespokeServicePageRelatedServices,
    resolveBespokeServicePage,
} from "@/lib/bespoke-service-pages";

//============================================
// DYNAMIC SERVICE PAGES FOR ALL 262 TREATMENTS
// ============================================
// Canonical URL: /prices/[category]/[service]
// Targets generic keywords like "gel nails", "microblading", etc.

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

type IntentPageCard = ReturnType<typeof getIntentPagesForService>[number];

function ServiceSectionHeading({
    title,
    description,
    centered = true,
}: {
    title: string;
    description?: string;
    centered?: boolean;
}) {
    return (
        <div className={centered ? "mx-auto mb-10 max-w-3xl text-center" : "mb-8 max-w-3xl"}>
            <h2 className="font-sans text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
            {description && (
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

function collectRelatedIntentPages(serviceSlugs: string[]): IntentPageCard[] {
    const seen = new Set<string>();
    const pages: IntentPageCard[] = [];

    for (const serviceSlug of serviceSlugs) {
        for (const page of getIntentPagesForService(serviceSlug)) {
            if (seen.has(page.slug)) {
                continue;
            }

            seen.add(page.slug);
            pages.push(page);
        }
    }

    return pages.slice(0, 4);
}

// Pre-build all canonical service pages deterministically.
// Location-targeted long-tail pages stay on-demand elsewhere.
export function generateStaticParams() {
    return [...getPrebuildServiceParams(), ...getAllBespokeServicePageParams()];
}

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }): Promise<Metadata> {
    const { category: categoryId, service: serviceSlug } = await params;
    const bespokePage = resolveBespokeServicePage(serviceSlug);

    if (bespokePage) {
        if (bespokePage.categoryId !== categoryId) {
            return { title: "Service Not Found" };
        }

        const imageUrl = toAbsoluteUrl(bespokePage.image);
        const keywordPool = Array.from(
            new Set(
                bespokePage.includedServices.flatMap((service) => [
                    service.keyword,
                    ...(service.seoKeywords ?? []),
                ])
            )
        );

        return {
            title: bespokePage.metaTitle,
            description: bespokePage.metaDescription,
            keywords: keywordPool,
            alternates: {
                canonical: `https://www.galeobeauty.com/prices/${categoryId}/${bespokePage.slug}`,
            },
            openGraph: {
                title: bespokePage.metaTitle,
                description: bespokePage.metaDescription,
                url: `https://www.galeobeauty.com/prices/${categoryId}/${bespokePage.slug}`,
                type: "website",
                images: [
                    {
                        url: imageUrl,
                        alt: bespokePage.imageAlt,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: bespokePage.metaTitle,
                description: bespokePage.metaDescription,
                images: [imageUrl],
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };
    }

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
        // @ts-expect-error - generator expects a service item shape with name
        { ...service, name: service.keyword },
        categoryTitle,
        subcategoryTitle
    );

    const keywords = buildServiceMetadataKeywords(service);
    const serviceImageUrl = toAbsoluteUrl(service.image);
    const title = `${service.keyword} | Galeo Beauty`;
    const metadataDescription = `${description.substring(0, 120)} Available at Galeo Beauty in Hartbeespoort, serving local clients and nearby commuter areas.`;

    return {
        title,
        description: metadataDescription,
        keywords,
        alternates: {
            canonical: `https://www.galeobeauty.com/prices/${categoryId}/${service.slug}`,
        },
        openGraph: {
            title,
            description: metadataDescription,
            url: `https://www.galeobeauty.com/prices/${categoryId}/${service.slug}`,
            type: "website",
            images: [
                {
                    url: serviceImageUrl,
                    alt: service.imageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: metadataDescription,
            images: [serviceImageUrl],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
    const { category: categoryId, service: serviceSlug } = await params;
    const bespokePage = resolveBespokeServicePage(serviceSlug);

    if (bespokePage) {
        if (bespokePage.categoryId !== categoryId) {
            notFound();
        }

        const relatedServices = getBespokeServicePageRelatedServices(bespokePage);
        const relatedIntentPages = collectRelatedIntentPages(bespokePage.includedServiceSlugs);
        const relatedBlogPosts = getRelevantBlogPostsForService(
            bespokePage.slug,
            bespokePage.categoryId,
            bespokePage.includedServiceSlugs,
            3
        );
        const bespokeImageUrl = toAbsoluteUrl(bespokePage.image);

        const bespokeServiceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${bespokePage.title} at Galeo Beauty`,
            description: `${bespokePage.heroIntro} ${bespokePage.heroBody}`,
            url: `https://www.galeobeauty.com/prices/${bespokePage.categoryId}/${bespokePage.slug}`,
            image: bespokeImageUrl,
            serviceType: [
                bespokePage.title,
                bespokePage.category.title,
                ...bespokePage.includedServices.slice(0, 8).map((service) => service.keyword),
            ],
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
                    country: "ZA",
                },
                telephone: businessInfo.phone,
                url: "https://www.galeobeauty.com",
            },
            areaServed: [
                { "@type": "City", name: "Hartbeespoort" },
                { "@type": "City", name: "Centurion" },
                { "@type": "City", name: "Pretoria" },
                { "@type": "City", name: "Johannesburg" },
                { "@type": "AdministrativeArea", name: "North West Province" },
            ],
        };

        const bespokeBreadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.galeobeauty.com" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://www.galeobeauty.com/prices" },
                { "@type": "ListItem", position: 3, name: bespokePage.category.title, item: `https://www.galeobeauty.com/prices/${bespokePage.category.id}` },
                { "@type": "ListItem", position: 4, name: bespokePage.title, item: `https://www.galeobeauty.com/prices/${bespokePage.category.id}/${bespokePage.slug}` },
            ],
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify([bespokeServiceSchema, bespokeBreadcrumbSchema]) }}
                />
                <Header />
                <main className="bg-background">
                    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
                        <div className="absolute top-0 right-0 h-full w-2/3 -z-10 skew-x-12 bg-secondary/10" />
                        <div className="container mx-auto max-w-6xl">
                            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-start">
                                <div className="max-w-3xl">
                                    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                        <Link href="/" className="transition-colors hover:text-gold">Home</Link>
                                        <span>/</span>
                                        <Link href="/prices" className="transition-colors hover:text-gold">Services</Link>
                                        <span>/</span>
                                        <Link href={`/prices/${bespokePage.category.id}`} className="transition-colors hover:text-gold">
                                            {bespokePage.category.title}
                                        </Link>
                                        <span>/</span>
                                        <span className="text-foreground">{bespokePage.title}</span>
                                    </div>

                                    <h1 className="mb-6 font-sans text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                        {bespokePage.heroTitle}
                                    </h1>

                                    <div className="mb-8 space-y-4 text-base text-muted-foreground sm:text-lg">
                                        <p className="font-medium leading-8 text-foreground/80">
                                            {bespokePage.heroIntro}
                                        </p>
                                        <p className="leading-8">
                                            {bespokePage.heroBody}
                                        </p>
                                    </div>

                                    <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                            <span className="text-2xl font-bold text-gold">
                                                {bespokePage.includedServices.length} treatment options
                                            </span>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="h-5 w-5" />
                                                <span>Pricing and timing</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-5 w-5" />
                                                <span>Hartbeespoort</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark rounded-[0.35rem] text-foreground">
                                            <TrackedWhatsAppLink
                                                message={bespokePage.bookingMessage}
                                                trackingContext={`bespoke_service_hero_${bespokePage.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {bespokePage.consultationLabel}
                                            </TrackedWhatsAppLink>
                                        </Button>
                                        <Button asChild size="lg" variant="outline" className="rounded-[0.35rem]">
                                            <NavLink href={`/prices/${bespokePage.category.id}`}>
                                                View All {bespokePage.category.title}
                                            </NavLink>
                                        </Button>
                                    </div>
                                </div>

                                <figure className="overflow-hidden rounded-[0.4rem] border border-border/60 bg-background/85 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)]">
                                    <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                                        <CloudinaryImage
                                            src={bespokePage.image}
                                            alt={bespokePage.imageAlt}
                                            fill
                                            priority
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 34vw"
                                        />
                                    </div>
                                    <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                                        See the main treatment options by goal, finish, timing and price before you book.
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </section>

                    <section className="border-y border-border/40 bg-secondary/10 py-12 sm:py-14">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
                                <div className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.35)]">
                                    <h2 className="font-sans text-2xl font-semibold text-foreground sm:text-3xl">
                                        {bespokePage.sectionIntroTitle}
                                    </h2>
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        {bespokePage.sectionIntroBody}
                                    </p>
                                </div>

                                <div className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.35)]">
                                    <h3 className="font-sans text-lg font-semibold text-foreground">{bespokePage.focusTagsTitle}</h3>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {bespokePage.focusTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-[0.35rem] border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white py-12 sm:py-20">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <h2 className="mb-12 text-center font-sans text-3xl font-semibold text-foreground md:text-4xl">
                                {bespokePage.comparisonTitle}
                            </h2>
                            <div className="space-y-10">
                                {bespokePage.variantGroups.map((group) => (
                                    <div key={group.title} className="rounded-[0.4rem] border border-border bg-secondary/5 p-6 sm:p-8">
                                        <div className="max-w-3xl">
                                            <h3 className="font-sans text-2xl font-semibold text-foreground">{group.title}</h3>
                                            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                                {group.description}
                                            </p>
                                        </div>
                                        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                            {group.variants.map((variant) => (
                                                <article key={variant.serviceSlug} className="rounded-[0.4rem] border border-border bg-background p-5">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h4 className="font-semibold text-foreground">{variant.item.name}</h4>
                                                            <p className="mt-1 text-sm text-muted-foreground">{variant.summary}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm font-semibold text-gold">{variant.item.price}</div>
                                                            {variant.item.duration && (
                                                                <div className="mt-1 text-xs text-muted-foreground">{variant.item.duration}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {variant.bestFor && (
                                                        <p className="mt-4 rounded-[0.35rem] bg-secondary/40 px-3 py-2 text-sm text-foreground/85">
                                                            Best for: {variant.bestFor}
                                                        </p>
                                                    )}
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white py-12 sm:py-20">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading title={bespokePage.benefitsTitle} />
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {bespokePage.benefits.map((benefit) => (
                                    <div key={benefit} className="flex items-start gap-3 rounded-[0.4rem] border border-border/60 bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)]">
                                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
                                        <span className="text-foreground">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {relatedIntentPages.length > 0 && (
                        <section className="bg-white py-14">
                            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                                <ServiceSectionHeading
                                    title="Related Guides"
                                    description="Helpful reading if you want more context before you message or book."
                                    centered={false}
                                />
                                <div className="grid gap-4 md:grid-cols-2">
                                    {relatedIntentPages.map((page) => (
                                        <Link
                                            key={page.slug}
                                            href={`/${page.slug}`}
                                            className="rounded-[0.4rem] border border-border/60 bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)] transition-all hover:border-gold/40 hover:-translate-y-0.5"
                                        >
                                            <h3 className="font-medium text-foreground">{page.title}</h3>
                                            <p className="mt-2 text-sm text-muted-foreground">{page.metaDescription}</p>
                                            <span className="mt-4 inline-block text-sm font-medium text-gold">View guide</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {relatedBlogPosts.length > 0 && (
                        <section className="border-t border-border/30 bg-white py-14">
                            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                                <ServiceSectionHeading
                                    title="From The Blog"
                                    description="Helpful reads if you want a little more context before you choose or book."
                                    centered={false}
                                />
                                <div className="grid gap-4 md:grid-cols-3">
                                    {relatedBlogPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            className="rounded-[0.4rem] border border-border/60 bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)] transition-all hover:border-gold/40 hover:-translate-y-0.5"
                                        >
                                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{post.category}</p>
                                            <h3 className="mt-3 font-medium text-foreground">{post.title}</h3>
                                            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                                            <span className="mt-4 inline-block text-sm font-medium text-gold">Read article</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="py-12 sm:py-16">
                        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                            <h2 className="mb-2 text-center font-sans text-3xl font-semibold text-foreground">
                                {bespokePage.processTitle}
                            </h2>

                            <div className="space-y-6">
                                {bespokePage.treatmentProcess.map((step) => (
                                    <div key={step.step} className="flex gap-4 sm:gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-[0.35rem] border-2 border-gold bg-gold/10 sm:h-12 sm:w-12">
                                                <span className="text-lg font-bold text-gold">{step.step}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="mb-2 flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                                                {step.duration && (
                                                    <span className="rounded-[0.35rem] bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
                                                        {step.duration}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 rounded-[0.4rem] bg-secondary/20 p-6 text-center">
                                <p className="mb-4 text-muted-foreground">{bespokePage.ctaBody}</p>
                                <Button asChild className="bg-gold hover:bg-gold-dark rounded-[0.35rem] text-foreground">
                                    <TrackedWhatsAppLink
                                        message={bespokePage.bookingMessage}
                                        trackingContext={`bespoke_service_process_${bespokePage.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {bespokePage.consultationLabel}
                                    </TrackedWhatsAppLink>
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="bg-secondary/20 py-16">
                        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                            <ServiceSectionHeading
                                title="FAQs"
                                description={`Common questions about choosing the right ${bespokePage.title.toLowerCase()} option`}
                            />

                            <div className="space-y-6">
                                {bespokePage.faqs.map((faq) => (
                                    <div key={faq.question} className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                        <h3 className="mb-3 text-lg font-semibold text-foreground">{faq.question}</h3>
                                        <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {relatedServices.length > 0 && (
                        <section className="bg-white py-20">
                            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                                <ServiceSectionHeading
                                    title="Related Treatments"
                                    description={`Explore complementary ${bespokePage.category.title.toLowerCase()} services`}
                                />
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {relatedServices.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/prices/${related.categoryId}/${related.slug}`}
                                            className="group rounded-[0.4rem] border border-border/60 bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5"
                                        >
                                            <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                                                {related.keyword}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <span>{related.price}</span>
                                                {related.duration && <span>{related.duration}</span>}
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
                                                <span>Learn more</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="bg-gradient-to-br from-secondary/20 to-background px-6 py-20">
                        <div className="container mx-auto max-w-4xl text-center">
                            <h2 className="mb-6 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                                {bespokePage.ctaTitle}
                            </h2>
                            <p className="mb-8 text-lg text-muted-foreground">{bespokePage.ctaBody}</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild size="lg" className="bg-gold hover:bg-gold/90 rounded-[0.35rem]">
                                    <TrackedWhatsAppLink
                                        message={bespokePage.bookingMessage}
                                        trackingContext={`bespoke_service_cta_${bespokePage.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {bespokePage.consultationLabel}
                                    </TrackedWhatsAppLink>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="rounded-[0.35rem]">
                                    <NavLink href={`/prices/${bespokePage.category.id}`}>
                                        Browse All {bespokePage.category.title}
                                    </NavLink>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

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

    // Use hartbeespoort as the canonical location for content generation
    // This ensures rich content (FAQs, Treatment Process) appears on the main service page
    const location = getLocationBySlug("hartbeespoort");
    if (!location) notFound();

    const richDescription = generateServiceDescription(fullServiceItem, categoryTitle, subcategoryTitle);
    const serviceImage = fullServiceItem.image ?? service.image;
    const serviceImageAlt = fullServiceItem.imageAlt ?? service.imageAlt;
    const serviceImageUrl = toAbsoluteUrl(serviceImage);

    // NEW: Use advanced generators for better uniqueness
    const benefits = getServiceSpecificBenefits(service);
    const intro = generateServiceIntro(service, location);
    const relatedIntentPages = getIntentPagesForService(service.slug).slice(0, 4);
    const relatedBlogPosts = getRelevantBlogPostsForService(service.slug, category.id, [], 3);
    const localServiceHref = `/locations/${CANONICAL_LOCAL_SERVICE_LOCATION_SLUG}/${service.slug}`;
    const nearbyCoverageCandidates = [
        { slug: "pretoria", label: "Pretoria" },
        { slug: "centurion", label: "Centurion" },
        { slug: "brits", label: "Brits" },
        { slug: "midstream", label: "Midstream" },
        { slug: "johannesburg", label: "Johannesburg" },
    ];
    const nearbyCoverageLinks = nearbyCoverageCandidates.filter((candidate) =>
        isIndexableLocationService(candidate.slug, service.slug)
    );

    const faqs = getServiceFAQs(service, location);
    const treatmentProcess = getTreatmentProcess(service, location);

    // JSON-LD Structured Data
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${service.keyword} at Galeo Beauty`,
        description: intro + " " + richDescription, // Combine for schema
        url: `https://www.galeobeauty.com/prices/${category.id}/${service.slug}`,
        image: serviceImageUrl,
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
                country: "ZA"
            },
            telephone: businessInfo.phone,
            url: "https://www.galeobeauty.com",
        },
        offers: {
            "@type": "Offer",
            url: `https://www.galeobeauty.com/prices/${category.id}/${service.slug}`,
            price: service.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "ZAR",
            availability: "https://schema.org/InStock",
        },
        areaServed: [
            { "@type": "City", name: "Hartbeespoort" },
            { "@type": "City", name: "Centurion" },
            { "@type": "City", name: "Pretoria" },
            { "@type": "City", name: "Johannesburg" },
            { "@type": "AdministrativeArea", name: "North West Province" },
        ],
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.galeobeauty.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.galeobeauty.com/prices" },
            { "@type": "ListItem", position: 3, name: category.title, item: `https://www.galeobeauty.com/prices/${category.id}` },
            { "@type": "ListItem", position: 4, name: service.keyword, item: `https://www.galeobeauty.com/prices/${category.id}/${service.slug}` },
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
                <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/10 -z-10 skew-x-12" />
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-start">
                            <div className="max-w-3xl">
                                {/* Breadcrumb */}
                                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                                    <span>/</span>
                                    <Link href="/prices" className="hover:text-gold transition-colors">Services</Link>
                                    <span>/</span>
                                    <Link href={`/prices/${category.id}`} className="hover:text-gold transition-colors">{category.title}</Link>
                                    <span>/</span>
                                    <span className="text-foreground">{service.keyword}</span>
                                </div>

                                {/* Title */}
                                <h1 className="mb-6 font-sans text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                                    {service.keyword} in Hartbeespoort
                                </h1>

                                <div className="mb-8 space-y-4 text-base text-muted-foreground sm:text-lg">
                                    <p className="font-medium leading-8 text-foreground/80">
                                        {intro}
                                    </p>
                                    <p className="leading-8">
                                        {richDescription}
                                    </p>
                                </div>

                                {/* Quick Info + Book Button */}
                                <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                                    <Button asChild size="lg" variant="outline" className="rounded-[0.35rem]">
                                        <NavLink href={`/prices/${category.id}`}>View All {category.title}</NavLink>
                                    </Button>
                                </div>
                            </div>

                            <figure className="overflow-hidden rounded-[0.4rem] border border-border/60 bg-background/85 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)]">
                                <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                                    <CloudinaryImage
                                        src={serviceImage}
                                        alt={serviceImageAlt}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 34vw"
                                    />
                                </div>
                                <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                                    {service.keyword} at Galeo Beauty in Hartbeespoort, with pricing from {service.price}
                                    {service.duration ? ` and typical treatment time of ${service.duration}.` : "."}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </section>

                <section className="border-y border-border/40 bg-secondary/10 py-12 sm:py-14">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
                            <div className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.35)]">
                                <h2 className="font-sans text-2xl font-semibold text-foreground sm:text-3xl">
                                    Booking Details
                                </h2>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                    Book {service.keyword.toLowerCase()} at Galeo Beauty in Hartbeespoort, or browse nearby area pages if you are travelling in from a surrounding area.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        href={localServiceHref}
                                        className="inline-flex items-center gap-2 rounded-[0.35rem] bg-gold px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
                                    >
                                        Hartbeespoort Page
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="/locations/harties"
                                        className="inline-flex items-center gap-2 rounded-[0.35rem] border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                                    >
                                        Harties Salon Page
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.35)]">
                                <h3 className="font-sans text-lg font-semibold text-foreground">Good To Know</h3>
                                <div className="mt-4 space-y-4">
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        <span className="rounded-[0.35rem] border border-border bg-secondary/10 px-4 py-2 font-medium text-foreground">
                                            {category.title}
                                        </span>
                                        {subcategory?.title && (
                                            <span className="rounded-[0.35rem] border border-border bg-secondary/10 px-4 py-2 font-medium text-foreground">
                                                {subcategory.title}
                                            </span>
                                        )}
                                        {service.duration && (
                                            <span className="rounded-[0.35rem] border border-border bg-secondary/10 px-4 py-2 font-medium text-foreground">
                                                {service.duration}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        If you are not sure whether this is the right treatment, browse the nearby pages below or message the salon before you book.
                                    </p>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    {nearbyCoverageLinks.map((area) => (
                                        <Link
                                            key={area.slug}
                                            href={`/locations/${area.slug}/${service.slug}`}
                                            className="rounded-[0.35rem] border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                                        >
                                            {service.keyword} in {area.label}
                                        </Link>
                                    ))}
                                    {nearbyCoverageLinks.length === 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            More nearby area pages for this treatment will be added over time.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section - DYNAMIC */}
                <section className="bg-white py-12 sm:py-20">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <ServiceSectionHeading
                            title={`Why People Book ${service.keyword}`}
                            description="A quick look at what usually makes this treatment appealing before you move into the details."
                        />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3 rounded-[0.4rem] border border-border/60 bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)]">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {relatedIntentPages.length > 0 && (
                    <section className="py-14 bg-white">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading
                                title="Related Guides"
                                description="A few helpful reads if you want more context before you book."
                                centered={false}
                            />
                            <div className="grid gap-4 md:grid-cols-2">
                                {relatedIntentPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/${page.slug}`}
                                        className="rounded-[0.4rem] border border-border/60 bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)] transition-all hover:border-gold/40 hover:-translate-y-0.5"
                                    >
                                        <h3 className="font-medium text-foreground">{page.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{page.metaDescription}</p>
                                        <span className="mt-4 inline-block text-sm font-medium text-gold">View guide</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {relatedBlogPosts.length > 0 && (
                    <section className="border-t border-border/30 bg-white py-14">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading
                                title="From The Blog"
                                description="Helpful reads if you want a bit more context before you book."
                                centered={false}
                            />
                            <div className="grid gap-4 md:grid-cols-3">
                                {relatedBlogPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="rounded-[0.4rem] border border-border/60 bg-background p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)] transition-all hover:border-gold/40 hover:-translate-y-0.5"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{post.category}</p>
                                        <h3 className="mt-3 font-medium text-foreground">{post.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                                        <span className="mt-4 inline-block text-sm font-medium text-gold">Read article</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Service Note (if exists) */}
                {fullServiceItem.note && (
                    <section className="py-12 bg-secondary/5">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <div className="rounded-[0.4rem] border border-gold/20 bg-white p-6">
                                <p className="text-muted-foreground text-sm">
                                    <strong>Note:</strong> {fullServiceItem.note}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Treatment Process - What to Expect */}
                <section className="py-12 sm:py-16">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                        <h2 className="mb-2 text-center font-sans text-3xl font-semibold text-foreground">
                            What to Expect During {service.keyword}
                        </h2>

                        <div className="space-y-6">
                            {treatmentProcess.map((step) => (
                                <div key={step.step} className="flex gap-4 sm:gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-[0.35rem] border-2 border-gold bg-gold/10 sm:h-12 sm:w-12">
                                            <span className="text-gold font-bold text-lg">{step.step}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-foreground text-lg">
                                                {step.title}
                                            </h3>
                                            {step.duration && (
                                                <span className="rounded-[0.35rem] bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
                                                    {step.duration}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-[0.4rem] bg-secondary/20 p-6 text-center">
                            <p className="text-muted-foreground mb-4">
                                Need help deciding if {service.keyword.toLowerCase()} is the right fit?
                            </p>
                            <Button asChild className="bg-gold hover:bg-gold-dark rounded-[0.35rem] text-foreground">
                                <TrackedWhatsAppLink
                                    message={`Hi! I found you on www.galeobeauty.com and I have a question about ${service.keyword}. Can you help me choose the right option?`}
                                    trackingContext={`service_process_${service.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Chat with Us on WhatsApp
                                </TrackedWhatsAppLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Service-specific questions */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                        <ServiceSectionHeading
                            title="FAQs"
                            description={`Common questions about ${service.keyword}`}
                        />

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="rounded-[0.4rem] border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                    <h3 className="font-semibold text-foreground mb-3 text-lg">
                                        {faq.question}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading
                                title="Related Treatments"
                                description={`Explore more ${category.title.toLowerCase()} services`}
                            />
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedServices.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/prices/${category.id}/${related.slug}`}
                                        className="group rounded-[0.4rem] border border-border/60 bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5"
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

                {/* Visiting Us */}
                <NearbyLocationsSection
                    serviceName={service.keyword}
                    serviceSlug={service.slug}
                />

                {/* CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-br from-secondary/20 to-background">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="mb-6 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                            Ready to Book Your {service.keyword}?
                        </h2>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Book with Galeo Beauty in Hartbeespoort or get in touch if you want help choosing the right option.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <ServiceBookingButton
                                item={fullServiceItem}
                                categoryId={category.id}
                                categoryTitle={category.title}
                                subcategoryId={subcategory?.id || ""}
                                subcategoryTitle={subcategory?.title || ""}
                            />
                            <Button asChild size="lg" variant="outline" className="rounded-[0.35rem]">
                                <TrackedExternalLink
                                    href={`tel:${businessInfo.phone}`}
                                    trackingContext={`service_cta_phone_${service.slug}`}
                                    linkType="phone"
                                    linkLabel="Service page phone"
                                >
                                    Call {businessInfo.phone}
                                </TrackedExternalLink>
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
