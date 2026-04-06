---
title: "Tracing the Minds Behind Claude Code"
subtitle: "What Thousands of Lines of TypeScript Reveal About How Anthropic Thinks"
summary: "I spent a weekend reading two leaked Claude Code source trees side by side. Not to catalogue features. To extract the design beliefs that made one architecture win over another."
authors:
  - admin
tags:
  - Claude Code
  - Anthropic
  - Agentic AI
  - System Design
  - Software Architecture
categories:
  - AI Strategy
date: 2026-04-06
featured: true
draft: false

image:
  filename: hero-image.png
  caption: ""
  focal_point: Center
  preview_only: false

projects: []

links:
  - icon: comment-dots
    icon_pack: fas
    name: Conversation Log
    url: /post/tracing-the-minds-behind-claude-code/chat.html
---

Saturday morning, 7 AM. Coffee, terminal open, two browser tabs with GitHub repos I probably shouldn't have access to. One was Claude Code v0.2.8 from February 2025 — 211 files, 26,000 lines. The other was v2.1.88 from March 2026 — 1,902 files, 514,000 lines. Thirteen months of a team's best thinking, sitting in two directories on my laptop.

By Sunday night I had traced execution paths through both source trees, mapped every subsystem boundary I could find, and filled a structured knowledge base with what I learned. This article is the distilled version: six design beliefs I extracted from the code, and what they reveal about how Anthropic thinks about building software that actually works.

<!-- {{< figure src="stats-comparison.png" caption="v0.2.8 vs v2.1.88: 211 → 1,902 files. 26K → 514K lines of TypeScript. 16 → 40 tool directories. 1 agent type → 4 execution models." >}} -->

