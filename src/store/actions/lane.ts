import type { State } from '../state';
import type { Lane } from '../entities';
import type { Draft} from 'immer';
import clamp from '../../lib/math/clamp';

export const create = (lane: Lane) =>
  (draft: Draft<State>) => {
    draft.entity.lane[lane.id] = lane;
  };

export const setTitle = (id: string) =>
  (title: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.lane[id].title = title;
    };

export const addCard = (id: string) =>
  (card: string) =>
    (draft: Draft<State>) => {
      if (!draft.entity.lane[id].cards.includes(card)) {
        draft.entity.lane[id].cards.push(card);
      }
    };

export const removeCard = (id: string) =>
  (card: string) =>
    (draft: Draft<State>) => {
      const i = draft.entity.lane[id].cards.indexOf(card);
      draft.entity.lane[id].cards.splice(i, 1);
    };

export const move = (id: string) =>
  (to: { lane?: string; board?: string; n?: number }) =>
    (draft: Draft<State>) => {
      const from = Object.values(draft.entity.board)
        .find(x => x.lanes.includes(id));

      if (!from) {
        // If a lane does have a board, it is orphaned and should be deleted
        console.warn(`Found detached lane: ${id}`);
        delete draft.entity.lane[id];
      } else {
        const boardToLane = typeof to.lane === 'string' ?
          Object.values(draft.entity.board).find(x => x.lanes.includes(to.lane as unknown as string)) : null;
        const boardToBoard = draft.entity.board[to.board ?? from.id];
        const board = boardToLane ?? boardToBoard;

        const i = from.lanes.indexOf(id); // Current index
        const j = clamp(
          0,
          draft.entity.board[board.id].lanes.length,
          typeof to.lane === 'string' ?
            draft.entity.board[board.id].lanes.indexOf(to.lane) :
            i + (to.n ?? 0)
        ); // New index

        draft.entity.board[from.id].lanes.splice(i, 1); // Remove current lane
        draft.entity.board[board.id].lanes.splice(j, 0, id); // Add current lane
      }
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.lane[id];
  };
