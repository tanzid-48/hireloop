
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Pricing from "@/components/Pricing";


export default function Home() {
  return (
    <>
      <div>

        <HeroSection />
        <HowItWorksSection />
         <FeaturedJobsSection />
        <Pricing />
        <CTASection />
      </div>
    </>
  );
}
