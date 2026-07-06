import { readdir, readFile } from "fs/promises";
import path from "path";
import {
  moduleMetadataSchema,
  quizSchema,
} from "../src/lib/schemas/content";

const MODULES_ROOT = path.join(process.cwd(), "modules");

async function validateModule(slug: string): Promise<string[]> {
  const errors: string[] = [];
  const base = path.join(MODULES_ROOT, slug, "de");

  try {
    const metadataRaw = await readFile(
      path.join(base, "metadata.json"),
      "utf-8",
    );
    const metadata = moduleMetadataSchema.safeParse(JSON.parse(metadataRaw));
    if (!metadata.success) {
      errors.push(`${slug}/metadata.json: ${metadata.error.message}`);
    } else if (metadata.data.slug !== slug) {
      errors.push(`${slug}: Slug stimmt nicht mit Ordner überein`);
    }
  } catch {
    errors.push(`${slug}: metadata.json fehlt oder ist unlesbar`);
    return errors;
  }

  try {
    await readFile(path.join(base, "script.md"), "utf-8");
  } catch {
    errors.push(`${slug}: script.md fehlt`);
  }

  try {
    const quizRaw = await readFile(path.join(base, "quiz.json"), "utf-8");
    const quiz = quizSchema.safeParse(JSON.parse(quizRaw));
    if (!quiz.success) {
      errors.push(`${slug}/quiz.json: ${quiz.error.message}`);
    } else if (quiz.data.moduleSlug !== slug) {
      errors.push(`${slug}: moduleSlug in quiz.json stimmt nicht`);
    }
  } catch {
    errors.push(`${slug}: quiz.json fehlt oder ist unlesbar`);
  }

  return errors;
}

async function main() {
  let entries: string[];
  try {
    entries = await readdir(MODULES_ROOT);
  } catch {
    console.log("Keine Module gefunden — OK für leeres Repo.");
    process.exit(0);
  }

  const allErrors: string[] = [];
  for (const slug of entries) {
    const stat = await import("fs/promises").then((fs) =>
      fs.stat(path.join(MODULES_ROOT, slug)),
    );
    if (!stat.isDirectory()) continue;
    allErrors.push(...(await validateModule(slug)));
  }

  if (allErrors.length > 0) {
    console.error("Content-Validierung fehlgeschlagen:\n");
    for (const err of allErrors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log(`Content-Validierung OK (${entries.length} Modul-Ordner geprüft).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
