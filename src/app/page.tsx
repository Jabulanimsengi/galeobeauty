import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  ReviewsSection,
  BrandsSection,
} from "@/components/sections";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.galeobeauty.com",
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

      </main>
      <Footer />
    </>
  );
}
