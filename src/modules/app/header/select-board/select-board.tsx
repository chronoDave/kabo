import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector, { set } from './select-board.state';

export type SelectBoardsProps = {
  id: string;
};

const SelectBoards: Component<SelectBoardsProps> = () => {
  const component = new forgo.Component<SelectBoardsProps>({
    render(props) {
      const { active, boards } = selector.state();
      const id = `board-${props.id}`;

      return (
        <div class='select-board'>
          <label for={id} class='sr-only'>
            Select board
          </label>
          <select
            id={id}
            disabled={boards.length === 0}
            onchange={event => set((event.target as HTMLSelectElement).value)}
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
