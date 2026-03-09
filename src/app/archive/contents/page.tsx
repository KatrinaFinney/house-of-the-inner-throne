import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLessonsByVolume,
  getStructurePageBySlug,
} from "@/lib/archive/get-archive";
import { volumeMap } from "@/lib/archive/volume-map";
import { ArchiveMdx } from "@/components/archive/archive-mdx";

export default async function ContentsPage() {
  const page = await getStructurePageBySlug("table-of-contents");

  if (!page) {
    notFound();
  }

  const volumes = await Promise.all(
    Object.values(volumeMap).map(async (volume) => {
      const lessons = await getLessonsByVolume(volume.key);
      return {
        ...volume,
        lessons,
      };
    })
  );

  return (
    <main className="archive-shell">
      <div className="archive-panel">
        <div className="archive-panel-inner">
          <header className="mb-14 max-w-3xl">
            <Link href="/archive" className="manuscript-breadcrumb">
              Archive
            </Link>

            <p className="mt-8 archive-header-kicker">Canonical Index</p>
            <h1 className="archive-page-title">{page.title}</h1>
          </header>

          <div className="max-w-3xl">
            {page.content ? await ArchiveMdx({ source: page.content }) : null}
          </div>

          <section className="mt-16 space-y-12">
            {volumes.map((volume) => (
              <div key={volume.key} className="max-w-4xl">
                <div className="mb-5">
                  <Link
                    href={`/archive/volume/${volume.key}`}
                    className="manuscript-breadcrumb"
                  >
                    Volume {volume.number}
                  </Link>

                  <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] text-neutral-950 md:text-4xl">
                    {volume.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-neutral-600">
                    {volume.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {volume.lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={lesson.href}
                      className="archive-card block"
                    >
                      <p className="archive-card-kicker">
                        Lesson {lesson.lessonNumber}
                      </p>
                      <h3 className="mt-2 text-2xl font-light leading-tight tracking-[-0.02em] text-neutral-950">
                        {lesson.title}
                      </h3>
                      {lesson.excerpt ? (
                        <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-neutral-600">
                          {lesson.excerpt}
                        </p>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}