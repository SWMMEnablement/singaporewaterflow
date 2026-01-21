import { FunFact } from "./FunFact";
import { TechnicalAnnotation } from "./TechnicalAnnotation";
import { User, Calendar, MapPin, BookOpen } from "lucide-react";

export const StVenantStory = () => {
  return (
    <section id="who-was-st-venant" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="bubble mb-4">📚 History Time!</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Who Was St. Venant?
            </h2>
            <p className="text-lg text-muted-foreground">
              Meet the clever French scientist who figured out how water moves!
            </p>
          </div>

          <div className="fun-card mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-card rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-6xl">👨‍🔬</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-secondary rounded-full p-2 shadow-lg">
                  <span className="text-2xl">🇫🇷</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Adhémar Jean Claude Barré de Saint-Venant
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  That&apos;s a super long name! Everyone just calls him &quot;St. Venant.&quot; 
                  He was a French engineer and mathematician who LOVED studying how water moves!
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>1797 - 1886</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>France</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>Engineer & Mathematician</span>
                  </div>
                </div>

                <TechnicalAnnotation title="Academic Background">
                  <p>
                    Saint-Venant was educated at the École Polytechnique and later became a member of 
                    the French Academy of Sciences. His 1871 paper "Théorie du mouvement non permanent 
                    des eaux" introduced the shallow water equations. He also made significant 
                    contributions to elasticity theory (Saint-Venant's principle) and torsion analysis.
                  </p>
                </TechnicalAnnotation>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="fun-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-lg font-bold">As a Kid</h4>
              </div>
              <p className="text-muted-foreground">
                When St. Venant was young (like you!), he loved watching rivers and 
                streams. He wondered: &quot;Why does water flow the way it does?&quot; 🤔
              </p>
            </div>

            <div className="fun-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-accent/20 rounded-xl p-2">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="font-display text-lg font-bold">Grown Up Genius</h4>
              </div>
              <p className="text-muted-foreground">
                He studied really hard and became a famous engineer. In 1871, 
                he wrote his famous equations about how water flows in rivers and channels!
              </p>
              <TechnicalAnnotation title="Historical Context">
                <p>
                  The St. Venant equations were derived before computers existed. Engineers solved 
                  them using graphical methods and simplified approximations until numerical methods 
                  became practical in the 1960s-70s.
                </p>
              </TechnicalAnnotation>
            </div>
          </div>

          <FunFact>
            St. Venant lived to be 89 years old - that&apos;s really old for someone in the 1800s! 
            He spent his whole life studying water, soil, and how things bend and twist. 
            Scientists still use his ideas today, over 150 years later!
          </FunFact>
        </div>
      </div>
    </section>
  );
};
