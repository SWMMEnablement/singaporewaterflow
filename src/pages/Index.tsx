import { HeroSection } from "@/components/HeroSection";
import { StVenantStory } from "@/components/StVenantStory";
import { EquationExplainer } from "@/components/EquationExplainer";
import { SWMM5Section } from "@/components/SWMM5Section";
import { SingaporeSection } from "@/components/SingaporeSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StVenantStory />
      <EquationExplainer />
      <SWMM5Section />
      <SingaporeSection />
      <Footer />
    </main>
  );
};

export default Index;
