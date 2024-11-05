import Store from '../lib/store/store';
import createSelector from '../lib/selector/selector';
import state, { schema } from './state';
import Storage from '../lib/storage/storage';

const storage = new Storage('state', schema);
const store = new Store(storage.read() ?? state, {
  subscribers: [
    ({ previous, current }) => {
      if (typeof current.active.board === 'string') {
        if (
          previous?.active.board !== current.active.board ||
          current.entity.board[current.active.board].title !== previous.entity.board[previous.active.board].title
        ) document.title = `${current.entity.board[current.active.board].title} | Pebble`;
      } else {
        document.title = 'Pebble';
      }
    }
  ]
})
  .on(state => storage.write(state.current))
  .on(console.log);

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key === 'z') store.undo();
});

export default store;
export const selector = createSelector(store);
