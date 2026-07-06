---
title: "The Translation Layer"
date: 2026-07-01
description: "Two years of Claude rooms, shipped tools, and a fintech exit taught me the hardest marketing problem in AI: being believed by people who can check your work."
featured: false
unlisted: true
tags:
  - "Product Marketing"
  - "Positioning"
  - "AI"
  - "Developer Marketing"
---


Last September I set up a folding table and a laptop on Columbia's campus. I had just joined the first global cohort of Anthropic's Claude Ambassadors, and the assignment for week one was simple: get people to stop. One in three students on campus had never heard of Anthropic. One asked me, in complete seriousness, whether "the Cloud" was a new ChatGPT model.

I assumed my job was attention. It was not. On a campus in the middle of an AI boom, attention is free. The real problem showed up later, in smaller rooms with sharper audiences, and it took me 40+ sessions to name it.

The rooms kept escalating. A room of [product managers who wanted to build with AI instead of around it](/writings/ai-superpower-for-pm/). A hall of [Directors and C-suite leaders at Columbia's executive AI program](/writings/what-senior-business-leaders-ask-about-ai/). Engineers already shipping to production. The questions changed with the rooms. The executives never asked what the model could do; they asked who carries the liability, what happens to their talent, and where the competitive advantage goes. The engineers did not argue with my claims at all. In a hands-on workshop everything I said got tried, live, within minutes, and either it worked or I lost the room.

That is where the lesson landed. **The hardest marketing problem in AI is not getting attention. It is being believed by people who can check your work.** An executive can be impressed by a story. An engineer runs it.

Being believed changed how I make claims. At Mistral's worldwide hackathon I spent a 36-hour sprint watching builders hit inference ceilings, so I went home and wrote about [the serving layer underneath agent stacks](/writings/agents-need-better-infrastructure/), with real telemetry, because for that audience a measured claim is the only kind that counts. When I wanted to say my panel-and-judge kit reached frontier-level output on a plain Claude subscription, I did not say it until blind, length-controlled A/B evals said it first; then I shipped [claude-ensemble](https://github.com/tyoon10/claude-ensemble) with the eval results in the README. The eval was the marketing. And when I wanted to speak credibly about Claude Code itself, I spent a weekend [reading two versions of its source tree side by side](/writings/tracing-the-minds-behind-claude-code/), 13 months apart, to see what the team kept and what they killed. You cannot fake fluency to people who live in the system. You can only earn it.

None of this was a marketing plan. It was the past two years converging: product management on one side, building and shipping on the other, and 40+ rooms in between. The lessons that fell out are the ones I now recognize as product marketing. Pick the one true sentence and lead with it; when I argued that context engineering, not prompt engineering, is what separates AI-native product managers from everyone else, that reframe traveled further than any feature list I have written. Keep one governed corpus of positioning, proof points, and voice that every draft pulls from, so the story cannot drift across channels; mine is literally a constitution file that [my own agents](https://github.com/tyoon10/optimind) read before they write. And test messages the way you test code. The New York community those rooms fed grew from zero to 1,300+ developers. Nothing grows like that on hype. It grows on claims that keep checking out.

The instinct is older than Claude. At CONCAT, the AI fintech I co-founded and sold, we had to convince first-time buyers to care about insurance, and the positioning that finally worked treated a policy like an investment portfolio. Six years of that taught me where I am most useful: at the seam where a capability becomes someone's decision. I call that seam the **translation layer**: the gap between what a system can do and what a person understands they can now do with it. The work is closing that gap in sentences that survive engineering review, and it is the same work whether the audience is one skeptical CTO or a keynote hall.

The models are getting more capable and less legible at the same time, which means the translation layer is about to matter more than any feature list. Someone has to stand at that seam and keep the story true and clear at once. I have spent two years learning how. **I do not plan to move.**
