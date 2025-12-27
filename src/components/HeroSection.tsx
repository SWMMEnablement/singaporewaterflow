import { RainDrops } from "./RainDrops";
import { WaterWave } from "./WaterWave";
import { CloudDecoration } from "./CloudDecoration";
import { Droplets, ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <RainDrops />
      
      {/* Clouds */}
      <CloudDecoration className="absolute top-10 left-10 animate-float opacity-70" size="lg" />
      <CloudDecoration className="absolute top-20 right-20 animate-float opacity-60" size="md" style={{ animationDelay: "-1s" } as React.CSSProperties} />
      <CloudDecoration className="absolute top-32 left-1/4 animate-float opacity-50" size="sm" style={{ animationDelay: "-2s" } as React.CSSProperties} />

      <div className="container mx-auto px-6 text-center relative z-10 pt-10 pb-32">
        <div className="animate-bounce-slow inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6">
          <Droplets className="w-4 h-4" />
          <span>Learning Made Fun!</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          St. Venant for{" "}
          <span className="text-gradient">Grandkids</span>
          <span className="inline-block animate-wiggle ml-2">💧</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Ever wondered how cities stay dry when it rains really hard? 
          <br className="hidden md:block" />
          Let&apos;s learn about the amazing math that helps water flow safely! 🌊
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#who-was-st-venant"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-display font-bold text-lg hover:scale-105 transition-transform shadow-glow"
          >
            Start Learning!
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>

      <WaterWave />
    </section>
  );
};
