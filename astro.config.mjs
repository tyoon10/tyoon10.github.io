// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://twyoon.com',
  // Keep unlisted, direct-link-only pages out of the public sitemap.
  integrations: [sitemap({
    filter: (page) => ![
      '/writings/why-i-love-community-building',
      '/advisory',
      '/workshop',
    ].some((slug) => page.includes(slug)),
  })],

  // Preserve legacy Hugo URLs (indexed + externally linked) by redirecting
  // them to the new Astro routes. Slugs are unchanged; only the section
  // prefix moved (/post → /writings, /project → /projects). Events no longer
  // have dedicated pages, so they point at the best equivalent.
  redirects: {
    // Posts → Writings
    '/post/agents-need-better-infrastructure': '/writings/agents-need-better-infrastructure',
    '/post/ai-superpower-for-pm': '/writings/ai-superpower-for-pm',
    '/post/iterate-columbia-hackathon-2026-recap': '/writings/iterate-columbia-hackathon-2026-recap',
    '/post/learning-with-ai': '/writings/learning-with-ai',
    '/post/mistral-worldwide-hackathon-2026-recap': '/writings/mistral-worldwide-hackathon-2026-recap',
    '/post/science-based-skincare-routine': '/writings/science-based-skincare-routine',
    '/post/student-ai-tools': '/writings/student-ai-tools',
    '/post/tracing-the-minds-behind-claude-code': '/writings/tracing-the-minds-behind-claude-code',
    '/post/what-senior-business-leaders-ask-about-ai': '/writings/what-senior-business-leaders-ask-about-ai',

    // Projects (singular → plural)
    '/project/access-to-experts': '/projects/access-to-experts',
    '/project/ai-pipeline-quant-finance': '/projects/ai-pipeline-quant-finance',
    '/project/causal-inference': '/projects/causal-inference',

    // Events → nearest equivalent (recap article / project) or the events section
    '/event/iterate-columbia-hackathon-2026': '/writings/iterate-columbia-hackathon-2026-recap',
    '/event/mistral-worldwide-hackathon-2026': '/writings/mistral-worldwide-hackathon-2026-recap',
    '/event/building-the-future-of-finance-with-claude': '/writings/what-senior-business-leaders-ask-about-ai',
    '/event/claude-for-product-management-workshop': '/writings/ai-superpower-for-pm',
    '/event/mathworks-conference-2025': '/projects/ai-pipeline-quant-finance',
    '/event/ai-startup-challenge-finals-2026': '/#events',
    '/event/claude-builder-hackathon-2026': '/#events',
    '/event/gdg-build-with-ai-hackathon-2026': '/#events',
    '/event/claude-builder-club-spring-2026-kick-off': '/#events',
    '/event/ai-for-greater-good-nyc-2026': '/#events',
  },
});
