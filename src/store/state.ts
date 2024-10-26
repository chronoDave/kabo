import * as r from 'runtypes';
import uid from '../lib/uid/uid';

import {
  card,
  lane,
  board,
  task,
  category
} from './entities';

export const schema = r.Record({
  entity: r.Record({
    board: r.Dictionary(board, r.String),
    lane: r.Dictionary(lane, r.String),
    card: r.Dictionary(card, r.String),
    task: r.Dictionary(task, r.String),
    category: r.Dictionary(category, r.String)
  }),
  active: r.Record({
    board: r.String.optional(),
    collapse: r.String.optional(),
    menu: r.String.optional()
  })
});

export type State = r.Static<typeof schema>;

const id = {
  board: uid(),
  lane: uid(),
  card: uid(),
  task: uid(),
  category: uid()
};

export const state: State = {
  entity: {
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
  },
  active: {
    board: id.board
  }
};
