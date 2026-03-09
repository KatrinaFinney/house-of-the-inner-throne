import fs from "node:fs/promises";
import path from "node:path";
import { runCompileLesson } from "./compile-lesson";

const ROOT = process.cwd();
const INCOMING_DIR = path.join(ROOT, "content", "incoming");

function isLessonSourceFile(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return lower.endsWith(".md") || lower.endsWith(".mdx");
}

function sortLessonFiles(fileNames: string[]): string[] {
  return [...fileNames].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );
}

async function main(): Promise<void> {
  const entries = await fs.readdir(INCOMING_DIR, { withFileTypes: true });

  const lessonFiles = sortLessonFiles(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter(isLessonSourceFile),
  );

  if (lessonFiles.length === 0) {
    console.log("No lesson files found in content/incoming.");
    return;
  }

  console.log(`Found ${lessonFiles.length} incoming lesson file(s).`);
  console.log("");

  const compiledOutputs: string[] = [];

  for (const fileName of lessonFiles) {
    console.log(`Compiling ${fileName}...`);

    const compiled = await runCompileLesson(fileName);
    compiledOutputs.push(compiled.outputPath);

    console.log(`✓ Wrote ${compiled.outputFileName}`);
    console.log("");
  }

  console.log(`Done. Compiled ${compiledOutputs.length} lesson file(s).`);
}

main().catch((error) => {
  console.error("Bulk compiler error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});