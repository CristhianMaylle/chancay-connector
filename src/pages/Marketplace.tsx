import { useState } from 'react';
import { mockDemandas, mockTerrenos, mockMatches } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  Store,
  Plus,
  Search,
  Briefcase,
  MapPin,
  ArrowRight,
  Sparkles,
  Handshake,
  DollarSign,
  Ruler,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export default function Marketplace() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'demandas' | 'ofertas' | 'matches'>('demandas');
  const [searchTerm, setSearchTerm] = useState('');

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa': return 'bg-accent/10 text-accent';
      case 'en_negociacion': return 'bg-secondary/10 text-secondary';
      case 'cerrada': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Conecta oferta y demanda de terrenos en la ZEEP Chancay
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {user?.role === 'empresa' ? 'Publicar Demanda' : 'Ofertar Terreno'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'demandas', label: 'Demandas de Empresas', icon: Briefcase },
          { id: 'ofertas', label: 'Terrenos Disponibles', icon: MapPin },
          { id: 'matches', label: 'Matches Sugeridos', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}
      {activeTab === 'demandas' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDemandas.map((demanda, index) => (
            <div
              key={demanda.id}
              className="card-elevated p-6 space-y-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Briefcase className="h-6 w-6 text-secondary" />
                </div>
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getEstadoColor(demanda.estado))}>
                  {demanda.estado === 'activa' ? 'Activa' : 
                   demanda.estado === 'en_negociacion' ? 'En Negociación' : 'Cerrada'}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">{demanda.tipo}</h3>
                <p className="text-sm text-muted-foreground">{demanda.empresaNombre}</p>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {demanda.descripcion}
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ruler className="h-4 w-4" />
                  <span>{demanda.areaRequerida.toLocaleString()} m²</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="truncate">{demanda.presupuesto}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Zonificación Requerida</p>
                <div className="flex flex-wrap gap-1">
                  {demanda.zonificacionRequerida.map((zona, i) => (
                    <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs">
                      {zona}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full gap-1">
                Ver Detalle <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ofertas' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTerrenos.filter(t => t.legalStatus !== 'rojo').map((terreno, index) => (
            <div
              key={terreno.id}
              className="card-elevated p-6 space-y-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <StatusBadge status={terreno.legalStatus} size="sm" />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">{terreno.partida}</h3>
                <p className="text-sm text-muted-foreground">{terreno.ubicacion}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ruler className="h-4 w-4" />
                  <span>{terreno.area.toLocaleString()} m²</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Usos Compatibles</p>
                <div className="flex flex-wrap gap-1">
                  {terreno.usoCompatible.slice(0, 2).map((uso, i) => (
                    <span key={i} className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs">
                      {uso}
                    </span>
                  ))}
                  {terreno.usoCompatible.length > 2 && (
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">
                      +{terreno.usoCompatible.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <Button className="w-full gap-1">
                Contactar Propietario <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="space-y-6">
          <div className="card-elevated p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Matching Inteligente:</span> La IA analiza compatibilidad entre terrenos disponibles y demandas activas.
              </p>
            </div>
          </div>

          {mockMatches.map((match, index) => {
            const terreno = mockTerrenos.find(t => t.id === match.terrenoId);
            const demanda = mockDemandas.find(d => d.id === match.demandaId);
            if (!terreno || !demanda) return null;

            return (
              <div
                key={match.id}
                className="card-elevated p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn(
                    'px-3 py-1 rounded-full text-sm font-semibold',
                    match.compatibilidad >= 80 ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'
                  )}>
                    {match.compatibilidad}% Compatible
                  </div>
                  <span className={cn(
                    'px-2 py-0.5 rounded text-xs font-medium',
                    match.estado === 'sugerido' ? 'bg-muted text-muted-foreground' :
                    match.estado === 'contactado' ? 'bg-primary/10 text-primary' :
                    'bg-secondary/10 text-secondary'
                  )}>
                    {match.estado === 'sugerido' ? 'Sugerido' :
                     match.estado === 'contactado' ? 'Contactado' : 'En Negociación'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Terreno */}
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Terreno</span>
                    </div>
                    <p className="font-semibold text-foreground">{terreno.partida}</p>
                    <p className="text-sm text-muted-foreground">{terreno.ubicacion}</p>
                    <p className="text-sm text-muted-foreground mt-2">{terreno.area.toLocaleString()} m² • {terreno.zonificacion}</p>
                  </div>

                  {/* Demanda */}
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-medium text-foreground">Demanda</span>
                    </div>
                    <p className="font-semibold text-foreground">{demanda.tipo}</p>
                    <p className="text-sm text-muted-foreground">{demanda.empresaNombre}</p>
                    <p className="text-sm text-muted-foreground mt-2">{demanda.areaRequerida.toLocaleString()} m² • {demanda.presupuesto}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button className="gap-2">
                    <Handshake className="h-4 w-4" />
                    Iniciar Contacto
                  </Button>
                  <Button variant="outline">Ver Detalles</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
