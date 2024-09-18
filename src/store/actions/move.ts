import type Store from '../../lib/store/store';
import type { State } from '../state';

import { produce } from 'immer';
import clamp from '../../lib/math/clamp';

export type Position = {
  lane?: string;
  card?: string;
  /** Relative position or card id */
  n?: number;
};

export const card = (store: Store<State>) =>
  (id: { card: string; lane?: string }) =>
    (to: Position): void => {
      store.set(produce(draft => {
        const from = typeof id.lane === 'string' ?
          draft.entity.lane[id.lane] :
          Object.values(draft.entity.lane).find(x => x.cards.includes(id.card));

        if (!from) {
          // If a card does not have a lane, it is orphaned and should be deleted
          delete draft.entity.card[id.card];
        } else {
          const i = from.cards.indexOf(id.card);
          const j = typeof to.card === 'string' ?
            draft.entity.lane[to.lane ?? from.id].cards.indexOf(to.card) :
            i + (to.n ?? 0);

          draft.entity.lane[from.id].cards.splice(i, 1);
          draft.entity.lane[to.lane ?? from.id].cards.splice(
            clamp(0, draft.entity.lane[to.lane ?? from.id].cards.length, j),
            0,
            id.card
          );
        }
      }));
    };
