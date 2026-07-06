import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  moduleCount: number;
  progressPercent?: number;
}

export function CourseCard({
  id,
  title,
  description,
  moduleCount,
  progressPercent = 0,
}: CourseCardProps) {
  return (
    <Card interactive className="group flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white"
          aria-hidden="true"
        >
          <BookOpen size={28} strokeWidth={1.75} />
        </div>
        <Badge variant="muted">{moduleCount} Module</Badge>
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed">
        {description}
      </CardDescription>
      {progressPercent > 0 && (
        <div className="mt-6">
          <ProgressBar value={progressPercent} label="Fortschritt" />
        </div>
      )}
      <div className="mt-8">
        <Link href={`/courses/${id}`} className="block">
          <Button fullWidth className="group-hover:shadow-primary">
            Kurs öffnen
            <ChevronRight size={20} aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
