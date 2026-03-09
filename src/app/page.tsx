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

export const metadata: Metadata = {
  title: "Galeo Beauty | Hair, Nails, Beauty Salon & Medical Spa in Hartbeespoort",
  description:
    "Hair salon, nail salon, beauty salon and medical spa in Hartbeespoort. Visit Galeo Beauty at Shop 6, Landsmeer for hair, nails, facials, lashes, permanent makeup, massage and advanced aesthetics.",
  keywords: [
    "beauty salon Hartbeespoort",
    "hair salon Hartbeespoort",
    "hairdresser Hartbeespoort",
    "nail salon Hartbeespoort",
    "hair salon in Hartbeespoort",
    "salon Hartbeespoort",
    "salon in Hartbeespoort",
    "medical spa Hartbeespoort Dam",
    "beauty salon near me",
    "hair salon near me",
    "nail salon near me",
    "Galeo Beauty Hartbeespoort",
    "skincare clinic Hartbeespoort",
    "facials nails lashes Hartbeespoort",
    "nails Harties",
    "nails Hartbeespoort",
    "salon Landsmeer Estate",
    "day spa Hartbeespoort Dam",
    "IPL hair removal Hartbeespoort",
    "permanent makeup Hartbeespoort",
    "beauty treatments near Pretoria",
    "best massage spa Harties",
    "bridal makeup artist Hartbeespoort",
    "fat freezing clinic North West",
    "chemical peel near me",
    "hybrid lashes Hartbeespoort",
    "gel nails and acrylics Harties",
    "dermal fillers and injectables Harties"
  ],
  alternates: {
    canonical: "https://www.galeobeauty.com",
  },
  openGraph: {
    title: "Galeo Beauty | Hair, Nails, Beauty Salon & Medical Spa in Hartbeespoort",
    description:
      "Hair salon, nail salon, beauty salon and medical spa in Hartbeespoort. Hair, nails, facials, massage, lashes and advanced aesthetics at Galeo Beauty.",
    url: "https://www.galeobeauty.com",
    type: "website",
  },
};

const priorityLinks = [
  { href: "/prices/hair", label: "Hair Salon Hartbeespoort" },
  { href: "/prices/nails", label: "Nail Salon Hartbeespoort" },
  { href: "/prices/massages", label: "Massage Hartbeespoort" },
  { href: "/prices/permanent-makeup", label: "Permanent Makeup Hartbeespoort" },
  { href: "/prices/lashes-brows", label: "Lash Extensions Hartbeespoort" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BrandsSection />
        <ServicesSection />
        <ReviewsSection />
        <section className="py-12 md:py-16 border-y border-border/40 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
              Explore Our Most Requested Service Hubs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse the categories clients visit most often for hair, nails, massage, permanent makeup and lash treatments in Hartbeespoort.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {priorityLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-gold/30 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </section>
        <StatsSection />

      </main>
      <Footer />
    </>
  );
}
