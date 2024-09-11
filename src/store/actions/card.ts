import type Store from '../../lib/store/store';
import type { Card } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';
import clamp from '../../lib/math/clamp';

export const create = (store: Store<State>) =>
  (lane: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = crypto.randomUUID();

        draft.entities.card[id] = {
          id,
          title,
          lane,
          order: Object.keys(draft.entities.card).length
        };
      }));
    };

export const update = (store: Store<State>) =>
  (id: string) =>
    (next: Partial<Omit<Card, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof next.title === 'string') draft.entities.card[id].title = next.title.trim();
        if (typeof next.lane === 'string') draft.entities.card[id].lane = next.lane;
        // if (typeof next.order === 'number') {
        //   const current = draft.entities.card[id];
        //   const cards = Object.values(draft.entities.card).filter(card => card.lane === current.lane);
        //   const order = clamp(0, cards.length - 1, next.order);

        //   if (current.order !== order) {
        //     const min = Math.min(current.order, order);
        //     const max = Math.max(current.order, order);

        //     console.log({ min, max });

        //     cards.forEach(card => {
        //       if (card.order >= min && card.order < max) {
        //         draft.entities.card[card.id].order += 1;
        //       }
        //     });

        //     draft.entities.card[id].order = order;
        //   }
        // }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entities.card[id];
    }));
  };
