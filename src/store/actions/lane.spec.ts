import type { Lane } from '../entities';

import { produce } from 'immer';
import test from 'tape';

import Store from '../../lib/store/store';
import uid from '../../lib/uid/uid';
import state from '../state';

import {
  create,
  setTitle,
  addCard,
  move,
  remove
} from './lane';

test('[lane.create] creates lane', t => {
  const store = new Store(state);
  const lane: Lane = { id: uid(), cards: [] };

  store.set(produce(create(lane)));

  t.deepEqual(store.current.entity.lane[lane.id], lane, 'creates lane');

  t.end();
});

test('[lane.setTitle] sets lane title', t => {
  const store = new Store(state);
  const lane: Lane = { id: uid(), cards: [] };

  store.set(produce(create(lane)));
  store.set(produce(setTitle(lane.id)('2')));

  t.equal(store.current.entity.lane[lane.id].title, '2', 'sets lane title');

  t.end();
});

test('[lane.addCard] adds card to lane', t => {
  const store = new Store(state);
  const lane: Lane = { id: uid(), cards: [] };

  store.set(produce(create(lane)));
  store.set(produce(addCard(lane.id)('card')));
  store.set(produce(addCard(lane.id)('card')));

  t.true(store.current.entity.lane[lane.id].cards.includes('card'), 'has card');
  t.equal(store.current.entity.lane[lane.id].cards.length, 1, 'does not push duplicate card');

  t.end();
});

test('[lane.move] moves lane between and within boards', t => {
  t.fail('Implement lane move');

  t.end();
});

test('[lane.remove] removes lane', t => {
  const store = new Store(state);
  const lane: Lane = { id: uid(), cards: [] };

  store.set(produce(create(lane)));
  t.true(store.current.entity.lane[lane.id], 'has lane');
  store.set(produce(remove(lane.id)));
  t.false(store.current.entity.lane[lane.id], 'does not have lane');

  t.end();
});
