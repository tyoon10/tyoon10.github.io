import type { Program } from './types.ts';

/**
 * Campus programs as collaborator surfaces.
 * Application windows only when already documented in-repo (2026-08-18 notes).
 * No 2026-08-29 facts exist in this repository. Do not invent windows.
 */
export const programs: Program[] = [
  {
    id: 'claude-campus',
    name: 'Claude Campus Program',
    surface: 'Counterpart — Campus Ambassadors and Claude Builder Clubs',
    applicationWindow: {
      state: 'closed',
      asOf: '2026-08-18',
      note: 'Applications for the current cohort are closed as of 2026-08-18.',
    },
    publicRecord:
      'Named in the 2026-08-18 student-tools research notes. No official program URL is recorded in this repository.',
  },
  {
    id: 'claude-builder-club',
    name: 'Claude Builder Club',
    surface: 'Campus program — Columbia and NYU sittings on the public record',
    officialUrl: 'https://luma.com/wt6wmh29',
    applicationWindow: {
      state: 'held',
      note: 'Application window — confirm first. This preview does not invent dates.',
    },
    publicRecord:
      'A joint Columbia and NYU hackathon appears on the public docket (2026-04-12). The Luma link is that sitting, not an application form.',
  },
  {
    id: 'cbs-ai-club',
    name: 'CBS AI Club',
    surface: 'Campus program — Columbia Business School',
    applicationWindow: {
      state: 'held',
      note: 'Application window — confirm first. This preview does not invent dates.',
    },
    publicRecord:
      'Named in the public recap of the 2026-02-14 sitting with Iterate.',
  },
];
