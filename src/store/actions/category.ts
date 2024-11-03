import type { Draft} from 'immer';
import type { Category } from '../entities';
import type { State } from '../state';

export const create = (category: Category) =>
  (draft: Draft<State>) => {
    draft.entity.category[category.id] = category;
  };

export const setTitle = (id: string) =>
  (title: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.category[id].title = title;
    };

export const setColour = (id: string) =>
  (colour: string) =>
    (draft: Draft<State>) => {
      draft.entity.category[id].colour = colour;
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.category[id];
  };
