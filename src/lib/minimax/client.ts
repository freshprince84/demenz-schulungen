const DEFAULT_HOST = "https://api.minimax.io";

export class MiniMaxError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "MiniMaxError";
  }
}

function getConfig() {
  const apiKey = process.env.MINIMAX_API_KEY;
  const apiHost = process.env.MINIMAX_API_HOST ?? DEFAULT_HOST;

  if (!apiKey) {
    throw new MiniMaxError("MINIMAX_API_KEY nicht konfiguriert", 503);
  }

  return { apiKey, apiHost };
}

export async function minimaxFetch(
  path: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  const { apiKey, apiHost } = getConfig();
  const response = await fetch(`${apiHost}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new MiniMaxError(
      `MiniMax API Fehler: ${response.status} ${text}`,
      response.status,
    );
  }

  return response.json();
}

export async function generateSpeech(input: {
  text: string;
  voiceId?: string;
  model?: string;
}) {
  return minimaxFetch("/v1/text_to_speech", {
    text: input.text,
    voice_id: input.voiceId ?? "de-standard",
    model: input.model ?? "speech-02-hd",
  });
}

export async function generateImage(input: {
  prompt: string;
  aspectRatio?: string;
}) {
  return minimaxFetch("/v1/image_generation", {
    prompt: input.prompt,
    aspect_ratio: input.aspectRatio ?? "1:1",
    model: "image-01",
  });
}

export async function generateText(input: {
  prompt: string;
  model?: string;
}) {
  return minimaxFetch("/v1/text/chatcompletion_v2", {
    model: input.model ?? "MiniMax-Text-01",
    messages: [{ role: "user", content: input.prompt }],
  });
}
