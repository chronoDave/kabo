import type { Card } from '../entities';

import { produce } from 'immer';
import test from 'tape';

import Store from '../../lib/store/store';
import uid from '../../lib/uid/uid';
import state from '../state';

import {
  create,
  setTitle,
  setDescription,
  addCategory,
  removeCategory,
  move,
  remove
} from './card';

test('[card.create] creates card', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));

  t.deepEqual(store.current.entity.board[card.id], card, 'creates card');

  t.end();
});

test('[card.setTitle] set card title', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));
  store.set(produce(setTitle(card.id)('2')));

  t.equal(store.current.entity.card[card.id].title, '2', 'sets card title');

  t.end();
});

test('[card.setDescription] set card description', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));
  store.set(produce(setDescription(card.id)('2')));

  t.equal(store.current.entity.card[card.id].description, '2', 'sets card description');

  t.end();
});

test('[card.addCategory]', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));
  store.set(produce(addCategory(card.id)('category')));
  store.set(produce(addCategory(card.id)('category')));

  t.true(store.current.entity.card[card.id].categories.includes('category'), 'has category');
  t.equal(store.current.entity.card[card.id].categories.length, 1, 'does not push duplicate categories');

  t.end();
});

test('[card.removeCategory]', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));
  store.set(produce(addCategory(card.id)('category')));
  t.true(store.current.entity.card[card.id].categories.includes('category'), 'has category');
  store.set(produce(removeCategory(card.id)('category')));
  t.equal(store.current.entity.card[card.id].categories.length, 0, 'removes category');

  t.end();
});

test('[card.move]', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  t.fail('requires lane');
  store.set(produce(create(card)));

  t.end();
});

test('[card.remove]', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));
  t.true(store.current.entity.card[card.id], 'has card');
  store.set(produce(remove(card.id)));
  t.false(store.current.entity.card[card.id], 'does not have card');

  t.end();
});
