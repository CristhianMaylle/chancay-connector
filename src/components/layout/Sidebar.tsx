import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  MapPin,
  Scale,
  Map,
  Store,
  Users,
  ShieldCheck,
  Bot,
  GitBranch,
  Clock,
  FileText,
  Building2,
  BarChart3,
  MessageCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['propietario', 'empresa', 'proveedor', 'admin'] },
  { path: '/terrenos', label: 'Terrenos', icon: MapPin, roles: ['propietario', 'empresa', 'admin'] },
  { path: '/ia-legal', label: 'IA Legal', icon: Scale, roles: ['propietario', 'empresa', 'admin'] },
  { path: '/mapas', label: 'Zonificación', icon: Map, roles: ['propietario', 'empresa', 'admin'] },
  { path: '/marketplace', label: 'Marketplace', icon: Store, roles: ['propietario', 'empresa', 'admin'] },
  { path: '/proveedores', label: 'Proveedores', icon: Users, roles: ['propietario', 'empresa', 'proveedor', 'admin'] },
  { path: '/compliance', label: 'ZEEP Compliance', icon: ShieldCheck, roles: ['propietario', 'empresa', 'admin'] },
  { path: '/flujo', label: 'Flujo Guiado', icon: GitBranch, roles: ['propietario', 'empresa'] },
  { path: '/trazabilidad', label: 'Trazabilidad', icon: Clock, roles: ['propietario', 'empresa', 'admin'] },
  { path: '/documentos', label: 'Documentos', icon: FileText, roles: ['propietario', 'empresa', 'proveedor', 'admin'] },
  { path: '/gobernanza', label: 'Gobernanza CIP', icon: Building2, roles: ['admin'] },
  { path: '/impacto', label: 'Panel Impacto', icon: BarChart3, roles: ['admin'] },
  { path: '/whatsapp', label: 'WhatsApp', icon: MessageCircle, roles: ['propietario'] },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredMenu = menuItems.filter(
    item => !user || item.roles.includes(user.role)
  );

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      propietario: 'Propietario',
      empresa: 'Empresa',
      proveedor: 'Proveedor',
      admin: 'Admin CIP',
    };
    return labels[role] || role;
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">SC</span>
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground text-sm">Smart Chancay</h1>
              <p className="text-xs text-sidebar-foreground/60">CIP Lima</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* MVP Badge */}
      {!collapsed && (
        <div className="px-4 py-2">
          <span className="mvp-badge">
            <Bot className="h-3 w-3" />
            MVP Demo
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    'text-sidebar-foreground/70 hover:text-sidebar-foreground',
                    'hover:bg-sidebar-accent',
                    isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      {user && (
        <div className="border-t border-sidebar-border p-4">
          {!collapsed && (
            <div className="mb-3">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{getRoleLabel(user.role)}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size={collapsed ? 'icon' : 'sm'}
            onClick={logout}
            className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        </div>
      )}
    </aside>
  );
}
