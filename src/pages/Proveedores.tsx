import { useState } from 'react';
import { mockProveedores } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  Search,
  Star,
  CheckCircle,
  AlertCircle,
  Mail,
  Plus,
  Filter,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const servicioCategories = [
  'Saneamiento legal',
  'Due diligence',
  'Topografía',
  'Notaría',
  'Arquitectura',
  'Ingeniería',
];

export default function Proveedores() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredProveedores = mockProveedores.filter((prov) => {
    const matchesSearch =
      prov.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prov.servicios.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategories.length === 0 ||
      prov.servicios.some(s => selectedCategories.some(c => s.toLowerCase().includes(c.toLowerCase())));
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proveedores de Servicios</h1>
          <p className="text-muted-foreground mt-1">
            Encuentra profesionales validados para tus proyectos
          </p>
        </div>
        {user?.role === 'proveedor' && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Registrar mis Servicios
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar proveedores o servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {servicioCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Providers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProveedores.map((proveedor, index) => (
          <div
            key={proveedor.id}
            className="card-elevated p-6 space-y-4 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              {proveedor.validado ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  <CheckCircle className="h-3 w-3" />
                  Validado CIP
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <AlertCircle className="h-3 w-3" />
                  En revisión
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="font-semibold text-foreground">{proveedor.nombre}</h3>
              <p className="text-sm text-muted-foreground mt-1">{proveedor.descripcion}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.floor(proveedor.rating)
                        ? 'text-secondary fill-secondary'
                        : 'text-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{proveedor.rating}</span>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Servicios</p>
              <div className="flex flex-wrap gap-1">
                {proveedor.servicios.map((servicio, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-muted rounded text-xs text-foreground"
                  >
                    {servicio}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Mail className="h-4 w-4" />
                Contactar
              </Button>
              <Button size="sm" className="flex-1">
                Ver Perfil
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProveedores.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron proveedores</h3>
          <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Info Section */}
      <div className="card-elevated p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Validación CIP Lima</h3>
            <p className="text-sm text-muted-foreground">
              Los proveedores con el sello "Validado CIP" han sido verificados por el Colegio de Ingenieros del Perú
              en cuanto a su habilitación profesional y experiencia en la zona ZEEP Chancay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
