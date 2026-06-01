---
title: "The Doctor and the Chart: Memory Architecture for Claude Code on Mobile"
date: 2026-05-30
description: "What I learned building a memory-enabled agent around a GitHub repo and Claude Code, and why memory is a harder problem than it looks."
featured: true
coverImage: "./closing-visual.png"
tags:
  - "System Design"
  - "Claude Code"
  - "Agentic AI"
  - "Context Engineering"
  - "Memory"
links:
  - name: "Tracing the Minds Behind Claude Code"
    url: "/writings/tracing-the-minds-behind-claude-code/"
    icon: "book-open"
---


A friend in finance asked me a question recently that stuck with me. He wanted to carry an AI agent that understood his context through access to all his files, *with him, on the road*: between client meetings, between schedules. An executive assistant that travels with him through the day.

His first surprise was that this already exists. When I showed him the Code feature in the Claude mobile app, he hadn't known you could run Claude Code from a phone at all. Most people don't, so the feature stays underused. In a [recent interview](https://youtu.be/SlGRN8jh2RI?si=pgKLycpE7T1l0JTN), Boris (creator of Claude Code) mentioned he now does most of his work directly from his phone. That was when it clicked for me: the coding assistant, your terminal companion, is becoming a mobile-first general agent.

But his real question was harder than "what's possible." Running Claude Code from a phone isn't the hard part. The hard part is making Claude *remember* across sessions, and I'd spent the past month working through it. Here's what I learned, and what I ended up building.

## From VS Code to the Phone: Why the Surface Matters

If you use Claude Code, the desktop loop is familiar. You open an IDE, the model reads your documents and codebase, and you review its output and accept in-line edits.

As models get better (and the recent Opus 4.8 release is a real jump), the work shifts toward **delegation**. You spend less time reviewing lines of code and more time reviewing *decisions*: the documentation, the rationale, the architecture. Reasoning in natural language instead of code is a shift in **system thinking**, a different way of using your brain to build a system.

Moving that loop onto a phone changes it in three ways. It becomes **iterative**: turn latency drops to near-zero, tap-read-tap-read, and the session feels like thinking out loud rather than composing a prompt. It becomes **spontaneous**: you capture intent the moment it arises, mid-walk or after a workout, before the gap bleaches it out. And it becomes **integrated**: the phone is a sensor. Camera, clipboard, screenshots, recent chats and emails all paste in with a tap.

Mobile is a great surface. But it exposes a problem the desktop quietly hides: **every session is ephemeral**. The chat you start tomorrow doesn't remember today's. So how do you carry the context with you?

## What I Tried to Build

To make the problem concrete, here's what I was building when I hit it: **OptiMind**, a personal performance optimizer. A daily protocol (circadian rhythm, deep work, meal and supplements, workout) with coach-grade reasoning over my own data, reachable from my phone.

The architecture is two repos. `optimind` holds the *system*: canonical schemas, scheduled-routine prompts, a dashboard PWA. `optimind-journal` holds the *memory*: `user_profile.json` (durable rules), `state.json` (current mode), `journal/YYYY-MM-DD.md` (verbatim conversation), `daily/YYYY-MM-DD.json` (structured logs), and a `comprehensive_memory.md` of first principles.

There are three surfaces: the Claude mobile app as the primary chat, three scheduled cloud Routines (a Morning Brief at 05:55, a Nightly Reflection at 22:00, a Weekly Review on Sundays), and a static PWA dashboard for structured logging. **There is no local machine and no 24/7 host.** Everything is Anthropic cloud plus GitHub.

![OptiMind architecture: phone, Anthropic cloud, GitHub, and a Cloudflare-hosted dashboard, with the optimind-journal repo as the memory layer](./optimind-architecture.png)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">The files in optimind-journal are the memory. Every cloud session, Routines and chat alike, clones the repo fresh from GitHub. CLAUDE.md is sealed into the system prompt at session start; every other file can be re-read mid-session.</p>

## Memory Is a Hard Problem

It took me weeks to internalize this. What *looks* like one continuous relationship with an AI assistant is really a sequence of disconnected, ephemeral sessions. The model has no persistent state, and even within a session the context window gets compacted as it fills. If you want memory, **you have to build it yourself**, somewhere that survives the session.

The problem has three sources.

**Sessions are stateless caches, not minds.** Each new chat is a fresh container, a fresh clone, a fresh model with no recall of anything prior. There is no Anthropic-side "show me what I discussed yesterday" knob. The conversation in the tab is the *entire* memory of the system, and it dies when you switch out of it.

**Files are the only durable layer.** For continuity to exist, every substantive turn has to be **written to a file in a place the next session will clone**. The git repo connected to your session is that place. For OptiMind, if a fact didn't make it into `journal/*.md`, `daily/*.json`, `user_profile.json`, or `state.json`, it doesn't exist for tomorrow.

**"File on disk" is not "in the model's context."** Even when the files are perfectly up to date on the container's disk, the model **doesn't see them** until an explicit `Read` call pulls their bytes into the conversation. The model reasons only on what's in its context window, not on what's sitting on disk three directories over. Two operations have to compose:

`git pull` refreshes the files. `Read` refreshes the context. Both are required; neither is sufficient alone.

![Three-stage refresh: origin/main to files on disk via git pull, files on disk to the model's context via a Read tool call](./three-stage-refresh-diagram.png)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">git pull moves truth onto disk; Read moves disk into the model's context.</p>

That framing produces three concrete failure modes the architecture has to handle:

| Failure mode | What goes wrong | Mitigation |
|---|---|---|
| **Stale clone** | A long-lived chat's files are frozen at clone time while `origin/main` moves on (a Routine fires; another tab pushes) | `git pull` on substantive turns |
| **Stale read** | Files are current on disk, but the model answered from internal recall instead of reading them | Mandatory `Read` calls on substantive turns |
| **Lost history** | A turn never made it into `journal/<date>.md` and is invisible to the next session | Verbatim-first write contract + dual-write of structured facts |

## How the Solution Emerged

The clean version above hides a messy path. I didn't design it up front. I worked it out in conversation with Claude itself, asking how each piece actually behaved and correcting my assumptions as the answers came back. Here's that exchange, compressed.

**Me:** When does CLAUDE.md actually get read?

**Claude:** At session start, exactly once. The cloud container clones the repo, reads the repo-root `CLAUDE.md`, and bakes it into the system prompt for the whole session. Every scheduled Routine fires a new session, so every fire picks up the latest CLAUDE.md; every new chat tab does the same. Mid-session edits don't take effect; the system prompt is sealed at boot.

**Me:** What about the conversation we're having right now? How does it carry over?

**Claude:** It doesn't, unless every turn writes itself to `journal/<date>.md`. The verbatim `### HH:MM | User` and `### HH:MM | Agent` lines *are* the cross-session memory protocol. Tomorrow's session opens yesterday's journal and reads those lines back into context. If a turn skipped the write, that exchange is gone forever.

**Me:** If a Routine writes to main while I'm in a chat, do I see it?

**Claude:** No, not until your session explicitly pulls. The cloud session clones once at start; after that the checkout is a snapshot. A Routine firing at 22:00 while your chat is open at 23:00 has updated `origin/main`, but your chat's local files are still frozen at clone time.

**Me:** Should I just pull on every turn, then?

**Claude:** Tempting, but wasteful. Someone typing "cold shower done" doesn't need to re-read the profile, pull from main, and grep the journal. So classify the input first. There are seven recognizable shapes (routine completion, structured event, sleep state, Q&A, decision, backfill, reflective), and each maps to a *read level*, from LIGHT (today's daily log only) up to HEAVY (the full chart). Only HEAVY turns pull. Most turns stay cheap.

**Me:** Does the mechanism work the same for fresh and long-running sessions?

**Claude:** Almost. The turn-start procedure, the `Read` calls, the dual-write contract all run identically. The one asymmetry is `CLAUDE.md`: it's sealed at session start. Every other file can be re-read mid-session; CLAUDE.md can't, because the system prompt isn't re-evaluated. Edit it during an open chat and that chat keeps the old system prompt until you close it.

**Me:** So what's the workflow?

**Claude:** Stay in one open chat by default: accumulated context is cheap, and continuity is the whole point. **Start a fresh chat only when a major CLAUDE.md update lands**, to pick up the new system prompt. The journal preserves the prior session's substance, and the new session reads it back on its first HEAVY-read turn. Minor changes (a new rule, a mode flip) don't need a restart.

![Turn-start decision tree: classify the input shape, then branch to a LIGHT or HEAVY read path](./turn-start-decision-tree.png)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Classify the input shape first, then load. Light shapes stay cheap; heavy shapes pay for fidelity with a git pull and a full chart read.</p>

## The Decisions, Distilled

Strip away OptiMind and a transferable playbook remains:

1. **Files are the memory; sessions are stateless caches.** The doctor-and-chart analogy. Don't try to make the bot *remember*; make the chart authoritative and the bot disciplined about reading it.
2. **The dual-write contract.** Every structured fact lands in both `daily/<date>.json` *and* `journal/<date>.md` as a mirror line, the same contract whether the writer is the chat agent, a Routine, or a dashboard form. No orphans.
3. **Critical write rules live in CLAUDE.md.** Branch is always `main`; exact file paths only; re-read `user_profile.json` before naming any specific rule. Encoded once in the system prompt, binding on every session.
4. **The seven-shape input playbook.** Each shape maps to a dual-write action *and* a read level. Classification is the first cognitive step every turn anyway, so attaching read levels adds zero overhead.
5. **Intent-keyed turn-start.** LIGHT / LIGHT+ / MEDIUM / HEAVY, with `git pull` only on HEAVY. Trivial turns stay cheap; high-stakes turns pay for fidelity.
6. **Verbatim-first writes.** The `### HH:MM | User` line is the *first* tool call of every turn, before reasoning, before any other read or write. If the session crashes after, the user's input is already preserved.
7. **CLAUDE.md is standing orders; everything else is the chart on the wall.** That single asymmetry, sealed at start versus re-readable mid-session, is what drives the user-side rule: **continue in one chat by default; start a fresh one only when CLAUDE.md materially changes.** Cost is trivial; benefit is that the system prompt always tracks what's on disk.

## What This Means for Anyone Building with Claude Code

**Your repo is your durable memory.** The connected GitHub repo is the only thing that survives the session. Design what lives there with the same care you'd give a database schema, because that's exactly what it is.

**CLAUDE.md is your highest-leverage lever.** Every new session reloads it. Every Routine fire reloads it. Every edit propagates to every future session for free. Spend 10x more time on it than feels reasonable.

**Don't make the session remember; make it disciplined at *reading*.** The model has no memory between sessions. Your only knobs are what you write to files and the reading procedure you encode in the system prompt. Stop fighting statelessness; treat it as a strength, since every session starts fresh and clean.

**Verbatim capture is the protocol.** Whatever the user types *is* the record. The agent's job is to log it faithfully and respond on top of it. Mess with the verbatim layer and continuity breaks.

**For interactive use, classify intent first, then load.** "Read everything" makes trivial turns slow; "read nothing" produces apologize-for-the-wrong-supplement failures. Intent-keyed reads are the cheap middle.

You're not training a chatbot. You're building a clinic. The doctors come and go; the chart persists.
