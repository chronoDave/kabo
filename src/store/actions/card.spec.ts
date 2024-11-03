import type { Card, Lane } from '../entities';

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
import { create as createLane, addCard } from './lane';

test('[card.create] creates card', t => {
  const store = new Store(state);
  const card: Card = {
    id: uid(),
    title: 'Title',
    categories: [],
    tasks: []
  };

  store.set(produce(create(card)));

  t.deepEqual(store.current.entity.card[card.id], card, 'creates card');

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

test('[card.addCategory] add card category', t => {
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
  t.equal(store.current.entity.card[card.id].categories.length, 1, 'does not push duplicate category');

  t.end();
});

test('[card.removeCategory] remove card category', t => {
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

test('[card.move] moves card within and between lanes', t => {
  const store = new Store(state);
  const lane1: Lane = { id: uid(), cards: [] };
  const lane2: Lane = { id: uid(), cards: [] };
  const card1: Card = { id: uid(), categories: [], tasks: [] };
  const card2: Card = { id: uid(), categories: [], tasks: [] };
  const card3: Card = { id: uid(), categories: [], tasks: [] };

  store.set(produce(create(card1)));
  store.set(produce(create(card2)));
  store.set(produce(create(card3)));
  store.set(produce(createLane(lane1)));
  store.set(produce(createLane(lane2)));
  store.set(produce(addCard(lane1.id)(card1.id)));
  store.set(produce(addCard(lane1.id)(card2.id)));
  store.set(produce(addCard(lane1.id)(card3.id)));

  // Within lane
  store.set(produce(move(card2.id)({ n: - 1 })));
  t.equal(store.current.entity.lane[lane1.id].cards[0], card2.id, 'moves card down');
  store.set(produce(move(card2.id)({ n: - 1 })));
  t.equal(store.current.entity.lane[lane1.id].cards[0], card2.id, 'does not wrap downwards');
  store.set(produce(move(card2.id)({ n: 2 })));
  t.equal(store.current.entity.lane[lane1.id].cards[2], card2.id, 'moves card up');
  store.set(produce(move(card2.id)({ n: 1 })));
  t.equal(store.current.entity.lane[lane1.id].cards[2], card2.id, 'does not wrap upwards');
  store.set(produce(move(card2.id)({ card: card1.id })));
  t.equal(store.current.entity.lane[lane1.id].cards[0], card2.id, 'moves card behind target card');

  // Between lanes
  store.set(produce(move(card1.id)({ lane: lane2.id })));
  t.false(store.current.entity.lane[lane1.id].cards.includes(card1.id), 'does not have moved card');
  t.true(store.current.entity.lane[lane2.id].cards.includes(card1.id), 'has moved card');
  store.set(produce(move(card2.id)({ card: card1.id })));
  t.false(store.current.entity.lane[lane1.id].cards.includes(card2.id), 'does not have moved card');
  t.equal(store.current.entity.lane[lane2.id].cards[0], card2.id, 'moves card behind card in different lane');
  store.set(produce(move(card3.id)({ lane: lane2.id, n: 2 })));
  t.false(store.current.entity.lane[lane1.id].cards.includes(card3.id), 'does not have moved card');
  t.equal(store.current.entity.lane[lane2.id].cards[2], card3.id, 'moves card to specific position in different lane');

  t.end();
});

test('[card.remove] removes card', t => {
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
