import type { Board } from '../../store/entities';

import { selector } from '../../store/store';

export default selector<string, Board | null>(
  state => id => state.entity.board[id] ?? null
);
