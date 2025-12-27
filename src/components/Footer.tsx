import { Droplets, Heart, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary/5 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="w-8 h-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">
              St. Venant Water Flow for Grandkids
            </span>
          </div>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Making water science fun for curious minds! Remember: even the biggest 
            floods can be managed with smart math! 💧🧮
          </p>
          
          {/* Author credit with LinkedIn */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />
              <span>for young scientists everywhere</span>
            </div>
            <a
              href="https://www.linkedin.com/in/robertdickinson/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-md"
            >
              <Linkedin className="w-4 h-4" />
              <span>Created by Robert Dickinson</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative waves */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
    </footer>
  );
};
