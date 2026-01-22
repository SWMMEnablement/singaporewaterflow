import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StVenantStory } from "@/components/StVenantStory";
import { EquationExplainer } from "@/components/EquationExplainer";
import { WaterCycleSection } from "@/components/WaterCycleSection";
import { SWMM5Section } from "@/components/SWMM5Section";
import { SingaporeSection } from "@/components/SingaporeSection";
import { DubaiSection } from "@/components/DubaiSection";
import { QuizSection } from "@/components/QuizSection";
import { Footer } from "@/components/Footer";
import { SlopeSimulator } from "@/components/SlopeSimulator";
import { RoughnessSimulator } from "@/components/RoughnessSimulator";
import { DrainageGallery } from "@/components/DrainageGallery";
import { DrainageRace } from "@/components/DrainageRace";
import { RainfallComparison } from "@/components/RainfallComparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            
            {/* Water Race */}
            <div className="mt-12 max-w-3xl mx-auto">
              <DrainageRace />
            </div>
            
            {/* Real-World Gallery */}
            <div className="mt-12 max-w-4xl mx-auto">
              <DrainageGallery />
            </div>
          </div>
        </section>
        
        <div id="water-cycle">
          <WaterCycleSection />
        </div>
        <div id="swmm5">
          <SWMM5Section />
        </div>
        
        {/* City Case Studies with Tabs */}
        <section id="cities" className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                🌍 Cities Around the World
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Different cities face different water challenges! Explore how Singapore and Dubai 
                use water math to keep their cities safe.
              </p>
            </div>
            
            {/* Rainfall Comparison */}
            <div className="max-w-3xl mx-auto mb-12">
              <RainfallComparison />
            </div>
            
            <Tabs defaultValue="singapore" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="singapore" className="gap-2 text-base">
                  🇸🇬 Singapore
                </TabsTrigger>
                <TabsTrigger value="dubai" className="gap-2 text-base">
                  🇦🇪 Dubai
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="singapore" className="mt-0">
                <div id="singapore">
                  <SingaporeSection />
                </div>
              </TabsContent>
              
              <TabsContent value="dubai" className="mt-0">
                <DubaiSection />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <QuizSection />
        
        {/* Challenge Games CTA */}
        <div className="py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-amber-500/10">
          <div className="container mx-auto px-6">
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              🌧️ Ready for the Ultimate Challenges?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Singapore Challenge */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-3">🇸🇬</div>
                  <h4 className="font-display text-xl font-bold mb-2">Singapore Storm</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage a monsoon! Constant heavy rain tests your SWMM5 skills.
                  </p>
                  <a 
                    href="/storm-challenge" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold hover:bg-primary/90 transition-colors"
                  >
                    Play Monsoon Challenge 🌧️
                  </a>
                </div>
              </div>
              
              {/* Dubai Challenge */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-3">🇦🇪</div>
                  <h4 className="font-display text-xl font-bold mb-2">Dubai Flash Flood</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prepare for a rare but INTENSE storm! Test your ICM InfoWorks knowledge.
                  </p>
                  <a 
                    href="/dubai-challenge" 
                    className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-amber-700 transition-colors"
                  >
                    Play Flash Flood Challenge ⚡
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </>
  );
};

export default Index;
