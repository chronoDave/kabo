import { z } from 'zod';

import { card, lane, board } from './entities';

export const state = z.object({
  cards: z.record(z.string(), card).default({}),
  lanes: z.record(z.string(), lane).default({}),
  boards: z.record(z.string(), board).default({}),
  card_lane: z.array(z.object({
    card: z.string(),
    lane: z.string()
  })).default([]),
  lane_board: z.array(z.object({
    lane: z.string(),
    board: z.string()
  })).default([])
});

export type State = z.infer<typeof state>;
