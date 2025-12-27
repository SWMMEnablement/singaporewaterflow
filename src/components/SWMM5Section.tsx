import { FunFact } from "./FunFact";
import { Monitor, Cpu, CloudRain, Zap } from "lucide-react";

export const SWMM5Section = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="bubble mb-4">💻 Computer Power!</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What is SWMM5?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A super cool computer program that uses St. Venant&apos;s equations 
              to protect cities from floods!
            </p>
          </div>

          <div className="fun-card mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-glow">
                  <Monitor className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  Storm Water Management Model
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>SWMM5</strong> stands for &quot;Storm Water Management Model, Version 5.&quot; 
                  It&apos;s like a video game, but instead of playing with characters, engineers 
                  play with water! They can see what happens when it rains hard and make sure 
                  cities don&apos;t flood. 🎮🌧️
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="fun-card text-center">
              <div className="bg-rain/20 rounded-2xl p-4 inline-block mb-4">
                <CloudRain className="w-10 h-10 text-primary" />
              </div>
              <h4 className="font-display font-bold mb-2">Simulates Rain</h4>
              <p className="text-sm text-muted-foreground">
                Engineers can pretend it&apos;s raining really hard and see what happens to all the water!
              </p>
            </div>

            <div className="fun-card text-center">
              <div className="bg-accent/20 rounded-2xl p-4 inline-block mb-4">
                <Cpu className="w-10 h-10 text-accent" />
              </div>
              <h4 className="font-display font-bold mb-2">Uses St. Venant</h4>
              <p className="text-sm text-muted-foreground">
                The program uses St. Venant&apos;s equations to calculate exactly where water will go!
              </p>
            </div>

            <div className="fun-card text-center">
              <div className="bg-secondary/40 rounded-2xl p-4 inline-block mb-4">
                <Zap className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h4 className="font-display font-bold mb-2">Super Fast</h4>
              <p className="text-sm text-muted-foreground">
                Computers can solve St. Venant&apos;s equations in seconds - it would take humans days!
              </p>
            </div>
          </div>

          <FunFact>
            SWMM was created by the United States Environmental Protection Agency (EPA) 
            way back in 1971! That&apos;s older than most of your parents! They&apos;ve made it 
            better and better, and now version 5 is used by engineers all around the world! 🌍
          </FunFact>
        </div>
      </div>
    </section>
  );
};
