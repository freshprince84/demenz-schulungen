import { NextResponse } from "next/server";
import { generateTextSchema } from "@/lib/schemas/api";
import { generateText, MiniMaxError } from "@/lib/minimax/client";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMIT", message: "Zu viele Anfragen" } },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const parsed = generateTextSchema.parse(body);
    const result = await generateText(parsed);
    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof MiniMaxError) {
      return NextResponse.json(
        { error: { code: "MINIMAX_ERROR", message: error.message } },
        { status: error.status },
      );
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Ungültige Anfrage" } },
        { status: 400 },
      );
    }
    throw error;
  }
}
