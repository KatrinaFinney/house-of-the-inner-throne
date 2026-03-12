import { RitualFoundationsGrid } from "@/components/ritual-foundations/RitualFoundationsGrid";
import { ritualFoundations } from "@/components/ritual-foundations/ritualFoundations";

export default function RitualFoundationsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#171510_0%,#0b0b09_38%,#060606_100%)] px-6 py-24 text-(--text)">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,180,111,0.08),transparent_24%)]" />
      <div className="relative mx-auto max-w-6xl">
        <section className="max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.38em] text-(--gold) sm:text-xs">Ritual Foundations</p>
          <h1 className="mt-5 text-[3rem] leading-[0.95] sm:text-[4rem] md:text-[5rem]">Learn the structures beneath the work.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-(--muted)">Ritual Foundations is the instructional chamber of the House. Here, the materials, methods, and symbolic languages of ritual life are made more visible and more usable.</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-(--muted)">Some teachings may be read in shorter form within the site. Fuller guides may be received through your email or phone, so the work may continue beyond the page and accompany you in practice.</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-(--muted)">These guides do not replace intuition. They refine it. They help the practitioner move with greater understanding, clearer intention, and deeper spiritual freedom.</p>
        </section>
        <RitualFoundationsGrid items={ritualFoundations} />
        <section className="mt-20 rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.34em] text-(--gold)">A Note for the Practitioner</p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-(--muted)">The foundations are offered so that ritual practice may become more conscious, not more imitative. Take what clarifies the work. Return often. Let understanding deepen observation, and let observation deepen your own sovereign way of practice.</p>
        </section>
      </div>
    </main>
  );
}
