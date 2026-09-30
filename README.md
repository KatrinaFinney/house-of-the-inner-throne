# Shrine of the Inner Throne

Shrine of the Inner Throne is a sacred digital shrine centered on ritual sovereignty, ancestral remembrance, and the three pillars of Protection, Power, and Prosperity.

The project combines a ceremonial entrance experience with the Inner Throne Archive, a manuscript-style collection of 44 teachings arranged across four volumes.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- MDX and file-based content

The Archive intentionally uses MDX files stored in Git. It does not require a database or CMS for the current version.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the project checks with:

```bash
npm run audit:lessons
npm run lint
npm run build
```

## Archive structure

```text
content/
├── incoming/                  # Source manuscripts
└── archive/
    ├── structure/             # Preface, index, volume pages, benediction
    ├── volume-1/              # Foundations of Sovereignty
    ├── volume-2/              # The Architecture of Ritual
    ├── volume-3/              # The Ecology of Prosperity
    └── volume-4/              # The Lineage of Spirit
```

The public Archive routes are:

```text
/archive
/archive/contents
/archive/preface
/archive/volume/[volume]
/archive/volume/[volume]/[slug]
/archive/closing
```

## Compiling manuscripts

Compile one manuscript from `content/incoming`:

```bash
npm run compile:lesson -- 01-spiritual-sovereignty-FINAL.md
```

Compile every incoming manuscript:

```bash
npm run compile:incoming
```

The compiler validates required frontmatter, normalizes slugs, rejects duplicate lesson numbers and slugs, removes the source `-FINAL` suffix, and writes canonical `.mdx` files into the correct volume directory.

The lesson audit also verifies the 44-manuscript canon, evolved lesson anatomy, unique spiritual correspondences, contiguous volume order, and absence of duplicated substantive paragraphs. See [`docs/archive-editorial-standard.md`](docs/archive-editorial-standard.md).

Required lesson metadata includes:

- `title`
- `lessonNumber`
- `volumeNumber`
- `volumeOrder`
- `slug`
- `status`

Optional metadata includes `excerpt` and `ritualNote`.

## Founding-list email setup

The homepage founding-list form sends subscribers to a MailerLite group through
the server-only `/api/founding-list` endpoint. Copy `.env.example` to `.env.local`
and configure:

- `MAILERLITE_API_TOKEN`: generated in MailerLite under **Integrations → MailerLite API**
- `MAILERLITE_FOUNDING_GROUP_ID`: the numeric ID of the MailerLite group that should receive founding-list subscribers

Add the same values to the Vercel project for Preview and Production before
testing a live signup. Never expose the API token through a `NEXT_PUBLIC_`
variable.

## Brand foundation

The Shrine is guided by Sarafina Ethereal and organized around three living pillars:

- Protection
- Power
- Prosperity

Its editorial standard favors discipline over spectacle, responsibility over sensationalism, and spiritual privacy over public performance.

## Current development priorities

1. Stabilize and verify the ceremonial entrance.
2. Resolve unfinished or broken public routes.
3. Map all Pillar recommendations to canonical Archive folios.
4. Add the Shrine's email, policy, and launch infrastructure.
5. Introduce the first Ancestor Money offering after physical prototyping and safety review.
6. Execute the four-week founding content runway in `docs/marketing/`.
