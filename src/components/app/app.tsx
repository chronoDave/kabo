import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './app.state';
import Board from '../board/board';
import * as actions from '../../store/actions';
import Icon from '../icon/icon';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const { active, boards } = selector.state();

      return (
        <main>
          <h1>Kabo</h1>
          <label for='board-select'>
            Select board
          </label>
          <select
            id='board-select'
            onchange={event => actions.active.set('board')((event.target as HTMLSelectElement).value)}
          >
            {boards.map(board => (
              <option selected={board.id === active} key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
          <button type='button' onclick={() => actions.board.create(`New board ${boards.length + 1}`)}>
            <Icon id='plus' />
            Add board
          </button>
          {active ? <Board id={active} /> : null}
        </main>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default App;
