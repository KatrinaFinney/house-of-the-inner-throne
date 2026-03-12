import Link from "next/link";
import {
  getLessonsByVolume,
  getVolumeFromRoute,
} from "@/lib/archive/get-archive";
import { volumeMap } from "@/lib/archive/volume-map";

type VolumeEntry = {
  key: string;
  volumeData: Awaited<ReturnType<typeof getVolumeFromRoute>>;
  lessons: Awaited<ReturnType<typeof getLessonsByVolume>>;
};

type ResolvedVolumeEntry = {
  key: string;
  volumeData: NonNullable<Awaited<ReturnType<typeof getVolumeFromRoute>>>;
  lessons: Awaited<ReturnType<typeof getLessonsByVolume>>;
};

function hasVolumeData(entry: VolumeEntry): entry is ResolvedVolumeEntry {
  return entry.volumeData !== null;
}

export default async function ArchiveContentsPage() {
  const volumes: VolumeEntry[] = await Promise.all(
    Object.values(volumeMap).map(async (volume) => {
      const volumeData = await getVolumeFromRoute(volume.key);
      const lessons = await getLessonsByVolume(volume.key);

      return {
        key: volume.key,
        volumeData,
        lessons,
      };
    })
  );

  const renderedVolumes = volumes.filter(hasVolumeData);

  return (
    <main className="archive-shell archive-shell-dim">
      <div className="archive-panel archive-panel-contents archive-panel-animated">
        <div className="archive-panel-inner">
          <header className="contents-header archive-fade-up">
            <Link href="/archive" className="manuscript-breadcrumb">
              Archive
            </Link>

            <p className="archive-header-kicker mt-8">Master Index</p>

            <h1 className="archive-page-title">
              The Inner Throne Manuscript Index
            </h1>

            <div className="archive-title-divider" />

            <p className="archive-page-intro contents-intro">
              The manuscripts are arranged below by volume and preserved in
              sacred sequence. Enter by chamber, or open any teaching directly.
            </p>
          </header>

          <nav
            className="contents-volume-nav archive-fade-up"
            aria-label="Jump to volume"
            style={{ animationDelay: "100ms" }}
          >
            {renderedVolumes.map(({ key, volumeData }) => (
              <Link
                key={key}
                href={`#volume-${key}`}
                className="contents-volume-link"
              >
                <span className="contents-volume-link-kicker">
                  Volume {volumeData.number}
                </span>
                <span className="contents-volume-link-title">
                  {volumeData.title}
                </span>
              </Link>
            ))}
          </nav>

          <div className="contents-volumes">
            {renderedVolumes.map(({ key, volumeData, lessons }, index) => (
              <section
                key={key}
                id={`volume-${key}`}
                className="contents-volume-section archive-fade-up"
                style={{ animationDelay: `${160 + index * 90}ms` }}
              >
                <div className="contents-volume-header">
                  <div>
                    <p className="archive-header-kicker">
                      Volume {volumeData.number}
                    </p>

                    <h2 className="contents-volume-title">
                      {volumeData.title}
                    </h2>

                    <p className="contents-volume-description">
                      {volumeData.description}
                    </p>
                  </div>

                  <div className="contents-volume-actions">
                    <Link
                      href={`/archive/volume/${key}`}
                      className="manuscript-inline-link"
                    >
                      Open Volume
                    </Link>
                  </div>
                </div>

                <ol className="archive-toc-list">
                  {lessons.map((lesson) => (
                    <li key={lesson.slug} className="archive-toc-item">
                      <Link href={lesson.href} className="archive-toc-link">
                        <div className="archive-toc-leading">
                          <span className="archive-toc-number">
                            {String(lesson.lessonNumber).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="archive-toc-main">
                          <span className="archive-toc-title">
                            {lesson.title}
                          </span>

                          {lesson.excerpt ? (
                            <p className="archive-toc-excerpt">
                              {lesson.excerpt}
                            </p>
                          ) : null}
                        </div>

                        <div className="archive-toc-trailing">
                          <span className="archive-toc-action">
                            Open Manusript
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}