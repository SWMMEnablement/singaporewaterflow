import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { TechnicalAnnotation } from "@/components/TechnicalAnnotation";
import { Droplets, TreeDeciduous, Home, Mountain, Waves } from "lucide-react";

interface SurfaceMaterial {
  id: string;
  name: string;
  emoji: string;
  icon: React.ReactNode;
  roughness: number; // Manning's n
  color: string;
  pattern: string;
  description: string;
}

const MATERIALS: SurfaceMaterial[] = [
  {
    id: "concrete",
    name: "Smooth Concrete",
    emoji: "🏢",
    icon: <Home className="w-5 h-5" />,
    roughness: 0.013,
    color: "bg-gray-400",
    pattern: "bg-gradient-to-b from-gray-300 to-gray-500",
    description: "Like sidewalks and parking lots"
  },
  {
    id: "asphalt",
    name: "Asphalt Road",
    emoji: "🛣️",
    icon: <Home className="w-5 h-5" />,
    roughness: 0.016,
    color: "bg-gray-700",
    pattern: "bg-gradient-to-b from-gray-600 to-gray-800",
    description: "Like streets and highways"
  },
  {
    id: "gravel",
    name: "Gravel Path",
    emoji: "⚪",
    icon: <Mountain className="w-5 h-5" />,
    roughness: 0.025,
    color: "bg-stone-400",
    pattern: "bg-gradient-to-b from-stone-300 to-stone-500",
    description: "Like garden paths"
  },
  {
    id: "grass",
    name: "Short Grass",
    emoji: "🌱",
    icon: <TreeDeciduous className="w-5 h-5" />,
    roughness: 0.035,
    color: "bg-green-500",
    pattern: "bg-gradient-to-b from-green-400 to-green-600",
    description: "Like lawns and parks"
  },
  {
    id: "meadow",
    name: "Tall Meadow",
    emoji: "🌾",
    icon: <TreeDeciduous className="w-5 h-5" />,
    roughness: 0.05,
    color: "bg-green-700",
    pattern: "bg-gradient-to-b from-green-500 to-green-700",
    description: "Like wild fields"
  },
  {
    id: "forest",
    name: "Forest Floor",
    emoji: "🌲",
    icon: <TreeDeciduous className="w-5 h-5" />,
    roughness: 0.1,
    color: "bg-emerald-800",
    pattern: "bg-gradient-to-b from-emerald-600 to-emerald-900",
    description: "With leaves and branches"
  }
];

interface RoughnessSimulatorProps {
  className?: string;
}

