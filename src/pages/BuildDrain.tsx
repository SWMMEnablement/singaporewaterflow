import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

type CellType = "empty" | "pipe-vertical" | "pipe-horizontal" | "pipe-corner-br" | "pipe-corner-bl" | "pipe-corner-tr" | "pipe-corner-tl" | "drain-grate" | "reservoir" | "rain-cloud" | "locked";

interface Cell {
  type: CellType;
  locked?: boolean;
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

const GRID_SIZE = 6;

const createEmptyGrid = (): Cell[][] => 
  Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill(null).map(() => ({ type: "empty" as CellType }))
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

const allComponents: { type: CellType; label: string; icon: React.ReactNode; description: string }[] = [
  { type: "rain-cloud", label: "Rain Cloud", icon: <CloudRain className="w-6 h-6" />, description: "Where rain starts!" },
  { type: "drain-grate", label: "Drain Grate", icon: <Square className="w-6 h-6" />, description: "Catches rainwater" },
  { type: "pipe-vertical", label: "Vertical Pipe", icon: <ArrowDown className="w-6 h-6" />, description: "Water flows down" },
  { type: "pipe-horizontal", label: "Horizontal Pipe", icon: <ArrowRight className="w-6 h-6" />, description: "Water flows sideways" },
  { type: "pipe-corner-br", label: "Corner ↓→", icon: <div className="w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />, description: "Turns water right" },
  { type: "pipe-corner-bl", label: "Corner ↓←", icon: <div className="w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />, description: "Turns water left" },
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

  const availableComponents = currentChallenge 
    ? allComponents.filter(c => currentChallenge.availableComponents.includes(c.type))
    : allComponents;

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setGrid(challenge.initialGrid.map(row => row.map(cell => ({ ...cell }))));
    setMode("challenge");
    setScore(null);
    setWaterDrops([]);
    setShowHint(false);
    toast.info(`Challenge: ${challenge.name}`);
  };

  const startSandbox = () => {
    setCurrentChallenge(null);
    setGrid(createEmptyGrid());
    setMode("sandbox");
    setScore(null);
    setWaterDrops([]);
  };

  const backToMenu = () => {
    setMode("menu");
    setCurrentChallenge(null);
    setScore(null);
    setWaterDrops([]);
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
      setGrid(currentChallenge.initialGrid.map(row => row.map(cell => ({ ...cell }))));
    } else {
      setGrid(createEmptyGrid());
    }
    setWaterDrops([]);
    setIsSimulating(false);
    setScore(null);
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

    const initialDrops: WaterDrop[] = rainClouds.map((cloud, index) => ({
      id: index,
      row: cloud.row,
      col: cloud.col,
      direction: "down" as const,
    }));

    setWaterDrops(initialDrops);

    let currentDrops = [...initialDrops];
    let reachedReservoir = 0;
    let steps = 0;
    const maxSteps = 20;

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
          return;
        }

        if (nextCell.type === "empty" || nextCell.type === "rain-cloud" || nextCell.type === "locked") {
          return;
        }

        if (nextCell.type === "drain-grate" && drop.direction === "down") {
          nextDirection = "down";
        } else if (nextCell.type === "pipe-vertical") {
          nextDirection = "down";
        } else if (nextCell.type === "pipe-horizontal") {
          // Keep horizontal direction
        } else if (nextCell.type === "pipe-corner-br") {
          nextDirection = drop.direction === "down" ? "right" : "down";
        } else if (nextCell.type === "pipe-corner-bl") {
          nextDirection = drop.direction === "down" ? "left" : "down";
        } else if (nextCell.type === "pipe-corner-tr") {
          nextDirection = "right";
        } else if (nextCell.type === "pipe-corner-tl") {
          nextDirection = "left";
        }

        newDrops.push({
          ...drop,
          row: nextRow,
          col: nextCol,
          direction: nextDirection,
        });
      });

      currentDrops = newDrops;
      setWaterDrops([...newDrops]);

      if (newDrops.length > 0 && steps < maxSteps) {
        setTimeout(moveWater, 500);
      } else {
        setIsSimulating(false);
        const totalClouds = rainClouds.length;
        const percentage = Math.round((reachedReservoir / totalClouds) * 100);
        setScore(percentage);
        
        if (percentage === 100) {
          toast.success("🎉 Perfect! All water reached the reservoir!");
          if (currentChallenge && !completedChallenges.includes(currentChallenge.id)) {
            setCompletedChallenges(prev => [...prev, currentChallenge.id]);
          }
        } else if (percentage > 0) {
          toast.info(`${reachedReservoir}/${totalClouds} water drops reached the reservoir!`);
        } else {
          toast.error("No water reached the reservoir. Try again!");
        }
      }
    };

    setTimeout(moveWater, 500);
  }, [grid, currentChallenge, completedChallenges]);

  const renderCell = (cell: Cell, row: number, col: number) => {
    const hasWater = waterDrops.some(d => d.row === row && d.col === col);
    
    const cellContent = () => {
      switch (cell.type) {
        case "rain-cloud":
          return <CloudRain className={`w-8 h-8 ${hasWater ? "text-primary animate-bounce" : "text-muted-foreground"}`} />;
        case "drain-grate":
          return (
            <div className={`w-10 h-10 grid grid-cols-3 gap-0.5 ${hasWater ? "bg-primary/30" : "bg-muted"} rounded p-1`}>
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-foreground/30 rounded-sm" />
              ))}
            </div>
          );
        case "pipe-vertical":
          return (
            <div className={`w-4 h-full ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-full relative overflow-hidden`}>
              {hasWater && <div className="absolute inset-0 bg-primary animate-pulse" />}
            </div>
          );
        case "pipe-horizontal":
          return (
            <div className={`h-4 w-full ${hasWater ? "bg-primary" : "bg-muted-foreground/50"} rounded-full relative overflow-hidden`}>
              {hasWater && <div className="absolute inset-0 bg-primary animate-pulse" />}
            </div>
          );
        case "pipe-corner-br":
          return (
            <div className={`w-full h-full border-b-4 border-r-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-br-2xl`} />
          );
        case "pipe-corner-bl":
          return (
            <div className={`w-full h-full border-b-4 border-l-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-bl-2xl`} />
          );
        case "pipe-corner-tr":
          return (
            <div className={`w-full h-full border-t-4 border-r-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-tr-2xl`} />
          );
        case "pipe-corner-tl":
          return (
            <div className={`w-full h-full border-t-4 border-l-4 ${hasWater ? "border-primary" : "border-muted-foreground/50"} rounded-tl-2xl`} />
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
          flex items-center justify-center cursor-pointer transition-all
          ${cell.type === "empty" ? "hover:bg-primary/10 hover:border-primary/50" : "bg-card"}
          ${cell.locked ? "cursor-not-allowed" : ""}
          ${selectedComponent && cell.type === "empty" && !cell.locked ? "ring-2 ring-primary/30" : ""}
        `}
      >
        {cellContent()}
      </div>
    );
  };

  // Menu View
  if (mode === "menu") {
    return (
      <>
        <Navbar />
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
            {/* Component Palette */}
            <Card className="p-4 order-2 lg:order-1">
              <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                🧱 Available Components
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableComponents.map((comp) => (
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
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                💡 Right-click to remove a piece!
              </p>
            </Card>

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
