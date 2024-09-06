import { produce } from 'immer';

import store from '../store';

export const create = (title: string) =>
  store.set(produce(draft => {
    const id = crypto.randomUUID();

    draft.boards[id] = { id, title };
  }));

export const update = (id: string) =>
  (title: string) =>
    store.set(produce(draft => {
      draft.boards[id].title = title;
    }));

export const remove = (id: string) => store.set(produce(draft => {
  delete draft.boards[id];

  Object.values(draft.lanes).forEach(lane => {
    if (lane.board === id) {
      delete draft.lanes[lane.id];

      Object.values(draft.cards).forEach(card => {
        if (card.lane === lane.id) delete draft.cards[card.id];
      });
    }
  });
}));
