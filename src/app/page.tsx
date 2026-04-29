import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { NavLink } from "@/components/ui/nav-link";
import {
  HomepageBrandsMarqueeSection,
  HomepageCategoriesSection,
  HeroSection,
  HomepageFaqSection,
  ReviewsSection,
  HomepageLocationSection,
} from "@/components/sections";
import { businessInfo } from "@/lib/constants";
import { getPublishedIntentPages } from "@/lib/intent-pages";
import { buildHomepageKeywords } from "@/lib/seo-keywords";
import { serviceCategories } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Hair, Nails, Lashes & Beauty Salon in Hartbeespoort",
  description:
    "Discover hair, nails, facials, lash lift and tint, massage, waxing, IPL, and advanced aesthetics at Galeo Beauty in Hartbeespoort.",
  keywords: buildHomepageKeywords(),
  alternates: {
    canonical: "https://www.galeobeauty.com",
  },
  openGraph: {
    title: "Hair, Nails, Lashes & Beauty Salon in Hartbeespoort",
    description:
      "A Hartbeespoort beauty destination for hair, nails, facials, lashes, massage, waxing, IPL, and advanced aesthetics.",
    url: "https://www.galeobeauty.com",
    type: "website",
  },
};

type FeaturedPopularServiceSelection = {
  categoryId: string;
  serviceId: string;
  label?: string;
};

const featuredPopularServiceSelections: readonly FeaturedPopularServiceSelection[] = [
  { categoryId: "lashes-brows", serviceId: "hybrid-lashes" },
  { categoryId: "lashes-brows", serviceId: "lash-lift-tint", label: "Lash Lift & Tint" },
  { categoryId: "nails", serviceId: "gel-overlay-hands", label: "Gel Overlay" },
  { categoryId: "nails", serviceId: "pedicure" },
  { categoryId: "hair-extensions", serviceId: "tape-45cm-dark", label: "Tape In Extensions 45cm" },
  { categoryId: "massages", serviceId: "swedish-massage-60", label: "Swedish Massage" },
];

const featuredPopularServices = featuredPopularServiceSelections.map(
  ({ categoryId, serviceId, label }) => {
    const category = serviceCategories.find((item) => item.id === categoryId);
    const service = category?.subcategories
      .flatMap((subcategory) => subcategory.items)
      .find((item) => item.id === serviceId);

    if (!category || !service) {
      throw new Error(`Missing homepage popular service: ${categoryId}/${serviceId}`);
    }

    return {
      href: `/services/${category.id}/${service.id}`,
      label: label ?? service.name,
      price: service.price,
    };
  }
);

const homepageFaqs = [
  {
    question: "What services are offered by Galeo Beauty?",
    answer:
      "Galeo Beauty offers hair, hair extensions, nails, lashes and brows, facials, massage, waxing, IPL hair removal, permanent makeup, injectables, body contouring, and a wide range of advanced beauty treatments from the Hartbeespoort salon.",
  },
  {
    question: "Does Galeo Beauty also offer hair extensions?",
    answer:
      "Yes. Galeo Beauty offers premium hair extensions for clients who want added length, fullness, or a more polished finish alongside colour and styling services.",
  },
  {
    question: "Does Galeo Beauty offer nails and lash lift and tint in Hartbeespoort?",
    answer:
      "Yes. You can book nail services including gel and acrylic systems, as well as lash lift and tint, lash extensions, and brow treatments at Galeo Beauty in Hartbeespoort.",
  },
  {
    question: "Where can I check Galeo Beauty reviews?",
    answer:
      "You can browse testimonials on the Galeo Beauty site and read client feedback on Fresha and Google before you book.",
    links: [
      { label: "View Fresha Reviews", href: businessInfo.socials.fresha ?? "#" },
      { label: "View Google Reviews", href: businessInfo.socials.google ?? "#" },
    ],
  },
];

export default function HomePage() {
  const featuredGuides = getPublishedIntentPages().slice(0, 6);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="bg-white">
        <HeroSection />
        <HomepageBrandsMarqueeSection />
        <HomepageCategoriesSection />
        <section className="bg-[#17120f] py-12 text-[#f6f7f7] sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-8 text-center sm:mb-10">
              <div>
                <h2 className="mx-auto whitespace-nowrap font-sans text-[1.9rem] leading-[0.94] tracking-[-0.045em] text-white sm:text-[3.4rem] lg:text-[4rem]">
                  Popular Services
                </h2>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-1 border-t border-white/10 pt-2 md:grid-cols-2">
              {featuredPopularServices.map((service) => (
                <NavLink
                  key={service.href}
                  href={service.href}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-3.5 text-[#f6f7f7] transition-colors duration-300 hover:text-[#cfb284] sm:py-4"
                >
                  <span className="text-[0.94rem] leading-6 sm:text-[1.02rem]">
                    {service.label}
                  </span>
                  <span className="shrink-0 text-[0.72rem] uppercase tracking-[0.14em] text-white/55 sm:text-[0.78rem]">
                    {service.price}
                  </span>
                </NavLink>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
              <NavLink
                href="/services"
                className="inline-flex items-center justify-center bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#17120f] transition-colors duration-300 hover:bg-gold hover:text-white sm:text-sm"
              >
                All Services
              </NavLink>
            </div>
          </div>
        </section>
        {featuredGuides.length > 0 && (
          <section className="bg-stone-50/70 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mb-8 text-center sm:mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                  Beauty Guides
                </p>
                <h2 className="mx-auto mt-4 font-sans text-[1.9rem] font-bold uppercase leading-[1.04] tracking-[0.08em] text-foreground sm:text-[2.5rem] lg:text-[3rem]">
                  Helpful Before You Book
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredGuides.map((guide) => (
                  <NavLink
                    key={guide.slug}
                    href={`/${guide.slug}`}
                    className="group border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      Guide
                    </p>
                    <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-gold">
                      {guide.h1}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {guide.heroDescription}
                    </p>
                  </NavLink>
                ))}
              </div>

              <div className="mt-8 text-center">
                <NavLink
                  href="/guides"
                  className="inline-flex items-center justify-center border border-border bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold sm:text-sm"
                >
                  All Guides
                </NavLink>
              </div>
            </div>
          </section>
        )}
        <ReviewsSection />
        <HomepageLocationSection />
        <HomepageFaqSection faqs={homepageFaqs} />
      </main>
      <Footer />
    </>
  );
}
