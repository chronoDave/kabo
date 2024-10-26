import type * as z from 'valibot';

import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

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

  parse(raw: unknown): z.infer<T> | null {
    if (typeof raw !== 'string') return null;

    try {
      return this._schema.parse(JSON.parse(raw));
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  read(): z.infer<T> | null {
    let raw = localStorage.getItem(this._id);
    if (raw !== null) raw = decompressFromUTF16(raw);

    return this.parse(raw);
  }

  write(state: z.infer<T>): this {
    localStorage.setItem(this._id, compressToUTF16(JSON.stringify(state)));

    return this;
  }
}