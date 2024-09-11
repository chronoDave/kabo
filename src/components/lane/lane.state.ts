import deepEqual from 'fast-deep-equal';

import { Lane } from '../../store/entities';
import { selector } from '../../store/store';

type State = {
  lane: Lane | null;
  cards: string[];
};

export default selector<string, State>(state => id => ({
  lane: state.entities.lane[id],
  cards: Object.values(state.entities.card)
    .filter(card => card.lane === id)
    .sort((a, b) => a.order - b.order)
    .map(card => card.id)
}), ({ current, previous }) => {
  if (Object.keys(previous.entities.card).length !== Object.keys(current.entities.card).length) return true;
  if (!deepEqual(previous.entities.lane, current.entities.lane)) return true;
  return false;
});