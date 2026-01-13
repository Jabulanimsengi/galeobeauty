import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  AboutSection,
  ReviewsSection,
  BrandsSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <BrandsSection />
        <ServicesSection />
        <ReviewsSection />
        <StatsSection />

      </main>
      <Footer />
    </>
  );
}
