import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Social Channels",
  description: "Official social channels for Shrine of the Inner Throne are being prepared.",
};

export default function SocialsPage() {
  return (
    <main className="flex min-h-screen items-center bg-[linear-gradient(180deg,#171510_0%,#0b0b09_60%,#060606_100%)] px-6 py-24 text-(--text)">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">Social Channels</p>
        <h1 className="mt-5 text-5xl leading-tight sm:text-6xl">The public channels are being prepared.</h1>
        <p className="mt-7 text-lg leading-8 text-(--muted)">
          The Shrine will share manuscript teachings, Daily Dedication notices,
          and carefully chosen glimpses of the work. Join the founding list to
          receive the official links when they open.
        </p>
        <Link href="/?interior=1#founding-list" className="mt-10 inline-flex rounded-full bg-(--gold) px-7 py-3 text-sm uppercase tracking-[0.14em] text-black">
          Join the Founding List
        </Link>
      </div>
    </main>
  );
}
