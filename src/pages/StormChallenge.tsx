import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { TechnicalAnnotation } from "@/components/TechnicalAnnotation";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  CloudRain,
  Droplets,
  Home,
  Play,
  RotateCcw,
  Trophy,
  Waves,
  AlertTriangle,
  Volume2,
  VolumeX,
  Gauge,
  Timer,
  Zap,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface WaterDrop {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface DrainPipe {
  id: number;
  x: number;
  width: number;
  capacity: number;
  currentLoad: number;
}

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const DRAIN_Y = 350;

const StormChallenge = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "won" | "lost">("menu");
  const [score, setScore] = useState(0);
  const [waterCollected, setWaterCollected] = useState(0);
  const [waterLost, setWaterLost] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [rainfallIntensity, setRainfallIntensity] = useState(2);
  const [drainSize, setDrainSize] = useState(3);
  const [drops, setDrops] = useState<WaterDrop[]>([]);
  const [drains, setDrains] = useState<DrainPipe[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floodLevel, setFloodLevel] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropIdRef = useRef(0);
  
  const { playWaterDrop, playOverflow, playLevelComplete, playStart } = useSoundEffects();

  // Calculate drain configuration based on size setting
  const getDrainConfig = useCallback((size: number) => {
    const configs: Record<number, DrainPipe[]> = {
      1: [{ id: 1, x: 250, width: 100, capacity: 5, currentLoad: 0 }],
      2: [
        { id: 1, x: 150, width: 80, capacity: 4, currentLoad: 0 },
        { id: 2, x: 370, width: 80, capacity: 4, currentLoad: 0 },
      ],
      3: [
        { id: 1, x: 100, width: 80, capacity: 4, currentLoad: 0 },
        { id: 2, x: 260, width: 80, capacity: 5, currentLoad: 0 },
        { id: 3, x: 420, width: 80, capacity: 4, currentLoad: 0 },
      ],
      4: [
        { id: 1, x: 50, width: 70, capacity: 4, currentLoad: 0 },
        { id: 2, x: 180, width: 70, capacity: 4, currentLoad: 0 },
        { id: 3, x: 310, width: 90, capacity: 6, currentLoad: 0 },
        { id: 4, x: 450, width: 70, capacity: 4, currentLoad: 0 },
      ],
      5: [
        { id: 1, x: 30, width: 70, capacity: 4, currentLoad: 0 },
        { id: 2, x: 130, width: 70, capacity: 4, currentLoad: 0 },
        { id: 3, x: 230, width: 90, capacity: 6, currentLoad: 0 },
        { id: 4, x: 360, width: 70, capacity: 4, currentLoad: 0 },
        { id: 5, x: 460, width: 80, capacity: 5, currentLoad: 0 },
      ],
    };
    return configs[size] || configs[3];
  }, []);

  // Get difficulty settings
  const getDifficultySettings = useCallback((diff: "easy" | "medium" | "hard") => {
    const settings = {
      easy: { time: 45, floodThreshold: 60, targetWater: 30 },
      medium: { time: 60, floodThreshold: 40, targetWater: 50 },
      hard: { time: 90, floodThreshold: 25, targetWater: 80 },
    };
    return settings[diff];
  }, []);

  const startGame = useCallback(() => {
    const settings = getDifficultySettings(difficulty);
    setGameState("playing");
    setScore(0);
    setWaterCollected(0);
    setWaterLost(0);
    setTimeRemaining(settings.time);
    setFloodLevel(0);
    setDrops([]);
    setDrains(getDrainConfig(drainSize));
    dropIdRef.current = 0;
    
    if (soundEnabled) playStart();
    toast.info("🌧️ The monsoon is coming! Collect water and prevent flooding!");
  }, [difficulty, drainSize, getDifficultySettings, getDrainConfig, soundEnabled, playStart]);

  // Spawn water drops
  useEffect(() => {
    if (gameState !== "playing") return;

    const spawnRate = Math.max(100, 500 - rainfallIntensity * 80);
    
    spawnIntervalRef.current = setInterval(() => {
      const newDrops: WaterDrop[] = [];
      const dropsToSpawn = Math.ceil(rainfallIntensity / 2);
      
      for (let i = 0; i < dropsToSpawn; i++) {
        newDrops.push({
          id: dropIdRef.current++,
          x: Math.random() * (GAME_WIDTH - 20) + 10,
          y: -10 - Math.random() * 30,
          speed: 2 + rainfallIntensity * 0.5 + Math.random(),
        });
      }
      
      setDrops(prev => [...prev, ...newDrops]);
    }, spawnRate);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, rainfallIntensity]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    gameLoopRef.current = setInterval(() => {
      setDrops(prevDrops => {
        const newDrops: WaterDrop[] = [];
        let collected = 0;
        let lost = 0;

        prevDrops.forEach(drop => {
          const newY = drop.y + drop.speed;
          
          if (newY >= DRAIN_Y) {
            // Check if drop hit a drain
            const hitDrain = drains.find(
              drain => drop.x >= drain.x && drop.x <= drain.x + drain.width
            );
            
            if (hitDrain) {
              collected++;
              if (soundEnabled && Math.random() > 0.8) playWaterDrop();
            } else {
              lost++;
            }
          } else if (newY < GAME_HEIGHT + 50) {
            newDrops.push({ ...drop, y: newY });
          }
        });

        if (collected > 0) {
          setWaterCollected(prev => prev + collected);
          setScore(prev => prev + collected * 10);
        }
        if (lost > 0) {
          setWaterLost(prev => prev + lost);
          setFloodLevel(prev => {
            const newLevel = prev + lost * 2;
            if (newLevel > 10 && soundEnabled) playOverflow();
            return newLevel;
          });
        }

        return newDrops;
      });

      // Gradually reduce flood level (drainage working)
      setFloodLevel(prev => Math.max(0, prev - 0.5));
    }, 50);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, drains, soundEnabled, playWaterDrop, playOverflow]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          const settings = getDifficultySettings(difficulty);
          if (waterCollected >= settings.targetWater) {
            setGameState("won");
            if (soundEnabled) playLevelComplete();
            toast.success("🎉 You saved the neighborhood from flooding!");
          } else {
            setGameState("lost");
            toast.error("💧 The storm was too much! Try again with better drains.");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, waterCollected, difficulty, getDifficultySettings, soundEnabled, playLevelComplete]);

  // Check for flood game over
  useEffect(() => {
    if (gameState !== "playing") return;
    
    const settings = getDifficultySettings(difficulty);
    if (floodLevel >= settings.floodThreshold) {
      setGameState("lost");
      toast.error("🌊 The neighborhood flooded! Try adding more drains or reducing rainfall.");
    }
  }, [floodLevel, gameState, difficulty, getDifficultySettings]);

  const renderGame = () => (
    <div className="relative bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500 rounded-xl overflow-hidden shadow-2xl"
         style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-600 to-transparent opacity-50" />
      
      {/* Rain drops */}
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-2 h-4 bg-primary rounded-full opacity-80"
          style={{
            left: drop.x,
            top: drop.y,
            transform: "translateX(-50%)",
          }}
        />
      ))}
      
      {/* Ground */}
      <div 
        className="absolute left-0 right-0 bg-gradient-to-b from-amber-700 to-amber-900"
        style={{ top: DRAIN_Y, height: GAME_HEIGHT - DRAIN_Y }}
      />
      
      {/* Drains */}
      {drains.map(drain => (
        <div
          key={drain.id}
          className="absolute bg-gray-800 border-2 border-gray-600 rounded-t-lg"
          style={{
            left: drain.x,
            top: DRAIN_Y - 10,
            width: drain.width,
            height: 20,
          }}
        >
          <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-sm" />
            ))}
          </div>
        </div>
      ))}
      
      {/* Flood water overlay */}
      {floodLevel > 0 && (
        <div 
          className="absolute left-0 right-0 bottom-0 bg-primary/40 transition-all duration-300"
          style={{ height: Math.min(floodLevel * 3, GAME_HEIGHT - DRAIN_Y) }}
        />
      )}
      
      {/* HUD */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-2 text-sm">
            <Timer className="w-4 h-4" />
            <span className="font-mono font-bold">{timeRemaining}s</span>
          </div>
        </div>
        
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-2 text-sm">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="font-mono">{waterCollected}</span>
            <span className="text-xs text-muted-foreground">/ {getDifficultySettings(difficulty).targetWater}</span>
          </div>
        </div>
        
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-mono font-bold">{score}</span>
          </div>
        </div>
      </div>
      
      {/* Flood warning */}
      {floodLevel > getDifficultySettings(difficulty).floodThreshold * 0.5 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-destructive/90 text-white px-4 py-2 rounded-full animate-pulse flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-bold text-sm">Flood Warning!</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              🌧️ Singapore Storm Challenge
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A big monsoon is coming! Use your SWMM5 knowledge to adjust the drains 
              and rainfall to keep the virtual neighborhood from flooding!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            {/* Game Area */}
            <div className="flex flex-col items-center">
              {gameState === "menu" && (
                <Card className="p-8 bg-card/90 backdrop-blur max-w-lg">
                  <h2 className="font-display text-2xl font-bold mb-6 text-center">
                    🎮 Ready to Save Singapore?
                  </h2>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-3">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        Difficulty
                      </label>
                      <div className="flex gap-2">
                        {(["easy", "medium", "hard"] as const).map(diff => (
                          <Button
                            key={diff}
                            variant={difficulty === diff ? "default" : "outline"}
                            onClick={() => setDifficulty(diff)}
                            className="flex-1 capitalize"
                          >
                            {diff}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-3">
                        <CloudRain className="w-4 h-4 text-primary" />
                        Starting Rainfall Intensity: {rainfallIntensity}
                      </label>
                      <Slider
                        value={[rainfallIntensity]}
                        onValueChange={([v]) => setRainfallIntensity(v)}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Higher = more rain! Can be adjusted during game.
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-3">
                        <Gauge className="w-4 h-4 text-accent" />
                        Number of Drains: {drainSize}
                      </label>
                      <Slider
                        value={[drainSize]}
                        onValueChange={([v]) => setDrainSize(v)}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        More drains = better coverage, but placement matters!
                      </p>
                    </div>
                  </div>

                  <Button onClick={startGame} className="w-full py-6 text-lg font-bold">
                    <Play className="w-5 h-5 mr-2" />
                    Start Storm Challenge!
                  </Button>

                  <TechnicalAnnotation title="SWMM5 Connection" className="mt-6">
                    <p>
                      This game simulates real stormwater management decisions. In SWMM5, engineers 
                      configure drain inlet capacities, pipe sizes, and network topology. The 
                      rainfall intensity corresponds to design storm return periods (e.g., 1-in-10 
                      year events). Singapore's PUB designs for 1-in-50 year storms.
                    </p>
                  </TechnicalAnnotation>
                </Card>
              )}

              {gameState === "playing" && (
                <>
                  {renderGame()}
                  
                  {/* Live Controls */}
                  <Card className="mt-4 p-4 bg-card/90 backdrop-blur w-full max-w-[600px]">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <CloudRain className="w-4 h-4 text-primary" />
                          Rainfall: {rainfallIntensity}
                        </label>
                        <Slider
                          value={[rainfallIntensity]}
                          onValueChange={([v]) => setRainfallIntensity(v)}
                          min={1}
                          max={5}
                          step={1}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Shield className="w-4 h-4" />
                          Flood Level
                        </label>
                        <Progress 
                          value={(floodLevel / getDifficultySettings(difficulty).floodThreshold) * 100} 
                          className="h-3"
                        />
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {(gameState === "won" || gameState === "lost") && (
                <Card className="p-8 bg-card/90 backdrop-blur text-center max-w-lg">
                  <div className="text-6xl mb-4">
                    {gameState === "won" ? "🏆" : "🌊"}
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">
                    {gameState === "won" ? "You Saved the Neighborhood!" : "The Flood Won This Time..."}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">{waterCollected}</p>
                      <p className="text-xs text-muted-foreground">Water Collected</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{score}</p>
                      <p className="text-xs text-muted-foreground">Final Score</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={startGame} className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Play Again
                    </Button>
                    <Button variant="outline" onClick={() => setGameState("menu")} className="flex-1">
                      Settings
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Info Panel */}
            <Card className="p-6 bg-card/90 backdrop-blur max-w-sm">
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <Waves className="w-5 h-5 text-primary" />
                How to Play
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                <li className="flex gap-2">
                  <span className="text-primary">💧</span>
                  <span>Rain falls from the sky - collect it with your drains!</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">🎚️</span>
                  <span>Adjust rainfall intensity - higher = harder but more points!</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">🚰</span>
                  <span>More drains catch more water, preventing floods.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">⚠️</span>
                  <span>Don't let the flood level get too high!</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">🎯</span>
                  <span>Collect the target amount of water before time runs out!</span>
                </li>
              </ul>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm">Sound Effects</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>

              <TechnicalAnnotation title="Real-World Application">
                <p className="text-xs">
                  Singapore's Marina Barrage and extensive canal system demonstrate these 
                  principles at scale. The drainage network uses SWMM for design, with 
                  real-time monitoring via SCADA systems adjusting pump operations 
                  based on predicted rainfall from weather radar.
                </p>
              </TechnicalAnnotation>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default StormChallenge;
