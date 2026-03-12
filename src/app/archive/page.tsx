import Link from "next/link";
import { getArchiveVolumes, getLessonsByVolume } from "@/lib/archive/get-archive";

export default async function ArchivePage() {
  const volumes = await getArchiveVolumes();

  const volumesWithLessons = await Promise.all(
    volumes.map(async (volume) => {
      const lessons = await getLessonsByVolume(volume.key);

      return {
        ...volume,
        count: lessons.length,
        previewLessons: lessons.slice(0, 3),
      };
    })
  );

  const firstVolume = volumesWithLessons[0];

  return (
    <main className="archive-shell archive-shell-dim">
      <div className="archive-panel archive-panel-contents archive-panel-animated">
        <div className="archive-panel-inner">
          <header className="archive-index-header archive-fade-up">
          <div className="archive-home-link-row">
          <div className="archive-home-link-row">
  <Link href="/?interior=1" className="manuscript-breadcrumb manuscript-breadcrumb-home">
    <span aria-hidden="true" className="manuscript-breadcrumb-arrow">
      ←
    </span>
    <span>Return to the House</span>
  </Link>
</div>
</div>

<p className="archive-header-kicker">Inner Throne Archive</p>
            <h1 className="archive-page-title">The Inner Throne Manuscripts</h1>

            <div className="archive-title-divider" />

            <p className="archive-page-intro">
              A manuscript library of 44 teachings, arranged by volume and
              preserved in sacred sequence. Enter by chamber, or open the
              Manuscript Index and proceed through the archive in order.
            </p>

            <div className="archive-index-actions">
              <Link href="/archive/contents" className="volume-primary-link">
                Open the Manuscript Index
              </Link>

              {firstVolume ? (
                <Link
                  href={`/archive/volume/${firstVolume.key}`}
                  className="volume-secondary-link"
                >
                  Begin with Volume {firstVolume.number}
                </Link>
              ) : null}
            </div>
          </header>

          <section className="archive-index-grid">
            {volumesWithLessons.map((volume, index) => (
              <Link
                key={volume.key}
                href={`/archive/volume/${volume.key}`}
                className="archive-card archive-volume-card archive-fade-up"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="archive-card-kicker">Volume {volume.number}</p>

                <h2 className="archive-card-title">{volume.title}</h2>

                <p className="archive-card-body">{volume.description}</p>

                {volume.previewLessons.length > 0 ? (
  <div className="archive-volume-preview-lessons">
    <p className="archive-volume-preview-kicker">
      Teachings within
    </p>

    <ol className="archive-volume-preview-lesson-list">
      {volume.previewLessons.map((lesson) => (
        <li
          key={lesson.slug}
          className="archive-volume-preview-lesson-item"
        >
          <span className="archive-volume-preview-lesson-number">
            {String(lesson.lessonNumber).padStart(2, "0")}
          </span>
          <span className="archive-volume-preview-lesson-title">
            {lesson.title}
          </span>
        </li>
      ))}
    </ol>
  </div>
) : null}

                <div className="archive-volume-card-footer">
                  <p className="archive-volume-card-count">
                    {volume.count} published teachings
                  </p>

                  <p className="archive-volume-card-action">Open Volume</p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}