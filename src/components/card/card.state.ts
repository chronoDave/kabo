import type { Card } from '../../store/entities';

import { selector } from '../../store/store';

export default selector<string, Card | null>(
  state => id => state?.entity.card[id] ?? null
);