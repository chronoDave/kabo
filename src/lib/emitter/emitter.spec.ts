import test from 'tape';

import Emitter from './emitter';

test('[emitter.emit] emits and listens to events', t => {
  const emitter = new Emitter();

  emitter
    .on('event', payload => {
      t.pass('listens to event');
      t.deepEqual(payload, { x: 1 }, 'has payload');
      t.end();
    })
    .emit('event', { x: 1 });
});

test('[emitter.on] emits and listens to specific events', t => {
  const emitter = new Emitter();

  emitter
    .on('event', payload => {
      t.pass('listens to event');
      t.deepEqual(payload, { x: 1 }, 'has payload');
      t.end();
    })
    .on('fail', () => {
      t.fail('listened to wrong event');
    })
    .emit('event', { x: 1 });
});

test('[emitter.off] removes listeners', t => {
  let n = 0;

  const emitter = new Emitter();
  const listener = () => {
    n += 1;
  };

  emitter
    .on('event', listener)
    .off('event', listener)
    .emit('event')
    .on('event', () => {
      t.equal(n, 0, 'does not fire event');
      t.end();
    })
    .emit('event');
});
