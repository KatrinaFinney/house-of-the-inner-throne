import { NextResponse } from "next/server";

const MAILERLITE_SUBSCRIBERS_URL =
  "https://connect.mailerlite.com/api/subscribers";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GROUP_ID_PATTERN = /^\d+$/;
const REQUEST_TIMEOUT_MS = 8_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

type SignupBody = {
  email?: unknown;
  name?: unknown;
  consent?: unknown;
  website?: unknown;
};

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { message: "Please wait a few minutes before trying again." },
      { status: 429 },
    );
  }

  let body: SignupBody | null;

  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { message: "Please enter your information again." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { message: "Please enter your information again." },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  if (name.length > 80) {
    return NextResponse.json(
      { message: "Please keep your name under 80 characters." },
      { status: 422 },
    );
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { message: "Please confirm that you would like to receive Shrine emails." },
      { status: 422 },
    );
  }

  const token = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_FOUNDING_GROUP_ID;

  if (!token || !groupId || !GROUP_ID_PATTERN.test(groupId)) {
    console.error("MailerLite founding-list environment variables are not configured.");
    return NextResponse.json(
      { message: "The founding list is being prepared. Please return soon." },
      { status: 503 },
    );
  }

  let response: Response;

  try {
    response = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fields: name ? { name } : undefined,
        groups: [groupId],
        status: "active",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    console.error(
      "MailerLite signup request failed.",
      error instanceof Error ? error.name : "Unknown error",
    );
    return NextResponse.json(
      { message: "We could not complete your entry. Please try again shortly." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    console.error(`MailerLite signup failed with status ${response.status}.`);
    return NextResponse.json(
      { message: "We could not complete your entry. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
