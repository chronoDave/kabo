import type { State } from '../state';
import type Store from '../../lib/store/store';

import { produce } from 'immer';

export const set = (store: Store<State>) =>
  (active: keyof State['active']) =>
    (id: string | null): void => {
      store.set(produce(draft => {
        if (typeof id === 'string') {
          draft.active[active] = id;
        } else {
          delete draft.active[active];
        }
      }));
    };
