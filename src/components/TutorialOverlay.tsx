import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowRight, MousePointer2, X, Sparkles, ChevronRight } from "lucide-react";

interface TutorialStep {
  targetRow: number;
  targetCol: number;
  instruction: string;
  action: "place" | "observe";
  pipeType?: string;
}

interface TutorialData {
  challengeId: number;
  title: string;
  intro: string;
  steps: TutorialStep[];
}

const tutorialData: Record<number, TutorialData> = {
  1: {
    challengeId: 1,
    title: "First Drop",
    intro: "Let's learn how to build drains! We'll connect the rain cloud to the reservoir.",
    steps: [
      {
        targetRow: 2,
        targetCol: 2,
        instruction: "Click here to place a vertical pipe! Water flows down through it.",
        action: "place",
        pipeType: "pipe-vertical",
      },
      {
        targetRow: 3,
        targetCol: 2,
        instruction: "Great! Now place another vertical pipe here to complete the path.",
        action: "place",
        pipeType: "pipe-vertical",
      },
      {
        targetRow: -1,
        targetCol: -1,
        instruction: "Perfect! Now click 'Test Water Flow' to watch the water reach the reservoir!",
        action: "observe",
      },
    ],
  },
  2: {
    challengeId: 2,
    title: "Turn the Corner",
    intro: "Now let's learn to turn water around corners! The reservoir is in a different spot.",
    steps: [
      {
        targetRow: 2,
        targetCol: 1,
        instruction: "First, select the Vertical Pipe and place it here to start the path down.",
        action: "place",
        pipeType: "pipe-vertical",
      },
      {
        targetRow: 3,
        targetCol: 1,
        instruction: "Add another vertical pipe to continue down.",
        action: "place",
        pipeType: "pipe-vertical",
      },
      {
        targetRow: 4,
        targetCol: 1,
        instruction: "Now select the Corner ↓→ pipe and place it here to turn the water right!",
        action: "place",
        pipeType: "pipe-corner-br",
      },
      {
        targetRow: 4,
        targetCol: 2,
        instruction: "Select the Horizontal Pipe and continue the path to the right.",
        action: "place",
        pipeType: "pipe-horizontal",
      },
      {
        targetRow: 4,
        targetCol: 3,
        instruction: "Keep going right with another horizontal pipe.",
        action: "place",
        pipeType: "pipe-horizontal",
      },
      {
        targetRow: 4,
        targetCol: 4,
        instruction: "Use Corner ↓← to turn the water down toward the reservoir!",
        action: "place",
        pipeType: "pipe-corner-bl",
      },
      {
        targetRow: -1,
        targetCol: -1,
        instruction: "Excellent! Click 'Test Water Flow' to see your corner-turning skills!",
        action: "observe",
      },
    ],
  },
  3: {
    challengeId: 3,
    title: "Zigzag Path",
    intro: "Time for a zigzag! You'll need to navigate around obstacles (the dark blocks).",
    steps: [
      {
        targetRow: 2,
        targetCol: 0,
        instruction: "Start with Corner ↓→ here to turn the water right (away from the obstacle).",
        action: "place",
        pipeType: "pipe-corner-br",
      },
      {
        targetRow: 2,
        targetCol: 1,
        instruction: "Add a horizontal pipe to continue right.",
        action: "place",
        pipeType: "pipe-horizontal",
      },
      {
        targetRow: 2,
        targetCol: 2,
        instruction: "Continue right with another horizontal pipe.",
        action: "place",
        pipeType: "pipe-horizontal",
      },
      {
        targetRow: 2,
        targetCol: 3,
        instruction: "Now use Corner ↓← to turn the water back down!",
        action: "place",
        pipeType: "pipe-corner-bl",
      },
      {
        targetRow: 3,
        targetCol: 3,
        instruction: "Add a vertical pipe to go past the obstacles.",
        action: "place",
        pipeType: "pipe-vertical",
      },
      {
        targetRow: 4,
        targetCol: 3,
        instruction: "One more vertical pipe to reach the reservoir level!",
        action: "place",
        pipeType: "pipe-vertical",
      },
      {
        targetRow: -1,
        targetCol: -1,
        instruction: "Amazing zigzag! Click 'Test Water Flow' to complete the challenge!",
        action: "observe",
      },
    ],
  },
};

interface TutorialOverlayProps {
  challengeId: number;
  currentStep: number;
  onNextStep: () => void;
  onSkipTutorial: () => void;
  onCompleteTutorial: () => void;
  gridRef: React.RefObject<HTMLDivElement>;
  cellSize: number;
}

