import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Collapse from '../../../components/collapse/collapse';
import Icon from '../../../components/icon/icon';

export type CollapseActionsProps = {
  id: string;
};

const CollapseActions: Component<CollapseActionsProps> = () => {
  const component = new forgo.Component<CollapseActionsProps>({
    render(props) {
      return (
        <Collapse id={props.id}>
          <ul>
            <li>
              <button type='button' data-action="move" data-direction="up">
                <Icon id='arrowUp' />
                <span>Move up</span>
              </button>
            </li>
            <li>
              <button type='button' data-action="move" data-direction="down">
                <Icon id='arrowDown' />
                <span>Move down</span>
              </button>
            </li>
            <li>
              <button type='button' data-action="move" data-direction="left">
                <Icon id='arrowLeft' />
                <span>Move left</span>
              </button>
            </li>
            <li>
              <button type='button' data-action="move" data-direction="right">
                <Icon id='arrowRight' />
                <span>Move right</span>
              </button>
            </li>
            <li>
              <button type='button' data-action='delete'>
                <Icon id='xmark' />
                <span>Remove card</span>
              </button>
            </li>
          </ul>
        </Collapse>
      );
    }
  });

  return component;
};

export default CollapseActions;
