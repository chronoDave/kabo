import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './card.state';
import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Icon from '../icon/icon';

import './card.scss';
import Menu from '../menu/menu';

export type CardProps = {
  id: string;
};

const Card: Component<CardProps> = initial => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      const card = selector.state(props.id);

      if (!card) return null;
      return (
        <article id={card.id} class='card'>
          <header>
            <h4
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (card.title !== title) actions.card.update(props.id)({ title });
              }}
            >
              {card.title}
            </h4>
            <div class='actions'>
              <Menu
                id={`menu-${props.id}`}
                icon='arrowsUpDownLeftRight'
                label={{
                  button: `Move ${card.title}`,
                  menu: 'Directions'
                }}
              >
                <li>
                  <button type='button' data-action="move-up">
                    <Icon id='arrowUp' />
                    <span>Move up</span>
                  </button>
                </li>
                <li>
                  <button type='button' data-action="move-down">
                    <Icon id='arrowDown' />
                    <span>Move down</span>
                  </button>
                </li>
                <li>
                  <button type='button' data-action="move-left">
                    <Icon id='arrowLeft' />
                    <span>Move left</span>
                  </button>
                </li>
                <li>
                  <button type='button' data-action="move-right">
                    <Icon id='arrowRight' />
                    <span>Move right</span>
                  </button>
                </li>
              </Menu>
              <button
                type='button'
                data-action='delete'
                class='icon'
              >
                <Icon id='xmark' />
                <span class='sr-only'>Remove card</span>
              </button>
            </div>
          </header>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Card;
