import { useState, useEffect } from "react";
import { Droplets, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "St. Venant", href: "#who-was-st-venant" },
  { label: "The Equations", href: "#equations" },
  { label: "Water Cycle", href: "#water-cycle" },
  { label: "SWMM5", href: "#swmm5" },
  { label: "Singapore", href: "#singapore" },
  { label: "Quiz", href: "#quiz" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={() => handleNavClick("#")}
            className="flex items-center gap-2 group"
          >
            <Droplets className="w-7 h-7 text-primary group-hover:animate-bounce-slow" />
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              St. Venant Water Flow
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-3 rounded-2xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
