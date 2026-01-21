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
        <div className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-6 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">🌧️ Ready for the Ultimate Challenge?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Use everything you've learned to save Singapore from a monsoon storm!
            </p>
            <a href="/storm-challenge" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
              Play Storm Challenge 🎮
            </a>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Index;
