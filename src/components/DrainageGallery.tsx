import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Camera, Droplets, ArrowRight } from "lucide-react";

import drainageConcrete from "@/assets/drainage-concrete.jpg";
import drainageGrass from "@/assets/drainage-grass.jpg";
import drainageRocky from "@/assets/drainage-rocky.jpg";
import drainageCulvert from "@/assets/drainage-culvert.jpg";
import drainageBrick from "@/assets/drainage-brick.jpg";
import drainageForest from "@/assets/drainage-forest.jpg";

interface DrainageExample {
  id: string;
  name: string;
  image: string;
  manningN: number;
  nRange: string;
  description: string;
  kidFriendly: string;
  whereFound: string;
  flowSpeed: "fast" | "medium" | "slow";
}

const DRAINAGE_EXAMPLES: DrainageExample[] = [
  {
    id: "concrete",
    name: "Smooth Concrete Channel",
    image: drainageConcrete,
    manningN: 0.013,
    nRange: "0.011 - 0.015",
    description: "Finished concrete with smooth surfaces. Used in urban storm drains and flood control channels where fast water movement is needed.",
    kidFriendly: "Like a super smooth water slide! Water zooms through really fast because there's nothing bumpy to slow it down.",
    whereFound: "City storm drains, parking lot channels, highway drainage",
    flowSpeed: "fast"
  },
  {
    id: "brick",
    name: "Brick-Lined Channel",
    image: drainageBrick,
    manningN: 0.015,
    nRange: "0.012 - 0.018",
    description: "Historic masonry channels with mortared brick. Common in older cities. Slightly rougher than smooth concrete due to brick texture and joints.",
    kidFriendly: "Old-fashioned brick channels like in historic cities. The bumpy bricks slow water down a tiny bit, like a water slide with little ridges.",
    whereFound: "Historic city centers, old sewer systems, heritage sites",
    flowSpeed: "fast"
  },
  {
    id: "culvert",
    name: "Corrugated Metal Pipe",
    image: drainageCulvert,
    manningN: 0.024,
    nRange: "0.021 - 0.030",
    description: "Galvanized steel or aluminum pipes with corrugated walls. The ridges increase roughness significantly compared to smooth pipes.",
    kidFriendly: "These pipes have wavy ridges inside, like a bumpy tunnel. Water bounces along the ridges and slows down!",
    whereFound: "Road crossings, driveway culverts, farm drainage",
    flowSpeed: "medium"
  },
  {
    id: "grass",
    name: "Grass-Lined Swale",
    image: drainageGrass,
    manningN: 0.035,
    nRange: "0.025 - 0.050",
    description: "Vegetated drainage channels designed to slow water, filter pollutants, and promote infiltration. A key element of sustainable urban drainage.",
    kidFriendly: "A grassy ditch that's actually on purpose! The grass acts like millions of tiny speed bumps, slowing water and cleaning it too.",
    whereFound: "Parks, residential areas, green infrastructure projects",
    flowSpeed: "slow"
  },
  {
    id: "rocky",
    name: "Natural Rocky Stream",
    image: drainageRocky,
    manningN: 0.05,
    nRange: "0.035 - 0.070",
    description: "Natural stream beds with cobbles and boulders. The irregular surface creates turbulence and significantly slows flow compared to engineered channels.",
    kidFriendly: "A wild stream with rocks everywhere! Water has to twist and turn around all the stones, so it takes longer to get anywhere.",
    whereFound: "Mountain streams, natural creek beds, river headwaters",
    flowSpeed: "slow"
  },
  {
    id: "forest",
    name: "Forest Stream",
    image: drainageForest,
    manningN: 0.1,
    nRange: "0.080 - 0.150",
    description: "Heavily vegetated channels with fallen trees, branches, and dense undergrowth. The highest roughness category, providing maximum flow resistance.",
    kidFriendly: "Water in the woods has to push past fallen leaves, branches, and tree roots. It's like an obstacle course that makes water crawl slowly!",
    whereFound: "Woodlands, wetlands, natural floodplains",
    flowSpeed: "slow"
  }
];

interface DrainageGalleryProps {
  className?: string;
}

export const DrainageGallery = ({ className = "" }: DrainageGalleryProps) => {
  const [selectedExample, setSelectedExample] = useState<DrainageExample | null>(null);

  const getSpeedBadge = (speed: DrainageExample["flowSpeed"]) => {
    switch (speed) {
      case "fast":
        return { label: "Fast Flow 🚀", className: "bg-red-500/20 text-red-700 dark:text-red-400" };
      case "medium":
        return { label: "Medium Flow 💨", className: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" };
      case "slow":
        return { label: "Slow Flow 🐢", className: "bg-green-500/20 text-green-700 dark:text-green-400" };
    }
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-green-500/10">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Camera className="w-6 h-6 text-amber-600" />
            Real-World Drainage Gallery
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Tap any photo to learn about different drainage surfaces and their Manning's n values!
          </p>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DRAINAGE_EXAMPLES.map((example) => {
              const speedBadge = getSpeedBadge(example.flowSpeed);
              return (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example)}
                  className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img
                    src={example.image}
                    alt={example.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                    <div className="text-white text-sm font-medium leading-tight">
                      {example.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-primary/80 text-primary-foreground px-1.5 py-0.5 rounded">
                        n = {example.manningN}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${speedBadge.className}`}>
                        {example.flowSpeed === "fast" ? "🚀" : example.flowSpeed === "medium" ? "💨" : "🐢"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-1">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Roughness Scale */}
          <div className="mt-6 bg-secondary/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-primary" />
              Manning's n Roughness Scale
            </h4>
            <div className="relative h-6 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-full overflow-hidden">
              {DRAINAGE_EXAMPLES.map((example) => (
                <div
                  key={example.id}
                  className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-md cursor-pointer hover:w-2 transition-all"
                  style={{ left: `${(example.manningN / 0.12) * 100}%` }}
                  title={`${example.name}: n = ${example.manningN}`}
                  onClick={() => setSelectedExample(example)}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Smooth (Fast) n = 0.01</span>
              <span>Rough (Slow) n = 0.10+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedExample} onOpenChange={() => setSelectedExample(null)}>
        <DialogContent className="max-w-lg">
          {selectedExample && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedExample.name}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSpeedBadge(selectedExample.flowSpeed).className}`}>
                    {getSpeedBadge(selectedExample.flowSpeed).label}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Manning's roughness coefficient: n = {selectedExample.manningN}
                </DialogDescription>
              </DialogHeader>
              
              <img
                src={selectedExample.image}
                alt={selectedExample.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="space-y-4">
                {/* Kid-Friendly Explanation */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-1">🧒 For Kids:</h4>
                  <p className="text-sm text-muted-foreground">{selectedExample.kidFriendly}</p>
                </div>

                {/* Technical Details */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">📊 Technical Details:</h4>
                  <p className="text-sm text-muted-foreground">{selectedExample.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-secondary/50 rounded p-2">
                      <div className="text-muted-foreground text-xs">Manning's n Range</div>
                      <div className="font-mono font-medium">{selectedExample.nRange}</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2">
                      <div className="text-muted-foreground text-xs">Typical Value</div>
                      <div className="font-mono font-medium">{selectedExample.manningN}</div>
                    </div>
                  </div>
                </div>

                {/* Where Found */}
                <div>
                  <h4 className="font-medium text-sm mb-1">📍 Where You'll See This:</h4>
                  <p className="text-sm text-muted-foreground">{selectedExample.whereFound}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
