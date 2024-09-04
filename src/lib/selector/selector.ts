import type { Component } from 'forgo';
import type { Subscriber } from '../store/store';

import deepEqual from 'fast-deep-equal';
import Store from '../store/store';

export type Selector<
  S extends object,
  T extends unknown,
  K extends unknown
> = (state: S) => (...args: T[]) => K;

export default <S extends object>(store: Store<S>) => <T extends unknown, K extends unknown>(
  selector: Selector<S, T, K>,
  shouldUpdate?: (state: { previous: S, current: S }) => boolean
) => ({
  state: (...args: T[]) => selector(store.current)(...args),
  subscribe: (...args: T[]) => (component: Component<any>) => {
    const subscriber: Subscriber<S> = state => {
      if (shouldUpdate?.(state)) return component.update();

      const current = selector(state.current)(...args);
      const previous = selector(state.previous)(...args);

      if (!deepEqual(current, previous)) component.update();
    }

    component.unmount(() => store.off(subscriber));
    component.mount(() => store.on(subscriber));
  }
});