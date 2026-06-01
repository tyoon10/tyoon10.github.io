# Chat Artifact Module

A reusable template + rendering pipeline for turning a Claude conversation into a
clean, **claude.ai-faithful** image artifact you can embed in a writing.

This knowledge base documents the visual language of the real claude.ai chat
interface (reverse-engineered from a screenshot) so every artifact looks like a
genuine screenshot rather than a generic chat mock-up.

Files in this module:

| File | Purpose |
|---|---|
| `README.md` | This knowledge base — design spec + authoring + rendering instructions |
| `template.html` | The reusable artifact skeleton. Copy it, fill in the turns, render, crop. |
| `crop.cjs` | Pure-JS (pngjs) auto-cropper. Removes the magenta sentinel border. `.cjs` because the site package is ESM. Needs `pngjs` (`npm i pngjs`, or run with `NODE_PATH` pointing at one). |

---

## 1. The claude.ai visual language

The single most important detail, and the one most mock-ups get wrong:

> **Claude's responses are set in a SERIF typeface. The user's messages are set in SANS-SERIF.**
> There are no name labels ("You" / "Claude") and no avatars. Roles are
> distinguished purely by **typeface + alignment + bubble-vs-plain**.

That asymmetry is the whole signature of the interface. Everything else is warm
neutrals and generous spacing.

### Anatomy of a turn (top → bottom)

1. **User message** — right-aligned pill bubble, sans-serif, subtle warm-gray fill.
2. **Thinking summary** *(optional)* — one muted sans line with a trailing `›`
   chevron, e.g. *"Weighed reliability and trust as AI's critical bottleneck ›"*.
   This is the collapsed extended-thinking header.
3. **Assistant response** — left-aligned, full content width, **serif**, near-black
   warm text, generous line-height. Supports *italic* emphasis, **bold**, em dashes,
   inline `code`, lists, blockquotes, tables.
4. **Action toolbar** *(optional)* — a row of 4 thin outline icons (copy, thumbs-up,
   thumbs-down, retry) in muted gray, below the final response.
5. **Brand glyph** *(optional)* — the Claude "sunburst" mark in clay/terracotta,
   bottom-left, only at the very end of the exchange.

---

## 2. Design tokens

Warm, low-saturation neutrals on an off-white "oat" background. Values below are
matched to the screenshot; treat them as the canonical palette for this module.

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#faf9f5` | Page / canvas background (warm near-white) |
| `--user-bubble` | `#f0ede4` | User message pill fill |
| `--text` | `#1a1a18` | Primary text (both serif body and user bubble) |
| `--muted` | `#8d8a82` | Thinking line, toolbar icons, secondary text |
| `--border` | `#e6e3da` | Hairline borders / dividers |
| `--code-bg` | `#f0ede4` | Inline code + code block background |
| `--clay` | `#d97757` | Claude brand glyph, accents (Anthropic clay) |

---

## 3. Typography

| Element | Family | Size / line-height | Notes |
|---|---|---|---|
| **Assistant body** | serif: `'Tiempos Text', Georgia, 'Times New Roman', serif` | 17px / 1.75 | The defining choice. Georgia is the closest free fallback to Tiempos. |
| **User bubble** | sans: `-apple-system, 'Segoe UI', system-ui, sans-serif` | 16px / 1.55 | claude.ai uses Styrene; system sans is a faithful fallback. |
| **Thinking line** | sans (same as user) | 14.5px / 1.5 | `--muted` color, trailing `›`. |
| **Inline code** | mono: `'SF Mono', 'Fira Code', Consolas, monospace` | 0.86em | On `--code-bg`, ~4px radius. |
| **Headings in body** | serif, weight 700 | h3 19px / h4 16px | Same serif as body. |

Real claude.ai ships **Tiempos Text** (Klim) for assistant text and **Styrene**
for UI chrome. Both are licensed and not redistributable here, so the template
uses **Georgia** and the **system sans** stack as high-fidelity fallbacks. If you
ever license Tiempos/Styrene, just swap the first family in each stack.

---

## 4. Layout & spacing

