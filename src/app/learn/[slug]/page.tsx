import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { modules } from "@/db/schema";
import {
  loadModuleMetadata,
  loadModuleScript,
  parseStoryboard,
} from "@/lib/content/loader";
import { ModulePlayer } from "@/components/module/ModulePlayer";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export default async function LearnModulePage({ params }: PageProps) {
  const { slug } = await params;

  const metadata = await loadModuleMetadata(slug);
  const script = await loadModuleScript(slug);

  if (!metadata || !script) notFound();

  const [moduleRow] = await db
    .select()
    .from(modules)
    .where(eq(modules.slug, slug))
    .limit(1);

  const frames = parseStoryboard(script);

  return (
    <ModulePlayer
      slug={slug}
      title={metadata.title}
      frames={frames}
      moduleId={moduleRow?.id}
    />
  );
}
