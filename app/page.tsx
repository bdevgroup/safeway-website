import BannerSection from "@/components/BannerSection";
import HeroSection from "@/components/HeroSection";
import OurOffersSection from "@/components/OurOffersSection";
import ProjectProcessSection from "@/components/ProjectProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <ProjectProcessSection />
      <WhyChooseUsSection />
      <OurOffersSection />
      <TestimonialsSection />
    </>
  );
}
