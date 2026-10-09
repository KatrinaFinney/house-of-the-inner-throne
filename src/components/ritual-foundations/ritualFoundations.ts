export const ritualFoundations = [
  {
    title: "Herbs",
    body: "Learn the spiritual qualities of common ritual herbs and how they are used in cleansing, blessing, focus, and intentional work.",
    href: "/ritual-foundations/herbs",
    guideHref: "/ritual-foundations/herbs/full-guide",
    guideTitle: "Herbs & Rooted Practice",
    guideSubtitle: "Relationship, discernment, and the disciplined use of plant materials.",
    pdfHref: "/guides/herbs-and-rooted-practice.pdf",
  },
  {
    title: "Candles",
    body: "Study candle color, purpose, preparation, and the role of fire as a visible instrument of prayer, presence, and directed intention.",
    href: "/ritual-foundations/candles",
    guideHref: "/ritual-foundations/candles/full-guide",
    guideTitle: "Candles & the Disciplined Flame",
    guideSubtitle: "Fire, focus, timing, and the ethics of visible intention.",
    pdfHref: "/guides/candles-and-the-disciplined-flame.pdf",
  },
  {
    title: "Honey Jars",
    body: "Explore sweetness work, gradual influence, and the spiritual logic of honey jars in relational, devotional, and prosperity practice.",
    href: "/ritual-foundations/honey-jars",
    guideHref: "/ritual-foundations/honey-jars/full-guide",
    guideTitle: "Honey Jars & Ethical Sweetening",
    guideSubtitle: "Patience, mutuality, and the slow work of creating kinder conditions.",
    pdfHref: "/guides/honey-jars-and-ethical-sweetening.pdf",
  },
  {
    title: "Sacred Geometry",
    body: "Enter the study of spiritual pattern, symbolic order, and the use of form as a meditative and ritual language.",
    href: "/ritual-foundations/sacred-geometry",
    guideHref: "/ritual-foundations/sacred-geometry/full-guide",
    guideTitle: "Sacred Geometry & Spiritual Order",
    guideSubtitle: "Pattern, boundary, direction, and the architecture of attention.",
    pdfHref: "/guides/sacred-geometry-and-spiritual-order.pdf",
  },
  {
    title: "Petition Papers",
    body: "Learn how intention is clarified, written, and directed through petition as part of conscious ritual practice.",
    href: "/ritual-foundations/petition-papers",
    guideHref: "/ritual-foundations/petition-papers/full-guide",
    guideTitle: "Petition Papers & Written Will",
    guideSubtitle: "Clarity, prayer, consent, and the disciplined act of naming.",
    pdfHref: "/guides/petition-papers-and-written-will.pdf",
  },
  {
    title: "Incense",
    body: "Understand smoke, atmosphere, elevation, and the spiritual use of incense in cleansing, offering, and preparation.",
    href: "/ritual-foundations/incense",
    guideHref: "/ritual-foundations/incense/full-guide",
    guideTitle: "Incense, Smoke & Sacred Atmosphere",
    guideSubtitle: "Offering, cleansing, ventilation, and the wisdom to practice without smoke.",
    pdfHref: "/guides/incense-smoke-and-sacred-atmosphere.pdf",
  },
] as const;

export function getRitualFoundation(slug: string) {
  return ritualFoundations.find((item) => item.href.endsWith(`/${slug}`));
}
