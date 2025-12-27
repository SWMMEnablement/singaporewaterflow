import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, ArrowLeft, Search } from "lucide-react";
import { useState } from "react";

interface GlossaryTerm {
  term: string;
  definition: string;
  emoji: string;
  category: "water" | "math" | "engineering" | "geography";
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Stormwater",
    definition: "Rain water that flows over streets, rooftops, and the ground. It can't soak into concrete, so it runs into drains!",
    emoji: "🌧️",
    category: "water",
  },
  {
    term: "Drainage",
    definition: "A system of pipes, channels, and drains that carry water away from streets and buildings to keep them from flooding.",
    emoji: "🕳️",
    category: "engineering",
  },
  {
    term: "St. Venant Equations",
    definition: "Special math rules discovered by a French scientist that tell us exactly how water moves through rivers and pipes.",
    emoji: "📐",
    category: "math",
  },
  {
    term: "Continuity Equation",
    definition: "A math rule that says 'what goes in must come out' - water can't just disappear! If water enters a pipe, the same amount must leave somewhere.",
    emoji: "➡️",
    category: "math",
  },
  {
    term: "Momentum Equation",
    definition: "A math rule about how water speeds up and slows down. Gravity pulls water downhill, but rough surfaces slow it down.",
    emoji: "🏃",
    category: "math",
  },
  {
    term: "SWMM5",
    definition: "Storm Water Management Model, Version 5 - a computer program that uses St. Venant's equations to help engineers plan perfect drains.",
    emoji: "💻",
    category: "engineering",
  },
  {
    term: "Water Cycle",
    definition: "The never-ending journey of water: it evaporates from the ocean, forms clouds, falls as rain, flows to rivers and drains, and goes back to the ocean!",
    emoji: "🔄",
    category: "water",
  },
  {
    term: "Evaporation",
    definition: "When water turns into an invisible gas (water vapor) and floats up into the sky. The sun's heat makes this happen!",
    emoji: "☀️",
    category: "water",
  },
  {
    term: "Monsoon",
    definition: "A season with very heavy rain. Singapore gets monsoons because it's near the equator where it's warm and wet!",
    emoji: "⛈️",
    category: "geography",
  },
  {
    term: "Reservoir",
    definition: "A big lake made by people to store water. Singapore collects rainwater in reservoirs so people have water to drink!",
    emoji: "💧",
    category: "engineering",
  },
  {
    term: "Canal",
    definition: "A man-made river or channel built to carry water from one place to another.",
    emoji: "🚣",
    category: "engineering",
  },
  {
    term: "Flow Rate (Q)",
    definition: "How much water is moving through a pipe or channel. Scientists use the letter 'Q' to represent this in equations.",
    emoji: "🌊",
    category: "math",
  },
  {
    term: "Channel Area (A)",
    definition: "How big the inside of a pipe or drain is. A bigger area means more water can flow through!",
    emoji: "⭕",
    category: "math",
  },
  {
    term: "Water Depth (h)",
    definition: "How deep the water is in a channel or drain. Scientists use the letter 'h' for this.",
    emoji: "📏",
    category: "math",
  },
  {
    term: "Gravity (g)",
    definition: "The invisible force that pulls everything down toward the ground. It's what makes water flow downhill!",
    emoji: "⬇️",
    category: "math",
  },
  {
    term: "Equator",
    definition: "An imaginary line around the middle of Earth. Places near the equator (like Singapore) are warm and get lots of rain!",
    emoji: "🌍",
    category: "geography",
  },
  {
    term: "Flood",
    definition: "When there's too much water and it overflows from rivers, drains, or the ocean onto land where people live.",
    emoji: "🌊",
    category: "water",
  },
  {
    term: "Engineer",
    definition: "A person who uses math and science to design and build things like bridges, buildings, and drainage systems!",
    emoji: "👷",
    category: "engineering",
  },
  {
    term: "Hydraulics",
    definition: "The science of how water (and other liquids) move and behave. St. Venant was a hydraulics expert!",
    emoji: "🔬",
    category: "engineering",
  },
  {
    term: "Partial Differential Equation",
    definition: "A fancy type of math that tracks how things change in different directions at the same time - like water getting deeper AND flowing sideways!",
    emoji: "🧮",
    category: "math",
  },
  {
    term: "Runoff",
    definition: "Water that runs off surfaces like roads and roofs instead of soaking into the ground. Cities have lots of runoff!",
    emoji: "🏃‍♂️",
    category: "water",
  },
  {
    term: "Tropical Climate",
    definition: "Weather that's warm and rainy all year round. Singapore has a tropical climate because it's near the equator.",
    emoji: "🌴",
    category: "geography",
  },
];

const categoryColors = {
  water: "bg-rain/20 text-primary border-rain/30",
  math: "bg-secondary/30 text-secondary-foreground border-secondary/40",
  engineering: "bg-accent/20 text-accent-foreground border-accent/30",
  geography: "bg-grass/20 text-foreground border-grass/30",
};

const categoryLabels = {
  water: "💧 Water",
  math: "🧮 Math",
  engineering: "🔧 Engineering",
  geography: "🌍 Geography",
};

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = glossaryTerms
    .filter((term) => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 rounded-2xl p-4">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Water Science Glossary
                </h1>
                <p className="text-muted-foreground mt-1">
                  {glossaryTerms.length} words to learn! 📚
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Don&apos;t know a word? Look it up here! All the tricky water science 
              words explained in a way that&apos;s easy to understand. 🌊✨
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-40">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for a word..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  All
                </button>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Glossary Terms */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="text-xl text-muted-foreground">
                  No words found. Try a different search!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.map((item) => (
                  <div
                    key={item.term}
                    className="fun-card hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{item.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {item.term}
                          </h3>
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border mb-3 ${
                            categoryColors[item.category]
                          }`}
                        >
                          {categoryLabels[item.category]}
                        </span>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.definition}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Glossary;
