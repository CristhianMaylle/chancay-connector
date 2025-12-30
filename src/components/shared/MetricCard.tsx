import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground',
  secondary: 'bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground',
  accent: 'bg-gradient-to-br from-accent to-accent/80 text-accent-foreground',
};

export function MetricCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: MetricCardProps) {
  const isGradient = variant !== 'default';

  return (
    <div
      className={cn(
        'card-elevated p-6 animate-fade-in',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn('text-sm font-medium', isGradient ? 'opacity-90' : 'text-muted-foreground')}>
            {title}
          </p>
          <p className={cn('text-3xl font-bold tracking-tight', isGradient ? '' : 'text-foreground')}>
            {value}
          </p>
          {subtitle && (
            <p className={cn('text-xs', isGradient ? 'opacity-75' : 'text-muted-foreground')}>
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-xl',
            isGradient ? 'bg-white/20' : 'bg-primary/10'
          )}
        >
          <Icon className={cn('h-6 w-6', isGradient ? '' : 'text-primary')} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-sm">
          <span
            className={cn(
              'font-medium',
              trend.value >= 0 ? 'text-accent' : 'text-destructive'
            )}
          >
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className={cn(isGradient ? 'opacity-75' : 'text-muted-foreground')}>
            {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}
