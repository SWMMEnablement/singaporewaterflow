import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechnicalAnnotation } from "./TechnicalAnnotation";
import { useSoundEffects } from "@/hooks/useSoundEffects";
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
  wrongAnswerFeedback: Record<number, string>;
  technicalNote?: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What country was St. Venant from?",
    options: ["England", "France", "Germany", "Singapore"],
    correctAnswer: 1,
    explanation: "St. Venant was a French engineer and mathematician who lived from 1797 to 1886!",
    emoji: "🇫🇷",
    wrongAnswerFeedback: {
      0: "Good guess! England has had many famous scientists, but St. Venant was from France. He helped engineers all over the world, including in England!",
      2: "Close! Germany also has many brilliant engineers, but St. Venant was French. His equations are used by German engineers too!",
      3: "Good thinking! Singapore uses his work a lot, but St. Venant was actually from France. He figured out the math that engineers in Singapore and everywhere use today!",
    },
    technicalNote: "Adhémar Jean Claude Barré de Saint-Venant (1797-1886) derived the shallow water equations in 1871, which describe unsteady open-channel flow and are still fundamental to hydraulic engineering.",
  },
  {
    id: 2,
    question: "What do St. Venant's equations help us understand?",
    options: ["How birds fly", "How water flows", "How plants grow", "How stars shine"],
    correctAnswer: 1,
    explanation: "St. Venant's equations tell us exactly how water moves through rivers, channels, and drains!",
    emoji: "🌊",
    wrongAnswerFeedback: {
      0: "Birds are amazing! But that's aerodynamics. St. Venant focused on water - specifically how it flows through rivers, pipes, and drains. Both are about fluid movement though!",
      2: "Plants need water to grow, but St. Venant's equations are about how water itself moves - how fast, how deep, and in what direction!",
      3: "Stars are fascinating, but that's astronomy! St. Venant studied something closer to Earth - how water flows in rivers and channels.",
    },
    technicalNote: "The St. Venant equations (also called shallow water equations) are a set of hyperbolic partial differential equations: the continuity equation (∂A/∂t + ∂Q/∂x = 0) and the momentum equation (∂Q/∂t + ∂(Q²/A)/∂x + gA∂h/∂x = gA(S₀ - Sƒ)).",
  },
  {
    id: 3,
    question: "What does SWMM stand for?",
    options: [
      "Super Water Moving Machine",
      "Storm Water Management Model",
      "Simple Water Math Method",
      "Singapore Water Modeling Map",
    ],
    correctAnswer: 1,
    explanation: "SWMM stands for Storm Water Management Model - it's a computer program that uses St. Venant's equations!",
    emoji: "💻",
    wrongAnswerFeedback: {
      0: "That would be a fun name! But SWMM actually stands for 'Storm Water Management Model' - it's a computer program that helps engineers design drains and predict flooding.",
      2: "The math isn't that simple, unfortunately! SWMM is 'Storm Water Management Model' - a sophisticated computer simulation used by engineers worldwide.",
      3: "Singapore does use SWMM a lot, but it wasn't made just for Singapore! SWMM stands for 'Storm Water Management Model' and was created by the US Environmental Protection Agency.",
    },
    technicalNote: "SWMM (Storm Water Management Model) was developed by the US EPA in 1971. It uses numerical solutions to the St. Venant equations (dynamic wave routing) along with kinematic wave and other simplified routing methods.",
  },
  {
    id: 4,
    question: "Why does Singapore need good stormwater drains?",
    options: [
      "It never rains there",
      "It gets lots of tropical rain",
      "It's in the desert",
      "It's very cold",
    ],
    correctAnswer: 1,
    explanation: "Singapore is near the equator and gets about 2,400mm of rain every year - that's A LOT of water!",
    emoji: "🌧️",
    wrongAnswerFeedback: {
      0: "Actually, it rains a lot in Singapore! Being in the tropics near the equator means heavy monsoon rains - that's exactly why they need excellent drainage!",
      2: "Singapore is definitely not a desert! It's a tropical island with lots of rain - about 2,400mm per year. Compare that to London's 600mm!",
      3: "Singapore is tropical, not cold! It's hot and rainy year-round. That's why their drainage engineers are some of the best in the world!",
    },
    technicalNote: "Singapore receives approximately 2,400mm of annual rainfall with peak intensities often exceeding 100mm/hour during monsoons. PUB (Public Utilities Board) manages over 8,000km of drains and canals, designing for 1-in-50 year storm events.",
  },
  {
    id: 5,
    question: "What happens to rain that falls on city roads and buildings?",
    options: [
      "It disappears",
      "It soaks into the concrete",
      "It becomes stormwater and flows to drains",
      "It floats into space",
    ],
    correctAnswer: 2,
    explanation: "Water can't soak into concrete, so it runs off into drains - this is called stormwater!",
    emoji: "🏙️",
    wrongAnswerFeedback: {
      0: "Water never really disappears - it's always going somewhere! In cities, rain runs off roads and roofs into storm drains because it can't soak into concrete.",
      1: "Concrete and asphalt are impermeable - water can't soak through them like it does into soil. That's why cities need lots of drains to collect all the runoff!",
      3: "Ha! Gravity pulls water down, not up! But you're right that water goes somewhere - it flows along surfaces into storm drains.",
    },
    technicalNote: "Urban areas have high runoff coefficients (0.7-0.95) due to impervious surfaces. The rational method (Q = CiA) estimates peak runoff where C is the runoff coefficient, i is rainfall intensity, and A is catchment area.",
  },
  {
    id: 6,
    question: "The Continuity Equation tells us that...",
    options: [
      "Water can disappear",
      "What goes in must come out",
      "Water only flows uphill",
      "Rain is made of sugar",
    ],
    correctAnswer: 1,
    explanation: "The Continuity Equation says water can't just vanish - if it goes in one end, it comes out somewhere!",
    emoji: "📏",
    wrongAnswerFeedback: {
      0: "The opposite, actually! The Continuity Equation says water is conserved - it can't just vanish. Every drop that enters a system must come out somewhere.",
      2: "Water flows downhill due to gravity! The Continuity Equation is about conservation - making sure we account for all the water going in and out of a system.",
      3: "Haha, wouldn't that be sweet! But rain is just water. The Continuity Equation says all water is accounted for - none appears or disappears magically.",
    },
    technicalNote: "The continuity equation (∂A/∂t + ∂Q/∂x = 0) expresses conservation of mass for incompressible flow. In integral form: ∫∫ρv·dA = 0, where changes in cross-sectional area over time equal changes in discharge over distance.",
  },
];

