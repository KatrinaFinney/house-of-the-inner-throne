import Link from "next/link";

const links = [
  ["Begin Within", "/?interior=1#begin-within"],
  ["Archive", "/archive"],
  ["Three Pillars", "/pillars"],
  ["Ritual Foundations", "/ritual-foundations"],
  ["Storehouse", "/storehouse"],
  ["Ethos", "/ethos"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header-safe sticky top-0 z-30 border-b border-white/10 bg-[#080807]/92 py-4 text-(--text) backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 sm:gap-6">
        <Link href="/?interior=1" className="max-w-48 font-display text-[0.9rem] leading-tight tracking-[0.04em] text-(--text) sm:max-w-none sm:text-lg">
          Shrine of the Inner Throne
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-[0.68rem] uppercase tracking-[0.14em] text-(--muted) transition hover:text-(--gold)">
              {label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-white/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-(--muted)">
            Menu
          </summary>
          <nav aria-label="Mobile primary" className="absolute right-0 top-12 w-64 rounded-2xl border border-white/10 bg-[#0b0b09] p-3 shadow-2xl">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-xs uppercase tracking-[0.14em] text-(--muted) hover:bg-white/5 hover:text-(--gold)">
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

