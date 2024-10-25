import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './card.state';
import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Icon from '../../components/icon/icon';
import Task from './task/task';
import CollapseTags from './collapse-tags/collapse-tags';
import ButtonTags from './button-tags/button-tags';
import Tag from './tag/tag';
import Menu from '../../components/menu/menu';

import './card.scss';
import CollapseButton from '../../components/collapse-button/collapse-button';
import CollapseActions from './collapse-actions/collapse-actions';

export type CardProps = {
  id: string;
};

const Card: Component<CardProps> = initial => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      const card = selector.state(props.id);
      const id = { tags: `${props.id}-tags`, actions: `${props.id}-actions` };

      if (!card) return null;
      return (
        <article id={card.id} class='card'>
          <header>
            <button
              type='button'
              data-action='move'
              data-direction='end'
            >
              <Icon id='circle' />
              <span class='sr-only'>Mark card as complete</span>
            </button>
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
              <CollapseButton id={id.tags}>
                <Icon id='tag' />
                <span class='sr-only'>Open tags collapse</span>
              </CollapseButton>
              <CollapseButton id={id.actions}>
                <Icon id='ellipsisVertical' />
                <span class='sr-only'>Open actions collapse</span>
              </CollapseButton>
              <Icon id='gripVertical' />
            </div>
          </header>
          <ul
            class='tags'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const tag = button?.closest<HTMLElement>('.tag');

              if (button?.dataset.action === 'delete' && tag) {
                actions.card.removeCategory(card.id)(tag.id);
                event.stopPropagation();
              }
            }}
          >
            {card.categories.map(category => (
              <li key={category}>
                <Tag id={category}>
                  <button type='button' data-action='delete'>
                    <Icon id='xmark' />
                    <span class='sr-only'>Remove tag</span>
                  </button>
                </Tag>
              </li>
            ))}
          </ul>
          <CollapseTags id={id.tags} card={card.id} />
          <CollapseActions id={id.actions} />
          <p
            class='body'
            {...contentEditable}
            onblur={event => {
              const description = (event.target as HTMLHeadingElement).innerText;
              if (card.description !== description) actions.card.update(props.id)({ description });
            }}
          >
            {card.description}
          </p>
          <div
            class='tasks'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const task = button?.closest<HTMLElement>('.task');

              if (button?.dataset.action === 'create') {
                event.stopPropagation();
                actions.task.create(card.id)('New task');
              }

              if (button?.dataset.action === 'update' && task) {
                event.stopPropagation();

                actions.task.update(task.id)({ done: task.dataset.done !== 'true' });
              }

              if (button?.dataset.action === 'delete' && task) {
                event.stopPropagation();
                actions.task.delete(task.id);
              }
            }}
          >
            <ol>
              {card.tasks.map(task => (
                <li key={task}>
                  <Task id={task} />
                </li>
              ))}
            </ol>
            <button type='button' data-action='create'>
              <Icon id='plus' />
              <span>Add task</span>
            </button>
          </div>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Card;
