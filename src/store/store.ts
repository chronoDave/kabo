import Store from '../lib/store/store';
import createSelector from '../lib/selector/selector';
import { Card, Board, Lane } from '../types/entity';

export type State = {
  cards: Record<string, Card>;
  lanes: Record<string, Lane>;
  boards: Record<string, Board>;
}

const store = new Store<State>({
  cards: {},
  lanes: {},
  boards: {}
})
  .on(state => {
    console.group('store');
    console.log('current', state.current);
    console.log('previous', state.previous);
    console.groupEnd();
  });

export default store;
export const selector = createSelector(store);
