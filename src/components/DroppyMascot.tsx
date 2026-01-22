import { useState, useEffect, useMemo } from "react";

type DroppyMood = "idle" | "happy" | "excited" | "thinking" | "celebrating" | "worried" | "encouraging";

interface DroppyMessage {
  text: string;
  mood: DroppyMood;
  duration?: number;
}

interface DroppyMascotProps {
  trigger?: "idle" | "start" | "hint" | "place" | "success" | "fail" | "overflow" | "achievement" | "perfect";
  customMessage?: string;
  className?: string;
}

// Droppy's personality messages
const MESSAGES: Record<string, DroppyMessage[]> = {
  idle: [
    { text: "Hi! I'm Droppy! 💧", mood: "happy" },
    { text: "Let's build some pipes!", mood: "excited" },
    { text: "Water always finds a way!", mood: "thinking" },
    { text: "Click a pipe to place it!", mood: "encouraging" },
    { text: "I love flowing through pipes!", mood: "happy" },
  ],
  start: [
    { text: "A new challenge! Exciting!", mood: "excited" },
    { text: "Let's save Singapore!", mood: "happy" },
    { text: "I believe in you!", mood: "encouraging" },
    { text: "Time to be a water engineer!", mood: "excited" },
  ],
  hint: [
    { text: "Hmm, try this spot!", mood: "thinking" },
    { text: "Here's a little help!", mood: "encouraging" },
    { text: "You're getting closer!", mood: "happy" },
  ],
  place: [
    { text: "Nice pipe placement!", mood: "happy" },
    { text: "That looks good!", mood: "excited" },
    { text: "Keep building!", mood: "encouraging" },
    { text: "Great choice!", mood: "happy" },
    { text: "I like where this is going!", mood: "excited" },
  ],
  success: [
    { text: "WOOHOO! You did it!", mood: "celebrating" },
    { text: "Amazing engineering!", mood: "celebrating" },
    { text: "I made it through! 🎉", mood: "celebrating" },
    { text: "Perfect drainage!", mood: "celebrating" },
  ],
  fail: [
    { text: "Oh no, I got lost! 😅", mood: "worried" },
    { text: "Hmm, let's try again!", mood: "encouraging" },
    { text: "Almost! Keep trying!", mood: "encouraging" },
    { text: "I need a path to follow!", mood: "thinking" },
  ],
  overflow: [
    { text: "Too much water! 😰", mood: "worried" },
    { text: "The pipe is flooding!", mood: "worried" },
    { text: "Need bigger pipes!", mood: "thinking" },
  ],
  achievement: [
    { text: "WOW! Achievement unlocked!", mood: "celebrating" },
    { text: "You're a superstar! ⭐", mood: "celebrating" },
    { text: "Incredible skills!", mood: "celebrating" },
  ],
  perfect: [
    { text: "PERFECT SCORE! 🌟", mood: "celebrating" },
    { text: "Master Engineer! 👑", mood: "celebrating" },
    { text: "Flawless victory! 🏆", mood: "celebrating" },
  ],
};

// Animation class names
const ANIMATION_CLASSES = {
  bounce: "animate-bounce",
  pulse: "animate-pulse", 
  wiggle: "animate-[wiggle_0.3s_ease-in-out_infinite]",
  floatSlow: "animate-[float_3s_ease-in-out_infinite]",
  floatFast: "animate-[float_2s_ease-in-out_infinite]",
};

// SVG animation keyframes for different moods
const getMoodAnimation = (mood: DroppyMood): string => {
  switch (mood) {
    case "celebrating":
      return ANIMATION_CLASSES.bounce;
    case "excited":
      return ANIMATION_CLASSES.pulse;
    case "worried":
      return ANIMATION_CLASSES.wiggle;
    case "thinking":
      return ANIMATION_CLASSES.floatFast;
    default:
      return ANIMATION_CLASSES.floatSlow;
  }
};

// Droppy's eyes based on mood
const getEyeStyle = (mood: DroppyMood) => {
  switch (mood) {
    case "celebrating":
      return { shape: "arc", sparkle: true };
    case "excited":
      return { shape: "wide", sparkle: true };
    case "worried":
      return { shape: "small", sparkle: false };
    case "thinking":
      return { shape: "side", sparkle: false };
    default:
      return { shape: "normal", sparkle: false };
  }
};

