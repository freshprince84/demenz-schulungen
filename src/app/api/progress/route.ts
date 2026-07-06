import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { modules, progress } from "@/db/schema";
import { progressUpdateSchema } from "@/lib/schemas/api";
import { ensureLearnerSession } from "@/lib/session";

export async function GET() {
  const sessionId = await ensureLearnerSession();

  const rows = await db
    .select({
      moduleId: progress.moduleId,
      completed: progress.completed,
      score: progress.score,
      completedAt: progress.completedAt,
      slug: modules.slug,
      title: modules.title,
    })
    .from(progress)
    .innerJoin(modules, eq(progress.moduleId, modules.id))
    .where(eq(progress.sessionId, sessionId));

  return NextResponse.json({ progress: rows });
}

export async function POST(request: Request) {
  const sessionId = await ensureLearnerSession();
  const body = await request.json();
  const parsed = progressUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Ungültige Anfrage",
          details: parsed.error.flatten(),
        },
      },
      { status: 400 },
    );
  }

  const { moduleId, completed, score } = parsed.data;

  const [moduleRow] = await db
    .select({ id: modules.id })
    .from(modules)
    .where(eq(modules.id, moduleId))
    .limit(1);

  if (!moduleRow) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Modul nicht gefunden" } },
      { status: 404 },
    );
  }

  const [existing] = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.sessionId, sessionId),
        eq(progress.moduleId, moduleId),
      ),
    )
    .limit(1);

  if (existing) {
    const [updated] = await db
      .update(progress)
      .set({
        completed,
        score: score ?? existing.score,
        completedAt: completed ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(progress.id, existing.id))
      .returning();

    return NextResponse.json({ progress: updated });
  }

  const [created] = await db
    .insert(progress)
    .values({
      sessionId,
      moduleId,
      completed,
      score,
      completedAt: completed ? new Date() : null,
    })
    .returning();

  return NextResponse.json({ progress: created }, { status: 201 });
}
