
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questionnaire from "./pages/Questionnaire";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AITutor from "./pages/AITutor";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
// Removing Articles imports to fix build errors
// import Articles from "./pages/Articles";
// import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient();

// We need this wrapper because AuthProvider needs to be inside Router
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai-tutor" element={<AITutor />} />
        <Route path="/community" element={<Community />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* Removing Articles routes to fix build errors */}
        {/* <Route path="/articles" element={<Articles />} /> */}
        {/* <Route path="/articles/:id" element={<ArticleDetail />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
