import { events } from '../events.ts';
import { offers, partners, programs, sittings, schools, wire } from './load.ts';
import { findSeed, isExternalOrganiserUrl } from './events.ts';
import {
  CHAIR_ROLES,
  CHIP_STATUSES,
  REGISTER_STATES,
  SITTING_FORMATS,
} from './schema.ts';

export interface ValidationIssue {
  module: string;
  message: string;
}

export function validateBrainData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!Array.isArray(offers)) issues.push({ module: 'offers', message: 'offers must be an array' });
  if (!Array.isArray(programs)) issues.push({ module: 'programs', message: 'programs must be an array' });
  if (!Array.isArray(wire)) issues.push({ module: 'wire', message: 'wire must be an array' });
  if (!Array.isArray(partners)) issues.push({ module: 'partners', message: 'partners must be an array' });
  if (!Array.isArray(sittings)) issues.push({ module: 'events', message: 'events must be an array' });
  if (!Array.isArray(events)) issues.push({ module: 'events', message: 'seed events must be an array' });

  const ids = new Set<string>();
  for (const sitting of sittings) {
    if (ids.has(sitting.id)) issues.push({ module: 'events', message: `duplicate id ${sitting.id}` });
    ids.add(sitting.id);
    if (!(SITTING_FORMATS as readonly string[]).includes(sitting.format)) {
      issues.push({ module: 'events', message: `${sitting.id}: format not in the five` });
    }
    if (!(CHAIR_ROLES as readonly string[]).includes(sitting.chairRole)) {
      issues.push({ module: 'events', message: `${sitting.id}: chairRole must be chair, co-chair, or docket` });
    }
    if (!(REGISTER_STATES as readonly string[]).includes(sitting.registerState)) {
      issues.push({ module: 'events', message: `${sitting.id}: bad registerState` });
    }
    if (!isExternalOrganiserUrl(sitting.organiserUrl)) {
      issues.push({ module: 'events', message: `${sitting.id}: organiserUrl must link out` });
    }
    if (!findSeed(sitting, events)) {
      issues.push({
        module: 'events',
        message: `${sitting.id}: seed title/date not found in src/data/events.ts`,
      });
    }
  }

  for (const school of schools) {
    if (!/^#[0-9a-f]{6}$/i.test(school.color)) {
      issues.push({ module: 'schools', message: `${school.id}: colour must be #rrggbb` });
    }
  }

  if (CHIP_STATUSES.length !== 4) {
    issues.push({ module: 'types', message: 'chip statuses must be ship, assemble, new, hold' });
  }

  for (const partner of partners) {
    if ('relationship' in partner || 'terms' in partner || 'status' in partner) {
      issues.push({ module: 'partners', message: `${partner.name}: internal fields are not public` });
    }
  }

  return issues;
}
