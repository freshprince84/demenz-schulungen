import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const allCourses = await db.select().from(courses).orderBy(asc(courses.title));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold text-text-primary">Kurse</h1>
        <p className="mt-2 text-md text-text-secondary">
          Wählen Sie einen Kurs und arbeiten Sie die Module in Ihrem Tempo durch.
        </p>
      </header>

      {allCourses.length === 0 ? (
        <Card>
          <CardTitle>Noch keine Kurse</CardTitle>
          <CardDescription>
            Führen Sie <code>npm run db:seed</code> aus, nachdem Module unter{" "}
            <code>modules/</code> angelegt wurden.
          </CardDescription>
        </Card>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {allCourses.map((course) => (
            <li key={course.id}>
              <Card interactive className="h-full">
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <div className="mt-6">
                  <Link href={`/courses/${course.id}`}>
                    <Button variant="secondary">Kurs öffnen</Button>
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
