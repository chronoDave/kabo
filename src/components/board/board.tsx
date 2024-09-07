import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Lane from '../lane/lane';
import selector from './board.state';
import * as actions from '../../store/actions';
import Toolbar from '../../lib/toolbar/toolbar';
import FormAdd from '../form-add/form-add';

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
              onblur={event => actions.board.update(props.id)((event.target as HTMLHeadingElement).innerText)}
            >
              {board.title}
            </h2>
            <button
              {...toolbar.editProps}
              type='button'
            >
              Toggle edit
            </button>
            <button type='button' onclick={() => actions.board.remove(props.id)}>
              Remove board
            </button>
          </header>
          <FormAdd
            onadd={actions.lane.create(props.id)}
            default='New Lane'
            label={{
              submit: 'Add lane',
              input: 'Lane title'
            }}
          />
          {lanes.length > 0 ? (
            <ol class='clear'>
              {lanes.map(lane => (
                <li key={lane}>
                  <Lane id={lane} />
                </li>
              ))}
            </ol>
          ) : null}
        </article>
      );
    }
  });

  toolbar.on('edit', () => component.update());
  selector.subscribe(initial.id)(component);

  return component;
};

export default Board;
