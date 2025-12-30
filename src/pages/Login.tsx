import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { Building2, User, Briefcase, Shield, ArrowRight, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles: { role: UserRole; label: string; description: string; icon: typeof User }[] = [
  {
    role: 'propietario',
    label: 'Propietario de Terreno',
    description: 'Evalúa, registra y conecta tu terreno con inversionistas',
    icon: User,
  },
  {
    role: 'empresa',
    label: 'Empresa / Inversionista',
    description: 'Encuentra terrenos y oportunidades en la ZEEP Chancay',
    icon: Briefcase,
  },
  {
    role: 'proveedor',
    label: 'Proveedor de Servicios',
    description: 'Ofrece servicios legales, técnicos y profesionales',
    icon: Building2,
  },
  {
    role: 'admin',
    label: 'Administrador CIP Lima',
    description: 'Gestiona y monitorea el ecosistema Smart Chancay',
    icon: Shield,
  },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-2xl">SC</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Smart Chancay
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hub Eco-Tecnológico con IA para la articulación de oportunidades en la ZEEP Chancay
          </p>
          <div className="mt-4 inline-flex items-center gap-2 mvp-badge">
            <Bot className="h-4 w-4" />
            MVP Demostrativo - CIP Lima
          </div>
        </header>

        {/* Role Selection */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          <div className="w-full space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-center text-foreground mb-6">
              Selecciona tu perfil para continuar
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((item, index) => {
                const Icon = item.icon;
                const isSelected = selectedRole === item.role;

                return (
                  <button
                    key={item.role}
                    onClick={() => setSelectedRole(item.role)}
                    className={cn(
                      'p-6 rounded-xl border-2 text-left transition-all duration-300 animate-slide-up',
                      'hover:shadow-lg hover:border-primary/50',
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border bg-card hover:bg-card/80'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'p-3 rounded-xl transition-colors',
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleLogin}
            disabled={!selectedRole}
            className="gap-2 h-14 px-10 text-lg"
          >
            Ingresar al Sistema
            <ArrowRight className="h-5 w-5" />
          </Button>

          <p className="mt-6 text-sm text-muted-foreground text-center max-w-md">
            Este es un MVP demostrativo. Los datos mostrados son simulados para fines de presentación.
          </p>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p>© 2024 Colegio de Ingenieros del Perú - CD Lima</p>
          <p className="mt-1">Ley N° 32449 - ZEEP Chancay</p>
        </footer>
      </div>
    </div>
  );
}
