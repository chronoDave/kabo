import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './app.state';
import Board from '../board/board';
import Header from '../header/header';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const board = selector.state();

      return [
        <Header />,
        typeof board === 'string' ? (
          <main class='app'>
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
