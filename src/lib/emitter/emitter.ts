type Events = Record<string, unknown>;
type Listener<T extends Events, K extends keyof T> = (payload: T[K]) => void;

export default class Emitter<T extends Events> {
  private readonly _events: Map<keyof T, Set<(payload: T[keyof T]) => void>>;

  constructor() {
    this._events = new Map();
  }

  on<K extends keyof T>(event: K, listener: Listener<T, K>): this {
    if (!this._events.has(event)) this._events.set(event, new Set());
    this._events.get(event)?.add(listener as unknown as (payload: T[keyof T]) => void);

    return this;
  }

  off<K extends keyof T>(event: K, listener: Listener<T, K>): this {
    this._events.get(event)?.delete(listener as unknown as (payload: T[keyof T]) => void);

    return this;
  }

  emit<K extends keyof T>(event: K, payload: T[K]): this {
    this._events.get(event)?.forEach(listener => {
      listener(payload); 
    });

    return this;
  }
}
