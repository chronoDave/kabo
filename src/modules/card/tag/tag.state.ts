import store, { selector } from '../../../store/store';
import * as actions from '../../../store/actions';
import { produce } from 'immer';

export default selector(state => (id: string) => state?.entity.category[id]);

export const setTagTitle = (tag: string) =>
  (title: string) => {
    store.set(produce(actions.category.setTitle(tag)(title)));
  };
