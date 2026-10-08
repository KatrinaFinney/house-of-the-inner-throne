"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function FoundingListSection() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/founding-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Please try again.");
      }

      form.reset();
      setSubmissionState("success");
      setMessage("Your name has been entered. Watch your inbox for the next message from the Shrine.");
    } catch (error) {
      setSubmissionState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <section id="founding-list" className="relative px-6 py-24 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-[2.25rem] border border-[rgba(202,169,107,0.16)] bg-[radial-gradient(circle_at_top_right,rgba(202,169,107,0.12),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-(--gold)">
            The Founding List
          </p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Remain close to the Shrine.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-(--muted)">
            Receive new manuscript teachings, ritual-foundation releases, Daily
            Dedication notices, and the first word when the Storehouse opens.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-(--muted)">
            The Shrine writes with intention. Expect meaningful correspondence,
            not constant noise.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[1.6rem] border border-white/8 bg-black/20 p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-(--gold)">
              Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                maxLength={80}
                className="rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-base normal-case tracking-normal text-(--text) outline-none transition placeholder:text-white/30 focus:border-(--gold)"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-(--gold)">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                className="rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-base normal-case tracking-normal text-(--text) outline-none transition placeholder:text-white/30 focus:border-(--gold)"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="sr-only" aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>

          <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-(--muted)">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 size-4 shrink-0 accent-(--gold)"
            />
            <span>
              I agree to receive teachings and announcements from Shrine of the
              Inner Throne. I may unsubscribe at any time. See the{" "}
              <Link href="/privacy" className="underline decoration-white/30 underline-offset-4 hover:text-(--text)">
                privacy notice
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={submissionState === "submitting"}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-(--gold) bg-(--gold) px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black transition hover:brightness-[1.04] disabled:cursor-wait disabled:opacity-60"
          >
            {submissionState === "submitting" ? "Entering…" : "Enter the Founding List"}
          </button>

          <p
            aria-live="polite"
            className={`mt-4 min-h-6 text-sm leading-6 ${
              submissionState === "error" ? "text-red-200" : "text-(--muted)"
            }`}
          >
            {message}
          </p>
        </form>
      </motion.div>
    </section>
  );
}