export const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );

  const { playCelebration, playWrongAnswer, playVictoryFanfare } = useSoundEffects();

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const isCorrectAnswer = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    if (isCorrectAnswer) {
      setScore(score + 1);
      playCelebration(); // Play celebration sound on correct answer
    } else {
      playWrongAnswer(); // Play gentle feedback on wrong answer
    }
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      playVictoryFanfare(); // Play victory fanfare when quiz is complete
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const percentage = Math.round((score / quizQuestions.length) * 100);

  // Get the feedback message for wrong answers
  const getFeedbackMessage = () => {
    if (isCorrect) {
      return question.explanation;
    }
    if (selectedAnswer !== null && question.wrongAnswerFeedback[selectedAnswer]) {
      return question.wrongAnswerFeedback[selectedAnswer];
    }
    return question.explanation;
  };

  if (quizComplete) {
    return (
      <section id="quiz" className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="fun-card bg-gradient-to-br from-secondary/20 to-primary/10">
              <div className="text-7xl mb-6 animate-bounce-slow">
                {percentage >= 80 ? "🏆" : percentage >= 50 ? "⭐" : "💪"}
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Quiz Complete!
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Trophy className="w-8 h-8 text-secondary" />
                <span className="text-4xl font-display font-bold text-foreground">
                  {score} / {quizQuestions.length}
                </span>
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                {percentage >= 80
                  ? "Amazing! You're a water science expert! 🌟"
                  : percentage >= 50
                  ? "Great job! You learned a lot! Keep exploring! 📚"
                  : "Good try! Read the lessons again and try once more! 💧"}
              </p>
              <Button
                onClick={resetQuiz}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-6 text-lg rounded-full"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again!
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bubble mb-4">🎮 Test Your Knowledge!</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Water Science Quiz!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s see what you&apos;ve learned! Answer these fun questions about 
            St. Venant, water flow, and stormwater in Singapore! 🧠✨
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-secondary" />
                Score: {score}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="fun-card">
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">{question.emoji}</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {question.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid gap-3 mb-6">
              {question.options.map((option, index) => {
                let optionClass = "fun-card cursor-pointer transition-all duration-200 p-4 ";
                
                if (showResult) {
                  if (index === question.correctAnswer) {
                    optionClass += "bg-accent/20 border-accent border-2";
                  } else if (index === selectedAnswer && !isCorrect) {
                    optionClass += "bg-destructive/20 border-destructive border-2";
                  } else {
                    optionClass += "opacity-50";
                  }
                } else if (selectedAnswer === index) {
                  optionClass += "bg-primary/20 border-primary border-2 scale-[1.02]";
                } else {
                  optionClass += "hover:bg-primary/10 hover:scale-[1.01]";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={optionClass}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-left font-medium">{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-accent ml-auto" />
                      )}
                      {showResult && index === selectedAnswer && !isCorrect && (
                        <XCircle className="w-6 h-6 text-destructive ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Result Explanation - Enhanced with rich feedback */}
            {showResult && (
              <div className={`p-4 rounded-2xl mb-6 ${isCorrect ? "bg-accent/20" : "bg-secondary/20"}`}>
                <p className="font-display font-bold mb-2">
                  {isCorrect ? "🎉 Correct!" : "💡 Not quite, but great thinking!"}
                </p>
                <p className="text-muted-foreground">{getFeedbackMessage()}</p>
                
                {/* Technical annotation for grown-ups */}
                <TechnicalAnnotation title="Engineering Details">
                  <p>{question.technicalNote}</p>
                </TechnicalAnnotation>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              {!showResult ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-6 text-lg rounded-full disabled:opacity-50"
                >
                  Check Answer!
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold px-8 py-6 text-lg rounded-full"
                >
                  {currentQuestion < quizQuestions.length - 1 ? "Next Question →" : "See Results! 🏆"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
