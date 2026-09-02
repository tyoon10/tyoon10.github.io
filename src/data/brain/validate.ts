import { events } from '../events.ts';
import { offers } from './offers.ts';
import { partners } from './partners.ts';
import { programs } from './programs.ts';
import { schools } from './schools.ts';
import { wire } from './wire.ts';
import { brainEvents, isExternalOrganiserUrl } from './events.ts';
import {
  CHAIR_ROLES,
  CHIP_STATUSES,
  REGISTER_STATES,
  SCHOOL_IDS,
  SITTING_FORMATS,
  type Offer,
  type Program,
  type PublicPartner,
  type WireItem,
} from './types.ts';

export interface ValidationIssue {
  module: string;
  message: string;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const HTTP = /^https?:\/\//i;
const HEX = /^#[0-9a-f]{6}$/i;

function checkOffer(offer: Offer, issues: ValidationIssue[]) {
  const mod = 'offers';
  if (!offer.id) issues.push({ module: mod, message: 'offer missing id' });
  if (!offer.name) issues.push({ module: mod, message: `${offer.id}: missing name` });
  if (!offer.offer) issues.push({ module: mod, message: `${offer.id}: missing offer` });
  if (!['live', 'closed', 'held'].includes(offer.status)) {
    issues.push({ module: mod, message: `${offer.id}: bad status` });
  }
  if (!ISO.test(offer.lastVerified)) {
    issues.push({ module: mod, message: `${offer.id}: lastVerified must be ISO date` });
  }
  if (offer.status === 'closed' && !offer.closedOn) {
    issues.push({ module: mod, message: `${offer.id}: closed items need closedOn` });
  }
  if (offer.closedOn && !ISO.test(offer.closedOn)) {
    issues.push({ module: mod, message: `${offer.id}: closedOn must be ISO date` });
  }
  if (!HTTP.test(offer.officialUrl)) {
    issues.push({ module: mod, message: `${offer.id}: officialUrl must be http(s)` });
  }
  if (/ref\.|referr/i.test(offer.officialUrl)) {
    issues.push({ module: mod, message: `${offer.id}: referral URLs are forbidden` });
  }
}

function checkProgram(program: Program, issues: ValidationIssue[]) {
  const mod = 'programs';
  if (!program.id) issues.push({ module: mod, message: 'program missing id' });
  if (!program.name) issues.push({ module: mod, message: `${program.id}: missing name` });
  if (!['open', 'closed', 'held'].includes(program.applicationWindow.state)) {
    issues.push({ module: mod, message: `${program.id}: bad window state` });
  }
  if (program.officialUrl && !HTTP.test(program.officialUrl)) {
    issues.push({ module: mod, message: `${program.id}: officialUrl must be http(s)` });
  }
}

function checkWire(item: WireItem, issues: ValidationIssue[]) {
  const mod = 'wire';
  if (!item.id) issues.push({ module: mod, message: 'wire item missing id' });
  if (!['student', 'industry'].includes(item.lane)) {
    issues.push({ module: mod, message: `${item.id}: lane must be student or industry` });
  }
  if (!['held', 'ready'].includes(item.state)) {
    issues.push({ module: mod, message: `${item.id}: bad state` });
  }
  if (item.state === 'ready' && !item.body) {
    issues.push({ module: mod, message: `${item.id}: ready items need body` });
  }
}

function checkPartner(partner: PublicPartner, i: number, issues: ValidationIssue[]) {
  const mod = 'partners';
  if (!partner.name) issues.push({ module: mod, message: `partners[${i}]: missing name` });
  if (partner.url && !HTTP.test(partner.url)) {
    issues.push({ module: mod, message: `partners[${i}]: url must be http(s)` });
  }
  const leaked = ['relationship', 'term', 'commission', 'underwriter status', 'signed'];
  const blob = JSON.stringify(partner).toLowerCase();
  for (const key of leaked) {
    if (blob.includes(key) && key !== 'underwriter status') {
      /* publicRecord may mention a recap; relationship/terms keys must not exist */
    }
  }
  if ('relationship' in partner || 'terms' in partner || 'status' in partner) {
    issues.push({ module: mod, message: `partners[${i}]: internal fields are not public` });
  }
}

export function validateBrainData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!Array.isArray(offers)) issues.push({ module: 'offers', message: 'offers must be an array' });
  if (!Array.isArray(programs)) issues.push({ module: 'programs', message: 'programs must be an array' });
  if (!Array.isArray(wire)) issues.push({ module: 'wire', message: 'wire must be an array' });
  if (!Array.isArray(partners)) issues.push({ module: 'partners', message: 'partners must be an array' });
  if (!Array.isArray(events)) issues.push({ module: 'events', message: 'events must be an array' });

  offers.forEach((offer) => checkOffer(offer, issues));
  programs.forEach((program) => checkProgram(program, issues));
  wire.forEach((item) => checkWire(item, issues));
  partners.forEach((partner, i) => checkPartner(partner, i, issues));

  const ids = new Set<string>();
  for (const event of brainEvents(events)) {
    if (ids.has(event.id)) issues.push({ module: 'events', message: `duplicate id ${event.id}` });
    ids.add(event.id);
    if (!(SITTING_FORMATS as readonly string[]).includes(event.brain.format)) {
      issues.push({ module: 'events', message: `${event.id}: format not in the five` });
    }
    if (!(CHAIR_ROLES as readonly string[]).includes(event.brain.chairRole)) {
      issues.push({ module: 'events', message: `${event.id}: chairRole must be chair, co-chair, or docket` });
    }
    if (!(REGISTER_STATES as readonly string[]).includes(event.brain.registerState)) {
      issues.push({ module: 'events', message: `${event.id}: bad registerState` });
    }
    if (!isExternalOrganiserUrl(event.brain.organiserUrl)) {
      issues.push({ module: 'events', message: `${event.id}: organiserUrl must link out` });
    }
  }

  for (const school of schools) {
    if (!(SCHOOL_IDS as readonly string[]).includes(school.id)) {
      issues.push({ module: 'schools', message: `${school.id}: unknown school id` });
    }
    if (!HEX.test(school.color)) {
      issues.push({ module: 'schools', message: `${school.id}: colour must be #rrggbb` });
    }
  }

  if (CHIP_STATUSES.length !== 4) {
    issues.push({ module: 'types', message: 'chip statuses must be ship, assemble, new, hold' });
  }

  return issues;
}