export const TutorialOverlay = ({
  challengeId,
  currentStep,
  onNextStep,
  onSkipTutorial,
  onCompleteTutorial,
  gridRef,
  cellSize,
}: TutorialOverlayProps) => {
  const tutorial = tutorialData[challengeId];
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(true);
  }, [challengeId]);

  useEffect(() => {
    if (!tutorial || !gridRef.current || showIntro) return;

    const step = tutorial.steps[currentStep];
    if (!step || step.targetRow < 0) {
      setArrowPosition({ x: -1, y: -1 });
      return;
    }

    const gridRect = gridRef.current.getBoundingClientRect();
    const x = gridRect.left + step.targetCol * (cellSize + 4) + cellSize / 2;
    const y = gridRect.top + step.targetRow * (cellSize + 4) + cellSize / 2;
    
    setArrowPosition({ x, y });
  }, [currentStep, tutorial, gridRef, cellSize, showIntro]);

  if (!tutorial) return null;

  const step = tutorial.steps[currentStep];
  const isLastStep = currentStep >= tutorial.steps.length - 1;
  const isObserveStep = step?.action === "observe";

  // Introduction modal
  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="max-w-md p-6 animate-scale-in">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              📚 Tutorial Mode
            </h2>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Challenge: {tutorial.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {tutorial.intro}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={onSkipTutorial}>
                Skip Tutorial
              </Button>
              <Button onClick={() => setShowIntro(false)} className="gap-2">
                Start Learning <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Floating instruction card */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4">
        <Card className="p-4 bg-primary text-primary-foreground shadow-2xl animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm font-bold">
                  {currentStep + 1}
                </div>
                <span className="text-xs opacity-75">
                  Step {currentStep + 1} of {tutorial.steps.length}
                </span>
              </div>
              <p className="text-sm font-medium">{step?.instruction}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={onSkipTutorial}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {isObserveStep && (
            <Button
              onClick={isLastStep ? onCompleteTutorial : onNextStep}
              variant="secondary"
              className="w-full mt-3"
            >
              {isLastStep ? "🎉 Complete Tutorial!" : "Next Step"}
            </Button>
          )}
        </Card>
      </div>

      {/* Animated arrow pointing to target cell */}
      {arrowPosition.x > 0 && arrowPosition.y > 0 && (
        <div
          className="fixed z-40 pointer-events-none"
          style={{
            left: arrowPosition.x,
            top: arrowPosition.y - 60,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <MousePointer2 className="w-8 h-8 text-primary fill-primary/30 drop-shadow-lg" />
            <ArrowDown className="w-6 h-6 text-primary -mt-1 drop-shadow-lg" />
          </div>
        </div>
      )}

      {/* Highlight ring around target cell */}
      {step && step.targetRow >= 0 && gridRef.current && (
        <div
          className="fixed z-30 pointer-events-none"
          style={{
            left: gridRef.current.getBoundingClientRect().left + step.targetCol * (cellSize + 4),
            top: gridRef.current.getBoundingClientRect().top + step.targetRow * (cellSize + 4),
            width: cellSize,
            height: cellSize,
          }}
        >
          <div className="w-full h-full rounded-lg border-4 border-primary animate-pulse ring-4 ring-primary/30" />
        </div>
      )}
    </>
  );
};

// Hook to check if tutorial should be shown
export const useTutorialState = () => {
  const TUTORIAL_STORAGE_KEY = "buildDrain_tutorialCompleted";
  
  const [completedTutorials, setCompletedTutorials] = useState<number[]>(() => {
    const stored = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const startTutorial = () => {
    setTutorialActive(true);
    setTutorialStep(0);
  };

  const skipTutorial = (challengeId: number) => {
    setTutorialActive(false);
    const updated = [...completedTutorials, challengeId];
    setCompletedTutorials(updated);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const completeTutorial = (challengeId: number) => {
    setTutorialActive(false);
    const updated = [...completedTutorials, challengeId];
    setCompletedTutorials(updated);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const nextStep = () => {
    setTutorialStep((prev) => prev + 1);
  };

  const shouldShowTutorial = (challengeId: number) => {
    return challengeId <= 3 && !completedTutorials.includes(challengeId);
  };

  const resetTutorialStep = () => {
    setTutorialStep(0);
  };

  return {
    tutorialActive,
    tutorialStep,
    completedTutorials,
    startTutorial,
    skipTutorial,
    completeTutorial,
    nextStep,
    shouldShowTutorial,
    resetTutorialStep,
  };
};

export const getTutorialData = (challengeId: number) => tutorialData[challengeId];
