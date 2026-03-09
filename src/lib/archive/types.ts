export type ArchiveStatus = "draft" | "published";

export type VolumeNumber = 1 | 2 | 3 | 4;

export type ArchiveLessonMeta = {
  title: string;
  lessonNumber: number;
  volumeNumber: VolumeNumber;
  volumeOrder: number;
  slug: string;
  ritualNote?: string;
  excerpt?: string;
  status: ArchiveStatus;
};

export type ArchiveLesson = ArchiveLessonMeta & {
  content: string;
  volumeKey: string;
  volumeTitle: string;
  href: string;
};

export type ArchiveVolume = {
  number: VolumeNumber;
  key: string;
  title: string;
  description: string;
};
export type ArchiveStructureKind =
  | "preface"
  | "table-of-contents"
  | "volume-cover"
  | "benediction";

export type ArchiveStructurePage = {
  title: string;
  kind: ArchiveStructureKind;
  slug: string;
  status: ArchiveStatus;
  volumeNumber?: number;
  content: string;
  href: string;
};