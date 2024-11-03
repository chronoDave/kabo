import type { Draft} from 'immer';
import type { Category } from '../entities';
import type { State } from '../state';

import Colour from '../../lib/colour/colour';

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
  (background: string) =>
    (draft: Draft<State>) => {
      const colour = Colour.fromHex(background);
      const black = new Colour({ r: 0, g: 0, b: 0 });
      const white = new Colour({ r: 255, g: 255, b: 255 });
      const text = colour.contrast(black) > colour.contrast(white) ?
        black.hex :
        white.hex;

      draft.entity.category[id].colour = {
        background,
        text
      };
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.category[id];
  };