export const DroppyMascot = ({ trigger = "idle", customMessage, className = "" }: DroppyMascotProps) => {
  const [currentMessage, setCurrentMessage] = useState<DroppyMessage>({ text: "", mood: "idle" });
  const [isVisible, setIsVisible] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);

  // Select a random message based on trigger
  useEffect(() => {
    const messages = MESSAGES[trigger] || MESSAGES.idle;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    if (customMessage) {
      setCurrentMessage({ text: customMessage, mood: randomMessage.mood });
    } else {
      setCurrentMessage(randomMessage);
    }

    // Show sparkles for celebration moods
    if (trigger === "success" || trigger === "achievement" || trigger === "perfect") {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    }
  }, [trigger, customMessage]);

  const eyeStyle = useMemo(() => getEyeStyle(currentMessage.mood), [currentMessage.mood]);
  const bodyAnimation = useMemo(() => getMoodAnimation(currentMessage.mood), [currentMessage.mood]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Sparkle effects for celebrations */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-secondary animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 40}%`,
                animationDelay: `${i * 0.1}s`,
                fontSize: `${12 + Math.random() * 8}px`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Speech bubble */}
      <div className="relative mb-2 max-w-[140px]">
        <div className="bg-card rounded-2xl px-3 py-2 shadow-lg border-2 border-primary/20 relative">
          <p className="text-xs font-medium text-foreground text-center leading-tight">
            {currentMessage.text}
          </p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-card" />
        </div>
      </div>

      {/* Droppy SVG Character */}
      <svg
        viewBox="0 0 100 120"
        className={`w-16 h-20 ${bodyAnimation} drop-shadow-lg`}
        style={{ filter: "drop-shadow(0 4px 6px rgba(56, 189, 248, 0.3))" }}
      >
        {/* Glow effect for celebrating */}
        {(currentMessage.mood === "celebrating" || currentMessage.mood === "excited") && (
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Water drop body */}
        <path
          d="M50 10 C50 10, 85 50, 85 75 C85 95, 67.5 110, 50 110 C32.5 110, 15 95, 15 75 C15 50, 50 10, 50 10"
          fill="url(#dropGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          filter={currentMessage.mood === "celebrating" ? "url(#glow)" : undefined}
        />

        {/* Gradient for body */}
        <defs>
          <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 90%, 70%)" />
            <stop offset="50%" stopColor="hsl(200, 85%, 55%)" />
            <stop offset="100%" stopColor="hsl(210, 80%, 45%)" />
          </linearGradient>
        </defs>

        {/* Highlight/shine */}
        <ellipse cx="35" cy="50" rx="8" ry="12" fill="rgba(255,255,255,0.4)" transform="rotate(-20 35 50)" />

        {/* Eyes */}
        {eyeStyle.shape === "arc" ? (
          // Happy/celebrating closed eyes
          <>
            <path d="M35 65 Q40 58, 45 65" stroke="hsl(var(--foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M55 65 Q60 58, 65 65" stroke="hsl(var(--foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : eyeStyle.shape === "wide" ? (
          // Excited wide eyes
          <>
            <ellipse cx="38" cy="62" rx="8" ry="10" fill="white" />
            <ellipse cx="62" cy="62" rx="8" ry="10" fill="white" />
            <circle cx="38" cy="62" r="5" fill="hsl(var(--foreground))" />
            <circle cx="62" cy="62" r="5" fill="hsl(var(--foreground))" />
            <circle cx="40" cy="60" r="2" fill="white" />
            <circle cx="64" cy="60" r="2" fill="white" />
          </>
        ) : eyeStyle.shape === "small" ? (
          // Worried small eyes
          <>
            <ellipse cx="38" cy="65" rx="5" ry="4" fill="white" />
            <ellipse cx="62" cy="65" rx="5" ry="4" fill="white" />
            <circle cx="38" cy="65" r="2.5" fill="hsl(var(--foreground))" />
            <circle cx="62" cy="65" r="2.5" fill="hsl(var(--foreground))" />
          </>
        ) : eyeStyle.shape === "side" ? (
          // Thinking eyes looking to side
          <>
            <ellipse cx="38" cy="62" rx="7" ry="8" fill="white" />
            <ellipse cx="62" cy="62" rx="7" ry="8" fill="white" />
            <circle cx="41" cy="62" r="4" fill="hsl(var(--foreground))" />
            <circle cx="65" cy="62" r="4" fill="hsl(var(--foreground))" />
            <circle cx="43" cy="60" r="1.5" fill="white" />
            <circle cx="67" cy="60" r="1.5" fill="white" />
          </>
        ) : (
          // Normal eyes
          <>
            <ellipse cx="38" cy="62" rx="7" ry="8" fill="white" />
            <ellipse cx="62" cy="62" rx="7" ry="8" fill="white" />
            <circle cx="38" cy="62" r="4" fill="hsl(var(--foreground))" />
            <circle cx="62" cy="62" r="4" fill="hsl(var(--foreground))" />
            <circle cx="40" cy="60" r="1.5" fill="white" />
            <circle cx="64" cy="60" r="1.5" fill="white" />
          </>
        )}

        {/* Eye sparkles for excited moods */}
        {eyeStyle.sparkle && (
          <>
            <circle cx="42" cy="58" r="1" fill="white" className="animate-ping" />
            <circle cx="66" cy="58" r="1" fill="white" className="animate-ping" style={{ animationDelay: "0.5s" }} />
          </>
        )}

        {/* Mouth based on mood */}
        {currentMessage.mood === "worried" ? (
          <path d="M42 82 Q50 78, 58 82" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : currentMessage.mood === "thinking" ? (
          <ellipse cx="50" cy="82" rx="4" ry="3" fill="hsl(var(--foreground))" />
        ) : (
          <path d="M40 80 Q50 90, 60 80" stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* Blush cheeks for happy moods */}
        {(currentMessage.mood === "happy" || currentMessage.mood === "celebrating" || currentMessage.mood === "excited") && (
          <>
            <ellipse cx="28" cy="72" rx="5" ry="3" fill="rgba(255, 150, 180, 0.5)" />
            <ellipse cx="72" cy="72" rx="5" ry="3" fill="rgba(255, 150, 180, 0.5)" />
          </>
        )}

        {/* Little arms for celebrating */}
        {currentMessage.mood === "celebrating" && (
          <>
            <path d="M20 70 Q5 55, 15 45" stroke="hsl(200, 85%, 55%)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M80 70 Q95 55, 85 45" stroke="hsl(200, 85%, 55%)" strokeWidth="6" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>

      {/* Droppy's name tag (only shown sometimes) */}
      <span className="text-[10px] font-bold text-primary mt-1 opacity-70">Droppy 💧</span>
    </div>
  );
};

// Hook to manage Droppy's state across the game
export const useDroppy = () => {
  const [trigger, setTrigger] = useState<DroppyMascotProps["trigger"]>("idle");
  const [customMessage, setCustomMessage] = useState<string | undefined>();
  const [messageQueue, setMessageQueue] = useState<{ trigger: DroppyMascotProps["trigger"]; message?: string }[]>([]);

  // Process message queue
  useEffect(() => {
    if (messageQueue.length > 0) {
      const [next, ...rest] = messageQueue;
      setTrigger(next.trigger);
      setCustomMessage(next.message);
      setMessageQueue(rest);
    }
  }, [messageQueue]);

  const showMessage = (newTrigger: DroppyMascotProps["trigger"], message?: string) => {
    setTrigger(newTrigger);
    setCustomMessage(message);
  };

  const queueMessage = (newTrigger: DroppyMascotProps["trigger"], message?: string) => {
    setMessageQueue(prev => [...prev, { trigger: newTrigger, message }]);
  };

  const resetToIdle = () => {
    setTrigger("idle");
    setCustomMessage(undefined);
  };

  return {
    trigger,
    customMessage,
    showMessage,
    queueMessage,
    resetToIdle,
  };
};
