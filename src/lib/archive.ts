import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const ARCHIVE_DIR = path.join(ROOT, "content", "archive");
const STRUCTURE_DIR = path.join(ARCHIVE_DIR, "structure");

export type Lesson = {
  title: string;
  lessonNumber: number;
  volumeNumber: 1 | 2 | 3 | 4;
  volumeOrder: number;
  slug: string;
  excerpt?: string | null;
  ritualNote?: string | null;
  status: "draft" | "published";
  content: string;
  filePath: string;
};

export type StructurePage = {
  title: string;
  kind: "preface" | "table-of-contents" | "volume-cover" | "benediction";
  slug: string;
  status: "draft" | "published";
  volumeNumber?: 1 | 2 | 3 | 4;
  content: string;
  filePath: string;
};

function isMdxFile(fileName: string) {
  return fileName.endsWith(".mdx") || fileName.endsWith(".md");
}

async function getFilesRecursive(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getFilesRecursive(fullPath)));
    } else if (entry.isFile() && isMdxFile(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeSource(source: string) {
  return source.replace(/^\uFEFF/, "").trimStart();
}

export async function getAllLessons(): Promise<Lesson[]> {
  const volumeDirs = ["volume-1", "volume-2", "volume-3", "volume-4"];
  const lessons: Lesson[] = [];

  for (const dirName of volumeDirs) {
    const dirPath = path.join(ARCHIVE_DIR, dirName);
    let files: string[] = [];

    try {
      files = await getFilesRecursive(dirPath);
    } catch {
      continue;
    }

    for (const filePath of files) {
      const source = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(normalizeSource(source));

      if (!data || typeof data !== "object") continue;

      const fm = data as Record<string, unknown>;

      if (
        typeof fm.title !== "string" ||
        typeof fm.lessonNumber !== "number" ||
        typeof fm.volumeNumber !== "number" ||
        typeof fm.volumeOrder !== "number" ||
        typeof fm.slug !== "string" ||
        typeof fm.status !== "string"
      ) {
        continue;
      }

      lessons.push({
        title: fm.title,
        lessonNumber: fm.lessonNumber,
        volumeNumber: fm.volumeNumber as 1 | 2 | 3 | 4,
        volumeOrder: fm.volumeOrder,
        slug: fm.slug,
        excerpt: typeof fm.excerpt === "string" ? fm.excerpt : "",
        ritualNote: typeof fm.ritualNote === "string" ? fm.ritualNote : "",
        status: fm.status as "draft" | "published",
        content: content.trim(),
        filePath,
      });
    }
  }

  return lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
}

export async function getPublishedLessons(): Promise<Lesson[]> {
  const lessons = await getAllLessons();
  return lessons.filter((lesson) => lesson.status === "published");
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const lessons = await getPublishedLessons();
  return lessons.find((lesson) => lesson.slug === slug) ?? null;
}

export async function getLessonsByVolume(volumeNumber: 1 | 2 | 3 | 4): Promise<Lesson[]> {
  const lessons = await getPublishedLessons();
  return lessons
    .filter((lesson) => lesson.volumeNumber === volumeNumber)
    .sort((a, b) => a.volumeOrder - b.volumeOrder);
}

export async function getAllStructurePages(): Promise<StructurePage[]> {
  let files: string[] = [];

  try {
    files = await getFilesRecursive(STRUCTURE_DIR);
  } catch {
    return [];
  }

  const pages: StructurePage[] = [];

  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(normalizeSource(source));

    if (!data || typeof data !== "object") continue;

    const fm = data as Record<string, unknown>;

    if (
      typeof fm.title !== "string" ||
      typeof fm.kind !== "string" ||
      typeof fm.slug !== "string" ||
      typeof fm.status !== "string"
    ) {
      continue;
    }

    pages.push({
      title: fm.title,
      kind: fm.kind as StructurePage["kind"],
      slug: fm.slug,
      status: fm.status as "draft" | "published",
      volumeNumber:
        typeof fm.volumeNumber === "number"
          ? (fm.volumeNumber as 1 | 2 | 3 | 4)
          : undefined,
      content: content.trim(),
      filePath,
    });
  }

  return pages.filter((page) => page.status === "published");
}

export async function getStructurePageBySlug(slug: string): Promise<StructurePage | null> {
  const pages = await getAllStructurePages();
  return pages.find((page) => page.slug === slug) ?? null;
}