import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Play, RotateCcw } from "lucide-react";

interface RainDrop {
  id: number;
  delay: number;
  x: number;
}

interface RainfallComparisonProps {
  className?: string;
}

export const RainfallComparison = ({ className = "" }: RainfallComparisonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [singaporeDrops, setSingaporeDrops] = useState<RainDrop[]>([]);
  const [dubaiDrops, setDubaiDrops] = useState<RainDrop[]>([]);
  const [singaporeCount, setSingaporeCount] = useState(0);
  const [dubaiCount, setDubaiCount] = useState(0);

  const SINGAPORE_ANNUAL = 2400; // mm
  const DUBAI_ANNUAL = 100; // mm
  const ANIMATION_DURATION = 8000; // 8 seconds
  const DROPS_SCALE = 0.05; // Each visual drop represents 20mm

  const startAnimation = () => {
    setIsAnimating(true);
    setSingaporeCount(0);
    setDubaiCount(0);
    setSingaporeDrops([]);
    setDubaiDrops([]);

    // Generate drops with staggered timing
    const sgDropsTotal = Math.floor(SINGAPORE_ANNUAL * DROPS_SCALE);
    const dbDropsTotal = Math.floor(DUBAI_ANNUAL * DROPS_SCALE);

    const newSgDrops: RainDrop[] = Array.from({ length: sgDropsTotal }, (_, i) => ({
      id: i,
      delay: (i / sgDropsTotal) * (ANIMATION_DURATION - 1000),
      x: 10 + Math.random() * 80,
    }));

    const newDbDrops: RainDrop[] = Array.from({ length: dbDropsTotal }, (_, i) => ({
      id: i,
      delay: (i / dbDropsTotal) * (ANIMATION_DURATION - 1000),
      x: 10 + Math.random() * 80,
    }));

    setSingaporeDrops(newSgDrops);
    setDubaiDrops(newDbDrops);

    // Animate counters
    const startTime = Date.now();
    const counterInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      
      setSingaporeCount(Math.floor(SINGAPORE_ANNUAL * progress));
      setDubaiCount(Math.floor(DUBAI_ANNUAL * progress));

      if (progress >= 1) {
        clearInterval(counterInterval);
        setIsAnimating(false);
      }
    }, 50);
  };

  const reset = () => {
    setIsAnimating(false);
    setSingaporeCount(0);
    setDubaiCount(0);
    setSingaporeDrops([]);
    setDubaiDrops([]);
  };

  return (
    <Card className={className}>
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-amber-500/10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Droplets className="w-6 h-6 text-primary" />
          Rainfall Showdown: Singapore vs Dubai
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Watch a year&apos;s worth of rain fall in seconds! Which city gets more?
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Comparison Visualization */}
        <div className="grid grid-cols-2 gap-4">
          {/* Singapore */}
          <div className="relative">
            <div className="text-center mb-2">
              <span className="text-2xl">🇸🇬</span>
              <h3 className="font-bold">Singapore</h3>
              <p className="text-xs text-muted-foreground">Tropical Monsoon</p>
            </div>
            
            {/* Rain container */}
            <div className="relative h-48 bg-gradient-to-b from-gray-700 via-gray-600 to-green-800 rounded-lg overflow-hidden">
              {/* Clouds */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-4xl opacity-80">☁️</div>
              
              {/* Animated drops */}
              {singaporeDrops.map((drop) => (
                <div
                  key={drop.id}
                  className="absolute w-1.5 h-3 bg-blue-400 rounded-full animate-fall"
                  style={{
                    left: `${drop.x}%`,
                    animationDelay: `${drop.delay}ms`,
                    animationDuration: "1s",
                  }}
                />
              ))}
              
              {/* Water level */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500"
                style={{ height: `${(singaporeCount / SINGAPORE_ANNUAL) * 60}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300/50 animate-pulse" />
              </div>
              
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-900" />
            </div>
            
            {/* Counter */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-primary">
                {singaporeCount.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">mm per year</div>
              <div className="text-xs text-muted-foreground mt-1">
                ≈ {Math.round(singaporeCount / 10)} bathtubs!
              </div>
            </div>
          </div>

          {/* Dubai */}
          <div className="relative">
            <div className="text-center mb-2">
              <span className="text-2xl">🇦🇪</span>
              <h3 className="font-bold">Dubai</h3>
              <p className="text-xs text-muted-foreground">Desert Climate</p>
            </div>
            
            {/* Rain container */}
            <div className="relative h-48 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-lg overflow-hidden">
              {/* Sun */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-4xl">☀️</div>
              
              {/* Occasional cloud during rain */}
              {isAnimating && dubaiDrops.length > 0 && (
                <div className="absolute top-2 right-4 text-2xl opacity-60 animate-pulse">⛅</div>
              )}
              
              {/* Animated drops (much fewer) */}
              {dubaiDrops.map((drop) => (
                <div
                  key={drop.id}
                  className="absolute w-2 h-4 bg-blue-500 rounded-full animate-fall"
                  style={{
                    left: `${drop.x}%`,
                    animationDelay: `${drop.delay}ms`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
              
              {/* Water level (much smaller) */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500"
                style={{ height: `${(dubaiCount / SINGAPORE_ANNUAL) * 60}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-300/50 animate-pulse" />
              </div>
              
              {/* Sand ground */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-700" />
            </div>
            
            {/* Counter */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-600">
                {dubaiCount.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">mm per year</div>
              <div className="text-xs text-muted-foreground mt-1">
                ≈ {Math.round(dubaiCount / 10) || "<1"} bathtub
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <Button
            onClick={startAnimation}
            disabled={isAnimating}
            className="gap-2"
          >
            <Play className="w-4 h-4" />
            {isAnimating ? "Raining..." : "Start Rain!"}
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Comparison Stats */}
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="font-bold mb-3 text-center">📊 The Difference</h4>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-mono text-lg font-bold text-primary">24×</div>
              <div className="text-xs text-muted-foreground">More rain in Singapore</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold">2,300mm</div>
              <div className="text-xs text-muted-foreground">Difference</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-amber-600">~15</div>
              <div className="text-xs text-muted-foreground">Rainy days in Dubai/yr</div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Fun Fact:</strong> Singapore gets as much rain in ONE MONTH as 
            Dubai gets in an entire YEAR! That&apos;s why Singapore needs constant drainage, 
            while Dubai prepares for rare but intense flash floods.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