export const RoughnessSimulator = ({ className = "" }: RoughnessSimulatorProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState<SurfaceMaterial>(MATERIALS[0]);
  const [slope, setSlope] = useState(0.02); // 2% slope
  const [waterDrops, setWaterDrops] = useState<{ id: number; x: number; y: number }[]>([]);
  
  // Calculate flow velocity using Manning's equation (simplified)
  const calculateVelocity = useCallback(() => {
    const R = 0.1; // Hydraulic radius (simplified)
    const n = selectedMaterial.roughness;
    const S = slope;
    // Manning's equation: V = (1/n) * R^(2/3) * S^(1/2)
    const velocity = (1 / n) * Math.pow(R, 2/3) * Math.pow(S, 0.5);
    return velocity;
  }, [selectedMaterial.roughness, slope]);

  const velocity = calculateVelocity();
  const flowTime = 10 / velocity; // Time to cross the channel (seconds, simplified)
  
  // Animate water drops
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterDrops(prev => {
        const speed = velocity * 15; // Scale for animation
        const updated = prev
          .map(drop => ({ ...drop, y: drop.y + speed }))
          .filter(drop => drop.y < 200);
        
        // Add new drops
        if (Math.random() < 0.3) {
          updated.push({
            id: Date.now() + Math.random(),
            x: 20 + Math.random() * 60,
            y: 0
          });
        }
        
        return updated;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [velocity]);

  const getSpeedLabel = () => {
    if (velocity > 2) return { text: "Super Fast! 🚀", color: "text-red-500" };
    if (velocity > 1) return { text: "Fast! 💨", color: "text-orange-500" };
    if (velocity > 0.5) return { text: "Medium 🏃", color: "text-yellow-500" };
    return { text: "Slow 🐢", color: "text-green-500" };
  };

  const speedLabel = getSpeedLabel();

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <TreeDeciduous className="w-6 h-6 text-green-600" />
          Surface Roughness Simulator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how different surfaces affect water flow speed!
        </p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Material Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            Choose a Surface Type:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {MATERIALS.map((material) => (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedMaterial.id === material.id
                    ? "border-primary bg-primary/10 scale-105"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{material.emoji}</span>
                  <span className="font-medium text-sm">{material.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {material.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
            {/* Surface Channel */}
            <div className="flex-1 relative h-40 sm:h-48 rounded-lg overflow-hidden border-2 border-border">
              {/* Surface texture */}
              <div className={`absolute inset-0 ${selectedMaterial.pattern}`}>
                {/* Texture overlay based on material */}
                {selectedMaterial.id === "grass" && (
                  <div className="absolute inset-0 opacity-30">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 bg-green-800 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          height: `${8 + Math.random() * 12}px`,
                          transform: `rotate(${-10 + Math.random() * 20}deg)`
                        }}
                      />
                    ))}
                  </div>
                )}
                {selectedMaterial.id === "gravel" && (
                  <div className="absolute inset-0 opacity-40">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-stone-600 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                )}
                {selectedMaterial.id === "forest" && (
                  <div className="absolute inset-0 opacity-30">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-amber-800"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          fontSize: `${10 + Math.random() * 10}px`,
                          transform: `rotate(${Math.random() * 360}deg)`
                        }}
                      >
                        🍂
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Water drops */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {waterDrops.map((drop) => (
                  <g key={drop.id}>
                    <ellipse
                      cx={`${drop.x}%`}
                      cy={drop.y}
                      rx="6"
                      ry="8"
                      fill="url(#waterGradient)"
                      opacity="0.8"
                    />
                    <ellipse
                      cx={`${drop.x - 1}%`}
                      cy={drop.y - 2}
                      rx="2"
                      ry="2"
                      fill="white"
                      opacity="0.6"
                    />
                  </g>
                ))}
                <defs>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Labels */}
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                {selectedMaterial.emoji} {selectedMaterial.name}
              </div>
              <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                n = {selectedMaterial.roughness}
              </div>
            </div>

            {/* Speed Indicator */}
            <div className="w-20 flex flex-col items-center justify-center bg-secondary/30 rounded-lg p-2">
              <Droplets className={`w-8 h-8 mb-2 ${speedLabel.color}`} />
              <div className={`text-center font-bold text-sm ${speedLabel.color}`}>
                {speedLabel.text}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {velocity.toFixed(2)} m/s
              </div>
            </div>
          </div>
        </div>

        {/* Slope Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Ground Slope</label>
            <span className="text-sm text-muted-foreground">
              {(slope * 100).toFixed(1)}% ({slope < 0.02 ? "Gentle" : slope < 0.05 ? "Medium" : "Steep"})
            </span>
          </div>
          <Slider
            value={[slope]}
            onValueChange={([v]) => setSlope(v)}
            min={0.005}
            max={0.1}
            step={0.005}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Almost Flat</span>
            <span>Very Steep</span>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Waves className="w-4 h-4" />
            Roughness Comparison
          </h4>
          <div className="space-y-2">
            {MATERIALS.map((material) => {
              const matVelocity = (1 / material.roughness) * Math.pow(0.1, 2/3) * Math.pow(slope, 0.5);
              const maxVelocity = (1 / MATERIALS[0].roughness) * Math.pow(0.1, 2/3) * Math.pow(slope, 0.5);
              const percentage = (matVelocity / maxVelocity) * 100;
              
              return (
                <div key={material.id} className="flex items-center gap-2">
                  <span className="w-6 text-center">{material.emoji}</span>
                  <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        material.id === selectedMaterial.id 
                          ? "bg-primary" 
                          : "bg-muted-foreground/30"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs w-16 text-right text-muted-foreground">
                    {matVelocity.toFixed(2)} m/s
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <h4 className="font-medium mb-2">💡 What's Happening?</h4>
          <p className="text-sm text-muted-foreground">
            Rough surfaces like grass and forest floors create <strong>friction</strong> that 
            slows water down. Smooth surfaces like concrete let water zoom by quickly! 
            Engineers use the <strong>roughness coefficient "n"</strong> to calculate exactly 
            how fast water will flow over different materials.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            🌳 <strong>Fun Fact:</strong> Cities sometimes plant grass in drainage channels 
            on purpose—slower water means less erosion and flooding downstream!
          </p>
        </div>

        {/* Technical Annotation */}
        <TechnicalAnnotation title="Manning's Roughness Coefficient">
          <div className="space-y-2 text-sm">
            <p>The roughness coefficient <strong>n</strong> in Manning's equation represents surface friction:</p>
            <div className="bg-secondary/50 p-3 rounded-lg font-mono text-center">
              V = (1/n) × R<sup>2/3</sup> × S<sup>1/2</sup>
            </div>
            <ul className="space-y-1 mt-2">
              <li>• Selected material: <strong>{selectedMaterial.name}</strong></li>
              <li>• Roughness (n): <strong>{selectedMaterial.roughness}</strong></li>
              <li>• Slope (S): <strong>{(slope * 100).toFixed(1)}%</strong></li>
              <li>• Calculated velocity: <strong>{velocity.toFixed(3)} m/s</strong></li>
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              Higher n values (rougher surfaces) → Lower velocities. This is why natural channels 
              with vegetation flow slower than concrete-lined channels.
            </p>
          </div>
        </TechnicalAnnotation>
      </CardContent>
    </Card>
  );
};
