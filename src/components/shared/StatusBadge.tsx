import { cn } from '@/lib/utils';
import { LegalStatus } from '@/types';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: LegalStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  verde: {
    label: 'Viable',
    icon: CheckCircle,
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  amarillo: {
    label: 'Revisar',
    icon: AlertTriangle,
    className: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  rojo: {
    label: 'No Viable',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

const sizeConfig = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
};

const iconSizeConfig = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function StatusBadge({ status, showLabel = true, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.className,
        sizeConfig[size]
      )}
    >
      <Icon className={iconSizeConfig[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
