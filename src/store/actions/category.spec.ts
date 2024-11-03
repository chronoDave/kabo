import type { Category } from '../entities';

import { produce } from 'immer';
import test from 'tape';

import Store from '../../lib/store/store';
import uid from '../../lib/uid/uid';
import state from '../state';

import {
  create,
  setTitle,
  setColour,
  remove
} from './category';

test('[category.create] creates category', t => {
  const store = new Store(state);
  const category: Category = { id: uid() };

  store.set(produce(create(category)));

  t.deepEqual(store.current.entity.category[category.id], category, 'creates category');

  t.end();
});

test('[category.setTitle] sets category title', t => {
  const store = new Store(state);
  const category: Category = { id: uid() };

  store.set(produce(create(category)));
  store.set(produce(setTitle(category.id)('2')));

  t.equal(store.current.entity.category[category.id].title, '2', 'sets category title');

  t.end();
});

test('[category.setColour] sets category colour', t => {
  const store = new Store(state);
  const category: Category = { id: uid() };

  store.set(produce(create(category)));
  store.set(produce(setColour(category.id)('#fff')));

  t.equal(store.current.entity.category[category.id].colour, '#fff', 'sets category colour');

  t.end();
});

test('[category.remove] removes category', t => {
  const store = new Store(state);
  const category: Category = { id: uid() };

  store.set(produce(create(category)));
  t.true(store.current.entity.category[category.id], 'has category');
  store.set(produce(remove(category.id)));
  t.false(store.current.entity.category[category.id], 'does not have category');

  t.end();
});
