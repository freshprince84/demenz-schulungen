import { NextResponse } from "next/server";
import { ensureLearnerSession } from "@/lib/session";

export async function POST() {
  const sessionId = await ensureLearnerSession();
  return NextResponse.json({ ok: true, sessionId });
}
