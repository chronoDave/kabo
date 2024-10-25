import type Store from '../../lib/store/store';
import type { Task } from '../entities';
import type { State } from '../state';

import { produce } from 'immer';
import uid from '../../lib/uid/uid';

export const create = (store: Store<State>) =>
  (card: string) =>
    (title: string): void => {
      const id = uid();

      store.set(produce(draft => {
        draft.entity.task[id] = { id, title };
        draft.entity.card[card].tasks.push(id);
      }));
    };

export const update = (store: Store<State>) =>
  (id: string) =>
    (task: Partial<Omit<Task, 'id'>>): void => {
      store.set(produce(draft => {
        if (typeof task.title === 'string') {
          draft.entity.task[id].title = task.title;
        }

        if (typeof task.done === 'boolean') {
          draft.entity.task[id].done = task.done;
        }
      }));
    };

export const remove = (store: Store<State>) =>
  (id: string): void => {
    store.set(produce(draft => {
      delete draft.entity.task[id];

      Object.values(draft.entity.card)
        .filter(card => card.tasks.includes(id))
        .forEach(card => {
          const i = draft.entity.card[card.id].tasks.indexOf(id);
          draft.entity.card[card.id].tasks.splice(i, 1);
        });
    }));
  };