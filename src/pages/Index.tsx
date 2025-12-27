import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StVenantStory } from "@/components/StVenantStory";
import { EquationExplainer } from "@/components/EquationExplainer";
import { WaterCycleSection } from "@/components/WaterCycleSection";
import { SWMM5Section } from "@/components/SWMM5Section";
import { SingaporeSection } from "@/components/SingaporeSection";
import { QuizSection } from "@/components/QuizSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <HeroSection />
        <StVenantStory />
        <div id="equations">
          <EquationExplainer />
        </div>
        <div id="water-cycle">
          <WaterCycleSection />
        </div>
        <div id="swmm5">
          <SWMM5Section />
        </div>
        <div id="singapore">
          <SingaporeSection />
        </div>
        <QuizSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
