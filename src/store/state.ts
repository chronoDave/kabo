import { z } from 'zod';

import { card, lane, board } from './entities';

export const state = z.object({
  cards: z.record(z.string(), card).default({}),
  lanes: z.record(z.string(), lane).default({}),
  boards: z.record(z.string(), board).default({})
});

export type State = z.infer<typeof state>;
