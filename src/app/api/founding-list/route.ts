import { NextResponse } from "next/server";

const MAILERLITE_SUBSCRIBERS_URL =
  "https://connect.mailerlite.com/api/subscribers";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupBody = {
  email?: unknown;
  name?: unknown;
  consent?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  let body: SignupBody;

  try {
    body = (await request.json()) as SignupBody;
  } catch {
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

  if (!token || !groupId) {
    console.error("MailerLite founding-list environment variables are not configured.");
    return NextResponse.json(
      { message: "The founding list is being prepared. Please return soon." },
      { status: 503 },
    );
  }

  const response = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
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
  });

  if (!response.ok) {
    console.error(`MailerLite signup failed with status ${response.status}.`);
    return NextResponse.json(
      { message: "We could not complete your entry. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
