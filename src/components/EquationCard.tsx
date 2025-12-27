interface EquationCardProps {
  title: string;
  equation: string;
  description: string;
  icon: React.ReactNode;
}

export const EquationCard = ({ title, equation, description, icon }: EquationCardProps) => {
  return (
    <div className="fun-card hover:scale-[1.02] transition-transform duration-300 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 rounded-2xl p-3 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="bg-muted/50 rounded-2xl p-4 mb-4 text-center">
        <code className="font-mono text-lg md:text-xl text-primary font-semibold">
          {equation}
        </code>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
