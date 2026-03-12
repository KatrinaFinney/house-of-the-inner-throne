import Link from "next/link";

const chamberLinks = [
  {
    title: "Protection",
    body: "Protection preserves freedom. Enter this chamber for clarity, covering, cleansing, and the restoration of inner space.",
    href: "/pillars/protection",
  },
  {
    title: "Power",
    body: "Power is the freedom to stand in your own authority. Enter this chamber for worthiness, autonomy, and chosen self-mastery.",
    href: "/pillars/power",
  },
  {
    title: "Prosperity",
    body: "Prosperity is the freedom to receive and expand. Enter this chamber for increase, flow, blessing, and sacred material relationship.",
    href: "/pillars/prosperity",
  },
];

export default function PillarsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#171510_0%,#0b0b09_38%,#060606_100%)] px-6 py-24 text-(--text)">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] uppercase tracking-[0.38em] text-(--gold) sm:text-xs">
          The Three Pillars
        </p>

        <h1 className="mt-5 max-w-4xl text-[3rem] leading-[0.95] sm:text-[4rem] md:text-[5rem]">
          Enter the current that meets your spirit.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-(--muted)">
          The pillars are three living currents within the House. Each one
          offers a different doorway into sovereignty, ritual life, and sacred
          becoming.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {chamberLinks.map((chamber) => (
            <Link
              key={chamber.title}
              href={chamber.href}
              className="rounded-[2rem] border border-[rgba(202,169,107,0.12)] bg-white/[0.04] p-4 transition hover:bg-white/[0.05]"
            >
              <div className="h-full rounded-[1.5rem] border border-[rgba(202,169,107,0.14)] bg-black/20 p-7">
                <h2 className="text-3xl">{chamber.title}</h2>
                <p className="mt-4 text-base leading-8 text-(--muted)">
                  {chamber.body}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-(--gold)">
                  Enter {chamber.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
