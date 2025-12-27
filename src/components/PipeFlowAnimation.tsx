export const PipeFlowAnimation = () => {
  return (
    <div className="relative w-full h-48 md:h-56 rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
      <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet">
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(200 30% 80%)" strokeWidth="0.5" opacity="0.5" />
          </pattern>
          
          {/* Water gradient */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(200 85% 55%)" />
            <stop offset="50%" stopColor="hsl(195 90% 60%)" />
            <stop offset="100%" stopColor="hsl(200 85% 55%)" />
          </linearGradient>

          {/* Pipe gradient */}
          <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(210 20% 45%)" />
            <stop offset="50%" stopColor="hsl(210 20% 35%)" />
            <stop offset="100%" stopColor="hsl(210 20% 40%)" />
          </linearGradient>
        </defs>

        <rect width="400" height="150" fill="url(#grid)" />

        {/* Main pipe - cross section view */}
        <g transform="translate(50, 30)">
          {/* Pipe outer */}
          <rect x="0" y="20" width="300" height="60" rx="8" fill="url(#pipeGrad)" />
          
          {/* Pipe inner (water channel) */}
          <rect x="10" y="30" width="280" height="40" rx="4" fill="hsl(210 30% 20%)" />
          
          {/* Water flowing */}
          <rect x="10" y="45" width="280" height="25" rx="4" fill="url(#waterGrad)" opacity="0.8">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.5s" repeatCount="indefinite" />
          </rect>
          
          {/* Flow particles */}
          <circle r="4" fill="white" opacity="0.7">
            <animateMotion dur="2s" repeatCount="indefinite" path="M15,57 L280,57" />
          </circle>
          <circle r="3" fill="white" opacity="0.5">
            <animateMotion dur="2.3s" repeatCount="indefinite" path="M15,62 L280,62" />
          </circle>
          <circle r="3.5" fill="white" opacity="0.6">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M15,55 L280,55" />
          </circle>
          <circle r="2.5" fill="white" opacity="0.4">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M15,60 L280,60" />
          </circle>

          {/* Depth markers */}
          <line x1="20" y1="30" x2="20" y2="70" stroke="hsl(45 100% 55%)" strokeWidth="2" />
          <text x="25" y="52" fill="hsl(45 100% 55%)" fontSize="10" fontWeight="bold">h</text>
          
          {/* Flow direction arrow */}
          <polygon points="270,57 285,50 285,64" fill="white" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
          </polygon>
        </g>

        {/* Labels */}
        <text x="200" y="20" textAnchor="middle" fill="hsl(210 60% 30%)" fontSize="12" fontWeight="bold">
          Cross-Section of a Storm Drain
        </text>
        
        {/* Measurement annotations */}
        <g transform="translate(50, 100)">
          <line x1="0" y1="5" x2="300" y2="5" stroke="hsl(160 70% 45%)" strokeWidth="2" strokeDasharray="5,3" />
          <text x="150" y="20" textAnchor="middle" fill="hsl(160 70% 40%)" fontSize="10" fontWeight="bold">
            A = Channel Area (St. Venant uses this!)
          </text>
        </g>

        {/* Q annotation */}
        <g transform="translate(320, 60)">
          <text x="0" y="0" fill="hsl(200 85% 45%)" fontSize="11" fontWeight="bold">Q →</text>
          <text x="0" y="14" fill="hsl(210 30% 50%)" fontSize="9">Water Flow</text>
        </g>
      </svg>

      {/* Corner label */}
      <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold shadow-md">
        📐 How St. Venant Sees a Pipe!
      </div>
    </div>
  );
};
