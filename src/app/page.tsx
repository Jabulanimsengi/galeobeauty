import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  ReviewsSection,
  BrandsSection,
} from "@/components/sections";

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
