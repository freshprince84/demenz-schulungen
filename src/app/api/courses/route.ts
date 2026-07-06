import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { courses, modules } from "@/db/schema";

export async function GET() {
  const allCourses = await db.select().from(courses).orderBy(asc(courses.title));

  const coursesWithCount = await Promise.all(
    allCourses.map(async (course) => {
      const moduleRows = await db
        .select({ id: modules.id })
        .from(modules)
        .where(eq(modules.courseId, course.id));

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        moduleCount: moduleRows.length,
        language: course.language,
      };
    }),
  );

  return NextResponse.json({ courses: coursesWithCount });
}