The leaks provoked different reactions. Some people went feature-hunting — KAIROS, BUDDY, voice mode. Others built a [clean-room Python/Rust rewrite](https://github.com/ultraworkers/claw-code) in 72 hours. I wanted something different: to understand the *decisions*, not the features. I use Claude Code every day — for this website, for job scanners, for managing meeting notes. When you understand how your tool works at the system level, you stop fighting it and start working with it.

For each subsystem, I asked: what does this do, what could they have done instead, and why did they choose this? The third question is the only one that matters. Code tells you *what*. The *why* is only visible when you read enough code to see the pattern.

## 1. The Loop Is the Product

The entire product is a single recursive async generator:

```
call API → if tool_use, execute tools → recurse → until stop
```

Everything else — permissions, context management, multi-agent coordination, 40 tools, memory, a virtual pet — is infrastructure around this loop.

Why a generator and not a while loop? Because the team knew this loop would need to compose. `yield` enables streaming (first token renders in ~300ms, not after all tools complete). `yield*` enables sub-agents — `AgentTool.call()` does `yield* query(agentMessages)` and the parent stream receives agent events with no special casing. And generators give the caller backpressure — Ctrl+C breaks mid-execution, no wasted API calls continue in the background.

In v0.2.8, `query.ts` was ~500 lines. In v2.1.88, it's 1,729 lines plus a 1,295-line `QueryEngine.ts`. The loop itself didn't change. What changed is everything that happens inside each iteration.

## 2. Safety Is the Architecture, Not a Layer

v0.2.8 had three permission tiers. v2.1.88 has six permission modes, a 23-check bash scanner, an LLM-as-safety-classifier that runs in two stages (fast block, then slow XML-structured reasoning), 11 hook lifecycle events, and a remote killswitch.

The detail that stopped me: `dangerouslyDisableSandbox` is intentionally hidden from the tool schema the LLM sees. The model cannot learn to bypass its own sandbox because it doesn't know the bypass exists. The parameter is only available to SDK callers who set it explicitly in code. Some defenses are invisible to the thing being defended against.

## 3. Context Is the Scarce Resource

More engineering effort goes into what *not* to send to the model than what to send. v0.2.8 had one function: `autoCompact`. v2.1.88 has a five-stage compaction stack — snip old tool results (free), clear thinking blocks (free), surgical API-side cache-preserving removal (low cost), server-side context clearing (medium), full conversation summarization (expensive). They fire progressively. The system fights to avoid the expensive stage.

The prompt cache architecture is where it gets interesting. A marker string `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` splits the system prompt into a globally-cacheable prefix — shared across every Claude Code user on the planet — and a session-specific suffix. The engineering constraint: moving the wrong content before this boundary silently corrupts other users' caches. This isn't documented anywhere. I found it in `splitSysPromptPrefix()` with an emphatic comment: *"IMPORTANT: Do not add any more blocks for caching or you will get a 400."*

Tool loading follows the same principle. 40+ tools at ~500 tokens each would fill 20,000-40,000 tokens of context. So tools are deferred — the model discovers them on-demand via `ToolSearchTool`, a meta-tool that scores matches and returns full schemas only when needed.

<!-- {{< figure src="compaction-stages.png" caption="The five-stage compaction stack, from free (snip) to expensive (full summarization). The system fights to stay in the cheap stages." >}} -->

## 4. One Model Is Not Enough

v0.2.8 had one agent type with read-only tools and a comment: `// No recursive agents, yet..`

They didn't add recursion. They went a different direction entirely — flat teams over deep trees:

| Model | Isolation | Communication | Why it exists |
|-------|-----------|---------------|---------------|
| Fork | Shared context | Return value | Cache-sharing — child's prompt is identical to parent's, both hit the same global cache entry |
| Teammate | Shared filesystem | File-based mailbox | Parallel independent work without context window exhaustion |
| Worktree | Separate git branch | Merge on completion | File conflict isolation |
| Remote | Separate container | Sessions API events | Long-running tasks in cloud |

The coordinator has a completely different identity from standard Claude Code. Its prompt includes: "Do not rubber-stamp weak work." The `// No recursive agents, yet..` comment is gone.

<!-- {{< figure src="agent-models.png" caption="Four execution models, each created because a different failure mode was discovered at scale." >}} -->

## 5. The Daemon Is the Future

KAIROS is the most revealing subsystem — not for what it does today, but for what it implies about where Claude Code is going.

The cron scheduler (`cronScheduler.ts`, 531 lines) polls `scheduled_tasks.json` every second, uses a per-project lock so multiple Claude sessions don't double-fire tasks, and has a GrowthBook killswitch that stops already-running schedulers mid-session. The `autoDream` system fires a background memory consolidation agent when three gates pass: 24+ hours since last consolidation, 5+ sessions accumulated, no other process mid-consolidation. The dream agent runs as a forked subagent restricted to read-only bash — it can only *read* the codebase and *write* to memory files.

And then there's ULTRAPLAN. `/ultraplan` creates a remote Cloud Code Runner session, runs Opus in browser plan mode, and the user approves or iterates on the plan in a web UI. The local repo is teleported via a git bundle with a three-tier fallback: full history (100MB max) → current branch only → a single parentless commit (just the file snapshot). Work-in-progress is captured via `git stash create` — a dangling commit that doesn't touch the working tree.

Two exit paths. "Teleport back to terminal" embeds a sentinel string `__ULTRAPLAN_TELEPORT_LOCAL__` in the tool_result and sends the plan back to the local CLI. "Execute in CCR" starts the remote session coding and delivers results as a pull request. The `ExitPlanModeScanner` that detects the sentinel is a pure stateful classifier with no I/O — you can feed it recorded events for unit tests.

Claude Code is becoming a system that runs while you're not looking.

<!-- {{< figure src="ultraplan-flow.png" caption="ULTRAPLAN flow: local repo → git bundle → CCR session → browser plan mode → teleport back to terminal or execute remotely as a PR." >}} -->

## 6. Joy Is Not Optional

35+ compile-time feature flags with dead-code elimination. A full GrowthBook runtime gating system. The BUDDY virtual pet — 18 species, gacha rarity tiers, RPG stats, ASCII sprites — requires the same gating infrastructure as the safety classifier. A kill switch for a virtual pet and a kill switch for bypass mode use the same mechanism.

One encoding hack crystallizes the culture: species names are hex-encoded (`capybara` = `c(0x63,0x61,0x70,0x79,0x62,0x61,0x72,0x61)`) because one name collides with a model codename in the build pipeline scanner. The developer made the Easter egg comply with the safety system rather than disabling the safety system for the Easter egg.

187 loading spinner verbs, including SimCity 2000's "reticulating splines." Frustration detection that logs telemetry with `is_negative: true`. The team that built the five-stage compaction stack also built a virtual pet with a shiny variant at 1% odds.

## Right Bets, Wrong Bets

**Right:** The recursive async generator, read-only tool concurrency, `yield*` sub-agent streaming, the sandwich defense (safety guardrails at start and end of the system prompt), the three-tier permission model. All preserved in v2.1.88. Good foundations.

**Wrong:** Context management was one function — became a five-stage stack. Tool loading was inline — broke at 40+ tools, needed deferred discovery. Single-agent was a dead end — `// No recursive agents, yet..` shipped as four execution models. Memory was flat files — became a four-type system where Sonnet pre-filters relevant memories before the main model sees them.

## What This Changed for Me

I structure tasks around the compaction boundary now. I know autocompact summarizes the entire conversation, so I break long sessions into focused units that stay under the threshold.

I write memory files with specific titles, not generic dump files. The auto-memory system uses Sonnet as a relevance filter — the title is what it scores on. I keep MEMORY.md under 200 lines because lines beyond that are truncated.

I trust the concurrency model. Read-only tools run in parallel. Write tools run serially. When I need to search a codebase, I issue multiple Grep and Glob calls in the same message. They execute concurrently.

## Where This Goes

The Claude Code team's thesis is unchanged between both versions: an agentic coding tool should be a reliable system, not a capable demo. v0.2.8 was the demo. v2.1.88 is the beginning of the system.

The daemon mode, the remote execution, the file-based mailboxes between agents, the three-tier git bundle fallback — these aren't features for today. They're infrastructure for a product where Claude Code runs continuously, plans with remote Opus, and delivers results while you sleep.

I spent a weekend reading their source code. I came away understanding not just how the tool works, but how the team that built it thinks. For someone who uses this tool every day, that understanding is worth more than any feature list.
