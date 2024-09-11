import deepEqual from 'fast-deep-equal';

import { selector } from '../../store/store';

export default selector(state => () => ({
  boards: Object.values(state.entities.board).map(board => ({
    id: board.id,
    title: board.title
  })),
  active: state.active.board
}), ({ previous, current }) => {
  if (previous.active !== current.active) return true;
  return deepEqual(previous.entities.board, current.entities.board);
});