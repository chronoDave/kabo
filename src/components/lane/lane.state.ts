import deepEqual from 'fast-deep-equal';

import { Lane } from '../../store/entities';
import { selector } from '../../store/store';

type State = {
  lane: Lane | null;
  cards: string[];
};

export default selector<string, State>(state => id => ({
  lane: state.lanes[id],
  cards: Object.values(state.cards).reduce<string[]>((acc, cur) => {
    if (cur.lane === id) acc.push(cur.id);
    return acc;
  }, [])
}), ({ current, previous }) => {
  if (Object.keys(previous.cards).length !== Object.keys(current.cards).length) return true;
  if (!deepEqual(previous.lanes, current.lanes)) return true;
  return false;
});