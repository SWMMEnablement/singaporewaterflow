import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Droplets, 
  Trash2, 
  Play, 
  RotateCcw, 
  CloudRain,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Circle,
  Square,
  Waves
} from "lucide-react";
import { toast } from "sonner";

type CellType = "empty" | "pipe-vertical" | "pipe-horizontal" | "pipe-corner-br" | "pipe-corner-bl" | "pipe-corner-tr" | "pipe-corner-tl" | "drain-grate" | "reservoir" | "rain-cloud";

interface Cell {
  type: CellType;
}

interface WaterDrop {
  id: number;
  row: number;
  col: number;
  direction: "down" | "left" | "right";
}

const GRID_SIZE = 6;

const components: { type: CellType; label: string; icon: React.ReactNode; description: string }[] = [
  { type: "rain-cloud", label: "Rain Cloud", icon: <CloudRain className="w-6 h-6" />, description: "Where rain starts!" },
  { type: "drain-grate", label: "Drain Grate", icon: <Square className="w-6 h-6" />, description: "Catches rainwater" },
  { type: "pipe-vertical", label: "Vertical Pipe", icon: <ArrowDown className="w-6 h-6" />, description: "Water flows down" },
  { type: "pipe-horizontal", label: "Horizontal Pipe", icon: <ArrowRight className="w-6 h-6" />, description: "Water flows sideways" },
  { type: "pipe-corner-br", label: "Corner ↓→", icon: <div className="w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />, description: "Turns water right" },
  { type: "pipe-corner-bl", label: "Corner ↓←", icon: <div className="w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />, description: "Turns water left" },
  { type: "reservoir", label: "Reservoir", icon: <Waves className="w-6 h-6" />, description: "Stores water safely!" },
];

const BuildDrain = () => {
  const [grid, setGrid] = useState<Cell[][]>(() => 
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ type: "empty" as CellType }))
    )
  );
  const [selectedComponent, setSelectedComponent] = useState<CellType | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (isSimulating) return;
    
    if (selectedComponent) {
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].type = selectedComponent;
        return newGrid;
      });
      toast.success(`Placed ${components.find(c => c.type === selectedComponent)?.label}!`);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (isSimulating) return;
    
    setGrid(prev => {
      const newGrid = prev.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].type = "empty";
      return newGrid;
    });
  };

  const resetGrid = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ type: "empty" as CellType }))
    ));
    setWaterDrops([]);
    setIsSimulating(false);
    setScore(null);
    toast.info("Grid cleared! Start fresh!");
  };

  const simulateWater = useCallback(() => {
    // Find rain clouds
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

    // Create initial water drops
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

        // Move based on current direction
        if (drop.direction === "down") nextRow++;
        else if (drop.direction === "left") nextCol--;
        else if (drop.direction === "right") nextCol++;

        // Check bounds
        if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) {
          return; // Water flows out of bounds
        }

        const nextCell = grid[nextRow][nextCol];

        // Check what's in the next cell
        if (nextCell.type === "reservoir") {
          reachedReservoir++;
          return; // Water reached reservoir!
        }

        if (nextCell.type === "empty" || nextCell.type === "rain-cloud") {
          return; // Water can't flow through empty cells
        }

        // Handle different pipe types
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
        // Simulation complete
        setIsSimulating(false);
        const totalClouds = rainClouds.length;
        const percentage = Math.round((reachedReservoir / totalClouds) * 100);
        setScore(percentage);
        
        if (percentage === 100) {
          toast.success("🎉 Perfect! All water reached the reservoir!");
        } else if (percentage > 0) {
          toast.info(`${reachedReservoir}/${totalClouds} water drops reached the reservoir!`);
        } else {
          toast.error("No water reached the reservoir. Try adding more pipes!");
        }
      }
    };

    setTimeout(moveWater, 500);
  }, [grid]);

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
          ${selectedComponent && cell.type === "empty" ? "ring-2 ring-primary/30" : ""}
        `}
      >
        {cellContent()}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Droplets className="w-4 h-4" />
              Interactive Activity
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Build Your Own Drain! 🏗️
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Design a drainage system to carry rainwater safely to the reservoir.
              Click components below, then click on the grid to place them!
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-6 max-w-5xl mx-auto">
            {/* Component Palette */}
            <Card className="p-4 order-2 lg:order-1">
              <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                🧱 Drain Components
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {components.map((comp) => (
                  <button
                    key={comp.type}
                    onClick={() => setSelectedComponent(comp.type)}
                    disabled={isSimulating}
                    className={`
                      p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1
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
                💡 Tip: Right-click a cell to remove a component!
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
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <Card className="max-w-3xl mx-auto mt-8 p-6">
            <h3 className="font-display font-semibold text-lg mb-4">📋 How to Play</h3>
            <ol className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <span>Place a <strong>Rain Cloud</strong> at the top of your grid - that's where water starts!</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <span>Add a <strong>Drain Grate</strong> below the cloud to catch the rainwater.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <span>Use <strong>Pipes</strong> and <strong>Corners</strong> to guide water through your system.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                <span>Place a <strong>Reservoir</strong> at the end to collect the water safely!</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
                <span>Click <strong>Test Water Flow</strong> to see if your drainage system works!</span>
              </li>
            </ol>
          </Card>
        </div>
      </main>
    </>
  );
};

export default BuildDrain;
