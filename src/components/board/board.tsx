import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as lane from '../../store/actions/lane';
import Lane from '../lane/lane';
import selector from './board.state';

export type BoardProps = {
  id: string;
};

const Board: Component<BoardProps> = initial => {
  const component = new forgo.Component<BoardProps>({
    render(props) {
      const { board, lanes } = selector.state(props.id);

      return (
        <article data-id={props.id}>
          <h2>{board.title}</h2>
          {lanes.length > 0 ? (
            <ol>
              {lanes.map(lane => (
                <li key={lane}>
                  <Lane id={lane} />
                </li>
              ))}
            </ol>
          ) : null}
          <button type='button' onclick={() => lane.create(props.id)('New Lane')}>
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
