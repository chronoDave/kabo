import test from 'tape';

import freeze from './freeze';

test('[freeze] deep freezes object', t => {
  const o = freeze({ a: false, b: { c: 2 }, d: null });

  try {
    // @ts-expect-error: TS2540, readonly assignment
    o.a = true;
  } catch {
    t.pass('throws on top level assignment');
  }

  try {
    // @ts-expect-error: TS2540, readonly assignment
    o.b.c = 1;
  } catch {
    t.pass('throws on nested assignment');
  }

  try {
    // @ts-expect-error: TS2540, readonly assignment
    o.c = 3;
  } catch {
    t.pass('throws on new attribute assignment');
  }

  t.end();
});
