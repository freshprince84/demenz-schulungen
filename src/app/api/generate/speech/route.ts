import { NextResponse } from "next/server";
import { generateSpeechSchema } from "@/lib/schemas/api";
import { generateSpeech, MiniMaxError } from "@/lib/minimax/client";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

async function handleMiniMax(
  request: Request,
  handler: (body: Record<string, unknown>) => Promise<unknown>,
) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMIT", message: "Zu viele Anfragen" } },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const result = await handler(body);
    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof MiniMaxError) {
      return NextResponse.json(
        { error: { code: "MINIMAX_ERROR", message: error.message } },
        { status: error.status },
      );
    }
    throw error;
  }
}

export async function POST(request: Request) {
  return handleMiniMax(request, async (body) => {
    const parsed = generateSpeechSchema.parse(body);
    return generateSpeech(parsed);
  });
}
