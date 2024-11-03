import { produce } from 'immer';
import store, { selector } from '../../../store/store';
import * as actions from '../../../store/actions';

export default selector(state => () => state?.active.board);

export const remove = (board: string) => {
  store.set(produce(draft => {
    draft.entity.board[board].lanes.forEach(lane => {
      draft.entity.lane[lane].cards.forEach(card => {
        actions.lane.removeCard(lane)(card)(draft);
      });

      actions.board.removeLane(board)(lane);
    });

    actions.board.remove(board)(draft);

    const id = Object.keys(draft.entity.board)
      .find(x => x !== board) ?? null;

    actions.active.board(id)(draft);
  }));
};
