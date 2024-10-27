import type Store from '../../lib/store/store';
import type { State } from '../state';
import type { Lane } from '../entities';

import { produce } from 'immer';
import uid from '../../lib/uid/uid';
import clamp from '../../lib/math/clamp';

export const create = (store: Store<State>) =>
  (board: string) =>
    (title: string): void => {
      store.set(produce(draft => {
        const id = uid();

        draft.entity.lane[id] = { id, title, cards: [] };
        draft.entity.board[board].lanes.push(id);
      }));
    };

export const update = (store: Store<State>) =>
  (id: string) =>
    (lane: Partial<Omit<Lane, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof lane.title === 'string') {
          draft.entity.lane[id].title = lane.title.trim();
        }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entity.lane[id];

      Object.values(draft.entity.board)
        .filter(board => board.lanes.includes(id))
        .forEach(board => {
          const i = draft.entity.board[board.id].lanes.indexOf(id);
          draft.entity.board[board.id].lanes.splice(i, 1);
        });
    }));
  };

export const move = (store: Store<State>) =>
  (id: { lane: string; board?: string }) =>
    (to: number) => {
      store.set(produce(draft => {
        const from = typeof id.board === 'string' ?
          draft.entity.board[id.board] :
          Object.values(draft.entity.board).find(x => x.lanes.includes(id.lane));

        if (!from) {
          // If a lane does not have a board, it is orphaned and should be deleted
          delete draft.entity.lane[id.lane];
        } else {
          const i = from.lanes.indexOf(id.lane);

          draft.entity.board[from.id].lanes.splice(i, 1);
          draft.entity.board[from.id].lanes.splice(
            clamp(0, draft.entity.board[from.id].lanes.length, i + to),
            0,
            id.lane
          );
        }
      }));
    };
