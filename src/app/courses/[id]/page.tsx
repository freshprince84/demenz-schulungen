import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { courses, modules, progress } from "@/db/schema";
import { ModuleCard } from "@/components/course/ModuleCard";
import { PageHero } from "@/components/layout/PageHero";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getSessionId } from "@/lib/session";

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

  const sessionId = await getSessionId();
  const progressRows = sessionId
    ? await db
        .select()
        .from(progress)
        .where(eq(progress.sessionId, sessionId))
    : [];

  const completedCount = moduleRows.filter((m) =>
    progressRows.some((p) => p.moduleId === m.id && p.completed),
  ).length;

  const percent =
    moduleRows.length > 0
      ? Math.round((completedCount / moduleRows.length) * 100)
      : 0;

  return (
    <div>
      <PageHero
        title={course.title}
        description={course.description}
        breadcrumb={[
          { label: "Start", href: "/" },
          { label: "Kurse", href: "/courses" },
          { label: course.title },
        ]}
      >
        <ProgressBar
          value={percent}
          label="Ihr Fortschritt in diesem Kurs"
          className="max-w-content"
        />
      </PageHero>

      <section aria-labelledby="modules-heading">
        <h2
          id="modules-heading"
          className="mb-6 text-xl font-semibold text-text-primary"
        >
          Module in diesem Kurs
        </h2>
        <ul className="grid gap-6">
          {moduleRows.map((module) => {
            const moduleProgress = progressRows.find(
              (p) => p.moduleId === module.id,
            );
            return (
              <li key={module.id}>
                <ModuleCard
                  order={module.order}
                  slug={module.slug}
                  title={module.title}
                  description={module.description}
                  estimatedMinutes={module.estimatedMinutes}
                  status={module.status}
                  completed={moduleProgress?.completed}
                  score={moduleProgress?.score}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
