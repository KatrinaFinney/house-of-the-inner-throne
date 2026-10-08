import Link from "next/link";

const links = [
  ["Return to the Shrine", "/?interior=1"],
  ["Archive", "/archive"],
  ["Three Pillars", "/pillars"],
  ["Ritual Foundations", "/ritual-foundations"],
  ["Storehouse", "/storehouse"],
  ["Ethos", "/ethos"],
  ["Privacy", "/privacy"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060606] px-6 py-10 text-(--text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-(--muted)">Shrine of the Inner Throne</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-xs uppercase tracking-[0.12em] text-(--muted) transition hover:text-(--gold)">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
