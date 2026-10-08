import type { ArchiveLesson } from "./types";

const WORDS_PER_MINUTE = 220;

const foundationMatchers = [
  { pattern: /candle|fire/i, title: "Candles", href: "/ritual-foundations/candles" },
  { pattern: /herb|plant|cultivation/i, title: "Herbs", href: "/ritual-foundations/herbs" },
  { pattern: /sweet|honey/i, title: "Honey Jars", href: "/ritual-foundations/honey-jars" },
  { pattern: /petition|written intention/i, title: "Petition Papers", href: "/ritual-foundations/petition-papers" },
  { pattern: /smoke|incense|air/i, title: "Incense", href: "/ritual-foundations/incense" },
  { pattern: /geometry|symbol|pattern/i, title: "Sacred Geometry", href: "/ritual-foundations/sacred-geometry" },
] as const;

export function getLessonReadingTime(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getLessonPillar(lesson: ArchiveLesson) {
  const text = `${lesson.title} ${lesson.excerpt ?? ""}`;

  if (/protect|boundary|cleanse|salt|bath|alignment/i.test(text)) {
    return { title: "Protection", href: "/pillars/protection" };
  }

  if (lesson.volumeNumber === 3 || /wealth|prosper|commerce|opportunity|increase/i.test(text)) {
    return { title: "Prosperity", href: "/pillars/prosperity" };
  }

  return { title: "Power", href: "/pillars/power" };
}

export function getRelatedFoundation(lesson: ArchiveLesson) {
  const text = `${lesson.title} ${lesson.excerpt ?? ""} ${lesson.content}`;
  return foundationMatchers.find(({ pattern }) => pattern.test(text)) ?? null;
}

