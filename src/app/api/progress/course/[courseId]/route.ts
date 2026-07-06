import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { modules, progress } from "@/db/schema";
import { ensureLearnerSession } from "@/lib/session";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { courseId } = await params;
  const sessionId = await ensureLearnerSession();

  const courseModules = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, courseId));

  if (courseModules.length === 0) {
    return NextResponse.json({
      courseId,
      totalModules: 0,
      completedModules: 0,
      percentComplete: 0,
    });
  }

  const progressRows = await db
    .select()
    .from(progress)
    .where(eq(progress.sessionId, sessionId));

  const moduleIds = new Set(courseModules.map((m) => m.id));
  const completed = progressRows.filter(
    (p) => moduleIds.has(p.moduleId) && p.completed,
  ).length;

  const percentComplete = Math.round(
    (completed / courseModules.length) * 100,
  );

  return NextResponse.json({
    courseId,
    totalModules: courseModules.length,
    completedModules: completed,
    percentComplete,
  });
}
