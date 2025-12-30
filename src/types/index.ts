export type UserRole = 'propietario' | 'empresa' | 'proveedor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  documentNumber: string;
  documentType: 'DNI' | 'RUC';
}

export type LegalStatus = 'verde' | 'amarillo' | 'rojo';

export interface Terreno {
  id: string;
  propietarioId: string;
  partida: string;
  ubicacion: string;
  area: number;
  legalStatus: LegalStatus;
  legalDetails: string;
  coordinates: { lat: number; lng: number };
  zonificacion: string;
  usoCompatible: string[];
  estado: 'registrado' | 'analizado' | 'compatible' | 'en_matching' | 'formalizado';
  createdAt: Date;
}

export interface Demanda {
  id: string;
  empresaId: string;
  empresaNombre: string;
  tipo: string;
  descripcion: string;
  areaRequerida: number;
  zonificacionRequerida: string[];
  presupuesto: string;
  estado: 'activa' | 'en_negociacion' | 'cerrada';
  createdAt: Date;
}

export interface Proveedor {
  id: string;
  nombre: string;
  servicios: string[];
  descripcion: string;
  contacto: string;
  validado: boolean;
  rating: number;
}

export interface ProcesoStep {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'pendiente' | 'en_progreso' | 'completado';
  fecha?: Date;
}

export interface Match {
  id: string;
  terrenoId: string;
  demandaId: string;
  compatibilidad: number;
  estado: 'sugerido' | 'contactado' | 'en_negociacion' | 'cerrado';
}
