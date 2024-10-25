import { z } from 'zod';
import uid from '../lib/uid/uid';

import {
  card,
  lane,
  board,
  task,
  category
} from './entities';

const id = {
  board: uid(),
  lane: uid(),
  card: uid(),
  task: uid(),
  category: uid()
};

export const state = z.object({
  entity: z.object({
    board: z.record(z.string(), board),
    lane: z.record(z.string(), lane),
    card: z.record(z.string(), card),
    task: z.record(z.string(), task),
    category: z.record(z.string(), category)
  })
    .default({
      category: {
        [id.category]: {
          id: id.category,
          title: 'New category',
          colour: '#fff'
        }
      },
      task: {
        [id.task]: {
          id: id.task, title: 'New task'
        }
      },
      card: {
        [id.card]: {
          id: id.card,
          title: 'New card',
          tasks: [id.task],
          categories: [id.category]
        }
      },
      lane: {
        [id.lane]: {
          id: id.lane,
          title: 'New lane',
          cards: [id.card]
        }
      },
      board: {
        [id.board]: {
          id: id.board,
          title: 'New board',
          lanes: [id.lane]
        }
      }
    }),
  active: z.object({
    board: z.string().optional(),
    collapse: z.string().optional(),
    menu: z.string().optional()
  })
    .default({
      board: id.board
    })
});

export type State = z.infer<typeof state>;
