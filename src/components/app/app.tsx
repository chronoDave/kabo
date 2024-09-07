import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './app.state';
import Board from '../board/board';
import * as actions from '../../store/actions/board';
import Icon from '../icon/icon';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const boards = selector.state();

      return (
        <main>
          <h1>Kabo</h1>
          <button type='button' onclick={() => actions.create('New board')}>
            <Icon id='plus' />
            Add board
          </button>
          {boards.map(board => <Board key={board} id={board} />)}
        </main>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default App;
