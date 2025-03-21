
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ForecastPage from "./pages/ForecastPage";
import ClubsPage from "./pages/ClubsPage";
import ScorePage from "./pages/ScorePage";
import IframeTabPage from "./pages/IframeTabPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="forecast" element={<ForecastPage />} />
              <Route path="clubs" element={<ClubsPage />} />
              <Route path="score" element={<ScorePage />} />
              <Route path="external-dashboards" element={<IframeTabPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Redirect /club to /clubs for compatibility with old URLs */}
            <Route path="/club" element={<Navigate to="/clubs" replace />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
