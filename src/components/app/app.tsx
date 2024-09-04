import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './app.state';
import Board from '../board/board';
import * as board from '../../store/actions/board';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const boards = selector.state();

      return (
        <main>
          <h1>Kabo</h1>
          {boards.map(board => <Board key={board} id={board} />)}
          <button type='button' onclick={() => board.create('New Board')}>
            Add board
          </button>
        </main>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default App;
