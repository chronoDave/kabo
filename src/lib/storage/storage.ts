import type * as r from 'runtypes';

export default class Storage<T extends r.Runtype> {
  private readonly _id: string;
  private readonly _schema: T;

  constructor(id: string, schema: T) {
    this._id = id;
    this._schema = schema;
  }

  parse(raw: unknown): r.Static<T> | null {
    if (typeof raw !== 'string') return null;

    try {
      return this._schema.check(JSON.parse(raw));
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  read(): r.Static<T> | null {
    return this.parse(localStorage.getItem(this._id));
  }

  write(state: r.Static<T>): this {
    localStorage.setItem(this._id, JSON.stringify(state));

    return this;
  }
}