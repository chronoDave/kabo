import { produce } from 'immer';

import store from '../store';

export const create = (lane: string) =>
  (title: string) =>
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.cards[id] = { id, title, lane };
    }));

export const remove = (id: string) => store.set(produce(draft => {
  delete draft.cards[id];
}));
