import { produce } from 'immer';
import store, { selector } from '../../../store/store';
import * as actions from '../../../store/actions';

export default selector(state => () => state?.active.board);

export const remove = (board: string) => {
  store.set(produce(draft => {
    actions.board.remove(board)(draft);

    draft.entity.board[board].lanes.forEach(lane => {
      draft.entity.lane[lane].cards.forEach(card => {
        actions.lane.removeCard(lane)(card)(draft);
      });

      actions.board.removeLane(board)(lane);
    });
  }));
};
