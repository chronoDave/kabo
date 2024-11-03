import { produce } from 'immer';
import type { Card, Task } from '../../store/entities';

import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';
import uid from '../../lib/uid/uid';

export default selector<string, Card | null>(
  state => id => state?.entity.card[id] ?? null
);

export const setTitle = (card: string) =>
  (title: string) => {
    store.set(produce(actions.card.setTitle(card)(title)));
  };

export const setDescription = (card: string) =>
  (description: string) => {
    store.set(produce(actions.card.setDescription(card)(description)));
  };

export const createTask = (card: string) => {
  const task: Task = { id: uid() };

  store.set(produce(draft => {
    actions.card.addTask(card)(task.id)(draft);
    actions.task.create(task)(draft);
  }));
};

export const addTask = (card: string) =>
  (task: string) => {
    store.set(produce(actions.card.addTask(card)(task)));
  };

export const setTaskDone = (task: string) =>
  (done: boolean) => {
    store.set(produce(actions.task.setDone(task)(done)));
  };

export const removeTask = (card: string) =>
  (task: string) => {
    store.set(produce(actions.card.removeTask(card)(task)));
  };

export const removeCategory = (card: string) =>
  (category: string) => {
    store.set(produce(actions.card.removeCategory(card)(category)));
  };
