import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { zeepBenefits } from '@/data/mockData';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Percent,
  TrendingUp,
  CreditCard,
  FileCheck,
  ArrowRight,
  Bot,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, typeof CheckCircle> = {
  percent: Percent,
  'trending-up': TrendingUp,
  'credit-card': CreditCard,
  'file-check': FileCheck,
};

interface ComplianceResult {
  califica: boolean;
  puntaje: number;
  criterios: { nombre: string; cumple: boolean; detalle: string }[];
  beneficiosAplicables: string[];
}

const mockComplianceResult: ComplianceResult = {
  califica: true,
  puntaje: 85,
  criterios: [
    { nombre: 'Ubicación dentro de ZEEP', cumple: true, detalle: 'Terreno ubicado en zona autorizada' },
    { nombre: 'Uso compatible con actividades permitidas', cumple: true, detalle: 'Centro logístico califica como actividad permitida' },
    { nombre: 'Inversión mínima requerida', cumple: true, detalle: 'Proyecto supera umbral de inversión' },
    { nombre: 'Generación de empleo local', cumple: false, detalle: 'Pendiente plan de contratación local' },
    { nombre: 'Impacto ambiental', cumple: true, detalle: 'EIA preliminar favorable' },
  ],
  beneficiosAplicables: [
    'Exoneración IGV',
    'Depreciación acelerada',
    'Ventanilla única',
  ],
};

export default function Compliance() {
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Compliance ZEEP</h1>
        <p className="text-muted-foreground mt-1">
          Evalúa si tu proyecto califica a los beneficios de la Zona Económica Especial del Puerto de Chancay
        </p>
      </div>

      {/* ZEEP Info */}
      <div className="card-elevated p-6 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-lg mb-2">Ley N° 32449 - ZEEP Chancay</h2>
            <p className="text-muted-foreground">
              La Zona Económica Especial del Puerto de Chancay ofrece beneficios tributarios y administrativos
              para proyectos que cumplan con los criterios establecidos por la ley.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Beneficios Disponibles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {zeepBenefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icono] || CheckCircle;
            return (
              <div
                key={benefit.id}
                className="card-elevated p-5 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-accent/10 w-fit mb-3">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{benefit.titulo}</h3>
                <p className="text-sm text-muted-foreground">{benefit.descripcion}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evaluate Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="font-semibold text-foreground text-lg">Evaluación de Proyecto</h2>
        </div>

        {!showResult ? (
          <div className="text-center py-8">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ¿Tu proyecto califica a los beneficios ZEEP?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Nuestra IA evaluará los criterios de elegibilidad y te indicará qué beneficios aplican.
            </p>
            <Button size="lg" onClick={handleAnalyze} disabled={isAnalyzing} className="gap-2">
              {isAnalyzing ? (
                <>
                  <Bot className="h-5 w-5 animate-pulse" />
                  Analizando proyecto...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" />
                  Evaluar Proyecto
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              * Evaluación simulada con fines demostrativos
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            {/* Score */}
            <div className={cn(
              'p-6 rounded-xl text-center',
              mockComplianceResult.califica
                ? 'bg-accent/10 border border-accent/20'
                : 'bg-destructive/10 border border-destructive/20'
            )}>
              <div className="inline-flex items-center gap-2 mb-3">
                {mockComplianceResult.califica ? (
                  <CheckCircle className="h-8 w-8 text-accent" />
                ) : (
                  <XCircle className="h-8 w-8 text-destructive" />
                )}
                <span className="text-4xl font-bold text-foreground">{mockComplianceResult.puntaje}%</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {mockComplianceResult.califica
                  ? '¡Tu proyecto califica a beneficios ZEEP!'
                  : 'Tu proyecto requiere ajustes para calificar'}
              </p>
            </div>

            {/* Criteria */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Criterios Evaluados</h3>
              <div className="space-y-3">
                {mockComplianceResult.criterios.map((criterio, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-4 rounded-lg border flex items-start gap-3',
                      criterio.cumple
                        ? 'bg-accent/5 border-accent/20'
                        : 'bg-destructive/5 border-destructive/20'
                    )}
                  >
                    {criterio.cumple ? (
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{criterio.nombre}</p>
                      <p className="text-sm text-muted-foreground">{criterio.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicable Benefits */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Beneficios Aplicables</h3>
              <div className="flex flex-wrap gap-2">
                {mockComplianceResult.beneficiosAplicables.map((beneficio, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-lg font-medium flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {beneficio}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button className="gap-2">
                Descargar Informe
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setShowResult(false)}>
                Nueva Evaluación
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
