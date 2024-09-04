import { produce } from 'immer';

import store from '../store';

export const create = (lane: string) =>
  (title: string) =>
    store.set(produce(draft => {
      const uid = crypto.randomUUID();

      draft.lanes[lane].cards.push(uid);
      draft.cards[uid] = {
        id: uid,
        title
      }
    }));