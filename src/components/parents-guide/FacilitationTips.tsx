 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
 const parentTips = {
   dos: [
     "Let children explore freely first—they'll discover naturally",
     "Ask 'what do you think will happen?' BEFORE they try something",
     "Connect to their everyday experiences ('Remember when...')",
     "Celebrate predictions, even wrong ones ('Good hypothesis!')",
     "Take learning outside—find real drains on walks"
   ],
   donts: [
     "Explaining everything before they explore",
     "Rushing through to 'finish' the app",
     "Focusing only on getting quiz answers right",
     "Dismissing 'wrong' ideas without discussion"
   ]
 };
 
 const teacherTips = {
   setup: [
     "Works on tablets, Chromebooks, and computers",
     "Best as individual or paired exploration (not whole-class demo)",
     "Allow 30-45 minutes for full exploration",
     "15-20 minutes for focused lesson on specific simulator"
   ],
   integration: [
     "Science: Water cycle unit (use app for review/extension)",
     "Math: Ratios and percentages (Singapore vs Dubai comparison)",
     "Social Studies: Urban planning and infrastructure",
     "Language Arts: Write explanation of how drains work"
   ],
   assessment: [
     "Screenshot predictions vs. results from simulators",
     "Drain Hunt photo essay with captions",
     "Quiz score (built into app)",
     "Design challenge: Draw a drainage system for a park"
   ]
 };
 
 const abilityLevels = {
   struggling: [
     "Focus on Water Race game (visual, competitive, clear outcomes)",
     "Use the real-world photos as conversation starters",
     "Skip the equations—focus on cause and effect",
     "Pair with supportive peer"
   ],
   advanced: [
     "Challenge: 'Find all the Manning's n values and rank them'",
     "Extension: Research actual Singapore PUB drainage projects",
     "Calculate: How many liters fall on a 10m² roof in Singapore/year?",
     "Design: Create their own drainage challenge scenario"
   ],
   ell: [
     "Visual simulators are universally accessible",
     "Use photos to build vocabulary",
     "Pair with fluent speaker for discussion questions",
     "Simple sentence frames: 'When the slope increases, the water...'"
   ]
 };
 
 export const FacilitationTips = () => {
   return (
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           💡 Facilitation Tips
         </CardTitle>
       </CardHeader>
       <CardContent>
         <Tabs defaultValue="parents" className="w-full">
           <TabsList className="grid w-full grid-cols-3 mb-6">
             <TabsTrigger value="parents">For Parents</TabsTrigger>
             <TabsTrigger value="teachers">For Teachers</TabsTrigger>
             <TabsTrigger value="differentiation">Differentiation</TabsTrigger>
           </TabsList>
           
           <TabsContent value="parents" className="space-y-6">
             <div>
               <h4 className="font-semibold text-primary mb-3">✅ DO:</h4>
               <ul className="space-y-2">
                 {parentTips.dos.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span className="text-primary">•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div>
               <h4 className="font-semibold text-destructive mb-3">❌ AVOID:</h4>
               <ul className="space-y-2">
                 {parentTips.donts.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span className="text-destructive">•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </TabsContent>
           
           <TabsContent value="teachers" className="space-y-6">
             <div>
               <h4 className="font-semibold mb-3">🖥️ Classroom Setup:</h4>
               <ul className="space-y-2">
                 {teacherTips.setup.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span>•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div>
               <h4 className="font-semibold mb-3">🔗 Integration Ideas:</h4>
               <ul className="space-y-2">
                 {teacherTips.integration.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span>•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div>
               <h4 className="font-semibold mb-3">📝 Assessment Ideas:</h4>
               <ul className="space-y-2">
                 {teacherTips.assessment.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span>•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </TabsContent>
           
           <TabsContent value="differentiation" className="space-y-6">
             <div className="p-4 bg-secondary/30 rounded-lg">
               <h4 className="font-semibold mb-3">📚 Struggling Learners:</h4>
               <ul className="space-y-2">
                 {abilityLevels.struggling.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span>•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div className="p-4 bg-primary/5 rounded-lg">
               <h4 className="font-semibold mb-3">🚀 Advanced Learners:</h4>
               <ul className="space-y-2">
                 {abilityLevels.advanced.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span>•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div className="p-4 bg-accent/10 rounded-lg">
               <h4 className="font-semibold mb-3">🌍 English Language Learners:</h4>
               <ul className="space-y-2">
                 {abilityLevels.ell.map((tip, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span>•</span>
                     <span>{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </TabsContent>
         </Tabs>
       </CardContent>
     </Card>
   );
 };