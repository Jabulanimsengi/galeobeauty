import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { NavLink } from "@/components/ui/nav-link";
import {
  HeroSection,
  HomepageFaqSection,
  StatsSection,
  ServicesSection,
  ReviewsSection,
  BrandsSection,
  HomepageLocationSection,
} from "@/components/sections";
import { businessInfo } from "@/lib/constants";
import { buildHomepageKeywords } from "@/lib/seo-keywords";

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

const popularServiceColumns = [
  [
    { href: "/prices/hair/cut-blow-short", label: "Cut & Blow Dry", price: "R378" },
    { href: "/prices/hair/tint-roots", label: "Root Tint", price: "R522" },
    { href: "/prices/hair/balayage", label: "Balayage", price: "R765" },
  ],
  [
    { href: "/prices/nails/gel-overlay-hands", label: "Gel Overlay", price: "R342" },
    { href: "/prices/nails/acrylic-tips", label: "Acrylic Tips", price: "R432" },
    { href: "/prices/nails/pedicure", label: "Pedicure", price: "R279" },
  ],
  [
    { href: "/prices/lashes-brows/classic-lashes", label: "Classic Lashes", price: "R450" },
    { href: "/prices/lashes-brows/hybrid-lashes", label: "Hybrid Lashes", price: "R500" },
    { href: "/prices/lashes-brows/lash-lift-tint", label: "Lash Lift & Tint", price: "R405" },
  ],
];

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
      <main>
        <section className="relative min-h-[200svh]">
          <HeroSection />
          <BrandsSection />
        </section>
        <ServicesSection />
        <section className="bg-white py-10 md:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="border-y border-border/30 py-8 sm:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold/85">
                  Most Popular
                </span>
                <h2 className="mx-auto max-w-[12ch] font-serif text-3xl text-foreground sm:text-[3.1rem]">
                  Services
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                  A quick look at the treatments clients book most often at Galeo Beauty.
                </p>
              </div>

              <div className="mx-auto mt-8 max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                  {popularServiceColumns.map((column, columnIndex) => (
                    <div key={`popular-column-${columnIndex}`} className="space-y-0">
                      {column.map((service) => (
                        <NavLink
                          key={service.href}
                          href={service.href}
                          className="flex items-center justify-between gap-4 border-b border-foreground/20 py-3 text-foreground transition-colors duration-300 hover:text-gold"
                        >
                          <span className="text-base leading-6 sm:text-[1.05rem]">
                            {service.label}
                          </span>
                          <span className="shrink-0 text-base leading-6 text-foreground/80 sm:text-[1.05rem]">
                            {service.price}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <NavLink
                    href="/prices"
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-gold hover:text-white"
                  >
                    All Services
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
        <StatsSection />
        <HomepageFaqSection faqs={homepageFaqs} />
        <ReviewsSection />
        <HomepageLocationSection />
      </main>
      <Footer />
    </>
  );
}
