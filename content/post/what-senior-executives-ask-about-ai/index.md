---
title: "What Senior Executives Actually Ask About AI"
subtitle: "10 Questions from the Boardroom — Answered"
summary: "I guest-lectured to Directors and C-suite leaders at Columbia's executive AI program. The questions they asked reveal exactly where senior leadership's mind is right now."
authors:
  - admin
tags:
  - Financial Services
  - AI Strategy
  - Executive Education
categories:
  - AI Strategy
date: 2026-03-18
lastmod: 2026-03-18
featured: true
draft: false

image:
  caption: "Columbia Business School Executive Education — The Business of AI"
  focal_point: Center
  preview_only: false

projects: []

links:
  - icon: calendar-alt
    icon_pack: fas
    name: Guest Lecture Event
    url: /event/building-the-future-of-finance-with-claude/
---

I recently guest-lectured at Columbia Business School's executive education program, [The Business of AI](https://execed.business.columbia.edu), alongside Prof. Moran Cerf. The room was filled with Directors, VPs, and C-suite leaders from global financial services firms — people who approve seven-figure technology budgets and sit in boardrooms where AI strategy is debated quarterly.

After a morning of AI fundamentals — how LLMs work, fine-tuning, RAG, and open-weight models — I ran a live demo: building a full DCF valuation model and a board-ready pitch deck using Claude's Excel and PowerPoint integration, from a blank spreadsheet to finished deliverables in under 20 minutes.

What followed was the most revealing part. The questions these executives asked tell you exactly where the senior leadership mind is right now on AI. Not where LinkedIn thinks it is. Where it actually is.

Here are the questions they asked — reframed and answered.

---

## 1. "If AI builds the model, who's liable when it's wrong?"

This was the first question out of the room — before any demo, before any use case. Liability.

The honest answer: you are. AI providers explicitly disclaim liability for outputs. When Claude builds a DCF or drafts a loan approval, the institution's name is on it. The model provider's isn't.

This isn't a new problem. It's the same principle that applies when a first-year analyst builds a model: the MD who signs off on the pitch book owns the output. AI doesn't change the accountability chain — it changes the speed at which errors can propagate if no one's checking.

The data supports the urgency. [McKinsey's 2025 State of AI report](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) found that 51% of firms have already experienced AI-related incidents, yet only 28% say the CEO takes direct responsibility for AI governance, and just 17% say the board does. [Deloitte's 2026 State of AI in the Enterprise](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html) puts the number even sharper: only 21% of organizations have a mature governance model for autonomous AI agents, despite 74% expecting significant agentic AI deployment within two years.

The practical implication: the question isn't "can AI make mistakes?" It's "does your review process catch mistakes regardless of who — or what — made them?" If your quality assurance relies on the assumption that a human built the model slowly, you have a process problem, not an AI problem.

## 2. "We'd have to give them everything — all our documents, all our IP. How safe is that?"

This question carried real weight in the room. You could feel the discomfort. These are people whose firms spend millions on information barriers and data classification.

Prof. Cerf made a point that landed: your documents are already sitting on someone else's cloud — AWS, Azure, Google Cloud. The migration to cloud infrastructure five years ago was the decision point. Fine-tuning is a flag you turn on within infrastructure you've already entrusted.

