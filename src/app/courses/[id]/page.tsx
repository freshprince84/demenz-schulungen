import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { courses, modules, progress } from "@/db/schema";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ensureLearnerSession } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .limit(1);

  if (!course) notFound();

  const moduleRows = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, course.id))
    .orderBy(asc(modules.order));

  const sessionId = await ensureLearnerSession();
  const progressRows = await db
    .select()
    .from(progress)
    .where(eq(progress.sessionId, sessionId));

  const completedCount = moduleRows.filter((m) =>
    progressRows.some((p) => p.moduleId === m.id && p.completed),
  ).length;

  const percent =
    moduleRows.length > 0
      ? Math.round((completedCount / moduleRows.length) * 100)
      : 0;

  return (
    <div className="space-y-8">
      <header className="max-w-content">
        <h1 className="text-3xl font-semibold text-text-primary">
          {course.title}
        </h1>
        <p className="mt-2 text-md text-text-secondary">{course.description}</p>
        <div className="mt-6">
          <ProgressBar value={percent} label="Ihr Fortschritt in diesem Kurs" />
        </div>
      </header>

      <ul className="grid gap-6">
        {moduleRows.map((module) => {
          const moduleProgress = progressRows.find(
            (p) => p.moduleId === module.id,
          );
          const isPublished = module.status === "published";

          return (
            <li key={module.id}>
              <Card>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>
                      {module.description ?? "Praxisnahes Lernmodul"}
                      {module.estimatedMinutes && (
                        <> · ca. {module.estimatedMinutes} Min.</>
                      )}
                    </CardDescription>
                    {moduleProgress?.completed && (
                      <p className="mt-2 text-sm text-success">
                        Abgeschlossen
                        {moduleProgress.score != null &&
                          ` · ${moduleProgress.score}%`}
                      </p>
                    )}
                  </div>
                  {isPublished ? (
                    <Link href={`/learn/${module.slug}`}>
                      <Button>Modul starten</Button>
                    </Link>
                  ) : (
                    <Button disabled variant="secondary">
                      In Vorbereitung
                    </Button>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
