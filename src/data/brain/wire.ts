import type { WireItem } from './types.ts';

/**
 * The brief. Two lanes; both held.
 * Do not populate with unverified dates or model versions.
 */
export const wire: WireItem[] = [
  {
    id: 'student-held',
    lane: 'student',
    state: 'held',
    title: 'Held',
    body: 'Student-lane items publish when a sitting is on the docket. Nothing is auto-fed.',
  },
  {
    id: 'industry-held',
    lane: 'industry',
    state: 'held',
    title: 'Held',
    body: 'Industry-lane items publish when a sitting is on the docket. Nothing is auto-fed.',
  },
];
