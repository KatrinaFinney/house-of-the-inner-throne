import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "../src/lib/frontmatter";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const archiveRoot = path.join(root, "content", "archive");

const staticRoutes = new Set([
  "/",
  "/archive",
  "/archive/closing",
  "/archive/contents",
  "/archive/preface",
  "/daily-dedication",
  "/pillars",
  "/pillars/power",
  "/pillars/prosperity",
  "/pillars/protection",
  "/privacy",
  "/ritual-foundations",
  "/socials",
  "/storehouse",
]);

const volumeKeys: Record<number, string> = {
  1: "foundations-of-sovereignty",
  2: "the-architecture-of-ritual",
  3: "the-ecology-of-prosperity",
  4: "the-lineage-of-spirit",
};

for (const key of Object.values(volumeKeys)) {
  staticRoutes.add(`/archive/volume/${key}`);
}

for (const volumeNumber of [1, 2, 3, 4]) {
  const directory = path.join(archiveRoot, `volume-${volumeNumber}`);
  for (const file of fs.readdirSync(directory)) {
    if (!file.endsWith(".mdx")) continue;
    const { data } = parseFrontmatter(fs.readFileSync(path.join(directory, file), "utf8"));
    if (data.status === "published" && typeof data.slug === "string") {
      staticRoutes.add(`/archive/volume/${volumeKeys[volumeNumber]}/${data.slug}`);
    }
  }
}

const ritualSlugs = ["herbs", "candles", "honey-jars", "sacred-geometry", "petition-papers", "incense"];
for (const slug of ritualSlugs) {
  staticRoutes.add(`/ritual-foundations/${slug}`);
  staticRoutes.add(`/ritual-foundations/${slug}/full-guide`);
}

function sourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    return /\.(tsx?|jsx?)$/.test(entry.name) ? [fullPath] : [];
  });
}

const missing = new Map<string, Set<string>>();
const hrefPattern = /href\s*[:=]\s*["'](\/[^"]*?)["']/g;

for (const file of sourceFiles(sourceRoot)) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(hrefPattern)) {
    const href = match[1];
    const route = href.split(/[?#]/)[0] || "/";
    if (staticRoutes.has(route)) continue;
    const files = missing.get(href) ?? new Set<string>();
    files.add(path.relative(root, file));
    missing.set(href, files);
  }
}

if (missing.size) {
  console.error("Internal link audit failed:");
  for (const [href, files] of missing) {
    console.error(`- ${href} (${[...files].join(", ")})`);
  }
  process.exit(1);
}

console.log(`Internal link audit passed: ${staticRoutes.size} known destinations and no broken literal hrefs.`);
