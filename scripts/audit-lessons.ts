import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const INCOMING_DIR = path.join(ROOT, "content", "incoming");
const EXPECTED_LESSON_COUNT = 44;
const EXPECTED_VOLUME_COUNTS = new Map([
  [1, 10],
  [2, 12],
  [3, 11],
  [4, 11],
]);

const REQUIRED_H2 = [
  "The Inner Law",
  "A Mirror for the Practitioner",
  "The Hidden Mechanism",
  "Where This Appears in Daily Life",
  "The Language of Color",
  "Returning to the Inner Throne",
  "The Rite of Alignment",
];

const REQUIRED_RITE_H3 = [
  "The Intelligence Behind the Lesson",
  "Energetic Current",
  "Communion Ritual",
  "The Lunar Gate",
];

type Lesson = {
  fileName: string;
  lessonNumber: number;
  volumeNumber: number;
  volumeOrder: number;
  title: string;
  slug: string;
  energy: string;
  content: string;
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[“”‘’—–]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function countHeading(content: string, level: 2 | 3, heading: string): number {
  const prefix = "#".repeat(level);
  return content
    .split("\n")
    .filter((line) => line.trim() === `${prefix} ${heading}`).length;
}

function addUniqueValue(
  values: Map<string, number[]>,
  value: string,
  lessonNumber: number,
): void {
  const key = normalize(value);
  values.set(key, [...(values.get(key) ?? []), lessonNumber]);
}

async function loadLessons(): Promise<Lesson[]> {
  const fileNames = (await fs.readdir(INCOMING_DIR))
    .filter((fileName) => /\.mdx?$/i.test(fileName))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return Promise.all(
    fileNames.map(async (fileName) => {
      const source = await fs.readFile(path.join(INCOMING_DIR, fileName), "utf8");
      const { data, content } = matter(source.replace(/^\uFEFF/, "").trimStart());
      const intelligence = data.spiritualIntelligence;

      return {
        fileName,
        lessonNumber: data.lessonNumber,
        volumeNumber: data.volumeNumber,
        volumeOrder: data.volumeOrder,
        title: data.title,
        slug: data.slug,
        energy: intelligence?.energy,
        content,
      };
    }),
  );
}

async function main(): Promise<void> {
  const lessons = await loadLessons();
  const errors: string[] = [];

  if (lessons.length !== EXPECTED_LESSON_COUNT) {
    errors.push(`Expected ${EXPECTED_LESSON_COUNT} lessons; found ${lessons.length}.`);
  }

  const numbers = new Map<string, number[]>();
  const titles = new Map<string, number[]>();
  const slugs = new Map<string, number[]>();
  const energies = new Map<string, number[]>();
  const volumeOrders = new Map<string, number[]>();
  const paragraphs = new Map<string, Array<{ lessonNumber: number; excerpt: string }>>();

  for (const lesson of lessons) {
    const requiredFields: Array<[string, unknown]> = [
      ["lessonNumber", lesson.lessonNumber],
      ["volumeNumber", lesson.volumeNumber],
      ["volumeOrder", lesson.volumeOrder],
      ["title", lesson.title],
      ["slug", lesson.slug],
      ["spiritualIntelligence.energy", lesson.energy],
    ];

    for (const [field, value] of requiredFields) {
      if (value === undefined || value === null || value === "") {
        errors.push(`${lesson.fileName}: missing ${field}.`);
      }
    }

    addUniqueValue(numbers, String(lesson.lessonNumber), lesson.lessonNumber);
    addUniqueValue(titles, String(lesson.title), lesson.lessonNumber);
    addUniqueValue(slugs, String(lesson.slug), lesson.lessonNumber);
    addUniqueValue(energies, String(lesson.energy), lesson.lessonNumber);
    addUniqueValue(
      volumeOrders,
      `${lesson.volumeNumber}.${lesson.volumeOrder}`,
      lesson.lessonNumber,
    );

    for (const heading of REQUIRED_H2) {
      const count = countHeading(lesson.content, 2, heading);
      if (count !== 1) {
        errors.push(`${lesson.fileName}: expected one H2 “${heading}”; found ${count}.`);
      }
    }

    for (const heading of REQUIRED_RITE_H3) {
      const count = countHeading(lesson.content, 3, heading);
      if (count !== 1) {
        errors.push(`${lesson.fileName}: expected one H3 “${heading}”; found ${count}.`);
      }
    }

    const h2 = [...lesson.content.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
    const dailyLifeIndex = h2.indexOf("Where This Appears in Daily Life");
    const colorIndex = h2.indexOf("The Language of Color");
    const uniqueTeachingSections = h2.slice(dailyLifeIndex + 1, colorIndex);

    if (dailyLifeIndex < 0 || colorIndex < 0 || uniqueTeachingSections.length < 1) {
      errors.push(`${lesson.fileName}: missing a unique teaching section before color work.`);
    }

    const bodyParagraphs = lesson.content
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
      .filter((paragraph) => paragraph.length >= 100 && !paragraph.startsWith("#"));

    for (const paragraph of bodyParagraphs) {
      const key = normalize(paragraph);
      paragraphs.set(key, [
        ...(paragraphs.get(key) ?? []),
        { lessonNumber: lesson.lessonNumber, excerpt: paragraph.slice(0, 90) },
      ]);
    }
  }

  for (const expected of Array.from({ length: EXPECTED_LESSON_COUNT }, (_, index) => index + 1)) {
    if (!lessons.some((lesson) => lesson.lessonNumber === expected)) {
      errors.push(`Missing lessonNumber ${expected}.`);
    }
  }

  for (const [volumeNumber, expectedCount] of EXPECTED_VOLUME_COUNTS) {
    const volumeLessons = lessons
      .filter((lesson) => lesson.volumeNumber === volumeNumber)
      .sort((a, b) => a.volumeOrder - b.volumeOrder);

    if (volumeLessons.length !== expectedCount) {
      errors.push(`Volume ${volumeNumber}: expected ${expectedCount} lessons; found ${volumeLessons.length}.`);
    }

    volumeLessons.forEach((lesson, index) => {
      if (lesson.volumeOrder !== index + 1) {
        errors.push(
          `Volume ${volumeNumber}: lesson ${lesson.lessonNumber} has order ${lesson.volumeOrder}; expected ${index + 1}.`,
        );
      }
    });
  }

  const uniquenessChecks: Array<[string, Map<string, number[]>]> = [
    ["lesson number", numbers],
    ["title", titles],
    ["slug", slugs],
    ["spiritual intelligence", energies],
    ["volume order", volumeOrders],
  ];

  for (const [label, values] of uniquenessChecks) {
    for (const lessonNumbers of values.values()) {
      if (lessonNumbers.length > 1) {
        errors.push(`Duplicate ${label} in lessons ${lessonNumbers.join(", ")}.`);
      }
    }
  }

  for (const occurrences of paragraphs.values()) {
    if (occurrences.length > 1) {
      errors.push(
        `Repeated substantive paragraph in lessons ${occurrences
          .map(({ lessonNumber }) => lessonNumber)
          .join(", ")}: “${occurrences[0].excerpt}…”`,
      );
    }
  }

  if (errors.length > 0) {
    console.error(`Archive audit failed with ${errors.length} issue(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(
    `Archive audit passed: ${lessons.length} lessons, canonical structure, unique correspondences, contiguous volume order, and no repeated substantive paragraphs.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
