import { decompressFromEncodedURIComponent } from 'lz-string';
import Store from '../lib/store/store';
import createSelector from '../lib/selector/selector';
import { schema, state } from './state';
import Storage from '../lib/storage/storage';

let param = new URLSearchParams(window.location.search).get('s');
if (param !== null) param = decompressFromEncodedURIComponent(param);

const storage = new Storage('state', schema);
const store = new Store(
  storage.parse(param) ??
  storage.read() ??
  state
)
  .on(state => storage.write(state.current))
  .on(console.log);

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key === 'z') store.undo();
});

export default store;
export const selector = createSelector(store);
