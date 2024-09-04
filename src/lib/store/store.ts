import freeze from '../object/freeze';
import Stack from '../stack/stack';

export type Subscriber<S extends object> = (state: { current: S, previous: S }) => void;

export type Reducer<S extends object> = (state: S) => S;

export default class Store<S extends object> {
  private readonly _subscribers: Set<Subscriber<S>>;
  private readonly _state: Stack<S>;

  get previous() {
    return freeze(this._state.peek(-1)!) as S;
  }

  get current() {
    return freeze(this._state.peek()!) as S;
  }

  constructor(state: S) {
    this._state = new Stack(2);
    this._subscribers = new Set();

    this._state.push(state);
  }

  set(reducer: Reducer<S>) {
    this._state.push(reducer(this.current));
    this._subscribers.forEach(subscriber => subscriber({
      current: this.current,
      previous: this.previous
    }));

    return this;
  }

  on(subscriber: Subscriber<S>) {
    if (!this._subscribers.has(subscriber)) this._subscribers.add(subscriber);

    return this;
  }

  off(subscriber: Subscriber<S>) {
    this._subscribers.delete(subscriber);

    return this;
  }
}