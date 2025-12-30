import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Download,
  CheckSquare,
  FileCheck,
  FolderOpen,
  Bot,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Documento {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'checklist' | 'guia' | 'formato';
  roles: string[];
}

const documentos: Documento[] = [
  {
    id: '1',
    nombre: 'Checklist Propietario - Registro de Terreno',
    descripcion: 'Lista de documentos necesarios para registrar tu terreno en el sistema',
    tipo: 'checklist',
    roles: ['propietario'],
  },
  {
    id: '2',
    nombre: 'Guía de Saneamiento Legal',
    descripcion: 'Pasos para regularizar la situación legal de tu terreno',
    tipo: 'guia',
    roles: ['propietario'],
  },
  {
    id: '3',
    nombre: 'Checklist Empresa - Due Diligence',
    descripcion: 'Verificaciones recomendadas antes de invertir en un terreno',
    tipo: 'checklist',
    roles: ['empresa'],
  },
  {
    id: '4',
    nombre: 'Formato de Carta de Intención',
    descripcion: 'Modelo de carta para manifestar interés formal en un terreno',
    tipo: 'formato',
    roles: ['empresa'],
  },
  {
    id: '5',
    nombre: 'Requisitos ZEEP - Beneficios Tributarios',
    descripcion: 'Documentación requerida para acceder a beneficios de la ZEEP',
    tipo: 'guia',
    roles: ['propietario', 'empresa'],
  },
  {
    id: '6',
    nombre: 'Checklist Proveedor - Validación CIP',
    descripcion: 'Requisitos para obtener el sello de validación CIP Lima',
    tipo: 'checklist',
    roles: ['proveedor'],
  },
  {
    id: '7',
    nombre: 'Manual de Usuario - Plataforma Smart Chancay',
    descripcion: 'Guía completa de uso de todas las funcionalidades',
    tipo: 'guia',
    roles: ['propietario', 'empresa', 'proveedor', 'admin'],
  },
  {
    id: '8',
    nombre: 'Formato de Reporte de Matching',
    descripcion: 'Plantilla para documentar matches exitosos',
    tipo: 'formato',
    roles: ['admin'],
  },
];

const tipoConfig = {
  checklist: { icon: CheckSquare, color: 'text-accent', bg: 'bg-accent/10' },
  guia: { icon: FileCheck, color: 'text-primary', bg: 'bg-primary/10' },
  formato: { icon: FileText, color: 'text-secondary', bg: 'bg-secondary/10' },
};

export default function Documentos() {
  const { user } = useAuth();

  const filteredDocs = documentos.filter(
    doc => !user || doc.roles.includes(user.role)
  );

  const checklistDocs = filteredDocs.filter(d => d.tipo === 'checklist');
  const guiaDocs = filteredDocs.filter(d => d.tipo === 'guia');
  const formatoDocs = filteredDocs.filter(d => d.tipo === 'formato');

  const renderDocList = (docs: Documento[], title: string, icon: typeof FileText) => {
    if (docs.length === 0) return null;
    const Icon = icon;

    return (
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <div className="space-y-3">
          {docs.map((doc, index) => {
            const config = tipoConfig[doc.tipo];
            const DocIcon = config.icon;

            return (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', config.bg)}>
                    <DocIcon className={cn('h-5 w-5', config.color)} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.nombre}</p>
                    <p className="text-sm text-muted-foreground">{doc.descripcion}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Documentos & Checklists</h1>
        <p className="text-muted-foreground mt-1">
          Descarga documentos y listas de verificación personalizadas según tu perfil
        </p>
      </div>

      {/* Role Info */}
      <div className="card-elevated p-4 bg-primary/5 border-primary/20 flex items-center gap-3">
        <Bot className="h-5 w-5 text-primary" />
        <p className="text-sm text-foreground">
          Mostrando documentos para tu perfil: <span className="font-semibold capitalize">{user?.role}</span>
        </p>
      </div>

      {/* Document Sections */}
      <div className="grid gap-6">
        {renderDocList(checklistDocs, 'Checklists', CheckSquare)}
        {renderDocList(guiaDocs, 'Guías y Manuales', FileCheck)}
        {renderDocList(formatoDocs, 'Formatos y Plantillas', FileText)}
      </div>

      {/* Empty State */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No hay documentos disponibles</h3>
          <p className="text-muted-foreground">Los documentos para tu perfil serán agregados próximamente</p>
        </div>
      )}

      {/* Help Section */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-foreground mb-4">¿Necesitas un documento específico?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Si requieres algún formato o documento que no encuentras aquí, el equipo del CIP Lima puede ayudarte.
        </p>
        <Button variant="outline" className="gap-2">
          Solicitar Documento
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
