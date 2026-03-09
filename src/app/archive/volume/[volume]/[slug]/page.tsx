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

  if (!volumeData) {
    notFound();
  }

  const lesson = await getLessonBySlug(volume, slug);

  if (!lesson) {
    notFound();
  }

  const navigation = await getLessonNavigation(lesson.lessonNumber);

  return (
    <main className="archive-shell">
      <div className="archive-panel">
        <div className="archive-panel-inner">
          <header style={{ marginBottom: "3rem" }}>
            <div className="archive-reading-column">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Link href="/archive" className="manuscript-breadcrumb">
                  Archive
                </Link>
                <span style={{ color: "rgb(120 113 108)" }}>·</span>
                <Link
                  href={`/archive/volume/${volume}`}
                  className="manuscript-breadcrumb"
                >
                  {volumeData.title}
                </Link>
              </div>

              <p className="archive-header-kicker" style={{ marginTop: "2rem" }}>
                Volume {lesson.volumeNumber} · Lesson {lesson.lessonNumber}
              </p>

              <h1 className="archive-page-title">{lesson.title}</h1>

              <div className="archive-title-divider" />

              {lesson.excerpt ? (
                <p className="archive-page-intro">{lesson.excerpt}</p>
              ) : null}
            </div>
          </header>

          <div className="archive-reading-column">
            {await ArchiveMdx({ source: lesson.content })}
          </div>

          {lesson.ritualNote ? (
            <section className="archive-ritual-note">
              <p className="ritual-note-kicker">Ritual Note</p>
              <p className="ritual-note-body">{lesson.ritualNote}</p>
            </section>
          ) : null}

          <nav className="procession-nav">
            {navigation.previous ? (
              <Link href={navigation.previous.href} className="procession-link">
                <p className="procession-link-kicker">Previous Lesson</p>
                <h2 className="procession-link-title">
                  {navigation.previous.lessonNumber}. {navigation.previous.title}
                </h2>
              </Link>
            ) : (
              <div />
            )}

            {navigation.next ? (
              <Link href={navigation.next.href} className="procession-link">
                <p className="procession-link-kicker">Next Lesson</p>
                <h2 className="procession-link-title">
                  {navigation.next.lessonNumber}. {navigation.next.title}
                </h2>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}