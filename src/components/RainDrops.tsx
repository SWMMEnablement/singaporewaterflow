import { useEffect, useState } from "react";

interface RainDrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const RainDrops = () => {
  const [drops, setDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const newDrops: RainDrop[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 1,
      size: 3 + Math.random() * 4,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute rounded-full bg-rain/40"
          style={{
            left: `${drop.left}%`,
            width: `${drop.size}px`,
            height: `${drop.size * 3}px`,
            animation: `rain ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
