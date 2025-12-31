import { useState, useCallback, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Droplets, 
  Play, 
  RotateCcw, 
  CloudRain,
  ArrowDown,
  ArrowRight,
  Square,
  Waves,
  Trophy,
  Star,
  Lock,
  ChevronLeft,
  Sparkles,
  Gauge,
  AlertTriangle,
  Zap,
  Award,
  BookOpen,
  X
} from "lucide-react";
import { toast } from "sonner";

// Achievement definitions
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  condition: (stats: SimulationStats) => boolean;
}

interface SimulationStats {
  score: number;
  rainfallIntensity: number;
  overflowCount: number;
  totalDrops: number;
  flowRate: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "storm_master",
    name: "Storm Master",
    description: "Handle an extreme storm (level 5) with 100% collection!",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    condition: (stats) => stats.rainfallIntensity === 5 && stats.score === 100,
  },
  {
    id: "no_overflow",
    name: "Perfect Pipes",
    description: "Complete any level without a single overflow!",
    icon: <Award className="w-6 h-6 text-green-500" />,
    condition: (stats) => stats.score === 100 && stats.overflowCount === 0,
  },
  {
    id: "heavy_weather",
    name: "Heavy Weather Hero",
    description: "Collect 100% at rainfall level 4 or higher!",
    icon: <CloudRain className="w-6 h-6 text-blue-500" />,
    condition: (stats) => stats.rainfallIntensity >= 4 && stats.score === 100,
  },
  {
    id: "flood_fighter",
    name: "Flood Fighter",
    description: "Survive a storm with 3+ overflows and still collect some water!",
    icon: <Waves className="w-6 h-6 text-cyan-500" />,
    condition: (stats) => stats.overflowCount >= 3 && stats.score > 0,
  },
  {
    id: "efficiency_expert",
    name: "Efficiency Expert",
    description: "Achieve a flow rate of 2+ drops per second!",
    icon: <Gauge className="w-6 h-6 text-purple-500" />,
    condition: (stats) => stats.flowRate >= 2,
  },
];

type CellType = "empty" | "pipe-vertical" | "pipe-horizontal" | "pipe-corner-br" | "pipe-corner-bl" | "pipe-corner-tr" | "pipe-corner-tl" | "pipe-t-down" | "pipe-t-up" | "pipe-t-left" | "pipe-t-right" | "main-drain-vertical" | "main-drain-horizontal" | "drain-grate" | "reservoir" | "rain-cloud" | "locked";

interface Cell {
  type: CellType;
  locked?: boolean;
  waterCount?: number; // Track how many drops have passed through
}

interface WaterDrop {
  id: number;
  row: number;
  col: number;
  direction: "down" | "left" | "right";
}

interface Challenge {
  id: number;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  hint: string;
  initialGrid: Cell[][];
  availableComponents: CellType[];
}

// Pipe capacity limits - how many drops can pass through before overflow
const PIPE_CAPACITY: Record<CellType, number> = {
  "empty": 0,
  "pipe-vertical": 3,
  "pipe-horizontal": 3,
  "pipe-corner-br": 2,
  "pipe-corner-bl": 2,
  "pipe-corner-tr": 2,
  "pipe-corner-tl": 2,
  "pipe-t-down": 4,    // T-junctions have higher capacity
  "pipe-t-up": 4,
  "pipe-t-left": 4,
  "pipe-t-right": 4,
  "main-drain-vertical": 8,   // Main drains have much higher capacity
  "main-drain-horizontal": 8,
  "drain-grate": 5,
  "reservoir": 999,
  "rain-cloud": 999,
  "locked": 0,
};

const GRID_SIZE = 6;

const createEmptyGrid = (): Cell[][] => 
  Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill(null).map(() => ({ type: "empty" as CellType, waterCount: 0 }))
  );