- **Content column:** `--col-width: 720px` (claude.ai's reading column is ~720px).
- **User bubble:** `max-width: 75%`, padding `13px 20px`, `border-radius: 22px`.
- **Vertical rhythm (generous — do not tighten):**
  - user bubble → thinking line: ~36px
  - thinking line → response: ~12px
  - response → next user bubble: ~32px
  - paragraph spacing within a response: ~16px
- **Emphasis conventions** (match Claude's actual prose habits): italics for the
  one key word, em dashes for asides, straight or curly quotes consistently, bold
  for the load-bearing clause.

---

## 5. Authoring a new artifact

1. **Copy the template:** `cp template.html my-artifact.html`.
2. **Fill in turns.** Each turn is a `.user-msg` block followed by a `.claude-msg`
   block. Repeat as needed. Use entities: `&lt;` for `<`, `&amp;` for `&`,
   `&rsquo;`/`&ldquo;`/`&rdquo;` for curly quotes.
3. **Toggle optional parts** by deleting the blocks you don't want:
   - `.thinking` line (per response)
   - `.toolbar` (usually only after the last response)
   - `.brand` glyph (only at the very end)
4. **Keep the sentinel.** `html, body { background: #FF00FF; }` is what the cropper
   keys on. Don't change it; it never appears in the final image.

---

## 6. Rendering pipeline (WSL + Windows Chrome)

There is no image-gen step — the artifact is **real HTML rendered to PNG** by a
headless browser, then auto-cropped. On this machine the Linux Chrome in the
puppeteer cache is missing system libs, so we drive **Windows Chrome** from WSL.

```bash
# 0. paths (Windows-side temp is readable by both WSL and Windows Chrome)
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
WTMP_WSL="/mnt/c/Users/$USER_WIN/AppData/Local/Temp/chatgen"   # $USER_WIN e.g. "taewa"
WTMP_WIN='C:\Users\<winuser>\AppData\Local\Temp\chatgen'
mkdir -p "$WTMP_WSL"

# 1. put the HTML where Windows can read it
cp my-artifact.html "$WTMP_WSL/a.html"

# 2. render at 2x (retina-crisp). window-size height just needs to exceed content.
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --user-data-dir="$WTMP_WIN\\profile" \
  --screenshot="$WTMP_WIN\\raw.png" --window-size=860,9000 \
  "$WTMP_WIN\\a.html"

# 3. crop the magenta sentinel border → final PNG
#    (crop.cjs needs pngjs: `npm i pngjs` here, or point NODE_PATH at an install)
node crop.cjs "$WTMP_WSL/raw.png" ./my-artifact.png
```

**Why this works / gotchas:**
- New headless captures only the *viewport*, so we render onto a tall canvas
  (height 9000) and let the cropper find the real content bounds.
- `--force-device-scale-factor=2` doubles pixel density → the 720px column becomes
  1440px of crisp output. Final width ≈ 1440–1520px.
- The page background is the magenta **sentinel** `#FF00FF`; `crop.cjs` trims every
  row/column that is pure magenta, leaving exactly the card. Keep the card on a
  square outer edge (no outer `border-radius`) so no sentinel bleeds into corners.
- If Chrome says "Opening in existing browser session," the screenshot still
  writes; the `--user-data-dir` flag avoids reusing your interactive profile.

---

## 7. Fidelity checklist

Before shipping an artifact, confirm:

- [ ] Assistant text is **serif**, user text is **sans** (not reversed).
- [ ] No "You"/"Claude" name labels, no avatars.
- [ ] Warm off-white bg (`#faf9f5`), not pure white or cool gray.
- [ ] Generous line-height (~1.75) on the serif body.
- [ ] Emphasis uses italics + em dashes the way Claude actually writes.
- [ ] Optional thinking line is muted sans with a trailing `›`.
- [ ] Brand glyph (if used) is clay `#d97757` and appears once, at the end.
- [ ] Embedded in markdown with descriptive **alt text** (accessibility/SEO) and a
      centered caption (see the site's image convention in the root `CLAUDE.md`).

---

## 8. Provenance

Reverse-engineered from a screenshot of the live claude.ai chat interface
(Opus-class response, extended-thinking summary visible). Palette and type sizes
are visual matches, not extracted from claude.ai's stylesheets. The serif/sans
role split, the no-label/no-avatar layout, the thinking-summary header, the
4-icon toolbar, and the clay sunburst are all faithful to the real UI.
