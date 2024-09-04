import { produce } from 'immer';

import store from '../store';

export const create = (board: string) =>
  (title: string) =>
    store.set(produce(draft => {
      const uid = crypto.randomUUID();

      draft.boards[board].lanes.push(uid);
      draft.lanes[uid] = {
        id: uid,
        title,
        cards: []
      }
    }));
