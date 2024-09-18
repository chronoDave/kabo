import type Store from '../../lib/store/store';
import type { Card } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (lane: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = crypto.randomUUID();

        draft.entity.card[id] = { id, title };
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
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string, x?: string): void => {
    store.set(produce(draft => {
      delete draft.entity.card[id];

      const lane = typeof x === 'string' ?
        draft.entity.lane[x] :
        Object.values(draft.entity.lane).find(x => x.cards.includes(id));

      if (lane) {
        const i = draft.entity.lane[lane.id].cards.indexOf(id);
        draft.entity.lane[lane.id].cards.splice(i, 1);
      }
    }));
  };
