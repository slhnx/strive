import CTASection from "@/components/blocks/cta-section";
import FeaturesSection from "@/components/blocks/feature-section";
import Footer from "@/components/blocks/footer";
import GamificationSection from "@/components/blocks/gamification-section";
import HeroSection from "@/components/blocks/hero-section-2";
import HowItWorksSection from "@/components/blocks/how-it-works-section";
import { TestimonialsSection } from "@/components/blocks/testimonials-section";


export default async function LandingPage() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <GamificationSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
