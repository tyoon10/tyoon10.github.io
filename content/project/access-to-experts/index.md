---
title: "Access to Experts — CNN Product Strategy"
summary: "A 12-week DPM Lab engagement with CNN. Validated that engaged readers want credentialed interpretation — not more voices — and designed a stage-gated rollout where senior product leadership endorsed credential cards as a ship-now item and the phased expert-reactions test as the right path forward."
authors:
  - admin
tags:
  - Product Management
  - User Research
  - Digital Media
  - Go-to-Market
  - Monetization
categories:
  - Product Strategy
date: 2026-05-08

image:
  caption: ""
  focal_point: Smart
  preview_only: false

draft: false
---

## Problem

CNN had a recurring thread in its internal user research that had never been fully resolved: *audiences increasingly seek diverse points of view and deeper expertise, but lack a single trusted destination to access perspectives across the political and topical spectrum.* The brand equity, global reach, and trust were already there. The platform wasn't.

The sponsor handed us this prompt as an open question — and asked for a real product decision, not a polite MBA presentation. The brief was deliberately ambiguous. *Diverse perspectives* could mean dozens of things: more voices inside the story, more political balance, more international viewpoints, more user-generated commentary, or something else entirely.

The strategic question we had to resolve before any product work:

> **What do CNN's most engaged readers actually mean when they say they want more perspectives — and is that something CNN should build, or keep ceding to Substack, podcasts, and X threads?**

## Approach

A 12-week engagement on a four-person team, with regular check-ins against the sponsor's senior product lead. The work split into six phases.

### 1. User research — finding the real need underneath the survey signal

15–30 minute qualitative interviews with CNN and broader-media readers, plus a quantitative survey of the same population. Three numbers anchored the rest of the project:

| Stat | Finding |
|------|---------|
| **61%** | Named expert analysis as the single most valuable type of content a news outlet can offer |
| **52%** | Said expert analysis is what they most want more of from CNN specifically |
| **49%** | Spend 10+ minutes per major story cross-checking sources outside CNN |

The nuance the survey alone hid: when users say they want *different perspectives*, it's easy to assume they mean more voices from inside the story. The interviews surfaced that they actually mean **credentialed experts who can tell them what the story means**. That distinction reframed everything downstream.

### 2. Persona — the Triangulator

Defined a single persona with two flavors:

- **Brand-reliant triangulator** — cross-references by *outlet*. CNN already has their trust. They want CNN's view stamped on the story.
- **Expert-reliant triangulator** — cross-references by *expert*. They follow specialists across Substack, podcasts, and X. For this user, CNN becomes the destination only when experts are visibly inside it.

The product insight: one feature serves both. The Triangulator visits CNN for trust, then leaves for depth. A credentialed expert reaction layer closes that loop by putting depth inside the surface they already trust.

### 3. The bet

> If CNN puts credentialed expert reactions inside the articles its triangulators read, engagement will increase — users will read more and return more often — and a subset of triangulators will be willing to pay to unlock unlimited access.

Two deliberate framing choices: **engagement first, monetization second**, and the order matters. The bet isn't that readers will pay for experts on day one. It's that expert reactions deepen the visit. If they do, paywall conversion follows. If they don't, no paywall fixes it.

### 4. Build principles

Four principles gated every design decision:

| Principle | Translation |
|-----------|-------------|
| Quality over quantity | Curated weekly handful, not comprehensive coverage |
| Port existing assets first | Pull from CNN's TV archive before commissioning new expert content |
| Depth before breadth | Engagement KPIs gate scope expansion |
| Trust is shown, not claimed | Credential cards make author authority visible at the point of trust |

### 5. Stage-gated rollout

A four-stage rollout with explicit KPI gates between each stage. **Credential cards ship regardless** — no gate, because making author expertise visible is infrastructure, not a feature test.

| Stage | What ships | Gate to advance |
|-------|-----------|-----------------|
| **0** | CTA-only teaser — measure interest before building | ≥5% opt-in |
| **1** | MVP: one story, one expert reaction (text), free | ≥30% read-through |
| **2** | 3–5 reactions per story across 3–5 weekly themes, free | 15% consumption, ~60% read-through, lift vs. control |
| **3** | Format expansion — text + video + audio from TV archive | 3–5% click-through, hold stage 2 metrics |
| **4** | General availability with all-access paywall | 2–4% paywall conversion, ~5% basic→all-access, 90% retention |

### 6. Monetization model

Tied directly to CNN's existing all-access subscription rather than building a separate product. Three levers, plus conservative break-even math:

| Lever | Mechanism |
|-------|-----------|
| Acquisition | Free readers convert to all-access |
| Upsell | Basic subscribers convert to all-access |
| Price | Strengthens the case for an all-access price increase |

| Input | Value |
|-------|-------|
| Build team (PM + designer + engineer) + experts roster + tech + marketing | **~$1.1M cost** |
| Weighted revenue per subscriber | **$65** |
| Break-even subscriber count | **~17,000** |
| Implied monthly exposures at 2% paywall conversion | **~70,000** |

## Results

The final pitch landed in front of CNN's senior product leadership — a cross-functional group spanning growth, retention, engagement, subscriptions, content operations, and editorial × product. Two specific reactions from the room:

> "Your user research is fairly consistent with what we're seeing. You should feel proud of whatever processes you used to talk to users."

> "You have anticipated almost every question I would have... you've honed in on the obvious question, which is: would you give us money for it? Those are two different questions."

Concrete endorsements from the sponsor team:

- **Credential cards** validated as a ship-now item, independent of the rest of the rollout
- **Use the TV archive first** validated as the right starting point — the sponsor's existing live-blogging product had already shown CTR lifts when individual contributor bylines were made visible, exactly mirroring what our research predicted
- **Stage 0 collapsed into Stage 1** — sponsor feedback was that a tiny MVP is cheaper to build than a synthetic CTA test, since "big doors typically make people annoyed"
- **Three-person lean team** validated as the right operating model
- **No AI-as-the-answer reflex** — explicitly called out as a strength of the recommendation

## Key Insights

> **The survey lies about what people want; interviews tell you why they actually want it.** Users say *more perspectives*. They mean *credentialed interpretation*. Taking the survey at face value would have produced a "more voices" feature that solved a nominal problem and missed the real one.

> **Atomize what already exists before building new.** CNN's TV bench is full of credentialed experts. The readers most likely to pay for an Access to Experts product are the readers who already don't see those experts — because they consume CNN through articles, not television. The product isn't *new content*. It's *existing content surfaced where the user already is*.

> **Trust signals are infrastructure, not features.** Credential cards — the small author-authority widget under a byline — should ship regardless of how the larger expert-reactions test goes. Trust scales across every article on the site, so the marginal cost is zero and the marginal value compounds. Features get gated by KPIs. Infrastructure ships.

> **Engagement comes before monetization in the pitch, even when monetization is the actual goal.** Conversion is a downstream consequence of deeper engagement, not a metric to optimize directly. Leading with the paywall would have invited a skeptical conversation about whether the feature actually moves the needle. Leading with engagement invited the room to validate the bet on its own terms.
