import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Clock, MapPin } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { ServiceBookingButton } from "@/components/booking/ServiceBookingButton";
import { NavLink } from "@/components/ui/nav-link";
import { CategoryContent } from "@/app/services/[category]/category-content";
import {
  getLocalServiceRoute,
  type LocalCategoryRoute,
  type LocalServiceRoute,
} from "@/lib/local-seo-routes";
import { toAbsoluteUrl } from "@/lib/site-url";
import { businessInfo } from "@/lib/constants";
import { generateServiceDescription } from "@/lib/seo-generator";
import {
  generateDynamicBestFor,
  generateServiceIntro,
  getCachedSEOServices,
  getLocationBySlug,
  getServiceFAQs,
  getServiceSpecificBenefits,
  getTreatmentProcess,
} from "@/lib/seo-data";
import { resolveCategoryHeroImage, resolveServicePageHeroImage } from "@/lib/editorial-image-resolver";
import { getSpecialBookingItem, getSpecialForService } from "@/lib/specials-data";

const SITE_ORIGIN = "https://www.galeobeauty.com";

function getCategoryIntro(route: LocalCategoryRoute) {
  if (route.relation === "in") {
    return `${route.category.subtitle}. Browse ${route.category.title.toLowerCase()} options at Galeo Beauty in Hartbeespoort and choose the treatment that fits your goal.`;
  }

  return `${route.category.subtitle}. Galeo Beauty is based in Hartbeespoort and welcomes clients travelling from ${route.locationName} for planned beauty appointments.`;
}

function getCategoryDescription(route: LocalCategoryRoute) {
  if (route.relation === "in") {
    return `${route.h1} at Galeo Beauty. Compare treatments, prices and booking options from our Hartbeespoort salon.`;
  }

  return `${route.h1} at Galeo Beauty in Hartbeespoort. Compare treatments, prices and booking options for clients travelling from ${route.locationName}.`;
}

function getServiceDescription(route: LocalServiceRoute) {
  if (route.relation === "in") {
    return `Book ${route.serviceLabel} in Hartbeespoort at Galeo Beauty. View price, duration, treatment details and related services.`;
  }

  return `Book ${route.serviceLabel} near ${route.locationName} at Galeo Beauty in Hartbeespoort. View price, duration, treatment details and planning guidance.`;
}

function getServiceSubcategory(route: LocalServiceRoute) {
  for (const subcategory of route.category.subcategories) {
    const match = subcategory.items.find((item) => item.id === route.service.id);
    if (match) {
      return subcategory;
    }
  }

  return null;
}

