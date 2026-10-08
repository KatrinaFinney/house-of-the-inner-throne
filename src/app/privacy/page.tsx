import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0b0b09] px-6 py-24 text-(--text)">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">Privacy</p>
        <h1 className="mt-5 text-5xl">Your information is approached with care.</h1>
        <div className="mt-8 space-y-5 text-lg leading-8 text-(--muted)">
          <p>When you join the founding list, the Shrine collects the name and email address you choose to provide.</p>
          <p>This information is used to send manuscript teachings, release notices, Daily Dedication notices, and Storehouse announcements. It is processed through MailerLite and is not sold.</p>
          <p>You may unsubscribe through the link included in any email. Unsubscribing stops future marketing correspondence.</p>
        </div>
        <Link href="/?interior=1" className="mt-10 inline-flex rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-[0.14em]">
          Return to the Shrine
        </Link>
      </article>
    </main>
  );
}
