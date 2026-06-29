---
title: "claude-ensemble: Frontier-Style Answers on a Claude Subscription Alone"
date: 2026-06-28
description: "A Claude Code kit for most challenging tasks. Runs Opus panel and a verifying judge entirely on a Pro or Max subscription. Backed by blind, length-controlled A/B evals."
featured: true
coverImage: "./cost-performance.svg"
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

On June 9th, Anthropic released [Fable 5](https://www.anthropic.com/news/claude-fable-5-mythos-5), its most capable widely released model. The launch terms were explicit: free on paid plans through June 22nd, then removed from those plans after which using it would require usage credits. 

On June 12th, a US government export-control directive [suspended Fable 5 entirely](https://www.anthropic.com/news/fable-mythos-access) over a cyber "jailbreak." Two weeks later the pattern went industry-wide: OpenAI [limited its new GPT-5.6 models](https://techcrunch.com/2026/06/26/openai-limits-gpt-5-6-rollout-after-government-request-says-restrictions-shouldnt-be-the-norm/) to a small set of government-approved partners, and Anthropic's Mythos 5 was cleared only for a list of trusted organizations.

Rather than wait for it to come back, I built a maximum-performance setup from the tier that stayed.

## Who it's for

Almost everyone (outside the exclusive list) lost the frontier tier. claude-ensemble is for those people: a Claude subscriber who builds with Claude Code and keeps hitting problems where a single answer is not good enough. Most are **independent builders, solo founders, and early-stage teams,** on a subscription rather than API billing and committed to one provider.

Use claude-ensemble on your most ambitious tasks, such as the following where one strong pass is often insufficient:

- Systems and architecture design
- Debugging and root-causing stubborn failures
- Hard algorithms and data-structure problems
- Math and proofs
- Deep research and synthesis
- Subtle conceptual questions where precision matters

While it is not for quick or simple work, the kit routes easy tasks to a single pass, so you only pay the premium when it is really needed.

## claude-ensemble

[claude-ensemble](https://github.com/tyoon10/claude-ensemble) is a drop-in Claude Code kit. You type `/ensemble <your hard task>` and it runs entirely inside Claude Code on your Pro or Max plan. No API key, nothing metered separately.

![claude-ensemble architecture](./how-it-works.png)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">The pipeline: a triage gate routes simple tasks to one pass and hard tasks to a panel, a verifying judge, and a code-grounded verify-loop.</p>

It is built on Claude Code [Dynamic Workflows](https://code.claude.com/docs/en/workflows) and sub-agents, so the control flow is a local script that owns the orchestration, not a model improvising it:

- **Triage gate (Haiku).** A cheap first pass decides two things: whether the task is complex enough to need the ensemble, and whether it is *checkable* (has verifiable content that running code could confirm). Simple tasks get one pass and skip the rest, so you do not spend the premium where a single answer already wins.
- **Panel (Opus, best-of-N).** For hard tasks, several Opus sub-agents answer the same task independently, in parallel. These are independent attempts, not assigned roles; the evals below show designed diversity does not help.
- **Judge (Opus, max effort).** The judge sees the drafts under blind, shuffled labels, verifies each rather than trusting it, discards unsupported claims, and synthesizes one answer better than any single draft.
- **Verify-loop.** A harsh verifier runs code to find confirmed defects, a reviser fixes exactly those, and it repeats until the answer is clean or three rounds pass. This is the part a single pass structurally cannot do.

The kit selects models by tier alias (`opus`, `sonnet`, `haiku`), so it tracks and adopts latest versions of Claude model family with no edit.

## Experiments and results

The kit ships with a [blind A/B evaluation suite](https://github.com/tyoon10/claude-ensemble/tree/main/eval) run entirely on a Claude subscription.

Six controls keep the measurement trustworthy:

- **Blind grading.** Answers are scored under randomized labels with all provenance stripped, so no judge can favor a known source.
- **Both answer-orders.** Every comparison is graded in both orders and averaged, cancelling position bias.
- **Cross-family graders.** Two Claude judges (Opus and Sonnet) plus an independent non-Claude grader (Gemini 3.5 Flash), to rule out same-family preference.
- **Two scoring methods.** An absolute 0 to 100 rubric and a blind pairwise win-rate, so no single scale's quirks decide the outcome.
- **Length control.** A re-grading pass that strips the length bias pairwise scoring carries, so a longer answer cannot win on size alone.
- **Full reproducibility.** Each experiment is a Claude Code workflow with its raw JSON and chart script, every run kept in the repo.

Under those controls, the numbers hold up:

| Measure | Result |
|---|---|
| Panel vs a single matched-effort Opus pass (blind pairwise) | ≈ 60% win-rate |
| Same comparison, independent non-Claude grader | ≈ 62% win-rate (agrees) |
| Verify-loop on checkable tasks | roughly halves real defects |
| Judge effort, raised on its own (the single biggest knob) | +2.4 rubric points |
| Draft diversity vs measured lift | uncorrelated (r = −0.11) |
| Panel breadth | saturates by about five drafts |

The strongest signal of trust is the agreement: two graders from different model families land within two points of each other (60% and 62%), so the win-rate is not a single-family artifact. Length control narrows the panel's raw edge, and the gains from the two real levers, **a high-effort verifying judge and the code-grounded verify-loop,** survive it.

The gain comes from independent attempts giving the judge enough material to check, correct, and combine into an answer stronger than any single draft.

![Cost versus quality of the design choices](./cost-performance.svg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Each design at its real cost and quality. The panel tier is the quality jump; the verify-loop is the top; a Sonnet panel does not beat a single pass, so the kit skips it.</p>

The trade is **cost** for running multiple Opus at high effort. A complex run is several Opus calls plus the verify-loop, so it is Opus-heavy; max effort is called for the most difficult challenges, and the triage gate keeps easy work off it. The [full methodology trail](https://github.com/tyoon10/claude-ensemble/tree/main/eval), including every reversal, is in the repo.

## Conclusion

Access to the most advanced frontier models is moving towards exclusivity. For independent builders, claude-ensemble helps achieve frontier-level performance through orchestration and verify loop, so that more of the model's capability actually reaches the answer. The moat is not the model; it is the process you put around it.

claude-ensemble is open source under MIT, runs on a Pro or Max subscription with no API key, and adopts new Claude models automatically. I built it for Claude Code builders, including myself, who are solving problems that the current models alone cannot.
