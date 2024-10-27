import type Store from '../../lib/store/store';
import type { Card } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';
import uid from '../../lib/uid/uid';
import clamp from '../../lib/math/clamp';

export const create = (store: Store<State>) =>
  (lane: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = uid();

        draft.entity.card[id] = { id, title, tasks: [], categories: [] };
        draft.entity.lane[lane].cards.push(id);
      }));
    };

export const update = (store: Store<State>) =>
  (id: string) =>
    (card: Partial<Omit<Card, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof card.title === 'string') {
          draft.entity.card[id].title = card.title.trim();
        }

        if (typeof card.description === 'string') {
          draft.entity.card[id].description = card.description.trim();
        }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entity.card[id];

      Object.values(draft.entity.lane)
        .filter(lane => lane.cards.includes(id))
        .forEach(lane => {
          const i = draft.entity.lane[lane.id].cards.indexOf(id);
          draft.entity.lane[lane.id].cards.splice(i, 1);
        });
    }));
  };

export const addCategory = (store: Store<State>) =>
  (card: string) =>
    (category: string) => store.set(produce(draft => {
      if (!draft.entity.card[card].categories.includes(category)) {
        draft.entity.card[card].categories.push(category);
      }
    }));

export const removeCategory = (store: Store<State>) =>
  (card: string) =>
    (category: string) => store.set(produce(draft => {
      const i = draft.entity.card[card].categories.indexOf(category);
      draft.entity.card[card].categories.splice(i, 1);
    }));

export const toggleCategory = (store: Store<State>) =>
  (card: string) =>
    (category: string) => store.set(produce(draft => {
      if (!draft.entity.card[card].categories.includes(category)) {
        draft.entity.card[card].categories.push(category);
      } else {
        const i = draft.entity.card[card].categories.indexOf(category);
        draft.entity.card[card].categories.splice(i, 1);
      }
    }));

export type Position = {
  lane?: string;
  card?: string;
  /** Relative position or card id */
  n?: number;
};

export const move = (store: Store<State>) =>
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