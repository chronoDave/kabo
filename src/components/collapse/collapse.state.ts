import { selector } from '../../store/store';

export default selector(state => (id: string) => state?.active.collapse === id);