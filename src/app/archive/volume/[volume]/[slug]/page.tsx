import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLessonBySlug,
  getLessonNavigation,
  getPublishedLessons,
  getVolumeFromRoute,
} from "@/lib/archive/get-archive";
import { ArchiveMdx } from "@/components/archive/archive-mdx";
import {
  getLessonPillar,
  getLessonReadingTime,
  getRelatedFoundation,
} from "@/lib/archive/lesson-context";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { volume, slug } = await params;
  const lesson = await getLessonBySlug(volume, slug);

  if (!lesson) return { title: "Manuscript" };

  return {
    title: lesson.title,
    description: lesson.excerpt || `Lesson ${lesson.lessonNumber} of the Inner Throne Manuscripts.`,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { volume, slug } = await params;

  const [volumeData, lesson] = await Promise.all([
    getVolumeFromRoute(volume),
    getLessonBySlug(volume, slug),
  ]);
  if (!volumeData) notFound();
  if (!lesson) notFound();

  const [navigation, publishedLessons] = await Promise.all([
    getLessonNavigation(lesson.lessonNumber),
    getPublishedLessons(),
  ]);
  const totalLessons = publishedLessons.length;
  const readingTime = getLessonReadingTime(lesson.content);
  const progress = Math.round((lesson.lessonNumber / totalLessons) * 100);
  const pillar = getLessonPillar(lesson);
  const relatedFoundation = getRelatedFoundation(lesson);

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
                Volume {lesson.volumeNumber} · Manuscript {lesson.lessonNumber} of {totalLessons} · {readingTime} min read
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

              <section className="archive-reflection" aria-labelledby="reflection-heading">
                <p className="ritual-note-kicker">Carry It With You</p>
                <h2 id="reflection-heading">Reflection</h2>
                <p>
                  Name one truth from this manuscript that asks to become lived
                  practice. What changes when the teaching is inhabited rather
                  than only understood?
                </p>
              </section>
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
                <p className="archive-side-kicker">Archive Progress</p>
                <p className="archive-side-body">
                  Manuscript {lesson.lessonNumber} of {totalLessons}
                </p>

                <div className="archive-progress-track" aria-label={`${progress}% through the Archive`}>
                  <span style={{ width: `${progress}%` }} />
                </div>
                <p className="archive-progress-label">{progress}% of the 44-manuscript path</p>

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

              <section className="archive-side-card">
                <p className="archive-side-kicker">Continue the Study</p>
                <div className="archive-side-links">
                  <Link href={pillar.href} className="archive-side-link">
                    Pillar of {pillar.title}
                  </Link>
                  {relatedFoundation ? (
                    <Link href={relatedFoundation.href} className="archive-side-link">
                      Foundation: {relatedFoundation.title}
                    </Link>
                  ) : (
                    <Link href="/ritual-foundations" className="archive-side-link">
                      Explore Ritual Foundations
                    </Link>
                  )}
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
                  <p className="procession-link-kicker">Continue Reading</p>
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
