import { Lightbulb } from "lucide-react";

interface FunFactProps {
  children: React.ReactNode;
}

export const FunFact = ({ children }: FunFactProps) => {
  return (
    <div className="bg-secondary/30 border-2 border-secondary rounded-3xl p-5 md:p-6 flex gap-4 items-start">
      <div className="bg-secondary rounded-full p-3 flex-shrink-0 animate-bounce-slow">
        <Lightbulb className="w-6 h-6 text-secondary-foreground" />
      </div>
      <div>
        <p className="font-display font-semibold text-secondary-foreground mb-1">
          Fun Fact! 💡
        </p>
        <p className="text-foreground/80 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};
