import type { Category } from '../../store/entities';

import deepEqual from 'fast-deep-equal';

import Colour from '../../lib/colour/colour';
import { selector } from '../../store/store';

export type State = {
  category: Category;
  colour: {
    background: string;
    text: string;
  };
};

export default selector<string, State | null>(
  state => id => {
    if (!state?.entity.category[id]) return null;

    const category = state.entity.category[id];
    const colour = Colour.fromHex(category.colour);
    const black = Colour.fromHex('#000');
    const white = Colour.fromHex('#fff');
    const text = colour.contrast(black) > colour.contrast(white) ?
      black.hex() :
      white.hex();

    return {
      category,
      colour: {
        background: colour.hex(),
        text
      }
    };
  },
  ({ previous, current }) => !deepEqual(previous?.entity.category, current.entity.category)
);
