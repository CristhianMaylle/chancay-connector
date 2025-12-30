import { dashboardMetrics } from '@/data/mockData';
import { MetricCard } from '@/components/shared/MetricCard';
import {
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  Heart,
  Globe,
  Leaf,
  Award,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const impactMetrics = [
  {
    category: 'Impacto Social',
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    metrics: [
      { label: 'Empleos Directos Proyectados', value: '12,500', trend: '+15%' },
      { label: 'Empleos Indirectos Estimados', value: '37,500', trend: '+12%' },
      { label: 'Familias Beneficiadas', value: '8,420', trend: '+20%' },
      { label: 'Propietarios Formalizados', value: '124', trend: '+8%' },
    ],
  },
  {
    category: 'Impacto Económico',
    icon: TrendingUp,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    metrics: [
      { label: 'Inversión Atraída', value: 'USD 450M', trend: '+25%' },
      { label: 'PBI Regional Estimado', value: '+3.2%', trend: '+0.5%' },
      { label: 'Recaudación Proyectada', value: 'S/ 85M', trend: '+18%' },
      { label: 'Nuevas Empresas', value: '34', trend: '+40%' },
    ],
  },
  {
    category: 'Inclusión',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    metrics: [
      { label: 'Pequeños Propietarios Atendidos', value: '89', trend: '+30%' },
      { label: 'Mujeres Propietarias', value: '34%', trend: '+5%' },
      { label: 'Comunidades Beneficiadas', value: '12', trend: '+3' },
      { label: 'MYPES Proveedoras', value: '28', trend: '+45%' },
    ],
  },
];

const objetivosZeep = [
  { objetivo: 'Formalización de terrenos', meta: 200, actual: 156, porcentaje: 78 },
  { objetivo: 'Empresas atraídas', meta: 50, actual: 34, porcentaje: 68 },
  { objetivo: 'Matches exitosos', meta: 100, actual: 67, porcentaje: 67 },
  { objetivo: 'Proveedores validados', meta: 40, actual: 28, porcentaje: 70 },
];

export default function Impacto() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Panel de Impacto</h1>
        <p className="text-muted-foreground mt-1">
          Indicadores de impacto social, económico e inclusivo del ecosistema Smart Chancay
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Empleos Proyectados"
          value="12,500"
          subtitle="Directos e indirectos"
          icon={Users}
          variant="primary"
        />
        <MetricCard
          title="Inversión Estimada"
          value="USD 450M"
          subtitle="En la ZEEP Chancay"
          icon={TrendingUp}
          variant="secondary"
        />
        <MetricCard
          title="Propietarios Beneficiados"
          value={dashboardMetrics.propietariosBeneficiados}
          subtitle="Formalizados"
          icon={Award}
          variant="accent"
        />
        <MetricCard
          title="Comunidades"
          value="12"
          subtitle="Impactadas positivamente"
          icon={Globe}
        />
      </div>

      {/* Impact Categories */}
      <div className="grid lg:grid-cols-3 gap-6">
        {impactMetrics.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <div
              key={category.category}
              className="card-elevated p-6 animate-slide-up"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={cn('p-3 rounded-xl', category.bg)}>
                  <Icon className={cn('h-6 w-6', category.color)} />
                </div>
                <h2 className="font-semibold text-foreground">{category.category}</h2>
              </div>
              <div className="space-y-4">
                {category.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="font-bold text-foreground text-lg">{metric.value}</p>
                    </div>
                    <span className="text-sm font-medium text-accent">{metric.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ZEEP Objectives */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="font-semibold text-foreground text-lg">Objetivos ZEEP - Avance Anual</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {objetivosZeep.map((obj, index) => (
            <div
              key={obj.objetivo}
              className="p-4 rounded-lg bg-muted/50 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">{obj.objetivo}</p>
                <span className="text-sm font-semibold text-primary">{obj.porcentaje}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                  style={{ width: `${obj.porcentaje}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Actual: {obj.actual}</span>
                <span>Meta: {obj.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability */}
      <div className="card-elevated p-6 bg-gradient-to-r from-accent/5 via-background to-primary/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/10">
            <Leaf className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-lg mb-2">Impacto Ambiental Positivo</h2>
            <p className="text-muted-foreground mb-4">
              El Hub Smart Chancay promueve el desarrollo sostenible, priorizando proyectos con certificaciones 
              ambientales y fomentando prácticas eco-amigables en la ZEEP.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border">
                <p className="text-2xl font-bold text-accent">15</p>
                <p className="text-sm text-muted-foreground">Proyectos con EIA aprobado</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border">
                <p className="text-2xl font-bold text-accent">8</p>
                <p className="text-sm text-muted-foreground">Con certificación verde</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border">
                <p className="text-2xl font-bold text-accent">45%</p>
                <p className="text-sm text-muted-foreground">Reducción huella carbono</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">
          * Los datos mostrados son proyecciones simuladas para fines demostrativos del MVP
        </p>
      </div>
    </div>
  );
}
