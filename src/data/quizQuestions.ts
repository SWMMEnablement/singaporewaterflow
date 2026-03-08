export type QuizCategory = "History" | "Equations" | "Roughness" | "Singapore" | "SWMM5";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
  category: QuizCategory;
  difficulty: Difficulty;
  wrongAnswerFeedback: Record<number, string>;
  technicalNote?: string;
}

export const CATEGORY_META: Record<QuizCategory, { emoji: string; color: string }> = {
  History: { emoji: "📜", color: "text-amber-600" },
  Equations: { emoji: "📐", color: "text-blue-600" },
  Roughness: { emoji: "🌿", color: "text-green-600" },
  Singapore: { emoji: "🇸🇬", color: "text-red-600" },
  SWMM5: { emoji: "💻", color: "text-purple-600" },
};

export const DIFFICULTY_META: Record<Difficulty, { label: string; emoji: string; stars: number }> = {
  easy: { label: "Easy", emoji: "⭐", stars: 1 },
  medium: { label: "Medium", emoji: "⭐⭐", stars: 2 },
  hard: { label: "Hard", emoji: "⭐⭐⭐", stars: 3 },
};

export const quizQuestions: Question[] = [
  // === HISTORY (3) ===
  {
    id: 1,
    question: "What country was St. Venant from?",
    options: ["England", "France", "Germany", "Singapore"],
    correctAnswer: 1,
    explanation: "St. Venant was a French engineer and mathematician who lived from 1797 to 1886!",
    emoji: "🇫🇷",
    category: "History",
    difficulty: "easy",
    wrongAnswerFeedback: {
      0: "Good guess! England has had many famous scientists, but St. Venant was from France. He helped engineers all over the world!",
      2: "Close! Germany also has many brilliant engineers, but St. Venant was French. His equations are used by German engineers too!",
      3: "Good thinking! Singapore uses his work a lot, but St. Venant was actually from France.",
    },
    technicalNote: "Adhémar Jean Claude Barré de Saint-Venant (1797-1886) derived the shallow water equations in 1871.",
  },
  {
    id: 2,
    question: "When did St. Venant publish his famous water flow equations?",
    options: ["1771", "1871", "1971", "2021"],
    correctAnswer: 1,
    explanation: "St. Venant published his shallow water equations in 1871 — over 150 years ago and still used today!",
    emoji: "📅",
    category: "History",
    difficulty: "medium",
    wrongAnswerFeedback: {
      0: "That's 100 years too early! St. Venant wasn't even born yet. He published his equations in 1871.",
      2: "That's actually when SWMM was created! St. Venant's equations came exactly 100 years earlier, in 1871.",
      3: "Way too recent! St. Venant's equations are over 150 years old — published in 1871. The amazing thing is they're STILL used today!",
    },
    technicalNote: "The Saint-Venant equations were published in 1871 in Comptes Rendus de l'Académie des Sciences.",
  },
  {
    id: 3,
    question: "Who developed the roughness coefficient 'n' used in Manning's equation?",
    options: ["St. Venant", "Robert Manning", "Isaac Newton", "Albert Einstein"],
    correctAnswer: 1,
    explanation: "Robert Manning, an Irish engineer, developed his formula in 1889 to describe how surface roughness affects water flow!",
    emoji: "🇮🇪",
    category: "History",
    difficulty: "hard",
    wrongAnswerFeedback: {
      0: "St. Venant created the overall flow equations, but the roughness coefficient 'n' was developed by Robert Manning in 1889!",
      2: "Newton studied gravity and motion, but Manning's n was created by Robert Manning, an Irish engineer who focused on water flow.",
      3: "Einstein was a genius, but he worked on relativity! Manning's n comes from Robert Manning, who studied hydraulics in Ireland.",
    },
    technicalNote: "Robert Manning (1816-1897) presented his formula in 1889. The equation V = (1/n)R^(2/3)S^(1/2) relates velocity to hydraulic radius and slope.",
  },

  // === EQUATIONS (3) ===
  {
    id: 4,
    question: "The Continuity Equation tells us that...",
    options: ["Water can disappear", "What goes in must come out", "Water only flows uphill", "Rain is made of sugar"],
    correctAnswer: 1,
    explanation: "The Continuity Equation says water can't just vanish — if it goes in one end, it comes out somewhere!",
    emoji: "⚖️",
    category: "Equations",
    difficulty: "easy",
    wrongAnswerFeedback: {
      0: "The opposite! The Continuity Equation says water is conserved — it can't just vanish.",
      2: "Water flows downhill due to gravity! The Continuity Equation is about conservation — all water must be accounted for.",
      3: "Haha, wouldn't that be sweet! The Continuity Equation says all water is accounted for — none appears or disappears.",
    },
    technicalNote: "The continuity equation (∂A/∂t + ∂Q/∂x = 0) expresses conservation of mass for incompressible flow.",
  },
  {
    id: 5,
    question: "In Manning's equation, what does a STEEPER slope do to water speed?",
    options: ["Slows it down", "Makes it faster", "No change", "Makes it disappear"],
    correctAnswer: 1,
    explanation: "A steeper slope means gravity pulls water harder, making it flow faster — like a steep water slide!",
    emoji: "⛷️",
    category: "Equations",
    difficulty: "easy",
    wrongAnswerFeedback: {
      0: "Think about a slide — the steeper it is, the faster you go! The same is true for water flowing downhill.",
      2: "Slope definitely matters! The steeper the channel, the faster water moves. It's all about gravity.",
      3: "Water doesn't disappear! A steeper slope just makes gravity pull it faster — like sliding down a steeper hill.",
    },
    technicalNote: "In Manning's equation V = (1/n)R^(2/3)S^(1/2), velocity is proportional to the square root of slope S.",
  },
  {
    id: 6,
    question: "What does the Momentum Equation describe?",
    options: [
      "How heavy water is",
      "All the forces pushing and pulling on flowing water",
      "The color of water",
      "How clouds form",
    ],
    correctAnswer: 1,
    explanation: "The Momentum Equation balances gravity, friction, and pressure to predict exactly how water behaves!",
    emoji: "💨",
    category: "Equations",
    difficulty: "medium",
    wrongAnswerFeedback: {
      0: "Water's weight matters, but the Momentum Equation is about the forces acting on moving water — gravity, friction, and pressure all together.",
      2: "The Momentum Equation doesn't deal with color! It describes the balance of forces (gravity, friction, pressure) that control water flow.",
      3: "Cloud formation is part of the water cycle. The Momentum Equation focuses on forces acting on water already flowing in channels and pipes.",
    },
    technicalNote: "The momentum equation: ∂Q/∂t + ∂(Q²/A)/∂x + gA∂h/∂x = gA(S₀ - Sƒ), balancing inertia, convection, pressure, gravity, and friction.",
  },

  // === ROUGHNESS (3) ===
  {
    id: 7,
    question: "Which surface lets water flow FASTEST?",
    options: ["Forest floor with leaves", "Smooth concrete", "Tall grass", "Rocky stream bed"],
    correctAnswer: 1,
    explanation: "Smooth concrete has the lowest roughness (n ≈ 0.013), so water flows fastest over it!",
    emoji: "🏃",
    category: "Roughness",
    difficulty: "easy",
    wrongAnswerFeedback: {
      0: "Forest floors are the ROUGHEST (n ≈ 0.1) — all those leaves and branches create lots of friction. Smooth concrete is the fastest!",
      2: "Grass slows water down quite a bit (n ≈ 0.035). Smooth concrete lets water zoom by because it's so smooth!",
      3: "Rocky stream beds create lots of turbulence (n ≈ 0.05). Water flows fastest on smooth concrete with minimal friction!",
    },
    technicalNote: "Manning's n for smooth concrete: 0.011-0.015; grass: 0.025-0.050; rocky streams: 0.035-0.070; forest floor: 0.080-0.150.",
  },
  {
    id: 8,
    question: "Why do some cities plant grass in drainage channels ON PURPOSE?",
    options: [
      "To make them look pretty",
      "To slow water and reduce downstream flooding",
      "Because concrete is too expensive",
      "Because grass is waterproof",
    ],
    correctAnswer: 1,
    explanation: "Grass slows water down, giving it time to soak in and reducing the flood peak downstream. This is called 'green infrastructure'!",
    emoji: "🌱",
    category: "Roughness",
    difficulty: "medium",
    wrongAnswerFeedback: {
      0: "They do look nice, but the real reason is hydraulic! Grass increases roughness, slowing water and reducing flood peaks downstream.",
      2: "Concrete can be costly, but the main reason for grass channels is to slow water flow and promote infiltration — it's a deliberate engineering choice!",
      3: "Grass is NOT waterproof — that's actually the point! Water soaks through grass into the soil, reducing runoff. It's clever engineering!",
    },
    technicalNote: "Green infrastructure uses vegetation (higher Manning's n) to attenuate peak flows, promote infiltration, and improve water quality through biofiltration.",
  },
  {
    id: 9,
    question: "What is Manning's n for a forest floor?",
    options: ["0.013 (very smooth)", "0.025 (moderate)", "0.05 (rough)", "0.1 (very rough)"],
    correctAnswer: 3,
    explanation: "Forest floors have Manning's n around 0.1 — the roughest common surface! All those leaves, branches, and roots really slow water down.",
    emoji: "🌲",
    category: "Roughness",
    difficulty: "hard",
    wrongAnswerFeedback: {
      0: "0.013 is for smooth concrete! A forest floor with all its leaves and branches is MUCH rougher — about n = 0.1.",
      1: "0.025 is about right for gravel. Forests are way rougher with all that debris — n ≈ 0.1!",
      2: "0.05 is for rocky streams. Forest floors are even rougher with fallen trees and dense vegetation — n ≈ 0.1!",
    },
    technicalNote: "Forest floor Manning's n ranges from 0.080 to 0.150 depending on density of undergrowth, debris, and seasonal variation.",
  },

  // === SINGAPORE (3) ===
  {
    id: 10,
    question: "Why does Singapore need such big drains?",
    options: ["It never rains there", "It gets lots of tropical rain", "It's in the desert", "It's very cold"],
    correctAnswer: 1,
    explanation: "Singapore is near the equator and gets about 2,400mm of rain every year — that's A LOT of water!",
    emoji: "🌧️",
    category: "Singapore",
    difficulty: "easy",
    wrongAnswerFeedback: {
      0: "Actually, it rains a lot in Singapore! Being in the tropics means heavy monsoon rains — that's exactly why they need excellent drainage!",
      2: "Singapore is definitely not a desert! It's a tropical island with about 2,400mm of rain per year.",
      3: "Singapore is tropical, not cold! It's hot and rainy year-round.",
    },
    technicalNote: "Singapore receives ~2,400mm of annual rainfall with peak intensities often exceeding 100mm/hour during monsoons.",
  },
  {
    id: 11,
    question: "How many kilometers of drains and canals does Singapore have?",
    options: ["800 km", "3,000 km", "8,000 km", "80,000 km"],
    correctAnswer: 2,
    explanation: "Singapore has over 8,000 km of drains and canals — that's enough to stretch from Singapore to London!",
    emoji: "🏗️",
    category: "Singapore",
    difficulty: "medium",
    wrongAnswerFeedback: {
      0: "Much more than that! Singapore has over 8,000 km of drains — impressive for such a small island!",
      1: "Close, but even more! Singapore has over 8,000 km of drains and canals managed by PUB.",
      3: "That's almost twice around the Earth! Singapore has about 8,000 km — still incredibly impressive for a tiny island.",
    },
    technicalNote: "PUB (Public Utilities Board) manages over 8,000 km of drains and canals, plus 17 reservoirs across Singapore's 733 km² area.",
  },
  {
    id: 12,
    question: "How much MORE rain does Singapore get compared to Dubai each year?",
    options: ["2 times more", "5 times more", "24 times more", "100 times more"],
    correctAnswer: 2,
    explanation: "Singapore gets about 2,400mm vs Dubai's 100mm — that's 24 times more rain! No wonder their drainage systems are so different.",
    emoji: "🆚",
    category: "Singapore",
    difficulty: "hard",
    wrongAnswerFeedback: {
      0: "Way more than double! Singapore gets 2,400mm vs Dubai's 100mm — that's 24 times more!",
      1: "Even more than that! 2,400 ÷ 100 = 24 times more rain in Singapore than Dubai.",
      3: "Not quite that extreme! Singapore gets 24 times more rain (2,400mm vs 100mm). Still a huge difference!",
    },
    technicalNote: "Singapore: ~2,400mm/year (tropical monsoon). Dubai: ~100mm/year (arid desert). The 24x difference drives completely different drainage design philosophies.",
  },

  // === SWMM5 (3) ===
  {
    id: 13,
    question: "What does SWMM stand for?",
    options: ["Super Water Moving Machine", "Storm Water Management Model", "Simple Water Math Method", "Singapore Water Modeling Map"],
    correctAnswer: 1,
    explanation: "SWMM stands for Storm Water Management Model — it's a computer program that uses St. Venant's equations!",
    emoji: "💻",
    category: "SWMM5",
    difficulty: "easy",
    wrongAnswerFeedback: {
      0: "Fun name but no! SWMM is 'Storm Water Management Model' — a computer program for designing drains.",
      2: "The math isn't that simple! SWMM is 'Storm Water Management Model' — a sophisticated computer simulation.",
      3: "Singapore uses SWMM, but it wasn't made just for Singapore! It was created by the US EPA.",
    },
    technicalNote: "SWMM was developed by the US EPA in 1971 and uses numerical solutions to the St. Venant equations (dynamic wave routing).",
  },
  {
    id: 14,
    question: "What can engineers do with SWMM5 BEFORE building real drains?",
    options: [
      "Nothing useful",
      "Test designs on a computer to predict if they'll work",
      "Make the rain stop",
      "Turn water into gold",
    ],
    correctAnswer: 1,
    explanation: "SWMM5 lets engineers simulate storms on a computer — they can test if their drain designs work BEFORE spending money building them!",
    emoji: "🧪",
    category: "SWMM5",
    difficulty: "medium",
    wrongAnswerFeedback: {
      0: "SWMM5 is incredibly useful! Engineers can simulate storms and test drain designs on a computer before building anything in real life.",
      2: "Engineers can't control the weather! But SWMM5 lets them prepare by simulating how their designs handle different storm scenarios.",
      3: "Haha, that would be nice! SWMM5 is valuable because it lets engineers test designs virtually, saving time and money.",
    },
    technicalNote: "SWMM5 can model rainfall-runoff, route flows through drainage networks, and simulate various design scenarios including climate change projections.",
  },
  {
    id: 15,
    question: "Which organization created SWMM?",
    options: [
      "NASA",
      "FIFA",
      "US Environmental Protection Agency (EPA)",
      "United Nations",
    ],
    correctAnswer: 2,
    explanation: "The US EPA (Environmental Protection Agency) created SWMM in 1971 to help cities manage stormwater and prevent pollution!",
    emoji: "🏛️",
    category: "SWMM5",
    difficulty: "hard",
    wrongAnswerFeedback: {
      0: "NASA explores space! SWMM was created by the US EPA to help manage stormwater on Earth.",
      1: "FIFA manages football/soccer! SWMM was created by the US EPA — the Environmental Protection Agency.",
      3: "The UN does global work, but SWMM was specifically created by the US EPA in 1971 to help cities manage stormwater.",
    },
    technicalNote: "SWMM was first developed in 1971 by the US EPA. SWMM5 (the current version) is open-source and freely available, used by engineers worldwide.",
  },
];
