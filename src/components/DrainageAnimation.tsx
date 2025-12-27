import { useEffect, useState } from "react";

interface WaterDrop {
  id: number;
  x: number;
  delay: number;
}

export const DrainageAnimation = () => {
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([]);

  useEffect(() => {
    const drops: WaterDrop[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      delay: i * 0.3,
    }));
    setWaterDrops(drops);
  }, []);

  return (
    <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200">
      {/* Sky with clouds */}
      <div className="absolute inset-0">
        <svg className="absolute top-4 left-[5%] w-24 h-16 animate-float" viewBox="0 0 100 60">
          <ellipse cx="30" cy="40" rx="25" ry="18" fill="white" />
          <ellipse cx="55" cy="35" rx="30" ry="22" fill="white" />
          <ellipse cx="80" cy="40" rx="20" ry="16" fill="white" />
          <ellipse cx="50" cy="25" rx="20" ry="15" fill="white" opacity="0.9" />
        </svg>
        <svg className="absolute top-8 right-[10%] w-20 h-12 animate-float" style={{ animationDelay: '-2s' }} viewBox="0 0 100 60">
          <ellipse cx="25" cy="40" rx="20" ry="15" fill="white" />
          <ellipse cx="50" cy="35" rx="25" ry="18" fill="white" />
          <ellipse cx="75" cy="40" rx="20" ry="15" fill="white" />
        </svg>
      </div>

      {/* Rain drops */}
      {waterDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-1.5 h-6 bg-gradient-to-b from-rain/80 to-rain/40 rounded-full"
          style={{
            left: `${drop.x}%`,
            top: '-5%',
            animation: `rainDrop 2s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}

      {/* Singapore Skyline */}
      <svg className="absolute bottom-16 left-0 right-0" viewBox="0 0 400 100" preserveAspectRatio="none">
        {/* Marina Bay Sands inspired */}
        <rect x="140" y="20" width="12" height="80" fill="hsl(210 20% 30%)" />
        <rect x="160" y="20" width="12" height="80" fill="hsl(210 20% 30%)" />
        <rect x="180" y="20" width="12" height="80" fill="hsl(210 20% 30%)" />
        <rect x="135" y="10" width="62" height="15" rx="3" fill="hsl(210 20% 35%)" />
        
        {/* Other buildings */}
        <rect x="30" y="50" width="25" height="50" fill="hsl(210 15% 40%)" />
        <rect x="60" y="35" width="20" height="65" fill="hsl(210 20% 35%)" />
        <rect x="85" y="55" width="30" height="45" fill="hsl(210 15% 45%)" />
        <rect x="220" y="40" width="22" height="60" fill="hsl(210 20% 38%)" />
        <rect x="250" y="30" width="18" height="70" fill="hsl(210 15% 42%)" />
        <rect x="275" y="50" width="28" height="50" fill="hsl(210 20% 36%)" />
        <rect x="310" y="45" width="20" height="55" fill="hsl(210 15% 40%)" />
        <rect x="340" y="60" width="35" height="40" fill="hsl(210 20% 38%)" />

        {/* Trees (Gardens by the Bay inspired) */}
        <ellipse cx="120" cy="85" rx="12" ry="15" fill="hsl(140 50% 35%)" />
        <rect x="118" y="85" width="4" height="15" fill="hsl(30 40% 35%)" />
        <ellipse cx="205" cy="90" rx="10" ry="12" fill="hsl(140 45% 40%)" />
        <rect x="203" y="90" width="4" height="12" fill="hsl(30 40% 35%)" />
      </svg>

      {/* Street level with drainage */}
      <svg className="absolute bottom-0 left-0 right-0 h-20" viewBox="0 0 400 80" preserveAspectRatio="none">
        {/* Road */}
        <rect x="0" y="0" width="400" height="25" fill="hsl(210 10% 50%)" />
        
        {/* Drain grates */}
        <g className="drain-grate">
          <rect x="50" y="18" width="30" height="6" rx="1" fill="hsl(210 15% 25%)" />
          <line x1="55" y1="18" x2="55" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
          <line x1="65" y1="18" x2="65" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
          <line x1="75" y1="18" x2="75" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
        </g>
        <g className="drain-grate">
          <rect x="170" y="18" width="30" height="6" rx="1" fill="hsl(210 15% 25%)" />
          <line x1="175" y1="18" x2="175" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
          <line x1="185" y1="18" x2="185" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
          <line x1="195" y1="18" x2="195" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
        </g>
        <g className="drain-grate">
          <rect x="290" y="18" width="30" height="6" rx="1" fill="hsl(210 15% 25%)" />
          <line x1="295" y1="18" x2="295" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
          <line x1="305" y1="18" x2="305" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
          <line x1="315" y1="18" x2="315" y2="24" stroke="hsl(200 85% 45%)" strokeWidth="2" opacity="0.6" />
        </g>

        {/* Underground pipe system */}
        <rect x="0" y="25" width="400" height="8" fill="hsl(25 30% 35%)" />
        
        {/* Main drainage channel */}
        <rect x="0" y="33" width="400" height="20" fill="hsl(210 30% 25%)" />
        
        {/* Water in drain - animated */}
        <rect x="0" y="40" width="400" height="13" fill="hsl(200 85% 45%)" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
        </rect>
        
        {/* Water flow arrows */}
        <g className="flow-indicator">
          <polygon points="30,46 45,46 40,42 50,46 40,50 45,46" fill="white" opacity="0.6">
            <animateTransform attributeName="transform" type="translate" values="0,0;320,0;0,0" dur="4s" repeatCount="indefinite" />
          </polygon>
        </g>
        <g className="flow-indicator">
          <polygon points="100,46 115,46 110,42 120,46 110,50 115,46" fill="white" opacity="0.4">
            <animateTransform attributeName="transform" type="translate" values="0,0;280,0;0,0" dur="4.5s" repeatCount="indefinite" />
          </polygon>
        </g>

        {/* Canal outlet to sea */}
        <rect x="380" y="33" width="20" height="25" fill="hsl(200 70% 40%)" />
        
        {/* Bottom - reservoir/sea */}
        <rect x="0" y="53" width="400" height="27" fill="hsl(200 75% 45%)" />
        <path d="M0,60 Q50,55 100,60 T200,60 T300,60 T400,60 L400,80 L0,80 Z" fill="hsl(200 80% 50%)" opacity="0.5">
          <animate attributeName="d" 
            values="M0,60 Q50,55 100,60 T200,60 T300,60 T400,60 L400,80 L0,80 Z;
                    M0,60 Q50,65 100,60 T200,60 T300,60 T400,60 L400,80 L0,80 Z;
                    M0,60 Q50,55 100,60 T200,60 T300,60 T400,60 L400,80 L0,80 Z"
            dur="3s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold shadow-md flex items-center gap-1.5">
        <span className="text-base">🌧️</span> Rain Clouds
      </div>
      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold shadow-md flex items-center gap-1.5">
        <span className="text-base">🏙️</span> Singapore City
      </div>
      <div className="absolute bottom-20 left-3 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-md flex items-center gap-1.5">
        <span className="text-base">🕳️</span> Storm Drains
      </div>
      <div className="absolute bottom-3 right-3 bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-md flex items-center gap-1.5">
        <span className="text-base">🌊</span> To Reservoir/Sea
      </div>

      <style>{`
        @keyframes rainDrop {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(350px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
