# twyoon.com — Astro Codebase Reference

Astro v5 personal portfolio and technical writings site, deployed via GitHub Pages.

- **Live:** https://twyoon.com
- **Repo:** https://github.com/tyoon10/tyoon10.github.io (branch: `main`)
- **Engine:** Astro v5 (Static Site Generator)
- **Active Directory:** `/home/taewan/workspace/initiatives/twyoon-com/repos/site` (WSL)
- **Legacy Backup:** `/home/taewan/workspace/archive/twyoon-backup` (WSL)

---

## 📂 Content Collections Structure

Content is organized inside type-safe collections matching the Zod schemas configured in `src/content.config.ts`.
*   **Writings (`src/content/writings/`):** Folders containing an `index.md` entry.
*   **Projects (`src/content/projects/`):** Folders containing an `index.md` entry.

Every entry must be a **folder** with `index.md` inside:
```
src/content/
  projects/access-to-experts/index.md
  writings/tracing-the-minds-behind-claude-code/index.md
```
*Note: The loader matches `**/index.{md,mdx}` to automatically ignore helper draft files like `REVIEW.md` inside content folders.*

---

## 📑 Schema Front-Matter Conventions

### Writings Collection Schema:
```yaml
title: "Tracing the Minds Behind Claude Code"
date: 2026-04-06
description: "I spent a weekend reading two Claude Code source trees side by side."
featured: true
tags:
  - "Claude Code"
  - "Anthropic"
```

### Projects Collection Schema:
```yaml
title: "Causal Inference — Interactive Study Guide"
date: 2026-03-01
description: "A single-page interactive guide detailing potential outcomes."
featured: true
tags:
  - "Double ML"
  - "JavaScript"
links:
  - name: "Live App"
    url: "https://tyoon10.github.io/causal-inference/"
    icon: "globe"
  - name: "Codebase"
    url: "https://github.com/tyoon10/causal-inference"
    icon: "github"
```

---

## ✍️ Writing Voice & Article Drafting

The canonical writing-voice guide lives at `private/writing/identity/voice.md` (**gitignored — local-only, not published**). It is the source of truth for tone, structure, and phrasing across all writings.

**Before drafting or substantially editing any `src/content/writings/**/index.md`:**
1. Read `private/writing/identity/voice.md` first and apply it. If a sibling `*-outline.md` exists in the article folder, read that too — the outline is the brief, the voice guide is the style contract.
2. If `voice.md` is absent (e.g., a fresh clone without the local `private/` module), say so and proceed with the article's existing voice rather than inventing one.

**After the user makes direct/manual edits to a draft:**
1. Isolate the user's own changes: `git diff HEAD -- <file>` (or compare against the last Claude-authored version).
2. Distill any recurring signal — tone, structure, phrasing, emphasis, punctuation — and update `voice.md`. **Reconcile, don't just append:** if a new preference supersedes an old rule, flag and revise it (bump the "Last updated" line + provenance). Ignore one-off content edits.
3. In the prose itself, **preserve the user's voice** — flag only genuine grammar issues; never restyle.

Run `/voice-sync` to perform the after-edits review on demand.

---

## 🎨 Visual Design System (Parchment & Navy Default)

The active visual system is defined in `src/styles/design-system.css`, which is the source of truth for the site's tokens and visual primitives:
*   **Canvas & surfaces:** Parchment canvas `#fefefc`, with `#fdfdfa` for surfaces, `#eef1f6` for full-bleed washes, and `#f6f6f3` for inset wells.
*   **Ink & actions:** Near-black ink carries headings and body copy. Ink navy `#17324d` is reserved for actions and action-oriented interactive states, not decorative treatment.
*   **Typography:** Newsreader is the variable serif for display and body typography. Inter is reserved for UI chrome, while JetBrains Mono serves metadata and code. These presets belong to `design-system.css`.
*   **Elevation & shape:** The system uses zero shadows and exactly three role-bound radii: `2px` for surfaces, `6px` for actions, and `999px` for metadata pills.
*   **Brand Affiliate Logos:** Rendered as physical images in `src/components/LogoTray.astro` loaded from `/media/logos/` with premium grayscale transition rules.

---

## 🖼️ Image Integration inside Markdown

*   Always use standard **relative Markdown syntax** to load local images from inside the entry folder:
    `![The Compaction Stages](./compaction-stages.png)`
*   Follow up the image block with a captioned paragraph for visual anchors. `.caption` carries the type and colour from `design-system.css` — never hand-set `font-size` or `color` here:
    `<p class="caption" style="text-align: center; margin-top: -8px; margin-bottom: 24px;">Compaction stages caption...</p>`
*   At compile time, Astro v5 automatically checks, compresses, and outputs optimized `.webp` copies of your images into server assets.

---

## 🛠️ CLI Development Commands

Ensure you are inside the native `/home/taewan/workspace/initiatives/twyoon-com/repos/site` directory and have NVM node environment sourced:

```bash
npm run dev        # Launch local dev server at http://localhost:4321
npm run build      # Trigger production static HTML compiling (outputs to dist/)
npm run preview    # Preview compiled dist/ build locally
npx astro check    # Run schema checks and type validation
```

---

## 🧹 Housekeeping Guidelines

*   The auxiliary script `scripts/migrate-content.cjs` is retained temporarily for workspace migration reference.
*   Do not delete `/home/taewan/workspace/archive/twyoon-backup` as it acts as your absolute safety net backup of the original Hugo site.
