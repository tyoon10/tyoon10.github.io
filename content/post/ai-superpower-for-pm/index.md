---
title: "The AI Superpower for PMs: Why Context Engineering Is the Skill That Changes Everything"
subtitle: "From a Claude Workshop at Columbia Business School"
summary: "Context engineering — not prompt engineering — is the PM superpower that separates AI-native product managers from everyone else."
authors:
  - admin
tags:
  - Product Management
  - Context Engineering
  - Claude Code
categories:
  - AI Strategy
date: 2026-02-26
lastmod: 2026-02-26
featured: true
draft: false

image:
  caption: "Claude Code Workshop at Columbia Business School"
  focal_point: Center
  preview_only: false

projects: []

links:
  - icon: linkedin
    icon_pack: fab
    name: LinkedIn Post
    url: https://www.linkedin.com/posts/taewan-yoon_claudepartner-productmanagement-contextengineering-activity-7432843926362931201-MvCA
---

## 300 Students, Two Weeks, One Recurring Conversation

Over the past two weeks, I delivered Claude workshops to 300+ students at Columbia — from business to engineering students, from graduate to undergrads — sharing best practices for becoming AI-native and getting them hands-on with Claude Code.

The highlight was yesterday's session at Chris LaSala's Digital Product Management Lab at Columbia Business School. I titled it "The AI Superpower for PMs" and set myself three goals:
1. Demonstrate what is actually achievable with today's agentic AI capability
2. Guide PMs past the fear of facing command-line tools and IDEs
3. Land a genuine superpower in their hands

The world has been shifting at a pace that is hard to overstate. In the span of three weeks:
- Claude Opus 4.6 released *on February 5th*
- OpenAI acquired OpenClaw *on the 15th*
- Claude Sonnet 4.6 dropped *on the 17th*
- Gemini 3.1 Pro arrived *on the 19th*

In every session, I heard elevated excitement — students building things, shipping projects, experimenting with new workflows. But alongside that excitement, there was a growing anxiety, fed by the relentless feed from Threads, X, and LinkedIn.

