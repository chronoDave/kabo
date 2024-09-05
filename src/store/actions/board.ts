import { produce } from 'immer';

import store from '../store';

export const create = (title: string) =>
  store.set(produce(draft => {
    const id = crypto.randomUUID();

    draft.boards[id] = {
      id,
      title,
      lanes: []
    };
  }));

export const update = (board: string) =>
  (title: string) =>
    store.set(produce(draft => {
      draft.boards[board].title = title;
    }));
