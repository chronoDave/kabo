import Store from '../lib/store/store';
import createSelector from '../lib/selector/selector';
import { state, State } from './state';
import Storage from '../lib/storage/storage';

const storage = new Storage('kabo', state);
const store = new Store<State>(storage.read() ?? storage.default)
  .on(state => storage.write(state.current))
  .on(state => {
    console.group('store');
    console.log('current', state.current);
    console.log('previous', state.previous);
    console.groupEnd();
  });

export default store;
export const selector = createSelector(store);
