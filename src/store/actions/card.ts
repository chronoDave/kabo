import type Store from '../../lib/store/store';
import type { Card } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (lane: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = crypto.randomUUID();

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
