import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Play, Droplets, Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SurfaceType {
  id: string;
  name: string;
  emoji: string;
  manningN: number;
  color: string;
  bgGradient: string;
}

const SURFACES: SurfaceType[] = [
  { id: "concrete", name: "Smooth Concrete", emoji: "🏢", manningN: 0.013, color: "bg-gray-400", bgGradient: "from-gray-300 to-gray-500" },
  { id: "brick", name: "Brick Channel", emoji: "🧱", manningN: 0.015, color: "bg-orange-600", bgGradient: "from-orange-400 to-orange-700" },
  { id: "asphalt", name: "Asphalt Road", emoji: "🛣️", manningN: 0.016, color: "bg-gray-700", bgGradient: "from-gray-600 to-gray-800" },
  { id: "culvert", name: "Metal Culvert", emoji: "⭕", manningN: 0.024, color: "bg-zinc-500", bgGradient: "from-zinc-400 to-zinc-600" },
  { id: "gravel", name: "Gravel Path", emoji: "⚪", manningN: 0.025, color: "bg-stone-400", bgGradient: "from-stone-300 to-stone-500" },
  { id: "grass", name: "Grass Swale", emoji: "🌱", manningN: 0.035, color: "bg-green-500", bgGradient: "from-green-400 to-green-600" },
  { id: "rocky", name: "Rocky Stream", emoji: "🪨", manningN: 0.05, color: "bg-stone-600", bgGradient: "from-stone-500 to-stone-700" },
  { id: "forest", name: "Forest Floor", emoji: "🌲", manningN: 0.1, color: "bg-emerald-800", bgGradient: "from-emerald-600 to-emerald-900" },
];

interface DrainageRaceProps {
  className?: string;
}

