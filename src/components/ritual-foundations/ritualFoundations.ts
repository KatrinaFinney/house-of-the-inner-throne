export const ritualFoundations = [
  {
    "title": "Herbs & Roots",
    "body": "Everyday plants and their spiritual uses.",
    "href": "/ritual-foundations/herbs",
    "guideHref": "/ritual-foundations/herbs/full-guide",
    "guideTitle": "Herbs & Rooted Practice",
    "guideSubtitle": "Relationship, discernment, and the disciplined use of plant materials.",
    "pdfHref": "/guides/herbs-and-rooted-practice.pdf"
  },
  {
    "title": "Candle Work",
    "body": "Colors, preparation, and simple candle practices.",
    "href": "/ritual-foundations/candles",
    "guideHref": "/ritual-foundations/candles/full-guide",
    "guideTitle": "Candles & the Disciplined Flame",
    "guideSubtitle": "Color, candle size, working duration, and the rhythm of your prayer.",
    "pdfHref": "/guides/candles-and-the-disciplined-flame.pdf"
  },
  {
    "title": "Honey Jars",
    "body": "An introduction to sweetening work.",
    "href": "/ritual-foundations/honey-jars",
    "guideHref": "/ritual-foundations/honey-jars/full-guide",
    "guideTitle": "Honey Jars & Ethical Sweetening",
    "guideSubtitle": "Simple sweetening practices for welcome, goodwill, and mutual affection.",
    "pdfHref": "/guides/honey-jars-and-ethical-sweetening.pdf"
  },
  {
    "title": "Sacred Geometry",
    "body": "Explore symbols, patterns, and sacred space.",
    "href": "/ritual-foundations/sacred-geometry",
    "guideHref": "/ritual-foundations/sacred-geometry/full-guide",
    "guideTitle": "Sacred Geometry & Spiritual Order",
    "guideSubtitle": "Simple shapes for attention, boundaries, and meaningful practice.",
    "pdfHref": "/guides/sacred-geometry-and-spiritual-order.pdf"
  },
  {
    "title": "Elemental Magic",
    "body": "Explore water's depth, earth's endurance, fire's transformation, and words of power.",
    "href": "/ritual-foundations/elemental-magic",
    "guideHref": "/ritual-foundations/elemental-magic/full-guide",
    "guideTitle": "Elemental Magic & Everyday Practice",
    "guideSubtitle": "The depth of water, the roots of earth, the spark of fire, and the power of the spoken word.",
    "pdfHref": "/guides/elemental-magic-and-everyday-practice.pdf"
  },
  {
    "title": "Tree Magic",
    "body": "Build relationships with trees for protection, strength, wisdom, and abundance.",
    "href": "/ritual-foundations/tree-magic",
    "guideHref": "/ritual-foundations/tree-magic/full-guide",
    "guideTitle": "Tree Magic & Living Relationship",
    "guideSubtitle": "Choosing a tree for protection, strength, wisdom, and abundance.",
    "pdfHref": "/guides/tree-magic-and-living-relationship.pdf"
  },
  {
    "title": "Incense",
    "body": "Work with scent, smoke, and smokeless alternatives.",
    "href": "/ritual-foundations/incense",
    "guideHref": "/ritual-foundations/incense/full-guide",
    "guideTitle": "Incense, Smoke & Sacred Atmosphere",
    "guideSubtitle": "Choose a scent, understand its use, and make room for prayer.",
    "pdfHref": "/guides/incense-smoke-and-sacred-atmosphere.pdf"
  },
  {
    "title": "Petitions",
    "body": "Put your prayers and purposes into words.",
    "href": "/ritual-foundations/petition-papers",
    "guideHref": "/ritual-foundations/petition-papers/full-guide",
    "guideTitle": "Petitions & Written Will",
    "guideSubtitle": "Clear words for prayer, protection, prosperity, and personal direction.",
    "pdfHref": "/guides/petition-papers-and-written-will.pdf"
  },
  {
    "title": "Astrology & Ritual Timing",
    "body": "Follow lunar rhythms, zodiac seasons, and planetary days in your practice.",
    "href": "/ritual-foundations/astrology-ritual-timing",
    "guideHref": "/ritual-foundations/astrology-ritual-timing/full-guide",
    "guideTitle": "Astrology & Ritual Timing",
    "guideSubtitle": "Work with lunar rhythms, zodiac seasons, and planetary days.",
    "pdfHref": "/guides/astrology-and-ritual-timing.pdf"
  },
  {
    "title": "The Opposite Mirror",
    "body": "Explore your shadow through your opposite zodiac sign.",
    "href": "/ritual-foundations/the-opposite-mirror",
    "guideHref": "/ritual-foundations/the-opposite-mirror/full-guide",
    "guideTitle": "The Opposite Mirror",
    "guideSubtitle": "Shadow Work Through Zodiac Opposites.",
    "pdfHref": "/guides/the-opposite-mirror-shadow-and-integration.pdf"
  }
] as const;

export function getRitualFoundation(slug: string) {
  return ritualFoundations.find((item) => item.href.endsWith(`/${slug}`));
}
