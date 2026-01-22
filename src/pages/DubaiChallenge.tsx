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
  Sun,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface WaterDrop {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number; // Dubai has bigger, heavier drops
}

interface DrainPipe {
  id: number;
  x: number;
  width: number;
  capacity: number;
  currentLoad: number;
}

interface Puddle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const DRAIN_Y = 350;

const DubaiChallenge = () => {
  const [gameState, setGameState] = useState<"menu" | "preparing" | "storm" | "won" | "lost">("menu");
  const [score, setScore] = useState(0);
  const [waterCollected, setWaterCollected] = useState(0);
  const [waterLost, setWaterLost] = useState(0);
  const [prepTime, setPrepTime] = useState(15);
  const [stormTime, setStormTime] = useState(30);
  const [drainSize, setDrainSize] = useState(3);
  const [pumpPower, setPumpPower] = useState(2);
  const [drops, setDrops] = useState<WaterDrop[]>([]);
  const [puddles, setPuddles] = useState<Puddle[]>([]);
  const [drains, setDrains] = useState<DrainPipe[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floodLevel, setFloodLevel] = useState(0);
  const [stormIntensity, setStormIntensity] = useState(0);
  const [sandCover, setSandCover] = useState(50); // Sand absorbs some water
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropIdRef = useRef(0);
  const puddleIdRef = useRef(0);
  
  const { playWaterDrop, playOverflow, playLevelComplete, playStart } = useSoundEffects();

  // Calculate drain configuration
  const getDrainConfig = useCallback((size: number): DrainPipe[] => {
    const configs: Record<number, DrainPipe[]> = {
      1: [{ id: 1, x: 250, width: 100, capacity: 8, currentLoad: 0 }],
      2: [
        { id: 1, x: 150, width: 90, capacity: 6, currentLoad: 0 },
        { id: 2, x: 360, width: 90, capacity: 6, currentLoad: 0 },
      ],
      3: [
        { id: 1, x: 80, width: 80, capacity: 5, currentLoad: 0 },
        { id: 2, x: 250, width: 100, capacity: 8, currentLoad: 0 },
        { id: 3, x: 420, width: 80, capacity: 5, currentLoad: 0 },
      ],
      4: [
        { id: 1, x: 40, width: 70, capacity: 5, currentLoad: 0 },
        { id: 2, x: 160, width: 80, capacity: 6, currentLoad: 0 },
        { id: 3, x: 310, width: 100, capacity: 8, currentLoad: 0 },
        { id: 4, x: 460, width: 70, capacity: 5, currentLoad: 0 },
      ],
      5: [
        { id: 1, x: 20, width: 60, capacity: 5, currentLoad: 0 },
        { id: 2, x: 110, width: 70, capacity: 5, currentLoad: 0 },
        { id: 3, x: 220, width: 100, capacity: 8, currentLoad: 0 },
        { id: 4, x: 360, width: 70, capacity: 5, currentLoad: 0 },
        { id: 5, x: 470, width: 70, capacity: 5, currentLoad: 0 },
      ],
    };
    return configs[size] || configs[3];
  }, []);

  const startGame = useCallback(() => {
    setGameState("preparing");
    setScore(0);
    setWaterCollected(0);
    setWaterLost(0);
    setPrepTime(15);
    setStormTime(30);
    setFloodLevel(0);
    setStormIntensity(0);
    setDrops([]);
    setPuddles([]);
    setDrains(getDrainConfig(drainSize));
    dropIdRef.current = 0;
    puddleIdRef.current = 0;
    
    if (soundEnabled) playStart();
    toast.info("⚠️ Flash flood warning! You have 15 seconds to prepare your drains!");
  }, [drainSize, getDrainConfig, soundEnabled, playStart]);

  // Preparation phase timer
  useEffect(() => {
    if (gameState !== "preparing") return;

    const timer = setInterval(() => {
      setPrepTime(prev => {
        if (prev <= 1) {
          setGameState("storm");
          toast.warning("🌧️ THE STORM IS HERE! Manage your pumps to survive!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Storm phase - spawn intense rain
  useEffect(() => {
    if (gameState !== "storm") return;

    // Ramp up storm intensity
    const intensityTimer = setInterval(() => {
      setStormIntensity(prev => Math.min(prev + 0.5, 5));
    }, 2000);

    return () => clearInterval(intensityTimer);
  }, [gameState]);

  // Spawn water drops during storm
  useEffect(() => {
    if (gameState !== "storm") return;

    const spawnRate = Math.max(50, 200 - stormIntensity * 30);
    
    spawnIntervalRef.current = setInterval(() => {
      const newDrops: WaterDrop[] = [];
      const dropsToSpawn = Math.ceil(stormIntensity * 2);
      
      for (let i = 0; i < dropsToSpawn; i++) {
        newDrops.push({
          id: dropIdRef.current++,
          x: Math.random() * (GAME_WIDTH - 20) + 10,
          y: -10 - Math.random() * 50,
          speed: 4 + stormIntensity + Math.random() * 2,
          size: 1 + Math.random() * 0.5, // Bigger drops
        });
      }
      
      setDrops(prev => [...prev, ...newDrops]);
    }, spawnRate);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, stormIntensity]);

  // Game loop
  useEffect(() => {
    if (gameState !== "storm") return;

    const pumpEfficiency = pumpPower * 0.8;
    const sandAbsorption = sandCover * 0.02;

    gameLoopRef.current = setInterval(() => {
      setDrops(prevDrops => {
        const newDrops: WaterDrop[] = [];
        let collected = 0;
        let lost = 0;

        prevDrops.forEach(drop => {
          const newY = drop.y + drop.speed;
          
          if (newY >= DRAIN_Y) {
            const hitDrain = drains.find(
              drain => drop.x >= drain.x && drop.x <= drain.x + drain.width
            );
            
            if (hitDrain) {
              collected += drop.size;
              if (soundEnabled && Math.random() > 0.9) playWaterDrop();
            } else {
              // Some water absorbed by sand
              if (Math.random() > sandAbsorption) {
                lost += drop.size;
                // Create puddle
                if (Math.random() > 0.7) {
                  setPuddles(prev => [...prev, {
                    id: puddleIdRef.current++,
                    x: drop.x,
                    y: DRAIN_Y + 10 + Math.random() * 30,
                    size: 5 + Math.random() * 10
                  }]);
                }
              }
            }
          } else if (newY < GAME_HEIGHT + 50) {
            newDrops.push({ ...drop, y: newY });
          }
        });

        if (collected > 0) {
          setWaterCollected(prev => prev + Math.round(collected));
          setScore(prev => prev + Math.round(collected * 15));
        }
        if (lost > 0) {
          setWaterLost(prev => prev + Math.round(lost));
          setFloodLevel(prev => {
            const newLevel = prev + lost * 1.5;
            if (newLevel > 20 && soundEnabled) playOverflow();
            return newLevel;
          });
        }

        return newDrops;
      });

      // Pumps reduce flood level
      setFloodLevel(prev => Math.max(0, prev - pumpEfficiency));
      
      // Puddles slowly evaporate
      setPuddles(prev => prev.filter(p => {
        p.size -= 0.1;
        return p.size > 0;
      }));
    }, 50);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, drains, pumpPower, sandCover, soundEnabled, playWaterDrop, playOverflow]);

  // Storm timer
  useEffect(() => {
    if (gameState !== "storm") return;

    const timer = setInterval(() => {
      setStormTime(prev => {
        if (prev <= 1) {
          if (floodLevel < 50) {
            setGameState("won");
            if (soundEnabled) playLevelComplete();
            toast.success("🏆 You survived the flash flood! Dubai is safe!");
          } else {
            setGameState("lost");
            toast.error("🌊 The streets are flooded! The desert couldn't handle it.");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, floodLevel, soundEnabled, playLevelComplete]);

  // Check for flood game over
  useEffect(() => {
    if (gameState !== "storm") return;
    
    if (floodLevel >= 80) {
      setGameState("lost");
      toast.error("🌊 Critical flood! The city is underwater!");
    }
  }, [floodLevel, gameState]);

  const renderGame = () => (
    <div className="relative rounded-xl overflow-hidden shadow-2xl"
         style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      {/* Desert sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-orange-300 to-amber-400" />
      
      {/* Storm clouds overlay during storm */}
      {gameState === "storm" && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-600 to-transparent transition-opacity duration-1000"
          style={{ opacity: stormIntensity / 5 }}
        />
      )}
      
      {/* Buildings silhouette */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-around items-end opacity-30">
        {[120, 80, 200, 60, 150, 90, 180].map((height, i) => (
          <div 
            key={i}
            className="bg-gray-800"
            style={{ width: 40 + i * 5, height: height }}
          />
        ))}
      </div>
      
      {/* Burj Khalifa */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="relative">
          <div className="w-8 h-48 bg-gradient-to-t from-gray-600 to-gray-400 opacity-50" 
               style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        </div>
      </div>
      
      {/* Rain drops */}
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute bg-blue-400 rounded-full opacity-80"
          style={{
            left: drop.x,
            top: drop.y,
            width: 3 * drop.size,
            height: 8 * drop.size,
            transform: "translateX(-50%)",
          }}
        />
      ))}
      
      {/* Desert ground */}
      <div 
        className="absolute left-0 right-0 bg-gradient-to-b from-amber-500 to-amber-700"
        style={{ top: DRAIN_Y, height: GAME_HEIGHT - DRAIN_Y }}
      />
      
      {/* Puddles */}
      {puddles.map(puddle => (
        <div
          key={puddle.id}
          className="absolute bg-blue-400/50 rounded-full"
          style={{
            left: puddle.x - puddle.size / 2,
            top: puddle.y,
            width: puddle.size * 2,
            height: puddle.size * 0.5,
          }}
        />
      ))}
      
      {/* Drains */}
      {drains.map(drain => (
        <div
          key={drain.id}
          className="absolute bg-gray-800 border-2 border-gray-500 rounded-t-lg"
          style={{
            left: drain.x,
            top: DRAIN_Y - 12,
            width: drain.width,
            height: 24,
          }}
        >
          <div className="absolute inset-1 grid grid-cols-5 gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-sm" />
            ))}
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">💧</div>
        </div>
      ))}
      
      {/* Flood water overlay */}
      {floodLevel > 0 && (
        <div 
          className="absolute left-0 right-0 bottom-0 bg-blue-500/50 transition-all duration-300"
          style={{ height: Math.min(floodLevel * 2, GAME_HEIGHT - DRAIN_Y + 20) }}
        />
      )}
      
      {/* HUD */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-2 text-sm">
            <Timer className="w-4 h-4" />
            <span className="font-mono font-bold">
              {gameState === "preparing" ? `Prep: ${prepTime}s` : `Storm: ${stormTime}s`}
            </span>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-2 text-sm">
            <CloudRain className="w-4 h-4 text-blue-400" />
            <span className="font-mono">Intensity: {stormIntensity.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-mono font-bold">{score}</span>
          </div>
        </div>
      </div>
      
      {/* Preparation phase overlay */}
      {gameState === "preparing" && (
        <div className="absolute inset-0 bg-amber-900/30 flex items-center justify-center">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 text-center animate-pulse">
            <Sun className="w-12 h-12 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">Storm Approaching!</div>
            <div className="text-4xl font-mono font-bold text-destructive my-2">{prepTime}</div>
            <div className="text-sm text-muted-foreground">Adjust pumps below!</div>
          </div>
        </div>
      )}
      
      {/* Flood warning */}
      {floodLevel > 40 && gameState === "storm" && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-destructive/90 text-white px-4 py-2 rounded-full animate-pulse flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-bold text-sm">CRITICAL FLOOD!</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-amber-900 via-orange-800 to-amber-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 mb-4 transition-colors">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              🏜️ Dubai Flash Flood Challenge
            </h1>
            <p className="text-lg text-amber-200 max-w-2xl mx-auto">
              Dubai rarely gets rain, but when it does—it&apos;s INTENSE! Prepare the city&apos;s 
              drainage and pumps before the storm hits!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            {/* Game Area */}
            <div className="flex flex-col items-center">
              {gameState === "menu" && (
                <Card className="p-8 bg-card/90 backdrop-blur max-w-lg">
                  <h2 className="font-display text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    <Building2 className="w-8 h-8" />
                    Prepare Dubai!
                  </h2>
                  
                  <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 mb-6">
                    <h3 className="font-bold flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      Flash Flood Warning!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A rare but intense storm is approaching Dubai! You have 15 seconds 
                      to prepare your drains and pumps before the storm hits. Then survive 
                      30 seconds of intense rainfall!
                    </p>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-3">
                        <Gauge className="w-4 h-4 text-amber-500" />
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
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-3">
                        <Zap className="w-4 h-4 text-blue-500" />
                        Pump Power: {pumpPower}
                      </label>
                      <Slider
                        value={[pumpPower]}
                        onValueChange={([v]) => setPumpPower(v)}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Higher pump power drains water faster during the storm!
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-3">
                        <Sun className="w-4 h-4 text-amber-500" />
                        Sand Coverage: {sandCover}%
                      </label>
                      <Slider
                        value={[sandCover]}
                        onValueChange={([v]) => setSandCover(v)}
                        min={0}
                        max={80}
                        step={10}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        More sand = more water absorption, but sand doesn&apos;t drain well!
                      </p>
                    </div>
                  </div>

                  <Button onClick={startGame} className="w-full py-6 text-lg font-bold bg-amber-600 hover:bg-amber-700">
                    <Play className="w-5 h-5 mr-2" />
                    Start Flash Flood Challenge!
                  </Button>

                  <TechnicalAnnotation title="ICM InfoWorks Connection" className="mt-6">
                    <p>
                      This game simulates Dubai&apos;s flash flood challenges. ICM InfoWorks models 
                      the &quot;wadi&quot; (dry riverbed) flash flood dynamics unique to desert cities. 
                      Unlike constant monsoon rains, desert storms are characterized by very high 
                      intensity over short durations, with rainfall rates often exceeding 50mm/hour.
                    </p>
                  </TechnicalAnnotation>
                </Card>
              )}

              {(gameState === "preparing" || gameState === "storm") && (
                <>
                  {renderGame()}
                  
                  {/* Live Controls */}
                  <Card className="mt-4 p-4 bg-card/90 backdrop-blur w-full max-w-[600px]">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Zap className="w-4 h-4 text-blue-500" />
                          Pump Power: {pumpPower}
                        </label>
                        <Slider
                          value={[pumpPower]}
                          onValueChange={([v]) => setPumpPower(v)}
                          min={1}
                          max={5}
                          step={1}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Waves className="w-4 h-4 text-blue-400" />
                          Flood Level
                        </label>
                        <Progress 
                          value={(floodLevel / 80) * 100} 
                          className="h-3"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {floodLevel < 20 ? "Safe" : floodLevel < 40 ? "Warning" : floodLevel < 60 ? "Danger!" : "CRITICAL!"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-secondary/50 rounded p-2">
                        <Droplets className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                        <div className="font-bold">{waterCollected}</div>
                        <div className="text-xs text-muted-foreground">Drained</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-2">
                        <Waves className="w-4 h-4 mx-auto mb-1 text-red-500" />
                        <div className="font-bold">{waterLost}</div>
                        <div className="text-xs text-muted-foreground">Flooded</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-2">
                        <Trophy className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                        <div className="font-bold">{score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
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
                  <h2 className="font-display text-2xl font-bold mb-2">
                    {gameState === "won" ? "Dubai Survived!" : "Flash Flood Disaster!"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {gameState === "won" 
                      ? "Your quick thinking and pump management saved the city!" 
                      : "The rare storm overwhelmed the drainage system. Try stronger pumps!"}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-2xl font-bold">{score}</div>
                      <div className="text-xs text-muted-foreground">Final Score</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-500">{waterCollected}</div>
                      <div className="text-xs text-muted-foreground">Water Drained</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-500">{waterLost}</div>
                      <div className="text-xs text-muted-foreground">Flooded</div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button onClick={startGame} className="gap-2 bg-amber-600 hover:bg-amber-700">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/storm-challenge">
                        Try Singapore 🇸🇬
                      </Link>
                    </Button>
                  </div>
                </Card>
              )}

              {/* Sound toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="mt-4"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
            </div>

            {/* Info Panel */}
            <div className="lg:max-w-xs space-y-4">
              <Card className="p-4 bg-amber-50 dark:bg-amber-950/30">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  Dubai&apos;s Desert Challenge
                </h3>
                <p className="text-sm text-muted-foreground">
                  Dubai gets only ~100mm of rain per year, but when storms hit, they can 
                  dump 50mm in just 2 hours! The dry, hard-packed sand can&apos;t absorb 
                  water quickly, leading to dangerous flash floods.
                </p>
              </Card>

              <Card className="p-4">
                <h3 className="font-bold mb-2">🎮 How to Play</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>1. Set up your drains and pump power</li>
                  <li>2. You have 15 seconds to prepare</li>
                  <li>3. When the storm hits, manage pump power</li>
                  <li>4. Keep flood level below critical for 30 seconds</li>
                  <li>5. Higher pump power = faster drainage!</li>
                </ul>
              </Card>

              <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Flash Flood Facts
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dubai&apos;s wadis can flood in minutes</li>
                  <li>• 2024 saw record flooding in UAE</li>
                  <li>• ICM models 1D/2D flood spread</li>
                  <li>• Pumping stations are crucial</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DubaiChallenge;
