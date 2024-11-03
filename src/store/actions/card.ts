import type { Card } from '../entities';
import type { State } from '../state';
import type { Draft } from 'immer';

import clamp from '../../lib/math/clamp';

export const create = (card: Card) =>
  (draft: Draft<State>) => {
    draft.entity.card[card.id] = card;
  };

export const setTitle = (id: string) =>
  (title: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.card[id].title = title;
    };

export const setDescription = (id: string) =>
  (description: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.card[id].description = description;
    };

export const addCategory = (id: string) =>
  (category: string) =>
    (draft: Draft<State>) => {
      if (!draft.entity.card[id].categories.includes(category)) {
        draft.entity.card[id].categories.push(category);
      }
    };

export const removeCategory = (id: string) =>
  (category: string) =>
    (draft: Draft<State>) => {
      const i = draft.entity.card[id].categories.indexOf(category);
      draft.entity.card[id].categories.splice(i, 1);
    };

export const move = (id: string) =>
  (to: { card?: string; lane?: string; n?: number }) =>
    (draft: Draft<State>) => {
      const from = Object.values(draft.entity.lane)
        .find(x => x.cards.includes(id));

      if (!from) {
        // If a card does not have a lane, it is orphaned and should be deleted
        console.warn(`Found detached card: ${id}`);
        delete draft.entity.card[id];
      } else {
        const i = typeof to.card === 'string' ?
          draft.entity.lane[to.lane ?? from.id].cards.indexOf(to.card) :
          from.cards.indexOf(id) + (to.n ?? 0);
        const j = clamp(0, draft.entity.lane[to.lane ?? from.id].cards.length, i);

        draft.entity.lane[from.id].cards.splice(i, 1);
        draft.entity.lane[to.lane ?? from.id].cards.splice(j, 0, id);
      }
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.card[id];
  };