export const DrainageRace = ({ className = "" }: DrainageRaceProps) => {
  const [leftSurface, setLeftSurface] = useState<SurfaceType>(SURFACES[0]);
  const [rightSurface, setRightSurface] = useState<SurfaceType>(SURFACES[5]);
  const [isRacing, setIsRacing] = useState(false);
  const [leftProgress, setLeftProgress] = useState(0);
  const [rightProgress, setRightProgress] = useState(0);
  const [winner, setWinner] = useState<"left" | "right" | "tie" | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const stopWaterFlowRef = useRef<(() => void) | null>(null);
  
  const { 
    playRaceStart, 
    startWaterFlow, 
    updateWaterFlowIntensity, 
    stopWaterFlow, 
    playVictoryFanfare 
  } = useSoundEffects();

  // Calculate velocity based on Manning's equation (simplified)
  const getVelocity = (n: number) => {
    const R = 0.1; // Hydraulic radius
    const S = 0.02; // Slope
    return (1 / n) * Math.pow(R, 2/3) * Math.pow(S, 0.5);
  };

  const startRace = () => {
    setIsRacing(true);
    setLeftProgress(0);
    setRightProgress(0);
    setWinner(null);
    startTimeRef.current = Date.now();

    // Play start sound and begin water flow
    if (soundEnabled) {
      playRaceStart();
      stopWaterFlowRef.current = startWaterFlow(0.3);
    }

    const leftVelocity = getVelocity(leftSurface.manningN);
    const rightVelocity = getVelocity(rightSurface.manningN);
    const maxVelocity = Math.max(leftVelocity, rightVelocity);

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const leftPos = Math.min(100, (leftVelocity / maxVelocity) * elapsed * 25);
      const rightPos = Math.min(100, (rightVelocity / maxVelocity) * elapsed * 25);

      setLeftProgress(leftPos);
      setRightProgress(rightPos);

      // Update water flow intensity based on progress
      if (soundEnabled) {
        const avgProgress = (leftPos + rightPos) / 200;
        updateWaterFlowIntensity(0.3 + avgProgress * 0.7);
      }

      if (leftPos >= 100 || rightPos >= 100) {
        setIsRacing(false);
        // Stop water flow and play victory
        if (soundEnabled) {
          stopWaterFlow();
          playVictoryFanfare();
        }
        if (leftPos >= 100 && rightPos >= 100) {
          setWinner("tie");
        } else if (leftPos >= 100) {
          setWinner("left");
        } else {
          setWinner("right");
        }
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const resetRace = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (soundEnabled) {
      stopWaterFlow();
    }
    setIsRacing(false);
    setLeftProgress(0);
    setRightProgress(0);
    setWinner(null);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      stopWaterFlow();
    };
  }, [stopWaterFlow]);

  // Reset race when surfaces change
  useEffect(() => {
    resetRace();
  }, [leftSurface, rightSurface]);

  const SurfaceSelector = ({ 
    selected, 
    onSelect, 
    label 
  }: { 
    selected: SurfaceType; 
    onSelect: (s: SurfaceType) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-1">
        {SURFACES.map((surface) => (
          <button
            key={surface.id}
            onClick={() => !isRacing && onSelect(surface)}
            disabled={isRacing}
            className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all text-center min-h-[3rem] ${
              selected.id === surface.id
                ? "border-primary bg-primary/10 scale-105"
                : "border-border hover:border-primary/50 disabled:opacity-50"
            }`}
            title={surface.name}
          >
            <div className="text-lg sm:text-xl">{surface.emoji}</div>
            <div className="text-[9px] sm:text-[10px] leading-tight text-muted-foreground truncate">
              {surface.name.split(" ")[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className={className}>
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Water Race! 🏁
          </CardTitle>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Pick two surfaces and watch water race through them. Which one is faster? 🔊
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Surface Selectors */}
        <div className="grid md:grid-cols-2 gap-4">
          <SurfaceSelector 
            selected={leftSurface} 
            onSelect={setLeftSurface} 
            label="🔵 Left Channel" 
          />
          <SurfaceSelector 
            selected={rightSurface} 
            onSelect={setRightSurface} 
            label="🟢 Right Channel" 
          />
        </div>

        {/* Race Track */}
        <div className="relative bg-secondary/30 rounded-xl p-4 overflow-hidden">
          {/* Left Track */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{leftSurface.emoji}</span>
              <span className="font-medium text-sm">{leftSurface.name}</span>
              <span className="text-xs text-muted-foreground">(n = {leftSurface.manningN})</span>
              {winner === "left" && <Trophy className="w-4 h-4 text-yellow-500 animate-bounce" />}
            </div>
            <div className={`relative h-12 rounded-lg overflow-hidden bg-gradient-to-r ${leftSurface.bgGradient}`}>
              {/* Water */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-100 flex items-center justify-end pr-1"
                style={{ width: `${leftProgress}%` }}
              >
                <Droplets className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              {/* Finish line */}
              <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-black via-white to-black opacity-50" />
              {/* Progress label */}
              <div className="absolute top-1 right-2 text-xs font-bold text-white/80 drop-shadow">
                {Math.round(leftProgress)}%
              </div>
            </div>
          </div>

          {/* Right Track */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{rightSurface.emoji}</span>
              <span className="font-medium text-sm">{rightSurface.name}</span>
              <span className="text-xs text-muted-foreground">(n = {rightSurface.manningN})</span>
              {winner === "right" && <Trophy className="w-4 h-4 text-yellow-500 animate-bounce" />}
            </div>
            <div className={`relative h-12 rounded-lg overflow-hidden bg-gradient-to-r ${rightSurface.bgGradient}`}>
              {/* Water */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-100 flex items-center justify-end pr-1"
                style={{ width: `${rightProgress}%` }}
              >
                <Droplets className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              {/* Finish line */}
              <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-black via-white to-black opacity-50" />
              {/* Progress label */}
              <div className="absolute top-1 right-2 text-xs font-bold text-white/80 drop-shadow">
                {Math.round(rightProgress)}%
              </div>
            </div>
          </div>

          {/* Winner announcement */}
          {winner && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl animate-in fade-in">
              <div className="text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2 animate-bounce" />
                <div className="font-display text-2xl font-bold">
                  {winner === "tie" ? "It's a Tie! 🤝" : 
                   winner === "left" ? `${leftSurface.emoji} ${leftSurface.name} Wins!` : 
                   `${rightSurface.emoji} ${rightSurface.name} Wins!`}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {winner === "tie" 
                    ? "Both surfaces have the same roughness!" 
                    : `Lower roughness (n = ${winner === "left" ? leftSurface.manningN : rightSurface.manningN}) means faster flow!`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <Button
            onClick={startRace}
            disabled={isRacing}
            className="gap-2"
          >
            <Play className="w-4 h-4" />
            {isRacing ? "Racing..." : "Start Race!"}
          </Button>
          <Button
            onClick={resetRace}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Explanation */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong>The Science:</strong> Smoother surfaces have lower roughness (n), 
            so water flows faster! Forest floors slow water down the most because of all 
            the leaves, branches, and bumpy ground.
          </p>
        </div>

        {/* Speed comparison */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
          <div className="bg-blue-500/10 rounded-lg p-2 sm:p-3">
            <div className="text-base sm:text-lg font-bold text-blue-600">
              {getVelocity(leftSurface.manningN).toFixed(2)} m/s
            </div>
            <div className="text-xs text-muted-foreground">{leftSurface.name} Speed</div>
          </div>
          <div className="bg-cyan-500/10 rounded-lg p-2 sm:p-3">
            <div className="text-base sm:text-lg font-bold text-cyan-600">
              {getVelocity(rightSurface.manningN).toFixed(2)} m/s
            </div>
            <div className="text-xs text-muted-foreground">{rightSurface.name} Speed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
