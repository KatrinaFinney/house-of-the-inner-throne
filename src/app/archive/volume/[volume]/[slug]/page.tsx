import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLessonBySlug,
  getLessonNavigation,
  getPublishedLessons,
  getVolumeFromRoute,
} from "@/lib/archive/get-archive";
import { ArchiveMdx } from "@/components/archive/archive-mdx";

type PageProps = {
  params: Promise<{
    volume: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const lessons = await getPublishedLessons();

  return lessons.map((lesson) => ({
    volume: lesson.volumeKey,
    slug: lesson.slug,
  }));
}

export default async function LessonPage({ params }: PageProps) {
  const { volume, slug } = await params;

  const volumeData = await getVolumeFromRoute(volume);
  if (!volumeData) notFound();

  const lesson = await getLessonBySlug(volume, slug);
  if (!lesson) notFound();

  const navigation = await getLessonNavigation(lesson.lessonNumber);

  return (
    <main className="archive-shell archive-shell-dim">
      <div className="archive-panel archive-panel-folio archive-panel-animated">
        <div className="archive-panel-inner">
          <header className="folio-header archive-fade-up">
            <div className="folio-register">
              <Link href="/archive" className="manuscript-breadcrumb">
                Archive
              </Link>

              <span className="folio-separator">·</span>

              <Link
                href={`/archive/volume/${volume}`}
                className="manuscript-breadcrumb"
              >
                {volumeData.title}
              </Link>

              <span className="folio-separator">·</span>

              <Link
                href={`/archive/contents#volume-${volume}`}
                className="manuscript-breadcrumb"
              >
                Manuscript Index
              </Link>
            </div>

            <div className="folio-meta-row">
              <p className="archive-header-kicker">
                Volume {lesson.volumeNumber} · Lesson {lesson.lessonNumber}
              </p>
            </div>

            <h1 className="archive-page-title">{lesson.title}</h1>

            <div className="archive-title-divider" />

            {lesson.excerpt ? (
              <p className="archive-page-intro archive-page-intro--incipit">
                {lesson.excerpt}
              </p>
            ) : null}
          </header>

          <div className="folio-layout">
            <article
              className="archive-reading-column archive-reading-column-lesson archive-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {await ArchiveMdx({ source: lesson.content })}
            </article>

            <aside
              className="archive-margin-rail archive-fade-up"
              style={{ animationDelay: "220ms" }}
            >
              {lesson.ritualNote ? (
                <section className="archive-ritual-note archive-ritual-note-margin">
                  <p className="ritual-note-kicker">Ritual Note</p>
                  <p className="ritual-note-body">{lesson.ritualNote}</p>
                </section>
              ) : null}

              <section className="archive-side-card">
                <p className="archive-side-kicker">In This Volume</p>
                <p className="archive-side-body">
                  Lesson {lesson.lessonNumber} · Volume {lesson.volumeNumber}
                </p>

                <div className="archive-side-links">
                  <Link
                    href={`/archive/volume/${volume}`}
                    className="archive-side-link"
                  >
                    Return to Volume
                  </Link>

                  <Link
                    href={`/archive/contents#volume-${volume}`}
                    className="archive-side-link"
                  >
                    Open Manuscript Index
                  </Link>
                </div>
              </section>
            </aside>
          </div>

          <footer className="folio-footer archive-fade-up" style={{ animationDelay: "300ms" }}>
            <nav className="procession-nav">
              {navigation.previous ? (
                <Link href={navigation.previous.href} className="procession-link">
                  <p className="procession-link-kicker">Previous Teaching</p>
                  <h2 className="procession-link-title">
                    {navigation.previous.lessonNumber}.{" "}
                    {navigation.previous.title}
                  </h2>
                </Link>
              ) : (
                <div />
              )}

              {navigation.next ? (
                <Link href={navigation.next.href} className="procession-link">
                  <p className="procession-link-kicker">Next Teaching</p>
                  <h2 className="procession-link-title">
                    {navigation.next.lessonNumber}. {navigation.next.title}
                  </h2>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </footer>
        </div>
      </div>
    </main>
  );
}