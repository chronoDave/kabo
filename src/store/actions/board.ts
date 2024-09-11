import type Store from '../../lib/store/store';
import type { State } from '../state';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (title: string): void => {
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.entities.board[id] = { id, title };
      draft.active.board = id;
    }));
  };


export const update = (store: Store<State>) =>
  (id: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        draft.entities.board[id].title = title;
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entities.board[id];
      delete draft.active.board;

      const keys = Object.keys(draft.entities.board);
      if (keys.length > 0) draft.active.board = keys[keys.length - 1];

      Object.values(draft.entities.lane).forEach(lane => {
        if (lane.board === id) {
          delete draft.entities.lane[lane.id];

          Object.values(draft.entities.card).forEach(card => {
            if (card.lane === lane.id) delete draft.entities.card[card.id];
          });
        }
      });
    }));
  };
