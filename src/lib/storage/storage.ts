import type { z } from 'zod';

export default class Storage<T extends z.ZodType<object>> {
  private readonly _id: string;
  private readonly _schema: T;

  get default(): z.infer<T> {
    return this._schema.parse({});
  }

  constructor(id: string, schema: T) {
    this._id = id;
    this._schema = schema;
  }

  read(): z.infer<T> | null {
    const raw = localStorage.getItem(this._id);
    if (typeof raw !== 'string') return null;

    try {
      const state = JSON.parse(raw) as unknown;
      
      return this._schema.parse(state);
    } catch {
      localStorage.removeItem(this._id);

      return null;
    }
  }

  write(state: z.infer<T>): this {
    localStorage.setItem(this._id, JSON.stringify(state));

    return this;
  }
}