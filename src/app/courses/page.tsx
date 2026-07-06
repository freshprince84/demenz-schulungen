import { asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { courses, modules, progress } from "@/db/schema";
import { CourseCard } from "@/components/course/CourseCard";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { getSessionId } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const allCourses = await db.select().from(courses).orderBy(asc(courses.title));
  const sessionId = await getSessionId();

  const coursesWithMeta = await Promise.all(
    allCourses.map(async (course) => {
      const [countRow] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(modules)
        .where(eq(modules.courseId, course.id));

      let progressPercent = 0;
      if (sessionId) {
        const courseModules = await db
          .select({ id: modules.id })
          .from(modules)
          .where(eq(modules.courseId, course.id));
        const progressRows = await db
          .select()
          .from(progress)
          .where(eq(progress.sessionId, sessionId));
        const completed = courseModules.filter((m) =>
          progressRows.some((p) => p.moduleId === m.id && p.completed),
        ).length;
        if (courseModules.length > 0) {
          progressPercent = Math.round(
            (completed / courseModules.length) * 100,
          );
        }
      }

      return {
        ...course,
        moduleCount: countRow?.count ?? 0,
        progressPercent,
      };
    }),
  );

  return (
    <div>
      <PageHero
        title="Ihre Kurse"
        description="Wählen Sie einen Kurs und arbeiten Sie die Module in Ihrem Tempo durch. Jedes Modul endet mit einem kurzen Quiz."
      />

      {coursesWithMeta.length === 0 ? (
        <Card>
          <CardTitle>Noch keine Kurse</CardTitle>
          <CardDescription>
            Nach dem ersten Seed erscheinen hier die Pilotkurse.
          </CardDescription>
        </Card>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2">
          {coursesWithMeta.map((course) => (
            <li key={course.id}>
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                moduleCount={course.moduleCount}
                progressPercent={course.progressPercent}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
