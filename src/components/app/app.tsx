import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './app.state';
import Board from '../board/board';
import * as actions from '../../store/actions';
import SelectBoard from '../select-board/select-board';
import Icon from '../icon/icon';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const { active, n } = selector.state();

      return (
        <main>
          <h1>Kabo</h1>
          <SelectBoard id='select-board' />
          <button type='button' onclick={() => actions.board.create(`New board ${n + 1}`)}>
            <Icon id='plus' />
            Add board
          </button>
          {typeof active === 'string' ? <Board id={active} /> : null}
        </main>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default App;
