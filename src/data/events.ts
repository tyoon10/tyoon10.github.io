import type { BrainSitting } from './brain/types.ts';

export interface EventLink {
  name: string;
  url: string;
  icon: 'linkedin' | 'globe' | 'book-open' | 'video' | 'code';
}

export type EventRoleStyle = 'organizer' | 'keynote' | 'host' | 'neutral';

export interface SiteEvent {
  title: string;
  role: string;
  roleStyle: EventRoleStyle;
  date: string; // ISO date, used for sorting + display
  location: string;
  links: EventLink[];
  /** Optional. BRAIN docket only; ignored by the personal homepage. */
  id?: string;
  brain?: BrainSitting;
}

export const events: SiteEvent[] = [
  {
    title: 'CBS Executive Education in AI',
    role: 'Workshop',
    roleStyle: 'host',
    date: '2026-08-05',
    location: 'Columbia Business School',
    links: [
      { name: 'Course Page', url: 'https://twyoon.com/workshop', icon: 'book-open' },
    ],
  },
  {
    title: 'AI Startup Challenge — Final Competition Day',
    role: 'Organizer / Host',
    roleStyle: 'organizer',
    date: '2026-04-24',
    location: 'Williamsburg, Brooklyn, NY',
    id: 'ai-startup-challenge-2026',
    brain: {
      format: 'pitch competition',
      chairRole: 'chair',
      registerState: 'details',
      organiserUrl: 'https://business.columbia.edu/ai-in-business/ai-startup-final-competition-day',
      inferred: true,
    },
    links: [
      { name: 'LinkedIn Post', url: 'https://www.linkedin.com/posts/if-you-had-one-shot-to-build-a-startup-with-ugcPost-7459606643496931328-CaZ4/', icon: 'linkedin' },
      { name: 'Event Page', url: 'https://business.columbia.edu/ai-in-business/ai-startup-final-competition-day', icon: 'globe' },
    ],
  },
  {
    title: 'Columbia x NYU Claude Builder Club Hackathon',
    role: 'Organizer',
    roleStyle: 'organizer',
    date: '2026-04-12',
    location: 'Geffen Hall, Columbia Business School',
    id: 'claude-builder-hackathon-2026',
    brain: {
      format: 'hackathon',
      chairRole: 'co-chair',
      registerState: 'details',
      organiserUrl: 'https://luma.com/wt6wmh29',
      inferred: true,
    },
    links: [
      { name: 'LinkedIn Post', url: 'https://www.linkedin.com/posts/taewan-yoon_claudepartner-ugcPost-7453550848439209984-rI9J/', icon: 'linkedin' },
      { name: 'Event Page', url: 'https://luma.com/wt6wmh29', icon: 'globe' },
    ],
  },
  {
    title: 'Building the Future of Finance with Claude',
    role: 'Keynote',
    roleStyle: 'keynote',
    date: '2026-03-17',
    location: 'CBS Executive Education',
    links: [
      { name: 'Read Article', url: '/writings/what-senior-business-leaders-ask-about-ai/', icon: 'book-open' },
      { name: 'Official Website', url: 'https://execed.business.columbia.edu/programs/business-ai', icon: 'globe' },
    ],
  },
  {
    title: 'GDG NYC Build With AI Hackathon',
    role: 'Mentor',
    roleStyle: 'neutral',
    date: '2026-03-08',
    location: 'Columbia Business School',
    id: 'gdg-nyc-build-with-ai-2026',
    brain: {
      format: 'hackathon',
      chairRole: 'docket',
      registerState: 'details',
      organiserUrl: 'https://gdg.community.dev/events/details/google-gdg-nyc-presents-ai-futures-fund-presents-nyc-build-w-ai-hackathon-google-cloud-labs-x-columbia-business-school-ii/',
      inferred: true,
    },
    links: [
      { name: 'Event Page', url: 'https://gdg.community.dev/events/details/google-gdg-nyc-presents-ai-futures-fund-presents-nyc-build-w-ai-hackathon-google-cloud-labs-x-columbia-business-school-ii/', icon: 'globe' },
    ],
  },
  {
    title: 'Mistral AI Worldwide Hackathon — New York',
    role: 'Judge',
    roleStyle: 'neutral',
    date: '2026-02-28',
    location: 'Verci Flatiron, New York',
    id: 'mistral-hackathon-nyc-2026',
    brain: {
      format: 'hackathon',
      chairRole: 'docket',
      registerState: 'details',
      organiserUrl: 'https://luma.com/mistralhack-newyork?tk=W3R0u7',
      inferred: true,
    },
    links: [
      { name: 'Read Recap', url: '/writings/mistral-worldwide-hackathon-2026-recap/', icon: 'book-open' },
      { name: 'Event Page', url: 'https://luma.com/mistralhack-newyork?tk=W3R0u7', icon: 'globe' },
    ],
  },
  {
    title: 'Claude Code Workshop — Digital Product Management Lab',
    role: 'Workshop',
    roleStyle: 'host',
    date: '2026-02-23',
    location: 'Columbia Business School',
    links: [
      { name: 'Read Article', url: '/writings/ai-superpower-for-pm/', icon: 'book-open' },
      { name: 'LinkedIn Post', url: 'https://www.linkedin.com/posts/taewan-yoon_claudepartner-productmanagement-contextengineering-activity-7432843926362931201-MvCA', icon: 'linkedin' },
    ],
  },
  {
    title: 'AI Club x Iterate NYC Hackathon',
    role: 'Organizer',
    roleStyle: 'organizer',
    date: '2026-02-14',
    location: 'Columbia Business School',
    id: 'iterate-columbia-hackathon-2026',
    brain: {
      format: 'hackathon',
      chairRole: 'co-chair',
      registerState: 'details',
      organiserUrl: 'https://luma.com/dyzbn70z',
      inferred: true,
    },
    links: [
      { name: 'Read Recap', url: '/writings/iterate-columbia-hackathon-2026-recap/', icon: 'book-open' },
      { name: 'Event Page', url: 'https://luma.com/dyzbn70z', icon: 'globe' },
    ],
  },
  {
    title: 'Claude Builder Club Spring 2026 Kick Off',
    role: 'Host',
    roleStyle: 'host',
    date: '2026-02-11',
    location: 'Columbia University',
    links: [
      { name: 'Event Page', url: 'https://cglink.me/2ca/r131627', icon: 'globe' },
    ],
  },
  {
    title: 'AI for Greater Good NYC Kick Off',
    role: 'Panelist',
    roleStyle: 'neutral',
    date: '2026-01-23',
    location: 'New York, NY',
    links: [
      { name: 'Event Page', url: 'https://luma.com/cjylbi37', icon: 'globe' },
      { name: 'GEMI AI Challenge', url: 'https://hub.gemi-ai.tech/ai-for-greater-good', icon: 'globe' },
    ],
  },
  {
    title: 'MathWorks Finance Conference 2025',
    role: 'Speaker',
    roleStyle: 'keynote',
    date: '2025-09-30',
    location: 'Virtual',
    links: [
      { name: 'Conference Recording', url: 'https://www.mathworks.com/videos/investment-strategies-ideation-using-large-language-models-and-structured-multi-modal-data-1760424545621.html', icon: 'video' },
    ],
  },
];
