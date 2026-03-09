import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import slugify from "slugify";
import type {
  ArchiveStatus,
  CompiledLesson,
  LessonFrontmatter,
  VolumeNumber,
} from "./compiler-types";

const ROOT = process.cwd();
const INCOMING_DIR = path.join(ROOT, "content", "incoming");
const ARCHIVE_DIR = path.join(ROOT, "content", "archive");

const VALID_INPUT_EXTENSIONS = new Set([".md", ".mdx"]);
const VALID_STATUSES: ReadonlySet<ArchiveStatus> = new Set(["draft", "published"]);
const VALID_VOLUMES: ReadonlySet<VolumeNumber> = new Set([1, 2, 3, 4]);

function formatLessonNumber(num: number): string {
  return String(num).padStart(2, "0");
}

function normalizeSlug(input: string): string {
  return slugify(input, {
    lower: true,
    strict: true,
    trim: true,
  });
}

function getVolumeDir(volumeNumber: VolumeNumber): string {
  return path.join(ARCHIVE_DIR, `volume-${volumeNumber}`);
}

function isOptionalString(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === "string";
}

function toTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toInteger(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;

    const parsed = Number(trimmed);
    if (Number.isInteger(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function normalizeStatus(value: unknown): ArchiveStatus | undefined {
  if (typeof value !== "string") return undefined;

  const normalized = value.trim().toLowerCase();
  if (normalized === "draft" || normalized === "published") {
    return normalized;
  }

  return undefined;
}

function parseLessonFrontmatter(data: unknown, fileName: string): LessonFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error(`[${fileName}] Frontmatter is missing or invalid.`);
  }

  const value = data as Record<string, unknown>;

  const title = toTrimmedString(value.title);
  const lessonNumber = toInteger(value.lessonNumber);
  const volumeNumber = toInteger(value.volumeNumber);
  const volumeOrder = toInteger(value.volumeOrder);
  const slug = value.slug == null ? undefined : toTrimmedString(value.slug);
  const excerpt = isOptionalString(value.excerpt) ? (value.excerpt ?? "") : undefined;
  const ritualNote = isOptionalString(value.ritualNote) ? (value.ritualNote ?? "") : undefined;
  const status = normalizeStatus(value.status);

  const missing: string[] = [];

  if (!title) missing.push("title");
  if (lessonNumber === undefined) missing.push("lessonNumber");
  if (volumeNumber === undefined) missing.push("volumeNumber");
  if (volumeOrder === undefined) missing.push("volumeOrder");
  if (!status) missing.push("status");

  if (missing.length > 0) {
    const availableKeys = Object.keys(value).sort().join(", ");
    throw new Error(
      `[${fileName}] Invalid frontmatter. Missing or malformed field(s): ${missing.join(", ")}. Present keys: ${availableKeys || "(none)"}`,
    );
  }

  return {
    title: title!,
    lessonNumber: lessonNumber!,
    volumeNumber: volumeNumber! as VolumeNumber,
    volumeOrder: volumeOrder!,
    slug,
    excerpt,
    ritualNote,
    status: status!,
  };
}

function validateSemanticRules(frontmatter: LessonFrontmatter, fileName: string): void {
  if (frontmatter.lessonNumber < 1 || frontmatter.lessonNumber > 44) {
    throw new Error(
      `[${fileName}] lessonNumber must be between 1 and 44. Received: ${frontmatter.lessonNumber}`,
    );
  }

  if (!VALID_VOLUMES.has(frontmatter.volumeNumber)) {
    throw new Error(
      `[${fileName}] volumeNumber must be 1, 2, 3, or 4. Received: ${frontmatter.volumeNumber}`,
    );
  }

  if (frontmatter.volumeOrder < 1) {
    throw new Error(
      `[${fileName}] volumeOrder must be 1 or greater. Received: ${frontmatter.volumeOrder}`,
    );
  }

  if (!frontmatter.title.trim()) {
    throw new Error(`[${fileName}] title cannot be empty.`);
  }

  if (frontmatter.slug !== undefined && !frontmatter.slug.trim()) {
    throw new Error(`[${fileName}] slug cannot be blank when provided.`);
  }

  if (!VALID_STATUSES.has(frontmatter.status)) {
    throw new Error(
      `[${fileName}] status must be "draft" or "published". Received: ${frontmatter.status}`,
    );
  }
}

function stripFinalSuffix(fileName: string): string {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const normalizedBase = base.replace(/-final$/i, "");
  return `${normalizedBase}${ext}`;
}

function ensureSupportedExtension(fileName: string): void {
  const ext = path.extname(fileName).toLowerCase();

  if (!VALID_INPUT_EXTENSIONS.has(ext)) {
    throw new Error(`Incoming file must be .md or .mdx. Received: ${fileName}`);
  }
}

function buildCanonicalOutputFileName(lessonNumber: number, slug: string): string {
  return `${formatLessonNumber(lessonNumber)}-${slug}.mdx`;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDirExists(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function getAllArchiveLessonFiles(dir: string): Promise<string[]> {
  const results: string[] = [];

  if (!(await fileExists(dir))) {
    return results;
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "structure") {
        continue;
      }

      results.push(...(await getAllArchiveLessonFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (VALID_INPUT_EXTENSIONS.has(ext)) {
      results.push(fullPath);
    }
  }

  return results;
}

type ExistingLessonRecord = {
  filePath: string;
  frontmatter: LessonFrontmatter;
  normalizedSlug: string;
};

async function readExistingLessons(): Promise<ExistingLessonRecord[]> {
  const files = await getAllArchiveLessonFiles(ARCHIVE_DIR);
  const lessons: ExistingLessonRecord[] = [];

  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    const normalizedSource = source.replace(/^\uFEFF/, "").trimStart();
    const { data } = matter(normalizedSource);

    try {
      const frontmatter = parseLessonFrontmatter(data, filePath);

      lessons.push({
        filePath,
        frontmatter,
        normalizedSlug: normalizeSlug(frontmatter.slug || frontmatter.title),
      });
    } catch {
      continue;
    }
  }

  return lessons;
}

async function assertNoDuplicates(
  frontmatter: LessonFrontmatter,
  normalizedSlug: string,
  outputPath: string,
): Promise<void> {
  const existingLessons = await readExistingLessons();
  const outputPathResolved = path.resolve(outputPath);

  for (const lesson of existingLessons) {
    if (path.resolve(lesson.filePath) === outputPathResolved) {
      continue;
    }

    if (lesson.frontmatter.lessonNumber === frontmatter.lessonNumber) {
      throw new Error(
        `Duplicate lessonNumber detected: ${frontmatter.lessonNumber} already exists in ${lesson.filePath}`,
      );
    }

    if (lesson.normalizedSlug === normalizedSlug) {
      throw new Error(
        `Duplicate slug detected: "${normalizedSlug}" already exists in ${lesson.filePath}`,
      );
    }
  }
}

async function compileLessonFromFile(incomingFileName: string): Promise<CompiledLesson> {
  ensureSupportedExtension(incomingFileName);

  const incomingPath = path.join(INCOMING_DIR, incomingFileName);

  if (!(await fileExists(incomingPath))) {
    throw new Error(`Incoming file not found: ${incomingFileName}`);
  }

  const source = await fs.readFile(incomingPath, "utf8");

  // Remove a possible UTF-8 BOM and any leading whitespace/newlines
  // before the frontmatter block so gray-matter can parse reliably.
  const normalizedSource = source.replace(/^\uFEFF/, "").trimStart();

  const { data, content } = matter(normalizedSource);

  const frontmatter = parseLessonFrontmatter(data, incomingFileName);
  validateSemanticRules(frontmatter, incomingFileName);

  const normalizedSlug = normalizeSlug(frontmatter.slug || frontmatter.title);

  if (!normalizedSlug) {
    throw new Error(`[${incomingFileName}] Could not derive a valid slug from title/slug.`);
  }

  const cleanIncomingName = stripFinalSuffix(incomingFileName);
  const outputDir = getVolumeDir(frontmatter.volumeNumber);
  const outputFileName = buildCanonicalOutputFileName(frontmatter.lessonNumber, normalizedSlug);
  const outputPath = path.join(outputDir, outputFileName);

  await assertNoDuplicates(frontmatter, normalizedSlug, outputPath);

  return {
    ...frontmatter,
    slug: normalizedSlug,
    excerpt: frontmatter.excerpt ?? "",
    ritualNote: frontmatter.ritualNote ?? "",
    content: content.trim(),
    sourceFileName: cleanIncomingName,
    outputDir,
    outputFileName,
    outputPath,
  };
}

function buildCompiledFile(lesson: CompiledLesson): string {
  const frontmatterData = {
    title: lesson.title,
    lessonNumber: lesson.lessonNumber,
    volumeNumber: lesson.volumeNumber,
    volumeOrder: lesson.volumeOrder,
    slug: lesson.slug,
    excerpt: lesson.excerpt ?? "",
    ritualNote: lesson.ritualNote ?? "",
    status: lesson.status,
  };

  return matter.stringify(`${lesson.content}\n`, frontmatterData);
}

export async function runCompileLesson(incomingFileName: string): Promise<CompiledLesson> {
  const compiled = await compileLessonFromFile(incomingFileName);

  await ensureDirExists(compiled.outputDir);

  const finalContent = buildCompiledFile(compiled);
  await fs.writeFile(compiled.outputPath, finalContent, "utf8");

  return compiled;
}

async function main(): Promise<void> {
  const incomingFileName = process.argv[2];

  if (!incomingFileName) {
    throw new Error("Usage: npm run compile:lesson -- 01-spiritual-sovereignty-FINAL.md");
  }

  const compiled = await runCompileLesson(incomingFileName);

  console.log("Compiled successfully.");
  console.log(`Source: ${incomingFileName}`);
  console.log(`Output: ${compiled.outputPath}`);
}

const currentFilePath = fileURLToPath(import.meta.url);
const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFilePath);

if (isDirectRun) {
  main().catch((error) => {
    console.error("Compiler error:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}