/** Public BRAIN data contracts. No relationship state, terms, or contacts. */

export const SITTING_FORMATS = [
  'workshop',
  'fireside chat',
  'company visit',
  'hackathon',
  'pitch competition',
] as const;

export type SittingFormat = (typeof SITTING_FORMATS)[number];

/** Maps owned / co-hosted / listed. Must stay visually distinct. */
export const CHAIR_ROLES = ['chair', 'co-chair', 'docket'] as const;
export type ChairRole = (typeof CHAIR_ROLES)[number];

/** Drives an outbound button label only. We never host the form. */
export const REGISTER_STATES = ['open', 'waitlist', 'closed', 'details'] as const;
export type RegisterState = (typeof REGISTER_STATES)[number];

export const REGISTER_LABEL: Record<RegisterState, string> = {
  open: 'Register',
  waitlist: 'Join waitlist',
  closed: 'Closed',
  details: 'View details',
};

export const CHIP_STATUSES = ['ship', 'assemble', 'new', 'hold'] as const;
export type ChipStatus = (typeof CHIP_STATUSES)[number];

export const SCHOOL_IDS = ['columbia', 'nyu', 'cornell-tech', 'yale'] as const;
export type SchoolId = (typeof SCHOOL_IDS)[number];

export interface School {
  id: SchoolId;
  name: string;
  color: string;
  /** Official institutional page. Not a seat-holder claim. */
  officialUrl: string;
  geography: string;
}

export type OfferStatus = 'live' | 'closed' | 'held';

export interface Offer {
  id: string;
  name: string;
  /** Qualitative label from the 2026-08-18 in-repo notes. */
  offer: string;
  category: string;
  status: OfferStatus;
  /** Lower sorts first. Free / immediate before verification-heavy. */
  timeToValue: number;
  lastVerified: string;
  closedOn?: string;
  officialUrl: string;
  summary: string;
  inferred?: true;
}

export type WindowState = 'open' | 'closed' | 'held';

export interface Program {
  id: string;
  name: string;
  surface: string;
  officialUrl?: string;
  applicationWindow: {
    state: WindowState;
    asOf?: string;
    note: string;
  };
  publicRecord?: string;
}

export type WireLane = 'student' | 'industry';
export type WireState = 'held' | 'ready';

export interface WireItem {
  id: string;
  lane: WireLane;
  state: WireState;
  title: string;
  body: string;
  date?: string;
  inferred?: true;
}

/** Public fields only. No relationship state, terms, or underwriter claim. */
export interface PublicPartner {
  name: string;
  url?: string;
  publicRecord?: string;
}

export interface BrainSitting {
  format: SittingFormat;
  chairRole: ChairRole;
  registerState: RegisterState;
  /** Always an organiser URL. The Roundtable never hosts the form. */
  organiserUrl: string;
  inferred?: true;
}

export type UpcomingResolution =
  | { kind: 'sitting'; eventId: string }
  | { kind: 'held'; message: string };
