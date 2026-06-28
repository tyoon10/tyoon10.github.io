---
title: "claude-ensemble: Frontier-Style Answers on a Claude Subscription Alone"
date: 2026-06-28
description: "A drop-in Claude Code kit that runs a best-of-N Opus panel and a verifying judge entirely on a Pro or Max subscription, with no API key. Built when the most capable models slipped out of subscription reach, by price and then by government suspension, and backed by blind, length-controlled A/B evals."
featured: true
coverImage: "./cover.png"
tags:
  - "Claude Code"
  - "Agent Orchestration"
  - "LLM Evaluation"
  - "Open Source"
links:
  - name: "Codebase"
    url: "https://github.com/tyoon10/claude-ensemble"
    icon: "github"
---


## Background

On June 9th, Anthropic released [Fable 5](https://www.anthropic.com/news/claude-fable-5-mythos-5), its most capable widely released model. The launch terms were explicit: free on Pro, Max, Team, and Enterprise plans through June 22nd, then removed from those plans on June 23rd, after which using it would require usage credits. It was a capacity-driven move to metered access, with subscription inclusion meant to return "when capacity allows."

It never reached that transition. On June 12th, eleven days early, a US government export-control directive [suspended Fable 5 entirely](https://www.anthropic.com/news/fable-mythos-access) over a cyber "jailbreak." Access to Anthropic's other models, including Opus 4.8, was not affected. Two weeks later the pattern went industry-wide: OpenAI [limited its new GPT-5.6 models](https://techcrunch.com/2026/06/26/openai-limits-gpt-5-6-rollout-after-government-request-says-restrictions-shouldnt-be-the-norm/) to a small set of government-approved partners, and Anthropic's Mythos 5 was cleared only for a list of trusted organizations. As of this writing, Fable 5 is still gone for general use.

So the most capable model left subscription reach twice over, on two unrelated tracks: first scheduled behind metered billing, then seized before that even happened. For most of us it was briefly on, then gone.

As a Claude evangelist, I had no intention of leaving the stack. I build with Claude Code every day, and switching providers over a single missing model was never the plan. But the most capable Claude model had left my plan overnight, first by price and then by policy, with no signal of when it would return, and I had no enterprise contract or trusted-partner slot to fall back on. What I did have was a Claude subscription, Claude Code, and the strong tier sitting just below the frontier. So I decided to build the maximum-performance setup myself, out of the models I could still reach.

## The problem

The tier just below the frontier never moved. Opus 4.8, Sonnet, and Haiku stayed generally available on the same subscription throughout, untouched by any directive. So the real question was not how to get the frontier model back. It was: **how close to frontier-level answers can a Claude subscriber get on hard tasks, using only what the subscription already provides?**

The bet is orchestration. Instead of reaching for a bigger model, run more coordinated passes of the models you have, and put a verification layer around them so the final answer is checked, not just generated.

## Who it's for

claude-ensemble is built for one kind of user: a Claude subscriber who builds with Claude Code and regularly hits problems hard enough that a single answer is not good enough. That is most independent builders, solo founders, and early-stage teams. Two things tend to be true of them. They are on a subscription rather than API billing, because token usage is unfamiliar and at real volume often not feasible. And they are committed to one provider, because you pick a stack and you live inside it. If you have a trusted-partner slot or an open API budget, you can just call the top model; this is for the rest of us.

Use it for the genuinely hard tasks, the ones where a single strong pass tends to leave something out:

- Systems and architecture design
- Debugging and root-causing stubborn failures
- Hard algorithms and data-structure problems
- Security threat-modeling
- Math and proofs
- Deep research and synthesis
- Subtle conceptual questions where precision matters
- Code where correctness is checkable, so the kit can run it to find and fix real defects

It is deliberately not for quick or simple work. The kit sizes up each task first and sends easy ones through a single pass, so you do not spend the premium where one answer already wins. Reach for it when the quality of the answer matters more than the speed or cost of getting it. What it buys you is two things a single call cannot: several independent attempts at the problem, and a judge that fact-checks them before combining them into one answer.

## claude-ensemble

[claude-ensemble](https://github.com/tyoon10/claude-ensemble) is a drop-in Claude Code kit. You type `/ensemble <your hard task>` and it runs entirely inside Claude Code on your Pro or Max plan. No API key, nothing metered separately.

![claude-ensemble architecture](./how-it-works.png)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">The pipeline: a triage gate routes simple tasks to one pass and hard tasks to a panel, a verifying judge, and a code-grounded verify-loop.</p>

It is built on Claude Code [Dynamic Workflows](https://code.claude.com/docs/en/workflows) and sub-agents, so the control flow is a local script that owns the orchestration, not a model improvising it:

- **Triage gate (Haiku).** A cheap first pass decides two things: whether the task is complex enough to need the ensemble, and whether it is *checkable* (has verifiable content that running code could confirm). Simple tasks get one pass and skip the rest, so you do not spend the premium where a single answer already wins.
- **Panel (Opus, best-of-N).** For hard tasks, several Opus sub-agents answer the same task independently, in parallel. These are independent attempts, not assigned roles; the evals below show designed diversity does not help.
- **Judge (Opus, max effort).** The judge sees the drafts under blind, shuffled labels, verifies each rather than trusting it, discards unsupported claims, and synthesizes one answer better than any single draft.
- **Verify-loop (checkable tasks only).** A harsh verifier runs code to find confirmed defects, a reviser fixes exactly those, and it repeats until the answer is clean or three rounds pass. This is the part a single pass structurally cannot do.

The kit selects models by tier alias (`opus`, `sonnet`, `haiku`), so it tracks new Claude releases with no edit.

## Experiments and results

I did not want to ship a "feels better" claim, so the kit ships with a [blind A/B evaluation suite](https://github.com/tyoon10/claude-ensemble/tree/main/eval) run entirely on a subscription. The method matters as much as the result.

The headline number shrank as the measurement got more honest. An absolute 0 to 100 rubric saturates on strong answers, so it over-states the gap. Blind pairwise win-rate, graded in both answer-orders and confirmed by an independent non-Claude grader, put the panel at about 60% over a single matched-effort Opus pass. Length-controlled, even that mostly reduces to ties: pairwise grading quietly rewards longer answers.

So the honest result is not "ensembles beat single models." It is narrower, and more useful:

| Question | Finding |
|---|---|
| Does the panel beat a single matched-effort model? | A small, real, length-sensitive edge. |
| Is draft diversity the lever? | No. Diversity and lift are uncorrelated (r = −0.11); the lowest-diversity panel had the highest lift. |
| Is panel breadth or model tier the lever? | Only weakly. Breadth saturates by about five drafts; a same-tier panel barely beats a single pass. |
| What *is* the lever? | The judge's effort, and the verify-loop. Raising judge effort was the single biggest knob; the verify-loop roughly halves real defects on checkable tasks. |

The mechanism, stated plainly: the gain is not many models disagreeing. It is **independent attempts giving a high-effort, verifying judge enough material to check, correct, and synthesize**, with a code-grounded loop on top for anything verifiable.

![Cost versus quality of the design choices](./cost-performance.svg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Each design at its real cost and quality. The panel tier is the quality jump; the verify-loop is the top; a Sonnet panel does not beat a single pass, so the kit skips it.</p>

The trade is cost. A complex run is several Opus calls plus the verify-loop, so it is Opus-heavy; Max is the right plan for it, and the triage gate keeps easy work off it. The [full methodology trail](https://github.com/tyoon10/claude-ensemble/tree/main/eval), including every reversal, is in the repo.

## Conclusion

The durable move for a subscription builder is not waiting for the next frontier model to stay on your plan. It is orchestrating the tiers you already have and verifying their output, so that more of the model's capability actually reaches the answer. The moat is not the model; it is the process you put around it.

claude-ensemble is open source under MIT, runs on a Pro or Max subscription with no API key, and follows new Claude models automatically. I built it for myself, as a Claude subscriber building with Claude Code. If that is you, it is a few files in your `.claude/` directory away.
