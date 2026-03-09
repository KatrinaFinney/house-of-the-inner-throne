import Link from "next/link";
import { getArchiveVolumes, getLessonsByVolume } from "@/lib/archive/get-archive";

export default async function ArchivePage() {
  const volumes = await getArchiveVolumes();

  const volumesWithCounts = await Promise.all(
    volumes.map(async (volume) => {
      const lessons = await getLessonsByVolume(volume.key);
      return {
        ...volume,
        count: lessons.length,
      };
    })
  );

  return (
    <main className="archive-shell">
      <div className="archive-panel">
        <div className="archive-panel-inner">
          <header className="mb-14 max-w-3xl">
            <p className="archive-header-kicker">Inner Throne Archive</p>
            <h1 className="archive-page-title">The Canonical Teachings</h1>
            <p className="archive-page-intro">
              A manuscript library of the 44 teachings, arranged by volume and
              preserved in sacred sequence. Enter by chamber, proceed by lesson,
              and read as one crossing a threshold rather than consuming a feed.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {volumesWithCounts.map((volume) => (
              <Link
                key={volume.key}
                href={`/archive/volume/${volume.key}`}
                className="archive-card"
              >
                <p className="archive-card-kicker">Volume {volume.number}</p>
                <h2 className="archive-card-title">{volume.title}</h2>
                <p className="archive-card-body">{volume.description}</p>
                <p className="mt-6 text-sm text-stone-500">
                  {volume.count} published teachings
                </p>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}