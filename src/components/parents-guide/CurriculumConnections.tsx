 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
 
 const singaporeMOE = [
   { subject: "Science P3-P4", topics: ["Water cycle", "Properties of materials (rough/smooth)", "Effects of forces (gravity)"] },
   { subject: "Science P5-P6", topics: ["Water and the environment", "Conservation of resources", "Man's impact on environment"] },
   { subject: "Math P3-P4", topics: ["Reading scales and measurements", "Comparing quantities (faster/slower)", "Percentages (rainfall comparison)"] },
   { subject: "Math P5-P6", topics: ["Rate and speed concepts", "Ratio (Singapore vs Dubai rainfall)", "Reading graphs and charts"] },
   { subject: "Social Studies", topics: ["Singapore's development", "Managing limited resources", "Infrastructure and urban planning"] }
 ];
 
 const ngssStandards = [
   "3-ESS2-1: Represent data about weather conditions",
   "4-ESS2-1: Make observations of Earth's physical features",
   "5-ESS2-1: Describe ways the hydrosphere interacts with systems",
   "MS-ESS2-4: Develop a model to describe water cycling",
   "MS-ETS1-4: Develop a model to generate data for testing"
 ];
 
 const ukCurriculum = {
   ks2Science: [
     "States of matter (water cycle)",
     "Forces (gravity effects on water flow)",
     "Properties of materials"
   ],
   ks2Geography: [
     "Physical geography: rivers, water cycle, climate zones",
     "Human geography: land use, economic activity"
   ]
 };
 
 export const CurriculumConnections = () => {
   return (
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           🏫 Curriculum Connections
         </CardTitle>
       </CardHeader>
       <CardContent>
         <Accordion type="single" collapsible className="w-full">
           <AccordionItem value="singapore">
             <AccordionTrigger className="text-left">
               <span className="flex items-center gap-2">
                 🇸🇬 Singapore MOE Syllabus
               </span>
             </AccordionTrigger>
             <AccordionContent>
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead className="w-1/3">Subject</TableHead>
                     <TableHead>Topics Covered</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {singaporeMOE.map((row, index) => (
                     <TableRow key={index}>
                       <TableCell className="font-medium">{row.subject}</TableCell>
                       <TableCell>
                         <ul className="list-disc list-inside text-sm text-muted-foreground">
                           {row.topics.map((topic, i) => (
                             <li key={i}>{topic}</li>
                           ))}
                         </ul>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </AccordionContent>
           </AccordionItem>
           
           <AccordionItem value="ngss">
             <AccordionTrigger className="text-left">
               <span className="flex items-center gap-2">
                 🇺🇸 NGSS (US) Standards
               </span>
             </AccordionTrigger>
             <AccordionContent>
               <ul className="space-y-2">
                 {ngssStandards.map((standard, index) => (
                   <li key={index} className="text-sm text-muted-foreground flex gap-2">
                     <span className="text-primary font-bold">•</span>
                     <span>{standard}</span>
                   </li>
                 ))}
               </ul>
             </AccordionContent>
           </AccordionItem>
           
           <AccordionItem value="uk">
             <AccordionTrigger className="text-left">
               <span className="flex items-center gap-2">
                 🇬🇧 UK National Curriculum
               </span>
             </AccordionTrigger>
             <AccordionContent>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold mb-2">KS2 Science:</h4>
                   <ul className="space-y-1">
                     {ukCurriculum.ks2Science.map((item, index) => (
                       <li key={index} className="text-sm text-muted-foreground flex gap-2">
                         <span>•</span>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold mb-2">KS2 Geography:</h4>
                   <ul className="space-y-1">
                     {ukCurriculum.ks2Geography.map((item, index) => (
                       <li key={index} className="text-sm text-muted-foreground flex gap-2">
                         <span>•</span>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             </AccordionContent>
           </AccordionItem>
         </Accordion>
       </CardContent>
     </Card>
   );
 };