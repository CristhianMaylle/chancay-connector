import { useState } from 'react';
import { mockTerrenos } from '@/data/mockData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Map,
  MapPin,
  Layers,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const zonificaciones = [
  { id: 'i1', label: 'Industrial Liviana (I1)', color: 'bg-blue-500' },
  { id: 'i2', label: 'Industrial Pesada (I2)', color: 'bg-indigo-600' },
  { id: 'cz', label: 'Comercial Zonal (CZ)', color: 'bg-amber-500' },
  { id: 'a', label: 'Agrícola (A)', color: 'bg-green-500' },
  { id: 'r', label: 'Residencial (R)', color: 'bg-purple-500' },
];

export default function Mapas() {
  const [selectedTerreno, setSelectedTerreno] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const terreno = mockTerrenos.find(t => t.id === selectedTerreno);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Zonificación & Mapas</h1>
          <p className="text-muted-foreground mt-1">
            Visualiza terrenos y compatibilidad de uso de suelo
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Layers className="h-4 w-4" />
            Capas
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 card-elevated overflow-hidden">
          {/* Simulated Map */}
          <div className="relative h-[600px] bg-gradient-to-br from-primary/5 via-background to-accent/5">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <Button variant="outline" size="icon" className="bg-card">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-card">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-card">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            {/* Simulated Terreno Markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-2xl h-96">
                {/* Grid Pattern for Map Feel */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Terreno Markers */}
                {mockTerrenos.map((t, index) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTerreno(t.id)}
                    className={cn(
                      'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200',
                      'hover:scale-110 z-10',
                      selectedTerreno === t.id && 'scale-125'
                    )}
                    style={{
                      left: `${20 + index * 30}%`,
                      top: `${30 + (index % 2) * 40}%`,
                    }}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-full shadow-lg',
                        t.legalStatus === 'verde' ? 'bg-accent' :
                        t.legalStatus === 'amarillo' ? 'bg-secondary' :
                        'bg-destructive'
                      )}
                    >
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    {selectedTerreno === t.id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                    )}
                  </button>
                ))}

                {/* Zone Overlays */}
                <div className="absolute top-10 left-10 w-32 h-24 bg-blue-500/20 rounded-lg border border-blue-500/30" />
                <div className="absolute top-20 right-20 w-40 h-32 bg-amber-500/20 rounded-lg border border-amber-500/30" />
                <div className="absolute bottom-10 left-20 w-36 h-28 bg-green-500/20 rounded-lg border border-green-500/30" />
              </div>
            </div>

            {/* Map Attribution */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
              Mapa Simulado - MVP Demo
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Zonificación Legend */}
          <div className="card-elevated p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Zonificación
            </h3>
            <div className="space-y-2">
              {zonificaciones.map((zona) => (
                <button
                  key={zona.id}
                  onClick={() => toggleFilter(zona.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left',
                    activeFilters.includes(zona.id) ? 'bg-primary/10' : 'hover:bg-muted'
                  )}
                >
                  <div className={cn('w-4 h-4 rounded', zona.color)} />
                  <span className="text-sm text-foreground">{zona.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Terreno Info */}
          {terreno ? (
            <div className="card-elevated p-4 animate-scale-in">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Terreno Seleccionado
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Partida</p>
                  <p className="font-medium text-foreground">{terreno.partida}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="text-sm text-foreground">{terreno.ubicacion}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-medium text-foreground">{terreno.area.toLocaleString()} m²</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estado Legal</p>
                  <StatusBadge status={terreno.legalStatus} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zonificación</p>
                  <span className="inline-block px-2 py-1 bg-muted rounded text-xs font-medium mt-1">
                    {terreno.zonificacion}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Usos Compatibles</p>
                  <div className="flex flex-wrap gap-1">
                    {terreno.usoCompatible.map((uso, index) => (
                      <span key={index} className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs">
                        {uso}
                      </span>
                    ))}
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2">
                  Ver Detalle Completo
                </Button>
              </div>
            </div>
          ) : (
            <div className="card-elevated p-4 text-center">
              <Map className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Selecciona un terreno en el mapa para ver sus detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
