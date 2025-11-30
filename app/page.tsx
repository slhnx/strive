import { CTASection } from "@/components/blocks/cta-section";
import { FeaturesSection } from "@/components/blocks/feature-section";
import { HeroSection } from "@/components/blocks/hero-section-2";
import { HowItWorksSection } from "@/components/blocks/how-it-works-section";
import { StatsSection } from "@/components/blocks/stats-section";
import { TestimonialsSection } from "@/components/blocks/testimonials-section";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default async function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
