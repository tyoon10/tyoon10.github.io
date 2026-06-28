---
title: "Connecting Local to Global: Inside Mistral AI's Worldwide Hackathon"
date: 2026-03-03
description: "7,000+ applications, 1,000+ builders, 7 cities, $200K+ in prizes: inside Mistral AI's first worldwide hackathon, from the judge's seat at the New York edition."
featured: false
coverImage: "./featured.jpg"
tags:
  - "Hackathon"
  - "Open Source"
  - "Community Building"
  - "NYC Tech"
links:
  - name: "LinkedIn Post"
    url: "https://www.linkedin.com/posts/taewan-yoon_mistralai-global-hackathon-activity-7435021705292558338-n9fY"
    icon: "linkedin"
  - name: "Event Page"
    url: "https://hackiterate.com/mistral-worldwide-hackathons"
    icon: "globe"
---


At 9 AM on February 28th, Verci Flatiron in Manhattan was already buzzing. Laptops open, monitors set up, breakfast croissants on the tables, a nod to the Parisian company behind it all. Across the room, hundreds of builders were settling in for what would become a 36-hour overnight sprint. Across the world, six other cities were doing the same thing.

![Banners Sponsors](./albums/mistral-2026-arrival/1-banners-sponsors.jpeg)

This was **Mistral AI's first-ever Worldwide Hackathon** (their largest hackathon to date) running simultaneously across **Paris, London, New York, San Francisco, Tokyo, Singapore, and Sydney**. Over 7,000 people applied. 1,000 were selected. And I was there as a judge.

