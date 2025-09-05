import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SlidingHeroSection from "@/components/sections/SlidingHeroSection";
import KeyHighlightsSection from "@/components/sections/KeyHighlightsSection";
import AnimatedSolutionsSection from "@/components/sections/AnimatedSolutionsSection";
import WhyAxisoSection from "@/components/sections/WhyAxisoSection";
import CaseStudiesSlider from "@/components/sections/CaseStudiesSlider";
import FinalCTASection from "@/components/sections/FinalCTASection";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <SlidingHeroSection />
        <KeyHighlightsSection />
        <AnimatedSolutionsSection />
        <WhyAxisoSection />
        <CaseStudiesSlider />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
