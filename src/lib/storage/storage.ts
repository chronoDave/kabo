import { z } from 'zod';
import { Json } from '../../types/primitives';

export default class Storage<S extends Json> {
  private readonly _id: string;
  private readonly _schema: z.Schema;

  get default() {
    return this._schema.parse({});
  } 
  
  constructor(id: string, schema: z.Schema<S>) {
    this._id = id;
    this._schema = schema;
  }

  read(): S | null {
    const raw = localStorage.getItem(this._id);
    if (!raw) return null;

    try {
      const state = JSON.parse(raw);
      return this._schema.parse(state);
    } catch (err) {
      localStorage.removeItem(this._id);

      return null;
    }
  }

  write(state: S) {
    localStorage.setItem(this._id, JSON.stringify(state));
  }
}