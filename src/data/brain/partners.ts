import type { PublicPartner } from './types.ts';

/**
 * Public fields only. No relationship state, terms, or underwriter claim.
 * Empty is correct: this preview does not invent current underwriters.
 * Partner slots on the page render as reserved marks.
 */
export const partners: PublicPartner[] = [];
