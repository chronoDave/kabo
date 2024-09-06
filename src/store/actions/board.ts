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
