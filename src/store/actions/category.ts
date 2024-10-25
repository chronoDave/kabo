import type Store from '../../lib/store/store';
import type { Category } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';
import uid from '../../lib/uid/uid';

export const create = (store: Store<State>) =>
  (category: { title: string; card?: string; colour?: string }): void => {
    store.set(produce(draft => {
      const id = uid();

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

        if (typeof category.colour === 'string') {
          draft.entity.category[id].colour = category.colour;
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
