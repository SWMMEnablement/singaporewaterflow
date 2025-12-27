export const WaterAnimation = () => {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-3xl bg-gradient-to-b from-primary/10 to-primary/30">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/50 to-transparent" />
      
      {/* Animated clouds */}
      <svg className="absolute top-4 left-[10%] w-20 h-12 animate-float opacity-80" viewBox="0 0 100 60">
        <ellipse cx="25" cy="40" rx="20" ry="15" fill="white" />
        <ellipse cx="50" cy="35" rx="25" ry="18" fill="white" />
        <ellipse cx="75" cy="40" rx="20" ry="15" fill="white" />
        <ellipse cx="50" cy="25" rx="18" ry="14" fill="white" />
      </svg>
      
      <svg className="absolute top-8 right-[15%] w-16 h-10 animate-float opacity-60" style={{ animationDelay: '-1.5s' }} viewBox="0 0 100 60">
        <ellipse cx="25" cy="40" rx="20" ry="15" fill="white" />
        <ellipse cx="50" cy="35" rx="25" ry="18" fill="white" />
        <ellipse cx="75" cy="40" rx="20" ry="15" fill="white" />
      </svg>

      {/* Rain drops */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-4 bg-rain/60 rounded-full"
          style={{
            left: `${8 + i * 8}%`,
            top: '-10%',
            animation: `rain 1.2s linear infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      {/* Ground/City silhouette */}
      <svg className="absolute bottom-12 left-0 right-0 h-16" viewBox="0 0 400 60" preserveAspectRatio="none">
        <path
          fill="hsl(210 30% 25%)"
          d="M0,60 L0,40 L20,40 L20,25 L35,25 L35,35 L50,35 L50,20 L70,20 L70,40 L90,40 L90,30 L100,30 L100,15 L115,15 L115,35 L140,35 L140,45 L160,45 L160,25 L180,25 L180,40 L200,40 L200,20 L215,20 L215,30 L230,30 L230,45 L250,45 L250,35 L270,35 L270,20 L290,20 L290,40 L310,40 L310,30 L330,30 L330,45 L350,45 L350,25 L370,25 L370,40 L400,40 L400,60 Z"
        />
      </svg>

      {/* Drain opening */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-4 bg-foreground/80 rounded-sm" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-2 bg-foreground/60 rounded-sm">
        <div className="absolute inset-0 flex justify-around items-center">
          <div className="w-1 h-full bg-primary/40" />
          <div className="w-1 h-full bg-primary/40" />
          <div className="w-1 h-full bg-primary/40" />
        </div>
      </div>

      {/* Water flowing into drain */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="relative">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-rain rounded-full"
              style={{
                animation: 'drainFlow 0.8s ease-in infinite',
                animationDelay: `${i * 0.25}s`,
                left: `${(i - 1) * 8}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Water waves at bottom */}
      <svg className="absolute bottom-0 left-0 right-0 h-12" viewBox="0 0 400 50" preserveAspectRatio="none">
        <path
          className="animate-wave"
          fill="hsl(200 85% 45% / 0.6)"
          d="M0,25 C50,35 100,15 150,25 C200,35 250,15 300,25 C350,35 400,20 400,25 L400,50 L0,50 Z"
        />
        <path
          className="animate-wave"
          style={{ animationDelay: '-0.5s' }}
          fill="hsl(200 85% 50% / 0.4)"
          d="M0,30 C50,20 100,40 150,30 C200,20 250,40 300,30 C350,20 400,35 400,30 L400,50 L0,50 Z"
        />
        <path
          fill="hsl(200 85% 55% / 0.8)"
          d="M0,40 C50,38 100,42 150,40 C200,38 250,42 300,40 C350,38 400,42 400,40 L400,50 L0,50 Z"
        />
      </svg>

      {/* Labels */}
      <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
        ☁️ Rain Cloud
      </div>
      <div className="absolute bottom-14 right-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
        🏙️ City
      </div>
      <div className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
        🌊 Stormwater Drain
      </div>

      <style>{`
        @keyframes drainFlow {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(20px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
