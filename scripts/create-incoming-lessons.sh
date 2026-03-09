#!/usr/bin/env bash
set -euo pipefail

mkdir -p content/incoming

create_lesson() {
  local lesson_number="$1"
  local title="$2"
  local volume_number="$3"
  local volume_order="$4"
  local slug="$5"

  local padded
  padded=$(printf "%02d" "$lesson_number")

  cat > "content/incoming/${padded}-${slug}.mdx" <<EOT
---
title: ${title}
lessonNumber: ${lesson_number}
volumeNumber: ${volume_number}
volumeOrder: ${volume_order}
slug: ${slug}
excerpt:
ritualNote:
status: draft
---

# ${title}

## Opening Reflection

## Core Teaching

## Closing Charge
EOT
}

create_lesson 1 "Spiritual Sovereignty" 1 1 "spiritual-sovereignty"
create_lesson 2 "Discipline Creates Spiritual Authority" 1 2 "discipline-creates-spiritual-authority"
create_lesson 3 "Respecting Spirit Is a Form of Protection" 1 3 "respecting-spirit-is-a-form-of-protection"
create_lesson 4 "Authenticity and Audacity Accelerate Spiritual Action" 1 4 "authenticity-and-audacity-accelerate-spiritual-action"
create_lesson 5 "Observe Spiritual Systems, Maintain Autonomy" 1 5 "observe-spiritual-systems-maintain-autonomy"
create_lesson 6 "It Is Better to Give Than to Receive" 1 6 "it-is-better-to-give-than-to-receive"
create_lesson 7 "Attention Is Spiritual Currency" 1 7 "attention-is-spiritual-currency"
create_lesson 8 "Symbols Are Everywhere" 1 8 "symbols-are-everywhere"
create_lesson 9 "Bloodline Cleanses, Bloodline Blessings" 1 9 "bloodline-cleanses-bloodline-blessings"
create_lesson 10 "The Ritual Mind" 1 10 "the-ritual-mind"
create_lesson 11 "The Magick of Cultivation" 1 11 "the-magick-of-cultivation"

create_lesson 12 "Choosing Candles for Precise Effect" 2 1 "choosing-candles-for-precise-effect"
create_lesson 13 "Candle Colors and Spiritual Direction" 2 2 "candle-colors-and-spiritual-direction"
create_lesson 14 "Dressing for Power" 2 3 "dressing-for-power"
create_lesson 15 "Working With Water" 2 4 "working-with-water"
create_lesson 16 "Protecting With Salt" 2 5 "protecting-with-salt"
create_lesson 17 "Sweeten Your Situation" 2 6 "sweeten-your-situation"
create_lesson 18 "Spiritual Baths" 2 7 "spiritual-baths"
create_lesson 19 "Gathering Dirt" 2 8 "gathering-dirt"
create_lesson 20 "Smoke and the Language of Air" 2 9 "smoke-and-the-language-of-air"
create_lesson 21 "The Living Altar" 2 10 "the-living-altar"
create_lesson 22 "The Power of Repetition" 2 11 "the-power-of-repetition"

create_lesson 23 "Using Ancestral Currency to Create Prosperity" 3 1 "using-ancestral-currency-to-create-prosperity"
create_lesson 24 "Partnership With the Moon" 3 2 "partnership-with-the-moon"
create_lesson 25 "The Timing of Opportunity" 3 3 "the-timing-of-opportunity"
create_lesson 26 "The Rhythm of Prosperity" 3 4 "the-rhythm-of-prosperity"
create_lesson 27 "Attraction and Spiritual Presence" 3 5 "attraction-and-spiritual-presence"
create_lesson 28 "The Allure of Glamour Magic" 3 6 "the-allure-of-glamour-magic"
create_lesson 29 "Wealth Is a Living Ecosystem" 3 7 "wealth-is-a-living-ecosystem"
create_lesson 30 "Prosperity Grows Where It Is Fed" 3 8 "prosperity-grows-where-it-is-fed"
create_lesson 31 "Land, Labor, and Spiritual Wealth" 3 9 "land-labor-and-spiritual-wealth"
create_lesson 32 "The Spirits of Commerce" 3 10 "the-spirits-of-commerce"
create_lesson 33 "Circulating Wealth Strengthens Wealth" 3 11 "circulating-wealth-strengthens-wealth"

create_lesson 34 "The Authority of the Ancestors" 4 1 "the-authority-of-the-ancestors"
create_lesson 35 "Building a Living Altar" 4 2 "building-a-living-altar"
create_lesson 36 "Libations and the River of Memory" 4 3 "libations-and-the-river-of-memory"
create_lesson 37 "Ancestral Communion" 4 4 "ancestral-communion"
create_lesson 38 "The Power of Names" 4 5 "the-power-of-names"
create_lesson 39 "Protection Through Alignment" 4 6 "protection-through-alignment"
create_lesson 40 "Sacred Boundaries" 4 7 "sacred-boundaries"
create_lesson 41 "Recognizing Spirit Allies" 4 8 "recognizing-spirit-allies"
create_lesson 42 "Rituals That Change the Atmosphere" 4 9 "rituals-that-change-the-atmosphere"
create_lesson 43 "When Spirit Speaks" 4 10 "when-spirit-speaks"
create_lesson 44 "The Inner Throne" 4 11 "the-inner-throne"

echo "Created 44 incoming lesson files in content/incoming"
