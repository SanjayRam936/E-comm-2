import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Complaints from "./pages/Complaints";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Anomaly from "./pages/Anomaly";
import PriceManipulation from "./pages/PriceManipulation";
import DualVerification from "./pages/DualVerification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="anomaly" element={<Anomaly />} />
              <Route path="scanner" element={<Scanner />} />
              <Route path="price-manipulation" element={<PriceManipulation />} />
              <Route path="dual-verification" element={<DualVerification />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="chat" element={<Chat />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
