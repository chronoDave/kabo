import { z } from 'zod';

import { card, lane, board } from './entities';

const id = {
  board: crypto.randomUUID(),
  lane: crypto.randomUUID()
};

export const state = z.object({
  entities: z.object({
    card: z.record(z.string(), card),
    lane: z.record(z.string(), lane),
    board: z.record(z.string(), board)
  }).default({
    card: {},
    lane: {
      [id.lane]: {
        id: id.lane,
        title: 'To-do',
        board: id.board
      }
    },
    board: {
      [id.board]: {
        id: id.board,
        title: 'New board'
      }
    }
  }),
  active: z.object({
    board: z.string().optional()
  }).default({
    board: id.board
  })
});

export type State = z.infer<typeof state>;
