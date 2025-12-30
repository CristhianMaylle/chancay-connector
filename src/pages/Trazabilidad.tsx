import { mockTerrenos } from '@/data/mockData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  CheckCircle,
  Circle,
  MapPin,
  ArrowRight,
  Calendar,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  fecha: Date;
  titulo: string;
  descripcion: string;
  estado: 'completado' | 'en_progreso' | 'pendiente';
}

const mockTimeline: TimelineEvent[] = [
  {
    id: '1',
    fecha: new Date('2024-01-15'),
    titulo: 'Terreno Registrado',
    descripcion: 'Datos básicos ingresados al sistema',
    estado: 'completado',
  },
  {
    id: '2',
    fecha: new Date('2024-01-16'),
    titulo: 'Análisis Legal Iniciado',
    descripcion: 'IA procesando partida registral',
    estado: 'completado',
  },
  {
    id: '3',
    fecha: new Date('2024-01-17'),
    titulo: 'Viabilidad Confirmada',
    descripcion: 'Semáforo verde - Terreno apto para transacciones',
    estado: 'completado',
  },
  {
    id: '4',
    fecha: new Date('2024-01-20'),
    titulo: 'Publicado en Marketplace',
    descripcion: 'Terreno visible para empresas e inversionistas',
    estado: 'completado',
  },
  {
    id: '5',
    fecha: new Date('2024-02-01'),
    titulo: 'Match Sugerido',
    descripcion: 'Compatibilidad del 92% con demanda activa',
    estado: 'en_progreso',
  },
  {
    id: '6',
    fecha: new Date(),
    titulo: 'En Negociación',
    descripcion: 'Contacto inicial con empresa interesada',
    estado: 'pendiente',
  },
];

export default function Trazabilidad() {
  const terreno = mockTerrenos[0]; // Use first terreno as example

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trazabilidad del Proceso</h1>
        <p className="text-muted-foreground mt-1">
          Seguimiento visual del estado de cada terreno o proyecto
        </p>
      </div>

      {/* Terreno Info */}
      <div className="card-elevated p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{terreno.partida}</h2>
              <p className="text-sm text-muted-foreground">{terreno.ubicacion}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={terreno.legalStatus} />
            <Button variant="outline" size="sm">
              Ver Detalle
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-foreground mb-4">Estado General</h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
              style={{ width: '70%' }}
            />
          </div>
          <span className="text-sm font-semibold text-foreground">70%</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
          {['Registrado', 'Analizado', 'Compatible', 'En Matching', 'Formalizado'].map((estado, index) => {
            const isCompleted = index < 3;
            const isCurrent = index === 3;

            return (
              <div
                key={estado}
                className={cn(
                  'p-3 rounded-lg',
                  isCompleted ? 'bg-accent/10' :
                  isCurrent ? 'bg-primary/10' :
                  'bg-muted/50'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center',
                  isCompleted ? 'bg-accent text-accent-foreground' :
                  isCurrent ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                )}>
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>
                <p className={cn(
                  'font-medium',
                  isCompleted ? 'text-accent' :
                  isCurrent ? 'text-primary' :
                  'text-muted-foreground'
                )}>
                  {estado}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Línea de Tiempo</h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {mockTimeline.map((event, index) => (
              <div
                key={event.id}
                className="relative pl-12 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Dot */}
                <div className={cn(
                  'absolute left-2 w-5 h-5 rounded-full flex items-center justify-center',
                  event.estado === 'completado' ? 'bg-accent' :
                  event.estado === 'en_progreso' ? 'bg-primary animate-pulse' :
                  'bg-muted'
                )}>
                  {event.estado === 'completado' ? (
                    <CheckCircle className="h-3 w-3 text-accent-foreground" />
                  ) : event.estado === 'en_progreso' ? (
                    <Clock className="h-3 w-3 text-primary-foreground" />
                  ) : (
                    <Circle className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className={cn(
                  'p-4 rounded-lg border',
                  event.estado === 'completado' ? 'bg-card border-border' :
                  event.estado === 'en_progreso' ? 'bg-primary/5 border-primary/20' :
                  'bg-muted/30 border-dashed'
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-foreground">{event.titulo}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{event.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                      <Calendar className="h-3 w-3" />
                      {event.fecha.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card-elevated p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <Bot className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Próximos Pasos Recomendados</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Responder al contacto de la empresa interesada
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Preparar documentación para due diligence
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Coordinar visita técnica al terreno
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