![Hundreds of builders packed into the NYC venue](./albums/mistral-2026-arrival/3-venue-packed-crowd.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Hundreds of builders packed into the NYC venue for the opening kickoff.</p>

## The Event at Scale

The numbers alone tell a story:
- Seven cities
- 7,000+ applications from a highly competitive global pool 
- $200K+ in total prizes 
- A grand prize of $10,000 cash plus $15,000 in Mistral credits plus a hiring opportunity at Mistral AI, with local winners advancing to a global final on March 9th via YouTube livestream

But the numbers only capture part of it.

What made this event structurally different from any hackathon was the **simultaneous global format**. All seven cities kicked off within the same window, built against the same clock, and competed for the same global grand prize. Local winners advanced to a single global final on March 9th. The competition was layered: you were building against the room, and the room was building against the world.

*"The breakfast you just had was 'France'...and every meal will represent each hosting city."* **The cultural details!** For two days, we served French croissants for breakfast, Japanese sushi for dinner, and so on. The real-time awareness that builders in Tokyo were wrapping up while NYC was just hitting its stride at midnight created a sense of scale that I had never experienced at a hackathon before. There was something electric about knowing that at any given moment during the 36-hour sprint, someone on the other side of the planet was hacking on the same models, under the same rules, toward the same deadline.

![Day 1 breakfast: French croissants](./albums/mistral-2026-arrival/meal/2-french-breakfast.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Day 1 breakfast: French croissants, pastries, and fruit; 'France' was the first meal.</p>

![Day 1 dinner: Japanese sushi platters](./albums/mistral-2026-global/meal/7-tokyo-sushi-dinner.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Day 1 dinner: Japanese sushi platters at the Tokyo venue; every meal represented a host city.</p>

NYC's venue was packed. Teams of one to four people, working through the night, building with Mistral's latest [Mistral 3 models](https://mistral.ai/news/mistral-3). The energy shifted across the 36 hours: from excited planning, to the quiet intensity of the overnight build, to the focused urgency of final demos.

<div class="image-gallery-grid">

![Mistral Worldwide Hackathon global promo](./albums/mistral-2026-global/1-official-promo-seven-cities.jpeg)
![Paris venue crowd waving](./albums/mistral-2026-global/2-paris-group-waving.jpeg)
![Paris courtyard group photo](./albums/mistral-2026-global/3-paris-courtyard-wide.jpeg)
![San Francisco group photo](./albums/mistral-2026-global/4-sf-group-photo.jpeg)
![Sydney group photo](./albums/mistral-2026-global/5-sydney-group-photo.jpeg)
![Singapore presentation venue](./albums/mistral-2026-global/6-singapore-presentation.jpeg)

</div>

## Why Mistral: The Technology Behind the Build

Spending two days embedded with Mistral and NVIDIA teams from developer relations and solution architecture gave me a perspective that most coverage of this company misses.

![The official Mistral Worldwide Hackathon t-shirt](./albums/mistral-2026-arrival/4-hackathon-tshirt-tour.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">The official Mistral Worldwide Hackathon t-shirt, concert-tour style, listing all seven host cities.</p>

[Mistral's CEO Arthur Mensch has been explicit](https://www.bloomberg.com/news/articles/2026-02-18/mistral-ceo-says-ai-dominance-hinges-on-openness-not-geography) about their strategic bet: "The fight for AI supremacy is between open and closed systems, not geography." That philosophy shaped every aspect of this hackathon. Builders owned their stack from the first line of code: fully permissive, unrestricted commercial use. No API lock-in. No usage caps.

The flagship, [Mistral Large 3](https://docs.mistral.ai/models/mistral-large-3-25-12), is a **Mixture-of-Experts** architecture:
- with 675 billion total parameters but only 41 billion active at inference, enabling frontier-level capability at a fraction of the compute cost
- handles a 256K token context window with native multimodal support across text and images
- achieves a 10x performance gain over the prior generation (on NVIDIA's GB200 NVL72)

But what made the hackathon technically interesting was the **small model** story. [Ministral 3](https://docs.mistral.ai/models/ministral-3-14b-25-12), a family of nine dense models across 3B, 8B, and 14B parameters, can run on devices with as little as 4GB of VRAM using 4-bit quantization. Standard laptops. No cloud. **No internet required.** For a hackathon, this means teams could prototype locally, iterate fast, and deploy without infrastructure dependencies.

In conversations with the Mistral team, a consistent theme emerged. They were not positioning Mistral as a benchmark competitor to OpenAI or Google. They were positioning it as infrastructure for builders who want *sovereignty over their AI stack.* [Howard](https://www.linkedin.com/in/howard-cohen-879863133/) (Head of Communications) put it directly: "We are open source, because we want to empower the builders, giving you the technology IN YOUR HANDS." Mensch himself frames this as a safer bet for any country building AI infrastructure locally. It accommodates cultural nuances, deploys on local hardware, and avoids dependence on centralized systems.

For the builders in the room, this was not theoretical. They were running models on their own machines, modifying architectures, and shipping demos that would have required API billing and vendor approval under a closed-model paradigm. That difference shaped the kinds of projects that got built:

![Brickstral: an AI-powered LEGO builder](./albums/mistral-2026-building/projects/12-project-brickstral.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Brickstral: an AI-powered LEGO builder that generates 3D models from text prompts using Mistral Large.</p>

![Dispatch Ops: an AI emergency dispatch system](./albums/mistral-2026-building/projects/13-project-dispatch-ops.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Dispatch Ops: an AI emergency dispatch system combining real-time map data with Mistral-powered triage.</p>

![LACUNA: a cross-lingual divergence explorer](./albums/mistral-2026-building/projects/14-project-lacuna.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">LACUNA: a cross-lingual divergence explorer visualizing semantic topology across languages in 3D.</p>

<div class="image-gallery-grid">

![Builder in Mistral t-shirt](./albums/mistral-2026-building/01-builder-mistral-tee.jpg)
![Team collaboration under sunlit venue](./albums/mistral-2026-building/02-team-collaboration-sunlit.jpg)
![Team huddling around laptop](./albums/mistral-2026-building/03-team-huddle-laptop.jpg)
![Focused coding session](./albums/mistral-2026-building/04-builder-focused-coding.jpg)
![Technical staff supporting builders](./albums/mistral-2026-building/05-technical-staff-orange.jpg)
![Iterate volunteers huddle](./albums/mistral-2026-building/06-iterate-volunteers-huddle.jpg)
![Overnight lounge building space](./albums/mistral-2026-building/07-overnight-lounge.jpg)
![Solo builder working from armchair](./albums/mistral-2026-building/08-solo-builder-armchair.jpg)
![Overnight coding session](./albums/mistral-2026-building/09-overnight-volunteers-coding.jpg)
![Wide view of overnight hackathon hall](./albums/mistral-2026-building/10-overnight-venue-wide.jpg)
![Builder standing at laptop](./albums/mistral-2026-building/11-builder-standing-laptop.jpg)

</div>

## Judging and Mentoring

What I found most rewarding was the **dual role**. I was there to evaluate, but the extended format allowed me to engage teams across multiple build stages.

![Five minutes on the clock](./albums/mistral-2026-judging/judging/1-judging-session-timer.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Five minutes on the clock; a team presents their demo to the judging panel.</p>

The mentoring conversations followed a pattern: teams come up and show me technically impressive demos, and I would push them on the problem space:

*"What user problem does this solve? Does this add value to **how users currently get the job done?**"*

*"How do you ensure safety? Have you been considerate about values including privacy, public good, and/or inclusion?"*

These were not rhetorical questions. The teams that actively reflected on them (that paused, rethought their approach, and came back with sharper framing) were the ones that outperformed. There were solutions that doubled down on technical sophistication alone (and I was blown away), but none of them make it to the top.

![A mentoring session in progress](./albums/mistral-2026-judging/5-mentoring-circle.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">A mentoring session in progress; judges and builders huddled together reviewing a project.</p>

<div class="image-gallery-grid">

![Demo review session](./albums/mistral-2026-judging/2-demo-review-standing.jpg)
![Team presenting demo on screen](./albums/mistral-2026-judging/3-team-presenting-screen.jpg)
![Builder demoing to judges](./albums/mistral-2026-judging/4-demo-to-judges.jpg)
![Judges and builders in mentoring circle](./albums/mistral-2026-judging/5-mentoring-circle.jpg)
![One-on-one demo review](./albums/mistral-2026-judging/6-one-on-one-review.jpg)
![Supercell VR demo at Paris venue](./albums/mistral-2026-judging/7-paris-vr-demo-supercell.jpeg)

</div>

## The People

A hackathon of this scale becomes a crossroads. The judging panel alone spanned across all seven cities. In the NYC room, I enjoyed the extended conversations with Mistral's solution engineers, listening to NVIDIA's technical marketing teams as they navigated the participants' proposal using [NVFP4 on NVIDIA Blackwell platform](https://developer.nvidia.com/blog/3-ways-nvfp4-accelerates-ai-training-and-inference/). We also had ML Researcher from [Tilde Research](https://tilderesearch.com/), a frontier research lab that allowed us to look under the hood of the Ministral models with the mechanistic interpretability that ensured they were safe and reliable.

![The NVIDIA team on-site at the NYC venue](./albums/mistral-2026-people/03-nvidia-team.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">The NVIDIA team on-site at the NYC venue, supporting builders with accelerated computing expertise.</p>

And then there was the scene across the event hall itself. People hovering their hands in the air wearing VR headsets to create games for the [Supercell](https://supercell.com/) track. Teams iteratively testing voice interactions using [ElevenLabs](https://elevenlabs.io/) technology. I occasionally lifted my eyes from the screen to the steady hum of spinning fans and the electric pulse of racing minds. In the entire space filled with cognitive energy, neurons sparked and ideas collided as collective effort met the raw power of accelerated silicon.

![Paris venue: a builder demos a VR game](./albums/mistral-2026-judging/7-paris-vr-demo-supercell.jpeg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">Paris venue: a builder demos a VR game on Meta Horizon for the Supercell track while the crowd watches.</p>

<div class="image-gallery-grid">

![Judges and sponsors standing in front of banners](./albums/mistral-2026-people/02-judges-sponsors-banners.jpg)
![NVIDIA developer relations team on-site](./albums/mistral-2026-people/03-nvidia-team.jpg)
![Builders working at table](./albums/mistral-2026-people/04-builders-at-table.jpg)
![Builders sharing a laugh](./albums/mistral-2026-people/05-builders-laughing.jpg)
![Relaxed moment on couch](./albums/mistral-2026-people/06-relaxed-moment-couch.jpg)
![Two women smiling at venue](./albums/mistral-2026-people/07-two-women-smiling.jpg)
![Volunteers reviewing submissions](./albums/mistral-2026-people/08-volunteers-reviewing.jpg)
![Group huddle near stage](./albums/mistral-2026-people/09-group-huddle-stage.jpg)
![Judges and organizers on stage](./albums/mistral-2026-people/10-judges-organizers-stage.jpg)
![Judges and organizers group photo](./albums/mistral-2026-people/11-judges-organizers-stage-2.jpg)
![Winners group photo](./albums/mistral-2026-people/12-winners-group-photo.jpg)
![Winners and judges group photo](./albums/mistral-2026-people/13-winners-group-photo-2.jpg)
![Group selfie at closing ceremony](./albums/mistral-2026-people/14-group-selfie-closing.jpg)
![Aerial view of Paris venue courtyard](./albums/mistral-2026-people/15-paris-courtyard-aerial.jpeg)

</div>

## Three Takeaways

**Open-source matters, and not for the reason you might think.**

Mistral's bet on open-weight models is not primarily about beating benchmarks. It is about a **fundamentally different relationship between builder and infrastructure**. Under a closed-model paradigm, you rent capability through an API: the vendor controls pricing, availability, and what you can modify. Under Mistral's approach, you own the weights. You can fine-tune, deploy on-premise, run offline on edge devices, and audit the model's behavior. For enterprises navigating [GDPR compliance](https://gdpr.eu/), for governments building sovereign AI capacity, for startups that cannot afford vendor lock-in. For them, it is a strategic necessity. **Mistral is proving that it is commercially viable at scale.**

**Community is global, but building is local.**

Seven cities, one competition, one set of models. While most "global" hackathons are online events, this one put builders in the same physical space in seven cities simultaneously and made them compete across borders. **NYC's builder density is unique**: the spontaneous collaborations, the in-person debugging sessions, the energy of a packed room. These cannot be replicated over Zoom. The global framing gives the event its ambition. The local rooms give it its **soul**. And the layered competition (*win your city, then face the world*) created stakes that a single-site hackathon simply cannot match.

**The best AI work is cross-disciplinary.**

As I noted in my judging experience, the winning projects were not the most technically complex. They were the most thoughtful about **real problems** and **responsible deployment**. Teams that combined strong engineering with clear problem framing and genuine consideration for safety and public good were the ones that stood out. This pattern has been consistent across every hackathon I have been involved.

## What This Signals

Two things stayed with me after the event.

First, the open-source AI community does not just live on GitHub, disconnected in silos. This hackathon brought it to life: real people, in the same room, building together across seven time zones. The simultaneous global format created something that neither a single-city event nor an online hackathon can replicate: the feeling of being part of a worldwide movement with local roots. The potential for sustained, cross-border collaboration in the AI ecosystem is real, and events like this prove it.

Second, my own trajectory over the past month tells a story about what is possible when you show up and do the work. From organizing club-level events, to [city-scale hackathons](https://twyoon.com/post/iterate-columbia-hackathon-2026-recap/), to judging a global competition backed by some of the most significant companies in AI. The connective thread was not credentials or luck; it was [Iterate](https://hackiterate.com/), and the trust built through consistent execution.

![NYC local winners and judges on stage](./albums/mistral-2026-people/12-winners-group-photo.jpg)
<p style="text-align: center; font-size: 0.82rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 24px;">NYC local winners and judges on stage after 36 hours of building.</p>

The global finals are on March 9th. NYC's local winners advance. I will be watching to see if the teams I mentored carry the momentum forward.

---

*Mistral AI Worldwide Hackathon 2026, New York Edition. Organized by Mistral AI, operated by Iterate. Backed by NVIDIA, AWS, Weights & Biases, Hugging Face, ElevenLabs, Jump Trading, Supercell, Tilde Research, White Circle, Giant Ventures, and RAISE.*
