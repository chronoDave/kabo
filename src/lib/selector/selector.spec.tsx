import * as forgo from 'forgo';
import test from 'tape';
import { JSDOM } from 'jsdom';

import Store from '../store/store';
import createSelector from './selector';

test('[selector] returns selection on component update', t => {
  let renders = 0;

  const jsdom = new JSDOM('<body></body>');
  forgo.setCustomEnv({ window: jsdom.window, document: jsdom.window.document });

  const store = new Store({ a: { b: 1 } });
  const selector = createSelector(store)(state => () => state?.a.b);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Body = () => {
    const component = new forgo.Component({
      render() {
        const state = selector.state();

        if (renders > 0) {
          t.equal(state, 2, 'renders on store update');
          t.end();
        } else {
          t.equal(state, 1, 'initial render');
        }

        renders += 1;

        return 'state';
      }
    });

    selector.subscribe()(component);

    return component;
  };

  forgo.mount(<Body />, jsdom.window.document.body);

  t.equal(selector.state(), 1, 'returns selection');

  store.set(() => ({ a: { b: 2 }}));
});
