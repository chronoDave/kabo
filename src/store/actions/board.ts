import type { State } from '../state';
import type { Board } from '../entities';

import type { Draft } from 'immer';

export const create = (board: Board) =>
  (draft: Draft<State>) => {
    draft.entity.board[board.id] = board;
  };

export const setTitle = (id: string) =>
  (title: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.board[id].title = title;
    };

export const setBackground = (id: string) =>
  (background: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.board[id].background = background;
    };

export const addLane = (id: string) =>
  (lane: string) =>
    (draft: Draft<State>) => {
      if (!draft.entity.board[id].lanes.includes(lane)) {
        draft.entity.board[id].lanes.push(lane);
      }
    };

export const removeLane = (id: string) =>
  (lane: string) =>
    (draft: Draft<State>) => {
      const i = draft.entity.board[id].lanes.indexOf(lane);
      draft.entity.board[id].lanes.splice(i, 1);
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.board[id];
  };
