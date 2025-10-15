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

import Login from "./pages/login";
import Anomaly from "./pages/Anomaly";
import PriceManipulation from "./pages/PriceManipulation";
import DualVerification from "./pages/DualVerification";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          {/* Toast notifications */}
          <Toaster />
          <Sonner />

          {/* Routing */}
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Index />} />

              {/* Routes wrapped with Layout */}
              <Route element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="scanner" element={<Scanner />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="compliance" element={<Compliance />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="chat" element={<Chat />} />
                <Route path="anomaly" element={<Anomaly />} />
                <Route path="price-manipulation" element={<PriceManipulation />} />
                <Route path="dual-verification" element={<DualVerification />} />
              </Route>

              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
