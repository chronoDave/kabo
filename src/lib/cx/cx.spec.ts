import test from 'tape';

import cx from './cx';

test('[cx] joins classes', t => {
  t.equal(cx('a', 'b'), 'a b', 'string');
  t.equal(cx('a', null), 'a', 'ignores null');
  t.equal(cx('a', false), 'a', 'ignores false');
  t.equal(cx('a', undefined), 'a', 'ignores undefined');

  t.end();
});
