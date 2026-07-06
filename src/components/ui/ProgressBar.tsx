import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex justify-between text-sm text-text-secondary">
          <span>{label}</span>
          <span aria-hidden="true">{percent}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Fortschritt"}
        className="h-3 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-success transition-all duration-slow"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
