import { produce } from 'immer';

import store from '../store';

export const create = (board: string) =>
  (title: string) =>
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.lanes[id] = { id, title };
      draft.lane_board.push({ lane: id, board });
    }));
