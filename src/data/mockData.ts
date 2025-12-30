import { Terreno, Demanda, Proveedor, User, Match } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez García',
    email: 'juan.perez@email.com',
    role: 'propietario',
    documentNumber: '12345678',
    documentType: 'DNI',
  },
  {
    id: '2',
    name: 'Inversiones del Norte SAC',
    email: 'contacto@inversionesnorte.pe',
    role: 'empresa',
    documentNumber: '20123456789',
    documentType: 'RUC',
  },
  {
    id: '3',
    name: 'Consultora Legal Chancay',
    email: 'legal@consultora.pe',
    role: 'proveedor',
    documentNumber: '20987654321',
    documentType: 'RUC',
  },
  {
    id: '4',
    name: 'Admin CIP Lima',
    email: 'admin@ciplima.org.pe',
    role: 'admin',
    documentNumber: '87654321',
    documentType: 'DNI',
  },
];

export const mockTerrenos: Terreno[] = [
  {
    id: '1',
    propietarioId: '1',
    partida: 'P001234567',
    ubicacion: 'Chancay, Km 75 Panamericana Norte',
    area: 15000,
    legalStatus: 'verde',
    legalDetails: 'Propiedad saneada, sin cargas ni gravámenes. Apta para desarrollo industrial.',
    coordinates: { lat: -11.5621, lng: -77.2702 },
    zonificacion: 'Industrial Liviana (I1)',
    usoCompatible: ['Almacén', 'Centro de distribución', 'Manufactura ligera'],
    estado: 'compatible',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    propietarioId: '1',
    partida: 'P001234568',
    ubicacion: 'Chancay, Sector Pasamayo',
    area: 8500,
    legalStatus: 'amarillo',
    legalDetails: 'Propiedad con proceso de sucesión en trámite. Se recomienda resolver antes de cualquier transacción.',
    coordinates: { lat: -11.5745, lng: -77.2589 },
    zonificacion: 'Comercial Zonal (CZ)',
    usoCompatible: ['Centro comercial', 'Oficinas', 'Servicios'],
    estado: 'analizado',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    propietarioId: '1',
    partida: 'P001234569',
    ubicacion: 'Huaral, Sector Agrícola',
    area: 25000,
    legalStatus: 'rojo',
    legalDetails: 'Terreno con litigio judicial pendiente. No apto para transacciones hasta resolución.',
    coordinates: { lat: -11.4925, lng: -77.2103 },
    zonificacion: 'Agrícola (A)',
    usoCompatible: ['Agroindustria'],
    estado: 'registrado',
    createdAt: new Date('2024-03-10'),
  },
];

export const mockDemandas: Demanda[] = [
  {
    id: '1',
    empresaId: '2',
    empresaNombre: 'Inversiones del Norte SAC',
    tipo: 'Centro de Distribución',
    descripcion: 'Buscamos terreno para centro de distribución logística cerca al puerto de Chancay.',
    areaRequerida: 12000,
    zonificacionRequerida: ['Industrial Liviana (I1)', 'Industrial Pesada (I2)'],
    presupuesto: 'USD 2,000,000 - 3,500,000',
    estado: 'activa',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    empresaId: '2',
    empresaNombre: 'Logística Global Perú',
    tipo: 'Almacén Refrigerado',
    descripcion: 'Necesitamos terreno para construcción de almacén refrigerado para exportación.',
    areaRequerida: 5000,
    zonificacionRequerida: ['Industrial Liviana (I1)'],
    presupuesto: 'USD 800,000 - 1,200,000',
    estado: 'activa',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    empresaId: '2',
    empresaNombre: 'Tech Park Chancay',
    tipo: 'Parque Tecnológico',
    descripcion: 'Proyecto de parque tecnológico con oficinas y data center.',
    areaRequerida: 20000,
    zonificacionRequerida: ['Comercial Zonal (CZ)', 'Industrial Liviana (I1)'],
    presupuesto: 'USD 5,000,000 - 8,000,000',
    estado: 'en_negociacion',
    createdAt: new Date('2024-03-01'),
  },
];

export const mockProveedores: Proveedor[] = [
  {
    id: '1',
    nombre: 'Estudio Jurídico Chancay & Asociados',
    servicios: ['Saneamiento legal', 'Due diligence', 'Contratos'],
    descripcion: 'Especialistas en derecho inmobiliario con 20 años de experiencia en la zona.',
    contacto: 'info@chancayabogados.pe',
    validado: true,
    rating: 4.8,
  },
  {
    id: '2',
    nombre: 'GeoTec Perú',
    servicios: ['Levantamiento topográfico', 'Estudios de suelo', 'Mapeo GPS'],
    descripcion: 'Servicios geotécnicos con equipos de última generación.',
    contacto: 'servicios@geotec.pe',
    validado: true,
    rating: 4.5,
  },
  {
    id: '3',
    nombre: 'Notaría Rodríguez',
    servicios: ['Escrituras públicas', 'Certificaciones', 'Protocolización'],
    descripcion: 'Notaría autorizada con atención preferente para proyectos ZEEP.',
    contacto: 'notaria@rodriguez.pe',
    validado: true,
    rating: 4.9,
  },
  {
    id: '4',
    nombre: 'ArquiPlan SAC',
    servicios: ['Diseño arquitectónico', 'Expedientes técnicos', 'Licencias'],
    descripcion: 'Arquitectura industrial y comercial con enfoque sostenible.',
    contacto: 'proyectos@arquiplan.pe',
    validado: false,
    rating: 4.2,
  },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    terrenoId: '1',
    demandaId: '1',
    compatibilidad: 92,
    estado: 'sugerido',
  },
  {
    id: '2',
    terrenoId: '1',
    demandaId: '2',
    compatibilidad: 78,
    estado: 'contactado',
  },
];

export const dashboardMetrics = {
  terrenosRegistrados: 156,
  terrenosViables: 89,
  empresasActivas: 34,
  matchesRealizados: 67,
  proveedoresValidados: 28,
  empleosProyectados: 12500,
  inversionEstimada: 'USD 450M',
  propietariosBeneficiados: 124,
};

export const zeepBenefits = [
  { id: 1, titulo: 'Exoneración IGV', descripcion: 'Exoneración del IGV en operaciones dentro de la ZEEP', icono: 'percent' },
  { id: 2, titulo: 'Depreciación acelerada', descripcion: 'Depreciación acelerada de activos fijos', icono: 'trending-up' },
  { id: 3, titulo: 'Crédito tributario', descripcion: 'Crédito tributario por reinversión', icono: 'credit-card' },
  { id: 4, titulo: 'Simplificación administrativa', descripcion: 'Ventanilla única para trámites', icono: 'file-check' },
];
