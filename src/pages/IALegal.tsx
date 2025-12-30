import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  Upload,
  FileText,
  Bot,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LegalStatus } from '@/types';

interface AnalysisResult {
  status: LegalStatus;
  summary: string;
  details: string[];
  recommendations: string[];
  riskFactors: string[];
}

const mockAnalysis: AnalysisResult = {
  status: 'amarillo',
  summary: 'El terreno presenta condiciones parcialmente favorables con algunos aspectos que requieren atención antes de proceder con transacciones.',
  details: [
    'La partida registral muestra un proceso de sucesión intestada en trámite desde 2022.',
    'No se registran hipotecas ni gravámenes sobre el inmueble.',
    'Los linderos y medidas coinciden con el área declarada.',
    'La propiedad tiene acceso a vía pública.',
  ],
  recommendations: [
    'Concluir el proceso de sucesión antes de cualquier negociación formal.',
    'Obtener copia certificada actualizada de la partida registral.',
    'Coordinar con un abogado especialista en derecho sucesorio.',
    'Verificar el pago de impuestos prediales al día.',
  ],
  riskFactors: [
    'Proceso de sucesión pendiente puede retrasar transacciones 6-12 meses.',
    'Posibles herederos no identificados podrían reclamar derechos.',
  ],
};

export default function IALegal() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(mockAnalysis);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">IA Legal - Análisis de Viabilidad</h1>
        <p className="text-muted-foreground mt-1">
          Sube tu partida registral y obtén un análisis automatizado con IA
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-elevated p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Análisis con IA</h2>
              <p className="text-sm text-muted-foreground">Procesamiento automático de documentos legales</p>
            </div>
          </div>

          {/* Upload Area */}
          <label
            className={cn(
              'flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all',
              file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            {file ? (
              <>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Archivo cargado correctamente</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-medium text-foreground">Arrastra tu partida registral aquí</p>
                <p className="text-sm text-muted-foreground mt-1">o haz clic para seleccionar archivo</p>
                <p className="text-xs text-muted-foreground mt-4">Formatos: PDF, JPG, PNG</p>
              </>
            )}
          </label>

          <Button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="w-full gap-2"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="h-5 w-5 animate-pulse" />
                Analizando documento...
              </>
            ) : (
              <>
                <Bot className="h-5 w-5" />
                Analizar con IA
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Este análisis es una simulación con fines demostrativos del MVP
          </p>
        </div>

        {/* How it works */}
        <div className="card-elevated p-6 space-y-6">
          <h2 className="font-semibold text-foreground">¿Cómo funciona?</h2>
          
          <div className="space-y-4">
            {[
              { step: 1, title: 'Sube tu documento', desc: 'Partida registral en PDF o imagen' },
              { step: 2, title: 'IA procesa el documento', desc: 'Extracción y análisis de información legal' },
              { step: 3, title: 'Recibe el diagnóstico', desc: 'Semáforo de viabilidad y recomendaciones' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {index < 2 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 mt-6 mx-auto hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Status Legend */}
          <div className="border-t pt-4">
            <h3 className="font-medium text-foreground mb-3">Sistema de Semáforos</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <StatusBadge status="verde" />
                <span className="text-sm text-muted-foreground">Terreno viable, sin obstáculos legales</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status="amarillo" />
                <span className="text-sm text-muted-foreground">Requiere atención, trámites pendientes</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status="rojo" />
                <span className="text-sm text-muted-foreground">No viable actualmente, litigios o problemas graves</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-slide-up">
          <h2 className="text-xl font-semibold text-foreground">Resultado del Análisis</h2>

          {/* Status Card */}
          <div className={cn(
            'card-elevated p-6',
            result.status === 'verde' ? 'border-accent/30 bg-accent/5' :
            result.status === 'amarillo' ? 'border-secondary/30 bg-secondary/5' :
            'border-destructive/30 bg-destructive/5'
          )}>
            <div className="flex items-start gap-4">
              <div className={cn(
                'p-4 rounded-xl',
                result.status === 'verde' ? 'bg-accent/20' :
                result.status === 'amarillo' ? 'bg-secondary/20' :
                'bg-destructive/20'
              )}>
                {result.status === 'verde' ? (
                  <CheckCircle className="h-8 w-8 text-accent" />
                ) : result.status === 'amarillo' ? (
                  <AlertTriangle className="h-8 w-8 text-secondary" />
                ) : (
                  <XCircle className="h-8 w-8 text-destructive" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {result.status === 'verde' ? 'Terreno Viable' :
                     result.status === 'amarillo' ? 'Requiere Atención' :
                     'No Viable Actualmente'}
                  </h3>
                  <StatusBadge status={result.status} />
                </div>
                <p className="text-muted-foreground">{result.summary}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Findings */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Hallazgos del Análisis
              </h3>
              <ul className="space-y-3">
                {result.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                Recomendaciones
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <ArrowRight className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk Factors */}
          {result.riskFactors.length > 0 && (
            <div className="card-elevated p-6 border-destructive/20 bg-destructive/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Factores de Riesgo
              </h3>
              <ul className="space-y-3">
                {result.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Steps */}
          <div className="flex gap-4">
            <Button className="gap-2">
              Ver Proveedores Recomendados
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Descargar Informe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
