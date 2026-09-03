import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import * as copy from '../src/data/brain/copy.ts';
import { brainEvents, resolveUpcoming } from '../src/data/brain/events.ts';
import { offers } from '../src/data/brain/offers.ts';
import { REGISTER_LABEL } from '../src/data/brain/types.ts';
import { validateBrainData } from '../src/data/brain/validate.ts';
import { events, type SiteEvent } from '../src/data/events.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FORBIDDEN = /\b(convenor|chapter|tracker|society|forum)\b/i;
const GATE = /\b(join now|become a member|members only|pay to (access|unlock)|wait for (an )?event)\b/i;
const BOX_OFFICE =
  /\b(ticket|tickets|checkout|paywall|buy a seat|paid seat|underwriter|underwriters|underwriting|commission|commissions|box office|membership)\b/i;

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else acc.push(path);
  }
  return acc;
}

function publicStrings(): string[] {
  const values: string[] = [
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
    copy.offerBookCountLabel(3),
    copy.programsLede,
    copy.programsEmpty,
    copy.briefHeld,
    copy.briefStudentLabel,
    copy.briefIndustryLabel,
    copy.partnersReserved,
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
    copy.personalSiteNote,
    ...copy.lexicon.use,
    ...copy.nav.map((n) => n.label),
    ...Object.values(copy.chipLabels),
  ];
  return values;
}

describe('BRAIN public modules', () => {
  it('validates offers, programs, wire, events, and partners', () => {
    assert.deepEqual(validateBrainData(), []);
  });

  it('keeps SiteEvent intact for the personal homepage', () => {
    const sample = events[0];
    assert.equal(typeof sample.title, 'string');
    assert.equal(typeof sample.role, 'string');
    assert.equal(typeof sample.date, 'string');
    assert.ok(Array.isArray(sample.links));
  });
});

describe('upcoming resolution', () => {
  it('resolves to the September held line when every sitting is past', () => {
    const resolved = resolveUpcoming(events, new Date('2026-09-02T12:00:00Z'));
    assert.equal(resolved.kind, 'held');
    if (resolved.kind === 'held') assert.equal(resolved.message, copy.nextHeld);
  });

  it('never treats a past sitting as upcoming', () => {
    const now = new Date('2026-09-02T12:00:00Z');
    const resolved = resolveUpcoming(events, now);
    if (resolved.kind === 'sitting') {
      const hit = brainEvents(events).find((e) => e.id === resolved.eventId);
      assert.ok(hit);
      assert.ok(Date.parse(`${hit.date}T00:00:00.000Z`) >= Date.UTC(2026, 8, 2));
    }
  });

  it('resolves a future sitting when one exists', () => {
    const future: SiteEvent = {
      id: 'future-workshop',
      title: 'Future workshop',
      role: 'Workshop',
      roleStyle: 'host',
      date: '2026-10-15',
      location: 'New York City',
      links: [],
      brain: {
        format: 'workshop',
        chairRole: 'chair',
        registerState: 'open',
        organiserUrl: 'https://example.com/sitting',
      },
    };
    const resolved = resolveUpcoming([future], new Date('2026-09-02T12:00:00Z'));
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
});

describe('offer book', () => {
  it('has no membership or payment gate in public copy', () => {
    assert.match(copy.offerBookLede, /door is free/i);
    assert.equal(GATE.test(copy.offerBookLede), false);
    assert.equal(BOX_OFFICE.test(copy.offerBookLede), false);
    for (const offer of offers) {
      assert.equal(GATE.test(offer.summary), false, offer.id);
      assert.equal(BOX_OFFICE.test(`${offer.offer} ${offer.summary}`), false, offer.id);
      assert.equal(/ref\.|referr/i.test(offer.officialUrl), false, offer.id);
    }
  });

  it('keeps the revenue stack off the public surface', () => {
    for (const value of publicStrings()) {
      assert.equal(BOX_OFFICE.test(value), false, `box-office or funding noun in: ${value}`);
    }
  });

  it('keeps closed items visible with dates', () => {
    const closed = offers.filter((o) => o.status === 'closed');
    assert.ok(closed.length >= 1);
    for (const offer of closed) {
      assert.ok(offer.closedOn);
    }
  });
});

describe('events link out', () => {
  it('sends every sitting to an organiser URL', () => {
    for (const event of brainEvents(events)) {
      assert.match(event.brain.organiserUrl, /^https?:\/\//i);
      assert.equal(event.brain.organiserUrl.startsWith('/'), false);
    }
  });
});

describe('preview isolation', () => {
  it('does not change the personal homepage title', () => {
    const home = readFileSync(join(root, 'src/pages/index.astro'), 'utf8');
    assert.match(home, /Systems thinking/);
    assert.doesNotMatch(home, /The room is the product/);
  });

  it('does not lock a homepage direction in public copy or nav', () => {
    const preview = walk(join(root, 'src/pages/brain'))
      .filter((p) => p.endsWith('.astro'))
      .map((p) => readFileSync(p, 'utf8'))
      .join('\n');
    const readme = readFileSync(join(root, 'README.md'), 'utf8');
    const tokens = readFileSync(join(root, 'src/styles/brain/tokens.json'), 'utf8');
    const blob = [preview, readme, tokens, ...publicStrings(), ...copy.nav.map((n) => n.label)].join('\n');
    assert.equal(copy.nav[0].label, 'Home');
    assert.match(tokens, /"homepageDirection": "open"/);
    assert.doesNotMatch(tokens, /"direction"\s*:/);
    assert.doesNotMatch(blob, /we chose Direction|the Table is the homepage|Direction 3|Convenor/i);
    assert.doesNotMatch(preview, /skyline|neural/);
  });

  it('keeps sitting outbound labels off the box office', () => {
    assert.equal(REGISTER_LABEL.open, 'View details');
    assert.equal(REGISTER_LABEL.waitlist, 'View details');
    assert.equal(REGISTER_LABEL.details, 'View details');
    assert.equal(REGISTER_LABEL.closed, 'Closed');
  });

  it('keeps BRAIN pages under src/pages/brain', () => {
    const pages = walk(join(root, 'src/pages/brain'));
    assert.ok(pages.some((p) => p.endsWith('index.astro')));
    assert.ok(pages.some((p) => p.endsWith('offers.astro')));
    assert.ok(pages.some((p) => p.endsWith('docket.astro')));
  });
});
