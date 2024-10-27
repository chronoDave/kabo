import * as forgo from 'forgo';

import App from './modules/app/app';
import createDragFocus from './lib/dragFocus/dragFocus';

import './index.scss';

createDragFocus();
forgo.mount(<App />, document.body);