const challenges: Challenge[] = [
  {
    id: 1,
    name: "First Drop",
    difficulty: "easy",
    description: "Connect the rain cloud to the reservoir using just 2 pipes!",
    hint: "The water flows straight down. Add vertical pipes!",
    initialGrid: (() => {
      const grid = createEmptyGrid();
      grid[0][2] = { type: "rain-cloud", locked: true };
      grid[1][2] = { type: "drain-grate", locked: true };
      grid[4][2] = { type: "reservoir", locked: true };
      return grid;
    })(),
    availableComponents: ["pipe-vertical"],
  },
  {
    id: 2,
    name: "Turn the Corner",
    difficulty: "easy",
    description: "Guide water around a corner to reach the reservoir!",
    hint: "Use a corner pipe to change direction!",
    initialGrid: (() => {
      const grid = createEmptyGrid();
      grid[0][1] = { type: "rain-cloud", locked: true };
      grid[1][1] = { type: "drain-grate", locked: true };
      grid[5][4] = { type: "reservoir", locked: true };
      return grid;
    })(),
    availableComponents: ["pipe-vertical", "pipe-horizontal", "pipe-corner-br"],
  },
  {
    id: 3,
    name: "Zigzag Path",
    difficulty: "medium",
    description: "Create a zigzag path around the obstacles!",
    hint: "You'll need to turn twice - once right, then down again!",
    initialGrid: (() => {
      const grid = createEmptyGrid();
      grid[0][0] = { type: "rain-cloud", locked: true };
      grid[1][0] = { type: "drain-grate", locked: true };
      // Obstacles
      grid[3][0] = { type: "locked", locked: true };
      grid[3][1] = { type: "locked", locked: true };
      grid[5][3] = { type: "reservoir", locked: true };
      return grid;
    })(),
    availableComponents: ["pipe-vertical", "pipe-horizontal", "pipe-corner-br", "pipe-corner-bl"],
  },
  {
    id: 4,
    name: "Double Trouble",
    difficulty: "medium",
    description: "Two rain clouds need to reach the same reservoir!",
    hint: "Build two paths that both lead to the reservoir!",
    initialGrid: (() => {
      const grid = createEmptyGrid();
      grid[0][1] = { type: "rain-cloud", locked: true };
      grid[0][4] = { type: "rain-cloud", locked: true };
      grid[1][1] = { type: "drain-grate", locked: true };
      grid[1][4] = { type: "drain-grate", locked: true };
      grid[5][2] = { type: "reservoir", locked: true };
      return grid;
    })(),
    availableComponents: ["pipe-vertical", "pipe-horizontal", "pipe-corner-br", "pipe-corner-bl"],
  },
  {
    id: 5,
    name: "Maze Runner",
    difficulty: "hard",
    description: "Navigate through the maze to save Singapore from flooding!",
    hint: "Plan your route carefully - there's only one way through!",
    initialGrid: (() => {
      const grid = createEmptyGrid();
      grid[0][0] = { type: "rain-cloud", locked: true };
      grid[1][0] = { type: "drain-grate", locked: true };
      // Maze walls
      grid[2][1] = { type: "locked", locked: true };
      grid[2][2] = { type: "locked", locked: true };
      grid[2][3] = { type: "locked", locked: true };
      grid[3][3] = { type: "locked", locked: true };
      grid[4][1] = { type: "locked", locked: true };
      grid[4][3] = { type: "locked", locked: true };
      grid[4][4] = { type: "locked", locked: true };
      grid[5][5] = { type: "reservoir", locked: true };
      return grid;
    })(),
    availableComponents: ["pipe-vertical", "pipe-horizontal", "pipe-corner-br", "pipe-corner-bl"],
  },
  {
    id: 6,
    name: "Master Engineer",
    difficulty: "hard",
    description: "Three clouds, one reservoir, many obstacles. Can you save the city?",
    hint: "Think about merging paths together!",
    initialGrid: (() => {
      const grid = createEmptyGrid();
      grid[0][0] = { type: "rain-cloud", locked: true };
      grid[0][2] = { type: "rain-cloud", locked: true };
      grid[0][5] = { type: "rain-cloud", locked: true };
      grid[1][0] = { type: "drain-grate", locked: true };
      grid[1][2] = { type: "drain-grate", locked: true };
      grid[1][5] = { type: "drain-grate", locked: true };
      // Obstacles
      grid[3][1] = { type: "locked", locked: true };
      grid[3][4] = { type: "locked", locked: true };
      grid[4][2] = { type: "locked", locked: true };
      grid[5][3] = { type: "reservoir", locked: true };
      return grid;
    })(),
    availableComponents: ["pipe-vertical", "pipe-horizontal", "pipe-corner-br", "pipe-corner-bl"],
  },
];

