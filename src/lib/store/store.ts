import Stack from '../stack/stack';

export type View<S extends object> = { current: S; previous: S | null };

export type Subscriber<S extends object> = (view: View<S>) => void;

export type Reducer<S extends object> = (state: S) => S;

export type StoreOptions<S extends object> = {
  subscribers?: Array<Subscriber<S>>;
};

export default class Store<S extends object> {
  private readonly _subscribers: Set<Subscriber<S>>;
  private readonly _state: Stack<S>;

  private _update() {
    this._subscribers.forEach(subscriber => {
      subscriber({
        current: this.current,
        previous: this.previous
      });
    });

    return this;
  }

  get previous(): S | null {
    const prev = this._state.peek(-1);

    return prev;
  }

  get current(): S {
    const cur = this._state.peek();
    if (!cur) throw new Error('Store does not have default value');

    return cur;
  }

  constructor(state: S, options?: StoreOptions<S>) {
    this._state = new Stack(50);
    this._subscribers = new Set();

    this._state.push(state);
    if (options?.subscribers) {
      options.subscribers.forEach(subscriber => {
        subscriber({ current: this.current, previous: this.previous });

        this._subscribers.add(subscriber);
      });
    }
  }

  undo(): this {
    if (!this.previous) return this;

    this._state.pop();

    return this._update();
  }

  set(reducer: Reducer<S>): this {
    this._state.push(reducer(this.current));

    return this._update();
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