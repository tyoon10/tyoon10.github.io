import { events, type SiteEvent } from '../events.ts';
import { nextHeld } from './copy.ts';
import { sittings } from './load.ts';
import {
  REGISTER_LABEL,
  type SittingRecord,
  type UpcomingResolution,
} from './schema.ts';

export interface BrainEvent extends SittingRecord {
  title: string;
  date: string;
  location: string;
  seed: SiteEvent;
}

export function findSeed(sitting: SittingRecord, source: SiteEvent[] = events): SiteEvent | undefined {
  return source.find(
    (event) => event.title === sitting.seedTitle && event.date === sitting.seedDate,
  );
}

export function brainEvents(
  records: SittingRecord[] = sittings,
  source: SiteEvent[] = events,
): BrainEvent[] {
  return records.flatMap((sitting) => {
    const seed = findSeed(sitting, source);
    if (!seed) return [];
    return [{
      ...sitting,
      title: seed.title,
      date: seed.date,
      location: seed.location,
      seed,
    }];
  });
}

export function startOfDayUtc(isoDate: string): number {
  return Date.parse(`${isoDate.slice(0, 10)}T00:00:00.000Z`);
}

/** Upcoming always resolves: a future sitting, or the September held line. Never past-as-upcoming. */
export function resolveUpcoming(
  records: SittingRecord[] = sittings,
  source: SiteEvent[] = events,
  now: Date = new Date(),
): UpcomingResolution {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const future = brainEvents(records, source)
    .filter((event) => startOfDayUtc(event.date) >= today)
    .sort((a, b) => startOfDayUtc(a.date) - startOfDayUtc(b.date));

  const next = future[0];
  if (next) return { kind: 'sitting', eventId: next.id };
  return { kind: 'held', message: nextHeld };
}

export function upcomingEvent(
  records: SittingRecord[] = sittings,
  source: SiteEvent[] = events,
  now: Date = new Date(),
): BrainEvent | undefined {
  const resolved = resolveUpcoming(records, source, now);
  if (resolved.kind !== 'sitting') return undefined;
  return brainEvents(records, source).find((event) => event.id === resolved.eventId);
}

export function archiveEvents(
  records: SittingRecord[] = sittings,
  source: SiteEvent[] = events,
  now: Date = new Date(),
): BrainEvent[] {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return brainEvents(records, source)
    .filter((event) => startOfDayUtc(event.date) < today)
    .sort((a, b) => startOfDayUtc(b.date) - startOfDayUtc(a.date));
}

export function registerLabel(event: SittingRecord): string {
  return REGISTER_LABEL[event.registerState];
}

export function isExternalOrganiserUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
