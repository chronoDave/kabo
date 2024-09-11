import type { State } from '../state';
import type Store from '../../lib/store/store';

import { produce } from 'immer';

export const set = (store: Store<State>) =>
  (active: keyof State['active']) =>
    (id: string): void => {
      store.set(produce(draft => {
        draft.active[active] = id;
      }));
    };
