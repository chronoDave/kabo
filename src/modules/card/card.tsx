import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './card.state';
import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Icon from '../../components/icon/icon';
import Task from './task/task';
import Categories from './categories/categories';
import Menu from '../../components/menu/menu';

import './card.scss';
import Date from './date/date';

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
            <button
              type='button'
              class="icon"
              data-action='move'
              data-direction='end'
            >
              <Icon id='circle' />
              <span class='sr-only'>Mark card as complete</span>
            </button>
            <h4
              {...contentEditable()}
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
          <Date card={props.id} />
          <Categories card={props.id} categories={card.categories} />
          <p
            {...contentEditable({ empty: 'Description' })}
            onblur={event => {
              const description = (event.target as HTMLHeadingElement).innerText;
              if (card.description !== description) actions.card.update(props.id)({ description });
            }}
          >
            {card.description}
          </p>
          <ul
            class='clear'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const task = button?.closest<HTMLElement>('.task');

              if (button?.dataset.action === 'create') {
                event.stopPropagation();
                actions.task.create(card.id)('New task');
              }

              if (button?.dataset.action === 'delete' && task) {
                event.stopPropagation();
                actions.task.delete(task.id);
              }
            }}
          >
            {card.tasks.map(task => (
              <li key={task}>
                <Task id={task} />
              </li>
            ))}
            <li>
              <button type='button' data-action='create'>
                <Icon id='plus' />
                <span>Add task</span>
              </button>
            </li>
          </ul>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Card;
