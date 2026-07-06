import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { learnerSessions } from "@/db/schema";

export const SESSION_COOKIE = "demenz_session";
const MAX_AGE = 60 * 60 * 24 * 365;

export async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function ensureLearnerSession(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(SESSION_COOKIE)?.value;

  if (existing) {
    const found = await db
      .select({ id: learnerSessions.id })
      .from(learnerSessions)
      .where(eq(learnerSessions.id, existing))
      .limit(1);

    if (found.length > 0) {
      return existing;
    }
  }

  const sessionId = randomUUID();
  await db.insert(learnerSessions).values({ id: sessionId });
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return sessionId;
}
