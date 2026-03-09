import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { getVolumeByKey, volumeMap } from "./volume-map";
import type {
  ArchiveLesson,
  ArchiveLessonMeta,
  ArchiveStructurePage,
} from "./types";

const archiveRoot = path.join(process.cwd(), "content/archive");
const structureRoot = path.join(archiveRoot, "structure");

function getVolumeFolder(volumeNumber: number) {
  return `volume-${volumeNumber}`;
}

function normalizeSource(source: string) {
  return source.replace(/^\uFEFF/, "").trimStart();
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(".md") || fileName.endsWith(".mdx");
}

function isValidMeta(data: unknown): data is ArchiveLessonMeta {
  if (!data || typeof data !== "object") return false;

  const value = data as Record<string, unknown>;

  return (
    typeof value.title === "string" &&
    typeof value.lessonNumber === "number" &&
    typeof value.volumeNumber === "number" &&
    typeof value.volumeOrder === "number" &&
    typeof value.slug === "string" &&
    (value.ritualNote === undefined || typeof value.ritualNote === "string") &&
    (value.excerpt === undefined || typeof value.excerpt === "string") &&
    (value.status === "draft" || value.status === "published")
  );
}

function isValidStructureMeta(data: unknown): data is {
  title: string;
  kind: "preface" | "table-of-contents" | "volume-cover" | "benediction";
  slug: string;
  status: "draft" | "published";
  volumeNumber?: number;
} {
  if (!data || typeof data !== "object") return false;

  const value = data as Record<string, unknown>;

  return (
    typeof value.title === "string" &&
    typeof value.kind === "string" &&
    typeof value.slug === "string" &&
    (value.status === "draft" || value.status === "published") &&
    (value.volumeNumber === undefined || typeof value.volumeNumber === "number")
  );
}

async function readLessonFile(fullPath: string): Promise<ArchiveLesson | null> {
  const source = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(normalizeSource(source));

  if (!isValidMeta(data)) {
    throw new Error(`Invalid frontmatter in file: ${fullPath}`);
  }

  const volume = volumeMap[data.volumeNumber as keyof typeof volumeMap];

  if (!volume) {
    throw new Error(`Invalid volumeNumber in file: ${fullPath}`);
  }

  return {
    ...data,
    content: content.trim(),
    volumeKey: volume.key,
    volumeTitle: volume.title,
   href: `/archive/volume/${volume.key}/${data.slug}`,
  };
}

async function readStructureFile(fullPath: string): Promise<ArchiveStructurePage | null> {
  const source = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(normalizeSource(source));

  if (!isValidStructureMeta(data)) {
    return null;
  }

  let href = `/archive/${data.slug}`;

  if (data.kind === "table-of-contents") {
    href = "/archive/contents";
  }

  if (data.kind === "benediction") {
    href = "/archive/closing";
  }

  if (data.kind === "volume-cover" && typeof data.volumeNumber === "number") {
    const volume = volumeMap[data.volumeNumber as keyof typeof volumeMap];
    if (volume) {
      href = `/archive/volume/${volume.key}`;
    }
  }

  return {
    title: data.title,
    kind: data.kind,
    slug: data.slug,
    status: data.status,
    volumeNumber: data.volumeNumber,
    content: content.trim(),
    href,
  };
}

export async function getAllLessons(): Promise<ArchiveLesson[]> {
  const lessons: ArchiveLesson[] = [];

  for (const volumeNumber of [1, 2, 3, 4] as const) {
    const dir = path.join(archiveRoot, getVolumeFolder(volumeNumber));

    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;

      const fullPath = path.join(dir, file);
      const lesson = await readLessonFile(fullPath);

      if (lesson) lessons.push(lesson);
    }
  }

  return lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
}

export async function getPublishedLessons() {
  const lessons = await getAllLessons();
  return lessons.filter((lesson) => lesson.status === "published");
}

export async function getArchiveVolumes() {
  return Object.values(volumeMap);
}

export async function getLessonsByVolume(volumeKey: string) {
  const lessons = await getPublishedLessons();

  return lessons
    .filter((lesson) => lesson.volumeKey === volumeKey)
    .sort((a, b) => a.volumeOrder - b.volumeOrder);
}

export async function getLessonBySlug(volumeKey: string, slug: string) {
  const lessons = await getPublishedLessons();

  return (
    lessons.find(
      (lesson) => lesson.volumeKey === volumeKey && lesson.slug === slug
    ) ?? null
  );
}

export async function getLessonNavigation(lessonNumber: number) {
  const lessons = await getPublishedLessons();
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.lessonNumber === lessonNumber
  );

  return {
    previous: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < lessons.length - 1
        ? lessons[currentIndex + 1]
        : null,
  };
}

export async function getVolumeFromRoute(volumeKey: string) {
  return getVolumeByKey(volumeKey);
}

export async function getAllStructurePages(): Promise<ArchiveStructurePage[]> {
  let files: string[] = [];

  try {
    files = await fs.readdir(structureRoot);
  } catch {
    return [];
  }

  const pages: ArchiveStructurePage[] = [];

  for (const file of files) {
    if (!isMarkdownFile(file)) continue;

    const fullPath = path.join(structureRoot, file);
    const page = await readStructureFile(fullPath);

    if (page && page.status === "published") {
      pages.push(page);
    }
  }

  return pages;
}

export async function getStructurePageBySlug(slug: string) {
  const pages = await getAllStructurePages();
  return pages.find((page) => page.slug === slug) ?? null;
}