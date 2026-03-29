import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { NavLink } from "@/components/ui/nav-link";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  ReviewsSection,
  BrandsSection,
} from "@/components/sections";
import { buildHomepageKeywords } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Galeo Beauty | Premium Salon & Medical Spa in Hartbeespoort",
  description:
    "Discover premium hair, nails, facials, lashes, body treatments, and advanced aesthetics at Galeo Beauty in Hartbeespoort.",
  keywords: buildHomepageKeywords(),
  alternates: {
    canonical: "https://www.galeobeauty.com",
  },
  openGraph: {
    title: "Galeo Beauty | Premium Salon & Medical Spa in Hartbeespoort",
    description:
      "A premium Hartbeespoort beauty destination for hair, nails, facials, body treatments, and advanced aesthetics.",
    url: "https://www.galeobeauty.com",
    type: "website",
  },
};

const priorityLinks = [
  { href: "/prices/hair", label: "Hair" },
  { href: "/prices/nails", label: "Nails" },
  { href: "/prices/massages", label: "Massage" },
  { href: "/prices/permanent-makeup", label: "Permanent Makeup" },
  { href: "/prices/lashes-brows", label: "Lashes" },
];

export default function HomePage() {
  return (
    <>
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
        <ReviewsSection />

      </main>
      <Footer />
    </>
  );
}
