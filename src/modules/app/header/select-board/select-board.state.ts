import deepEqual from 'fast-deep-equal';
import { produce } from 'immer';

import store, { selector } from '../../../../store/store';
import * as actions from '../../../../store/actions';

export default selector(state => () => ({
  active: state?.active.board,
  boards: Object.values(state?.entity.board ?? {}).map(board => ({
    id: board.id,
    title: board.title
  }))
}), ({ previous, current }) => {
  if (previous?.active !== current.active) return true;
  return deepEqual(previous.entity.board, current.entity.board);
});

export const set = (board: string) => {
  store.set(produce(actions.active.board(board)));
};
