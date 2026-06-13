
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Pricing from "@/components/Pricing";


export default function Home() {
  return (
    <>
      <div>

        <HeroSection />
        <HowItWorksSection />
        <Pricing />
        <CTASection />
      </div>
    </>
  );
}
