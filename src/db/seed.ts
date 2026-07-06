import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { courses, modules } from "./schema";
import { discoverModulesFromFilesystem } from "@/lib/content/discover";

config({ path: ".env.local" });
config({ path: ".env" });

const PILOT_COURSE = {
  slug: "pilot-alltag",
  title: "Alltag in der Demenzpflege",
  description:
    "Pilotkurs mit praxisnahen Modulen zu Hygiene, Medikamenten und Ernährung.",
  language: "DE" as const,
  difficultyLevel: "BEGINNER" as const,
};

async function seed() {
  const discovered = await discoverModulesFromFilesystem({ includeDraft: true });

  const [course] = await db
    .insert(courses)
    .values(PILOT_COURSE)
    .onConflictDoUpdate({
      target: courses.slug,
      set: {
        title: PILOT_COURSE.title,
        description: PILOT_COURSE.description,
        updatedAt: new Date(),
      },
    })
    .returning();

  for (const [index, meta] of discovered.entries()) {
    await db
      .insert(modules)
      .values({
        courseId: course.id,
        slug: meta.slug,
        title: meta.title,
        description: meta.description,
        order: index + 1,
        contentType: "STORYBOARD",
        estimatedMinutes: meta.estimatedMinutes,
        version: meta.version,
        status: meta.status,
      })
      .onConflictDoUpdate({
        target: modules.slug,
        set: {
          title: meta.title,
          description: meta.description,
          order: index + 1,
          estimatedMinutes: meta.estimatedMinutes,
          version: meta.version,
          status: meta.status,
          updatedAt: new Date(),
        },
      });
  }

  const synced = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, course.id));

  console.log(
    `Seed abgeschlossen: Kurs "${course.title}" mit ${synced.length} Modul(en).`,
  );
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed fehlgeschlagen:", error);
    process.exit(1);
  });
