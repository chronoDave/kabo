import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './app.state';
import Board from '../board/board';
import AddBoard from './add-board/add-board';
import DeleteBoard from './delete-board/delete-board';
import SelectBoard from './select-board/select-board';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const board = selector.state();

      return [
        <header>
          <SelectBoard id='select-board' />
          <AddBoard />
          <DeleteBoard />
        </header>,
        typeof board === 'string' ? (
          <main>
            <Board id={board} />
          </main>
        ) : null
      ];
    }
  });

  selector.subscribe()(component);

  return component;
};

export default App;
