import { GraduationCap, Baby } from "lucide-react";
import { useGrownUpMode } from "@/contexts/GrownUpModeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GrownUpToggle = () => {
  const { isGrownUpMode, toggleGrownUpMode } = useGrownUpMode();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 shadow-sm">
          <Baby className={`w-4 h-4 transition-colors ${!isGrownUpMode ? "text-primary" : "text-muted-foreground"}`} />
          <Switch
            id="grown-up-mode"
            checked={isGrownUpMode}
            onCheckedChange={toggleGrownUpMode}
            className="data-[state=checked]:bg-accent"
          />
          <GraduationCap className={`w-4 h-4 transition-colors ${isGrownUpMode ? "text-accent" : "text-muted-foreground"}`} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p className="font-semibold mb-1">
          {isGrownUpMode ? "📚 Technical Mode" : "🧒 Kid-Friendly Mode"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isGrownUpMode 
            ? "Showing real equations and engineering details for adults, teachers, and curious minds."
            : "Toggle this to see the real math and how engineers use these concepts!"
          }
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
