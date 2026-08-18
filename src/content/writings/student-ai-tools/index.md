---
title: "AI Tools Worth Setting Up Today (with Student Benefit)"
date: 2026-08-18
description: "The AI tools I actually use, plus a curated secondary list. Every offer verified against the vendor's own pages on 2026-08-18."
featured: false
unlisted: true
coverImage: "./featured.png"
tags:
  - "AI Tools"
  - "Students"
  - "MBA"
  - "Productivity"
---

Summer is the best time of year to build, learn and try new tools. It is also the moment to lock in every student-only AI offer you can, especially if you are graduating.

> **If you are a graduating student, move fast.** Most of these offers verify against your .edu email or active student status. The day you lose either, you lose the offer.

There is a bigger pattern here. AI tools open free or deeply discounted student plans early to drive adoption, then quietly close the door once they have enough traction. This is not hypothetical. Since I started tracking these, two of the offers on this very list have gone:

- **Google Gemini** closed **2026-03-11**. The free year of Google AI Pro for students ended on 2026-03-11. The student page now reads "Our previous student offer ended on March 11, 2026 and is no longer available in your region."
- **Cursor** closed **2026-06-25**. Cursor discontinued new sign-ups for the legacy student discount on 2026-06-25. It was a full year of Pro free and it was the strongest offer on this list, so its removal is the single biggest change since the last refresh.

So claim the live ones today, while they are still live.

> **Last refreshed:** 2026-08-18. Every entry below was checked against the vendor's own help-centre or pricing page, not a coupon site. The full research notes, including the tools I ruled out and why, live at [github.com/tyoon10/student-ai-tools](https://github.com/tyoon10/student-ai-tools).

> **Disclosure.** One link on this page is a referral link, labelled where it appears with what you get and what I get. Every other link goes straight to the vendor and earns me nothing.

---

## Every offer at a glance

Filter by category, search by name, or narrow to the free ones. Each card links to the full entry with terms and sources.

<style>
/* The grid lives inside .markdown-body, whose prose rules would otherwise win.
   Two conflicts matter:
     .markdown-body img  (0,1,1) forces width/height:auto, display:block and
       margin:32px auto, which blows every logo up to its intrinsic size and
       shoves the card layout apart. Beaten here with .offergrid img.offercard__logo.
     .markdown-body a    (0,1,1) underlines every link.
   So each rule below is scoped under .offergrid to outrank prose styling. */
/* The site never loads global.css, where the `* { box-sizing: border-box }`
   reset lives, so everything computes as content-box. Without this, a card's
   16px padding and 1px border are ADDED to height:100%, making every <a> 34px
   taller than its grid row and overlapping the row below. Scoped rather than
   global: fixing it site-wide is the site owner's call, since global.css also
   resets all margins and padding. */
.offergrid,.offergrid *{box-sizing:border-box}
.offergrid{
  /* Break out of the 62ch prose column so cards get three across on desktop,
     without escaping the page gutter on narrow screens. */
  --breakout:clamp(0px,(100vw - 48px - var(--prose-width))/2,180px);
  --gap:14px;
  margin:32px calc(-1 * var(--breakout)) 40px;
  font-family:var(--sans);letter-spacing:0}
.offergrid .offergrid__controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;
  padding:14px;border:1px solid var(--rule);border-radius:var(--r-action);
  background:var(--sunk);margin:0 0 var(--gap)}
.offergrid .offergrid__search{flex:1 1 210px;min-width:0;font:inherit;font-size:14px;
  padding:9px 12px;border:1px solid var(--rule);border-radius:var(--r-action);
  background:var(--canvas);color:var(--ink)}
.offergrid .offergrid__search:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.offergrid .offergrid__chips{display:flex;flex-wrap:wrap;gap:6px}
.offergrid .offergrid__chip{font:inherit;font-size:12px;line-height:1;padding:8px 12px;
  cursor:pointer;border:1px solid var(--rule);border-radius:var(--r-pill);
  background:var(--canvas);color:var(--ink-muted)}