**Mihail Eric**, who teaches the famous [The Modern Software Developer](https://themodernsoftware.dev/) at Stanford, recently described what companies are actually hiring for right now: not foundation model builders or hyperscaler infra specialists, but "AI-natives" — builders who know how to build with agents as a first-class primitive. The demand is everywhere. And the defining trait of these engineers is not that they use AI tools. It is *how* they use them.

That distinction matters just as much on the product side. And it is exactly where PMs are falling behind — because under all that excitement, I kept noticing the same retreat.

## The Safe Space That Isn't

When I opened VS Code for a live demo, a visible portion of the room checked out. Node.js, the terminal, GitHub — these tools triggered anxiety, not curiosity. Many students quietly returned to what felt safe: a chat interface (i.e., your everyday *claude.ai* or *chatgpt.com*).

I understand this. **I was one of them.**

But Mihail's observation about engineers applies here with uncomfortable precision. AI-native engineers, he writes, don't "just download Cursor and prompt it a few times." They build spec-driven systems, understand agent limitations like SDK hallucination, and know how to set up agent-friendly environments — an AGENTS.md, consistent patterns, robust test coverage — so that the agent can actually do its job. The tool is a **multiplier** for their existing fundamentals, NOT a crutch that replaces them.

The same is true for PMs. Opening a browser and typing questions into a chat box is the PM equivalent of downloading Cursor and prompting it a few times. It feels like progress.

But here is the truth that anyone who has spent serious time trying to automate workflows with LLMs already knows: the chat interface has a ceiling. **The more you iterate, the more you hit it.**
- You lose context after an extended conversation.
- You start a new session and begin from scratch.
- You dump all your context files at once, expecting that an ever-smarter model will magically figure out which file matters for which question. **(I was one of them)**

That last behavior feels logical. The models are getting smarter every week. Surely more input equals better output. But that assumption is wrong — and **understanding why is the entire point**.

Smarter models and bigger context windows will not fix this *(at least for now)*.

## It's Not the Model. It's the Mechanics.

Think of a language model's context window as a **desk** where the model does all its thinking. A bigger desk lets you spread out more material. But there is still only one desk, and only one pair of eyes scanning it.

Here is what actually happens inside the model. It does not read your context front to back like you read a document. It computes relationships between every token and every other token. For *n* tokens, that creates *n*-squared relationships. As your desk fills up, the model must divide its finite *attention* across exponentially more connections. The result is what researchers call an "attention budget" — and it depletes as context grows.

This is not a bug that will be patched. It is the **fundamental mathematical structure of how transformer models work**.

The consequences are measurable. Research on the "lost-in-middle" phenomenon shows that information buried in the center of a long context receives **10–40% lower recall accuracy** compared to information placed at the beginning or end. The model is not ignoring your content on purpose — its attention budget simply runs thin in the middle.

**Anthropic was intentional about this.** They restricted context windows until the latest 4.6 models (now up to 1 million tokens) because they understood that a bigger window does not automatically mean better performance. The window and the effective range are not the same thing.

As Andrej Karpathy put it, the real challenge is *"the delicate art and science of filling the context window with just the right information for the next step."* (I think it summarizes the key beautifully)

The RULER benchmark drives this home with a sobering finding: only 50% of models claiming 32K+ context actually maintain satisfactory performance at 32K tokens. Near-perfect scores on simple needle-in-a-haystack tests do not translate to real long-context understanding.

So if bigger and smarter is not the answer, what is?

## Prompt Engineering Was the Beginning. This Is What Comes Next.

The discipline is called **context engineering**. And it is not the same thing as prompt engineering.

**Prompt engineering** is about crafting effective instructions — *writing a good prompt*. **Context engineering** is the holistic curation of *everything* that enters the model's limited attention budget: system prompts, tool definitions, retrieved documents, conversation history, and tool outputs. The prompt is one piece. The context is the whole picture.

The core principle is simple: informativity over exhaustiveness. Do not dump everything. Direct the model's attention to what matters most — to you, for this task, right now.

Muratcan Koylan wrote an excellent [post on X last week](https://x.com/koylanai/article/2025286163641118915) unpacking this in depth. His practical framework breaks down into four strategies:

- **Write**: Save context outside the active window — use scratchpads, files, external storage — so the working context stays lean.
- **Select**: Pull in only the relevant context at the moment it is needed, through retrieval and filtering.
- **Compress**: Summarize what has already served its purpose to free up attention budget.
- **Isolate**: Split complex workflows across focused sub-agents rather than stuffing everything into one session.

This is a mindset shift. You are no longer just a prompter of outputs. You are a **curator of attention**.

## The Moat You Already Know How to Build

Here is the reframe that unlocks everything for PMs: **context engineering is not an alien discipline**. It is something exceptional PM teams have practiced for decades — in a different medium.

From my previous experience as a PM at multinational companies — from 100,000 to over 1 million employees globally — these exceptional hyperscalers had one thing in common. It was not raw intelligence or headcount. It was their **documentation systems**.

A single well-written document is easy to duplicate. But a **structured, living system of documentation** — one that connects decisions to context, context to stakeholders, and stakeholders to constraints — that becomes a genuine strategic moat. It is what allows PM teams to move at a super fast pace, consistently shipping high-impact products.

**This is exactly what you want to build for your Claude Code workflow.** Mihail describes how AI-native engineers set up "agent-friendly" codebases — an AGENTS.md file, consistent style patterns, a robust build system — so the agent has the right context to operate effectively. For PMs, the equivalent is a CLAUDE.md file, structured project briefs, clear module hierarchies. These are not AI tricks. They are **documentation practices** applied to a new kind of collaborator.

The contrast is sharp. Files dumped into a chat return *generic responses*, heavily influenced by the model's general training data. Files curated with intention — structured, scoped, progressively disclosed — return responses that understand your specific product, your specific stakeholders, your specific constraints. Rather than wasting most of your token budget and context window on irrelevant noise, you direct the attention to what matters the most to you.

## Three Moves That Change How You Work

Let me make this concrete. Three practical moves that any PM can start applying today.

**1. Build a context file for every project, not every chat.**

Instead of re-explaining your product, team, and constraints at the start of every session, maintain a structured context file (like CLAUDE.md) that lives in your project folder. It loads once, stays current, and keeps the model oriented to what is relevant. Think of it as a living brief that your AI collaborator reads before every conversation — summaries first, deeper context on demand. This is **progressive disclosure**: the model loads what it needs, when it needs it.

**2. Separate tasks instead of stacking them.**

When you ask the model to research, draft, and review in a single session, you are asking it to hold multiple competing contexts simultaneously. This is the classic context confusion pattern — the model starts mixing requirements from different tasks, applying constraints from the wrong context. Instead, isolate tasks. Run research in one focused session, drafting in another. Each focused session gets a clean, narrow context window. This is the PM version of what Mihail describes AI-native engineers doing: splitting complex projects into milestones and delegating tasks to 2–5 coding agents concurrently. The principle is the same — **focused context, parallel execution**.

**3. Treat the context window as a budget, not a storage unit.**

Before adding any file or document to context, ask: *does this actually need to be here for this specific task?* Irrelevant content does not sit passively in the background. It actively *competes* for the model's attention. Research shows that even a single irrelevant document is enough to measurably degrade performance on the relevant ones. Less, but more targeted, is almost always better.

## The AI Superpower Is a PM Superpower

Back in that room at Columbia Business School, the title of the session was not just a provocation — it was a genuine belief.

Product managers are already expert context engineers in their daily work. They manage competing stakeholder information. They translate ambiguous user signals into clear requirements. They hold product decisions in relation to business constraints, technical feasibility, and user needs — all at once. PMs have always been in the business of curating what the next conversation needs to know.

Context engineering for AI is that same discipline applied to a new kind of system — one that is extraordinarily capable when you give it the right context, and embarrassingly generic when you do not.

Mihail says we are witnessing the rise of a new engineering archetype — the AI-native engineer. I believe we are witnessing the same on the product side. The **AI-native PM** is not the one who uses the most AI tools. It is the one who understands that AI is a multiplier for strong fundamentals, not a replacement for them — and who treats context as the lever that determines whether that multiplier works.

If you are a PM who has been living in the chat box, the door to something better is not a technical one. It is a conceptual one. And now you have the key.
