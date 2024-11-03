import type { Draft } from 'immer';
import type { Task } from '../entities';
import type { State } from '../state';

export const create = (task: Task) =>
  (draft: Draft<State>) => {
    draft.entity.task[task.id] = task;
  };

export const setTitle = (id: string) =>
  (title: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.task[id].title = title;
    };

export const setDone = (id: string) =>
  (done: boolean) =>
    (draft: Draft<State>) => {
      draft.entity.task[id].done = done;
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.task[id];
  };
