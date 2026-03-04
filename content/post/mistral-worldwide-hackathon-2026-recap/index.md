---
title: "Connecting Local to Global: Inside Mistral AI's Worldwide Hackathon"
subtitle: "Recap of the Multi-City, High-Stake Operation from the Judge's Seat in New York"
summary: "7,000+ applications, 1,000+ builders, 7 cities, $200K+ in prizes — inside Mistral AI's first worldwide hackathon, from the judge's seat at the New York edition."
authors:
  - admin
tags:
  - Hackathon
  - Open Source
  - Community Building
  - NYC Tech
categories:
  - Community
date: 2026-03-03
lastmod: 2026-03-03
featured: true
draft: false

image:
  caption: "Mistral AI Worldwide Hackathon — New York Edition"
  focal_point: Center
  preview_only: false

projects: []

links:
  - icon: linkedin
    icon_pack: fab
    name: LinkedIn Post
    url: https://www.linkedin.com/posts/taewan-yoon_mistralai-hackathon-nyc-share-7433280584619028480-aHHn
  - icon: link
    icon_pack: fas
    name: Event Page
    url: https://hackiterate.com/mistral-worldwide-hackathons
---

At 9 AM on February 28th, Verci Flatiron in Manhattan was already buzzing. Laptops open, monitors set up, breakfast croissants on the tables — a nod to the Parisian company behind it all. Across the room, hundreds of builders were settling in for what would become a 36-hour overnight sprint. Across the world, six other cities were doing the same thing.

This was **Mistral AI's first-ever Worldwide Hackathon** — their largest hackathon to date — running simultaneously across **Paris, London, New York, San Francisco, Tokyo, Singapore, and Sydney**. Over 7,000 people applied. 1,000 were selected. And I was there as a judge.

## The Event at Scale

The numbers alone tell a story:
- Seven cities
- 7,000+ applications from a highly competitive global pool 
- $200K+ in total prizes 
- A grand prize of $10,000 cash plus $15,000 in Mistral credits plus a hiring opportunity at Mistral AI — with local winners advancing to a global final on March 9th via YouTube livestream

But the numbers only capture part of it.

What made this event structurally different from any hackathon was the **simultaneous global format**. All seven cities kicked off within the same window, built against the same clock, and competed for the same global grand prize. Local winners advanced to a single global final on March 9th. The competition was layered — you were building against the room, and the room was building against the world.

*"The breakfast you just had was 'France'...and every meal will represent each hosting city."* **The cultural details!** For two days, we served French croissants for breakfast, Japanese sushi for dinner, and so on. The real-time awareness that builders in Tokyo were wrapping up while NYC was just hitting its stride at midnight created a sense of scale that I had never experienced at a hackathon before. There was something electric about knowing that at any given moment during the 36-hour sprint, someone on the other side of the planet was hacking on the same models, under the same rules, toward the same deadline.

