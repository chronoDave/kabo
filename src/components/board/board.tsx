import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Lane from '../lane/lane';
import selector from './board.state';
import * as actions from '../../store/actions';
import Toolbar from '../../lib/toolbar/toolbar';
import Icon from '../icon/icon';

import './board.scss';

export type BoardProps = {
  id: string;
};

const Board: Component<BoardProps> = initial => {
  const toolbar = new Toolbar();
  const component = new forgo.Component<BoardProps>({
    render(props) {
      const { board, lanes } = selector.state(props.id);

      if (!board) return null;
      return (
        <article class='board' data-id={props.id}>
          <header>
            <h2
              {...toolbar.headingProps}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (title !== board.title) actions.board.update(props.id)(title);
              }}
            >
              {board.title}
            </h2>
            <button type='button' onclick={() => actions.board.remove(props.id)}>
              Remove board
            </button>
          </header>
          <ol class='clear'>
            {lanes.map(lane => (
              <li key={lane}>
                <Lane id={lane} />
              </li>
            ))}
            <li>
              <button
                type='button'
                onclick={() => actions.lane.create(props.id)('New bucket')}
                class='clear'
              >
                <Icon id='plus' />
                Add bucket
              </button>
            </li>
          </ol>
        </article>
      );
    }
  });

  toolbar.on('edit', () => component.update());
  selector.subscribe(initial.id)(component);

  return component;
};

export default Board;
