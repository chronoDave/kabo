import { selector } from '../../store/store';

export default selector(state => (id: string) => ({
  lane: state.lanes[id],
  cards: state.card_lane.reduce<string[]>((acc, cur) => {
    if (cur.lane === id) acc.push(cur.card);
    return acc;
  }, [])
}));