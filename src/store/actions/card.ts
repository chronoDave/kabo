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

export const addTask = (id: string) =>
  (task: string) =>
    (draft: Draft<State>) => {
      if (!draft.entity.card[id].tasks.includes(task)) {
        draft.entity.card[id].tasks.push(task);
      }
    };

export const removeTask = (id: string) =>
  (task: string) =>
    (draft: Draft<State>) => {
      const i = draft.entity.card[id].tasks.indexOf(task);
      draft.entity.card[id].tasks.splice(i, 1);
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
        const laneToCard = typeof to.card === 'string' ?
          Object.values(draft.entity.lane).find(x => x.cards.includes(to.card as unknown as string)) : null;
        const laneToLane = draft.entity.lane[to.lane ?? from.id];
        const lane = laneToCard ?? laneToLane;

        const i = from.cards.indexOf(id); // Current index
        const j = clamp(
          0,
          draft.entity.lane[lane.id].cards.length,
          typeof to.card === 'string' ?
            draft.entity.lane[lane.id].cards.indexOf(to.card) :
            i + (to.n ?? 0)
        ); // New index

        draft.entity.lane[from.id].cards.splice(i, 1); // Remove current card
        draft.entity.lane[lane.id].cards.splice(j, 0, id); // Add current card
      }
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.card[id];
  };
