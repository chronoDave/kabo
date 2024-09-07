import { produce } from 'immer';
import { State } from '../state';

import store from '../store';

export const set = (active: keyof State['active']) =>
  (id: string) =>
    store.set(produce(draft => {
      draft.active[active] = id;
    }));
