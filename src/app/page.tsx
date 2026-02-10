import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  ReviewsSection,
  BrandsSection,
  FeaturedServicesSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Galeo Beauty | Premier Salon & Medical Spa in Hartbeespoort",
  description:
    "Hartbeespoort's top-rated beauty salon & medical spa at Shop 6, Landsmeer, Jan Smuts Rd. Facials, injectables, IPL hair removal, permanent makeup, nails, lash extensions & body contouring. Book today.",
  keywords: [
    "beauty salon Hartbeespoort",
    "salon in Hartbeespoort",
    "medical spa Hartbeespoort Dam",
    "best beauty salon near me",
    "Galeo Beauty Hartbeespoort",
    "skincare clinic Hartbeespoort",
    "facials nails lashes Hartbeespoort",
    "salon Landsmeer Estate",
    "day spa Hartbeespoort Dam",
    "IPL hair removal Hartbeespoort",
    "permanent makeup Hartbeespoort",
    "beauty treatments near Pretoria",
  ],
  alternates: {
    canonical: "https://www.galeobeauty.com",
  },
  openGraph: {
    title: "Galeo Beauty | Premier Salon & Medical Spa in Hartbeespoort",
    description:
      "Top-rated beauty salon & medical spa in Hartbeespoort. Facials, injectables, IPL, permanent makeup, nails & more. Shop 6, Landsmeer.",
    url: "https://www.galeobeauty.com",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BrandsSection />
        <ServicesSection />
        <ReviewsSection />
        <StatsSection />
        <FeaturedServicesSection />

      </main>
      <Footer />
    </>
  );
}
