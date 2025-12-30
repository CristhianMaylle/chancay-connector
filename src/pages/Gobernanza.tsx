import { dashboardMetrics, mockTerrenos, mockDemandas, mockProveedores } from '@/data/mockData';
import { MetricCard } from '@/components/shared/MetricCard';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Shield,
  Users,
  MapPin,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Bell,
  Settings,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const alerts = [
  { id: 1, tipo: 'warning', mensaje: '3 terrenos con análisis legal pendiente hace más de 7 días', fecha: new Date() },
  { id: 2, tipo: 'info', mensaje: '5 nuevas demandas registradas esta semana', fecha: new Date() },
  { id: 3, tipo: 'success', mensaje: '2 matches finalizados exitosamente', fecha: new Date() },
  { id: 4, tipo: 'warning', mensaje: '1 proveedor pendiente de validación CIP', fecha: new Date() },
];

export default function Gobernanza() {
  const terrenosVerdes = mockTerrenos.filter(t => t.legalStatus === 'verde').length;
  const terrenosAmarillos = mockTerrenos.filter(t => t.legalStatus === 'amarillo').length;
  const terrenosRojos = mockTerrenos.filter(t => t.legalStatus === 'rojo').length;

  const proveedoresValidados = mockProveedores.filter(p => p.validado).length;
  const proveedoresPendientes = mockProveedores.filter(p => !p.validado).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Gobernanza CIP Lima</h1>
          <p className="text-muted-foreground mt-1">
            Monitoreo y gestión del ecosistema Smart Chancay
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
          <Button size="sm" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Terrenos en Ecosistema"
          value={dashboardMetrics.terrenosRegistrados}
          subtitle="Total registrados"
          icon={MapPin}
          variant="primary"
        />
        <MetricCard
          title="Demandas Activas"
          value={mockDemandas.filter(d => d.estado === 'activa').length}
          subtitle="De empresas"
          icon={Briefcase}
        />
        <MetricCard
          title="Proveedores Validados"
          value={proveedoresValidados}
          subtitle={`${proveedoresPendientes} pendientes`}
          icon={Users}
          variant="accent"
        />
        <MetricCard
          title="Inversión Proyectada"
          value={dashboardMetrics.inversionEstimada}
          subtitle="En la ZEEP"
          icon={TrendingUp}
          variant="secondary"
        />
      </div>

      {/* Alerts */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Alertas y Notificaciones</h2>
          </div>
          <Button variant="ghost" size="sm">Ver todas</Button>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg animate-slide-up',
                alert.tipo === 'warning' ? 'bg-secondary/10' :
                alert.tipo === 'success' ? 'bg-accent/10' :
                'bg-muted/50'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {alert.tipo === 'warning' ? (
                <AlertTriangle className="h-5 w-5 text-secondary shrink-0" />
              ) : alert.tipo === 'success' ? (
                <CheckCircle className="h-5 w-5 text-accent shrink-0" />
              ) : (
                <Eye className="h-5 w-5 text-primary shrink-0" />
              )}
              <p className="text-sm text-foreground flex-1">{alert.mensaje}</p>
              <span className="text-xs text-muted-foreground">Hoy</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Terrenos by Status */}
        <div className="card-elevated p-6">
          <h2 className="font-semibold text-foreground mb-4">Estado de Terrenos</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-accent" />
                <span className="text-sm text-foreground">Viables (Verde)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full" 
                    style={{ width: `${(terrenosVerdes / mockTerrenos.length) * 100}%` }} 
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{terrenosVerdes}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-secondary" />
                <span className="text-sm text-foreground">Revisar (Amarillo)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full" 
                    style={{ width: `${(terrenosAmarillos / mockTerrenos.length) * 100}%` }} 
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{terrenosAmarillos}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-destructive" />
                <span className="text-sm text-foreground">No Viables (Rojo)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-destructive rounded-full" 
                    style={{ width: `${(terrenosRojos / mockTerrenos.length) * 100}%` }} 
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{terrenosRojos}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Providers Status */}
        <div className="card-elevated p-6">
          <h2 className="font-semibold text-foreground mb-4">Estado de Proveedores</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Validados CIP</p>
                  <p className="text-sm text-muted-foreground">Habilitados para ofrecer servicios</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-accent">{proveedoresValidados}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-medium text-foreground">Pendientes de Validación</p>
                  <p className="text-sm text-muted-foreground">En revisión por el CIP</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-secondary">{proveedoresPendientes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role CIP */}
      <div className="card-elevated p-6 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-lg mb-2">Rol Articulador del CIP Lima</h2>
            <p className="text-muted-foreground mb-4">
              Como entidad articuladora, el CIP Lima facilita la conexión entre propietarios, empresas y proveedores,
              garantizando transparencia, validación profesional y cumplimiento de la normativa ZEEP.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border">
                <p className="text-3xl font-bold text-primary">{dashboardMetrics.matchesRealizados}</p>
                <p className="text-sm text-muted-foreground">Matches facilitados</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border">
                <p className="text-3xl font-bold text-accent">{proveedoresValidados}</p>
                <p className="text-sm text-muted-foreground">Proveedores validados</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border">
                <p className="text-3xl font-bold text-secondary">{dashboardMetrics.propietariosBeneficiados}</p>
                <p className="text-sm text-muted-foreground">Propietarios beneficiados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
