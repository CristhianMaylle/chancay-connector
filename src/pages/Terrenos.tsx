import { useState } from 'react';
import { mockTerrenos } from '@/data/mockData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Eye,
  Upload,
  Ruler,
  Calendar,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Terrenos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredTerrenos = mockTerrenos.filter((terreno) => {
    const matchesSearch =
      terreno.partida.toLowerCase().includes(searchTerm.toLowerCase()) ||
      terreno.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || terreno.legalStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getEstadoLabel = (estado: string) => {
    const labels: Record<string, string> = {
      registrado: 'Registrado',
      analizado: 'Analizado',
      compatible: 'Compatible',
      en_matching: 'En Matching',
      formalizado: 'Formalizado',
    };
    return labels[estado] || estado;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Terrenos & Viabilidad Legal</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona y evalúa la viabilidad legal de tus terrenos
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Registrar Terreno
        </Button>
      </div>

      {/* Info Banner */}
      <div className="card-elevated p-4 bg-primary/5 border-primary/20 flex items-start gap-3">
        <Bot className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <p className="font-medium text-foreground">Análisis con IA Legal</p>
          <p className="text-sm text-muted-foreground">
            Sube tu partida registral y nuestra IA analizará automáticamente la viabilidad legal del terreno,
            generando un semáforo de riesgo y recomendaciones.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por partida o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['verde', 'amarillo', 'rojo'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(filterStatus === status ? null : status)}
              className="capitalize"
            >
              {status === 'verde' ? '🟢' : status === 'amarillo' ? '🟡' : '🔴'} {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Terrenos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerrenos.map((terreno, index) => (
          <div
            key={terreno.id}
            className="card-elevated overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Map Preview Placeholder */}
            <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
              <MapPin className="h-8 w-8 text-primary/40" />
              <span className="absolute bottom-2 right-2 text-xs bg-background/80 px-2 py-1 rounded">
                {terreno.coordinates.lat.toFixed(4)}, {terreno.coordinates.lng.toFixed(4)}
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{terreno.partida}</h3>
                  <p className="text-sm text-muted-foreground">{terreno.ubicacion}</p>
                </div>
                <StatusBadge status={terreno.legalStatus} />
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ruler className="h-4 w-4" />
                  <span>{terreno.area.toLocaleString()} m²</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{terreno.createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              {/* Zonificación */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Zonificación</p>
                <span className="inline-block px-2 py-1 bg-muted rounded text-xs font-medium">
                  {terreno.zonificacion}
                </span>
              </div>

              {/* Estado del Proceso */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Estado del Proceso</p>
                <span className={cn(
                  'inline-block px-2 py-1 rounded text-xs font-medium',
                  terreno.estado === 'compatible' ? 'bg-accent/10 text-accent' :
                  terreno.estado === 'en_matching' ? 'bg-secondary/10 text-secondary' :
                  'bg-muted text-muted-foreground'
                )}>
                  {getEstadoLabel(terreno.estado)}
                </span>
              </div>

              {/* Legal Details */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {terreno.legalDetails}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-4 w-4" />
                  Ver Detalle
                </Button>
                <Button size="sm" className="flex-1 gap-1">
                  <Upload className="h-4 w-4" />
                  Analizar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTerrenos.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron terrenos</h3>
          <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
}
