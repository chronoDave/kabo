import { produce } from 'immer';
import type { Task } from '../../../store/entities';

import store, { selector } from '../../../store/store';
import * as actions from '../../../store/actions';

export default selector<string, Task | null>(
  state => id => state?.entity.task[id] ?? null
);

export const setTaskTitle = (task: string) =>
  (title: string) => {
    store.set(produce(actions.task.setTitle(task)(title)));
  };
