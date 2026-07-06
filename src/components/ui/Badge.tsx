import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-primary-light text-primary border-primary/20",
  success: "bg-success-bg text-success border-success/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  muted: "bg-bg-page text-text-secondary border-border",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
