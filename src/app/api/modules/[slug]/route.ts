import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { modules } from "@/db/schema";
import { loadModuleMetadata } from "@/lib/content/loader";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;

  const [moduleRow] = await db
    .select()
    .from(modules)
    .where(eq(modules.slug, slug))
    .limit(1);

  const metadata = await loadModuleMetadata(slug);

  if (!moduleRow && !metadata) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Modul nicht gefunden" } },
      { status: 404 },
    );
  }

  return NextResponse.json({
    module: {
      id: moduleRow?.id ?? null,
      slug,
      title: moduleRow?.title ?? metadata?.title,
      description: moduleRow?.description ?? metadata?.description,
      estimatedMinutes:
        moduleRow?.estimatedMinutes ?? metadata?.estimatedMinutes,
      status: moduleRow?.status ?? metadata?.status,
      contentPath: `/modules/${slug}/de`,
    },
  });
}
