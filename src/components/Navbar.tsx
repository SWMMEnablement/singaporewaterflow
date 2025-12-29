import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Droplets, Menu, X, BookOpen, Palette, Hammer } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isPage?: boolean;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "St. Venant", href: "/#who-was-st-venant" },
  { label: "The Equations", href: "/#equations" },
  { label: "Water Cycle", href: "/#water-cycle" },
  { label: "Singapore", href: "/#singapore" },
  { label: "Quiz", href: "/#quiz" },
  { label: "Glossary", href: "/glossary", isPage: true, icon: <BookOpen className="w-4 h-4" /> },
  { label: "Coloring", href: "/coloring", isPage: true, icon: <Palette className="w-4 h-4" /> },
  { label: "Build Drain", href: "/build-drain", isPage: true, icon: <Hammer className="w-4 h-4" /> },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    
    if (item.isPage) {
      navigate(item.href);
      return;
    }

    if (item.href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    // Handle hash navigation
    const hash = item.href.replace("/#", "#");
    if (location.pathname !== "/") {
      navigate("/" + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (item: NavItem) => {
    if (item.isPage) {
      return location.pathname === item.href;
    }
    return false;
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
          <button
            onClick={() => handleNavClick({ label: "Home", href: "/" })}
            className="flex items-center gap-2 group"
          >
            <Droplets className="w-7 h-7 text-primary group-hover:animate-bounce-slow" />
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              St. Venant Water Flow
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive(item)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-primary/10 transition-colors"
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
          <div className="lg:hidden py-4 border-t border-border bg-card/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-3 rounded-2xl text-base font-medium transition-all text-left flex items-center gap-2 ${
                    isActive(item)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
