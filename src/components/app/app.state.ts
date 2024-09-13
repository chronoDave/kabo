import { selector } from '../../store/store';

export default selector(state => () => ({
  active: state.active.board,
  n: Object.keys(state.entity.board).length
}), ({ previous, current }) => {
  if (previous.active !== current.active) return true;
  return Object.keys(previous.entity.board).length !== Object.keys(current.entity.board).length;
});