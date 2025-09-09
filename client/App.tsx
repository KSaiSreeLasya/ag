import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Advisory from "./pages/Advisory";
import Procurement from "./pages/Procurement";
import DigitalSolutions from "./pages/DigitalSolutions";
import Sectors from "./pages/Sectors";
import Resources from "./pages/Resources";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import GetQuote from "./pages/GetQuote";
import Solar from "./pages/Solar";
import Wind from "./pages/Wind";
import Storage from "./pages/Storage";
import EVStations from "./pages/EVStations";
import B2B from "./pages/B2B";
import B2C from "./pages/B2C";
import B2G from "./pages/B2G";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/digital-solutions" element={<DigitalSolutions />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/solutions/solar" element={<Solar />} />
          <Route path="/solutions/wind" element={<Wind />} />
          <Route path="/solutions/storage" element={<Storage />} />
          <Route path="/solutions/ev-stations" element={<EVStations />} />
          <Route path="/solutions/b2b" element={<B2B />} />
          <Route path="/solutions/b2c" element={<B2C />} />
          <Route path="/solutions/b2g" element={<B2G />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
