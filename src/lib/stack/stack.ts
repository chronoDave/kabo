import wrap from '../math/wrap';

export default class Stack<T> {
  private readonly _stack: Map<number, T | null>;
  private readonly _size: number;
  private _index: number;

  get size(): number {
    return Array.from(this._stack.values()).filter(x => x !== null).length;
  }

  constructor(n: number) {
    this._stack = new Map();
    this._size = n;
    this._index = 0;
  }

  /**
   * @param i Relative index
   */
  peek(i?: number): T | null {
    const max = this._size - 1;
    const n = wrap(0, max, wrap(0, max, this._index - 1) + (i ?? 0));

    return this._stack.get(n) ?? null;
  }

  push(x: T): this {
    this._stack.set(this._index, x);
    this._index = wrap(0, this._size - 1, this._index + 1);

    return this;
  }

  pop(): this {
    this._index = wrap(0, this._size - 1, this._index - 1);
    this._stack.set(this._index, null);

    return this;
  }
}