NYC's venue was packed. Teams of one to four people, working through the night, building with Mistral's latest [Mistral 3 models](https://mistral.ai/news/mistral-3). The energy shifted across the 36 hours — from excited planning, to the quiet intensity of the overnight build, to the focused urgency of final demos.

## Why Mistral — The Technology Behind the Build

Spending two days embedded with Mistral and NVIDIA teams from developer relations and solution architecture gave me a perspective that most coverage of this company misses.

[Mistral's CEO Arthur Mensch has been explicit](https://www.bloomberg.com/news/articles/2026-02-18/mistral-ceo-says-ai-dominance-hinges-on-openness-not-geography) about their strategic bet: "The fight for AI supremacy is between open and closed systems, not geography." That philosophy shaped every aspect of this hackathon. Builders owned their stack from the first line of code — fully permissive, unrestricted commercial use. No API lock-in. No usage caps. 

The flagship, [Mistral Large 3](https://docs.mistral.ai/models/mistral-large-3-25-12), is a **Mixture-of-Experts** architecture:
- with 675 billion total parameters but only 41 billion active at inference, enabling frontier-level capability at a fraction of the compute cost
- handles a 256K token context window with native multimodal support across text and images
- achieves a 10x performance gain over the prior generation (on NVIDIA's GB200 NVL72)

But what made the hackathon technically interesting was the **small model** story. [Ministral 3](https://docs.mistral.ai/models/ministral-3-14b-25-12) — a family of nine dense models across 3B, 8B, and 14B parameterscan run on devices with as little as 4GB of VRAM using 4-bit quantization. Standard laptops. No cloud. **No internet required.** For a hackathon, this means teams could prototype locally, iterate fast, and deploy without infrastructure dependencies.

In conversations with the Mistral team, a consistent theme emerged. They were not positioning Mistral as a benchmark competitor to OpenAI or Google. They were positioning it as infrastructure for builders who want *sovereignty over their AI stack.* [Howard](https://www.linkedin.com/in/howard-cohen-879863133/) (Head of Communications) put it directly: "Open source — because we want to empower the builders, giving them the technology in their hands." Mensch himself frames this as a safer bet for any country building AI infrastructure locally — it accommodates cultural nuances, deploys on local hardware, and avoids dependence on centralized proprietary systems.

For the builders in the room, this was not theoretical. They were running models on their own machines, modifying architectures, and shipping demos that would have required API billing and vendor approval under a closed-model paradigm. That difference shaped the kinds of projects that got built.

## Judging and Mentoring

What I found most rewarding was the **dual role**. I was there to evaluate, but the extended format — two full days versus the typical single-day sprint — meant there was real time to mentor throughout the event.

The mentoring conversations followed a pattern. Teams would show me technically impressive demos, and I would push them on the problem space:

*"What user problem does this solve? Does this really add value in its current state?"*

*"Have you been considerate about safety? Are you responsible in deploying AI on values including privacy, safety, public good, inclusion?"*

These were not rhetorical questions. The teams that actively reflected on them — that paused, rethought their approach, and came back with sharper framing — were the ones that outperformed in the final evaluations. The ones that brushed past them and doubled down on technical sophistication alone did not make it to the top.

What stood out across submissions was the creative usage of Mistral's open-weight models. The two-day format enabled contrarian approaches — projects that required real architectural thinking, team coordination, and iterative refinement. These were builds that would not have existed from solo work or a shorter sprint. The extended window rewarded depth over speed, and the strongest teams used every hour of it.

## The People

A hackathon of this scale becomes a crossroads. The judging panel alone spanned 45+ people across all seven cities. In the NYC room, I connected with the Mistral team — Howard, Param, Devon, David — who were hands-on throughout the event. NVIDIA engineers Anu, Dhruv, and Rachel were on the floor, and I watched teams pull them into real-time conversations about accelerated computing for their solutions. The Tilde Research team — Gitika and Alec — brought a research lens that sharpened technical evaluations. Fellow judges and mentors Andy and Khrystyna brought perspectives that challenged my own.

And then there was the scene across the event hall itself. People hovering their hands in the air wearing VR headsets to create games for the Supercell track. Teams iteratively testing voice interactions using ElevenLabs technology. Builders huddled around monitors, demoing to each other before they ever showed a judge. The energy was not performative — it was genuine.

Iterate's volunteers — including Ishita and Cyprien, both Stanford students — kept the operations seamless. Having seen Iterate run the CBS hackathon two weeks earlier, I knew their operational rigor firsthand. At global scale, that reliability mattered even more.

## Three Takeaways

**Open-source matters — and not for the reason you might think.**

Mistral's bet on open-weight models is not primarily about beating closed-model benchmarks. It is about a fundamentally different relationship between builder and infrastructure. Under a closed-model paradigm, you rent capability through an API — the vendor controls pricing, availability, and what you can modify. Under Mistral's Apache 2.0 approach, you own the weights. You can fine-tune, deploy on-premise, run offline on edge devices, and audit the model's behavior. For enterprises navigating GDPR compliance, for governments building sovereign AI capacity, for startups that cannot afford vendor lock-in — this is not a philosophical preference. It is a strategic necessity. Mistral, now valued at $13.8B with annualized revenue north of $400M, is proving that open-weight is not just idealistic — it is commercially viable at scale.

**Community is global, but building is local.**

Seven cities, one competition, one set of models — but the magic happened in each room. Most "global" hackathons are online events with a global participant list. This one put builders in the same physical space in seven cities simultaneously and made them compete across borders. The format proved something: global ambition and local intensity are not in tension. NYC's builder density is unique — the spontaneous collaborations, the in-person debugging sessions, the energy of a packed room at 2 AM. These cannot be replicated over Zoom. The global framing gives the event its ambition. The local rooms give it its soul. And the layered competition — win your city, then face the world — created stakes that a single-site hackathon simply cannot match.

**The best AI work is cross-disciplinary.**

The winning projects were not the most technically complex. They were the most thoughtful about real problems and responsible deployment. Teams that combined strong engineering with clear problem framing and genuine consideration for safety and public good were the ones that stood out to every judge — not just me. This pattern has been consistent across every hackathon I have organized or judged.

## What This Signals

Two things stayed with me after the event.

First, the open-source AI community does not just live on GitHub, disconnected in silos. This hackathon brought it to life — real people, in the same room, building together across seven time zones. The simultaneous global format created something that neither a single-city event nor an online hackathon can replicate: the feeling of being part of a worldwide movement with local roots. Paris, Tokyo, NYC — different rooms, different cultures, same mission. The potential for sustained, cross-border collaboration in the AI ecosystem is real, and events like this prove it.

Second, my own trajectory over the past month tells a story about what is possible when you show up and do the work. From organizing club-level events, to city-scale hackathons, to judging a global competition backed by some of the most significant companies in AI. The connective thread was not credentials or luck — it was Iterate, and the trust built through consistent execution.

The global finals are on March 9th. NYC's local winners advance. I will be watching to see if the teams I mentored carry the momentum forward.

---

*Mistral AI Worldwide Hackathon 2026 — New York Edition. Organized by Mistral AI, operated by Iterate. Backed by NVIDIA, AWS, Weights & Biases, Hugging Face, ElevenLabs, Jump Trading, Supercell, and more.*
