import { NextResponse, type NextRequest } from "next/server";

export const MAX_API_BODY_BYTES = 16_384;

export function extractClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

export async function parseBoundedJsonBody(
  request: NextRequest,
  maxBytes = MAX_API_BODY_BYTES,
): Promise<
  | { ok: true; data: unknown }
  | { ok: false; response: NextResponse }
> {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Request payload exceeds maximum allowed size." },
        { status: 413 },
      ),
    };
  }

  const rawText = await request.text();
  if (rawText.length > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Request payload exceeds maximum allowed size." },
        { status: 413 },
      ),
    };
  }

  try {
    return { ok: true, data: JSON.parse(rawText) };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 }),
    };
  }
}
