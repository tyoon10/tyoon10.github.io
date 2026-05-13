---
title: "Tracing the Minds Behind Claude Code"
subtitle: "What the Delta Between Two Source Trees Reveals About How Anthropic Thinks"
summary: "I spent a weekend reading two Claude Code source trees side by side, to find what changed and hasn't across 13 months of the most successful AI product."
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
  - icon: linkedin
    icon_pack: fab
    name: LinkedIn Post
    url: https://www.linkedin.com/posts/taewan-yoon_claudepartner-share-7447007153242050561-5Yrn
  - icon: comment-dots
    icon_pack: fas
    name: Conversation Log
    url: /post/tracing-the-minds-behind-claude-code/chat.html
---

Saturday morning, I had two tabs open in my VS Code side-by-side, with GitHub repos I probably shouldn't have access to. One was Claude Code v0.2.8 from February 2025 (211 files, 26,000 lines). The other was v2.1.88 from March 2026 (1,902 files, 514,000 lines). 13 months of the hottest product of our time, sitting in two directories on my laptop.

Both versions came out of community deobfuscation of the published npm package — Claude Code ships as minified JavaScript, and someone ran it back through a reverse-engineering pipeline to reconstruct readable TypeScript. Most people reading those leaks went feature-hunting (unreleased features such as KAIROS, BUDDY, voice mode, etc.). Others built a [clean-room Python/Rust rewrite](https://github.com/ultraworkers/claw-code) in 72 hours. I wanted something different. I use Claude Code every day — for this website, for job scanners, for managing meeting notes. I understood how the tool works at the system level, so I could stop fighting it and start working with it.

So I asked a different question: *what has changed, and what hasn't?*

<!-- {{< figure src="stats-comparison.png" caption="v0.2.8 vs v2.1.88: 211 → 1,902 files. 26K → 514K lines of TypeScript. 16 → 40 tool directories. 1 agent type → 4 execution models." >}} -->

Design docs describe intentions. Code describes commitments. But the *delta* between two versions — what got rebuilt vs. what stayed untouched — describes convictions. The things a team refuses to change after 90 versions of iteration and a 20× scale-up are the things they actually believe.

By Sunday night I had traced execution paths through both source trees, mapped every subsystem boundary, and filled a structured knowledge base with what I found. Here is the distilled version.

## The Load-Bearing Constant

There is one subsystem that remained structurally identical between v0.2.8 and v2.1.88. Everything else — permissions, context management, agents, memory, tooling — was rebuilt. This one wasn't.

The entire product is a single recursive async generator:

```
call API → if tool_use, execute tools → recurse → until stop
```

In v0.2.8, `query.ts` was ~500 lines implementing this loop. In v2.1.88, it's 1,729 lines plus a 1,295-line `QueryEngine.ts`. The loop itself didn't change. What changed is everything that happens inside each iteration.

Why a generator and not a while loop? Because the team knew this loop would need to compose. `yield` enables streaming — first token renders in ~300ms, not after all tools complete. `yield*` enables sub-agents — `AgentTool.call()` does `yield* query(agentMessages)` and the parent stream receives agent events with no special casing. Generators give the caller backpressure — Ctrl+C breaks mid-execution cleanly, no wasted API calls continue in the background.

When one abstraction survives a 20× scale-up completely intact, it means the team got the foundation right on the first try. Everything else in this article is infrastructure built to serve this loop — not to replace it.

## What Got Rebuilt: Four Wrong Early Bets

The things that *did* change tell you what the team underestimated at launch.

### Context management: 1 function → 5-stage stack

v0.2.8 had one function: `autoCompact`. It fired when the context window filled and summarized the conversation. v2.1.88 has a five-stage compaction stack:

1. Snip old tool results (free)
2. Clear thinking blocks (free)
3. Surgical API-side cache-preserving removal (low cost)
4. Server-side context clearing (medium)
5. Full conversation summarization (expensive)

They fire progressively. The system fights to avoid the expensive stage.

The prompt cache architecture is where it gets interesting. A marker string `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` splits the system prompt into a globally-cacheable prefix — shared across every Claude Code user on the planet — and a session-specific suffix. The engineering constraint: moving the wrong content before this boundary silently corrupts other users' caches. This isn't documented anywhere. I found it in `splitSysPromptPrefix()` with an emphatic comment: *"IMPORTANT: Do not add any more blocks for caching or you will get a 400."*

The wrong early bet: context is a storage problem. The real problem: context is an economics problem. More engineering effort goes into what *not* to send to the model than what to send.

<!-- {{< figure src="compaction-stages.png" caption="The five-stage compaction stack, from free (snip) to expensive (full summarization). The system fights to stay in the cheap stages." >}} -->

### Tool loading: inline → deferred discovery

40+ tools at ~500 tokens each would fill 20,000–40,000 tokens of context if loaded upfront. v0.2.8 loaded tools inline. At scale, this approach simply broke — you can't put 40 tools in the system prompt.

The replacement: `ToolSearchTool`, a meta-tool that scores matches and returns full schemas only when needed. Tools are deferred; the model discovers them on-demand.

The wrong early bet: give the model everything it might need. The real constraint: the model's context window is finite and shared with the actual work.

### Agent model: recursive → flat teams

v0.2.8 had one agent type with read-only tools and a comment in the source: `// No recursive agents, yet..`

They didn't add recursion. They went a different direction — flat teams over deep trees:

| Model | Isolation | Communication | Why it exists |
|-------|-----------|---------------|---------------|
| Fork | Shared context | Return value | Cache-sharing — child's prompt hits the same global cache entry |
| Teammate | Shared filesystem | File-based mailbox | Parallel independent work without context exhaustion |
| Worktree | Separate git branch | Merge on completion | File conflict isolation |
| Remote | Separate container | Sessions API events | Long-running tasks in cloud |

The coordinator has a completely different identity from standard Claude Code. Its prompt includes: "Do not rubber-stamp weak work." The `// No recursive agents, yet..` comment is gone.

The wrong early bet: recursion scales agents. The real problem: depth creates coordination overhead and context explosion. Four flat execution models, each created because a different failure mode was discovered at scale.

<!-- {{< figure src="agent-models.png" caption="Four execution models, each created because a different failure mode was discovered at scale." >}} -->

### Memory: flat files → filtered relevance

v0.2.8 stored memory as flat files. v2.1.88 has a four-type system (user, feedback, project, reference) where Sonnet pre-filters relevant memories before the main model sees them. The filter scores on file title — the model only loads memories whose title matches the current task.

The wrong early bet: memory is a storage problem. The real problem: memory is a retrieval problem. Giving the model everything it has ever learned is no better than giving it nothing.

## What Never Changed: Three Real Beliefs

Among everything that got rebuilt, three design principles remained structurally identical. These are Anthropic's actual convictions.

### Safety is invisible to the model

v0.2.8 had three permission tiers. v2.1.88 has six permission modes, a 23-check bash scanner, an LLM-as-safety-classifier with two stages (fast block, then slow XML-structured reasoning), 11 hook lifecycle events, and a remote killswitch.

The implementation scaled significantly. The underlying principle didn't change.

The detail that stopped me: `dangerouslyDisableSandbox` is intentionally hidden from the tool schema the LLM sees. The model cannot learn to bypass its own sandbox because it doesn't know the bypass exists. The parameter is only available to SDK callers who set it explicitly in code.

Some defenses are invisible to the thing being defended against. This principle was present in v0.2.8. It's more elaborately implemented in v2.1.88. It was never abandoned.

### Context is the scarce resource

Every major engineering investment across both versions — compaction, deferred tools, the cache boundary marker, memory pre-filtering — shares the same root concern: preserve the context window for the actual work.

This wasn't obvious at the start. v0.2.8's one-function context management suggests the team thought context was a cleanup problem. By v2.1.88, it had become the organizing constraint for four separate subsystems.

But the *belief* that context is precious — that the right engineering problem is "what not to send" — shows up consistently, just at increasing levels of sophistication. It's a principle that got more deeply held as the team ran into its implications.

### Joy is load-bearing, not decoration

35+ compile-time feature flags with dead-code elimination. A full GrowthBook runtime gating system. The BUDDY virtual pet — 18 species, gacha rarity tiers, RPG stats, ASCII sprites — requires the same gating infrastructure as the safety classifier. A kill switch for a virtual pet and a kill switch for bypass mode use the same mechanism.

One encoding hack crystallizes the culture: species names are hex-encoded (`capybara` = `c(0x63,0x61,0x70,0x79,0x62,0x61,0x72,0x61)`) because one name collides with a model codename in the build pipeline scanner. The developer made the Easter egg comply with the safety system rather than disabling the safety system for the Easter egg.

187 loading spinner verbs, including SimCity 2000's "reticulating splines." Frustration detection that logs telemetry with `is_negative: true`. The team that built the five-stage compaction stack also built a virtual pet with a shiny variant at 1% odds.

This never changed because it was never treated as optional.

## Where the Delta Points

The most revealing subsystem in v2.1.88 isn't a feature. It's KAIROS.

The cron scheduler (`cronScheduler.ts`, 531 lines) polls `scheduled_tasks.json` every second, uses a per-project lock so multiple Claude sessions don't double-fire tasks, and has a GrowthBook killswitch that stops already-running schedulers mid-session. The `autoDream` system fires a background memory consolidation agent when three gates pass: 24+ hours since last consolidation, 5+ sessions accumulated, no other process mid-consolidation. The dream agent runs as a forked subagent restricted to read-only bash — it can only *read* the codebase and *write* to memory files.

And then there's ULTRAPLAN. `/ultraplan` creates a remote Cloud Code Runner session, runs Opus in browser plan mode, and the user approves or iterates on the plan in a web UI. The local repo is teleported via a git bundle with a three-tier fallback: full history (100MB max) → current branch only → a single parentless commit (just the file snapshot). Work-in-progress is captured via `git stash create` — a dangling commit that doesn't touch the working tree.

Two exit paths. "Teleport back to terminal" embeds a sentinel string `__ULTRAPLAN_TELEPORT_LOCAL__` in the tool_result and sends the plan back to the local CLI. "Execute in CCR" starts the remote session coding and delivers results as a pull request.

<!-- {{< figure src="ultraplan-flow.png" caption="ULTRAPLAN flow: local repo → git bundle → CCR session → browser plan mode → teleport back to terminal or execute remotely as a PR." >}} -->

The daemon, the remote execution, the file-based mailboxes between agents, the three-tier git bundle fallback — these aren't features for today. They're infrastructure for a product where Claude Code runs continuously, plans with remote Opus, and delivers results while you sleep. The loop stays. The loop runs continuously. The loop runs remotely.

## What This Changed for Me

I structure tasks around the compaction boundary now. I know autocompact summarizes the entire conversation, so I break long sessions into focused units that stay under the threshold.

I write memory files with specific titles, not generic dump files. The auto-memory system uses Sonnet as a relevance filter — the title is what it scores on. I keep MEMORY.md under 200 lines because lines beyond that are truncated.

I trust the concurrency model. Read-only tools run in parallel. Write tools run serially. When I need to search a codebase, I issue multiple Grep and Glob calls in the same message. They execute concurrently.

## The One-Line Thesis

The Claude Code team's thesis is unchanged between both versions: an agentic coding tool should be a reliable system, not a capable demo. v0.2.8 was the demo. v2.1.88 is the beginning of the system.

The things that changed — context management, tool loading, agent architecture, memory — changed because the team ran into the real constraints of production use. The things that didn't change — the recursive generator, the invisible safety guarantees, the insistence on craft — didn't change because those were right from the start.

You can learn more about what a team believes by looking at what they refused to change than by reading their design docs. I spent a weekend reading their source code. The surviving constant is a 500-line loop that became a 3,000-line loop. Everything else is infrastructure built to serve it.
