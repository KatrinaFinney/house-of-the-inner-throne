import type { MetadataRoute } from "next";
import { getPublishedLessons } from "@/lib/archive/get-archive";
import { ritualFoundations } from "@/components/ritual-foundations/ritualFoundations";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lessons = await getPublishedLessons();
  const staticPaths = [
    "",
    "/archive",
    "/archive/contents",
    "/archive/preface",
    "/archive/closing",
    "/pillars",
    "/pillars/protection",
    "/pillars/power",
    "/pillars/prosperity",
    "/ritual-foundations",
    "/daily-dedication",
    "/storehouse",
    "/ethos",
    "/socials",
    "/privacy",
  ];

  return [
    ...staticPaths.map((path) => ({ url: new URL(path || "/", siteUrl).toString() })),
    ...ritualFoundations.map((item) => ({ url: new URL(item.href, siteUrl).toString() })),
    ...lessons.map((lesson) => ({ url: new URL(lesson.href, siteUrl).toString() })),
  ];
}
