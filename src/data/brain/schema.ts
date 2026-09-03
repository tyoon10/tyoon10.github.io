import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');
const httpUrl = z
  .string()
  .url()
  .refine((value) => /^https?:\/\//i.test(value), 'must be http(s)');

const noReferral = (url: string) => !/ref\.|referr/i.test(url);

export const SITTING_FORMATS = [
  'workshop',
  'fireside chat',
  'company visit',
  'hackathon',
  'pitch competition',
] as const;

export const CHAIR_ROLES = ['chair', 'co-chair', 'docket'] as const;
export const REGISTER_STATES = ['open', 'waitlist', 'closed', 'details'] as const;
export const REGISTER_LABEL: Record<(typeof REGISTER_STATES)[number], string> = {
  open: 'Register',
  waitlist: 'Join waitlist',
  closed: 'Closed',
  details: 'View details',
};

export const CHIP_STATUSES = ['ship', 'assemble', 'new', 'hold'] as const;
export const SCHOOL_IDS = ['columbia', 'nyu', 'cornell-tech', 'yale'] as const;

export const offerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  offer: z.string().min(1),
  category: z.string().min(1),
  status: z.enum(['live', 'closed', 'held']),
  timeToValue: z.number().int().nonnegative(),
  lastVerified: isoDate,
  closedOn: isoDate.optional(),
  officialUrl: httpUrl.refine(noReferral, 'referral URLs are forbidden'),
  summary: z.string(),
  inferred: z.literal(true).optional(),
}).refine(
  (offer) => offer.status !== 'closed' || Boolean(offer.closedOn),
  { message: 'closed items need closedOn', path: ['closedOn'] },
);

export const offersFileSchema = z.object({
  source: z.literal('/writings/student-ai-tools/'),
  sourceVerified: isoDate,
  note: z.string(),
  items: z.array(offerSchema),
});

export const programSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  surface: z.string().min(1),
  officialUrl: httpUrl.optional(),
  applicationWindow: z.object({
    state: z.enum(['open', 'closed', 'held']),
    asOf: isoDate.optional(),
    note: z.string(),
  }),
  publicRecord: z.string().optional(),
});

export const wireItemSchema = z.object({
  id: z.string().min(1),
  lane: z.enum(['student', 'industry']),
  state: z.enum(['held', 'ready']),
  title: z.string(),
  body: z.string(),
  date: isoDate.optional(),
  inferred: z.literal(true).optional(),
}).refine(
  (item) => item.state !== 'ready' || Boolean(item.body),
  { message: 'ready items need body', path: ['body'] },
);

export const partnerSchema = z
  .object({
    name: z.string().min(1),
    url: httpUrl.optional(),
    publicRecord: z.string().optional(),
  })
  .strict();

export const sittingSchema = z.object({
  id: z.string().min(1),
  seedTitle: z.string().min(1),
  seedDate: isoDate,
  format: z.enum(SITTING_FORMATS),
  chairRole: z.enum(CHAIR_ROLES),
  registerState: z.enum(REGISTER_STATES),
  organiserUrl: httpUrl,
  inferred: z.boolean().optional(),
});

export const schoolSchema = z.object({
  id: z.enum(SCHOOL_IDS),
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, 'must be #rrggbb'),
  officialUrl: httpUrl,
  geography: z.string().min(1),
});

export type Offer = z.infer<typeof offerSchema>;
export type OffersFile = z.infer<typeof offersFileSchema>;
export type Program = z.infer<typeof programSchema>;
export type WireItem = z.infer<typeof wireItemSchema>;
export type PublicPartner = z.infer<typeof partnerSchema>;
export type SittingRecord = z.infer<typeof sittingSchema>;
export type School = z.infer<typeof schoolSchema>;
export type SittingFormat = (typeof SITTING_FORMATS)[number];
export type ChairRole = (typeof CHAIR_ROLES)[number];
export type RegisterState = (typeof REGISTER_STATES)[number];
export type ChipStatus = (typeof CHIP_STATUSES)[number];
export type SchoolId = (typeof SCHOOL_IDS)[number];
export type OfferStatus = Offer['status'];
export type WireLane = WireItem['lane'];
export type WireState = WireItem['state'];

export type UpcomingResolution =
  | { kind: 'sitting'; eventId: string }
  | { kind: 'held'; message: string };
