import type Store from '../../lib/store/store';
import type { State } from '../state';

import { produce } from 'immer';
import clamp from '../../lib/math/clamp';

export type Position = {
  id: string;
  n: number;
};

export const card = (store: Store<State>) =>
  (id: string) =>
    (from: Position) =>
      (to: Position): void => {
        store.set(produce(draft => {
          const prev = draft.entity.lane[from.id].cards;
          const next = draft.entity.lane[to.id].cards;

          draft.entity.lane[from.id].cards.splice(
            clamp(0, prev.length - 1, from.n),
            1
          );

          draft.entity.lane[to.id].cards.splice(
            clamp(0, next.length, to.n),
            0,
            id
          );
        }));
      };
