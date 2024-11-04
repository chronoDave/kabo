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
    collapse: r.String.optional()
  })
});

export type State = r.Static<typeof schema>;

const id = {
  board: uid(),
  lane: uid()
};

const state: State = {
  entity: {
    category: {},
    task: {},
    card: {},
    lane: {
      [id.lane]: {
        id: id.lane,
        cards: []
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

export default state;
