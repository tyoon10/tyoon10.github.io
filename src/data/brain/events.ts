import { events, type SiteEvent } from '../events.ts';
import { nextHeld } from './copy.ts';
import {
  REGISTER_LABEL,
  SITTING_FORMATS,
  type UpcomingResolution,
} from './types.ts';

const HELD_SEPTEMBER = nextHeld;

export interface BrainEvent extends SiteEvent {
  id: string;
  brain: NonNullable<SiteEvent['brain']>;
}

export function isBrainEvent(event: SiteEvent): event is BrainEvent {
  return Boolean(event.id && event.brain);
}

export function brainEvents(source: SiteEvent[] = events): BrainEvent[] {
  return source.filter(isBrainEvent);
}

export function startOfDayUtc(isoDate: string): number {
  return Date.parse(`${isoDate.slice(0, 10)}T00:00:00.000Z`);
}

/** Upcoming always resolves: a future sitting, or the September held line. Never past-as-upcoming. */
export function resolveUpcoming(
  source: SiteEvent[] = events,
  now: Date = new Date(),
): UpcomingResolution {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const future = brainEvents(source)
    .filter((event) => startOfDayUtc(event.date) >= today)
    .sort((a, b) => startOfDayUtc(a.date) - startOfDayUtc(b.date));

  const next = future[0];
  if (next) return { kind: 'sitting', eventId: next.id };
  return { kind: 'held', message: HELD_SEPTEMBER };
}

export function upcomingEvent(
  source: SiteEvent[] = events,
  now: Date = new Date(),
): BrainEvent | undefined {
  const resolved = resolveUpcoming(source, now);
  if (resolved.kind !== 'sitting') return undefined;
  return brainEvents(source).find((event) => event.id === resolved.eventId);
}

export function archiveEvents(
  source: SiteEvent[] = events,
  now: Date = new Date(),
): BrainEvent[] {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return brainEvents(source)
    .filter((event) => startOfDayUtc(event.date) < today)
    .sort((a, b) => startOfDayUtc(b.date) - startOfDayUtc(a.date));
}

export function registerLabel(event: BrainEvent): string {
  return REGISTER_LABEL[event.brain.registerState];
}

export function isExternalOrganiserUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function assertSittingFormat(value: string): boolean {
  return (SITTING_FORMATS as readonly string[]).includes(value);
}
