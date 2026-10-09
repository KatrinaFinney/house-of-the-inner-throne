import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRitualFoundation,
  ritualFoundations,
} from "@/components/ritual-foundations/ritualFoundations";

type FullGuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ritualFoundations.map((item) => ({
    slug: item.href.split("/").pop()!,
  }));
}

export async function generateMetadata({ params }: FullGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const foundation = getRitualFoundation(slug);
  return foundation
    ? { title: foundation.guideTitle, description: foundation.guideSubtitle }
    : { title: "Full Guide" };
}

export default async function FullGuidePage({ params }: FullGuidePageProps) {
  const { slug } = await params;
  const foundation = getRitualFoundation(slug);
  if (!foundation) notFound();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#171510_0%,#0b0b09_44%,#060606_100%)] px-4 py-20 text-(--text) sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.38em] text-(--gold) sm:text-xs">Ritual Foundations · Complete Guide</p>
          <h1 className="mt-5 text-[2.8rem] leading-[0.98] sm:text-6xl">{foundation.guideTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-(--muted)">{foundation.guideSubtitle}</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-(--muted)">
            Five chambers of cultural context, ethical practice, material safety, discernment, and return to the Inner Throne. Read below or keep the six-page edition with you.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={foundation.pdfHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--gold) px-7 py-3 text-center text-sm uppercase tracking-[0.14em] text-black">View PDF</a>
          <a href={foundation.pdfHref} download className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 py-3 text-center text-sm uppercase tracking-[0.14em]">Download PDF</a>
          <Link href={foundation.href} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 py-3 text-center text-sm uppercase tracking-[0.14em]">Read the Introduction</Link>
        </div>

        <section className="mt-10 overflow-hidden rounded-[1.5rem] border border-[rgba(202,169,107,0.18)] bg-[#f4efe3] shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:rounded-[2rem]">
          <iframe
            src={`${foundation.pdfHref}#view=FitH&toolbar=1&navpanes=0`}
            title={`${foundation.guideTitle} PDF viewer`}
            className="h-[72svh] min-h-[34rem] w-full bg-[#f4efe3] sm:h-[78vh]"
          />
        </section>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-(--muted)">
          If your browser does not display the guide above, use View PDF or Download PDF. The file opens in any standard PDF reader.
        </p>
      </div>
    </main>
  );
}
