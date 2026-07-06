import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { lookup } from "mime-types";

type Params = {
  params: Promise<{ slug: string; path: string[] }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug, path: assetPath } = await params;
  const safeSlug = slug.replace(/[^a-z0-9-]/g, "");
  const filePath = path.join(
    process.cwd(),
    "modules",
    safeSlug,
    "de",
    ...assetPath,
  );

  const modulesRoot = path.join(process.cwd(), "modules", safeSlug, "de");
  if (!filePath.startsWith(modulesRoot)) {
    return NextResponse.json({ error: "Ungültiger Pfad" }, { status: 400 });
  }

  try {
    const data = await readFile(filePath);
    const mime = lookup(filePath) || "application/octet-stream";
    return new NextResponse(data, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
}
