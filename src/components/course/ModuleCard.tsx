import Link from "next/link";
import {
  Clock,
  Droplets,
  Pill,
  UtensilsCrossed,
  Circle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const MODULE_ICONS: Record<string, LucideIcon> = {
  handewaschen: Droplets,
  medikamente: Pill,
  ernaehrung: UtensilsCrossed,
};

interface ModuleCardProps {
  order: number;
  slug: string;
  title: string;
  description?: string | null;
  estimatedMinutes?: number | null;
  status: string;
  completed?: boolean;
  score?: number | null;
}

export function ModuleCard({
  order,
  slug,
  title,
  description,
  estimatedMinutes,
  status,
  completed,
  score,
}: ModuleCardProps) {
  const Icon = MODULE_ICONS[slug] ?? Circle;
  const isPublished = status === "published";

  return (
    <Card
      className={
        isPublished
          ? "transition-shadow hover:border-primary hover:shadow-md"
          : "opacity-90"
      }
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"
            aria-hidden="true"
          >
            <Icon size={32} strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-secondary">
                Modul {order}
              </span>
              {completed ? (
                <Badge variant="success">
                  <CheckCircle2 size={14} className="mr-1" aria-hidden="true" />
                  Abgeschlossen
                  {score != null ? ` · ${score}%` : ""}
                </Badge>
              ) : isPublished ? (
                <Badge variant="default">Bereit</Badge>
              ) : (
                <Badge variant="warning">In Vorbereitung</Badge>
              )}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2 text-base leading-relaxed">
              {description ?? "Praxisnahes Lernmodul mit Bildern und Quiz."}
            </CardDescription>
            {estimatedMinutes && (
              <p className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
                <Clock size={16} aria-hidden="true" />
                ca. {estimatedMinutes} Minuten
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0 sm:min-w-[160px]">
          {isPublished ? (
            <Link href={`/learn/${slug}`}>
              <Button fullWidth size="lg">
                Modul starten
              </Button>
            </Link>
          ) : (
            <Button disabled fullWidth variant="secondary" size="lg">
              Bald verfügbar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
