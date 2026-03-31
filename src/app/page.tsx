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

const priorityLinks = [
  { href: "/prices/hair", label: "Hair" },
  { href: "/prices/hair-extensions", label: "Hair Extensions" },
  { href: "/prices/nails", label: "Nails" },
  { href: "/prices/massages", label: "Massage" },
  { href: "/prices/permanent-makeup", label: "Permanent Makeup" },
  { href: "/prices/lashes-brows", label: "Lashes" },
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
        <HeroSection />
        <BrandsSection />
        <ServicesSection />
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="rounded-[2rem] border border-border/40 bg-secondary/10 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-12">
                <div className="text-center lg:text-left">
                  <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold/85">
                    Start Here
                  </span>
                  <h2 className="mb-3 font-serif text-2xl text-foreground sm:text-3xl lg:max-w-[12ch]">
                    Most Requested Treatments
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
                    Explore the treatment categories clients book most often at Galeo Beauty.
                  </p>
                </div>

                <div className="lg:pt-1">
                  <div className="mb-4 text-center lg:text-left">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-foreground/45">
                      Popular In Hartbeespoort
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {priorityLinks.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        className="rounded-full border border-gold/30 bg-background px-5 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <StatsSection />
        <HomepageFaqSection faqs={homepageFaqs} />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
