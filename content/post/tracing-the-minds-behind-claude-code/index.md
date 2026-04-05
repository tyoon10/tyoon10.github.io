---
title: "Tracing the Minds Behind Claude Code"
subtitle: "What 1,000+ Lines of TypeScript Reveal About How Anthropic Thinks"
summary: "I spent a weekend reading every line of two leaked Claude Code source trees — v0.2.8 and v2.1.88. Not to exploit them. Not to build on top of them. To understand how Anthropic's engineering team thinks about building a system that actually works."
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
---

I spent an entire weekend reading leaked source code.

Not skimming. Not searching for keywords. Reading — file by file, function by function — through two versions of Claude Code that Anthropic never intended to be public. The first, v0.2.8, was a research preview from February 2025: **211 files, 26,000 lines of TypeScript**. The second, v2.1.88, was the mature product from March 2026: **1,902 files, 514,000 lines**. Thirteen months of evolution, compressed into a single weekend.

By Monday I had written over **1,000 lines of notes** across a structured knowledge base, a seven-module curriculum, and this article.

## Why I Did This

The leaks provoked different reactions across the community.

Some people went feature-hunting — cataloguing undisclosed capabilities like KAIROS (an autonomous daemon mode), BUDDY (a virtual pet Easter egg with 18 species and gacha mechanics), and voice mode. Others built on top of it: the [claw-code](https://github.com/ultraworkers/claw-code) project is a clean-room Python/Rust rewrite that hit **48,000 lines of Rust in three days**, maintained entirely by autonomous AI agents coordinated through Discord. Some published security analyses. Some filed DMCA takedowns.

I chose a different path. I read it to learn.

Three reasons.

**First, to test my own system-level thinking.** I am finishing my MBA at Columbia Business School, where I spend most of my time at the intersection of AI strategy and product management. I run the AI Club. I judge hackathons. I advise teams on when to use frontier models versus open weights, when to self-host versus call an API, how to decompose agent workflows into infrastructure layers. But advising is not the same as understanding. Reading production source code — real code, built under real constraints, shipped to real users — is the closest thing to sitting in the architecture meeting where the tradeoffs were debated.

**Second, to trace the minds of the creators of one of the most successful AI products in the market.** Claude Code is not a demo. It is the fastest-growing developer tool Anthropic has shipped. It runs arbitrary code on your machine, manages multi-agent workflows, handles context windows that exceed what any single LLM call can hold, and does all of this while maintaining safety guarantees that would make most engineering teams nervous. The decisions embedded in this codebase are not accidental. They are the accumulated judgment of a team that has been iterating under production load for over a year. I wanted to extract those decisions — not the code, the *thinking*.

**Third, to become a better user.** I use Claude Code every day — from everyday tasks like managing meeting notes and tracking career applications, to building full projects like hackathon platforms, job scanners, and this website. When you understand how a tool works at the system level, you stop fighting it and start working with it. You understand why compaction happens when it does. You understand why certain tool calls run in parallel and others don't. You understand what the model sees and what it doesn't. That understanding changes how you prompt, how you structure tasks, and how much you trust the output.

## The Method

I read both source trees side by side, starting from first principles.

The approach was bottom-up: begin with the core agentic loop (`query.ts`), understand how a single user message becomes an API call becomes a tool execution becomes a recursive call, then work outward — system prompt assembly, tool registration, permission checking, context management, multi-agent coordination, telemetry, feature gating.

For each subsystem, I asked three questions:
1. **What does this do?** (The mechanism)
2. **What could they have done instead?** (The alternatives)
3. **Why did they choose this?** (The belief)

The third question is the one that matters. Code tells you *what*. Comments sometimes tell you *how*. But the *why* — the design belief that made one architecture win over another — is only visible when you read enough code to see the pattern.

## Seven Beliefs

After 13 sessions of reading and a 14th deep-dive into KAIROS, ULTRAPLAN, and the teleport system, I extracted seven recurring design beliefs. These are not documented anywhere in Anthropic's public materials. They are inferred from the code.

### 1. The Loop Is the Product

Claude Code is, at its core, a single recursive async generator:

```
call API → if tool_use, execute tools → recurse → until stop
```

That is the entire product. Everything else — the permission system, the context manager, the multi-agent coordinator, the 40-tool registry, the memory system, the BUDDY virtual pet — is infrastructure around this loop.

In v0.2.8, `query.ts` was **~500 lines**. In v2.1.88, it is **1,729 lines** plus a separate **1,295-line** `QueryEngine.ts` for the SDK. The loop itself did not change. What changed is everything that happens *inside* each iteration: reactive compaction when context gets too large, concurrent read-only tool execution via generators, tool use summaries for compacted messages, query chain tracking for debugging.

The architectural choice is revealing: this is an `async generator`, not a `while` loop. Generators enable streaming (`yield` events as they happen), composability (`yield*` delegates to sub-generators for sub-agent calls), and backpressure (the consumer controls pace). A while loop would require buffering everything. The team chose the more complex primitive because they knew the loop would need to compose.

### 2. Safety Is Not a Layer — It Is the Architecture

In v0.2.8, the permission system had three tiers: always-allowed commands, session-approved commands, and persistently-approved commands. Simple. Clear.

In v2.1.88, there are **six permission modes**, a **23-check bash security scanner**, an **LLM-as-safety-classifier** (the YOLO classifier), a **sandbox architecture**, **11 hook lifecycle events**, an **undercover mode** that auto-activates for Anthropic employees on public repos, and a **remote killswitch** that can disable bypass mode server-side without shipping a client update.

The LLM classifier is the most interesting piece. It runs in two stages: a fast block decision, then a slower reasoning step with explicit XML-structured justification. The reasoning is not cosmetic — it is parsed and used for the final decision. The belief: rules cannot anticipate all dangerous commands. An LLM can reason about intent ("this `rm -rf` targets the project directory, which is fine" versus "this `rm -rf` targets `/usr`, which is not"). But LLM reasoning is slow. So the two-stage design balances latency with accuracy: fast reject for obvious violations, slow reason for ambiguous cases.

One detail stopped me cold: `dangerouslyDisableSandbox` is intentionally hidden from the tool schema that the LLM sees. The model cannot learn to bypass its own sandbox because it does not know the bypass exists. The parameter is only available to SDK callers who set it explicitly in code. Defense in depth means some defenses are invisible to the thing being defended against.

### 3. The Context Window Is the Scarce Resource

More engineering effort in Claude Code goes into what *not* to send to the model than what to send.

In v0.2.8, context management was one function: `autoCompact`, which summarized the conversation when it got too long.

In v2.1.88, there is a **five-stage compaction stack**:

| Stage | What it does | Cost |
|-------|-------------|------|
| **Snip** | Removes old tool results | Free |
| **Microcompact** | Clears thinking blocks client-side | Free |
| **Cached microcompact** | Uses `cache_edits` API to surgically remove tool results without breaking prompt cache | Low |
| **Context collapse** | Server-side context clearing | Medium |
| **Autocompact** | Full conversation summarization via API call | High |

The stages fire progressively. Light pressure: clear old tool results (free). Medium: clear thinking blocks (free). Heavy: surgical API-side removal (low cost, preserves cache). Critical: summarize everything (expensive). The belief: every token of context has a cost — not just in API pricing, but in cache hit rate. The prompt cache architecture (`SYSTEM_PROMPT_DYNAMIC_BOUNDARY`) splits the system prompt into a globally-cacheable prefix (shared across all users worldwide) and a session-specific suffix. Moving the wrong content before the boundary silently corrupts other users' caches. The engineering is not about sending context. It is about *not sending* context while preserving the information the model needs.

Tool loading follows the same principle. With 40+ built-in tools plus MCP tools, sending all schemas fills **20,000-40,000 tokens**. So tools are deferred — the model discovers them on-demand via `ToolSearchTool`, a meta-tool that scores matches (exact name match: 10 points, partial: 5, search hint: 4, description: 2) and returns full schemas only when needed. Tools rediscovered before compaction are preserved across the summarization boundary.

### 4. One Model Is Not Enough

In v0.2.8, the `AgentTool` spawned a sub-agent with read-only tools. The source contained a telling comment: `// No recursive agents, yet..`

In v2.1.88, there are **four execution models**:

| Model | Isolation | Communication | Use case |
|-------|-----------|--------------|----------|
| **Fork** | None (shares parent context) | Return value | Quick research, cache-sharing |
| **Teammate** | File system shared | File-based mailbox | Parallel independent work |
| **Worktree** | Separate git branch | Merge on completion | Isolated feature development |
| **Remote** | Separate process/container | Sessions API events | Long-running tasks, CCR |

Each model exists because a different failure mode was discovered at scale. Context window exhaustion led to fork (shares the parent's system prompt for cache efficiency — the child's prompt is cache-identical to the parent's, so both hit the same global cache entry). Sequential bottlenecks led to teammates (parallel work with file-based mailboxes — `writeToMailbox(recipient, content)` → `readFromMailbox()`). File conflicts led to worktrees (separate git branch per agent, merged on completion). Process isolation needs led to remote (CCR containers with their own environment).

The coordinator — a separate identity from the standard Claude Code prompt — orchestrates workers with an explicit quality gate: "Do not rubber-stamp weak work." The `// No recursive agents, yet..` comment is gone.

### 5. Ship Everything Behind a Gate

In v0.2.8, feature gating was Statsig with a few flags like `tengu_think_tool` and `tengu_binary_feedback`.

In v2.1.88, there are **35+ compile-time feature flags** and a full GrowthBook runtime gating system. The compile-time flags use Bun's `feature()` for dead-code elimination — ant-only code like KAIROS, BUDDY, and anti-distillation is physically absent from the external npm package. Runtime GrowthBook gates enable gradual rollout, A/B testing, and kill switches without deployments.

The BUDDY Easter egg — a virtual pet with 18 species, gacha rarity tiers, RPG stats, ASCII sprite animations, and hearts that float up when you `/buddy pet` — requires the same gating infrastructure as the safety classifier. A kill switch for a virtual pet and a kill switch for bypass mode use the same mechanism. The infrastructure is not feature-specific. It is universal.

One encoding hack crystallizes this: species names are hex-encoded (`capybara` = `c(0x63,0x61,0x70,0x79,0x62,0x61,0x72,0x61)`) because one species name collides with a model codename in the build pipeline's excluded-strings scanner. The developer made the Easter egg comply with the safety system rather than disabling the safety system for the Easter egg. Good values about your own tools.

### 6. The Daemon Is the Future

KAIROS, the autonomous daemon mode, is the most revealing subsystem in v2.1.88 — not for what it does today, but for what it implies about where Claude Code is going.

The cron scheduler (`cronScheduler.ts`, 531 lines) is a non-React core shared by the REPL and the Agent SDK. It polls `scheduled_tasks.json` every second, uses chokidar for file watching, and employs a per-project lock so that when multiple Claude sessions share a working directory, only one fires tasks. Non-owners probe every 5 seconds to take over if the owner crashes.

The `autoDream` system fires a background memory consolidation agent when three gates pass: (1) at least 24 hours since the last consolidation, (2) at least 5 sessions have accumulated, (3) no other process is mid-consolidation. The dream agent runs as a forked subagent with bash restricted to read-only commands — it can only *read* the codebase and *write* to the memory directory. It reviews past session transcripts and improves the project's memory files.

And then there is ULTRAPLAN — `/ultraplan` creates a remote Cloud Code Runner session, runs Opus in browser plan mode, and the user approves or iterates on the plan in a web UI. Two exit paths: "teleport back to terminal" (the plan comes back to the local CLI via a sentinel string `__ULTRAPLAN_TELEPORT_LOCAL__` embedded in the tool_result) or "execute in CCR" (the remote session starts coding and delivers results as a pull request).

The local repo is serialized as a git bundle with a three-tier fallback: full history (100MB max) → current branch only → a single parentless commit (just the file snapshot). Work-in-progress is captured via `git stash create` — a dangling commit that does not touch the working tree — stored at `refs/seed/stash`, and always cleaned up after.

The belief: Claude Code is not going to remain a tool you invoke. It is becoming a system that runs while you are not looking — consolidating memory, executing scheduled tasks, planning with remote Opus, and delivering results as pull requests. The daemon is the future. The interactive REPL is the past.

### 7. Joy Is Not Optional

187 loading spinner verbs, including SimCity 2000's "reticulating splines." Frustration detection ("wtf," "ffs," "this sucks") that logs telemetry with `is_negative: true`. An elaborate virtual pet that someone built behind a compile-time flag, with hex-encoded species names to route around the build scanner.

The team that built the five-stage compaction stack and the 23-check bash security scanner also built a virtual pet with a shiny variant at 1% odds. That is not a distraction from the engineering. It *is* the engineering culture. A team that builds joy into their tools is a team that uses their own tools.

## What v0.2.8 Got Right

The recursive async generator agentic loop, read-only tool concurrency, and `yield*` sub-agent streaming were correct in v0.2.8 and preserved unchanged in v2.1.88. The sandwich defense in the system prompt — safety guardrails at both the start and end to exploit primacy-recency attention bias — was correct and extended with global cache scope optimization. The three-tier permission model became the foundation for the six-mode model.

These were good bets. They did not need to be revisited, only extended.

## What v0.2.8 Got Wrong

**Context management was underestimated.** One autocompact function became a five-stage stack. The entire `services/compact/` directory does not exist in v0.2.8.

**Tool loading did not scale.** 15 tools inline is manageable. 40+ tools requires deferred loading and a meta-tool for discovery.

**Single-agent was not enough.** The `// No recursive agents, yet..` comment became a roadmap item that shipped as four execution models.

**Memory needed structure.** Flat file read/write tools became a four-type, Sonnet-filtered, staleness-tracked, MEMORY.md-indexed system where a cheaper model selects relevant memories before the main model ever sees them.

## What This Changed for Me as a User

Understanding the internals changed how I use Claude Code in three concrete ways.

**I structure tasks around the compaction boundary.** Knowing that the five-stage stack fires progressively — and that autocompact (the expensive stage) summarizes the *entire conversation* — I now break long sessions into focused units. Each unit stays under the compaction threshold. The model retains full context within the unit instead of a lossy summary of everything.

**I trust the tool concurrency model.** Read-only tools run in parallel (up to the concurrency limit). Write tools run serially. When I need to search a codebase, I issue multiple Grep and Glob calls in the same message — they execute concurrently. When I need to edit files, I sequence them deliberately. The model does this naturally, but understanding *why* helps me structure prompts that play to the architecture.

**I use memory intentionally.** The auto-memory system uses Sonnet as a relevance filter — a side-query that selects up to 5 relevant memory files before the main model sees them. Knowing this, I write memory files that are specific and well-titled (the title is what Sonnet scores on), not generic dump files. I keep the MEMORY.md index under 200 lines because lines beyond that are truncated. Small structural choices that compound across sessions.

## The Bigger Picture

The Claude Code team's core thesis is visible in both versions and unchanged between them: **an agentic coding tool should be a reliable system, not a capable demo.** The difference between a demo and a system is that a system keeps working when the task is larger than expected, the context is deeper than expected, and multiple things need to happen at once.

v0.2.8 was the capable demo. v2.1.88 is the beginning of the system.

The 13 months between them were mostly spent discovering which parts of the demo broke under real load — and building the infrastructure to make them not break. Context management, multi-agent coordination, permission automation, memory architecture, feature gating. None of these are glamorous. All of them are load-bearing.

The people who built this are thinking several moves ahead. The daemon mode, the remote execution model, the file-based mailboxes between agents, the three-tier git bundle fallback for teleporting repos to cloud containers — these are not features for today's product. They are infrastructure for a product where Claude Code runs continuously, plans autonomously, and delivers results while you sleep.

I spent a weekend reading their source code. I came away understanding not just how Claude Code works, but how the team that built it thinks. That understanding — the design beliefs, the tradeoff patterns, the recurring architectural choices — is worth more than any individual feature discovery.

The code is the artifact. The thinking is the product.
