import type Store from '../../lib/store/store';
import type { Category } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';

export const create = (store: Store<State>) =>
  (category: { title: string; card?: string; colour?: string }): void => {
    store.set(produce(draft => {
      const id = crypto.randomUUID();

      draft.entity.category[id] = { id, title: category.title, colour: category.colour ?? '#fff' };
      if (typeof category.card === 'string') draft.entity.card[category.card].categories.push(id);
    }));
  };

export const update = (store: Store<State>) =>
  (id: string) =>
    (category: Partial<Omit<Category, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof category.title === 'string') {
          draft.entity.category[id].title = category.title;
        }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entity.category[id];

      Object.values(draft.entity.card)
        .filter(card => card.categories.includes(id))
        .forEach(card => {
          const i = draft.entity.card[card.id].categories.indexOf(id);
          draft.entity.card[card.id].categories.splice(i, 1);
        });
    }));
  };

export const toggle = (store: Store<State>) =>
  (id: { category: string; card: string }): void => {
    store.set(produce(draft => {
      if (!draft.entity.card[id.card].categories.includes(id.category)) {
        draft.entity.card[id.card].categories.push(id.category);
      } else {
        const i = draft.entity.card[id.card].categories.indexOf(id.category);
        draft.entity.card[id.card].categories.splice(i, 1);
      }
    }));
  };
