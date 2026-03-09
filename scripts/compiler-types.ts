export type ArchiveStatus = "draft" | "published";
export type VolumeNumber = 1 | 2 | 3 | 4;

export type LessonFrontmatter = {
  title: string;
  lessonNumber: number;
  volumeNumber: VolumeNumber;
  volumeOrder: number;
  slug?: string;
  ritualNote?: string | null;
  excerpt?: string | null;
  status: ArchiveStatus;
};

export type CompiledLesson = Omit<LessonFrontmatter, "slug"> & {
  slug: string;
  content: string;
  sourceFileName: string;
  outputFileName: string;
  outputDir: string;
  outputPath: string;
};