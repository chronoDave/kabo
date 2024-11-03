import { produce } from 'immer';
import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';

export default selector(state => (id: string) => state?.active.collapse === id);

export const set = (collapse: string | null) => {
  store.set(produce(actions.active.collapse(collapse)));
};
