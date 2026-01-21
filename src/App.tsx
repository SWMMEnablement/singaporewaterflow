import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GrownUpModeProvider } from "@/contexts/GrownUpModeContext";
import Index from "./pages/Index";
import Glossary from "./pages/Glossary";
import ColoringPage from "./pages/ColoringPage";
import BuildDrain from "./pages/BuildDrain";
import StormChallenge from "./pages/StormChallenge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GrownUpModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/coloring" element={<ColoringPage />} />
            <Route path="/build-drain" element={<BuildDrain />} />
            <Route path="/storm-challenge" element={<StormChallenge />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GrownUpModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
