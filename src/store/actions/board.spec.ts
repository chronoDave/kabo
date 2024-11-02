import type { Board } from '../entities';

import { produce } from 'immer';
import test from 'tape';

import Store from '../../lib/store/store';
import uid from '../../lib/uid/uid';
import state from '../state';

import {
  create,
  setTitle,
  addLane,
  remove
} from './board';

test('[board.create] creates board', t => {
  const store = new Store(state);
  const board: Board = {
    id: uid(),
    title: 'Title',
    lanes: []
  };

  store.set(produce(create(board)));

  t.deepEqual(store.current.entity.board[board.id], board, 'creates board');

  t.end();
});

test('[board.setTitle] sets board title', t => {
  const store = new Store(state);
  const board: Board = {
    id: uid(),
    title: 'Title',
    lanes: []
  };

  store.set(produce(create(board)));
  store.set(produce(setTitle(board.id)('2')));

  t.equal(store.current.entity.board[board.id].title, '2', 'sets board title');

  t.end();
});

test('[board.addLane] adds lane', t => {
  const store = new Store(state);
  const board: Board = {
    id: uid(),
    title: 'Title',
    lanes: []
  };

  store.set(produce(create(board)));
  store.set(produce(addLane(board.id)('lane')));
  store.set(produce(addLane(board.id)('lane')));

  t.true(store.current.entity.board[board.id].lanes.includes('lane'), 'adds lane');
  t.equal(store.current.entity.board[board.id].lanes.length, 1, 'does not push duplicate lanes');

  t.end();
});

test('[board.remove]', t => {
  const store = new Store(state);
  const board: Board = {
    id: uid(),
    title: 'Title',
    lanes: []
  };

  store.set(produce(create(board)));
  t.true(store.current.entity.board[board.id], 'has board');
  store.set(produce(remove(board.id)));
  t.false(store.current.entity.board[board.id], 'does not have board');

  t.end();
});
