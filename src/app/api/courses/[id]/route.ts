import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { courses, modules } from "@/db/schema";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .limit(1);

  if (!course) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Kurs nicht gefunden" } },
      { status: 404 },
    );
  }

  const moduleRows = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, course.id))
    .orderBy(asc(modules.order));

  return NextResponse.json({
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      language: course.language,
      modules: moduleRows.map((m) => ({
        id: m.id,
        slug: m.slug,
        title: m.title,
        description: m.description,
        order: m.order,
        estimatedMinutes: m.estimatedMinutes,
        status: m.status,
      })),
    },
  });
}