That said, the concern isn't irrational. There's a meaningful difference between storage and training. Cloud storage keeps your data in a vault. Fine-tuning feeds your data into a learning process. AI providers contractually commit to not training general models on your proprietary data, but the perceived risk is real — and it's the top concern across the C-suite. [PwC's 2025 Responsible AI Survey](https://www.pwc.com/us/en/tech-effect/ai-analytics/responsible-ai-survey.html) found that only one-third of CEOs globally have high trust in embedding AI into key processes. [Deloitte](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html) reports that 73% of executives rank data privacy and security as their number one AI governance concern.

The executives who navigate this well don't ask "is it safe?" in the abstract. They ask: "what data classification does this require, and what's the deployment model that matches our existing governance?" That turns a philosophical debate into a procurement decision.

## 3. "What are the switching costs if we pick the wrong provider?"

This is a CFO question disguised as a technology question. What they're really asking: if we bet on one AI provider and they raise prices, get acquired, or fall behind — are we locked in?

The answer, right now, is surprisingly encouraging. AI companies have deliberately made switching easy. APIs are largely interoperable. A RAG implementation built for Claude can be ported to GPT or Gemini with minimal code changes. The providers are competing for enterprise deals by lowering switching costs, not raising them.

The major banks are already designing for this. [JPMorgan's LLM Suite](https://www.jpmorganchase.com/about/technology/news/llmsuite-ab-award) — which won American Banker's 2025 Innovation of the Year and onboarded 250,000 employees — runs a model-agnostic architecture that integrates OpenAI and Anthropic models, updating every eight weeks. [Goldman Sachs' GS AI Assistant](https://www.ai-street.co/p/goldman-joins-jpm-morgan-stanley-releasing-ai-tool) routes to GPT-4o, Gemini, or Claude depending on the task. They've designed around the assumption that no single provider stays on top forever.

But there's a subtlety. The switching cost isn't in the API. It's in the institutional knowledge you encode into the system — your prompt libraries, your fine-tuned models, your team's learned workflows. The deeper you integrate, the more the switching cost becomes a people problem, not a technology problem. That's worth factoring into your adoption strategy from day one.

## 4. "How do you actually verify the output?"

This was the question the room kept circling back to. Not "can AI do the work?" — they'd just watched it build a complete valuation model. The question was: "should I trust it?"

[PwC](https://www.pwc.com/us/en/tech-effect/ai-analytics/responsible-ai-survey.html) quantified the trust gap: executives trust AI for data analysis (38%) and performance improvement (35%), but trust drops to just 20% for financial transactions. The gap between capability and confidence is where most enterprises stall.

There are three practical approaches, and most sophisticated teams use all of them:

**Use your existing templates.** Don't start from a blank canvas. Give the AI your firm's model template — the same one your analysts use. The AI populates it; you review it against a structure you already understand. The verification surface area shrinks dramatically.

**Check the work in stages.** The same way you'd review an analyst's work: check the assumptions first, then the build, then the output. Don't let any tool — human or AI — run unsupervised from prompt to final deliverable.

**Use a second model to audit the first.** One executive in the room shared this practice: have a different LLM write the test cases and validation checks, then run those against the original output. It's the AI equivalent of a four-eyes review.

The deeper point: verification isn't an AI-specific problem. It's a workflow design problem. If your current process can't catch a wrong number regardless of who put it there, AI didn't create the risk — it exposed it.

## 5. "If we sell the business and we've fine-tuned a model with all our data, does that hit the multiple?"

This one surprised me. It's a question only a financially sophisticated audience would ask, and it reveals how deeply these executives are thinking about AI as a balance sheet issue.

The concern has two dimensions. First, valuation: if your proprietary data lives inside a third-party's fine-tuned model, is that an asset or a dependency? It's not on your balance sheet, you don't own the weights, and the provider can change terms. A buyer doing diligence will ask about it.

Second, risk: if your competitive advantage is encoded in a system you rent, how does an acquirer evaluate the durability of that advantage?

There isn't a settled answer yet. But the direction is clear. [NVIDIA's 2026 State of AI in Financial Services survey](https://blogs.nvidia.com/blog/ai-in-financial-services-survey-2026/) found that 83% of financial services firms say open-source models are important to their AI strategy. The firms moving toward open-weight models and on-premise deployments are partly doing so because ownership of the model is cleaner from a corporate finance perspective.

If you're building toward an exit or a strategic transaction, how you deploy AI today has implications for how your business gets valued tomorrow.

## 6. "Will investment banks stop hiring junior analysts?"

A senior executive posed this not as a fear, but as a hypothesis — and then answered it himself: "Seems to me the analyst jobs aren't going anywhere. They'll be doing more sophisticated work."

He's partly right. The volume of pure production work — building models from scratch, formatting pitch books, pulling comps — will compress. That's the work that kept analysts in the office until 4 AM, and it's the work AI handles well today.

The signals are mixed. [Fortune reported](https://fortune.com/2025/06/02/junior-analysts-wall-street-jobs-taken-by-ai/) that some firms considered cutting junior hiring by as much as two-thirds. [OpenAI's "Project Mercury"](https://fortune.com/2025/10/22/sam-altman-openai-wall-street-junior-bankers-ai-entry-level-jobs/) hired 100+ ex-investment bankers to build financial modeling automation. Yet [actual headcounts at major banks rose in 2025](https://fortune.com/2025/12/21/is-ai-killing-finance-and-banking-jobs-experts-say-wall-street-layoffs-hype-than-takeover/) — Goldman added ~1,800 and JPMorgan added ~2,000.

The real shift isn't fewer analysts. It's analysts who arrive at judgment faster. A first-year who can build and review an AI-generated model in two hours instead of building one from scratch in twelve has ten extra hours to spend on second-year work: client interaction, sector expertise, deal strategy.

The firms that treat AI as a headcount reduction tool will lose. The firms that treat it as a leverage multiplier — more output per person, higher-quality thinking earlier in careers — will win the talent war.

## 7. "What kind of person should we be hiring for this world?"

This was the question with the most energy in the room. Not the technology — the people.

[BCG's "AI at Work 2025" survey](https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain) highlights the scale of the challenge: only 36% of employees feel well-prepared to use AI, and only 25% of frontline workers say they get enough guidance from managers. But here's the finding that matters most: employee positivity about AI rises from 15% to 55% with strong leadership support. The talent problem is largely a leadership problem.

[McKinsey's "Superagency in the Workplace" report](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work) found that employees are 3x more likely than leaders expect to already be using gen AI for 30%+ of their daily work — but 47% of C-suite leaders believe their companies are moving too slowly due to leadership misalignment and lack of talent.

Three qualities matter more now than they did two years ago:

**Learning velocity over domain depth.** The toolset changes every quarter. Domain expertise still matters, but it's table stakes. The differentiator is how fast someone absorbs and applies new capabilities.

**Judgment under ambiguity.** When AI generates a model, someone needs to decide: is this output good enough? Does this assumption hold for our client's industry? That's not a technical skill — it's a combination of business acumen, pattern recognition, and intellectual honesty.

**Comfort engaging with the machine's reasoning.** Not just using AI, but interrogating it — reading the thinking trace, challenging assumptions, iterating on prompts. The analysts who treat AI as a black box will produce mediocre work. The ones who engage with the process will produce exceptional work.

## 8. "How does Claude compare to Microsoft Copilot?"

Every executive audience asks this. It's the vendor selection question, and it matters because most firms will standardize on one or two platforms.

The honest answer: the landscape shifts quarterly, and any specific comparison I give today will be partially outdated by the time you read this. What's more durable is the framework for evaluating.

**Where does the AI need to operate?** If your workflow lives in Microsoft 365, Copilot has native advantages. If your developers need agentic coding assistance, Claude Code currently leads. If your team needs deep reasoning on complex documents, Claude's extended thinking is differentiated. Match the tool to the workflow, not the brand.

**How deep is the integration?** Surface-level features — chatbots, summarizers — are largely interchangeable across providers. Deep integrations that span applications — AI that reads your Excel model and writes your PowerPoint deck in one continuous workflow — create genuine workflow advantages. Evaluate at the workflow level, not the feature level.

**What's the provider's enterprise posture?** Data handling, compliance certifications, deployment options (cloud vs. on-premise), contract flexibility. For regulated industries, this often matters more than model performance benchmarks.

The major banks aren't picking one. [JPMorgan](https://www.cnbc.com/2025/09/30/jpmorgan-chase-fully-ai-connected-megabank.html), [Goldman Sachs](https://www.ai-street.co/p/goldman-joins-jpm-morgan-stanley-releasing-ai-tool), and [Citigroup](https://fortune.com/2025/04/09/how-citis-cto-is-rolling-out-new-gen-ai-productivity-tools-to-more-employees-across-the-globe/) all run multi-model architectures. Design your workflows to be model-agnostic where possible, and go deep on one platform where the integration creates real leverage.

## 9. "Can it process real-time market data?"

Yes — and this is where the capability gap between "AI chatbot" and "AI agent" becomes concrete.

A chatbot answers questions from a fixed context. An agent goes and gets information. When Claude builds a financial model, it doesn't just work from the documents you provide — it can search the web for current market data, pull SEC filings, and cross-reference industry benchmarks. The model it produces reflects both your proprietary context and current market conditions.

This matters enormously for financial services. A DCF built on stale assumptions is worse than useless. The ability to dynamically incorporate today's risk-free rate, current trading multiples, or recent comparable transactions — without a human manually updating inputs — changes the unit economics of analysis.

[NVIDIA's survey](https://blogs.nvidia.com/blog/ai-in-financial-services-survey-2026/) found that 42% of financial services firms are already using or assessing agentic AI, with 21% having deployed AI agents. The shift from static chat to dynamic agents is well underway.

The caveat: real-time doesn't mean infallible. The AI can pull a wrong number from a misread source just like a human can. Verification still applies. But the speed of assembly is transformative.

## 10. "What should we be preparing for — strategically?"

This was the question underneath many of the tactical ones. Prof. Cerf laid out the three enterprise AI adoption models — fine-tuning (give your data to the provider), RAG (keep your data, augment the prompt), and open weights (run the model yourself). The trend line is clear: enterprises are moving toward more control.

The data confirms the trajectory. [NVIDIA](https://blogs.nvidia.com/blog/ai-in-financial-services-survey-2026/) reports that active AI usage in financial services jumped from 45% to 65% year-over-year, with 83% citing open-source models as important to strategy. [Goldman Sachs' "OneGS 3.0" memo](https://fortune.com/2025/10/14/goldman-sachs-layoffs-headcount-earnings-ai-efficiencies/) directed partners to identify every role that "could be made more efficient if replaced by artificial intelligence." JPMorgan, Goldman, and Citi have all deployed AI to over 100,000 employees each — but through model-agnostic platforms, not locked-in commitments.

[Accenture's AI revenue tripled to $2.7 billion in FY2025](https://www.ciodive.com/news/accenture-generative-ai-revenue-skills-training-data-modernization/761161/), with bookings reaching $5.9 billion — but the company noted that isolating AI revenue is becoming meaningless because AI is now embedded across most client engagements. That's the signal: AI is moving from a line item to an operating assumption.

What this means for executives making decisions today: don't over-invest in a single deployment model. Build your data architecture, your prompt libraries, and your team's AI fluency in ways that are portable. The biggest risk isn't choosing the wrong model or the wrong provider. It's building organizational muscle memory around a single approach and then being unable to adapt when the landscape shifts — which it will.

---

## The Pattern Underneath

These questions came from a room of people who control significant budgets, manage large teams, and are accountable to boards. They weren't asking about AI because it's interesting. They were asking because they have to make decisions — this quarter — about how their organizations will operate.

The pattern I see across every executive audience: the technology questions get answered quickly. The questions that linger — liability, talent, competitive advantage, organizational design — are the ones that don't have clean answers yet. And those are exactly the questions that require senior leadership to engage directly, not delegate to IT.

If you're a leader navigating this transition, the most valuable thing you can do this week isn't evaluating an AI tool. It's sitting with your team and asking: **where are our people doing translation work — converting information from one format to another — instead of thinking?**

That's your starting point.
