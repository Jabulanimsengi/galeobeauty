import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ServiceBookingButton } from "@/components/booking/ServiceBookingButton";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { CheckCircle, Clock, MapPin, ArrowRight } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import {
    getCachedSEOServices,
    getPrebuildServiceParams,
    getServiceFAQs,
    getTreatmentProcess,
    getLocationBySlug,
    generateServiceIntro,
    getServiceSpecificBenefits,
    generateDynamicBestFor
} from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";
import { generateServiceDescription } from "@/lib/seo-generator";
import { buildServiceMetadataKeywords } from "@/lib/seo-keywords";
import { toAbsoluteUrl } from "@/lib/site-url";
import {
    getAllBespokeServicePageParams,
    getBespokeServicePageRelatedServices,
    resolveBespokeServicePage,
} from "@/lib/bespoke-service-pages";
import { getIntentPagesForService, getIntentPagesForServices } from "@/lib/intent-pages";
import { resolveServicePageHeroImage } from "@/lib/editorial-image-resolver";

//============================================
// DYNAMIC SERVICE PAGES FOR ALL 262 TREATMENTS
// ============================================
// Canonical URL: /services/[category]/[service]
// Targets generic keywords like "gel nails", "microblading", etc.

export const dynamicParams = true;

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
            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">{title}</h2>
            {description && (
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

// Pre-build all canonical service pages deterministically.
// Location-targeted long-tail pages stay on-demand elsewhere.
export function generateStaticParams() {
    // Skip eager param generation in dev — pages render on-demand via dynamicParams
    if (process.env.NODE_ENV === "development") return [];
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

        const bespokeHeroImage = resolveServicePageHeroImage({
            categoryId: bespokePage.categoryId,
            categoryTitle: bespokePage.category.title,
            subcategoryTitle: bespokePage.title,
            serviceSlug: bespokePage.slug,
            item: {
                id: bespokePage.slug,
                name: bespokePage.title,
                price: "",
                description: `${bespokePage.heroIntro} ${bespokePage.heroBody}`,
                seoKeywords: bespokePage.includedServices.flatMap((service) => service.seoKeywords ?? []),
            },
            fallbackImage: bespokePage.image,
            fallbackAlt: bespokePage.imageAlt,
        });
        const imageUrl = toAbsoluteUrl(bespokeHeroImage.image);
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
                canonical: `https://www.galeobeauty.com/services/${categoryId}/${bespokePage.slug}`,
            },
            openGraph: {
                title: bespokePage.metaTitle,
                description: bespokePage.metaDescription,
                url: `https://www.galeobeauty.com/services/${categoryId}/${bespokePage.slug}`,
                type: "website",
                images: [
                    {
                        url: imageUrl,
                        alt: bespokeHeroImage.imageAlt,
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

    const allServices = getCachedSEOServices();
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
    const serviceHeroImage = category && subcategory
        ? resolveServicePageHeroImage({
            categoryId: category.id,
            categoryTitle: category.title,
            subcategoryTitle: subcategory.title,
            serviceSlug: service.slug,
            item: {
                id: service.itemId,
                name: service.keyword,
                price: service.price,
                duration: service.duration,
                description: service.description,
                seoKeywords: service.seoKeywords,
            },
            fallbackImage: service.image,
            fallbackAlt: service.imageAlt,
        })
        : { image: service.image, imageAlt: service.imageAlt };
    const serviceImageUrl = toAbsoluteUrl(serviceHeroImage.image);
    const title = `${service.keyword} | Galeo Beauty`;
    const metadataDescription = `${description.substring(0, 120)} Available at Galeo Beauty in Hartbeespoort, serving local clients and nearby commuter areas.`;

    return {
        title,
        description: metadataDescription,
        keywords,
        alternates: {
            canonical: `https://www.galeobeauty.com/services/${categoryId}/${service.slug}`,
        },
        openGraph: {
            title,
            description: metadataDescription,
            url: `https://www.galeobeauty.com/services/${categoryId}/${service.slug}`,
            type: "website",
            images: [
                {
                        url: serviceImageUrl,
                        alt: serviceHeroImage.imageAlt,
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

    if (categoryId === "skin") {
        const skinRedirects: Record<string, string> = {
            "acne-solutions": "/services/dermalogica/skin-clearing-facial",
            "chemical-peel": "/services/dermalogica/pro-power-peel",
            "chemical-peels": "/services/dermalogica/pro-power-peel",
            "facial-proskin": "/services/dermalogica/pro-skin-60",
            "ipl-laser": "/services/dermalogica/pro-clear",
            microneedling: "/services/dermalogica/pro-microneedling",
        };

        permanentRedirect(skinRedirects[serviceSlug] ?? "/services/dermalogica");
    }

    const bespokePage = resolveBespokeServicePage(serviceSlug);

    if (bespokePage) {
        if (bespokePage.categoryId !== categoryId) {
            notFound();
        }

        const relatedServices = getBespokeServicePageRelatedServices(bespokePage);
        const relatedGuides = getIntentPagesForServices(bespokePage.includedServiceSlugs, 6);
        const bespokeHeroImage = resolveServicePageHeroImage({
            categoryId: bespokePage.categoryId,
            categoryTitle: bespokePage.category.title,
            subcategoryTitle: bespokePage.title,
            serviceSlug: bespokePage.slug,
            item: {
                id: bespokePage.slug,
                name: bespokePage.title,
                price: "",
                description: `${bespokePage.heroIntro} ${bespokePage.heroBody}`,
                seoKeywords: bespokePage.includedServices.flatMap((service) => service.seoKeywords ?? []),
            },
            fallbackImage: bespokePage.image,
            fallbackAlt: bespokePage.imageAlt,
        });
        const bespokeImageUrl = toAbsoluteUrl(bespokeHeroImage.image);

        const bespokeServiceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${bespokePage.title} at Galeo Beauty`,
            description: `${bespokePage.heroIntro} ${bespokePage.heroBody}`,
            url: `https://www.galeobeauty.com/services/${bespokePage.categoryId}/${bespokePage.slug}`,
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
                { "@type": "ListItem", position: 2, name: "Services", item: "https://www.galeobeauty.com/services" },
                { "@type": "ListItem", position: 3, name: bespokePage.category.title, item: `https://www.galeobeauty.com/services/${bespokePage.category.id}` },
                { "@type": "ListItem", position: 4, name: bespokePage.title, item: `https://www.galeobeauty.com/services/${bespokePage.category.id}/${bespokePage.slug}` },
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
                    <section className="border-b border-border/50 bg-white pt-24 lg:pt-32">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="overflow-hidden border-x border-border/50 [border-radius:0]">
                                <div className="relative mx-auto aspect-square w-full max-w-[34rem] bg-secondary/20 [border-radius:0] sm:max-w-[38rem] lg:max-w-[42rem]">
                                    <CloudinaryImage
                                        src={bespokeHeroImage.image}
                                        alt={bespokeHeroImage.imageAlt}
                                        fill
                                        priority
                                        className="object-contain [border-radius:0]"
                                        sizes="100vw"
                                    />
                                </div>

                                <div className="mx-auto max-w-4xl px-6 py-10 text-center sm:px-10 lg:py-14">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                                        {bespokePage.category.title}
                                    </p>
                                    <h1 className="mx-auto mt-5 max-w-4xl font-sans text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[0.08em] text-foreground sm:text-[2.4rem] lg:text-[3rem]">
                                        {bespokePage.heroTitle}
                                    </h1>
                                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                        {bespokePage.heroIntro}
                                    </p>
                                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                        <Button asChild size="lg" className="rounded-none bg-gold px-8 font-semibold text-foreground hover:bg-gold-dark">
                                            <TrackedWhatsAppLink
                                                message={bespokePage.bookingMessage}
                                                trackingContext={`bespoke_service_hero_${bespokePage.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {bespokePage.consultationLabel}
                                            </TrackedWhatsAppLink>
                                        </Button>
                                        <Button asChild size="lg" variant="outline" className="rounded-none">
                                            <NavLink href={`/services/${bespokePage.category.id}`}>
                                                View All {bespokePage.category.title}
                                            </NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-border/40 bg-background py-12">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="mx-auto max-w-4xl text-center">
                                <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                    What This Includes
                                </h2>
                                <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                                    {bespokePage.heroBody}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-border/40 bg-secondary/10 py-8">
                        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
                            <h3 className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-gold sm:text-base">
                                Best For
                            </h3>
                            <p className="mt-3 text-base font-medium text-foreground sm:text-lg">
                                {bespokePage.pageBestFor ?? bespokePage.heroIntro}
                            </p>
                        </div>
                    </section>

                    <section className="border-b border-border/40 bg-white py-12">
                        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                            <ServiceSectionHeading title={bespokePage.focusTagsTitle} />
                            <div className="flex flex-wrap justify-center gap-3">
                                {bespokePage.focusTags.map((tag) => (
                                    <span key={tag} className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white py-12 sm:py-16">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading title={bespokePage.comparisonTitle} />
                            <div className="space-y-8">
                                {bespokePage.variantGroups.map((group) => (
                                    <div key={group.title} className="border border-border bg-secondary/5 p-6 sm:p-8">
                                        <div className="max-w-3xl">
                                            <h3 className="font-sans text-[1.2rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[1.45rem]">{group.title}</h3>
                                            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                                {group.description}
                                            </p>
                                        </div>
                                        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                            {group.variants.map((variant) => (
                                                <article key={variant.serviceSlug} className="border border-border bg-background p-5">
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
                                                        <p className="mt-4 bg-secondary/30 px-3 py-2 text-sm text-foreground/85">
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

                    <section className="py-12 sm:py-16">
                        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                            <h2 className="mb-10 text-center font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                {bespokePage.processTitle}
                            </h2>

                            <div className="space-y-6">
                                {bespokePage.treatmentProcess.map((step) => (
                                    <div key={step.step} className="flex gap-4 sm:gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center border-2 border-gold bg-gold/10 sm:h-12 sm:w-12">
                                                <span className="text-lg font-bold text-gold">{step.step}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="mb-2 flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                                                {step.duration && (
                                                    <span className="bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
                                                        {step.duration}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
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
                                    <div key={faq.question} className="border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                                        <h3 className="mb-3 text-lg font-semibold text-foreground">{faq.question}</h3>
                                        <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {relatedServices.length > 0 && (
                        <section className="bg-white py-16">
                            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                                <ServiceSectionHeading
                                    title="Related Treatments"
                                    description={`Explore complementary ${bespokePage.category.title.toLowerCase()} services`}
                                />
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {relatedServices.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/services/${related.categoryId}/${related.slug}`}
                                            className="group border border-border/60 bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5"
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

                    {relatedGuides.length > 0 && (
                        <section className="border-y border-border/40 bg-stone-50/40 py-16">
                            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                                <ServiceSectionHeading
                                    title="Related Guides"
                                    description={`Helpful reading for comparing ${bespokePage.title.toLowerCase()} options before you book.`}
                                />
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {relatedGuides.map((guide) => (
                                        <Link
                                            key={guide.slug}
                                            href={`/${guide.slug}`}
                                            className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                        >
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Guide</p>
                                            <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                                                {guide.h1}
                                            </h3>
                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                                {guide.heroDescription}
                                            </p>
                                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                                                Read guide
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="bg-background px-4 py-16 sm:px-6 lg:py-20">
                        <div className="mx-auto max-w-4xl border border-border/70 bg-foreground p-8 text-center text-background shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14">
                            <h2 className="mx-auto max-w-2xl font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] md:text-[2rem]">
                                {bespokePage.ctaTitle}
                            </h2>
                            <p className="mx-auto mt-4 mb-8 max-w-lg text-background/70">{bespokePage.ctaBody}</p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button asChild size="lg" className="rounded-none bg-gold px-10 font-semibold text-foreground hover:bg-gold/90">
                                    <TrackedWhatsAppLink
                                        message={bespokePage.bookingMessage}
                                        trackingContext={`bespoke_service_cta_${bespokePage.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {bespokePage.consultationLabel}
                                    </TrackedWhatsAppLink>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="rounded-none border-background/30 bg-transparent px-10 text-background hover:bg-background/10 hover:text-background">
                                    <NavLink href={`/services/${bespokePage.category.id}`}>
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
    const allServices = getCachedSEOServices();
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
    const serviceHeroImage = resolveServicePageHeroImage({
        categoryId: category.id,
        categoryTitle,
        subcategoryTitle,
        serviceSlug: service.slug,
        item: fullServiceItem,
        fallbackImage: fullServiceItem.image ?? service.image,
        fallbackAlt: fullServiceItem.imageAlt ?? service.imageAlt,
    });
    const serviceImage = serviceHeroImage.image;
    const serviceImageAlt = serviceHeroImage.imageAlt;
    const serviceImageUrl = toAbsoluteUrl(serviceImage);

    // NEW: Use advanced generators for better uniqueness
    const benefits = getServiceSpecificBenefits(service);
    const intro = generateServiceIntro(service, location);
    const dynamicBestFor = generateDynamicBestFor(fullServiceItem.name, fullServiceItem.description, category.id);

    const faqs = getServiceFAQs(service, location);
    const treatmentProcess = getTreatmentProcess(service, location);
    const relatedGuides = getIntentPagesForService(service.slug).slice(0, 6);

    // JSON-LD Structured Data
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${service.keyword} at Galeo Beauty`,
        description: intro + " " + richDescription, // Combine for schema
        url: `https://www.galeobeauty.com/services/${category.id}/${service.slug}`,
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
            url: `https://www.galeobeauty.com/services/${category.id}/${service.slug}`,
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
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.galeobeauty.com/services" },
            { "@type": "ListItem", position: 3, name: category.title, item: `https://www.galeobeauty.com/services/${category.id}` },
            { "@type": "ListItem", position: 4, name: service.keyword, item: `https://www.galeobeauty.com/services/${category.id}/${service.slug}` },
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
                <section className="border-b border-border/50 bg-white pt-24 lg:pt-32">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="overflow-hidden border-x border-border/50 [border-radius:0]">
                            <div className="relative mx-auto aspect-square w-full max-w-[34rem] bg-secondary/20 [border-radius:0] sm:max-w-[38rem] lg:max-w-[42rem]">
                                <CloudinaryImage
                                    src={serviceImage}
                                    alt={serviceImageAlt}
                                    fill
                                    priority
                                    className="object-contain [border-radius:0]"
                                    sizes="100vw"
                                />
                            </div>

                            <div className="mx-auto max-w-4xl px-6 py-10 text-center sm:px-10 lg:py-14">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                                    {category.title}
                                </p>
                                <h1 className="mx-auto mt-5 max-w-4xl font-sans text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[0.08em] text-foreground sm:text-[2.4rem] lg:text-[3rem]">
                                    {service.keyword} in Hartbeespoort
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                    {intro}
                                </p>
                                <div className="mx-auto mt-8 max-w-3xl border border-border bg-white p-4 shadow-[0_18px_50px_-42px_rgba(0,0,0,0.24)] sm:p-5">
                                    <div className="grid gap-3 text-center text-sm text-muted-foreground sm:grid-cols-3 sm:items-center sm:text-left">
                                        <div className="border border-border/70 bg-secondary/10 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-center">
                                            <span className="block text-2xl font-bold text-gold">{service.price}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 border border-border/70 bg-secondary/10 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                                            <Clock className="h-5 w-5" />
                                            {service.duration || "Duration varies"}
                                        </div>
                                        <div className="flex items-center justify-center gap-2 border border-border/70 bg-secondary/10 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                                            <MapPin className="h-5 w-5" />
                                            Hartbeespoort
                                        </div>
                                    </div>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <ServiceBookingButton
                                            item={fullServiceItem}
                                            categoryId={category.id}
                                            categoryTitle={category.title}
                                            subcategoryId={subcategory?.id || ""}
                                            subcategoryTitle={subcategory?.title || ""}
                                            label="Book Treatment"
                                            className="w-full"
                                        />
                                        <Button asChild size="lg" variant="outline" className="w-full rounded-none">
                                            <NavLink href={`/services/${category.id}`}>View All {category.title}</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-border/40 bg-background py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                What This Includes
                            </h2>
                            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                                {richDescription}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-b border-border/40 bg-secondary/10 py-8">
                    <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
                        <h3 className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-gold sm:text-base">
                            Best For
                        </h3>
                        <p className="mt-3 text-base font-medium text-foreground sm:text-lg">
                            {dynamicBestFor}
                        </p>
                    </div>
                </section>

                <section className="border-b border-border/40 bg-white py-12">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                        <ServiceSectionHeading title="Service Details" />
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground">
                                {category.title}
                            </span>
                            {subcategory?.title && (
                                <span className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground">
                                    {subcategory.title}
                                </span>
                            )}
                            <span className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground">
                                {service.price}
                            </span>
                            {service.duration && (
                                <span className="border border-border bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground">
                                    {service.duration}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-12 sm:py-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <ServiceSectionHeading
                            title="Why Choose Us"
                            description={`What you can expect when booking your ${service.keyword.toLowerCase()} with Galeo Beauty.`}
                        />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3 border border-border/60 bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)]">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Note (if exists) */}
                {fullServiceItem.note && (
                    <section className="py-12 bg-secondary/5">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <div className="border border-gold/20 bg-white p-6">
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
                        <h2 className="mb-10 text-center font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                            What to Expect During {service.keyword}
                        </h2>

                        <div className="space-y-6">
                            {treatmentProcess.map((step) => (
                                <div key={step.step} className="flex gap-4 sm:gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center border-2 border-gold bg-gold/10 sm:h-12 sm:w-12">
                                            <span className="text-gold font-bold text-lg">{step.step}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-foreground text-lg">
                                                {step.title}
                                            </h3>
                                            {step.duration && (
                                                <span className="bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
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
                                <div key={index} className="border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
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
                    <section className="py-16 bg-white">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading
                                title="Related Treatments"
                                description={`Explore more ${category.title.toLowerCase()} services`}
                            />
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedServices.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/services/${category.id}/${related.slug}`}
                                        className="group border border-border/60 bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5"
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

                {relatedGuides.length > 0 && (
                    <section className="border-y border-border/40 bg-stone-50/40 py-16">
                        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                            <ServiceSectionHeading
                                title="Related Guides"
                                description={`Helpful reading for understanding ${service.keyword.toLowerCase()} before you book.`}
                            />
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {relatedGuides.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/${guide.slug}`}
                                        className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Guide</p>
                                        <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                                            {guide.h1}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {guide.heroDescription}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                                            Read guide
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="bg-stone-50/70 px-4 py-16 sm:px-6 lg:py-20">
                    <div className="mx-auto max-w-4xl border border-[#2b2b2f] bg-[#171719] p-8 text-center text-white shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14">
                        <h2 className="mx-auto max-w-2xl font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-white md:text-[2rem]">
                            Ready to Book Your {service.keyword}?
                        </h2>
                        <p className="mx-auto mt-4 mb-8 max-w-lg text-white/70">
                            Book with Galeo Beauty in Hartbeespoort or get in touch if you want help choosing the right option.
                        </p>
                        <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
                            <ServiceBookingButton
                                item={fullServiceItem}
                                categoryId={category.id}
                                categoryTitle={category.title}
                                subcategoryId={subcategory?.id || ""}
                                subcategoryTitle={subcategory?.title || ""}
                                label="Book Treatment"
                                className="w-full border-gold bg-gold text-white hover:border-gold-dark hover:bg-gold-dark hover:text-white"
                            />
                            <Button asChild size="lg" variant="outline" className="w-full rounded-none border-white/30 bg-transparent px-10 text-white hover:bg-white/10 hover:text-white">
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

                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
