import { selector } from '../../store/store';

export default selector(state => () => Object.keys(state.entity.board).length);