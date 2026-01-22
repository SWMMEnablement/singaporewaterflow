import { Building2, Sun, Waves, Cpu, CloudRain, Droplets } from "lucide-react";
import { TechnicalAnnotation } from "./TechnicalAnnotation";
import dubaiDrainage from "@/assets/dubai-drainage.jpg";

export const DubaiSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🇦🇪 United Arab Emirates
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Dubai: Desert City, Big Storms!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dubai doesn&apos;t get much rain, but when it DOES rain, it&apos;s a BIG deal! 
            Let&apos;s learn how they keep this amazing city safe! 🏙️
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={dubaiDrainage} 
            alt="Dubai cityscape with drainage infrastructure"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 text-center">
            <p className="font-medium">
              Dubai&apos;s drainage system must handle rare but intense flash floods! 🌊
            </p>
          </div>
        </div>

        {/* Why Dubai is Special */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="fun-card flex gap-4 items-start">
            <div className="bg-amber-200/50 dark:bg-amber-800/30 rounded-2xl p-3 flex-shrink-0">
              <Sun className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Desert Climate</h3>
              <p className="text-muted-foreground">
                Dubai only gets about 100mm of rain per year - that&apos;s 24 TIMES less than Singapore! 
                But when storms come, the dry ground can&apos;t absorb water quickly.
              </p>
            </div>
          </div>

          <div className="fun-card flex gap-4 items-start">
            <div className="bg-blue-200/50 dark:bg-blue-800/30 rounded-2xl p-3 flex-shrink-0">
              <CloudRain className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Flash Floods!</h3>
              <p className="text-muted-foreground">
                When rain finally comes, it can be INTENSE! A whole month&apos;s rain might fall in 
                just a few hours, turning streets into rivers if drains aren&apos;t ready.
              </p>
            </div>
          </div>

          <div className="fun-card flex gap-4 items-start">
            <div className="bg-gray-200/50 dark:bg-gray-800/30 rounded-2xl p-3 flex-shrink-0">
              <Building2 className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Super Tall Buildings!</h3>
              <p className="text-muted-foreground">
                Dubai has the world&apos;s tallest building - the Burj Khalifa (828m tall)! 
                Rain falling on these giants needs to go somewhere safely.
              </p>
            </div>
          </div>

          <div className="fun-card flex gap-4 items-start">
            <div className="bg-cyan-200/50 dark:bg-cyan-800/30 rounded-2xl p-3 flex-shrink-0">
              <Waves className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Man-Made Islands</h3>
              <p className="text-muted-foreground">
                Dubai built islands shaped like palm trees! Engineers had to design special 
                drainage for land that didn&apos;t exist before.
              </p>
            </div>
          </div>
        </div>

        {/* ICM InfoWorks Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950/40 dark:to-blue-950/40 rounded-3xl p-8 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500 rounded-xl p-3">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">ICM InfoWorks to the Rescue!</h3>
                <p className="text-muted-foreground">Dubai&apos;s Super-Smart Water Computer</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">🗺️</div>
                <h4 className="font-bold mb-1">3D City Model</h4>
                <p className="text-sm text-muted-foreground">
                  ICM InfoWorks builds a virtual copy of the ENTIRE city - every building, 
                  every road, every drain pipe! It&apos;s like a video game map of Dubai.
                </p>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold mb-1">Super Fast Math</h4>
                <p className="text-sm text-muted-foreground">
                  It solves the St. Venant equations for millions of points at once! 
                  What would take humans years, ICM does in hours.
                </p>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">🌧️</div>
                <h4 className="font-bold mb-1">Storm Simulator</h4>
                <p className="text-sm text-muted-foreground">
                  Engineers can test &quot;what if&quot; storms - like &quot;What if we got 50mm of rain 
                  in one hour?&quot; ICM shows exactly where floods would happen!
                </p>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">🔮</div>
                <h4 className="font-bold mb-1">Future Planning</h4>
                <p className="text-sm text-muted-foreground">
                  Before building new areas, Dubai uses ICM to plan drainage first! 
                  It predicts problems before they happen.
                </p>
              </div>
            </div>

            {/* How ICM Uses St. Venant */}
            <div className="bg-white/80 dark:bg-black/20 rounded-xl p-4">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-purple-600" />
                How ICM Uses Our Water Math!
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  1D: Pipes & Channels
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  2D: Street Flooding
                </span>
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 rounded-full text-sm">
                  Combined: Real World!
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                ICM InfoWorks uses St. Venant equations in TWO ways: <strong>1D</strong> for water 
                flowing through pipes and channels, and <strong>2D</strong> for water spreading 
                across streets and land. Together, they create a complete picture of where 
                every drop of water will go! 💧
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Box */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 text-center">
            <h4 className="font-display text-lg font-bold mb-3">
              🌏 Singapore vs Dubai: Different Problems, Same Math!
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-3">
                <div className="font-bold mb-1">🇸🇬 Singapore + SWMM5</div>
                <p className="text-muted-foreground">Lots of rain, all year round. Uses SWMM5 for daily drainage planning.</p>
              </div>
              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-3">
                <div className="font-bold mb-1">🇦🇪 Dubai + ICM InfoWorks</div>
                <p className="text-muted-foreground">Rare but intense storms. Uses ICM for flash flood preparation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Annotation */}
        <div className="max-w-4xl mx-auto mt-6">
          <TechnicalAnnotation title="ICM InfoWorks Technical Details">
            <div className="space-y-2 text-sm">
              <p>
                <strong>InfoWorks ICM (Integrated Catchment Modeling)</strong> is an advanced 
                hydraulic modeling platform developed by Innovyze (now part of Autodesk).
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>1D Engine:</strong> Solves full St. Venant equations for pipe/channel networks</li>
                <li><strong>2D Engine:</strong> Shallow water equations (2D St. Venant) for surface flooding</li>
                <li><strong>Coupling:</strong> Dynamic 1D-2D interaction at manholes, inlets, and banks</li>
                <li><strong>GPU Acceleration:</strong> CUDA support for faster 2D simulations</li>
              </ul>
              <p className="text-muted-foreground">
                While SWMM5 is open-source and widely used for routine analysis, ICM InfoWorks 
                offers advanced features for complex urban drainage including real-time control, 
                water quality modeling, and integrated sewer/river modeling.
              </p>
            </div>
          </TechnicalAnnotation>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute -top-10 -right-10 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />
    </section>
  );
};
