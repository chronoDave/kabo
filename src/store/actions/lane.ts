import type Store from '../../lib/store/store';
import type { State } from '../state';
import type { Lane } from '../entities';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (board: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = crypto.randomUUID();

        draft.entity.lane[id] = { id, title, cards: [] };
        draft.entity.board[board].lanes.push(id);
      }));
    };

export const update = (store: Store<State>) =>
  (id: string) =>
    (lane: Partial<Omit<Lane, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof lane.title === 'string') {
          draft.entity.lane[id].title = lane.title.trim();
        }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entity.lane[id];

      const board = Object.values(draft.entity.board).find(x => x.lanes.includes(id));
      if (board) {
        const i = draft.entity.board[board.id].lanes.indexOf(id);
        draft.entity.board[board.id].lanes.splice(i, 1);
      }
    }));
  };
