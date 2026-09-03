import offersFile from './public/offers.json' with { type: 'json' };
import programsFile from './public/programs.json' with { type: 'json' };
import wireFile from './public/wire.json' with { type: 'json' };
import sittingsFile from './public/events.json' with { type: 'json' };
import partnersFile from './public/partners.json' with { type: 'json' };
import schoolsFile from './public/schools.json' with { type: 'json' };
import {
  offersFileSchema,
  programSchema,
  sittingSchema,
  partnerSchema,
  schoolSchema,
  wireItemSchema,
  type Offer,
  type Program,
  type SittingRecord,
  type PublicPartner,
  type School,
  type WireItem,
} from './schema.ts';

export const offersCatalog = offersFileSchema.parse(offersFile);
export const offers: Offer[] = offersCatalog.items;
export const programs: Program[] = programSchema.array().parse(programsFile);
export const wire: WireItem[] = wireItemSchema.array().parse(wireFile);
export const sittings: SittingRecord[] = sittingSchema.array().parse(sittingsFile);
export const partners: PublicPartner[] = partnerSchema.array().parse(partnersFile);
export const schools: School[] = schoolSchema.array().parse(schoolsFile);

export const SOURCE_VERIFIED = offersCatalog.sourceVerified;
export const TERMS_SOURCE = offersCatalog.source;

export const liveOffers = offers.filter((offer) => offer.status === 'live');
export const liveOfferCount = liveOffers.length;

/** 11pm test: free / school-email claims first. Closed items sort last by timeToValue. */
export function offersByTimeToValue(source: Offer[] = offers): Offer[] {
  return source.slice().sort((a, b) => a.timeToValue - b.timeToValue);
}

export function tonightOffers(source: Offer[] = offers): Offer[] {
  return offersByTimeToValue(source).filter((offer) => offer.status === 'live' && offer.timeToValue <= 60);
}

export function closedOffers(source: Offer[] = offers): Offer[] {
  return source.filter((offer) => offer.status === 'closed');
}
