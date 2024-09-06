import deepEqual from 'fast-deep-equal';
import { Board } from '../../store/entities';

import { selector } from '../../store/store';

type State = {
  board: Board | null;
  lanes: string[];
};

export default selector<string, State>(state => id => ({
  board: state.boards[id],
  lanes: Object.values(state.lanes).reduce<string[]>((acc, cur) => {
    if (cur.board === id) acc.push(cur.id);
    return acc;
  }, [])
}), ({ current, previous }) => {
  if (Object.keys(previous.lanes).length !== Object.keys(current.lanes).length) return true;
  if (!deepEqual(previous.boards, current.boards)) return true;
  return false;
});