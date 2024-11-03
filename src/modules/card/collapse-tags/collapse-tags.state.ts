import { produce } from 'immer';

import store, { selector } from '../../../store/store';
import * as actions from '../../../store/actions';
import type { Category } from '../../../store/entities';
import uid from '../../../lib/uid/uid';

export default selector(state =>
  (id: string) =>
    Object.fromEntries(Object.keys(state?.entity.category ?? {})
      .map(category => [category, state?.entity.card[id]?.categories.includes(category)]))
);

export const deleteCategory = (category: string) => () => {
  store.set(produce(draft => {
    actions.category.remove(category)(draft);

    Object.keys(draft.entity.card).forEach(card => {
      if (draft.entity.card[card].categories.includes(category)) {
        actions.card.removeCategory(card)(category)(draft);
      }
    });
  }));
};

export const createCategory = () => {
  const category: Category = { id: uid() };

  store.set(produce(actions.category.create(category)));
};

export const updateCategoryColour = (category: string) =>
  (colour: string) => {
    store.set(produce(actions.category.setColour(category)(colour)));
  };

export const toggleCategory = (category: string) =>
  (card: string) => {
    store.set(produce(draft => {
      if (draft.entity.card[card].categories.includes(category)) {
        actions.card.removeCategory(card)(category)(draft);
      } else {
        actions.card.addCategory(card)(category)(draft);
      }
    }));
  };
