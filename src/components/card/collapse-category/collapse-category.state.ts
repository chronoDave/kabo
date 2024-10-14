import { selector } from '../../../store/store';

export default selector(state =>
  (id: string) =>
    Object.fromEntries(Object.keys(state?.entity.category ?? {})
      .map(category => [category, state?.entity.card[id]?.categories.includes(category)]))
);