export function buildLocalCategoryMetadata(route: LocalCategoryRoute): Metadata {
  const heroImage = resolveCategoryHeroImage({
    categoryId: route.categoryId,
    categoryTitle: route.category.title,
    categorySubtitle: route.category.subtitle,
    fallbackImage: route.category.image,
  });
  const title = `${route.h1} | Galeo Beauty`;
  const description = getCategoryDescription(route);
  const url = `${SITE_ORIGIN}${route.href}`;
  const imageUrl = toAbsoluteUrl(heroImage.image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, alt: heroImage.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildLocalServiceMetadata(route: LocalServiceRoute): Metadata {
  const subcategory = getServiceSubcategory(route);
  const displayService = {
    ...route.service,
    name: route.serviceLabel,
    description: "",
    imageAlt: `${route.serviceLabel} at Galeo Beauty`,
  };
  const heroImage = resolveServicePageHeroImage({
    categoryId: route.categoryId,
    categoryTitle: route.category.title,
    subcategoryTitle: subcategory?.title ?? "",
    serviceSlug: route.service.id,
    item: displayService,
    fallbackImage: route.service.image ?? route.category.image,
    fallbackAlt: `${route.serviceLabel} at Galeo Beauty`,
  });
  const title = `${route.serviceH1} | Galeo Beauty`;
  const description = getServiceDescription(route);
  const url = `${SITE_ORIGIN}${route.serviceHref}`;
  const imageUrl = toAbsoluteUrl(heroImage.image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, alt: heroImage.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function LocalCategoryLandingPage({ route }: { route: LocalCategoryRoute }) {
  const heroImage = resolveCategoryHeroImage({
    categoryId: route.categoryId,
    categoryTitle: route.category.title,
    categorySubtitle: route.category.subtitle,
    fallbackImage: route.category.image,
  });
  const imageUrl = toAbsoluteUrl(heroImage.image);
  const intro = getCategoryIntro(route);
  const absoluteUrl = `${SITE_ORIGIN}${route.href}`;
  const areaCopy = route.relation === "in"
    ? "Based in Hartbeespoort, close to the dam and surrounding estates."
    : `Based in Hartbeespoort for clients who plan their visit from ${route.locationName}.`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: route.h1,
      description: getCategoryDescription(route),
      url: absoluteUrl,
      image: imageUrl,
      provider: {
        "@type": "BeautySalon",
        name: "Galeo Beauty Salon & Spa",
        telephone: businessInfo.phone,
        url: SITE_ORIGIN,
        address: {
          "@type": "PostalAddress",
          streetAddress: businessInfo.address.street,
          addressLocality: "Hartbeespoort",
          addressRegion: "North West",
          postalCode: "0216",
          addressCountry: "ZA",
        },
      },
      areaServed: { "@type": "City", name: route.locationName },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: route.h1, item: absoluteUrl },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border/50 bg-white pt-24 lg:pt-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative mx-auto aspect-square w-full max-w-[34rem] bg-secondary/20 [border-radius:0] sm:max-w-[38rem] lg:max-w-[42rem]">
              <CloudinaryImage
                src={heroImage.image}
                alt={heroImage.imageAlt}
                fill
                className="object-contain [border-radius:0]"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 38rem, 42rem"
              />
            </div>
            <div className="mx-auto max-w-4xl px-6 py-10 text-center sm:px-10 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                Galeo Beauty Hartbeespoort
              </p>
              <h1 className="mx-auto mt-5 max-w-4xl font-sans text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[0.08em] text-foreground sm:text-[2.4rem] lg:text-[3rem]">
                {route.h1}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {intro}
              </p>
              <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                <div className="border border-border/70 bg-secondary/10 px-4 py-3">
                  Clear treatment menu
                </div>
                <div className="border border-border/70 bg-secondary/10 px-4 py-3">
                  Online booking request
                </div>
                <div className="border border-border/70 bg-secondary/10 px-4 py-3">
                  {areaCopy}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/40 bg-stone-50/70 py-14 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                Choose Your Treatment
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                Compare the available options, check prices and choose the appointment line that best matches what you want done.
              </p>
            </div>
          </div>
        </section>

        <CategoryContent
          subcategories={route.category.subcategories}
          categoryId={route.categoryId}
          categoryTitle={route.category.title}
          localLocationSlug={route.locationSlug}
        />

        <section className="bg-stone-50/70 px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-4xl border border-[#2b2b2f] bg-[#171719] p-8 text-center text-white shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14">
            <h2 className="mx-auto max-w-2xl font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-white md:text-[2rem]">
              Ready to book with Galeo Beauty?
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-lg text-white/70">
              Send your request and we will help you confirm the right appointment.
            </p>
            <Button asChild size="lg" className="w-full rounded-none bg-gold px-10 font-semibold text-white hover:bg-gold-dark sm:w-auto">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function LocalServiceLandingPage({ route }: { route: LocalServiceRoute }) {
  const location = getLocationBySlug(route.locationSlug) ?? getLocationBySlug("hartbeespoort");
  const seoService = getCachedSEOServices().find((service) => service.slug === route.service.id);
  const subcategory = getServiceSubcategory(route);

  if (!location || !seoService || !subcategory) {
    notFound();
  }

  const displayService = {
    ...route.service,
    name: route.serviceLabel,
    description: "",
    imageAlt: `${route.serviceLabel} at Galeo Beauty`,
  };
  const displaySeoService = {
    ...seoService,
    keyword: route.serviceLabel,
  };
  const richDescription = generateServiceDescription(displayService, route.category.title, subcategory.title);
  const intro = route.relation === "in"
    ? generateServiceIntro(displaySeoService, location)
    : `${generateServiceIntro(displaySeoService, location)} Galeo Beauty is based in Hartbeespoort, so clients from ${route.locationName} can plan this as a destination salon visit.`;
  const heroImage = resolveServicePageHeroImage({
    categoryId: route.categoryId,
    categoryTitle: route.category.title,
    subcategoryTitle: subcategory.title,
    serviceSlug: route.service.id,
    item: displayService,
    fallbackImage: route.service.image ?? seoService.image,
    fallbackAlt: `${route.serviceLabel} at Galeo Beauty`,
  });
  const specialOffer = getSpecialForService(route.categoryId, route.service.id);
  const bookingItem = {
    ...(specialOffer ? getSpecialBookingItem(specialOffer) : displayService),
    name: route.serviceLabel,
    description: specialOffer
      ? `Special offer linked to ${route.serviceLabel}.`
      : displayService.description,
    seoKeywords: route.service.seoKeywords?.map((keyword) =>
      keyword.toLowerCase().includes(route.service.name.toLowerCase())
        ? keyword.replace(new RegExp(route.service.name, "gi"), route.serviceLabel)
        : keyword
    ),
  };
  const displayedPrice = specialOffer?.specialPrice ?? route.service.price;
  const schemaPrice = displayedPrice.replace(/[^\d.]/g, "");
  const benefits = getServiceSpecificBenefits(displaySeoService);
  const dynamicBestFor = generateDynamicBestFor(route.serviceLabel, richDescription, route.categoryId);
  const faqs = getServiceFAQs(displaySeoService, location);
  const treatmentProcess = getTreatmentProcess(displaySeoService, location);
  const relatedServices = getCachedSEOServices()
    .filter((service) => service.categoryId === route.categoryId && service.slug !== route.service.id)
    .slice(0, 6)
    .flatMap((service) => {
      const localRoute = getLocalServiceRoute(route.categoryId, service.slug, route.locationSlug);
      return localRoute ? [{ ...service, href: localRoute.serviceHref, displayLabel: localRoute.serviceLabel }] : [];
    });
  const imageUrl = toAbsoluteUrl(heroImage.image);
  const absoluteUrl = `${SITE_ORIGIN}${route.serviceHref}`;
  const parentUrl = `${SITE_ORIGIN}${route.href}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: route.serviceH1,
      description: `${intro} ${richDescription}`,
      url: absoluteUrl,
      image: imageUrl,
      serviceType: [route.serviceLabel, route.category.title, subcategory.title].filter(Boolean),
      provider: {
        "@type": "BeautySalon",
        name: "Galeo Beauty Salon & Spa",
        telephone: businessInfo.phone,
        url: SITE_ORIGIN,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: businessInfo.address.street,
          addressLocality: "Hartbeespoort",
          addressRegion: "North West",
          postalCode: "0216",
          addressCountry: "ZA",
        },
      },
      offers: {
        "@type": "Offer",
        url: absoluteUrl,
        price: schemaPrice,
        priceCurrency: "ZAR",
        availability: "https://schema.org/InStock",
      },
      areaServed: { "@type": "City", name: route.locationName },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: route.h1, item: parentUrl },
        { "@type": "ListItem", position: 3, name: route.serviceLabel, item: absoluteUrl },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="bg-background">
        <section className="border-b border-border/50 bg-white pt-24 lg:pt-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative mx-auto aspect-square w-full max-w-[34rem] bg-secondary/20 [border-radius:0] sm:max-w-[38rem] lg:max-w-[42rem]">
              <CloudinaryImage
                src={heroImage.image}
                alt={heroImage.imageAlt}
                fill
                priority
                className="object-contain [border-radius:0]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 38rem, 42rem"
              />
            </div>

            <div className="mx-auto max-w-4xl px-6 py-10 text-center sm:px-10 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                {route.category.title}
              </p>
              <h1 className="mx-auto mt-5 max-w-4xl font-sans text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[0.08em] text-foreground sm:text-[2.4rem] lg:text-[3rem]">
                {route.serviceH1}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {intro}
              </p>

              <div className="mx-auto mt-8 max-w-3xl border border-border bg-white p-4 shadow-[0_18px_50px_-42px_rgba(0,0,0,0.24)] sm:p-5">
                <div className="grid gap-3 text-center text-sm text-muted-foreground sm:grid-cols-3 sm:items-center sm:text-left">
                  <div className="border border-border/70 bg-secondary/10 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-center">
                    {specialOffer?.originalPrice && (
                      <span className="block text-sm text-muted-foreground line-through">{specialOffer.originalPrice}</span>
                    )}
                    <span className="block text-2xl font-bold text-gold">{displayedPrice}</span>
                    {specialOffer && (
                      <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        {specialOffer.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 border border-border/70 bg-secondary/10 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <Clock className="h-5 w-5" />
                    {route.service.duration || "Duration varies"}
                  </div>
                  <div className="flex items-center justify-center gap-2 border border-border/70 bg-secondary/10 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                    <MapPin className="h-5 w-5" />
                    Hartbeespoort
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <ServiceBookingButton
                    item={bookingItem}
                    categoryId={route.categoryId}
                    categoryTitle={route.category.title}
                    subcategoryId={subcategory.id}
                    subcategoryTitle={subcategory.title}
                    label="Book Treatment"
                    className="w-full"
                  />
                  <Button asChild size="lg" variant="outline" className="w-full rounded-none">
                    <NavLink href={route.href}>View All {route.category.title}</NavLink>
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

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                Why Choose Us
              </h2>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                What you can expect when booking this treatment with Galeo Beauty.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 border border-border/60 bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.28)]">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-10 text-center font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
              What to Expect
            </h2>
            <div className="space-y-6">
              {treatmentProcess.map((step) => (
                <div key={step.step} className="flex gap-4 sm:gap-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-gold bg-gold/10 sm:h-12 sm:w-12">
                    <span className="text-lg font-bold text-gold">{step.step}</span>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="bg-secondary/20 py-16">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                  FAQs
                </h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border border-border bg-background p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.24)]">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">{faq.question}</h3>
                    <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedServices.length > 0 && (
          <section className="bg-white py-16">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                  Related Treatments
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={related.href}
                    className="group border border-border/60 bg-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                      {related.displayLabel}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{related.price}</span>
                      {related.duration && <span>{related.duration}</span>}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
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
