import { useState, useRef, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { TechnicalAnnotation } from "@/components/TechnicalAnnotation";
import { Gauge, Droplets, Mountain, Waves, Info, GripHorizontal, Circle, Volume2, VolumeX } from "lucide-react";

interface SlopeSimulatorProps {
  className?: string;
}

export const SlopeSimulator = ({ className = "" }: SlopeSimulatorProps) => {
  // Physical parameters
  const [slope, setSlope] = useState(0.02); // S₀ - dimensionless (0.5% to 10%)
  const [roughness, setRoughness] = useState(0.015); // n - Manning's coefficient
  const [pipeRadius, setPipeRadius] = useState(0.5); // meters (now adjustable!)
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Audio context for water rushing sound
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  
  // Dragging state for slope
  const [isDragging, setIsDragging] = useState(false);
  const pipeContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate flow using Manning's equation
  // Q = (1/n) * A * R^(2/3) * S^(1/2)
  // For a circular pipe flowing half-full:
  // A = πr²/2, P = πr, R = A/P = r/2
  const calculateFlow = useCallback(() => {
    const area = (Math.PI * pipeRadius * pipeRadius) / 2; // Half-full pipe
    const wettedPerimeter = Math.PI * pipeRadius;
    const hydraulicRadius = area / wettedPerimeter; // = r/2 for half-full
    
    // Manning's equation: Q = (1/n) * A * R^(2/3) * S^(1/2)
    const flowRate = (1 / roughness) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slope, 0.5);
    
    // Velocity = Q/A
    const velocity = flowRate / area;
    
    return { flowRate, velocity, area, hydraulicRadius };
  }, [slope, roughness, pipeRadius]);
  
  const { flowRate, velocity, area, hydraulicRadius } = calculateFlow();
  
  // Create water rushing sound based on velocity
  const createWaterSound = useCallback(() => {
    if (!soundEnabled) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    
    // Create noise buffer for water rushing sound
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate pink-ish noise for water sound
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    
    // Stop previous sound
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop();
      } catch (e) {}
    }
    
    // Create new nodes
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();
    
    // Filter for water-like sound
    filterNode.type = "lowpass";
    
    // Connect: noise -> filter -> gain -> output
    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseNodeRef.current = noiseNode;
    gainNodeRef.current = gainNode;
    filterNodeRef.current = filterNode;
    
    noiseNode.start();
  }, [soundEnabled]);
  
  // Update sound based on velocity
  useEffect(() => {
    if (!soundEnabled) {
      if (noiseNodeRef.current) {
        try {
          noiseNodeRef.current.stop();
        } catch (e) {}
        noiseNodeRef.current = null;
      }
      return;
    }
    
    if (!noiseNodeRef.current) {
      createWaterSound();
    }
    
    if (gainNodeRef.current && filterNodeRef.current) {
      // Map velocity to volume (0-4 m/s -> 0-0.15 volume)
      const normalizedVelocity = Math.min(velocity / 4, 1);
      const volume = normalizedVelocity * 0.15;
      gainNodeRef.current.gain.setTargetAtTime(volume, audioContextRef.current!.currentTime, 0.1);
      
      // Map velocity to filter frequency (faster = higher pitch, more "rushing")
      const filterFreq = 300 + normalizedVelocity * 2000;
      filterNodeRef.current.frequency.setTargetAtTime(filterFreq, audioContextRef.current!.currentTime, 0.1);
    }
  }, [velocity, soundEnabled, createWaterSound]);
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (noiseNodeRef.current) {
        try {
          noiseNodeRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);
  
  // Handle mouse/touch drag for slope adjustment
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !pipeContainerRef.current) return;
    
    const container = pipeContainerRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate slope based on vertical position in container
    const relativeY = (clientY - container.top) / container.height;
    // Map to slope range (0.005 to 0.1) - inverted because higher Y = steeper
    const newSlope = 0.005 + Math.max(0, Math.min(1, relativeY)) * 0.095;
    setSlope(Math.round(newSlope * 1000) / 1000);
  }, [isDragging]);
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  // Animation for water particles
  const [particles, setParticles] = useState<{id: number; x: number; y: number}[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        // Add new particle
        const newParticles = [...prev, { id: Date.now(), x: 0, y: 0 }];
        // Remove old particles (moved off screen)
        return newParticles.filter(p => p.x < 120).map(p => ({
          ...p,
          x: p.x + velocity * 15 // Speed based on calculated velocity
        }));
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [velocity]);
  
  // Convert slope to angle for visual display
  const slopeAngle = Math.atan(slope) * (180 / Math.PI);
  
  // Get roughness description for kids
  const getRoughnessDesc = (n: number) => {
    if (n <= 0.012) return { text: "Super Smooth!", emoji: "✨", desc: "Like a smooth plastic slide" };
    if (n <= 0.018) return { text: "Smooth Concrete", emoji: "🏗️", desc: "Like a regular sidewalk" };
    if (n <= 0.025) return { text: "Bumpy!", emoji: "🪨", desc: "Like a rough road" };
    return { text: "Very Rough!", emoji: "🌿", desc: "Like a grassy channel" };
  };
  
  const roughnessInfo = getRoughnessDesc(roughness);
  
  // Get flow description for kids - using semantic color classes
  const getFlowDesc = (v: number) => {
    if (v >= 3) return { text: "Super Fast!", emoji: "🚀", colorClass: "text-accent" };
    if (v >= 2) return { text: "Fast!", emoji: "🏃", colorClass: "text-primary" };
    if (v >= 1) return { text: "Medium", emoji: "🚶", colorClass: "text-muted-foreground" };
    return { text: "Slow...", emoji: "🐢", colorClass: "text-destructive" };
  };
  
  const flowDesc = getFlowDesc(velocity);
  
  // Get diameter description for kids
  const getDiameterDesc = (r: number) => {
    const diameter = r * 2 * 100; // cm
    if (diameter <= 50) return { text: "Small Pipe", emoji: "🔸", desc: "Like a garden hose" };
    if (diameter <= 100) return { text: "Medium Pipe", emoji: "🔶", desc: "Like a home drain" };
    if (diameter <= 150) return { text: "Large Pipe", emoji: "🟠", desc: "Like a street drain" };
    return { text: "Giant Pipe!", emoji: "🔴", desc: "Like a main sewer!" };
  };
  
  const diameterInfo = getDiameterDesc(pipeRadius);
  
  return (
    <Card className={`p-4 md:p-6 ${className}`}>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <Gauge className="w-6 h-6 text-primary" />
              Pipe Slope Simulator
            </h3>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              title={soundEnabled ? "Mute water sound" : "Enable water sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
          <p className="text-muted-foreground mt-1">
            Drag the pipe to change the slope and hear the water rushing! 🔊
          </p>
        </div>
        
        {/* Interactive Pipe Visualization */}
        <div 
          ref={pipeContainerRef}
          className="relative h-64 bg-gradient-to-b from-primary/10 to-primary/20 rounded-xl overflow-hidden cursor-ns-resize select-none"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Background grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* The Pipe - rotates based on slope */}
          <div 
            className="absolute left-1/2 top-1/2 w-[80%] h-16 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
            style={{ transform: `translate(-50%, -50%) rotate(${slopeAngle}deg)` }}
          >
            {/* Pipe body */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted-foreground/30 rounded-lg shadow-lg border-2 border-border">
              {/* Pipe interior */}
              <div className="absolute inset-2 bg-gradient-to-b from-foreground/80 to-foreground/90 rounded overflow-hidden">
                {/* Water in pipe */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary to-primary/70 opacity-80">
                  {/* Water surface animation */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-primary/30 animate-pulse" />
                </div>
                
                {/* Animated water particles */}
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className="absolute w-3 h-3 bg-primary-foreground rounded-full opacity-70 transition-all duration-100"
                    style={{ 
                      left: `${particle.x}%`,
                      bottom: '25%',
                      transform: 'translate(-50%, 50%)'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Drag handle indicator */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-muted-foreground bg-background/80 px-2 py-1 rounded-full text-xs">
              <GripHorizontal className="w-4 h-4" />
              {isDragging ? "Dragging..." : "Drag to adjust slope"}
            </div>
            
            {/* Flow direction arrow */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground text-2xl animate-pulse">
              →
            </div>
          </div>
          
          {/* Slope indicator */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-primary" />
              <span className="font-bold text-lg">{(slope * 100).toFixed(1)}%</span>
              <span className="text-xs text-muted-foreground">slope</span>
            </div>
            <div className="text-xs text-muted-foreground">
              ({slopeAngle.toFixed(1)}° angle)
            </div>
          </div>
          
          {/* Flow speed indicator */}
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
            <div className={`flex items-center gap-2 ${flowDesc.colorClass}`}>
              <Droplets className="w-4 h-4" />
              <span className="font-bold text-lg">{velocity.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">m/s</span>
            </div>
            <div className="text-xs">
              {flowDesc.emoji} {flowDesc.text}
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Slope Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium flex items-center gap-2">
                <Mountain className="w-4 h-4 text-primary" />
                Pipe Slope (S₀)
              </label>
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {(slope * 100).toFixed(1)}%
              </span>
            </div>
            <Slider
              value={[slope * 100]}
              onValueChange={(value) => setSlope(value[0] / 100)}
              min={0.5}
              max={10}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {slope < 0.02 ? "🐌 Gentle slope - water flows slowly" :
               slope < 0.05 ? "🚶 Medium slope - normal flow" :
               "🏃 Steep slope - water rushes fast!"}
            </p>
          </div>
          
          {/* Roughness Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium flex items-center gap-2">
                <Waves className="w-4 h-4 text-primary" />
                Surface Roughness (n)
              </label>
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {roughness.toFixed(3)}
              </span>
            </div>
            <Slider
              value={[roughness * 1000]}
              onValueChange={(value) => setRoughness(value[0] / 1000)}
              min={10}
              max={35}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {roughnessInfo.emoji} {roughnessInfo.text} - {roughnessInfo.desc}
            </p>
          </div>
          
          {/* NEW: Pipe Diameter Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium flex items-center gap-2">
                <Circle className="w-4 h-4 text-primary" />
                Pipe Diameter
              </label>
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {(pipeRadius * 2 * 100).toFixed(0)} cm
              </span>
            </div>
            <Slider
              value={[pipeRadius * 100]}
              onValueChange={(value) => setPipeRadius(value[0] / 100)}
              min={25}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {diameterInfo.emoji} {diameterInfo.text} - {diameterInfo.desc}
            </p>
          </div>
        </div>
        
        {/* Results Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl">
            <Droplets className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-1 md:mb-2" />
            <div className="text-xl md:text-2xl font-bold text-primary">
              {velocity.toFixed(2)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground">Velocity (m/s)</div>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl">
            <Gauge className="w-6 h-6 md:w-8 md:h-8 mx-auto text-accent mb-1 md:mb-2" />
            <div className="text-xl md:text-2xl font-bold text-accent">
              {flowRate.toFixed(3)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground">Flow Rate (m³/s)</div>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-secondary/30 to-secondary/50 rounded-xl">
            <div className="w-6 h-6 md:w-8 md:h-8 mx-auto text-secondary-foreground mb-1 md:mb-2 flex items-center justify-center font-bold text-base md:text-lg">R</div>
            <div className="text-xl md:text-2xl font-bold text-secondary-foreground">
              {hydraulicRadius.toFixed(3)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground">Hydraulic Radius (m)</div>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-primary/5 to-primary/15 rounded-xl">
            <Circle className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-1 md:mb-2" />
            <div className="text-xl md:text-2xl font-bold text-primary">
              {area.toFixed(3)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground">Flow Area (m²)</div>
          </div>
        </div>
        
        {/* Kid-friendly explanation */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">What's happening?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {pipeRadius >= 0.75 && slope >= 0.05 
                  ? "🌊 WOAH! A big pipe AND steep slope? That's MASSIVE water flow - like a river underground!"
                  : pipeRadius >= 0.75
                  ? "🔴 Big pipes can carry LOTS of water! That's why Singapore uses giant underground pipes for monsoons."
                  : slope >= 0.05 && roughness <= 0.015 
                  ? "🚀 The pipe is steep AND smooth! Water zooms through super fast - just like a waterslide!"
                  : slope >= 0.05
                  ? "🏃 The steep slope makes water flow fast, but the bumpy surface slows it down a bit."
                  : roughness <= 0.015
                  ? "✨ The smooth surface helps water flow, but the gentle slope means it's not rushing."
                  : "🐢 A gentle slope and bumpy surface means water takes its time flowing through."}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>The Hydraulic Radius Secret:</strong> Bigger pipes have a larger hydraulic radius (R), 
                which means water can flow faster through them! That's why engineers use massive underground 
                drains for heavy rain. 🌧️
              </p>
            </div>
          </div>
        </div>
        
        {/* Technical Details */}
        <TechnicalAnnotation title="Manning's Equation">
          <div className="space-y-2">
            <p className="font-mono text-sm">Q = (1/n) × A × R^(2/3) × S₀^(1/2)</p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong>Current Values:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>n (roughness) = {roughness.toFixed(3)}</li>
                  <li>S₀ (slope) = {slope.toFixed(4)}</li>
                  <li>r (pipe radius) = {pipeRadius.toFixed(2)} m</li>
                  <li>D (diameter) = {(pipeRadius * 2).toFixed(2)} m</li>
                </ul>
              </div>
              <div>
                <strong>Derived Values:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>A (flow area) = {area.toFixed(4)} m²</li>
                  <li>R (hydraulic radius) = {hydraulicRadius.toFixed(3)} m</li>
                </ul>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <strong>Results:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Q (flow rate) = {flowRate.toFixed(4)} m³/s = {(flowRate * 1000).toFixed(1)} L/s</li>
                <li>V (velocity) = {velocity.toFixed(3)} m/s</li>
              </ul>
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              For a half-full circular pipe: A = πr²/2, Wetted Perimeter P = πr, Hydraulic Radius R = A/P = r/2
            </p>
          </div>
        </TechnicalAnnotation>
      </div>
    </Card>
  );
};
