import { useState, useMemo } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechnicalAnnotation } from "./TechnicalAnnotation";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  quizQuestions,
  CATEGORY_META,
  DIFFICULTY_META,
  type QuizCategory,
  type Question,
} from "@/data/quizQuestions";

const ALL_CATEGORIES: QuizCategory[] = ["History", "Equations", "Roughness", "Singapore", "SWMM5"];

export const QuizSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<QuizCategory>>(
    new Set(ALL_CATEGORIES)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const { playCelebration, playWrongAnswer, playVictoryFanfare } = useSoundEffects();

  const filteredQuestions = useMemo(
    () => quizQuestions.filter((q) => selectedCategories.has(q.category)),
    [selectedCategories]
  );

  const toggleCategory = (cat: QuizCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const question: Question | undefined = filteredQuestions[currentIndex];
  const isCorrect = selectedAnswer === question?.correctAnswer;

  const handleAnswerSelect = (i: number) => {
    if (showResult) return;
    setSelectedAnswer(i);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore((s) => s + 1);
      playCelebration();
    } else {
      playWrongAnswer();
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      playVictoryFanfare();
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const percentage = filteredQuestions.length
    ? Math.round((score / filteredQuestions.length) * 100)
    : 0;

  // === Category stats for results ===
  const getCategoryStats = () => {
    const stats: Record<string, { total: number; correct: number }> = {};
    ALL_CATEGORIES.forEach((c) => {
      if (selectedCategories.has(c)) {
        stats[c] = { total: 0, correct: 0 };
      }
    });
    // We don't track per-question correctness in detail, so show total counts
    filteredQuestions.forEach((q) => {
      if (stats[q.category]) stats[q.category].total++;
    });
    return stats;
  };

  // === CATEGORY SELECTOR (before quiz starts) ===
  if (!quizStarted) {
    return (
      <section id="quiz" className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bubble mb-4">🎮 Test Your Knowledge!</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Water Science Quiz!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your categories and test what you&apos;ve learned about water flow,
              St. Venant, and stormwater engineering! 🧠✨
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="fun-card">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold">Pick Your Topics</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Select one or more categories. You&apos;ll get 3 questions per category!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {ALL_CATEGORIES.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const active = selectedCategories.has(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        active
                          ? "border-primary bg-primary/10 scale-[1.02]"
                          : "border-border hover:border-primary/40 opacity-60"
                      }`}
                    >
                      <div className="text-2xl mb-1">{meta.emoji}</div>
                      <div className="text-sm font-medium">{cat}</div>
                      <div className="text-[10px] text-muted-foreground">3 questions</div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  {filteredQuestions.length} questions selected
                  {filteredQuestions.length >= 10 && " — go for the full challenge! 🔥"}
                </p>
                <Button
                  onClick={startQuiz}
                  disabled={filteredQuestions.length === 0}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-6 text-lg rounded-full"
                >
                  Start Quiz! 🚀
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // === QUIZ COMPLETE ===
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-secondary" />
                <span className="text-4xl font-display font-bold text-foreground">
                  {score} / {filteredQuestions.length}
                </span>
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                {percentage >= 80
                  ? "Amazing! You're a water science expert! 🌟"
                  : percentage >= 50
                  ? "Great job! You learned a lot! Keep exploring! 📚"
                  : "Good try! Read the lessons again and try once more! 💧"}
              </p>

              {/* Category breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {Object.entries(getCategoryStats()).map(([cat, stat]) => (
                  <div key={cat} className="bg-background/60 rounded-lg p-2 text-center">
                    <div className="text-lg">{CATEGORY_META[cat as QuizCategory].emoji}</div>
                    <div className="text-xs font-medium">{cat}</div>
                    <div className="text-xs text-muted-foreground">{stat.total} questions</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={resetQuiz}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-6 text-lg rounded-full"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // === ACTIVE QUIZ ===
  if (!question) return null;

  const catMeta = CATEGORY_META[question.category];
  const diffMeta = DIFFICULTY_META[question.difficulty];

  const getFeedbackMessage = () => {
    if (isCorrect) return question.explanation;
    if (selectedAnswer !== null && question.wrongAnswerFeedback[selectedAnswer]) {
      return question.wrongAnswerFeedback[selectedAnswer];
    }
    return question.explanation;
  };

  return (
    <section id="quiz" className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bubble mb-4">🎮 Test Your Knowledge!</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Water Science Quiz!
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-secondary" />
                Score: {score}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="fun-card">
            {/* Category & Difficulty badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-muted ${catMeta.color}`}
              >
                {catMeta.emoji} {question.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                {diffMeta.emoji} {diffMeta.label}
              </span>
            </div>

            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">{question.emoji}</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {question.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid gap-3 mb-6">
              {question.options.map((option, index) => {
                let optionClass =
                  "fun-card cursor-pointer transition-all duration-200 p-4 ";

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
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-left font-medium">{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-accent ml-auto shrink-0" />
                      )}
                      {showResult && index === selectedAnswer && !isCorrect && (
                        <XCircle className="w-6 h-6 text-destructive ml-auto shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Result Explanation */}
            {showResult && (
              <div
                className={`p-4 rounded-2xl mb-6 ${
                  isCorrect ? "bg-accent/20" : "bg-secondary/20"
                }`}
              >
                <p className="font-display font-bold mb-2">
                  {isCorrect ? "🎉 Correct!" : "💡 Not quite, but great thinking!"}
                </p>
                <p className="text-muted-foreground">{getFeedbackMessage()}</p>

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
                  {currentIndex < filteredQuestions.length - 1
                    ? "Next Question →"
                    : "See Results! 🏆"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
