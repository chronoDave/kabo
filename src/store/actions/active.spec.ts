import test from 'tape';

import { board } from './active';

import Store from '../../lib/store/store';
import state from '../state';
import { produce } from 'immer';

test('[active.board] sets active board', t => {
  const id = 'board';
  const store = new Store(state);

  store.set(produce(board(id)));

  t.equal(store.current.active.board, id);

  t.end();
});
