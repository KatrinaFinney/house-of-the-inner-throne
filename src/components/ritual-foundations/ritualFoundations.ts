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
    "guideSubtitle": "Choose a color, prepare simply, and give your prayer a place.",
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
    "body": "Work with water, fire, air, and earth.",
    "href": "/ritual-foundations/elemental-magic",
    "guideHref": "/ritual-foundations/elemental-magic/full-guide",
    "guideTitle": "Elemental Magic & Everyday Practice",
    "guideSubtitle": "Explore water, fire, air, and earth through simple ritual.",
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
  }
] as const;

export function getRitualFoundation(slug: string) {
  return ritualFoundations.find((item) => item.href.endsWith(`/${slug}`));
}
