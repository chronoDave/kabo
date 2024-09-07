import { produce } from 'immer';

import store from '../store';

export const create = (board: string) =>
  (title: string) =>
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.lanes[id] = { id, title, board };
    }));

export const update = (id: string) =>
  (title: string) =>
    store.set(produce(draft => {
      draft.lanes[id].title = title;
    }));

export const remove = (id: string) => store.set(produce(draft => {
  delete draft.lanes[id];

  Object.values(draft.cards).forEach(card => {
    if (card.lane === id) delete draft.cards[card.id];
  });
}));
