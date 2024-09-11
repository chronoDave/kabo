import deepEqual from 'fast-deep-equal';
import type { Board } from '../../store/entities';

import { selector } from '../../store/store';

type State = {
  board: Board | null;
  lanes: string[];
};

export default selector<string, State>(state => id => ({
  board: state.entities.board[id],
  lanes: Object.values(state.entities.lane).reduce<string[]>((acc, cur) => {
    if (cur.board === id) acc.push(cur.id);
    return acc;
  }, [])
}), ({ current, previous }) => {
  if (Object.keys(previous.entities.lane).length !== Object.keys(current.entities.lane).length) return true;
  if (!deepEqual(previous.entities.board, current.entities.board)) return true;
  return false;
});