# Inner Throne Archive Editorial Standard

## Canon

The Inner Throne Archive contains exactly 44 numbered manuscripts arranged in four volumes.

| Volume | Lessons | Movement |
|---|---:|---|
| I | 1–10 | Self-governance and foundational sovereignty |
| II | 11–22 | Sacred order, protection, and ritual mechanics |
| III | 23–33 | Prosperity, exchange, timing, and material stewardship |
| IV | 34–44 | Spirit, lineage, discernment, and integrated authority |

Lesson 21, “The Living Altar,” belongs in Volume II immediately before Lesson 22, “The Power of Repetition.” This closes the ritual-mechanics sequence before the Archive moves into prosperity.

## The evolved manuscript pattern

Every lesson uses a stable architecture without becoming a duplicated template.

1. **The Inner Law** states the governing principle.
2. **A Mirror for the Practitioner** turns the principle toward self-examination.
3. **The Hidden Mechanism** explains how the principle operates beneath appearances.
4. **Where This Appears in Daily Life** grounds the teaching in recognizable experience.
5. **One or more lesson-specific teaching chambers** deepen the subject through unique insight rather than filler commentary.
6. **The Language of Color** connects the principle to symbolic and candle work.
7. **Returning to the Inner Throne** restores the lesson to sovereignty and responsibility.
8. **The Rite of Alignment** contains four chambers:
   - The Intelligence Behind the Lesson
   - Energetic Current
   - Communion Ritual
   - The Lunar Gate

The lesson-specific chamber is where the pattern becomes more complex. It must name and develop the teaching’s distinct tension, discipline, threshold, or application. Reusing a generic “Extended Commentary” block does not satisfy this standard.

## Repetition rules

Intentional repetition creates canon. Accidental repetition weakens it.

### Preserve

- The shared manuscript headings
- The return to spiritual sovereignty
- Disciplined, culturally careful language
- Color and candle correspondence
- A practical communion rite
- Lunar timing
- Recurring concepts when a later lesson genuinely advances them

### Avoid

- Copied substantive paragraphs
- Duplicate Rite sections
- Repeated spiritual intelligences
- Generic commentary that could belong to any lesson
- Restating an earlier lesson without adding a new mechanism, responsibility, or application
- Sensational claims, guaranteed outcomes, or spectacle-driven language

Thematically related lessons should remain distinct. For example, water as an element, spiritual bathing, libation, and ancestral communion may share vocabulary, but each must teach a different relationship, method, and responsibility.

## Correspondence rule

Each of the 44 lessons has one spiritual intelligence, used once across the Archive. The final corrected sequence assigns:

- Lesson 43, “When Spirit Speaks,” to **Thoth** and the current of **Divine Language**.
- Lesson 44, “The Inner Throne,” to **Amun** and the current of **Hidden Sovereignty**.

This preserves Anubis for Lesson 20 and Obatala for Lesson 3.

## Automated check

Run:

```bash
npm run audit:lessons
```

The audit verifies lesson count and numbering, volume order, required manuscript chambers, unique lesson-specific sections, unique spiritual intelligences, and repeated substantive paragraphs.
