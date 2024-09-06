import { produce } from 'immer';

import store from '../store';

export const create = (lane: string) =>
  (title: string) =>
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.cards[id] = { id, title };
      draft.card_lane.push({ card: id, lane });
    }));

export const remove = (id: string) => store.set(produce(draft => {
  delete draft.cards[id];

  const i = draft.card_lane.findIndex(x => x.card === id);
  if (i >= 0) draft.card_lane.splice(i, 1);
}));
