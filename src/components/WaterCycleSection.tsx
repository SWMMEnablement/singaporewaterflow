import { Cloud, Droplets, ArrowDown, Building2, Waves, Repeat, Volume2, VolumeX } from "lucide-react";
import { WaterAnimation } from "./WaterAnimation";
import { useRainAmbience } from "@/hooks/useRainAmbience";

const cycleSteps = [
  {
    step: 1,
    icon: Cloud,
    title: "Clouds Form",
    emoji: "☁️",
    description: "Water from the ocean evaporates (turns into invisible gas) and rises up to make fluffy clouds!",
    color: "bg-cloud",
  },
  {
    step: 2,
    icon: Droplets,
    title: "Rain Falls",
    emoji: "🌧️",
    description: "When clouds get too heavy with water, it falls as rain! Singapore gets lots of tropical rain.",
    color: "bg-rain/30",
  },
  {
    step: 3,
    icon: Building2,
    title: "Hits the Ground",
    emoji: "🏙️",
    description: "Rain lands on rooftops, roads, and sidewalks. In cities like Singapore, water can't soak into concrete!",
    color: "bg-muted",
  },
  {
    step: 4,
    icon: Waves,
    title: "Becomes Stormwater",
    emoji: "💨",
    description: "The water rushes into drains and canals - this is stormwater! St. Venant's math helps track it.",
    color: "bg-primary/20",
  },
  {
    step: 5,
    icon: Repeat,
    title: "Back to the Sea",
    emoji: "🌊",
    description: "Drains carry the water to reservoirs or the ocean, where it evaporates again. The cycle repeats!",
    color: "bg-accent/20",
  },
];

export const WaterCycleSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bubble mb-4">🔄 The Journey of Water</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the Water Cycle!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow a raindrop&apos;s adventure from the sky to the drains of Singapore! 
            This is how rain becomes stormwater. 💧➡️🌊
          </p>
        </div>

        {/* Animated Water Graphic */}
        <div className="max-w-4xl mx-auto mb-12">
          <WaterAnimation />
        </div>

        {/* Visual Cycle Diagram */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cloud via-rain to-primary/40 -translate-y-1/2 z-0 rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {cycleSteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center">
                  {/* Step Card */}
                  <div className={`fun-card w-full text-center hover:scale-105 transition-transform duration-300 ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-8'}`}>
                    <div className={`${step.color} rounded-2xl p-4 inline-block mb-3`}>
                      <step.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="text-3xl mb-2">{step.emoji}</div>
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {step.step}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow for mobile */}
                  {index < cycleSteps.length - 1 && (
                    <div className="md:hidden my-2">
                      <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Singapore Specific Info */}
        <div className="max-w-3xl mx-auto">
          <div className="fun-card bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="text-6xl animate-float">🇸🇬</div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">
                  Why Singapore is Special! 🌴
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Singapore is near the equator, so it&apos;s warm and rainy all year! 
                  The island gets sudden, heavy rainstorms called <strong>&quot;monsoons&quot;</strong>. 
                  That&apos;s why engineers need St. Venant&apos;s equations to build drains 
                  that can handle SO much water at once!
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-rain/20 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    🌧️ 167 rainy days/year
                  </span>
                  <span className="bg-sunshine/30 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    ☀️ Tropical climate
                  </span>
                  <span className="bg-grass/20 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    🌳 City in a garden
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-4xl animate-float opacity-60">💧</div>
      <div className="absolute bottom-40 right-10 text-3xl animate-float opacity-50" style={{ animationDelay: '-1s' }}>☁️</div>
      <div className="absolute top-40 right-1/4 text-2xl animate-float opacity-40" style={{ animationDelay: '-2s' }}>🌧️</div>
    </section>
  );
};
