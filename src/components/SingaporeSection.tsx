import { Building2, TreePine, Waves, Umbrella } from "lucide-react";

export const SingaporeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-accent/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bubble mb-4">🇸🇬 Singapore</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Singapore Needs This Math!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Singapore is a tiny island with BIG rain! Here&apos;s why the St. Venant equations 
            help keep Singapore safe and dry! 🌧️
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="fun-card flex gap-4 items-start">
            <div className="bg-rain/20 rounded-2xl p-3 flex-shrink-0">
              <Umbrella className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Lots of Rain!</h3>
              <p className="text-muted-foreground">
                Singapore gets about 2,400mm of rain every year - that&apos;s like filling a bathtub 
                24 times in ONE spot! The equations help us know where all that water will go.
              </p>
            </div>
          </div>

          <div className="fun-card flex gap-4 items-start">
            <div className="bg-grass/20 rounded-2xl p-3 flex-shrink-0">
              <TreePine className="w-8 h-8 text-grass" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Garden City</h3>
              <p className="text-muted-foreground">
                Singapore is called a &quot;Garden City&quot; because it has so many trees and parks! 
                Engineers use these equations to build drains that don&apos;t hurt the plants.
              </p>
            </div>
          </div>

          <div className="fun-card flex gap-4 items-start">
            <div className="bg-secondary/40 rounded-2xl p-3 flex-shrink-0">
              <Building2 className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Crowded Island</h3>
              <p className="text-muted-foreground">
                More than 5 million people live on this small island! That means lots of buildings 
                and roads, so engineers need to be EXTRA careful about where water flows.
              </p>
            </div>
          </div>

          <div className="fun-card flex gap-4 items-start">
            <div className="bg-water-light/30 rounded-2xl p-3 flex-shrink-0">
              <Waves className="w-8 h-8 text-water-dark" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">SWMM5 to the Rescue!</h3>
              <p className="text-muted-foreground">
                Singapore uses a computer program called SWMM5 that uses St. Venant&apos;s equations 
                to plan perfect drains - like a video game for water!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};
