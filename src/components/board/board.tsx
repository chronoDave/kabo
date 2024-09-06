import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Lane from '../lane/lane';
import selector from './board.state';
import * as actions from '../../store/actions';

export type BoardProps = {
  id: string;
};

const Board: Component<BoardProps> = initial => {
  const component = new forgo.Component<BoardProps>({
    render(props) {
      const { board, lanes } = selector.state(props.id);

      if (!board) return null;
      return (
        <article data-id={props.id}>
          <header>
            <h2>{board.title}</h2>
            <button type='button' onclick={() => actions.board.remove(props.id)}>
              Remove board
            </button>
          </header>
          {lanes.length > 0 ? (
            <ol>
              {lanes.map(lane => (
                <li key={lane}>
                  <Lane id={lane} />
                </li>
              ))}
            </ol>
          ) : null}
          <button type='button' onclick={() => actions.lane.create(props.id)('New Lane')}>
            Add lane
          </button>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Board;
