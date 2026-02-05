 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Baby, GraduationCap, Rocket } from "lucide-react";
 
 const ageGroups = [
   {
     id: "ages-5-7",
     label: "Ages 5-7",
     icon: Baby,
     subtitle: "Kindergarten - Grade 2",
     objectives: [
       "Understand that water flows downhill (gravity)",
       "Recognize that bumpy surfaces slow water down",
       "Know that drains help cities stay dry during rain",
       "Identify different surfaces (concrete, grass, forest)",
       "Describe the water cycle in simple terms"
     ],
     focusActivities: [
       "Water Race game (comparing smooth vs rough surfaces)",
       "Water Cycle animation",
       "Surface Roughness photo gallery"
     ]
   },
   {
     id: "ages-8-10",
     label: "Ages 8-10",
     icon: GraduationCap,
     subtitle: "Grades 3-5",
     objectives: [
       "Explain conservation of mass ('what goes in must come out')",
       "Predict how slope affects water velocity",
       "Compare flow rates across different surface types",
       "Understand why Singapore needs special drainage",
       "Use the Pipe Slope Simulator to make predictions",
       "Calculate simple relationships (steeper = faster)"
     ],
     focusActivities: [
       "Pipe Slope Simulator with predictions",
       "Quiz (aim for 5/6 or better)",
       "Singapore vs Dubai comparison"
     ]
   },
   {
     id: "ages-11-13",
     label: "Ages 11-13",
     icon: Rocket,
     subtitle: "Grades 6-8 (Extension)",
     objectives: [
       "Understand Manning's equation components (n, R, S)",
       "Explain hydraulic radius and why pipe size matters",
       "Connect the app to real engineering software (SWMM5)",
       "Discuss climate change and urban flooding",
       "Research their own city's drainage system"
     ],
     focusActivities: [
       "Research project on local drainage",
       "Compare app values to textbook Manning's n tables",
       "Design a drainage system for a hypothetical city"
     ]
   }
 ];
 
 export const LearningObjectivesByAge = () => {
   return (
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           🎯 Learning Objectives by Age
         </CardTitle>
       </CardHeader>
       <CardContent>
         <Tabs defaultValue="ages-5-7" className="w-full">
           <TabsList className="grid w-full grid-cols-3 mb-6">
             {ageGroups.map((group) => (
               <TabsTrigger key={group.id} value={group.id} className="text-xs sm:text-sm">
                 <group.icon className="w-4 h-4 mr-1 hidden sm:inline" />
                 {group.label}
               </TabsTrigger>
             ))}
           </TabsList>
           
           {ageGroups.map((group) => (
             <TabsContent key={group.id} value={group.id} className="space-y-4">
               <div className="text-sm text-muted-foreground font-medium mb-4">
                 {group.subtitle}
               </div>
               
               <div className="space-y-3">
                 <h4 className="font-semibold text-foreground">By the end, children will:</h4>
                 <ul className="space-y-2">
                   {group.objectives.map((objective, index) => (
                     <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                       <span className="text-primary">✅</span>
                       <span>{objective}</span>
                     </li>
                   ))}
                 </ul>
               </div>
               
               <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                 <h4 className="font-semibold text-foreground mb-2">Focus Activities:</h4>
                 <ul className="space-y-1">
                   {group.focusActivities.map((activity, index) => (
                     <li key={index} className="text-sm text-muted-foreground flex gap-2">
                       <span>•</span>
                       <span>{activity}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             </TabsContent>
           ))}
         </Tabs>
       </CardContent>
     </Card>
   );
 };