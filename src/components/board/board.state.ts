import { selector } from '../../store/store';

export default selector(state => (id: string) => ({
  board: state.boards[id],
  lanes: state.lane_board.reduce<string[]>((acc, cur) => {
    if (cur.board === id) acc.push(cur.lane);
    return acc;
  }, [])
}));