import { ReactNode } from "react";
import { useGrownUpMode } from "@/contexts/GrownUpModeContext";
import { BookOpen } from "lucide-react";

interface TechnicalAnnotationProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const TechnicalAnnotation = ({ children, title = "Technical Details", className = "" }: TechnicalAnnotationProps) => {
  const { isGrownUpMode } = useGrownUpMode();

  if (!isGrownUpMode) return null;

  return (
    <div className={`mt-4 p-4 bg-accent/10 border border-accent/30 rounded-xl ${className}`}>
      <div className="flex items-center gap-2 mb-2 text-accent">
        <BookOpen className="w-4 h-4" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        {children}
      </div>
    </div>
  );
};
