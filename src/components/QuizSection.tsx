import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What country was St. Venant from?",
    options: ["England", "France", "Germany", "Singapore"],
    correctAnswer: 1,
    explanation: "St. Venant was a French engineer and mathematician who lived from 1797 to 1886!",
    emoji: "🇫🇷",
  },
  {
    id: 2,
    question: "What do St. Venant's equations help us understand?",
    options: ["How birds fly", "How water flows", "How plants grow", "How stars shine"],
    correctAnswer: 1,
    explanation: "St. Venant's equations tell us exactly how water moves through rivers, channels, and drains!",
    emoji: "🌊",
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

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
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

            {/* Result Explanation */}
            {showResult && (
              <div className={`p-4 rounded-2xl mb-6 ${isCorrect ? "bg-accent/20" : "bg-secondary/20"}`}>
                <p className="font-display font-bold mb-2">
                  {isCorrect ? "🎉 Correct!" : "💡 Not quite!"}
                </p>
                <p className="text-muted-foreground">{question.explanation}</p>
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
