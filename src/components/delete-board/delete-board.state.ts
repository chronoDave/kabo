import { selector } from '../../store/store';

export default selector(state => () => state.active.board);
