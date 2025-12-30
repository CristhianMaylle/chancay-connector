import { useAuth } from '@/contexts/AuthContext';
import { MetricCard } from '@/components/shared/MetricCard';
import { dashboardMetrics, mockTerrenos, mockDemandas, mockMatches } from '@/data/mockData';
import {
  MapPin,
  Building2,
  Handshake,
  Users,
  TrendingUp,
  DollarSign,
  UserCheck,
  Briefcase,
  ArrowRight,
  Bot,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function Dashboard() {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const quickActions = [
    { label: 'Registrar Terreno', path: '/terrenos', icon: MapPin, roles: ['propietario'] },
    { label: 'Ver Demandas', path: '/marketplace', icon: Briefcase, roles: ['propietario', 'empresa'] },
    { label: 'Analizar Viabilidad', path: '/ia-legal', icon: Bot, roles: ['propietario', 'empresa'] },
    { label: 'Ver Proveedores', path: '/proveedores', icon: Users, roles: ['propietario', 'empresa', 'proveedor'] },
    { label: 'Compliance ZEEP', path: '/compliance', icon: CheckCircle, roles: ['propietario', 'empresa'] },
    { label: 'Panel de Impacto', path: '/impacto', icon: TrendingUp, roles: ['admin'] },
  ].filter(action => user && action.roles.includes(user.role));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {getWelcomeMessage()}, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido al Hub Eco-Tecnológico Smart Chancay
          </p>
        </div>
        <div className="mvp-badge">
          <Bot className="h-4 w-4" />
          Datos Simulados - MVP
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Terrenos Registrados"
          value={dashboardMetrics.terrenosRegistrados}
          subtitle="En el ecosistema"
          icon={MapPin}
          trend={{ value: 12, label: 'vs mes anterior' }}
          variant="primary"
        />
        <MetricCard
          title="Terrenos Viables"
          value={dashboardMetrics.terrenosViables}
          subtitle="Semáforo verde"
          icon={CheckCircle}
          trend={{ value: 8, label: 'vs mes anterior' }}
        />
        <MetricCard
          title="Empresas Activas"
          value={dashboardMetrics.empresasActivas}
          subtitle="Buscando oportunidades"
          icon={Building2}
          trend={{ value: 15, label: 'vs mes anterior' }}
          variant="secondary"
        />
        <MetricCard
          title="Matches Realizados"
          value={dashboardMetrics.matchesRealizados}
          subtitle="Conexiones exitosas"
          icon={Handshake}
          trend={{ value: 23, label: 'vs mes anterior' }}
          variant="accent"
        />
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="card-elevated p-4 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-all group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Terrenos */}
        <section className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Mis Terrenos Recientes</h2>
            <Link to="/terrenos">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mockTerrenos.slice(0, 3).map((terreno) => (
              <div
                key={terreno.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{terreno.partida}</p>
                    <p className="text-xs text-muted-foreground">{terreno.ubicacion}</p>
                  </div>
                </div>
                <StatusBadge status={terreno.legalStatus} size="sm" />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Demands */}
        <section className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Demandas Activas</h2>
            <Link to="/marketplace">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todas <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mockDemandas.slice(0, 3).map((demanda) => (
              <div
                key={demanda.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Briefcase className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{demanda.tipo}</p>
                    <p className="text-xs text-muted-foreground">{demanda.empresaNombre}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {demanda.areaRequerida.toLocaleString()} m²
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Impact Summary */}
      <section className="card-elevated p-6 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <h2 className="text-lg font-semibold text-foreground mb-4">Impacto Proyectado del Ecosistema</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{dashboardMetrics.empleosProyectados.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Empleos Proyectados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary">{dashboardMetrics.inversionEstimada}</p>
            <p className="text-sm text-muted-foreground mt-1">Inversión Estimada</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">{dashboardMetrics.propietariosBeneficiados}</p>
            <p className="text-sm text-muted-foreground mt-1">Propietarios Beneficiados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{dashboardMetrics.proveedoresValidados}</p>
            <p className="text-sm text-muted-foreground mt-1">Proveedores Validados</p>
          </div>
        </div>
      </section>
    </div>
  );
}
