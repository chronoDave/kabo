import { selector } from '../../../store/store';

export default selector(
  state => (id: string) => state?.entity.card[id]?.date
);
