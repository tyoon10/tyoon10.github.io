import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import * as copy from '../src/data/brain/copy.ts';
import { brainEvents, resolveUpcoming } from '../src/data/brain/events.ts';
import { offers, partners, sittings, wire } from '../src/data/brain/load.ts';
import { validateBrainData } from '../src/data/brain/validate.ts';
import { events, type SiteEvent } from '../src/data/events.ts';
import type { SittingRecord } from '../src/data/brain/schema.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FORBIDDEN = /\b(convenor|chapter|tracker|society|forum)\b/i;
const GATE = /\b(join now|become a member|members only|pay to (access|unlock)|wait for (an )?event)\b/i;
const MONEY = /\b(ticket|checkout|membership fee|how we(?:'|’)re funded|commission)\b/i;

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else acc.push(path);
  }
  return acc;
}

function publicStrings(): string[] {
  return [
    copy.previewBanner,
    copy.wordmark,
    copy.kicker,
    copy.display,
    copy.roundtableExpansion,
    copy.oneLiner,
    copy.yaleLine,
    copy.geographyNote,
    copy.actionDocket,
    copy.actionOffers,
    copy.hermesNote,
    copy.nextHeld,
    copy.offerBookLede,
    copy.offerBookFreshness,
    copy.offerBookSource,
    copy.offerBookTonight,
    copy.offerBookEmptyLive,
    copy.offerBookCountLabel(3),
    copy.programsLede,
    copy.programsEmpty,
    copy.programsListEmpty,
    copy.briefHeld,
    copy.briefStudentLabel,
    copy.briefIndustryLabel,
    copy.briefEmptyLane,
    copy.partnersReserved,
    copy.partnersEmpty,
    copy.howTable.seats.title,
    copy.howTable.seats.body,
    copy.howTable.room.title,
    copy.howTable.room.body,
    copy.howTable.service.title,
    copy.howTable.service.body,
    copy.chairLegend.chair,
    copy.chairLegend['co-chair'],
    copy.chairLegend.docket,
    copy.docketUpcomingLabel,
    copy.docketArchiveLabel,
    copy.docketEmptyArchive,
    copy.docketEmptyUpcoming,
    copy.personalSiteNote,
    copy.termsSourceLabel,
    ...copy.lexicon.use,
    ...copy.nav.map((n) => n.label),
    ...Object.values(copy.chipLabels),
  ];
}

describe('BRAIN public modules', () => {
  it('validates offers, programs, wire, events, and partners', () => {
    assert.deepEqual(validateBrainData(), []);
  });

  it('keeps the personal events seed untouched', () => {
    const seed = readFileSync(join(root, 'src/data/events.ts'), 'utf8');
    assert.doesNotMatch(seed, /brain\?:/);
    assert.doesNotMatch(seed, /from '\.\/brain/);
    const sample = events[0];
    assert.equal(typeof sample.title, 'string');
    assert.equal(typeof sample.role, 'string');
    assert.equal(typeof sample.date, 'string');
    assert.ok(Array.isArray(sample.links));
  });

  it('accepts empty partners and empty wire', () => {
    assert.deepEqual(partners, []);
    assert.deepEqual(wire, []);
  });
});

describe('upcoming resolution', () => {
  it('resolves to the September held line when every sitting is past', () => {
    const resolved = resolveUpcoming(sittings, events, new Date('2026-09-02T12:00:00Z'));
    assert.equal(resolved.kind, 'held');
    if (resolved.kind === 'held') assert.equal(resolved.message, copy.nextHeld);
  });

  it('never treats a past sitting as upcoming', () => {
    const now = new Date('2026-09-02T12:00:00Z');
    const resolved = resolveUpcoming(sittings, events, now);
    if (resolved.kind === 'sitting') {
      const hit = brainEvents(sittings, events).find((e) => e.id === resolved.eventId);
      assert.ok(hit);
      assert.ok(Date.parse(`${hit.date}T00:00:00.000Z`) >= Date.UTC(2026, 8, 2));
    }
  });

  it('resolves a future sitting when one exists', () => {
    const futureSitting: SittingRecord = {
      id: 'future-workshop',
      seedTitle: 'Future workshop',
      seedDate: '2026-10-15',
      format: 'workshop',
      chairRole: 'chair',
      registerState: 'open',
      organiserUrl: 'https://example.com/sitting',
    };
    const futureSeed: SiteEvent = {
      title: 'Future workshop',
      role: 'Workshop',
      roleStyle: 'host',
      date: '2026-10-15',
      location: 'New York City',
      links: [],
    };
    const resolved = resolveUpcoming([futureSitting], [futureSeed], new Date('2026-09-02T12:00:00Z'));
    assert.deepEqual(resolved, { kind: 'sitting', eventId: 'future-workshop' });
  });
});

describe('lexicon', () => {
  it('keeps forbidden words out of public strings except the Never column', () => {
    for (const value of publicStrings()) {
      assert.equal(FORBIDDEN.test(value), false, `forbidden word in: ${value}`);
    }
  });

  it('lists the locked Never terms', () => {
    assert.deepEqual([...copy.lexicon.never], [
      'convenor',
      'chapter',
      'tracker',
      'society',
      'forum',
    ]);
  });

  it('uses the locked Yale line', () => {
    assert.equal(copy.yaleLine, 'New York City, with Yale students joining from New Haven.');
  });
});

describe('offer book', () => {
  it('has no membership or payment gate in public copy', () => {
    assert.match(copy.offerBookLede, /not required/i);
    assert.equal(GATE.test(copy.offerBookLede), false);
    assert.equal(MONEY.test(copy.offerBookLede), false);
    for (const offer of offers) {
      assert.equal(GATE.test(offer.summary), false, offer.id);
      assert.equal(/ref\.|referr/i.test(offer.officialUrl), false, offer.id);
    }
  });

  it('keeps closed items visible with dates', () => {
    const closed = offers.filter((o) => o.status === 'closed');
    assert.ok(closed.length >= 1);
    for (const offer of closed) {
      assert.ok(offer.closedOn);
    }
  });

  it('points terms back to the student-tools notes', () => {
    assert.equal(copy.offerBookSource.includes('not a second list'), true);
  });
});

describe('events link out', () => {
  it('sends every sitting to an organiser URL', () => {
    for (const sitting of sittings) {
      assert.match(sitting.organiserUrl, /^https?:\/\//i);
      assert.equal(sitting.organiserUrl.startsWith('/'), false);
    }
  });

  it('marks mapped seed facts as inferred', () => {
    for (const sitting of sittings) {
      assert.equal(sitting.inferred, true);
    }
  });
});

describe('preview isolation', () => {
  it('does not change the personal homepage title', () => {
    const home = readFileSync(join(root, 'src/pages/index.astro'), 'utf8');
    assert.match(home, /Systems thinking/);
    assert.doesNotMatch(home, /The room is the product/);
  });

  it('does not change the Pages deploy workflow', () => {
    const deploy = readFileSync(join(root, '.github/workflows/deploy.yml'), 'utf8');
    assert.match(deploy, /branches:\n {6}- main/);
    assert.doesNotMatch(deploy, /brain/);
  });

  it('keeps BRAIN pages under src/pages/brain', () => {
    const pages = walk(join(root, 'src/pages/brain'));
    assert.ok(pages.some((p) => p.endsWith('index.astro')));
    assert.ok(pages.some((p) => p.endsWith('offers.astro')));
    assert.ok(pages.some((p) => p.endsWith('docket.astro')));
    assert.ok(pages.some((p) => p.endsWith('brief.astro')));
  });
});