const allComponents: { type: CellType; label: string; icon: React.ReactNode; description: string; capacity?: number }[] = [
  { type: "rain-cloud", label: "Rain Cloud", icon: <CloudRain className="w-6 h-6" />, description: "Where rain starts!" },
  { type: "drain-grate", label: "Drain Grate", icon: <Square className="w-6 h-6" />, description: "Catches rainwater", capacity: 5 },
  { type: "pipe-vertical", label: "Vertical Pipe", icon: <ArrowDown className="w-6 h-6" />, description: "Water flows down", capacity: 3 },
  { type: "pipe-horizontal", label: "Horizontal Pipe", icon: <ArrowRight className="w-6 h-6" />, description: "Water flows sideways", capacity: 3 },
  { type: "pipe-corner-br", label: "Corner ↓→", icon: <div className="w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />, description: "Turns water right", capacity: 2 },
  { type: "pipe-corner-bl", label: "Corner ↓←", icon: <div className="w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />, description: "Turns water left", capacity: 2 },
  { type: "pipe-t-down", label: "T-Junction ↓", icon: <div className="w-6 h-6 border-b-2 border-l-2 border-r-2 border-primary" />, description: "Splits flow left & right", capacity: 4 },
  { type: "pipe-t-up", label: "T-Junction ↑", icon: <div className="w-6 h-6 border-t-2 border-l-2 border-r-2 border-primary" />, description: "Merges from left & right", capacity: 4 },
  { type: "pipe-t-left", label: "T-Junction ←", icon: <div className="w-6 h-6 border-l-2 border-t-2 border-b-2 border-primary" />, description: "Splits up & down", capacity: 4 },
  { type: "pipe-t-right", label: "T-Junction →", icon: <div className="w-6 h-6 border-r-2 border-t-2 border-b-2 border-primary" />, description: "Splits up & down", capacity: 4 },
  { type: "main-drain-vertical", label: "Main Drain ↓", icon: <div className="w-6 h-6 flex items-center justify-center"><div className="w-3 h-6 bg-primary rounded-sm" /></div>, description: "High capacity! (8 drops)", capacity: 8 },
  { type: "main-drain-horizontal", label: "Main Drain →", icon: <div className="w-6 h-6 flex items-center justify-center"><div className="w-6 h-3 bg-primary rounded-sm" /></div>, description: "High capacity! (8 drops)", capacity: 8 },
  { type: "reservoir", label: "Reservoir", icon: <Waves className="w-6 h-6" />, description: "Stores water safely!" },
];

const BuildDrain = () => {
  const [mode, setMode] = useState<"menu" | "sandbox" | "challenge">("menu");
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid);
  const [selectedComponent, setSelectedComponent] = useState<CellType | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  // Hydrology features
  const [rainfallIntensity, setRainfallIntensity] = useState(1); // 1-5 drops per cloud
  const [flowRate, setFlowRate] = useState(0); // drops per second reaching reservoir
  const [totalReached, setTotalReached] = useState(0);
  const [overflowCells, setOverflowCells] = useState<{row: number; col: number}[]>([]);
  const [pipeUsage, setPipeUsage] = useState<number[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  );
  const simulationStartTime = useRef<number>(0);
  
  // Learning popup and achievements
  const [showLearningPopup, setShowLearningPopup] = useState(false);
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [hasSeenOverflowLesson, setHasSeenOverflowLesson] = useState(false);

  const availableComponents = currentChallenge 
    ? allComponents.filter(c => currentChallenge.availableComponents.includes(c.type))
    : allComponents;

  // Calculate flow rate during simulation
  useEffect(() => {
    if (isSimulating && simulationStartTime.current > 0) {
      const elapsed = (Date.now() - simulationStartTime.current) / 1000;
      if (elapsed > 0) {
        setFlowRate(Math.round((totalReached / elapsed) * 10) / 10);
      }
    }
  }, [totalReached, isSimulating]);

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setGrid(challenge.initialGrid.map(row => row.map(cell => ({ ...cell, waterCount: 0 }))));
    setMode("challenge");
    setScore(null);
    setWaterDrops([]);
    setShowHint(false);
    setFlowRate(0);
    setTotalReached(0);
    setOverflowCells([]);
    setPipeUsage(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
    toast.info(`Challenge: ${challenge.name}`);
  };

  const startSandbox = () => {
    setCurrentChallenge(null);
    setGrid(createEmptyGrid());
    setMode("sandbox");
    setScore(null);
    setWaterDrops([]);
    setFlowRate(0);
    setTotalReached(0);
    setOverflowCells([]);
    setPipeUsage(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
  };

  const backToMenu = () => {
    setMode("menu");
    setCurrentChallenge(null);
    setScore(null);
    setWaterDrops([]);
    setFlowRate(0);
    setTotalReached(0);
    setOverflowCells([]);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isSimulating) return;
    if (grid[row][col].locked) {
      toast.error("This piece is locked!");
      return;
    }
    
    if (selectedComponent) {
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].type = selectedComponent;
        return newGrid;
      });
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (isSimulating) return;
    if (grid[row][col].locked) return;
    
    setGrid(prev => {
      const newGrid = prev.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].type = "empty";
      return newGrid;
    });
  };

  const resetGrid = () => {
    if (currentChallenge) {
      setGrid(currentChallenge.initialGrid.map(row => row.map(cell => ({ ...cell, waterCount: 0 }))));
    } else {
      setGrid(createEmptyGrid());
    }
    setWaterDrops([]);
    setIsSimulating(false);
    setScore(null);
    setFlowRate(0);
    setTotalReached(0);
    setOverflowCells([]);
    setPipeUsage(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
  };

  const simulateWater = useCallback(() => {
    const rainClouds: { row: number; col: number }[] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.type === "rain-cloud") {
          rainClouds.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (rainClouds.length === 0) {
      toast.error("Add a rain cloud first! ☁️");
      return;
    }

    setIsSimulating(true);
    setScore(null);
    setFlowRate(0);
    setTotalReached(0);
    setOverflowCells([]);
    simulationStartTime.current = Date.now();
    
    // Reset pipe usage tracking
    const usageTracker = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    setPipeUsage(usageTracker);

    // Create multiple drops per cloud based on rainfall intensity
    const initialDrops: WaterDrop[] = [];
    let dropId = 0;
    rainClouds.forEach((cloud) => {
      for (let i = 0; i < rainfallIntensity; i++) {
        initialDrops.push({
          id: dropId++,
          row: cloud.row,
          col: cloud.col,
          direction: "down" as const,
        });
      }
    });

    // Stagger drops based on intensity (higher = faster spawning)
    const dropDelay = Math.max(100, 400 - (rainfallIntensity * 50));
    const stepDelay = Math.max(200, 500 - (rainfallIntensity * 50));
    
    let currentDrops: WaterDrop[] = [];
    let pendingDrops = [...initialDrops];
    let reachedReservoir = 0;
    let steps = 0;
    const maxSteps = 30;
    const newOverflows: {row: number; col: number}[] = [];

    const spawnNextDrop = () => {
      if (pendingDrops.length > 0) {
        currentDrops.push(pendingDrops.shift()!);
        setWaterDrops([...currentDrops]);
        if (pendingDrops.length > 0) {
          setTimeout(spawnNextDrop, dropDelay);
        }
      }
    };

    // Start spawning drops
    spawnNextDrop();

    const moveWater = () => {
      steps++;
      
      const newDrops: WaterDrop[] = [];
      
      currentDrops.forEach(drop => {
        let nextRow = drop.row;
        let nextCol = drop.col;
        let nextDirection = drop.direction;

        if (drop.direction === "down") nextRow++;
        else if (drop.direction === "left") nextCol--;
        else if (drop.direction === "right") nextCol++;

        if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) {
          return;
        }

        const nextCell = grid[nextRow][nextCol];

        if (nextCell.type === "reservoir") {
          reachedReservoir++;
          setTotalReached(reachedReservoir);
          return;
        }

        if (nextCell.type === "empty" || nextCell.type === "rain-cloud" || nextCell.type === "locked") {
          return;
        }

        // Track pipe usage and check for overflow
        usageTracker[nextRow][nextCol]++;
        setPipeUsage([...usageTracker.map(row => [...row])]);
        
        const capacity = PIPE_CAPACITY[nextCell.type];
        if (usageTracker[nextRow][nextCol] > capacity && capacity < 999) {
          if (!newOverflows.some(o => o.row === nextRow && o.col === nextCol)) {
            newOverflows.push({ row: nextRow, col: nextCol });
            setOverflowCells([...newOverflows]);
          }
          // Drop is lost due to overflow
          return;
        }

        if (nextCell.type === "drain-grate" && drop.direction === "down") {
          nextDirection = "down";
        } else if (nextCell.type === "pipe-vertical" || nextCell.type === "main-drain-vertical") {
          nextDirection = "down";
        } else if (nextCell.type === "pipe-horizontal" || nextCell.type === "main-drain-horizontal") {
          // Keep horizontal direction
        } else if (nextCell.type === "pipe-corner-br") {
          nextDirection = drop.direction === "down" ? "right" : "down";
        } else if (nextCell.type === "pipe-corner-bl") {
          nextDirection = drop.direction === "down" ? "left" : "down";
        } else if (nextCell.type === "pipe-corner-tr") {
          nextDirection = "right";
        } else if (nextCell.type === "pipe-corner-tl") {
          nextDirection = "left";
        } else if (nextCell.type === "pipe-t-down") {
          // T pointing down: water from top goes down, water from sides continues
          if (drop.direction === "down") {
            nextDirection = "down";
          } else {
            nextDirection = drop.direction; // continue left or right
          }
        } else if (nextCell.type === "pipe-t-up") {
          // T pointing up: water flows up into horizontal, then left or right
          if (drop.direction === "down") {
            // Split: randomly go left or right
            nextDirection = Math.random() > 0.5 ? "left" : "right";
          } else {
            nextDirection = drop.direction;
          }
        } else if (nextCell.type === "pipe-t-left") {
          // T pointing left: vertical water continues, horizontal goes left
          if (drop.direction === "down") {
            nextDirection = "down";
          } else {
            nextDirection = "left";
          }
        } else if (nextCell.type === "pipe-t-right") {
          // T pointing right: vertical water continues, horizontal goes right
          if (drop.direction === "down") {
            nextDirection = "down";
          } else {
            nextDirection = "right";
          }
        }

        newDrops.push({
          ...drop,
          row: nextRow,
          col: nextCol,
          direction: nextDirection,
        });
      });

      currentDrops = newDrops;
      setWaterDrops([...currentDrops, ...pendingDrops.map((d, i) => ({ ...d, id: d.id }))]);

      if ((currentDrops.length > 0 || pendingDrops.length > 0) && steps < maxSteps) {
        setTimeout(moveWater, stepDelay);
      } else {
        setIsSimulating(false);
        const totalDrops = rainClouds.length * rainfallIntensity;
        const percentage = Math.round((reachedReservoir / totalDrops) * 100);
        setScore(percentage);
        
        // Check for achievements
        const stats: SimulationStats = {
          score: percentage,
          rainfallIntensity,
          overflowCount: newOverflows.length,
          totalDrops,
          flowRate: simulationStartTime.current > 0 
            ? Math.round((reachedReservoir / ((Date.now() - simulationStartTime.current) / 1000)) * 10) / 10 
            : 0,
        };
        
        ACHIEVEMENTS.forEach(achievement => {
          if (!earnedAchievements.includes(achievement.id) && achievement.condition(stats)) {
            setEarnedAchievements(prev => [...prev, achievement.id]);
            setNewAchievement(achievement);
            toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`);
          }
        });
        
        // Show learning popup on first overflow
        if (newOverflows.length > 0 && !hasSeenOverflowLesson) {
          setShowLearningPopup(true);
          setHasSeenOverflowLesson(true);
        } else if (newOverflows.length > 0) {
          toast.warning(`⚠️ ${newOverflows.length} pipe(s) overflowed! Try larger pipes or fewer drops.`);
        }
        
        if (percentage === 100) {
          toast.success("🎉 Perfect! All water reached the reservoir!");
          if (currentChallenge && !completedChallenges.includes(currentChallenge.id)) {
            setCompletedChallenges(prev => [...prev, currentChallenge.id]);
          }
        } else if (percentage > 0) {
          toast.info(`${reachedReservoir}/${totalDrops} water drops reached the reservoir!`);
        } else {
          toast.error("No water reached the reservoir. Try again!");
        }
      }
    };

    setTimeout(moveWater, stepDelay);
  }, [grid, currentChallenge, completedChallenges, rainfallIntensity, earnedAchievements, hasSeenOverflowLesson]);

  const renderCell = (cell: Cell, row: number, col: number) => {
    const hasWater = waterDrops.some(d => d.row === row && d.col === col);
    const usage = pipeUsage[row][col];
    const capacity = PIPE_CAPACITY[cell.type];
    const isOverflowing = overflowCells.some(o => o.row === row && o.col === col);
    const usagePercent = capacity > 0 && capacity < 999 ? Math.min(100, (usage / capacity) * 100) : 0;
    
    const cellContent = () => {
      switch (cell.type) {
        case "rain-cloud":
          return <CloudRain className={`w-8 h-8 ${hasWater ? "text-primary animate-bounce" : "text-muted-foreground"}`} />;
        case "drain-grate":
          return (
            <div className={`w-10 h-10 grid grid-cols-3 gap-0.5 ${hasWater ? "bg-primary/30" : "bg-muted"} rounded p-1 relative`}>
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-foreground/30 rounded-sm" />
              ))}
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-vertical":
          return (
            <div className={`w-4 h-full ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-full relative overflow-hidden`}>
              {hasWater && <div className="absolute inset-0 bg-primary animate-pulse" />}
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-horizontal":
          return (
            <div className={`h-4 w-full ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-full relative overflow-hidden`}>
              {hasWater && <div className="absolute inset-0 bg-primary animate-pulse" />}
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-corner-br":
          return (
            <div className="relative w-full h-full">
              <div className={`w-full h-full border-b-4 border-r-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-br-2xl`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-corner-bl":
          return (
            <div className="relative w-full h-full">
              <div className={`w-full h-full border-b-4 border-l-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-bl-2xl`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-corner-tr":
          return (
            <div className="relative w-full h-full">
              <div className={`w-full h-full border-t-4 border-r-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-tr-2xl`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-corner-tl":
          return (
            <div className="relative w-full h-full">
              <div className={`w-full h-full border-t-4 border-l-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-tl-2xl`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-t-down":
          return (
            <div className="relative w-full h-full flex items-end justify-center">
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-t-full`} />
              <div className={`absolute bottom-1/2 left-0 w-full h-4 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"}`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-t-up":
          return (
            <div className="relative w-full h-full flex items-start justify-center">
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-b-full`} />
              <div className={`absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"}`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-t-left":
          return (
            <div className="relative w-full h-full flex items-center justify-start">
              <div className={`absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"}`} />
              <div className={`absolute left-0 top-1/2 w-1/2 h-4 -translate-y-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-l-full`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "pipe-t-right":
          return (
            <div className="relative w-full h-full flex items-center justify-end">
              <div className={`absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"}`} />
              <div className={`absolute right-0 top-1/2 w-1/2 h-4 -translate-y-1/2 ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-r-full`} />
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "main-drain-vertical":
          return (
            <div className={`w-6 h-full ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-lg relative overflow-hidden border-2 ${hasWater ? "border-primary" : "border-muted-foreground/30"}`}>
              {hasWater && <div className="absolute inset-0 bg-primary animate-pulse" />}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-full bg-background/20" />
              </div>
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "main-drain-horizontal":
          return (
            <div className={`h-6 w-full ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-lg relative overflow-hidden border-2 ${hasWater ? "border-primary" : "border-muted-foreground/30"}`}>
              {hasWater && <div className="absolute inset-0 bg-primary animate-pulse" />}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-1 w-full bg-background/20" />
              </div>
              {usage > 0 && <CapacityIndicator usage={usage} capacity={capacity} />}
            </div>
          );
        case "reservoir":
          return (
            <div className={`w-full h-full ${hasWater ? "bg-primary/50" : "bg-primary/20"} rounded-lg flex items-center justify-center border-2 border-primary/50`}>
              <Waves className={`w-6 h-6 ${hasWater ? "text-primary animate-bounce" : "text-primary/50"}`} />
            </div>
          );
        case "locked":
          return (
            <div className="w-full h-full bg-destructive/20 rounded-lg flex items-center justify-center border-2 border-destructive/30">
              <Lock className="w-5 h-5 text-destructive/50" />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div
        key={`${row}-${col}`}
        onClick={() => handleCellClick(row, col)}
        onContextMenu={(e) => handleCellRightClick(e, row, col)}
        className={`
          w-14 h-14 sm:w-16 sm:h-16 border-2 border-dashed border-border/50 rounded-lg
          flex items-center justify-center cursor-pointer transition-all relative
          ${cell.type === "empty" ? "hover:bg-primary/10 hover:border-primary/50" : "bg-card"}
          ${cell.locked ? "cursor-not-allowed" : ""}
          ${selectedComponent && cell.type === "empty" && !cell.locked ? "ring-2 ring-primary/30" : ""}
          ${isOverflowing ? "ring-2 ring-destructive animate-pulse" : ""}
        `}
      >
        {cellContent()}
        {isOverflowing && (
          <div className="absolute -top-1 -right-1 bg-destructive rounded-full p-0.5">
            <AlertTriangle className="w-3 h-3 text-destructive-foreground" />
          </div>
        )}
      </div>
    );
  };

  // Capacity indicator component
  const CapacityIndicator = ({ usage, capacity }: { usage: number; capacity: number }) => {
    const percent = Math.min(100, (usage / capacity) * 100);
    const color = percent >= 100 ? "bg-destructive" : percent >= 66 ? "bg-yellow-500" : "bg-green-500";
    
    return (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  };

  // Learning Popup Component
  const LearningPopup = () => (
    <Dialog open={showLearningPopup} onOpenChange={setShowLearningPopup}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="w-6 h-6 text-primary" />
            Learn About Flooding!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <h4 className="font-bold text-destructive flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" />
              What Happened?
            </h4>
            <p className="text-sm text-muted-foreground">
              Your pipes overflowed! This happens when too much water tries to flow through a pipe at once.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
              <CloudRain className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Rainfall Intensity</h5>
                <p className="text-xs text-muted-foreground">
                  Stronger storms create more raindrops. Level 5 storms produce 5× more water than level 1!
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
              <Gauge className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Pipe Capacity</h5>
                <p className="text-xs text-muted-foreground">
                  Each pipe can only handle a certain number of drops. Corner pipes (2 max) hold less than straight pipes (3 max)!
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
              <Waves className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Real-World Flooding</h5>
                <p className="text-xs text-muted-foreground">
                  This is exactly why cities flood! When rain falls faster than drains can handle, water backs up and overflows onto streets.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-1">💡 Engineer's Tip</h4>
            <p className="text-xs text-muted-foreground">
              Try using drain grates (5 capacity) near rain clouds, or reduce rainfall intensity to prevent overflow!
            </p>
          </div>
          
          <Button onClick={() => setShowLearningPopup(false)} className="w-full">
            Got it! Let me try again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Achievement Popup Component
  const AchievementPopup = () => (
    <Dialog open={newAchievement !== null} onOpenChange={() => setNewAchievement(null)}>
      <DialogContent className="max-w-sm text-center">
        <div className="py-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            {newAchievement?.icon}
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Achievement Unlocked!</h2>
          <h3 className="text-xl font-semibold text-primary mb-2">{newAchievement?.name}</h3>
          <p className="text-muted-foreground">{newAchievement?.description}</p>
          <Button onClick={() => setNewAchievement(null)} className="mt-6">
            Awesome!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Menu View
  if (mode === "menu") {
    return (
      <>
        <Navbar />
        <LearningPopup />
        <AchievementPopup />
        <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Droplets className="w-4 h-4" />
                Interactive Activity
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Build Your Own Drain! 🏗️
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose a challenge or build freely in sandbox mode!
              </p>
            </div>

            {/* Achievements Display */}
            {earnedAchievements.length > 0 && (
              <Card className="max-w-2xl mx-auto mb-6 p-4">
                <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Your Achievements ({earnedAchievements.length}/{ACHIEVEMENTS.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ACHIEVEMENTS.map((achievement) => {
                    const earned = earnedAchievements.includes(achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
                          earned 
                            ? "bg-primary/10 text-primary" 
                            : "bg-muted text-muted-foreground opacity-50"
                        }`}
                        title={achievement.description}
                      >
                        {achievement.icon}
                        <span className={earned ? "font-medium" : ""}>{achievement.name}</span>
                        {earned && <span>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Sandbox Mode Card */}
            <Card 
              className="max-w-md mx-auto mb-8 p-6 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              onClick={startSandbox}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Sandbox Mode</h3>
                  <p className="text-sm text-muted-foreground">Build anything you want - no rules!</p>
                </div>
              </div>
            </Card>

            {/* Challenges */}
            <h2 className="font-display font-bold text-2xl text-center mb-6 flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Challenges
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {challenges.map((challenge) => {
                const isCompleted = completedChallenges.includes(challenge.id);
                const difficultyColors = {
                  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                };
                const difficultyStars = {
                  easy: 1,
                  medium: 2,
                  hard: 3,
                };

                return (
                  <Card
                    key={challenge.id}
                    className={`p-4 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all ${
                      isCompleted ? "ring-2 ring-green-500/50" : ""
                    }`}
                    onClick={() => startChallenge(challenge)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                        {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(difficultyStars[challenge.difficulty])].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                      {challenge.name}
                      {isCompleted && <span className="text-green-500">✓</span>}
                    </h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Progress */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Completed: {completedChallenges.length} / {challenges.length} challenges
              </p>
              <div className="w-64 h-3 bg-muted rounded-full mx-auto mt-2 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(completedChallenges.length / challenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Game View (Sandbox or Challenge)
  return (
    <>
      <Navbar />
      <LearningPopup />
      <AchievementPopup />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-6">
            <Button variant="ghost" onClick={backToMenu} className="mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Menu
            </Button>
            
            {currentChallenge ? (
              <>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Trophy className="w-4 h-4" />
                  Challenge {currentChallenge.id}
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {currentChallenge.name}
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto mb-2">
                  {currentChallenge.description}
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setShowHint(!showHint)}
                  className="text-primary"
                >
                  {showHint ? "Hide Hint" : "💡 Need a hint?"}
                </Button>
                {showHint && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-lg inline-block mt-2">
                    {currentChallenge.hint}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Sparkles className="w-4 h-4" />
                  Sandbox Mode
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Free Build
                </h1>
                <p className="text-muted-foreground">Build any drainage system you can imagine!</p>
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-6 max-w-5xl mx-auto">
            {/* Component Palette & Hydrology Controls */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Rainfall Intensity Control */}
              <Card className="p-4">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-primary" />
                  Storm Intensity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rainfall Level:</span>
                    <span className="font-bold text-primary">
                      {rainfallIntensity === 1 ? "🌧️ Light" : 
                       rainfallIntensity === 2 ? "🌧️🌧️ Moderate" :
                       rainfallIntensity === 3 ? "⛈️ Heavy" :
                       rainfallIntensity === 4 ? "⛈️⛈️ Very Heavy" :
                       "🌊 Extreme Storm!"}
                    </span>
                  </div>
                  <Slider
                    value={[rainfallIntensity]}
                    onValueChange={(value) => setRainfallIntensity(value[0])}
                    min={1}
                    max={5}
                    step={1}
                    disabled={isSimulating}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    {rainfallIntensity} drop{rainfallIntensity > 1 ? "s" : ""} per cloud • 
                    {rainfallIntensity <= 2 ? " Easy to handle" : 
                     rainfallIntensity <= 3 ? " Needs good drainage" :
                     " Risk of overflow!"}
                  </p>
                </div>
              </Card>

              {/* Flow Rate Display */}
              {(isSimulating || score !== null) && (
                <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
                  <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-primary" />
                    Hydrology Dashboard
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{flowRate}</div>
                      <div className="text-xs text-muted-foreground">drops/sec</div>
                      <div className="text-xs font-medium mt-1">Flow Rate</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{totalReached}</div>
                      <div className="text-xs text-muted-foreground">total</div>
                      <div className="text-xs font-medium mt-1">Collected</div>
                    </div>
                  </div>
                  {overflowCells.length > 0 && (
                    <div className="mt-3 p-2 bg-destructive/10 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-xs text-destructive font-medium">
                        {overflowCells.length} overflow{overflowCells.length > 1 ? "s" : ""} detected!
                      </span>
                    </div>
                  )}
                </Card>
              )}

              {/* Component Palette */}
              <Card className="p-4">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  🧱 Available Components
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableComponents.map((comp) => {
                    const capacity = PIPE_CAPACITY[comp.type];
                    return (
                      <button
                        key={comp.type}
                        onClick={() => setSelectedComponent(comp.type)}
                        disabled={isSimulating}
                        className={`
                          p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 min-w-[80px]
                          ${selectedComponent === comp.type 
                            ? "border-primary bg-primary/10 ring-2 ring-primary/30" 
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                          }
                          ${isSimulating ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        <div className="text-primary">{comp.icon}</div>
                        <span className="text-xs font-medium text-foreground">{comp.label}</span>
                        {capacity > 0 && capacity < 999 && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5" /> {capacity} max
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 Right-click to remove • Pipes show capacity limits!
                </p>
              </Card>
            </div>

            {/* Grid */}
            <div className="order-1 lg:order-2">
              <Card className="p-4 inline-block">
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                  {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
                  )}
                </div>
              </Card>

              {/* Controls */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <Button
                  onClick={simulateWater}
                  disabled={isSimulating}
                  className="gap-2"
                >
                  <Play className="w-4 h-4" />
                  Test Water Flow
                </Button>
                <Button
                  variant="outline"
                  onClick={resetGrid}
                  disabled={isSimulating}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              {/* Score Display */}
              {score !== null && (
                <div className={`mt-4 p-4 rounded-xl text-center ${
                  score === 100 ? "bg-green-100 dark:bg-green-900/30" : 
                  score > 0 ? "bg-yellow-100 dark:bg-yellow-900/30" : 
                  "bg-red-100 dark:bg-red-900/30"
                }`}>
                  <p className="font-display font-bold text-2xl">
                    {score === 100 ? "🎉 Perfect!" : score > 0 ? "👍 Good Try!" : "🤔 Keep Trying!"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {score}% of water reached the reservoir
                  </p>
                  {score === 100 && currentChallenge && currentChallenge.id < challenges.length && (
                    <Button
                      className="mt-3"
                      onClick={() => startChallenge(challenges[currentChallenge.id])}
                    >
                      Next Challenge →
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BuildDrain;
