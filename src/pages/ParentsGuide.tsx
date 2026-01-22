import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Target, MessageCircle, Lightbulb, GraduationCap, Globe } from "lucide-react";

const ParentsGuide = () => {
  const learningObjectives = [
    {
      title: "Conservation Principles",
      description: "Children learn that water (like energy) cannot be created or destroyed—it flows from one place to another. This is the foundation of the continuity equation.",
      ageAppropriate: "Ages 6-8: 'Water has to go somewhere!' | Ages 9-12: Introduction to mass balance concepts"
    },
    {
      title: "Cause and Effect in Physics",
      description: "Steeper slopes make water flow faster. Rougher surfaces slow water down. These intuitive concepts map directly to the momentum equation in fluid dynamics.",
      ageAppropriate: "Ages 6-8: Playground slide analogies | Ages 9-12: Quantitative relationships (2× slope ≈ 1.4× speed)"
    },
    {
      title: "Engineering Problem-Solving",
      description: "The drain-building game teaches iterative design: try something, observe results, improve. This mirrors real engineering workflows.",
      ageAppropriate: "All ages: Trial and error is valuable, not failure"
    },
    {
      title: "Systems Thinking",
      description: "Understanding how individual pipes connect to form networks, and how upstream changes affect downstream outcomes.",
      ageAppropriate: "Ages 8+: Introduction to infrastructure and urban planning concepts"
    }
  ];

  const discussionQuestions = [
    {
      section: "After the Slope Simulator",
      questions: [
        "What happens to the water when we make the pipe steeper? Why do you think that is?",
        "Can you think of places in our neighborhood where water flows fast? What makes it fast there?",
        "Why might engineers NOT want water to flow too fast in some drains?",
        "What would happen if all the drains were flat with no slope at all?"
      ]
    },
    {
      section: "After the Surface Roughness Simulator",
      questions: [
        "Why does water flow slower over grass than concrete?",
        "What materials in our yard or park would slow water down the most?",
        "Why might cities want some areas with rough surfaces and some with smooth surfaces?",
        "How do you think tree roots and leaves affect water flow?"
      ]
    },
    {
      section: "After Build Your Own Drain",
      questions: [
        "What was the hardest part about connecting all the pipes?",
        "What happened when too much water went into one pipe?",
        "How is this like planning roads for cars?",
        "What would happen to a city if nobody designed the drain system?"
      ]
    },
    {
      section: "After Singapore Section",
      questions: [
        "Why is flood control especially important in Singapore?",
        "How do big storms test a city's drain system?",
        "What are some ways cities can prepare for bigger storms in the future?",
        "Why do engineers use computer simulations before building real drains?"
      ]
    }
  ];

  const realWorldConnections = [
    {
      title: "Climate Change Resilience",
      content: "As weather patterns become more extreme, understanding stormwater management is increasingly critical. The concepts children learn here—flow capacity, system design, overflow prevention—are exactly what cities worldwide are grappling with."
    },
    {
      title: "STEM Career Pathways",
      content: "Civil engineering, environmental science, urban planning, and hydrology all build on these fundamental concepts. Early exposure to 'water math' can spark lifelong interest in infrastructure careers."
    },
    {
      title: "Everyday Observations",
      content: "After using these simulators, children often start noticing drain grates, culverts, and channels in their environment. This observational habit is the foundation of scientific thinking."
    },
    {
      title: "The St. Venant Equations",
      content: "Named after Adhémar Jean Claude Barré de Saint-Venant (1797-1886), these equations describe how water flows in open channels. They're used daily by engineers worldwide to design everything from irrigation canals to urban drainage systems."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              For Parents & Teachers
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Parent & Teacher Corner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A guide to help you facilitate learning and spark meaningful conversations 
              about water science, engineering, and environmental stewardship.
            </p>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                What This App Teaches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This interactive experience introduces children to <strong>fluid dynamics</strong> and 
                <strong> stormwater engineering</strong> through hands-on simulations. The underlying math—the 
                St. Venant equations—is the same used by professional engineers designing real drainage systems.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">🌊</div>
                  <div className="font-semibold">Continuity Equation</div>
                  <div className="text-sm text-muted-foreground">Water in = Water out</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold">Momentum Equation</div>
                  <div className="text-sm text-muted-foreground">Forces that speed up or slow down flow</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold">Manning's Equation</div>
                  <div className="text-sm text-muted-foreground">Calculating flow in channels</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Key Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{objective.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{objective.description}</p>
                  <div className="text-xs bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full inline-block">
                    {objective.ageAppropriate}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Discussion Questions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                Discussion Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Use these questions to deepen understanding after each activity. 
                There are no wrong answers—the goal is to encourage curiosity and observation.
              </p>
              <Accordion type="single" collapsible className="w-full">
                {discussionQuestions.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {section.section}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {section.questions.map((question, qIndex) => (
                          <li key={qIndex} className="flex gap-3 text-muted-foreground">
                            <span className="text-primary font-bold">{qIndex + 1}.</span>
                            <span>{question}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Real-World Connections */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Real-World Significance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {realWorldConnections.map((connection, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-2">{connection.title}</h3>
                  <p className="text-muted-foreground text-sm">{connection.content}</p>
                  {index < realWorldConnections.length - 1 && (
                    <div className="border-b border-border mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips for Facilitators */}
          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Tips for Facilitators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span><strong>Let them fail:</strong> Overflowing pipes and failed challenges are learning opportunities. Ask "What happened? What could we try differently?"</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span><strong>Use "Grown-Up Mode":</strong> Toggle this in the navigation bar to see the actual engineering equations alongside kid-friendly explanations.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span><strong>Go outside:</strong> After playing, take a walk and find real drains, gutters, and channels. Compare what you see to the simulations.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span><strong>Connect to weather:</strong> On rainy days, watch where water collects and flows. Revisit the app afterward to model what you observed.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span><strong>Celebrate completion:</strong> The printable certificate in "Build Your Own Drain" makes a great fridge-worthy achievement!</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Back to App */}
          <div className="text-center mt-12">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
            >
              ← Back to the App
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ParentsGuide;
