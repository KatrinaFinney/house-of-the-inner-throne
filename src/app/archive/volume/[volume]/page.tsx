import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLessonsByVolume,
  getStructurePageBySlug,
  getVolumeFromRoute,
} from "@/lib/archive/get-archive";
import { volumeMap } from "@/lib/archive/volume-map";
import { ArchiveMdx } from "@/components/archive/archive-mdx";

type PageProps = {
  params: Promise<{
    volume: string;
  }>;
};

export async function generateStaticParams() {
  return Object.values(volumeMap).map((volume) => ({
    volume: volume.key,
  }));
}

export default async function VolumePage({ params }: PageProps) {
  const { volume } = await params;

  const volumeData = await getVolumeFromRoute(volume);

  if (!volumeData) {
    notFound();
  }

  const lessons = await getLessonsByVolume(volume);
  const coverPage = await getStructurePageBySlug(volume);

  return (
    <main className="archive-shell">
      <div className="archive-panel">
        <div className="archive-panel-inner">
          <header className="mb-14 max-w-3xl">
            <Link href="/archive" className="manuscript-breadcrumb">
              Archive
            </Link>

            <p className="mt-8 archive-header-kicker">Volume {volumeData.number}</p>
            <h1 className="archive-page-title">{volumeData.title}</h1>
            <p className="archive-page-intro">{volumeData.description}</p>
          </header>

          {coverPage?.content ? (
            <div className="mb-14 max-w-3xl">
              {await ArchiveMdx({ source: coverPage.content })}
            </div>
          ) : null}

          <section className="space-y-4">
            {lessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={lesson.href}
                className="archive-card block"
              >
                <p className="archive-card-kicker">Lesson {lesson.lessonNumber}</p>
                <h2 className="mt-2 text-2xl font-light leading-tight tracking-[-0.02em] text-neutral-950">
                  {lesson.title}
                </h2>
                {lesson.excerpt ? (
                  <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-neutral-600">
                    {lesson.excerpt}
                  </p>
                ) : null}
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}