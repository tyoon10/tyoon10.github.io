# Article Review: Tracing the Minds Behind Claude Code

Assessed 2026-04-06 against published posts (infrastructure, hackathon recap) as tone baseline.

## Tone & Style

- Opening is generic ("I spent an entire weekend reading leaked source code"). Best posts open in a scene with time/place. Needs grounding.
- "Why I Did This" over-explains. Other posts just start. Cut to 3 sentences.
- "The Method" section is self-evident from the article. Cut or merge into opening.
- Closing ("The code is the artifact. The thinking is the product.") is aphoristic mic-drop. Other posts end with forward-looking action.

### AI-Sounding Patterns to Fix

- Every belief section follows identical template: "In v0.2.8, [thing]. In v2.1.88, [bigger thing]. The belief: [insight]." Mix structure.
- Formulaic inversions: "That is not a distraction from the engineering. It *is* the engineering culture."
- Short declarative pairs: "These were good bets. They did not need to be revisited, only extended."
- "The third question is the one that matters." — telegraphed transition.
- Over-bolding. Infrastructure post uses bold sparingly for stats. This article bolds every other sentence.
- Em dashes heavy throughout article body.
- Numbered lists with three items everywhere ("Three reasons." "Three questions." "Three concrete ways.").

## Original vs. Generally Known

### Already widely reported (cut to one line each)
- BUDDY exists, gacha mechanics, hex-encoded species names
- KAIROS exists as daemon mode
- Undercover mode auto-activates
- Anti-distillation injects fake tools
- 5-stage compaction stack

### Actually original (expand these)
- ULTRAPLAN_TELEPORT_SENTINEL mechanism and two exit paths
- autoDream triple-gate consolidation system
- Git bundle three-tier fallback for teleporting repos to CCR
- `dangerouslyDisableSandbox` hidden from model's own schema
- Proactive/KAIROS mode appending to default prompt (not replacing)
- Recursive async generator choice over while loop and WHY
- "Flat teams over deep trees" from tracing `// No recursive agents, yet..`
- Prompt cache boundary being load-bearing, moving content silently corrupts other users' caches

## Length Cuts (target ~1,800 words from ~2,500)

| Section | Action |
|---------|--------|
| Why I Did This (3 long paragraphs) | Cut to 1 paragraph, 3 sentences |
| The Method (2 paragraphs + list) | Cut entirely or merge into opening |
| Belief 5 (Feature Gates) | Merge into Belief 7 (Joy) — hex-encoding is punchline, GrowthBook is setup |
| What v0.2.8 Got Right / Got Wrong | Combine into one "Right Bets, Wrong Bets" section |
| The Bigger Picture (2 paragraphs) | Cut first paragraph (restates thesis), keep second, rewrite final line |

## Images/Modules to Add

| Location | Asset |
|----------|-------|
| After opening | Side-by-side stats card: v0.2.8 vs v2.1.88 (files, lines, tools, agents) |
| Belief 1 (The Loop) | Flow diagram: API call → tool_use? → execute → recurse → end_turn |
| Belief 3 (Context) | Stacked bar or funnel: 5 compaction stages free→expensive |
| Belief 4 (Multi-Agent) | 2x2 grid of four execution models with isolation/communication |
| Belief 6 (Daemon) | Swimlane: local CLI → git bundle → CCR → browser plan → teleport/execute |
| After article | Link to CURRICULUM.md as "Study Guide" |
