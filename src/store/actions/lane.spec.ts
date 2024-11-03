import type { Board, Lane } from '../entities';

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
import { create as createBoard, addLane } from './board';

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
  const store = new Store(state);
  const board1: Board = { id: uid(), lanes: [] };
  const board2: Board = { id: uid(), lanes: [] };
  const lane1: Lane = { id: uid(), cards: [] };
  const lane2: Lane = { id: uid(), cards: [] };
  const lane3: Lane = { id: uid(), cards: [] };

  store.set(produce(create(lane1)));
  store.set(produce(create(lane2)));
  store.set(produce(create(lane3)));
  store.set(produce(createBoard(board1)));
  store.set(produce(createBoard(board2)));
  store.set(produce(addLane(board1.id)(lane1.id)));
  store.set(produce(addLane(board1.id)(lane2.id)));
  store.set(produce(addLane(board1.id)(lane3.id)));

  // Within board
  store.set(produce(move(lane2.id)({ n: - 1 })));
  t.equal(store.current.entity.board[board1.id].lanes[0], lane2.id, 'moves lane down');
  store.set(produce(move(lane2.id)({ n: - 1 })));
  t.equal(store.current.entity.board[board1.id].lanes[0], lane2.id, 'does not wrap downwards');
  store.set(produce(move(lane2.id)({ n: 2 })));
  t.equal(store.current.entity.board[board1.id].lanes[2], lane2.id, 'moves lane up');
  store.set(produce(move(lane2.id)({ n: 1 })));
  t.equal(store.current.entity.board[board1.id].lanes[2], lane2.id, 'does not wrap upwards');
  store.set(produce(move(lane2.id)({ lane: lane1.id })));
  t.equal(store.current.entity.board[board1.id].lanes[0], lane2.id, 'moves lane behind target lane');

  // Between boards
  store.set(produce(move(lane1.id)({ board: board2.id })));
  t.false(store.current.entity.board[board1.id].lanes.includes(lane1.id), 'does not have moved lane');
  t.true(store.current.entity.board[board2.id].lanes.includes(lane1.id), 'has moved lane');
  store.set(produce(move(lane2.id)({ lane: lane1.id })));
  t.false(store.current.entity.board[board1.id].lanes.includes(lane2.id), 'does not have moved lane');
  t.equal(store.current.entity.board[board2.id].lanes[0], lane2.id, 'moves lane behind lane in different board');
  store.set(produce(move(lane3.id)({ board: board2.id, n: 2 })));
  t.false(store.current.entity.board[board1.id].lanes.includes(lane3.id), 'does not have moved lane');
  t.equal(store.current.entity.board[board2.id].lanes[2], lane3.id, 'moves lane to specific position in different board');  

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
