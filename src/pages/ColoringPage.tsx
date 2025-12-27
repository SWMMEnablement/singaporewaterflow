import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Printer, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const ColoringPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-background print:pt-0 print:bg-white">
        {/* Hero Section - Hide on print */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/10 to-background print:hidden">
          <div className="container mx-auto px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="bg-secondary/30 rounded-2xl p-4">
                <Palette className="w-10 h-10 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Coloring Page
                </h1>
                <p className="text-muted-foreground mt-1">
                  Print and color your own water science adventure! 🎨
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Click the print button below to print this coloring page. 
              Use your favorite crayons, markers, or colored pencils to bring 
              St. Venant and the water cycle to life! 🖍️✨
            </p>

            <Button
              onClick={handlePrint}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-6 text-lg rounded-full"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print Coloring Page
            </Button>
          </div>
        </section>

        {/* Coloring Page Content */}
        <section className="py-8 print:py-0">
          <div className="container mx-auto px-6 print:px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-card print:shadow-none print:rounded-none print:p-0">
              {/* Page Title */}
              <div className="text-center mb-8 print:mb-4">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground print:text-black mb-2">
                  St. Venant Water Flow for Grandkids
                </h2>
                <p className="text-lg text-muted-foreground print:text-gray-600">
                  Color Me In! 🎨
                </p>
              </div>

              {/* Coloring Illustration */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-auto border-2 border-dashed border-border print:border-gray-300 rounded-2xl print:rounded-none"
                style={{ background: "white" }}
              >
                {/* Sky Background Lines */}
                <rect x="0" y="0" width="800" height="200" fill="none" stroke="#ddd" strokeWidth="0.5" />

                {/* Sun */}
                <circle cx="700" cy="80" r="50" fill="none" stroke="#333" strokeWidth="2" />
                <line x1="700" y1="20" x2="700" y2="5" stroke="#333" strokeWidth="2" />
                <line x1="700" y1="140" x2="700" y2="155" stroke="#333" strokeWidth="2" />
                <line x1="640" y1="80" x2="625" y2="80" stroke="#333" strokeWidth="2" />
                <line x1="760" y1="80" x2="775" y2="80" stroke="#333" strokeWidth="2" />
                <line x1="655" y1="35" x2="645" y2="25" stroke="#333" strokeWidth="2" />
                <line x1="745" y1="35" x2="755" y2="25" stroke="#333" strokeWidth="2" />
                <line x1="655" y1="125" x2="645" y2="135" stroke="#333" strokeWidth="2" />
                <line x1="745" y1="125" x2="755" y2="135" stroke="#333" strokeWidth="2" />

                {/* Clouds */}
                <g transform="translate(100, 60)">
                  <ellipse cx="0" cy="30" rx="40" ry="25" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="50" cy="20" rx="50" ry="35" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="100" cy="30" rx="40" ry="25" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="50" cy="0" rx="35" ry="25" fill="none" stroke="#333" strokeWidth="2" />
                </g>

                <g transform="translate(400, 40)">
                  <ellipse cx="0" cy="25" rx="35" ry="22" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="40" cy="18" rx="40" ry="28" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="80" cy="25" rx="35" ry="22" fill="none" stroke="#333" strokeWidth="2" />
                </g>

                {/* Rain drops */}
                <g stroke="#333" strokeWidth="1.5" fill="none">
                  <path d="M120,120 Q125,135 120,150" />
                  <path d="M150,130 Q155,145 150,160" />
                  <path d="M180,115 Q185,130 180,145" />
                  <path d="M430,100 Q435,115 430,130" />
                  <path d="M460,110 Q465,125 460,140" />
                  <path d="M490,95 Q495,110 490,125" />
                </g>

                {/* St. Venant Character */}
                <g transform="translate(80, 220)">
                  {/* Body */}
                  <rect x="20" y="80" width="60" height="100" rx="5" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Head */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Hair/Hat */}
                  <path d="M20,40 Q50,10 80,40" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Eyes */}
                  <circle cx="38" cy="45" r="5" fill="none" stroke="#333" strokeWidth="2" />
                  <circle cx="62" cy="45" r="5" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Smile */}
                  <path d="M35,65 Q50,80 65,65" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Mustache */}
                  <path d="M35,58 Q50,65 65,58" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Arms */}
                  <line x1="20" y1="100" x2="-10" y2="130" stroke="#333" strokeWidth="2" />
                  <line x1="80" y1="100" x2="110" y2="130" stroke="#333" strokeWidth="2" />
                  {/* Legs */}
                  <line x1="35" y1="180" x2="35" y2="220" stroke="#333" strokeWidth="2" />
                  <line x1="65" y1="180" x2="65" y2="220" stroke="#333" strokeWidth="2" />
                  {/* Shoes */}
                  <ellipse cx="35" cy="225" rx="15" ry="8" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="65" cy="225" rx="15" ry="8" fill="none" stroke="#333" strokeWidth="2" />
                  {/* Holding equation sign */}
                  <rect x="95" y="110" width="80" height="50" rx="5" fill="none" stroke="#333" strokeWidth="2" />
                  <text x="115" y="142" fontFamily="serif" fontSize="18" fill="#333">Q = A·v</text>
                </g>

                {/* Label for St. Venant */}
                <text x="130" y="480" fontFamily="Comic Sans MS, cursive" fontSize="16" fill="#333" textAnchor="middle">
                  St. Venant
                </text>

                {/* Singapore Buildings */}
                <g transform="translate(300, 180)">
                  {/* Marina Bay Sands style */}
                  <rect x="80" y="100" width="20" height="120" fill="none" stroke="#333" strokeWidth="2" />
                  <rect x="110" y="100" width="20" height="120" fill="none" stroke="#333" strokeWidth="2" />
                  <rect x="140" y="100" width="20" height="120" fill="none" stroke="#333" strokeWidth="2" />
                  <path d="M75,95 L165,95 L165,100 L75,100 Z" fill="none" stroke="#333" strokeWidth="2" />
                  <ellipse cx="120" cy="85" rx="50" ry="12" fill="none" stroke="#333" strokeWidth="2" />
                  
                  {/* Other buildings */}
                  <rect x="0" y="150" width="40" height="70" fill="none" stroke="#333" strokeWidth="2" />
                  <rect x="0" y="150" width="40" height="10" fill="none" stroke="#333" strokeWidth="1" />
                  <rect x="180" y="130" width="35" height="90" fill="none" stroke="#333" strokeWidth="2" />
                  <rect x="225" y="160" width="30" height="60" fill="none" stroke="#333" strokeWidth="2" />
                  
                  {/* Windows */}
                  <rect x="8" y="165" width="8" height="10" fill="none" stroke="#333" strokeWidth="1" />
                  <rect x="24" y="165" width="8" height="10" fill="none" stroke="#333" strokeWidth="1" />
                  <rect x="8" y="185" width="8" height="10" fill="none" stroke="#333" strokeWidth="1" />
                  <rect x="24" y="185" width="8" height="10" fill="none" stroke="#333" strokeWidth="1" />
                </g>

                {/* Trees */}
                <g transform="translate(580, 300)">
                  <rect x="15" y="60" width="10" height="40" fill="none" stroke="#333" strokeWidth="2" />
                  <circle cx="20" cy="40" r="30" fill="none" stroke="#333" strokeWidth="2" />
                </g>
                <g transform="translate(650, 320)">
                  <rect x="10" y="40" width="8" height="30" fill="none" stroke="#333" strokeWidth="2" />
                  <circle cx="14" cy="25" r="22" fill="none" stroke="#333" strokeWidth="2" />
                </g>

                {/* Ground */}
                <line x1="0" y1="400" x2="800" y2="400" stroke="#333" strokeWidth="2" />

                {/* Drainage System */}
                <g transform="translate(250, 400)">
                  {/* Drain grate */}
                  <rect x="0" y="0" width="60" height="15" fill="none" stroke="#333" strokeWidth="2" />
                  <line x1="10" y1="0" x2="10" y2="15" stroke="#333" strokeWidth="1.5" />
                  <line x1="20" y1="0" x2="20" y2="15" stroke="#333" strokeWidth="1.5" />
                  <line x1="30" y1="0" x2="30" y2="15" stroke="#333" strokeWidth="1.5" />
                  <line x1="40" y1="0" x2="40" y2="15" stroke="#333" strokeWidth="1.5" />
                  <line x1="50" y1="0" x2="50" y2="15" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Underground pipe */}
                  <path d="M30,15 L30,50 L-100,50 L-100,80" fill="none" stroke="#333" strokeWidth="2" />
                  <path d="M30,15 L30,50 L200,50 L200,80" fill="none" stroke="#333" strokeWidth="2" />
                </g>

                {/* Water in pipes */}
                <g transform="translate(250, 400)">
                  {/* Water drops in drain */}
                  <circle cx="30" cy="30" r="4" fill="none" stroke="#333" strokeWidth="1.5" />
                  <circle cx="20" cy="45" r="3" fill="none" stroke="#333" strokeWidth="1.5" />
                  <circle cx="40" cy="40" r="3" fill="none" stroke="#333" strokeWidth="1.5" />
                </g>

                {/* Reservoir/Sea */}
                <g transform="translate(500, 430)">
                  <path d="M0,50 Q50,40 100,50 Q150,60 200,50 Q250,40 300,50 L300,80 L0,80 Z" fill="none" stroke="#333" strokeWidth="2" />
                  <path d="M20,60 Q40,55 60,60" fill="none" stroke="#333" strokeWidth="1" />
                  <path d="M100,65 Q120,58 140,65" fill="none" stroke="#333" strokeWidth="1" />
                  <path d="M200,60 Q220,55 240,60" fill="none" stroke="#333" strokeWidth="1" />
                  {/* Fish */}
                  <ellipse cx="80" cy="70" rx="15" ry="8" fill="none" stroke="#333" strokeWidth="1.5" />
                  <path d="M95,70 L105,63 L105,77 Z" fill="none" stroke="#333" strokeWidth="1.5" />
                  <circle cx="70" cy="68" r="2" fill="#333" />
                </g>

                {/* Water Cycle Arrows */}
                <g fill="none" stroke="#333" strokeWidth="2">
                  {/* Evaporation arrow */}
                  <path d="M600,450 C620,400 650,350 680,300 C700,260 720,220 700,150" markerEnd="url(#arrowhead)" />
                  {/* Rain arrow */}
                  <path d="M200,100 L200,180" markerEnd="url(#arrowhead)" />
                </g>

                {/* Arrow marker */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
                  </marker>
                </defs>

                {/* Labels */}
                <text x="630" y="280" fontFamily="Comic Sans MS, cursive" fontSize="14" fill="#333" transform="rotate(-60, 630, 280)">
                  Evaporation ↑
                </text>
                <text x="220" y="175" fontFamily="Comic Sans MS, cursive" fontSize="14" fill="#333">
                  Rain ↓
                </text>
                <text x="280" y="395" fontFamily="Comic Sans MS, cursive" fontSize="12" fill="#333">
                  Drain
                </text>
                <text x="620" y="525" fontFamily="Comic Sans MS, cursive" fontSize="14" fill="#333">
                  Sea / Reservoir
                </text>
                <text x="420" y="260" fontFamily="Comic Sans MS, cursive" fontSize="12" fill="#333">
                  Singapore 🇸🇬
                </text>

                {/* Decorative border */}
                <rect x="5" y="5" width="790" height="590" fill="none" stroke="#333" strokeWidth="3" rx="10" />

                {/* Water drops border decoration */}
                <g fill="none" stroke="#333" strokeWidth="1">
                  <path d="M30,15 Q35,25 30,35 Q25,25 30,15" />
                  <path d="M770,15 Q775,25 770,35 Q765,25 770,15" />
                  <path d="M30,565 Q35,575 30,585 Q25,575 30,565" />
                  <path d="M770,565 Q775,575 770,585 Q765,575 770,565" />
                </g>
              </svg>

              {/* Color Guide */}
              <div className="mt-8 print:mt-4">
                <h3 className="font-display text-xl font-bold text-center mb-4 print:text-black">
                  Color Guide 🎨
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Sun = Yellow ☀️</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Clouds = White/Gray ☁️</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Rain = Blue 🌧️</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Buildings = Gray 🏙️</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Trees = Green 🌳</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Water = Blue 💧</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">St. Venant = Any! 👨‍🔬</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-gray-400 print:border-gray-600" />
                    <span className="text-sm">Fish = Orange 🐟</span>
                  </div>
                </div>
              </div>

              {/* Name field */}
              <div className="mt-8 print:mt-4 text-center">
                <p className="text-lg font-display">
                  Colored by: ________________________________
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="print:hidden">
          <Footer />
        </div>
      </main>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          nav, footer, .print\\:hidden {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
          }
          @page {
            size: A4 landscape;
            margin: 1cm;
          }
        }
      `}</style>
    </>
  );
};

export default ColoringPage;
