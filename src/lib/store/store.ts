import type { Frozen } from '../object/freeze';

import freeze from '../object/freeze';
import Stack from '../stack/stack';

export type View<S extends object> = { current: S; previous: S };

export type Subscriber<S extends object> = (view: View<Frozen<S>>) => void;

export type Reducer<S extends object> = (state: Frozen<S>) => S;

export default class Store<S extends object> {
  private readonly _subscribers: Set<Subscriber<S>>;
  private readonly _state: Stack<S>;

  get previous(): Frozen<S> {
    const prev = this._state.peek(-1);
    if (!prev) throw new Error('Store does not have previous value');

    return freeze(prev);
  }

  get current(): Frozen<S> {
    const cur = this._state.peek();
    if (!cur) throw new Error('Store does not have default value');

    return freeze(cur);
  }

  constructor(state: S) {
    this._state = new Stack(2);
    this._subscribers = new Set();

    this._state.push(state);
  }

  set(reducer: Reducer<S>): this {
    this._state.push(reducer(this.current));
    this._subscribers.forEach(subscriber => {
      subscriber({
        current: this.current,
        previous: this.previous
      });
    });

    return this;
  }

  on(subscriber: Subscriber<S>): this {
    if (!this._subscribers.has(subscriber)) this._subscribers.add(subscriber);

    return this;
  }

  off(subscriber: Subscriber<S>): this {
    this._subscribers.delete(subscriber);

    return this;
  }
}