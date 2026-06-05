---
description: Review the user's manual edits to a draft and fold durable voice signals into the canonical voice guide
argument-hint: "[path to writings/<slug>/index.md] (defaults to the most recently modified article)"
---

Review the user's **direct/manual edits** to an article draft and update the canonical writing-voice guide accordingly. The voice guide is the source of truth; this command keeps it learning from how the user actually edits.

## Steps

1. **Resolve the target article.** Use `$ARGUMENTS` if provided; otherwise pick the most recently modified `src/content/writings/**/index.md`.

2. **Isolate the user's own changes** (not yours):
   - `git diff HEAD -- <article>` for uncommitted manual edits.
   - If the working tree is clean, compare the latest commit against the last *Claude-authored* commit (scan `git log --oneline -- <article>` for the boundary) so you're analyzing the user's edits, not your own.

3. **Distill recurring signals**, not one-off content changes. Look for: tone (de-hype, hedging), sentence/paragraph structure, emphasis (bold/italic), punctuation (em dashes, quotes), framing (imperative vs. constructive), specificity, links/show-your-work, visuals. A change is signal only if it reflects a *preference*, not just this article's facts.

4. **Update `private/writing/identity/voice.md`** (gitignored, local-only):
   - **Reconcile, don't append.** If a new preference supersedes an existing rule, revise that rule and flag it (e.g., "2026-06 update — supersedes …"); don't leave the guide self-contradictory.
   - Add genuinely new principles to the consolidated quick-reference.
   - Bump the **Last updated** line and add the article to the provenance list.

5. **Report** a short summary: what signals you found, which guide rules changed, and any tensions you reconciled. **Do not restyle the user's prose** — flag only genuine grammar issues.

If `voice.md` is absent (no local `private/` module), say so and stop — don't recreate it from scratch.
