import { EquationCard } from "./EquationCard";
import { FunFact } from "./FunFact";
import { Ruler, Timer, Gauge, Waves } from "lucide-react";

export const EquationExplainer = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="bubble mb-4">🧮 The Math Magic!</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              The St. Venant Equations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t worry - we&apos;ll explain these in a way that makes sense! 
              It&apos;s like learning the rules of a water game! 🎮
            </p>
          </div>

          {/* Simple Explanation First */}
          <div className="fun-card mb-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="font-display text-2xl font-bold text-center mb-6">
              🌊 Imagine You&apos;re Playing With Water!
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="text-5xl">🛁</div>
                <p className="font-semibold">Pour water in a tube</p>
                <p className="text-sm text-muted-foreground">
                  Water goes in at one end and comes out the other
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl">🏃‍♂️</div>
                <p className="font-semibold">Water moves fast or slow</p>
                <p className="text-sm text-muted-foreground">
                  Depending on how steep the tube is!
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl">📏</div>
                <p className="font-semibold">Water can be deep or shallow</p>
                <p className="text-sm text-muted-foreground">
                  Depending on how much water there is!
                </p>
              </div>
            </div>
            <p className="text-center mt-6 text-muted-foreground">
              <strong>St. Venant&apos;s equations</strong> are like rules that tell us exactly 
              how fast and how deep the water will be at any spot in the tube! 🎯
            </p>
          </div>

          {/* The Two Equations */}
          <h3 className="font-display text-xl font-bold text-center mb-6">
            There Are Two Main Rules:
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <EquationCard
              title="Rule 1: The Continuity Equation"
              equation="∂A/∂t + ∂Q/∂x = 0"
              description="This rule says: 'What goes in must come out!' If you pour water in one end of a pipe, the same amount has to come out somewhere. Water can't just disappear! 💨"
              icon={<Ruler className="w-6 h-6 text-primary" />}
            />

            <EquationCard
              title="Rule 2: The Momentum Equation"
              equation="∂Q/∂t + ∂(Q²/A)/∂x + gA∂h/∂x = gA(S₀ - Sƒ)"
              description="This rule is about how water speeds up and slows down. Gravity pulls water downhill, but the ground and walls slow it down. It's like sliding down a bumpy slide! 🛝"
              icon={<Gauge className="w-6 h-6 text-primary" />}
            />
          </div>

          {/* Symbol Explanations */}
          <div className="fun-card mb-10">
            <h4 className="font-display text-xl font-bold text-center mb-6">
              🔤 What Do These Letters Mean?
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 rounded-2xl p-4 text-center">
                <code className="text-2xl text-primary font-bold">A</code>
                <p className="text-sm text-muted-foreground mt-2">
                  How BIG the water channel is
                </p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-4 text-center">
                <code className="text-2xl text-primary font-bold">Q</code>
                <p className="text-sm text-muted-foreground mt-2">
                  How MUCH water is flowing
                </p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-4 text-center">
                <code className="text-2xl text-primary font-bold">h</code>
                <p className="text-sm text-muted-foreground mt-2">
                  How DEEP the water is
                </p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-4 text-center">
                <code className="text-2xl text-primary font-bold">g</code>
                <p className="text-sm text-muted-foreground mt-2">
                  Gravity pulling DOWN
                </p>
              </div>
            </div>
          </div>

          <FunFact>
            These equations are called &quot;partial differential equations&quot; - 
            that sounds fancy, but it just means they track how things change in 
            different directions at the same time. Like how your bath water can 
            get deeper AND flow to the other end at once! 🛁✨
          </FunFact>
        </div>
      </div>
    </section>
  );
};
