 import { Navbar } from "@/components/Navbar";
 import { Footer } from "@/components/Footer";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { GraduationCap, Lightbulb, Globe, Droplets } from "lucide-react";
 import { LearningObjectivesByAge } from "@/components/parents-guide/LearningObjectivesByAge";
 import { CurriculumConnections } from "@/components/parents-guide/CurriculumConnections";
 import { ExpandedDiscussionQuestions } from "@/components/parents-guide/ExpandedDiscussionQuestions";
 import { ExtensionActivities } from "@/components/parents-guide/ExtensionActivities";
 import { FacilitationTips } from "@/components/parents-guide/FacilitationTips";
 import { VocabularyGlossary } from "@/components/parents-guide/VocabularyGlossary";
 
 interface RealWorldConnection {
   title: string;
   content: string;
   examples?: string[];
   careers?: { emoji: string; role: string; desc: string }[];
   stats?: string[];
 }
 
 const realWorldConnections: RealWorldConnection[] = [
   {
     title: "Climate Change & Resilience",
     content: "As weather patterns become more extreme, understanding stormwater management is increasingly critical. The concepts children learn here—flow capacity, system design, overflow prevention—are exactly what cities worldwide are grappling with.",
     examples: ["2024 Dubai floods: 2 years of rain in 24 hours", "Singapore flash floods: Intense monsoon overwhelms drains", "European floods 2021: Engineering limits tested"]
   },
   {
     title: "STEM Career Pathways",
     content: "Children who engage with this app are getting their first exposure to concepts used by professionals worldwide.",
     careers: [
       { emoji: "👷", role: "Civil Engineers", desc: "Design drainage systems" },
       { emoji: "🌊", role: "Hydrologists", desc: "Study water movement" },
       { emoji: "🏙️", role: "Urban Planners", desc: "Design flood-resistant cities" },
       { emoji: "🌿", role: "Environmental Scientists", desc: "Protect water quality" },
       { emoji: "💻", role: "Software Engineers", desc: "Build tools like SWMM5" }
     ]
   },
   {
     title: "Singapore's World-Class System",
     content: "Singapore's drainage system is considered one of the best in the world. PUB (Public Utilities Board) manages:",
     stats: ["8,000+ km of drains and canals", "17 reservoirs", "The Marina Barrage (engineering marvel!)", "Extensive flood monitoring networks"]
   }
 ];
 
 const ParentsGuide = () => {
   return (
     <>
       <Navbar />
       <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
         {/* Decorative water drops */}
         <div className="absolute top-32 left-10 opacity-10">
           <Droplets className="w-24 h-24 text-primary" />
         </div>
         <div className="absolute top-64 right-10 opacity-10">
           <Droplets className="w-16 h-16 text-primary" />
         </div>
         
         <div className="container mx-auto px-6 max-w-4xl">
           {/* Header */}
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
               <GraduationCap className="w-4 h-4" />
               For Parents & Teachers
             </div>
             <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
               Parent & Teacher Guide
             </h1>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               A comprehensive educational toolkit to facilitate learning and spark meaningful 
               conversations about water science, engineering, and environmental stewardship.
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
                 This interactive experience introduces children to <strong>REAL engineering concepts</strong> used 
                 by professionals worldwide. The underlying math—the St. Venant equations—is the same used to 
                 design Singapore's drainage system.
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
 
           {/* Main Content Tabs */}
           <Tabs defaultValue="objectives" className="mb-8">
             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
               <TabsTrigger value="objectives">Learning</TabsTrigger>
               <TabsTrigger value="discussion">Discussion</TabsTrigger>
               <TabsTrigger value="activities">Activities</TabsTrigger>
               <TabsTrigger value="resources">Resources</TabsTrigger>
             </TabsList>
             
             <TabsContent value="objectives" className="space-y-6">
               <LearningObjectivesByAge />
               <CurriculumConnections />
             </TabsContent>
             
             <TabsContent value="discussion" className="space-y-6">
               <ExpandedDiscussionQuestions />
             </TabsContent>
             
             <TabsContent value="activities" className="space-y-6">
               <ExtensionActivities />
             </TabsContent>
             
             <TabsContent value="resources" className="space-y-6">
               <FacilitationTips />
               <VocabularyGlossary />
             </TabsContent>
           </Tabs>
 
           {/* Real-World Connections */}
           <Card className="mb-8">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <Globe className="w-5 h-5 text-primary" />
                 Why This Matters
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
               {realWorldConnections.map((connection, index) => (
                 <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                   <h3 className="font-semibold text-foreground mb-2">{connection.title}</h3>
                   <p className="text-muted-foreground text-sm">{connection.content}</p>
                   
                   {connection.examples && (
                     <div className="mt-3 space-y-1">
                       <p className="text-xs font-medium text-foreground">Recent Examples:</p>
                       <ul className="text-xs text-muted-foreground">
                         {connection.examples.map((ex, i) => (
                           <li key={i}>• {ex}</li>
                         ))}
                       </ul>
                     </div>
                   )}
                   
                   {connection.careers && (
                     <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                       {connection.careers.map((career, i) => (
                         <div key={i} className="text-xs">
                           <span>{career.emoji}</span> <strong>{career.role}</strong>
                           <div className="text-muted-foreground">{career.desc}</div>
                         </div>
                       ))}
                     </div>
                   )}
                   
                   {connection.stats && (
                     <ul className="mt-3 text-xs text-muted-foreground">
                       {connection.stats.map((stat, i) => (
                         <li key={i}>• {stat}</li>
                       ))}
                     </ul>
                   )}
                 </div>
               ))}
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