.offergrid .offergrid__chip:hover{border-color:var(--accent);color:var(--accent)}
.offergrid .offergrid__chip[aria-pressed="true"]{background:var(--accent);
  border-color:var(--accent);color:#fff}
.offergrid .offergrid__toggle{display:inline-flex;align-items:center;gap:6px;font-size:12px;
  color:var(--ink-muted);cursor:pointer;white-space:nowrap}
.offergrid .offergrid__count{width:100%;margin:0;font-size:12px;color:var(--ink-quiet)}
.offergrid .offergrid__list{list-style:none;margin:0;padding:0;display:grid;gap:var(--gap);
  grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.offergrid .offercard{margin:0;padding:0;display:flex}
.offergrid .offercard::marker{content:""}
.offergrid .offercard a{display:flex;flex-direction:column;align-items:flex-start;gap:8px;
  flex:1 1 auto;min-width:0;padding:16px;text-decoration:none;color:inherit;background:var(--surface);
  border:1px solid var(--rule);border-radius:var(--r-action)}
.offergrid .offercard a:hover{border-color:var(--accent);background:var(--accent-wash)}
.offergrid .offercard a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.offergrid .offercard__top{display:flex;align-items:center;gap:10px;width:100%}
.offergrid .offercard__badges{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
/* Specificity 0,2,1 so it beats .markdown-body img (0,1,1). */
.offergrid img.offercard__logo{width:32px;height:32px;min-width:32px;max-width:32px;
  max-height:32px;margin:0;display:block;object-fit:contain;border-radius:4px;flex:none}
.offergrid .offercard__mono{width:32px;height:32px;flex:none;border-radius:4px;display:grid;
  place-items:center;background:var(--accent);color:#fff;font-weight:600;font-size:14px}
.offergrid .offercard__name{font-weight:600;font-size:14px;line-height:1.25;
  font-family:var(--sans)}
.offergrid .offercard__offer{font-size:11px;font-weight:600;letter-spacing:.02em;
  padding:4px 9px;border-radius:var(--r-pill);background:var(--accent-wash);color:var(--accent)}
.offergrid .offercard--free .offercard__offer{background:var(--accent);color:#fff}
/* Secondary badge, deliberately outlined rather than filled so it reads as an
   extra rather than as the headline offer. Not a link: the card is already one
   <a>, and nesting anchors is invalid. The actual link and its disclosure live
   in the entry the card points at. */
.offergrid .offercard__bonus{font-size:11px;font-weight:600;letter-spacing:.02em;
  padding:3px 8px;border-radius:var(--r-pill);background:transparent;
  color:var(--accent);border:1px dashed var(--accent)}
.offergrid .offercard__desc{font-size:13px;line-height:1.45;color:var(--ink-muted);margin:0}
.offergrid .offercard__cat{margin-top:auto;padding-top:4px;font-size:11px;color:var(--ink-quiet)}
.offergrid .offergrid__empty{display:none;padding:20px;text-align:center;
  color:var(--ink-muted);border:1px dashed var(--rule);border-radius:var(--r-action);
  font-size:14px;margin:0}
.offergrid--empty .offergrid__empty{display:block}
.offergrid--empty .offergrid__list{display:none}
@media (max-width:560px){
  .offergrid{margin-left:0;margin-right:0}
  .offergrid .offergrid__list{grid-template-columns:1fr}
}
</style>
<noscript><style>
/* Without JS the controls cannot work, so hide them rather than showing dead
   inputs. The full grid stays visible and every card is a plain link. */
.offergrid .offergrid__controls{display:none}
</style></noscript>
<div class="offergrid" data-offergrid>
  <div class="offergrid__controls">
    <input id="offer-search" class="offergrid__search" type="search" data-search placeholder="Search tools, offers, categories..." aria-label="Search offers">
    <div class="offergrid__chips" role="group" aria-label="Filter by category">
      <button type="button" class="offergrid__chip" data-filter="all" aria-pressed="true">All</button>
      <button type="button" class="offergrid__chip" data-filter="coding" aria-pressed="false">Coding and dev</button>
      <button type="button" class="offergrid__chip" data-filter="writing" aria-pressed="false">Writing and research</button>
      <button type="button" class="offergrid__chip" data-filter="notes" aria-pressed="false">Notes and meetings</button>
      <button type="button" class="offergrid__chip" data-filter="design" aria-pressed="false">Design and media</button>
      <button type="button" class="offergrid__chip" data-filter="productivity" aria-pressed="false">Productivity</button>
    </div>
    <label class="offergrid__toggle"><input type="checkbox" data-free> Free only</label>
    <p class="offergrid__count" data-count aria-live="polite"></p>
  </div>
  <ul class="offergrid__list">
    <li class="offercard offercard--free" data-group="notes" data-free="true" data-search="notion free the single best note and knowledge tool for grad school. notes and knowledge ">
      <a href="#1-notion-free">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/notion.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Notion</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free</span></span>
        <span class="offercard__desc">The single best note and knowledge tool for grad school.</span>
        <span class="offercard__cat">Notes and knowledge</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="design" data-free="true" data-search="figma free for 1 year full professional plan for verified higher-ed students. design ">
      <a href="#2-figma-free-for-1-year">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/figma.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Figma</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free for 1 year</span></span>
        <span class="offercard__desc">Full Professional plan for verified higher-ed students.</span>
        <span class="offercard__cat">Design</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="notes" data-free="true" data-search="granola free for 12 months ai notepad for meetings and lectures. meeting notes ">
      <a href="#3-granola-free-for-12-months">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/granola.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Granola</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free for 12 months</span></span>
        <span class="offercard__desc">AI notepad for meetings and lectures.</span>
        <span class="offercard__cat">Meeting notes</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="coding" data-free="true" data-search="github student developer pack free the gold-standard student bundle. developer tools ">
      <a href="#4-github-student-developer-pack-free">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/github.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">GitHub Student Developer Pack</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free</span></span>
        <span class="offercard__desc">The gold-standard student bundle.</span>
        <span class="offercard__cat">Developer tools</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="coding" data-free="true" data-search="zed free for 1 year ai-native editor, and the most credible remaining free route to a premium ai ide now that cursor's student discount has... ai code editor ">
      <a href="#5-zed-free-for-1-year">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/zed.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Zed</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free for 1 year</span></span>
        <span class="offercard__desc">AI-native editor, and the most credible remaining free route to a premium AI IDE now that Cursor's student discount has...</span>
        <span class="offercard__cat">AI code editor</span>
      </a>
    </li>
    <li class="offercard" data-group="writing" data-free="false" data-search="perplexity $10/month, 50% off the best ai search tool for academic work. ai search ">
      <a href="#perplexity-10month-50-off">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/perplexity.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Perplexity</span></span>
        <span class="offercard__badges"><span class="offercard__offer">$10/month, 50% off</span></span>
        <span class="offercard__desc">The best AI search tool for academic work.</span>
        <span class="offercard__cat">AI search</span>
      </a>
    </li>
    <li class="offercard" data-group="design" data-free="false" data-search="adobe creative cloud ~71% off first year the full app suite plus firefly generative ai in photoshop, illustrator and premiere. design and creative ">
      <a href="#adobe-creative-cloud-71-off-first-year">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/adobe.ico" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Adobe Creative Cloud</span></span>
        <span class="offercard__badges"><span class="offercard__offer">~71% off first year</span></span>
        <span class="offercard__desc">The full app suite plus Firefly generative AI in Photoshop, Illustrator and Premiere.</span>
        <span class="offercard__cat">Design and creative</span>
      </a>
    </li>
    <li class="offercard" data-group="coding" data-free="false" data-search="openai codex $100 in codex credits 100 usd of chatgpt credits earmarked for codex. ai coding ">
      <a href="#openai-codex-100-in-codex-credits">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/openai-codex.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">OpenAI Codex</span></span>
        <span class="offercard__badges"><span class="offercard__offer">$100 in Codex credits</span></span>
        <span class="offercard__desc">100 USD of ChatGPT credits earmarked for Codex.</span>
        <span class="offercard__cat">AI coding</span>
      </a>
    </li>
    <li class="offercard" data-group="productivity" data-free="false" data-search="microsoft 365 personal $4.99/month, 50% off half price on the full office suite with copilot built into word, excel, powerpoint, onenote and outlook, plus 1 tb of... productivity suite ">
      <a href="#microsoft-365-personal-499month-50-off">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/microsoft-365.ico" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Microsoft 365 Personal</span></span>
        <span class="offercard__badges"><span class="offercard__offer">$4.99/month, 50% off</span></span>
        <span class="offercard__desc">Half price on the full Office suite with Copilot built into Word, Excel, PowerPoint, OneNote and Outlook, plus 1 TB of...</span>
        <span class="offercard__cat">Productivity suite</span>
      </a>
    </li>
    <li class="offercard" data-group="writing" data-free="false" data-search="grammarly 50% off, seasonal writing assistant. writing ">
      <a href="#grammarly-50-off-seasonal">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/grammarly.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Grammarly</span></span>
        <span class="offercard__badges"><span class="offercard__offer">50% off, seasonal</span></span>
        <span class="offercard__desc">Writing assistant.</span>
        <span class="offercard__cat">Writing</span>
      </a>
    </li>
    <li class="offercard" data-group="writing" data-free="false" data-search="otter.ai 20% off pro transcription for lectures, interviews and group meetings. transcription +1 month pro lite free (referral)">
      <a href="#otterai-20-off-pro">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/otter.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Otter.ai</span></span>
        <span class="offercard__badges"><span class="offercard__offer">20% off Pro</span><span class="offercard__bonus">+1 month Pro Lite free (referral)</span></span>
        <span class="offercard__desc">Transcription for lectures, interviews and group meetings.</span>
        <span class="offercard__cat">Transcription</span>
      </a>
    </li>
    <li class="offercard" data-group="writing" data-free="false" data-search="quillbot up to 25% off paraphrasing and grammar tool with heavy student usage. writing ">
      <a href="#quillbot-up-to-25-off">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/quillbot.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">QuillBot</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Up to 25% off</span></span>
        <span class="offercard__desc">Paraphrasing and grammar tool with heavy student usage.</span>
        <span class="offercard__cat">Writing</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="design" data-free="true" data-search="beautiful.ai free pro for 12 months ai slide-deck builder that does the layout work for you. presentations ">
      <a href="#beautifulai-free-pro-for-12-months">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/beautiful-ai.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Beautiful.ai</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free Pro for 12 months</span></span>
        <span class="offercard__desc">AI slide-deck builder that does the layout work for you.</span>
        <span class="offercard__cat">Presentations</span>
      </a>
    </li>
    <li class="offercard" data-group="notes" data-free="false" data-search="obsidian 40% off sync and publish the app itself is free and always has been. notes and knowledge ">
      <a href="#obsidian-40-off-sync-and-publish">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/obsidian.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Obsidian</span></span>
        <span class="offercard__badges"><span class="offercard__offer">40% off Sync and Publish</span></span>
        <span class="offercard__desc">The app itself is free and always has been.</span>
        <span class="offercard__cat">Notes and knowledge</span>
      </a>
    </li>
    <li class="offercard" data-group="design" data-free="false" data-search="loom up to 50% off, 75% for classroom use screen recording with ai summaries and transcripts. async video ">
      <a href="#loom-up-to-50-off-75-for-classroom-use">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/loom.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Loom</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Up to 50% off, 75% for classroom use</span></span>
        <span class="offercard__desc">Screen recording with AI summaries and transcripts.</span>
        <span class="offercard__cat">Async video</span>
      </a>
    </li>
    <li class="offercard" data-group="coding" data-free="false" data-search="amp 50% off, $10/month sourcegraph's coding agent, half price for students and teachers with no document check. ai coding agent ">
      <a href="#amp-50-off-10month">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/amp.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Amp</span></span>
        <span class="offercard__badges"><span class="offercard__offer">50% off, $10/month</span></span>
        <span class="offercard__desc">Sourcegraph's coding agent, half price for students and teachers with no document check.</span>
        <span class="offercard__cat">AI coding agent</span>
      </a>
    </li>
    <li class="offercard" data-group="writing" data-free="false" data-search="consensus 40% off premium citation-grounded academic search. academic search ">
      <a href="#the-rest">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/consensus.svg" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Consensus</span></span>
        <span class="offercard__badges"><span class="offercard__offer">40% off Premium</span></span>
        <span class="offercard__desc">Citation-grounded academic search.</span>
        <span class="offercard__cat">Academic search</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="design" data-free="true" data-search="framer free basic plan, worth $120/year design-to-web tool with a free student plan that includes monthly ai credits. design and web ">
      <a href="#the-rest">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/framer.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Framer</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free Basic plan, worth $120/year</span></span>
        <span class="offercard__desc">Design-to-web tool with a free student plan that includes monthly AI credits.</span>
        <span class="offercard__cat">Design and web</span>
      </a>
    </li>
    <li class="offercard" data-group="notes" data-free="false" data-search="reclaim.ai 50% off for 12 months ai calendar that defends time for tasks and habits against meeting creep. scheduling ">
      <a href="#the-rest">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/reclaim.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Reclaim.ai</span></span>
        <span class="offercard__badges"><span class="offercard__offer">50% off for 12 months</span></span>
        <span class="offercard__desc">AI calendar that defends time for tasks and habits against meeting creep.</span>
        <span class="offercard__cat">Scheduling</span>
      </a>
    </li>
    <li class="offercard" data-group="writing" data-free="false" data-search="speechify 25% off premium text to speech for getting through case studies and papers while doing something else. text to speech ">
      <a href="#the-rest">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/speechify.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Speechify</span></span>
        <span class="offercard__badges"><span class="offercard__offer">25% off Premium</span></span>
        <span class="offercard__desc">Text to speech for getting through case studies and papers while doing something else.</span>
        <span class="offercard__cat">Text to speech</span>
      </a>
    </li>
    <li class="offercard" data-group="coding" data-free="false" data-search="microsoft azure for students $100 credit, no card needed 100 usd of azure credit to use within 12 months, with no credit card required. cloud and infrastructure ">
      <a href="#cloud-credits">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/azure.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Microsoft Azure for Students</span></span>
        <span class="offercard__badges"><span class="offercard__offer">$100 credit, no card needed</span></span>
        <span class="offercard__desc">100 USD of Azure credit to use within 12 months, with no credit card required.</span>
        <span class="offercard__cat">Cloud and infrastructure</span>
      </a>
    </li>
    <li class="offercard" data-group="coding" data-free="false" data-search="google cloud for students 200 google skills credits 200 google skills credits for hands-on labs, skill badges and courses on google cloud skills boost. cloud and infrastructure ">
      <a href="#cloud-credits">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/google-cloud.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">Google Cloud for Students</span></span>
        <span class="offercard__badges"><span class="offercard__offer">200 Google Skills credits</span></span>
        <span class="offercard__desc">200 Google Skills credits for hands-on labs, skill badges and courses on Google Cloud Skills Boost.</span>
        <span class="offercard__cat">Cloud and infrastructure</span>
      </a>
    </li>
    <li class="offercard offercard--free" data-group="coding" data-free="true" data-search="aws educate free self-paced labs free self-paced cloud training and hands-on labs covering s3, ec2, vpc, rds and cloud operations, with digital badges. cloud and infrastructure ">
      <a href="#cloud-credits">
        <span class="offercard__top"><img class="offercard__logo" src="/media/logos/aws-educate.png" alt="" width="32" height="32" loading="lazy" decoding="async"><span class="offercard__name">AWS Educate</span></span>
        <span class="offercard__badges"><span class="offercard__offer">Free self-paced labs</span></span>
        <span class="offercard__desc">Free self-paced cloud training and hands-on labs covering S3, EC2, VPC, RDS and cloud operations, with digital badges.</span>
        <span class="offercard__cat">Cloud and infrastructure</span>
      </a>
    </li>
  </ul>
  <p class="offergrid__empty">No offers match that. Clear the search or pick a different category.</p>
</div>
<script>
(function () {
  var root = document.querySelector('[data-offergrid]');
  if (!root) return;
  var cards = Array.prototype.slice.call(root.querySelectorAll('.offercard'));
  var search = root.querySelector('[data-search]');
  var chips = Array.prototype.slice.call(root.querySelectorAll('[data-filter]'));
  var freeOnly = root.querySelector('[data-free]');
  var count = root.querySelector('[data-count]');
  var group = 'all';
  function apply() {
    var q = (search.value || '').trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var okGroup = group === 'all' || card.dataset.group === group;
      var okFree = !freeOnly.checked || card.dataset.free === 'true';
      var okText = !q || card.dataset.search.indexOf(q) !== -1;
      var visible = okGroup && okFree && okText;
      card.hidden = !visible;
      if (visible) shown++;
    });
    root.classList.toggle('offergrid--empty', shown === 0);
    count.textContent = shown === cards.length
      ? 'Showing all ' + cards.length + ' offers'
      : 'Showing ' + shown + ' of ' + cards.length + ' offers';
  }
  search.addEventListener('input', apply);
  freeOnly.addEventListener('change', apply);
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      group = chip.dataset.filter;
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      apply();
    });
  });
  apply();
})();
</script>

