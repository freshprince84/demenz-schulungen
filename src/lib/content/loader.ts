import { readdir, readFile } from "fs/promises";
import path from "path";
import { moduleMetadataSchema, type ModuleMetadata } from "@/lib/schemas/content";

const MODULES_ROOT = path.join(process.cwd(), "modules");

export async function discoverModulesFromFilesystem(options?: {
  includeDraft?: boolean;
}): Promise<ModuleMetadata[]> {
  const includeDraft = options?.includeDraft ?? false;
  let entries: string[];

  try {
    entries = await readdir(MODULES_ROOT);
  } catch {
    return [];
  }

  const modules: ModuleMetadata[] = [];

  for (const slug of entries) {
    const metadataPath = path.join(MODULES_ROOT, slug, "de", "metadata.json");
    try {
      const raw = await readFile(metadataPath, "utf-8");
      const parsed = moduleMetadataSchema.parse(JSON.parse(raw));
      if (parsed.slug !== slug) {
        throw new Error(
          `Slug-Mismatch in ${metadataPath}: Ordner "${slug}", metadata "${parsed.slug}"`,
        );
      }
      if (!includeDraft && parsed.status !== "published") {
        continue;
      }
      modules.push(parsed);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        continue;
      }
      throw error;
    }
  }

  return modules.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function loadModuleMetadata(
  slug: string,
): Promise<ModuleMetadata | null> {
  const metadataPath = path.join(MODULES_ROOT, slug, "de", "metadata.json");
  try {
    const raw = await readFile(metadataPath, "utf-8");
    return moduleMetadataSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export async function loadModuleScript(slug: string): Promise<string | null> {
  const scriptPath = path.join(MODULES_ROOT, slug, "de", "script.md");
  try {
    return await readFile(scriptPath, "utf-8");
  } catch {
    return null;
  }
}

export async function loadModuleQuiz(slug: string) {
  const quizPath = path.join(MODULES_ROOT, slug, "de", "quiz.json");
  const raw = await readFile(quizPath, "utf-8");
  const { quizSchema } = await import("@/lib/schemas/content");
  return quizSchema.parse(JSON.parse(raw));
}

export function getModuleAssetPath(slug: string, relativePath: string): string {
  return `/modules/${slug}/de/${relativePath.replace(/^\/+/, "")}`;
}

export interface StoryboardFrame {
  number: number;
  pictogram?: string;
  text?: string;
  audio?: string;
  durationSeconds?: number;
}

export function parseStoryboard(script: string): StoryboardFrame[] {
  const frames: StoryboardFrame[] = [];
  const sections = script.split(/^## Frame /m).slice(1);

  for (const section of sections) {
    const [header, ...bodyLines] = section.split("\n");
    const number = parseInt(header.trim(), 10);
    const body = bodyLines.join("\n");

    const pictogramMatch = body.match(
      /Pictogramm:\s*`([^`]+)`|Pictogramm:\s*([^\n]+)/i,
    );
    const textMatch = body.match(/Text:\s*"([^"]+)"/i);
    const audioMatch = body.match(/Audio:\s*`([^`]+)`|Audio:\s*([^\n]+)/i);
    const durationMatch = body.match(/Dauer:\s*(\d+)s/i);

    frames.push({
      number,
      pictogram: pictogramMatch?.[1] ?? pictogramMatch?.[2]?.trim(),
      text: textMatch?.[1],
      audio: audioMatch?.[1] ?? audioMatch?.[2]?.trim(),
      durationSeconds: durationMatch ? parseInt(durationMatch[1], 10) : undefined,
    });
  }

  return frames;
}
