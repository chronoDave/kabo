import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { board } from '../../../store/actions';
import Icon from '../../../components/icon/icon';
import selector from './delete-board.state';

export type DeleteBoardProps = {};

const DeleteBoard: Component<DeleteBoardProps> = () => {
  const component = new forgo.Component<DeleteBoardProps>({
    render() {
      const id = selector.state();

      return (
        <button
          type='button'
          disabled={typeof id !== 'string'}
          onclick={() => {
            if (typeof id === 'string') board.delete(id);
          }}
        >
          <span class='sr-only'>Remove active board</span>
          <Icon id='xmark' />
        </button>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default DeleteBoard;
