import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../store/actions';
import Icon from '../../../components/icon/icon';
import Tag from './tag/tag';
import Collapse from './collapse/collapse';

import './tags.scss';

export type TagsProps = {
  card: string;
  categories: string[];
};

const Tags: Component<TagsProps> = () => {
  let expanded = false;

  const component = new forgo.Component<TagsProps>({
    render(props) {
      const id = `${props.card}-tags`;

      return [
        <div class='tags'>
          <ul
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const tag = button?.closest<HTMLElement>('.tag');

              if (button?.dataset.action === 'delete' && tag) {
                actions.card.removeCategory(props.card)(tag.id);
                event.stopPropagation();
              }
            }}
          >
            {props.categories.map(category => (
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
          <button
            type='button'
            aria-controls={id}
            aria-expanded={expanded}
            onclick={() => {
              expanded = !expanded;
              component.update();
            }}
          >
            <Icon id='tag' />
            <span class='sr-only'>Tags</span>
          </button>
        </div>,
        <Collapse card={props.card} id={id} expanded={expanded} />
      ];
    }
  });

  return component;
};

export default Tags;
