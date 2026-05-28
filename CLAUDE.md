# twyoon.com — Astro Codebase Reference

Astro v5 personal portfolio and technical writings site, deployed via GitHub Pages.

- **Live:** https://twyoon.com
- **Repo:** https://github.com/tyoon10/tyoon10.github.io (branch: `main`)
- **Engine:** Astro v5 (Static Site Generator)
- **Active Directory:** `/home/taewan/projects/code/twyoon` (WSL)
- **Legacy Backup:** `/home/taewan/projects/code/twyoon-backup` (WSL)

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

## 🎨 Visual Design System (Alabaster Light Default)

The site is strictly locked into the **clean, high-contrast Alabaster Light theme** (no dark-mode toggle or system-bars are rendered):
*   **Base Variables:** Background base `#fafafc`, base surface white `rgba(255,255,255,0.65)`, high-contrast text Slate-900 `#0f172a`, caption text Slate-500 `#64748b`.
*   **Backdrop Overlay:** Subtly styled dot-matrix overlay (`radial-gradient` using border opacity) with active radial glow blooms in background.
*   **Brand Affiliate Logos:** Rendered as physical images in `src/components/LogoTray.astro` loaded from `/media/logos/` with premium grayscale transition rules.
*   **Typography Presets:** Custom line-heights and margins defined for long-form reading under the `.markdown-body` class inside `global.css`.

---

## 🖼️ Image Integration inside Markdown

*   Always use standard **relative Markdown syntax** to load local images from inside the entry folder:
    `![The Compaction Stages](./compaction-stages.png)`
*   Follow up the image block with a captioned paragraph for visual anchors:
    `<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Compaction stages caption...</p>`
*   At compile time, Astro v5 automatically checks, compresses, and outputs optimized `.webp` copies of your images into server assets.

---

## 🛠️ CLI Development Commands

Ensure you are inside the native `/home/taewan/projects/code/twyoon` directory and have NVM node environment sourced:

```bash
npm run dev        # Launch local dev server at http://localhost:4321
npm run build      # Trigger production static HTML compiling (outputs to dist/)
npm run preview    # Preview compiled dist/ build locally
npx astro check    # Run schema checks and type validation
```

---

## 🧹 Housekeeping Guidelines

*   The auxiliary script `scripts/migrate-content.cjs` is retained temporarily for workspace migration reference.
*   Do not delete `/home/taewan/projects/code/twyoon-backup` as it acts as your absolute safety net backup of the original Hugo site.
