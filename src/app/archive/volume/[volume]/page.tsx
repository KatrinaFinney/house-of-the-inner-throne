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
  if (!volumeData) notFound();

  const lessons = await getLessonsByVolume(volume);
  const coverPage = await getStructurePageBySlug(volume);

  const firstLesson = lessons[0];

  return (
    <main className="archive-shell archive-shell-dim">
      <div className="archive-panel archive-panel-volume">
        <div className="archive-panel-inner">
          <header className="volume-header">
            <Link href="/archive" className="manuscript-breadcrumb">
              Archive
            </Link>

            <p className="archive-header-kicker mt-8">
              Volume {volumeData.number}
            </p>

            <h1 className="archive-page-title">{volumeData.title}</h1>

            <div className="archive-title-divider" />

            <p className="archive-page-intro">{volumeData.description}</p>

            <div className="volume-actions">
              {firstLesson ? (
                <Link href={firstLesson.href} className="volume-primary-link">
                  Begin with Lesson {firstLesson.lessonNumber}
                </Link>
              ) : null}

              <Link
                href={`/archive/contents#volume-${volume}`}
                className="volume-secondary-link"
              >
                Open the Manuscript Index
              </Link>
            </div>
          </header>

          {coverPage?.content ? (
            <section className="volume-cover-text">
              <div className="archive-reading-column archive-reading-column-lesson">
                {await ArchiveMdx({ source: coverPage.content })}
              </div>
            </section>
          ) : null}

          <section className="volume-preview">
            <div className="volume-preview-header">
              <p className="archive-header-kicker">Teachings in This Volume</p>
              <Link
                href={`/archive/contents#volume-${volume}`}
                className="manuscript-inline-link"
              >
                Open Manuscript Index
              </Link>
            </div>

            <ol className="volume-preview-list">
              {lessons.map((lesson) => (
                <li key={lesson.slug} className="volume-preview-item">
                  <Link href={lesson.href} className="volume-preview-link">
                    <span className="volume-preview-number">
                      {String(lesson.lessonNumber).padStart(2, "0")}
                    </span>

                    <span className="volume-preview-title">{lesson.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}