 import { useState } from "react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { MessageCircle, Send, Sparkles, HelpCircle } from "lucide-react";
 
 interface QAPair {
   keywords: string[];
   question: string;
   answer: string;
   emoji: string;
 }
 
 const qaDatabase: QAPair[] = [
   {
     keywords: ["concrete", "fast", "smooth", "speed"],
     question: "Why does water go fast on concrete?",
     answer: "Great question! Concrete is super smooth compared to grass or rocks. When water flows over smooth surfaces, there's less friction to slow it down—like sliding on a polished floor vs. a bumpy carpet! That's why engineers use concrete in drains: to move water away quickly. We measure this 'bumpiness' with something called Manning's n. Concrete has a low n (about 0.013), meaning it's very smooth!",
     emoji: "🏃‍♂️"
   },
   {
     keywords: ["rain", "too much", "flood", "overflow", "full"],
     question: "What happens when it rains too much?",
     answer: "When more rain falls than the drains can handle, water has nowhere to go—that's a flood! Imagine pouring water into a cup faster than it can drain out. The cup overflows! That's exactly what happens to cities. Engineers like me design drains big enough for most storms, but REALLY big storms (like the one in Dubai in 2024!) can overwhelm even the best systems. That's why we plan for 'extreme events'!",
     emoji: "🌊"
   },
   {
     keywords: ["pipe", "work", "drain", "underground"],
     question: "How do pipes work?",
     answer: "Pipes are like underground water slides! Water enters at the high end and gravity pulls it down to the low end. The steeper the pipe (more slope), the faster water flows. But here's the clever part: pipes need to be JUST steep enough. Too flat? Water moves too slowly and clogs. Too steep? Water moves so fast it erodes the pipe! My equations help engineers find the perfect slope.",
     emoji: "🎢"
   },
   {
     keywords: ["singapore", "rain", "monsoon", "tropical"],
     question: "Why does Singapore need such big drains?",
     answer: "Singapore gets A LOT of rain—about 2,400mm per year! That's 24 times more than Dubai! Because Singapore is tropical with monsoon seasons, heavy rain can fall very quickly. The city is also mostly covered in buildings and roads (impervious surfaces), so rain can't soak into the ground. All that water needs somewhere to go FAST, which is why Singapore has an amazing network of big drains, canals, and reservoirs!",
     emoji: "🇸🇬"
   },
   {
     keywords: ["dubai", "desert", "flood", "rare"],
     question: "How can Dubai flood if it barely rains?",
     answer: "Great observation! Dubai only gets about 100mm of rain per year—that's almost nothing! But here's the tricky part: when it DOES rain in the desert, the ground is so dry and hard that water can't soak in. Plus, desert cities weren't always built with big drainage systems because rain is so rare. So even a small storm can cause big problems! The 2024 Dubai floods showed just how important drainage is EVERYWHERE.",
     emoji: "🏜️"
   },
   {
     keywords: ["saint", "venant", "who", "you", "inventor"],
     question: "Who is St. Venant?",
     answer: "That's me! Well, I'm inspired by Adhémar Jean Claude Barré de Saint-Venant, a French mathematician who lived from 1797 to 1886. I figured out the math that describes how water flows in rivers, channels, and pipes. My equations—the St. Venant equations—are still used today by engineers all over the world! They're built into software like SWMM5 that designs the drains in YOUR city!",
     emoji: "👨‍🔬"
   },
   {
     keywords: ["manning", "n", "roughness", "coefficient"],
     question: "What is Manning's n?",
     answer: "Manning's n is a special number that tells us how 'bumpy' or 'rough' a surface is. The bigger the n, the rougher the surface, and the slower water flows. Smooth concrete has a low n (0.013), while a forest floor has a high n (0.1 or more!). Robert Manning, an Irish engineer, figured this out in 1889. Engineers use Manning's n in my equations to predict exactly how fast water will flow!",
     emoji: "📏"
   },
   {
     keywords: ["swmm", "software", "computer", "engineer", "program"],
     question: "What is SWMM5?",
     answer: "SWMM stands for Storm Water Management Model, and it's a computer program used by engineers to design drainage systems! It uses my St. Venant equations inside to simulate how water flows through pipes, channels, and across land. Engineers can test different designs on the computer before building anything in real life. It was created by the US EPA and is used all around the world—including in Singapore!",
     emoji: "💻"
   },
   {
     keywords: ["slope", "steep", "angle", "hill", "gravity"],
     question: "Why does slope matter for water flow?",
     answer: "Slope is SO important! It's all about gravity. When a pipe or channel is steeper, gravity pulls water down faster—just like how you slide faster on a steep playground slide! Engineers measure slope as a ratio or percentage. A 1% slope means the pipe drops 1 meter for every 100 meters of length. My equations show that flow speed increases with the square root of slope. Double the slope? Water goes about 1.4 times faster!",
     emoji: "⛷️"
   },
   {
     keywords: ["water", "cycle", "evaporation", "cloud", "precipitation"],
     question: "How does the water cycle work?",
     answer: "The water cycle is nature's recycling system! Here's how it works: 1) The sun heats water in oceans and lakes, turning it into water vapor (evaporation). 2) The vapor rises and cools, forming clouds (condensation). 3) Water falls as rain or snow (precipitation). 4) Rain flows into rivers, drains, and eventually back to the ocean (runoff). Then it starts all over again! My equations help us understand step 4—the runoff part!",
     emoji: "🔄"
   },
   {
     keywords: ["continuity", "conservation", "mass", "in", "out"],
     question: "What is the continuity equation?",
     answer: "The continuity equation is my first big rule: 'What goes in must come out!' Imagine a pipe with water flowing through it. If 10 liters per second enters one end, then 10 liters per second must exit the other end (assuming the pipe doesn't leak or store water). Scientists call this 'conservation of mass.' It sounds simple, but it's incredibly powerful for understanding how water moves through drainage systems!",
     emoji: "⚖️"
   },
   {
     keywords: ["momentum", "force", "push", "friction", "pressure"],
     question: "What is the momentum equation?",
     answer: "The momentum equation is my second big rule! It describes all the forces pushing and pulling on flowing water: 1) Gravity pulls water downhill (that's why slope matters!). 2) Friction from rough surfaces slows water down. 3) Pressure differences can push water along. 4) The water's own momentum keeps it moving. Put them all together, and you can predict exactly how water will behave. It's like physics for rivers!",
     emoji: "💨"
   },
   {
     keywords: ["grass", "forest", "slow", "absorb", "nature"],
     question: "Why do natural surfaces slow water down?",
     answer: "Natural surfaces like grass and forests are nature's speed bumps! The blades of grass, leaves, twigs, and roots create lots of obstacles that water has to flow around. This friction slows the water AND gives it time to soak into the ground (infiltration). That's why parks and gardens help prevent flooding—they're like natural sponges! Some cities are now building 'green infrastructure' to copy what nature does.",
     emoji: "🌳"
   },
   {
     keywords: ["reservoir", "tank", "storage", "hold", "dam"],
     question: "What is a reservoir?",
     answer: "A reservoir is a big storage tank for water—either natural or man-made! Singapore has 17 reservoirs that collect rainwater for people to drink and use. During storms, reservoirs can also hold extra water to prevent flooding downstream. The famous Marina Barrage in Singapore is both a reservoir AND a barrier that keeps seawater out. Reservoirs are like giant bathtubs for cities!",
     emoji: "🏞️"
   },
   {
     keywords: ["engineer", "job", "career", "work", "become"],
     question: "How do I become an engineer?",
     answer: "What an exciting goal! Engineers solve problems that help people—like designing drains to keep cities safe from floods. To become one: 1) Study math and science in school (they're the foundation!). 2) Go to university for engineering. 3) Specialize in civil, environmental, or water resources engineering. 4) Get experience and maybe become a licensed Professional Engineer (PE). The world needs curious problem-solvers like you!",
     emoji: "🎓"
   }
 ];
 
 const quickQuestions = [
   "Why does water go fast on concrete?",
   "What happens when it rains too much?",
   "How do pipes work?",
   "Why does Singapore need such big drains?",
   "What is Manning's n?"
 ];
 
 interface DrStVenantProps {
   className?: string;
 }
 
 export const DrStVenant = ({ className = "" }: DrStVenantProps) => {
   const [currentAnswer, setCurrentAnswer] = useState<QAPair | null>(null);
   const [customQuestion, setCustomQuestion] = useState("");
   const [isThinking, setIsThinking] = useState(false);
   const [noAnswerFound, setNoAnswerFound] = useState(false);
 
   const findAnswer = (question: string) => {
     const lowerQuestion = question.toLowerCase();
     
     // Try to find a matching Q&A
     for (const qa of qaDatabase) {
       // Check for keyword matches
       const matchCount = qa.keywords.filter(keyword => 
         lowerQuestion.includes(keyword.toLowerCase())
       ).length;
       
       if (matchCount >= 1) {
         return qa;
       }
     }
     
     return null;
   };
 
   const askQuestion = (question: string) => {
     setIsThinking(true);
     setNoAnswerFound(false);
     setCurrentAnswer(null);
 
     // Simulate thinking delay for fun
     setTimeout(() => {
       const answer = findAnswer(question);
       if (answer) {
         setCurrentAnswer(answer);
       } else {
         setNoAnswerFound(true);
       }
       setIsThinking(false);
     }, 800);
   };
 
   const handleCustomQuestion = () => {
     if (customQuestion.trim()) {
       askQuestion(customQuestion);
       setCustomQuestion("");
     }
   };
 
   return (
     <Card className={`overflow-hidden ${className}`}>
       <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
         <CardTitle className="flex items-center gap-3 text-xl">
           <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl animate-bounce">
             👨‍🔬
           </div>
           <div>
             <div className="flex items-center gap-2">
               Ask Dr. St. Venant!
               <Sparkles className="w-5 h-5 text-yellow-500" />
             </div>
             <p className="text-sm font-normal text-muted-foreground">
               I know all about water flow. Try asking me something!
             </p>
           </div>
         </CardTitle>
       </CardHeader>
 
       <CardContent className="p-4 space-y-4">
         {/* Quick Question Buttons */}
         <div className="space-y-2">
           <p className="text-sm font-medium flex items-center gap-2">
             <HelpCircle className="w-4 h-4" />
             Popular Questions:
           </p>
           <div className="flex flex-wrap gap-2">
             {quickQuestions.map((question, i) => (
               <Button
                 key={i}
                 variant="outline"
                 size="sm"
                 onClick={() => askQuestion(question)}
                 className="text-xs h-auto py-1.5 px-3"
                 disabled={isThinking}
               >
                 {question}
               </Button>
             ))}
           </div>
         </div>
 
         {/* Custom Question Input */}
         <div className="flex gap-2">
           <Input
             placeholder="Or type your own question..."
             value={customQuestion}
             onChange={(e) => setCustomQuestion(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && handleCustomQuestion()}
             disabled={isThinking}
             className="text-sm"
           />
           <Button 
             onClick={handleCustomQuestion}
             disabled={isThinking || !customQuestion.trim()}
             size="icon"
           >
             <Send className="w-4 h-4" />
           </Button>
         </div>
 
         {/* Answer Display */}
         {isThinking && (
           <div className="bg-muted/50 rounded-lg p-4 animate-pulse">
             <div className="flex items-center gap-3">
               <div className="text-2xl animate-bounce">🤔</div>
               <p className="text-muted-foreground italic">
                 Hmm, let me think about that...
               </p>
             </div>
           </div>
         )}
 
         {currentAnswer && !isThinking && (
           <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex items-start gap-3">
               <div className="text-3xl">{currentAnswer.emoji}</div>
               <div className="space-y-2 flex-1">
                 <p className="font-medium text-sm text-primary">
                   "{currentAnswer.question}"
                 </p>
                 <p className="text-sm leading-relaxed">
                   {currentAnswer.answer}
                 </p>
               </div>
             </div>
             
             <div className="flex items-center gap-2 pt-2 border-t border-primary/10">
               <MessageCircle className="w-4 h-4 text-muted-foreground" />
               <p className="text-xs text-muted-foreground">
                 Ask another question to keep learning!
               </p>
             </div>
           </div>
         )}
 
         {noAnswerFound && !isThinking && (
           <div className="bg-accent/20 border border-accent/30 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex items-start gap-3">
               <div className="text-2xl">🤷‍♂️</div>
               <div className="space-y-2">
                 <p className="text-sm font-medium">
                   Hmm, I'm not sure about that one!
                 </p>
                 <p className="text-sm text-muted-foreground">
                   Try asking about water flow, drainage, pipes, slope, roughness, 
                   Singapore, Dubai, Manning's n, or the water cycle!
                 </p>
               </div>
             </div>
           </div>
         )}
 
         {/* Suggestion when no question asked yet */}
         {!currentAnswer && !isThinking && !noAnswerFound && (
           <div className="text-center py-4 text-muted-foreground">
             <p className="text-sm">
               👆 Click a question above or type your own below!
             </p>
           </div>
         )}
       </CardContent>
     </Card>
   );
 };