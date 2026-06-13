import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import LandingPricing from "@/components/home/LandingPricing";
import HowItWorksSection from "@/components/HowItWorksSection";


export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
        <HowItWorksSection />
        <FeaturedJobsSection />
        <FeaturesSection />
        <LandingPricing />
        <CTASection />
      </div>
    </>
  );
}
