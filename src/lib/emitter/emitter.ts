export default class Emitter<T extends Record<string, (payload: Parameters<T[keyof T]>[0]) => void>> {
  private readonly _events: Map<keyof T, Set<T[keyof T]>>;

  constructor() {
    this._events = new Map();
  }

  on<K extends keyof T>(event: K, listener: T[K]): this {
    if (!this._events.has(event)) this._events.set(event, new Set());
    this._events.get(event)?.add(listener);

    return this;
  }

  off<K extends keyof T>(event: K, listener: T[K]): this {
    this._events.get(event)?.delete(listener);

    return this;
  }

  emit<K extends keyof T>(event: K, payload?: Parameters<T[K]>[0]): this {
    this._events.get(event)?.forEach(listener => {
      listener(payload); 
    });

    return this;
  }
}
