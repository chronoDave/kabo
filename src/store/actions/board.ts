import type Store from '../../lib/store/store';
import type { State } from '../state';
import type { Board } from '../entities';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (title: string): void => {
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.entity.board[id] = { id, title, lanes: [] };
      draft.active.board = id;
    }));
  };


export const update = (store: Store<State>) =>
  (id: string) =>
    (board: Partial<Omit<Board, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof board.title === 'string') {
          draft.entity.board[id].title = board.title.trim();
        }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entity.board[id];

      const keys = Object.keys(draft.entity.board);
      if (keys.length > 0) {
        draft.active.board = keys[keys.length - 1];
      } else {
        delete draft.active.board;
      }
    }));
  };
