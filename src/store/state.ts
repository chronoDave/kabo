import { z } from 'zod';

import { card, lane, board } from './entities';

const id = crypto.randomUUID();

export const state = z.object({
  cards: z.record(z.string(), card).default({}),
  lanes: z.record(z.string(), lane).default({}),
  boards: z.record(z.string(), board).default({
    [id]: {
      id,
      title: 'New board'
    }
  }),
  active: z.object({
    board: z.string().optional()
  }).default({
    board: id
  })
});

export type State = z.infer<typeof state>;
