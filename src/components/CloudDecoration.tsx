import React from "react";

interface CloudProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export const CloudDecoration = ({ className = "", size = "md", style }: CloudProps) => {
  const sizeClasses = {
    sm: "w-16 h-10",
    md: "w-24 h-14",
    lg: "w-32 h-20",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`} style={style}>
      <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-lg">
        <ellipse cx="25" cy="40" rx="20" ry="18" fill="hsl(200 20% 95%)" />
        <ellipse cx="50" cy="35" rx="25" ry="22" fill="hsl(200 20% 95%)" />
        <ellipse cx="75" cy="40" rx="20" ry="18" fill="hsl(200 20% 95%)" />
        <ellipse cx="40" cy="25" rx="18" ry="16" fill="hsl(200 20% 97%)" />
        <ellipse cx="60" cy="25" rx="18" ry="16" fill="hsl(200 20% 97%)" />
      </svg>
    </div>
  );
};
