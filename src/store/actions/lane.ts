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
        const i = typeof to.lane === 'string' ?
          draft.entity.board[to.board ?? from.id].lanes.indexOf(to.lane) :
          from.lanes.indexOf(id) + (to.n ?? 0);
        const j = clamp(0, draft.entity.board[to.board ?? from.id].lanes.length, i);

        draft.entity.board[from.id].lanes.splice(i, 1);
        draft.entity.board[to.board ?? from.id].lanes.splice(j, 0, id);
      }
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.lane[id];
  };
