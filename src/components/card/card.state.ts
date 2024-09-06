import { Card } from '../../store/entities';
import { selector } from '../../store/store';

type State = Card | null;

export default selector<string, State>(state => id => state.cards[id]);