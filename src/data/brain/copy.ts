/**
 * Public copy for the /brain preview. Lexicon is locked.
 * Never: convenor, chapter, tracker, society, forum.
 */

export const previewBanner = 'Preview — not published.';

export const wordmark = 'BRAIN NYC';
export const kicker = 'ROUNDTABLE';

export const display = 'The room is the product.';

export const roundtableExpansion =
  'BRAIN is the Business Roundtable for AI & Innovation in NYC.';

export const oneLiner =
  'An in-person AI learning and career network connecting selected business schools, students, companies, founders and AI leaders across New York City.';

export const yaleLine = 'New York City, with Yale students joining from New Haven.';

export const geographyNote =
  'Every sitting we chair is in New York City, with Yale students joining from New Haven.';

export const actionDocket = 'Read the docket';
export const actionOffers = 'Open the offer book';

export const hermesNote =
  'HERMES: drafting and preview are allowed. Production publish is forbidden. This route is not the live homepage.';

export const nextHeld = 'Next announced in September';

export const offerBookLede =
  'The offer book is open. A seat at the table is not required — there is nothing to join, and nothing to pay the Roundtable, to use it.';

export const offerBookFreshness =
  'Dates below are last-verified dates from the student-tools notes, not a claim that every term is still live. Closed items stay on the page so you do not go looking.';

export const offerBookSource =
  'Terms live in the student-tools notes. This page is the time-to-value index, not a second list.';

export const offerBookTonight =
  'The 11pm test: if you have a school email and twenty minutes, start here.';

export const offerBookEmptyLive =
  'No live offers in this preview. The index is empty until a verified entry is added.';

export const offerBookCountLabel = (n: number) =>
  n === 1 ? '1 live offer' : `${n} live offers`;

export const programsLede =
  'Campus programs are collaborator surfaces. Application windows are shown only when already documented; otherwise the window is held.';

export const programsEmpty =
  'Application window — confirm first. This preview does not invent dates.';

export const programsListEmpty =
  'No campus programs in this preview. The list is empty until a public record is added.';

export const briefHeld =
  'The brief is held. Student and industry lanes publish when a sitting is on the docket. This preview does not auto-feed the brief.';

export const briefStudentLabel = 'Student lane';
export const briefIndustryLabel = 'Industry lane';
export const briefEmptyLane = 'Nothing on this lane. Held until a sitting is on the docket.';

export const partnersReserved = 'mark reserved';
export const partnersEmpty =
  'No underwriters named in this preview. Names appear as text only when they are already on the public record, and never as a current relationship.';

export const howTable = {
  seats: {
    title: 'Campus seats',
    body: 'Selected business schools hold a campus seat at the table. Seat-holders are not named in this preview.',
  },
  room: {
    title: 'The room',
    body: 'The product is the sitting. We chair, we co-chair, or a sitting is on the docket. Five formats only: workshop, fireside chat, company visit, hackathon, pitch competition.',
  },
  service: {
    title: 'The service',
    body: 'Information is the service: the offer book, the brief, and the docket. Use them without waiting for a sitting.',
  },
};

export const chairLegend = {
  chair: 'A sitting we chair',
  'co-chair': 'A sitting we co-chair',
  docket: 'On the docket',
} as const;

export const lexicon = {
  use: [
    'the Roundtable',
    'a sitting we chair',
    'a sitting we co-chair',
    'on the docket',
    'campus seats',
    'executive committee',
    'a seat at the table',
    'offer book',
    'the brief',
    'underwriters',
    'counterparts',
  ],
  never: [
    'convenor',
    'chapter',
    'tracker',
    'society',
    'forum',
  ],
} as const;

export const nav = [
  { href: '/brain', label: 'Table' },
  { href: '/brain/offers', label: 'Offer book' },
  { href: '/brain/docket', label: 'Docket' },
  { href: '/brain/programs', label: 'Programs' },
  { href: '/brain/brief', label: 'Brief' },
] as const;

export const chipLabels = {
  ship: 'Shipped',
  assemble: 'Assemble',
  new: 'Build',
  hold: 'Hold',
} as const;

export const inferredMark = 'inferred';

export const docketUpcomingLabel = 'Upcoming';
export const docketArchiveLabel = 'Archive';
export const docketEmptyArchive = 'No archived sittings in this preview.';
export const docketEmptyUpcoming = 'No upcoming sitting. Next announced in September.';

export const personalSiteNote = 'Personal site';
export const termsSourceLabel = 'Read the verified notes';
