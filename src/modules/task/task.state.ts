import type { Task } from '../../store/entities';

import { selector } from '../../store/store';

export default selector<string, Task | null>(
  state => id => state?.entity.task[id] ?? null
);