import type { Component } from 'forgo';
import type { Subscriber, View } from '../store/store';
import type Store from '../store/store';
import type { Frozen } from '../object/freeze';

import deepEqual from 'fast-deep-equal';

export type Selector<S extends object, T, K> = (state: Frozen<S>) => (...args: T[]) => K;

export type SelectorResult<T, K> = {
  state: (...args: T[]) => K;
  subscribe: (...args: T[]) => <S extends object>(component: Component<S>) => void;
};

export default <S extends object>(store: Store<S>) => <T, K>(
  selector: Selector<S, T, K>,
  shouldUpdate?: (view: View<Frozen<S>>) => boolean
): SelectorResult<T, K> => ({
  state: (...args) => selector(store.current)(...args),
  subscribe: (...args) => component => {
    const subscriber: Subscriber<S> = state => {
      if (shouldUpdate?.(state)) return component.update();

      const current = selector(state.current)(...args);
      const previous = selector(state.previous)(...args);

      if (!deepEqual(current, previous)) component.update();
    };

    component.unmount(() => store.off(subscriber));
    component.mount(() => store.on(subscriber));
  }
});