import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return NextResponse.json({
      status: "ok",
      database: "connected",
      version: "0.1.0",
    });
  } catch {
    return NextResponse.json(
      {
        status: "degraded",
        database: "disconnected",
        version: "0.1.0",
      },
      { status: 503 },
    );
  }
}
