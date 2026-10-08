import { parse } from "yaml";

export function parseFrontmatter(source: string) {
  const normalized = source.replace(/^\uFEFF/, "").trimStart();
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    return { data: {} as Record<string, unknown>, content: normalized };
  }

  const data = parse(match[1]) as unknown;
  return {
    data: data && typeof data === "object" ? (data as Record<string, unknown>) : {},
    content: normalized.slice(match[0].length),
  };
}
