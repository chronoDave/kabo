import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { active as set } from '../../store/actions';
import selector from './select-board.state';

export type SelectBoardsProps = {
  id: string;
};

const SelectBoards: Component<SelectBoardsProps> = () => {
  const component = new forgo.Component<SelectBoardsProps>({
    render(props) {
      const { active, boards } = selector.state();

      return (
        <div class='select-board'>
          <label for={props.id} class='sr-only'>
            Select active board
          </label>
          <select
            id={props.id}
            disabled={boards.length === 0}
            onchange={event => set.board((event.target as HTMLSelectElement).value)}
          >
            {boards.length === 0 ? <option default>No boards available</option> : null}
            {boards.map(board => (
              <option
                key={board.id}
                selected={board.id === active}
                value={board.id}
              >
                {board.title}
              </option>
            ))}
          </select>
        </div>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default SelectBoards;
