import type { Task } from '../entities';

import { produce } from 'immer';
import test from 'tape';

import Store from '../../lib/store/store';
import uid from '../../lib/uid/uid';
import state from '../state';

import {
  create,
  setTitle,
  setDone,
  remove
} from './task';

test('[task.create] creates task', t => {
  const store = new Store(state);
  const task: Task = { id: uid() };

  store.set(produce(create(task)));

  t.deepEqual(store.current.entity.task[task.id], task, 'creates task');

  t.end();
});

test('[task.setTitle] set task title', t => {
  const store = new Store(state);
  const task: Task = { id: uid() };

  store.set(produce(create(task)));
  store.set(produce(setTitle(task.id)('2')));

  t.equal(store.current.entity.task[task.id].title, '2', 'sets task title');

  t.end();
});

test('[task.setDone] set task done', t => {
  const store = new Store(state);
  const task: Task = { id: uid() };

  store.set(produce(create(task)));
  store.set(produce(setDone(task.id)(true)));

  t.true(store.current.entity.task[task.id].done, 'sets task done');

  t.end();
});

test('[task.remove] removes task', t => {
  const store = new Store(state);
  const task: Task = { id: uid() };

  store.set(produce(create(task)));
  t.true(store.current.entity.task[task.id], 'has task');
  store.set(produce(remove(task.id)));
  t.false(store.current.entity.task[task.id], 'does not have task');

  t.end();
});

