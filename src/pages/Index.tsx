import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StVenantStory } from "@/components/StVenantStory";
import { EquationExplainer } from "@/components/EquationExplainer";
import { WaterCycleSection } from "@/components/WaterCycleSection";
import { SWMM5Section } from "@/components/SWMM5Section";
import { SingaporeSection } from "@/components/SingaporeSection";
import { QuizSection } from "@/components/QuizSection";
import { Footer } from "@/components/Footer";
import { SlopeSimulator } from "@/components/SlopeSimulator";
import { RoughnessSimulator } from "@/components/RoughnessSimulator";

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
        
        {/* Interactive Simulators Section */}
        <section id="simulators" className="py-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                🎮 Try It Yourself!
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use these interactive tools to see how engineers think about water flow. 
                Change the settings and watch what happens!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Slope Simulator */}
              <div id="slope-simulator">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 text-center">
                  ⛷️ The Slope Slider
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Drag the pipe to make it steeper—watch water speed up!
                </p>
                <SlopeSimulator />
              </div>
              
              {/* Roughness Simulator */}
              <div id="roughness-simulator">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 text-center">
                  🌿 The Bumpy Surface
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Pick different ground types and see how they slow water down!
                </p>
                <RoughnessSimulator />
              </div>
            </div>
          </div>
        </section>
        
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