**[Recently closed](#recently-closed):** Cursor, Google Gemini. Kept on the page so you know not to go looking.

---

## The five I actually use every day

Tried, used extensively, kept. These are the ones I would tell a classmate to set up first.

### 1. Notion: **Free**

The single best note and knowledge tool for grad school. Free Plus plan for a one-member workspace if you have an eligible school email. I run Notion as an operating system for my Product Management coursework and side projects.

| Field | Value |
|---|---|
| Original price | Plus is a paid tier for general users. |
| Student price | **Plus free for eligible students and educators, one-member workspace.** |
| Verification | School email only. The school must be an accredited institution listed in the World Higher Education Database. Notion does not accept student IDs or other documentation. |
| Length | Continues while eligibility and school email status remain valid. |
| Sign up | [notion.com](https://www.notion.com/help/notion-for-education) |

*Note: Notion AI is NOT usefully included. As of 2026-08-18 there is no standalone AI add-on to buy. Free and Plus get trial-level AI only, and full AI (Agent, Meeting Notes, Enterprise Search) requires the Business tier at 20 USD per member per month. Custom Agents are metered separately.*

*Note: Requires a single-member workspace.*

### 2. Figma: **Free for 1 year**

Full Professional plan for verified higher-ed students. Slide alternatives, mockups, quick visuals, case-comp decks. Still the default design tool for product designers and PMs.

| Field | Value |
|---|---|
| Original price | Figma Professional paid plan. |
| Student price | **Free Professional plan access for verified higher-ed students.** |
| Verification | School-issued email, then the education application page with "Higher Ed" selected as institution type. Figma verifies all applications through SheerID. |
| Length | One year, then reapply. |
| Sign up | [help.figma.com](https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education) |

*Note: Must reapply annually, it does not auto-renew as free.*

### 3. Granola: **Free for 12 months**

AI notepad for meetings and lectures. Listens in the background without a bot joining the call, then generates clean structured notes afterwards. I use it for internal team meetings.

| Field | Value |
|---|---|
| Original price | Granola Business is a paid tier. |
| Student price | **12 months of Granola Business free.** |
| Verification | Student application flow on the Granola student page. |
| Length | 12 months. |
| Eligibility | Currently enrolled students at accredited universities in the US, UK and Canada. |
| Sign up | [granola.ai](https://www.granola.ai/students) |

*Note: The page labels this a LIMITED EDITION promotion, so it may be withdrawn without notice.*

### 4. GitHub Student Developer Pack: **Free**

The gold-standard student bundle. Copilot, DigitalOcean credits, a Namecheap domain, JetBrains and roughly 30 other developer tools, all unlocked once you verify.

| Field | Value |
|---|---|
| Original price | Copilot paid plans. |
| Student price | **Free Copilot access for verified GitHub Education students, plus the pack.** |
| Verification | GitHub Education benefits application. |
| Length | Re-evaluated by GitHub while student status remains valid. |
| Sign up | [education.github.com](https://education.github.com/pack/) |

*Note: Add and verify your school-issued email under Settings then Emails before applying. This is the one-time blocker most students hit.*

*Note: The temporary pause on new student sign-ups that GitHub documented in early 2026 is no longer present in the docs as of 2026-08-18.*

*Note: Copilot access inside the Pack was restructured in March 2026 into a standalone plan called GitHub Copilot Student. It is still free for verified students. GitHub's changelog says the model lineup changed but does not itemise it, so treat any specific model list you read elsewhere as unverified.*

*Note: The Pack gains and loses partners quietly. Two AI-relevant additions worth knowing about are Camber (research compute) and SlideCoach (AI presentation coaching, 2,000 credits for verified students).*

### 5. Zed: **Free for 1 year**

AI-native editor, and the most credible remaining free route to a premium AI IDE now that Cursor's student discount has closed. Fast, lightweight, and the offer includes real model credits rather than a trial.

| Field | Value |
|---|---|
| Original price | Zed Pro paid plan. |
| Student price | **Zed Pro free for one year.** |
| Verification | Enrolled at an accredited university, at least 18 years old, a GitHub account older than 30 days, and a valid current university email. Enrolment is checked against JetBrains' open-source database of university domains. |
| Length | 12 months. |
| Eligibility | International students accepted. |
| Sign up | [zed.dev](https://zed.dev/education) |

---

## Worth knowing about

Strong offers that are not part of my daily stack.

### Perplexity: **$10/month, 50% off**

The best AI search tool for academic work. Citations, Learn Mode, full Pro model access. If your coursework is research-heavy this is probably the biggest single win on the list.

| Field | Value |
|---|---|
| Original price | Pro at 20 USD per month. |
| Student price | **Education Pro at 10 USD per month, a 50 percent discount.** |
| Verification | SheerID, student or faculty at a university-level institution. |
| Length | Recurring monthly while verified and subscribed. |
| Sign up | [perplexity.ai](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro) |

### Adobe Creative Cloud: **~71% off first year**

The full app suite plus Firefly generative AI in Photoshop, Illustrator and Premiere. The discount is steep in year one and much less so afterwards, so set a renewal reminder the day you sign up.

| Field | Value |
|---|---|
| Original price | 69.99 USD per month for Creative Cloud Pro at regular monthly pricing. |
| Student price | **About 19.99 USD per month for the first year on the annual plan billed monthly, rising to about 39.99 USD per month afterwards. Roughly 71 percent off in year one in the US market.** |
| Verification | Student verification in the Adobe checkout flow, school email or documents. |
| Length | Promotional pricing for the first year, then a materially higher renewal rate. |
| Eligibility | Pricing shown is the US market. Other markets differ. |
| Sign up | [adobe.com](https://www.adobe.com/creativecloud/buy/students/explore/ccforstudents.html) |

### OpenAI Codex: **$100 in Codex credits**

100 USD of ChatGPT credits earmarked for Codex. Worth being precise about what this is: it is not a ChatGPT Plus discount, and it is not API credit.

| Field | Value |
|---|---|
| Original price | No standing global ChatGPT Plus student discount. |
| Student price | **100 USD in ChatGPT credits, equal to 2,500 credits, for use in Codex.** |
| Verification | SheerID-style verification with a university email through the claim page. |
| Length | Credits expire 12 months after the grant date. Unused credits are lost. |
| Eligibility | Degree-granting universities in the US or Canada, and you must be residing in the US or Canada when you claim. One offer per student. |
| Sign up | [developers.openai.com](https://developers.openai.com/community/students) |

### Microsoft 365 Personal: **$4.99/month, 50% off**

Half price on the full Office suite with Copilot built into Word, Excel, PowerPoint, OneNote and Outlook, plus 1 TB of OneDrive. The broadest single offer on this list, and the one most students will get the most hours out of.

| Field | Value |
|---|---|
| Original price | 9.99 USD per month, or 99.99 USD per year. |
| Student price | **4.99 USD per month, a 50 percent discount.** |
| Verification | School email, enrolment details, International Student Identity Card, or documentation such as a dated student ID, current progress report, dated class schedule or acceptance letter. |
| Length | Ongoing while verified. Microsoft re-checks eligibility annually and will prompt you to re-verify. |
| Eligibility | Enrolled full-time or part-time students at accredited universities and colleges. |
| Sign up | [microsoft.com](https://www.microsoft.com/en-us/microsoft-365/college-student-pricing) |

### Grammarly: **50% off, seasonal**

Writing assistant. The discount runs as a seasonal SheerID campaign rather than a standing offer.

| Field | Value |
|---|---|
| Original price | Grammarly Pro regular pricing. |
| Student price | **50 percent off through the SheerID campaign listing.** |
| Verification | SheerID. |
| Length | Campaign-based and seasonal. Not always available. |
| Sign up | [shop.sheerid.com](https://shop.sheerid.com/brands/grammarly/) |

### Otter.ai: **20% off Pro**

Transcription for lectures, interviews and group meetings. Individual Pro only, not workspace or team plans.

| Field | Value |
|---|---|
| Original price | Otter Pro standard pricing. |
| Student price | **20 percent off Otter Pro. Annual works out at about 6.67 USD per month billed 79.99 USD yearly. Monthly is about 13.59 USD.** |
| Verification | Otter account with a .edu email through the student discount flow. |
| Length | Ongoing while discount eligibility is met. |
| Eligibility | Verify at checkout, availability is not clearly global. |
| Sign up | [help.otter.ai](https://help.otter.ai/hc/en-us/articles/4402467517847-Student-Teacher-discount-program-for-the-Pro-plan) |
| Referral link | [otter.ai](https://otter.ai/referrals/SSHQGFP3) **You get 1 month of Otter Pro Lite free, 300 minutes per month. I get referral credit.** |

*Disclosure: that referral link earns me credit. This is the referral programme, which is separate from the 20 percent student discount above. Otter states the referral cannot be combined with other referral promotions. Whether it stacks with the student discount is not documented either way, so if the student rate matters more to you, claim that first and skip this link. Every other link on this page earns me nothing.*

### QuillBot: **Up to 25% off**

Paraphrasing and grammar tool with heavy student usage.

| Field | Value |
|---|---|
| Original price | QuillBot Premium standard pricing. |
| Student price | **Up to 25 percent off. Tiered by billing cycle, roughly 10 percent monthly, 15 percent quarterly or semi-annual, and 25 percent annual.** |
| Verification | Student Beans or UNiDAYS. |
| Length | Campaign-based. |
| Sign up | [quillbot.com](https://quillbot.com/upgrade/studentbeans) |

### Beautiful.ai: **Free Pro for 12 months**

AI slide-deck builder that does the layout work for you. A free year of Pro is a strong fit for case competitions and pitch decks, where the bottleneck is usually formatting rather than content.

| Field | Value |
|---|---|
| Original price | Pro is about 12 USD per month, roughly 144 USD per year. |
| Student price | **Free Pro subscription for 12 months.** |
| Verification | Verify a .edu email address and Beautiful.ai emails back a custom coupon code. No promo code hunting required. |
| Length | 12 months from activation, then it reverts to the free plan unless you renew. |
| Eligibility | Built around .edu addresses. International students without one are told to contact support about alternative verification. |
| Sign up | [support.beautiful.ai](https://support.beautiful.ai/hc/en-us/articles/360030719052-Does-Beautiful-ai-offer-discounts-for-education-or-non-profits) |

### Obsidian: **40% off Sync and Publish**

The app itself is free and always has been. This discounts the two paid add-ons, which is what you actually pay for once your vault outgrows one device. A good counterweight to Notion if you want local files you own.

| Field | Value |
|---|---|
| Original price | Sync is 4 USD per month billed annually. Publish is 8 USD per month per site. |
| Student price | **40 percent off both, so roughly 2.40 and 4.80 USD per month.** |
| Verification | Apply from your Obsidian account dashboard using an educational email. Support may accept a student ID or transcript if your institution does not issue one. |
| Length | Ongoing while eligible. |
| Eligibility | Students and faculty at educational organisations. Non-profit employees also qualify. |
| Sign up | [obsidian.md](https://obsidian.md/help/discounts) |

### Loom: **Up to 50% off, 75% for classroom use**

Screen recording with AI summaries and transcripts. Genuinely useful for group projects where scheduling a call costs more than recording a four-minute walkthrough.

| Field | Value |
|---|---|
| Original price | Loom Business and Business+AI paid plans. |
| Student price | **Up to 50 percent off for general academic use, and up to 75 percent off for specific classroom use.** |
| Verification | Create the Loom account with your institutional email, then submit the Atlassian classroom licence request. Applications are reviewed by Goodstack and take a few business days. |
| Length | Ongoing while verified. |
| Eligibility | Students, teachers and professors at accredited primary, secondary or tertiary institutions. Minimum age 16. |
| Sign up | [support.atlassian.com](https://support.atlassian.com/loom/docs/loom-education-discount-verification/) |

### Amp: **50% off, $10/month**

Sourcegraph's coding agent, half price for students and teachers with no document check. Treat this as provisional. It was announced the same day this entry was written and has no track record yet.

| Field | Value |
|---|---|
| Original price | 20 USD per month for Amp Megawatt. |
| Student price | **10 USD per month, a 50 percent discount.** |
| Verification | Self-declaration. Sign in and complete a form declaring student or teacher status. No SheerID, no .edu requirement, no document upload. |
| Length | Ongoing while enrolled. If you already subscribe, the discount applies at your next renewal with no retroactive refund. |
| Eligibility | No geographic restriction stated. |
| Sign up | [ampcode.com](https://ampcode.com/edu) |

### The rest

| Tool | Offer | What it is |
|---|---|---|
| [Consensus](https://help.consensus.app/en/articles/10064359-how-to-get-a-student-or-clinician-discount) | **40% off Premium** | Citation-grounded academic search. Strong fit for research-heavy programmes. |
| [Framer](https://www.framer.com/education/) | **Free Basic plan, worth $120/year** | Design-to-web tool with a free student plan that includes monthly AI credits. The obvious use is hosting a portfolio or personal site without paying for a year. |
| [Reclaim.ai](https://reclaim.ai/pricing/education-discount) | **50% off for 12 months** | AI calendar that defends time for tasks and habits against meeting creep. Low eligibility bar and a real discount, though you have to actually live in your calendar for it to pay off. |
| [Speechify](https://www.myunidays.com/US/en-US/partners/speechify/view) | **25% off Premium** | Text to speech for getting through case studies and papers while doing something else. A modest discount, but the use case is a real one during heavy reading terms. |

### Cloud credits

| Programme | Offer | Notes |
|---|---|---|
| [Microsoft Azure for Students](https://azure.microsoft.com/en-us/free/students/) | **$100 credit, no card needed** | 100 USD of Azure credit to use within 12 months, with no credit card required. |
| [Google Cloud for Students](https://cloud.google.com/edu/students) | **200 Google Skills credits** | 200 Google Skills credits for hands-on labs, skill badges and courses on Google Cloud Skills Boost. This is learning credit, not deployment credit. |
| [AWS Educate](https://aws.amazon.com/education/awseducate/) | **Free self-paced labs** | Free self-paced cloud training and hands-on labs covering S3, EC2, VPC, RDS and cloud operations, with digital badges. |

---

## Recently closed

I keep dead offers on the page instead of deleting them. Knowing an offer is gone saves you the search, and it shows how quickly these things move.

**Coda (now Superhuman Docs)**, closed 2026-06-30. The student, teacher and non-profit discount is paused for new applications as of 2026-06-30, following Coda's rebrand to Superhuman Docs.


**Cursor**, closed 2026-06-25. Cursor discontinued new sign-ups for the legacy student discount on 2026-06-25. It was a full year of Pro free and it was the strongest offer on this list, so its removal is the single biggest change since the last refresh.

- Replacement routes, per Cursor's own docs. Undergraduates can claim credits and discounts at on-campus and online events starting this autumn. Graduate students, researchers and educators can request credits through a form.
- Existing subscribers: If you already redeemed it you keep your current rate until the plan expires, after which it reverts to the standard 20 USD per month Pro rate.

**Google Gemini**, closed 2026-03-11. The free year of Google AI Pro for students ended on 2026-03-11. The student page now reads "Our previous student offer ended on March 11, 2026 and is no longer available in your region."


**Tabnine**, closed 2025-04-01. Tabnine ended its free Basic plan in April 2025 and no longer offers a student plan. Recorded so the question stays answered.

- The current pricing page shows no free tier, no trial and no student pricing.
- Existing subscribers: n/a

---

## What is not on this list, and why

**Claude (Anthropic).** No individual student discount on consumer pricing. Anthropic does not issue one-off discounts or coupons for Pro. The old self-serve Student Builder path (a form, a school email, roughly 50 USD in API credit) is gone from Anthropic's site. It has been folded into the Claude Campus Program, which runs two application-gated tracks: Campus Ambassadors and Claude Builder Clubs. Both grant Claude Pro access plus unspecified API credits and a stipend, but neither publishes a dollar figure, and applications for the current cohort are CLOSED as of 2026-08-18. The External Researcher Access Program (around 1,000 USD in credit) remains a separate route. Outside those, the cheapest official option is Pro on annual billing at 17 USD per month, billed 200 USD up front, against 20 USD billed monthly. Access for students runs through Claude for Education, a university-wide plan licensed to the institution. Campus-wide agreements in place by mid-2026 include Stanford, which rolled out to all students, faculty and staff from 2026-06-30, plus Northeastern, the London School of Economics, Champlain College and Northumbria. Ask your IT or procurement team whether your campus holds a Claude for Education agreement. If it does, signing in to claude.ai with your school email provisions the account at no cost to you.

**Microsoft Copilot (Microsoft 365 Education).** Microsoft 365 Copilot Chat costs nothing extra when you sign in with a school account, but only if your institution holds an eligible Microsoft 365 Education licence (A1, A3 or A5) and an admin has switched it on. Neither is something you can claim yourself. Microsoft confirmed in May 2025 that students aged 13 and over can use Copilot Chat once the school enables it. Note the scope: Education A1 does not include the consumer Copilot embedded in Word, Excel and PowerPoint, only the more limited Copilot Chat. Ask your school IT team whether the tenant holds an A1, A3 or A5 licence and whether Copilot Chat is enabled for student accounts.

**Canva.** Canva for Education is the eligibility-based K-12 offer. Higher-education access runs through Canva Campus, which the institution buys and manages. There is no individual higher-ed claim, so without a Campus licence a university student is on Canva Free. One adjacent route exists. Canva opened Campus Canvassadors, a student ambassador programme for US university students, with its first cohort running August to December 2026. Applications are prioritised for students already at Canva for Campus schools, so it rewards existing access rather than creating it. Ask whether your school has procured Canva Campus.

**Midjourney.** No individual student programme in 2026. The 20 percent saving on annual billing is available to everyone and is not a student discount. Midjourney's educational-use policy is explicit that each student needs their own account and their own subscription. There are no shared accounts, no group plans and no way for a school to manage student accounts centrally, though schools can reimburse students directly.

**CapCut Creative Campus.** Restricted to a small set of named partner schools, none of them business or graduate programmes. There is no individual claim path. Check whether your institution is a named Creative Campus partner.

**Gemini CLI.** No student offer, and none is needed. Signing in with any personal Google account gives 1,000 model requests per day and 60 per minute at no cost, with no trial expiry. A student would gain nothing from a discount here. Flash is the default on the free tier, so the 1,000 daily requests are not 1,000 Pro requests. Authenticating with an unpaid API key instead of a Google account is materially worse: 250 requests per day, 10 per minute, Flash only. Sign in with the account, not the key. Nothing to claim. Install it and sign in.

**NotebookLM.** No student-specific offer. The core product is free to everyone with a Google account, and the free Gemini tier includes NotebookLM access. Higher-education students aged 18 and over can create personal class notebooks inside Google Classroom, grounded in materials their educator provides, but that is an institutional integration rather than a claimable discount. The paid tier rides on Google AI Pro, whose student offers have all expired. See the Google Gemini entry. Nothing to claim. Use it free, and check Google Classroom if your course uses it.

**SciSpace, Julius AI, Humata.** Dropped. I could not confirm official student terms after more than three months, so they are off the list rather than on it with a question mark.

---

## How to verify anything here

1. **Click the official link.** Every source here is a help-centre or pricing page. Coupon and deal-aggregator sites routinely advertise offers that the vendor's own site does not mention, and several on this list were rejected for exactly that reason.
2. **Check the refresh date.** If it is more than 90 days old, re-verify before you rely on it.
3. **Try SheerID, Student Beans or UNiDAYS directly** if you are hunting beyond this list. A lot of discounts route through them.

---

*Maintained openly at [github.com/tyoon10/student-ai-tools](https://github.com/tyoon10/student-ai-tools). The list is generated from a single data file, checked by CI, and re-verified on a schedule. Spot something out of date? Open an issue.*
