import { produce } from 'immer';
import type { Card, Lane } from '../../store/entities';

import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';
import uid from '../../lib/uid/uid';

export default selector<string, Lane | null>(
  state => id => state?.entity.lane[id] ?? null
);

export const setTitle = (lane: string) =>
  (title: string) => {
    store.set(produce(actions.lane.setTitle(lane)(title)));
  };

export const createCard = (lane: string, position: 'start' | 'end') => {
  const card: Card = { id: uid(), tasks: [], categories: [] };

  store.set(produce(draft => {
    actions.card.create(card)(draft);

    if (position === 'start') actions.lane.unshiftCard(lane)(card.id)(draft);
    if (position === 'end') actions.lane.pushCard(lane)(card.id)(draft);
  }));
};

export const moveLeft = (lane: string) => {
  store.set(produce(actions.lane.move(lane)({ n: -1 })));
};

export const moveRight = (lane: string) => {
  store.set(produce(actions.lane.move(lane)({ n: 1 })));
};

export const removeCard = (lane: string) =>
  (card: string) => {
    store.set(produce(draft => {
      actions.card.remove(card)(draft);
      actions.lane.removeCard(lane)(card)(draft);
    }));
  };
