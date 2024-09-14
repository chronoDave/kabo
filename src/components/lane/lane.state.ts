import type { Lane } from '../../store/entities';

import { selector } from '../../store/store';

export default selector<string, Lane | null>(
  state => id => state?.entity.lane[id] ?? null
);