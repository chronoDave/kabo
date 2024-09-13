import { z } from 'zod';

import { card, lane, board } from './entities';

const id = {
  board: crypto.randomUUID(),
  lane: crypto.randomUUID(),
  card: crypto.randomUUID()
};

export const state = z.object({
  entity: z.object({
    card: z.record(z.string(), card),
    lane: z.record(z.string(), lane),
    board: z.record(z.string(), board)
  })
    .default({
      card: {
        [id.card]: {
          id: id.card, title: 'New card'
        }
      },
      lane: {
        [id.lane]: {
          id: id.lane, title: 'New lane', cards: [id.card]
        }
      },
      board: {
        [id.board]: {
          id: id.board, title: 'New board', lanes: [id.lane]
        }
      }
    }),
  active: z.object({
    board: z.string().optional()
  })
    .default({
      board: id.board
    })
});

export type State = z.infer<typeof state>;
