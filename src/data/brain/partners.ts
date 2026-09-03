import type { PublicPartner } from './types.ts';

/**
 * Public fields only. No relationship state, terms, or funding status.
 * Empty is correct. The public page renders a reserved mark, never logos.
 */
export const partners: PublicPartner[] = [];
