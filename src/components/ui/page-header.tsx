import type { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string | number;
}

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  stats?: Stat[];
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  stats,
  badge,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-br from-primary/5 via-background to-cream/50",
        "dark:from-primary/10 dark:via-background dark:to-cream/20",
        "border-b",
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-warm/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left side: Icon, Title, Description */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {Icon && (
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              )}
              {badge && (
                <Badge variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {title}
            </h1>

            {description && (
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                {description}
              </p>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 border shadow-sm"
                  >
                    <span className="font-semibold text-primary">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side: Optional children (buttons, actions) */}
          {children && (
            <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
