import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { board } from '../../store/actions';
import Icon from '../../components/icon/icon';
import selector from './add-board.state';

export type AddBoardProps = {};

const AddBoard: Component<AddBoardProps> = () => {
  const component = new forgo.Component<AddBoardProps>({
    render() {
      const n = selector.state();

      return (
        <button
          type='button'
          class='icon add-board'
          onclick={() => board.create(`New board ${n + 1}`)}
        >
          <Icon id='plus' />
          <span class='sr-only'>Add board</span>
        </button>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default AddBoard;
