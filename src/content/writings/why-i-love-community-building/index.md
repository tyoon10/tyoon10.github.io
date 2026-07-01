---
title: "Three Reasons I Love Community Building"
date: 2026-06-30
description: "Why I love community building, told through three NYC AI hackathons and the work of convening, mentoring, and building what lasts."
featured: false
unlisted: true
coverImage: "./cover.jpg"
tags:
  - "Community Building"
  - "Hackathon"
  - "AI"
  - "NYC Tech"
  - "Builders"
links:
  - name: "Columbia hackathon recap"
    url: "/writings/iterate-columbia-hackathon-2026-recap"
    icon: "globe"
  - name: "Mistral worldwide recap"
    url: "/writings/mistral-worldwide-hackathon-2026-recap"
    icon: "globe"
---


It was past midnight at a 36-hour hackathon in Manhattan when a team waved me over to show me their demo. Clean interface, fast inference, a model running on hardware in the room. I watched it run and asked the question I ask most: *"What user problem does this solve? Does this add value to how users currently get the job done?"*

They went quiet, started to answer, stopped. Twenty minutes later they came back, not with more features, but with a sharper version of the problem they were solving. The demo had not changed. The team had. That is why I do this. I have organized community at three scales, and each one taught me something the last could not.

Here are three reasons I love community building.

## Reason 1: Getting people into the room

On Valentine's Day, the [board room at Columbia Business School](/writings/iterate-columbia-hackathon-2026-recap/) was packed by 8:30 AM. Nearly 300 people, most of them strangers, had shown up to build for twelve hours. I helped organize it.

![Registration lines as the doors opened at the Columbia hackathon](./convene.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Registration lines as the doors opened on Valentine's Day; full recap <a href="https://twyoon.com/writings/iterate-columbia-hackathon-2026-recap">here</a>.</p>

- **~300** builders in the room
- **60+** teams shipped a final project
- **8** corporate sponsors, **$10,000+** in prizes
- **12** hours from kickoff to final pitch

But the numbers only capture part of it. The bet was about *who* we let in. Most campus hackathons draw from one school; we opened the doors to business and engineering students, founders, and first-time builders in a single room. **The room is where everything else becomes possible**, and someone has to open the door.

## Reason 2: Making builders better once they are in the room

Two weeks later I judged and mentored at [Mistral AI's first worldwide hackathon](/writings/mistral-worldwide-hackathon-2026-recap/), the New York edition of a 36-hour sprint that ran across seven cities: 7,000+ applied, 1,000 selected. My job was small and specific: sit with teams and ask the questions that move them forward.

![A mentoring circle at the Mistral hackathon, judges and builders huddled over a project](./mentor.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">A mentoring circle, judges and builders huddled over a project; full recap <a href="https://twyoon.com/writings/mistral-worldwide-hackathon-2026-recap">here</a>.</p>

A team would show a technically impressive demo, and I would push on two things: the problem (*"What user problem does this solve?"*) and the responsibility (*"How do you ensure safety, for privacy, public good, and inclusion?"*). The teams that paused, rethought, and came back sharper outperformed. The builds that doubled down on technical sophistication alone did not reach the top. A good question, asked at the right moment, multiplies what a builder can do long after the event ends.

## Reason 3: Building the scaffolding so it lasts

A great weekend is not a lasting community. The 300-person event ran on a 20-person team where every person owned a lane: sponsor onboarding and API-key distribution, registration flow, judging coordination, catering windows. When 300 people build under a clock, clarity of ownership is the actual product.

![The operating crew running the event, volunteers huddled together](./build.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">The operating crew that kept the day running; full recap <a href="https://twyoon.com/writings/iterate-columbia-hackathon-2026-recap">here</a>.</p>

The higher-leverage work is between events, and between organizers. Building Claude's NYC builder ecosystem from zero to over 1,300 developers, leading a business-school AI club and its startup challenge, and founding BRAIN NYC taught me that the leverage is not running one more event myself. It is developing the other organizers: thinking past one day's turnout to sustained engagement across a semester, and handing the next campus lead the sponsor flow, the judging rubric, and the run-of-show instead of letting them rediscover it.

Some of that scaffolding is code. Watching teams hit inference ceilings in that Mistral room sent me to write [Agents Don't Need Better Models. They Need Better Infrastructure.](/writings/agents-need-better-infrastructure/), on the serving layer beneath agent stacks. I ship what I write about: agentic workflows I built as a Manus AI Fellow, [claude-ensemble](https://github.com/tyoon10/claude-ensemble), an Opus panel-and-judge kit validated with blind, length-controlled A/B evals, and a [LightRAG pipeline](/projects/ai-pipeline-quant-finance/) that turns 4,000+ finance papers into a queryable graph database with 2.4x more comprehensive answers than naive RAG. I spent a weekend [reading two Claude Code source trees side by side](/writings/tracing-the-minds-behind-claude-code/) to see what held and what changed across thirteen months of the product. Before any of this I co-founded Concat, an insurtech acquired by a major insurer, where I led the ML: a recommendation engine that aggregated coverage data through authenticated insurer APIs and ranked policies against an expert rubric. I build under real deadlines, not only organize rooms where other people build.

My trajectory is a small proof that this compounds: from club events, to city-scale hackathons, to judging a global competition backed by the biggest names in AI. The thread was not credentials. It was showing up and doing the work nobody sees, some of it operational, some of it code. **Communities that last are built, not gathered.**

The questions, the tooling, and the open door are what a community keeps after the room clears. The people who fill these rooms are already shaping how the next generation builds with AI, and that is what I want to keep building for.
