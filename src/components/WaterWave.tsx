export const WaterWave = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: "120px" }}
      >
        <path
          className="animate-wave"
          fill="hsl(200 85% 45% / 0.3)"
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z"
        />
        <path
          className="animate-wave"
          style={{ animationDelay: "-0.5s" }}
          fill="hsl(200 85% 45% / 0.2)"
          d="M0,80 C360,40 720,100 1080,80 C1260,70 1350,90 1440,80 L1440,120 L0,120 Z"
        />
        <path
          fill="hsl(200 85% 45% / 0.4)"
          d="M0,100 C360,90 720,110 1080,100 C1260,95 1350,105 1440,100 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};
