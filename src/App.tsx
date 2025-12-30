import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Terrenos from "./pages/Terrenos";
import IALegal from "./pages/IALegal";
import Mapas from "./pages/Mapas";
import Marketplace from "./pages/Marketplace";
import Proveedores from "./pages/Proveedores";
import Compliance from "./pages/Compliance";
import Flujo from "./pages/Flujo";
import Trazabilidad from "./pages/Trazabilidad";
import Documentos from "./pages/Documentos";
import Gobernanza from "./pages/Gobernanza";
import Impacto from "./pages/Impacto";
import WhatsApp from "./pages/WhatsApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/terrenos" element={<ProtectedRoute><Terrenos /></ProtectedRoute>} />
        <Route path="/ia-legal" element={<ProtectedRoute><IALegal /></ProtectedRoute>} />
        <Route path="/mapas" element={<ProtectedRoute><Mapas /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
        <Route path="/proveedores" element={<ProtectedRoute><Proveedores /></ProtectedRoute>} />
        <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
        <Route path="/flujo" element={<ProtectedRoute><Flujo /></ProtectedRoute>} />
        <Route path="/trazabilidad" element={<ProtectedRoute><Trazabilidad /></ProtectedRoute>} />
        <Route path="/documentos" element={<ProtectedRoute><Documentos /></ProtectedRoute>} />
        <Route path="/gobernanza" element={<ProtectedRoute><Gobernanza /></ProtectedRoute>} />
        <Route path="/impacto" element={<ProtectedRoute><Impacto /></ProtectedRoute>} />
        <Route path="/whatsapp" element={<ProtectedRoute><WhatsApp /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
