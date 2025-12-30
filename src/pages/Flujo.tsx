import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  GitBranch,
  CheckCircle,
  Circle,
  ArrowRight,
  FileText,
  Scale,
  MapPin,
  Handshake,
  FileCheck,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: typeof CheckCircle;
  action: string;
  path: string;
  tips: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Registra tu Terreno',
    description: 'Ingresa los datos básicos de tu terreno y sube la partida registral para iniciar el proceso.',
    icon: MapPin,
    action: 'Ir a Terrenos',
    path: '/terrenos',
    tips: [
      'Ten a mano tu partida registral actualizada',
      'Conoce el área exacta en metros cuadrados',
      'Identifica la ubicación con coordenadas si es posible',
    ],
  },
  {
    id: 2,
    title: 'Análisis de Viabilidad Legal',
    description: 'Nuestra IA analizará tu partida registral y determinará el estado legal del terreno.',
    icon: Scale,
    action: 'Ir a IA Legal',
    path: '/ia-legal',
    tips: [
      'El análisis demora aproximadamente 2 minutos',
      'Recibirás un semáforo: verde, amarillo o rojo',
      'Si hay observaciones, te indicamos cómo resolverlas',
    ],
  },
  {
    id: 3,
    title: 'Verificación de Zonificación',
    description: 'Confirma que tu terreno tiene una zonificación compatible con los usos permitidos en la ZEEP.',
    icon: FileText,
    action: 'Ver Mapas',
    path: '/mapas',
    tips: [
      'Las zonificaciones industriales (I1, I2) son las más demandadas',
      'Verifica los usos compatibles con tu terreno',
      'Consulta las restricciones de altura y edificación',
    ],
  },
  {
    id: 4,
    title: 'Publicación en Marketplace',
    description: 'Una vez aprobado, tu terreno estará visible para empresas e inversionistas interesados.',
    icon: Handshake,
    action: 'Ir al Marketplace',
    path: '/marketplace',
    tips: [
      'Completa toda la información para mejor visibilidad',
      'Responde rápido a las consultas de interesados',
      'Revisa las demandas activas que hacen match',
    ],
  },
  {
    id: 5,
    title: 'Formalización con Proveedores',
    description: 'Conecta con profesionales validados para la formalización legal y técnica de la transacción.',
    icon: FileCheck,
    action: 'Ver Proveedores',
    path: '/proveedores',
    tips: [
      'Elige proveedores con sello de validación CIP',
      'Compara presupuestos y tiempos de entrega',
      'El CIP Lima te acompaña en todo el proceso',
    ],
  },
];

export default function Flujo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      if (stepId < steps.length) {
        setCurrentStep(stepId + 1);
      }
    }
  };

  const activeStep = steps.find(s => s.id === currentStep);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Flujo Guiado Paso a Paso</h1>
        <p className="text-muted-foreground mt-1">
          Te acompañamos en cada etapa del proceso desde el registro hasta el matching
        </p>
      </div>

      {/* Progress */}
      <div className="card-elevated p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">Tu Progreso</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground ml-2">
            {completedSteps.length}/{steps.length}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Steps Timeline */}
        <div className="lg:col-span-1">
          <div className="card-elevated p-4">
            <h2 className="font-semibold text-foreground mb-4">Etapas del Proceso</h2>
            <div className="space-y-1">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                const Icon = step.icon;

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left',
                      isCurrent ? 'bg-primary/10' : 'hover:bg-muted',
                      isCompleted && 'opacity-75'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                      isCompleted ? 'bg-accent text-accent-foreground' :
                      isCurrent ? 'bg-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <span className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Step Detail */}
        <div className="lg:col-span-2">
          {activeStep && (
            <div className="card-elevated p-6 space-y-6 animate-scale-in">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-primary/10">
                  <activeStep.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary">Paso {activeStep.id} de {steps.length}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{activeStep.title}</h2>
                  <p className="text-muted-foreground mt-2">{activeStep.description}</p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">💡 Consejos para este paso</h3>
                <ul className="space-y-2">
                  {activeStep.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" asChild>
                  <a href={activeStep.path}>
                    {activeStep.action}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                {!completedSteps.includes(activeStep.id) && (
                  <Button
                    variant="outline"
                    onClick={() => markComplete(activeStep.id)}
                  >
                    Marcar como completado
                  </Button>
                )}
                {activeStep.id > 1 && (
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(activeStep.id - 1)}
                  >
                    Paso anterior
                  </Button>
                )}
              </div>

              {/* Next Step Preview */}
              {activeStep.id < steps.length && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Siguiente paso:</p>
                  <p className="font-medium text-foreground">
                    {steps[activeStep.id].title}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
