export type Frozen<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? Frozen<T[K]> : Readonly<T[K]>
};

const freeze = <T extends NonNullable<object>>(o: T): Frozen<T> => {
  const keys = Reflect.ownKeys(o);

  // eslint-disable-next-line @typescript-eslint/no-for-in-array
  for (const k in keys) {
    if (Object.prototype.hasOwnProperty.call(o, k)) {
      const x = o[k as keyof T];
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (x && (typeof x === 'object' || typeof x === 'function')) freeze(x as unknown as object);
    }
  }

  return Object.freeze(o);
};

export default freeze;
