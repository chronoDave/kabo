import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Collapse from '../../../components/collapse/collapse';
import Icon from '../../../components/icon/icon';

import './collapse-actions.scss';

export type CollapseActionsProps = {
  id: string;
};

const CollapseActions: Component<CollapseActionsProps> = () => {
  const component = new forgo.Component<CollapseActionsProps>({
    render(props) {
      return (
        <Collapse id={props.id} class='collapse-actions'>
          <ul>
            <li>
              <span class='sr-only'>Move</span>
              <ul>
                <li>
                  <button type='button' data-action="move" data-direction="up">
                    <Icon id='arrowUp' />
                    <span class='sr-only'>Move up</span>
                  </button>
                </li>
                <li>
                  <button type='button' data-action="move" data-direction="down">
                    <Icon id='arrowDown' />
                    <span class='sr-only'>Move down</span>
                  </button>
                </li>
                <li>
                  <button type='button' data-action="move" data-direction="left">
                    <Icon id='arrowLeft' />
                    <span class='sr-only'>Move left</span>
                  </button>
                </li>
                <li>
                  <button type='button' data-action="move" data-direction="right">
                    <Icon id='arrowRight' />
                    <span class='sr-only'>Move right</span>
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button type='button' data-action='delete'>
                <Icon id='trash' />
                <span class='sr-only'>Remove card</span>
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
