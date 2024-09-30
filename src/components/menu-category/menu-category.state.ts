import { selector } from '../../store/store';

export default selector(
  state => () => Object.keys(state?.entity.category ?? {}),
  ({ previous, current }) =>
    Object.keys(previous?.entity.category ?? {}).length !==
    Object.keys(current.entity.category ?? {}).length
);
