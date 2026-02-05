 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 import { Badge } from "@/components/ui/badge";
 
 const activities = [
   {
     id: "kitchen-slope",
     title: "Kitchen Slope Experiment",
     icon: "🏠",
     difficulty: "Easy",
     time: "15 minutes",
     materials: [
       "Baking tray or cutting board",
       "Books (to prop up one end)",
       "Water and food coloring",
       "Timer (phone works great!)",
       "Ruler"
     ],
     instructions: [
       "Place the tray flat. Put a drop of colored water at one end.",
       "Time how long it takes to reach the other end (or does it move?)",
       "Put ONE book under one end. Time again.",
       "Put TWO books under. Time again.",
       "Record your results!"
     ],
     discussion: [
       "This is just like the Pipe Slope Simulator! What did we learn?",
       "Can you predict what THREE books would do?"
     ]
   },
   {
     id: "roughness-race",
     title: "Roughness Race (Outdoor)",
     icon: "🌿",
     difficulty: "Easy",
     time: "20 minutes",
     materials: [
       "Watering can or hose with gentle spray",
       "Access to different surfaces (driveway, grass, mulch, etc.)",
       "Notebook and pencil",
       "Camera (optional - for documentation)"
     ],
     instructions: [
       "Find 3-4 different surfaces around your home or park",
       "Pour the same amount of water on each surface",
       "Observe: Does water pool? Run off? Soak in?",
       "Rank surfaces from 'fastest runoff' to 'slowest runoff'",
       "Compare your ranking to the app's Manning's n values!"
     ],
     surfaceTable: [
       { surface: "Concrete", nValue: "0.013" },
       { surface: "Asphalt", nValue: "0.016" },
       { surface: "Short grass", nValue: "0.035" },
       { surface: "Mulch/leaves", nValue: "~0.05" },
       { surface: "Gravel", nValue: "0.025" }
     ]
   },
   {
     id: "rain-gauge",
     title: "Rain Gauge Project",
     icon: "🌧️",
     difficulty: "Medium",
     time: "2 weeks (ongoing)",
     materials: [
       "Clear plastic bottle (cut off top)",
       "Ruler",
       "Permanent marker",
       "Notebook for daily recording"
     ],
     instructions: [
       "Cut the top off a plastic bottle, invert it as a funnel",
       "Mark measurements on the side (every 5mm works well)",
       "Place outside away from buildings/trees",
       "Check and record rainfall daily for 2 weeks",
       "Calculate your total and compare to Singapore's average!"
     ],
     comparison: {
       title: "Singapore Monthly Averages:",
       data: ["January: 234mm", "April: 179mm", "July: 158mm", "December: 287mm"]
     }
   },
   {
     id: "drain-hunt",
     title: "Neighborhood Drain Hunt",
     icon: "🗺️",
     difficulty: "Easy",
     time: "30-45 minutes",
     materials: [
       "Camera (phone is perfect)",
       "Notebook and pencil",
       "Safe walking shoes",
       "Adult supervision required!"
     ],
     checklist: [
       "Storm drain grate (usually on street corners)",
       "Concrete channel (along roads or in parks)",
       "Grass swale (grassy ditch that carries water)",
       "Culvert (pipe under a road or path)",
       "Detention pond (holds water during storms)",
       "Rain garden (planted area that absorbs water)"
     ],
     afterHunt: [
       "Count how many of each type you found",
       "Which was most common? Why do you think?",
       "Locate them on a map - do they connect?",
       "Predict: Where does the water go when it enters each drain?"
     ]
   },
   {
     id: "model-drainage",
     title: "Build a Model Drainage System",
     icon: "🏗️",
     difficulty: "Advanced",
     time: "1 hour",
     materials: [
       "Large shallow container (storage bin lid works great)",
       "Modeling clay or playdough",
       "Plastic straws (cut in half for pipes)",
       "Small container for 'reservoir' at outlet",
       "Spray bottle to simulate rain",
       "Food coloring (to see water flow clearly)"
     ],
     instructions: [
       "Create 'terrain' with clay - include hills and a valley",
       "Build 'roads' by pressing flat paths into the clay",
       "Cut straws and embed them as underground pipes",
       "Add an outlet that drains to your 'reservoir'",
       "Spray water as 'rain' and watch where it goes!",
       "Modify your design if water doesn't drain properly"
     ],
     challenges: [
       "Can you prevent flooding in the 'valley'?",
       "What happens if you block one pipe?",
       "How can you slow down water before it reaches the outlet?"
     ]
   }
 ];
 
 export const ExtensionActivities = () => {
   return (
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           🔬 Hands-On Extension Activities
         </CardTitle>
         <p className="text-sm text-muted-foreground mt-2">
           Take learning beyond the screen with these real-world experiments!
         </p>
       </CardHeader>
       <CardContent>
         <Accordion type="single" collapsible className="w-full">
           {activities.map((activity) => (
             <AccordionItem key={activity.id} value={activity.id}>
               <AccordionTrigger className="text-left">
                 <div className="flex items-center gap-3">
                   <span className="text-2xl">{activity.icon}</span>
                   <span className="font-semibold">{activity.title}</span>
                   <Badge variant="outline" className="ml-2 hidden sm:inline-flex">
                     {activity.time}
                   </Badge>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="space-y-4 pt-2">
                 <div className="flex gap-2">
                   <Badge variant="secondary">{activity.difficulty}</Badge>
                   <Badge variant="outline">{activity.time}</Badge>
                 </div>
                 
                 <div>
                   <h4 className="font-semibold mb-2">Materials:</h4>
                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                     {activity.materials.map((item, index) => (
                       <li key={index} className="text-sm text-muted-foreground flex gap-2">
                         <span>•</span>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 
                 {activity.instructions && (
                   <div>
                     <h4 className="font-semibold mb-2">Instructions:</h4>
                     <ol className="space-y-1">
                       {activity.instructions.map((step, index) => (
                         <li key={index} className="text-sm text-muted-foreground flex gap-2">
                           <span className="text-primary font-bold">{index + 1}.</span>
                           <span>{step}</span>
                         </li>
                       ))}
                     </ol>
                   </div>
                 )}
                 
                 {activity.checklist && (
                   <div>
                     <h4 className="font-semibold mb-2">Find These:</h4>
                     <ul className="space-y-1">
                       {activity.checklist.map((item, index) => (
                         <li key={index} className="text-sm text-muted-foreground flex gap-2">
                           <span>☐</span>
                           <span>{item}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
                 
                 {activity.surfaceTable && (
                   <div className="bg-secondary/30 p-3 rounded-lg">
                     <h4 className="font-semibold mb-2">Compare Your Results:</h4>
                     <div className="grid grid-cols-2 gap-2 text-sm">
                       {activity.surfaceTable.map((row, index) => (
                         <div key={index} className="flex justify-between">
                           <span>{row.surface}</span>
                           <span className="text-muted-foreground">n = {row.nValue}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
                 
                 {activity.challenges && (
                   <div className="bg-primary/5 p-3 rounded-lg">
                     <h4 className="font-semibold mb-2">Engineering Challenges:</h4>
                     <ul className="space-y-1">
                       {activity.challenges.map((challenge, index) => (
                         <li key={index} className="text-sm text-muted-foreground flex gap-2">
                           <span>⚡</span>
                           <span>{challenge}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
                 
                 {activity.discussion && (
                   <div className="bg-accent/10 p-3 rounded-lg">
                     <h4 className="font-semibold mb-2">Discussion:</h4>
                     <ul className="space-y-1">
                       {activity.discussion.map((q, index) => (
                         <li key={index} className="text-sm text-muted-foreground italic">
                           "{q}"
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
                 
                 {activity.afterHunt && (
                   <div>
                     <h4 className="font-semibold mb-2">After the Hunt:</h4>
                     <ul className="space-y-1">
                       {activity.afterHunt.map((item, index) => (
                         <li key={index} className="text-sm text-muted-foreground flex gap-2">
                           <span>•</span>
                           <span>{item}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
               </AccordionContent>
             </AccordionItem>
           ))}
         </Accordion>
       </CardContent>
     </Card>
   );
 };