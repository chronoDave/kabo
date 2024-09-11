import type Store from '../../lib/store/store';
import type { State } from '../state';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (board: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = crypto.randomUUID();

        draft.entities.lane[id] = { id, title, board };
      }));
    };

export const update = (store: Store<State>) =>
  (id: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        draft.entities.lane[id].title = title;
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entities.lane[id];

      Object.values(draft.entities.card).forEach(card => {
        if (card.lane === id) delete draft.entities.card[card.id];
      });
    }));
  };
