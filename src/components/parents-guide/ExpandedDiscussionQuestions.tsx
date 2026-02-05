 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 import { Badge } from "@/components/ui/badge";
 
 const discussionSections = [
   {
     id: "slope-simulator",
     title: "After the Slope Simulator",
     icon: "📐",
     ageGroups: [
       {
         age: "Ages 5-7",
         questions: [
           "What happened when we made the pipe steeper?",
           "Where does the water want to go? Why?",
           "What would happen if the pipe was completely flat?"
         ]
       },
       {
         age: "Ages 8-10",
         questions: [
           "Can you guess how fast the water will go before moving the slider? Were you close?",
           "Why do you think engineers need to know exact speeds?",
           "What problems might happen if water moves TOO fast?"
         ]
       }
     ]
   },
   {
     id: "roughness-simulator",
     title: "After the Surface Roughness Simulator",
     icon: "🌿",
     ageGroups: [
       {
         age: "Ages 5-7",
         questions: [
           "Why do you think the forest floor slows water down so much?",
           "What surfaces at home are smooth? What surfaces are bumpy?",
           "If you were a raindrop, which surface would be most fun to slide on?"
         ]
       },
       {
         age: "Ages 8-10",
         questions: [
           "Parks have grass, but parking lots have concrete. How does this affect where water goes during a storm?",
           "Why might engineers WANT to slow water down sometimes?",
           "The app says 'n = 0.035' for grass. What do you think this number means?"
         ]
       }
     ]
   },
   {
     id: "water-race",
     title: "After the Water Race",
     icon: "🏁",
     ageGroups: [
       {
         age: "Ages 5-7",
         questions: [
           "Which surface won? Why do you think it was faster?",
           "Was the race close or very different? What made the difference?",
           "What race would you like to try next?"
         ]
       },
       {
         age: "Ages 8-10",
         questions: [
           "Can you predict the winner before starting? What clues help?",
           "If you raced the two fastest surfaces, how close would it be?",
           "Real engineers use these same numbers! What does that tell you about this 'game'?"
         ]
       }
     ]
   },
   {
     id: "singapore-dubai",
     title: "After Singapore vs Dubai",
     icon: "🌏",
     ageGroups: [
       {
         age: "Ages 5-7",
         questions: [
           "Which city gets more rain? How much more?",
           "What do you think it's like to live where it almost never rains?",
           "Why does Singapore have so many drains?"
         ]
       },
       {
         age: "Ages 8-10",
         questions: [
           "Singapore gets 24× more rain than Dubai. If Dubai needs 1 drain, how many might Singapore need?",
           "Both cities can flood. How is that possible when Dubai barely gets rain?",
           "How might climate change affect these cities differently?"
         ]
       }
     ]
   },
   {
     id: "quiz",
     title: "After the Quiz",
     icon: "📝",
     ageGroups: [
       {
         age: "All Ages",
         questions: [
           "Which question was hardest? Let's go back and explore that part.",
           "What's something new you learned today?",
           "If you could add one more question to the quiz, what would you ask?",
           "Who would you like to teach about St. Venant?"
         ]
       }
     ]
   }
 ];
 
 export const ExpandedDiscussionQuestions = () => {
   return (
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           💬 Discussion Questions
         </CardTitle>
         <p className="text-sm text-muted-foreground">
           Use these questions to deepen understanding after each activity. There are no wrong answers—encourage curiosity and observation!
         </p>
       </CardHeader>
       <CardContent>
         <Accordion type="single" collapsible className="w-full">
           {discussionSections.map((section) => (
             <AccordionItem key={section.id} value={section.id}>
               <AccordionTrigger className="text-left">
                 <div className="flex items-center gap-2">
                   <span className="text-xl">{section.icon}</span>
                   <span className="font-semibold">{section.title}</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="space-y-4 pt-2">
                 {section.ageGroups.map((group, groupIndex) => (
                   <div key={groupIndex} className="space-y-2">
                     <Badge variant="outline">{group.age}</Badge>
                     <ul className="space-y-2 pl-4">
                       {group.questions.map((question, qIndex) => (
                         <li key={qIndex} className="text-sm text-muted-foreground flex gap-2">
                           <span className="text-primary font-bold shrink-0">{qIndex + 1}.</span>
                           <span className="italic">"{question}"</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 ))}
               </AccordionContent>
             </AccordionItem>
           ))}
         </Accordion>
       </CardContent>
     </Card>
   );
 };