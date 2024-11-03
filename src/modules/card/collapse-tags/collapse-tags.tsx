import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as input from '../../../lib/input/input';
import Icon from '../../../components/icon/icon';
import Tag from '../tag/tag';
import selector, {
  createCategory,
  deleteCategory,
  toggleCategory,
  updateCategoryColour
} from './collapse-tags.state';
import Collapse from '../../../components/collapse/collapse';

import './collapse-tags.scss';

export type CollapseTags = {
  id: string;
  card: string;
};

const CollapseTags: Component<CollapseTags> = initial => {
  const component = new forgo.Component<CollapseTags>({
    render(props) {
      const categories = selector.state(props.card);

      return (
        <Collapse id={props.id} class='collapse-tags'>
          <ul
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const label = (event.target as HTMLElement | null)?.closest('label');
              const category = (button ?? label)?.closest<HTMLElement>('li');

              if (label?.dataset.action === 'toggle' && category) {
                toggleCategory(category.id)(props.card);
                event.stopPropagation();
              }

              if (button?.dataset.action === 'update' && category) {
                if (button.dataset.attribute === 'colour') {
                  input.colour(updateCategoryColour);
                  event.stopPropagation();
                }
              }

              if (button?.dataset.action === 'remove' && category) {
                deleteCategory(category.id);
                event.stopPropagation();
              }
            }}
          >
            {Object.entries(categories).map(([category, checked]) => (
              <li id={category} key={category}>
                <label data-action='toggle'>
                  <span class='sr-only'>Toggle category</span>
                  <input type='checkbox' checked={checked} />
                </label>
                <Tag id={category} />
                <div class='actions'>
                  <button type='button' data-action='update' data-attribute='colour'>
                    <Icon id='eyeDropper' />
                    <span class='sr-only'>Change colour</span>
                  </button>
                  <button type='button' data-action='remove'>
                    <Icon id='xmark' />
                    <span class='sr-only'>Remove category</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type='button'
            data-action='create'
            onclick={event => {
              createCategory();
              event.stopPropagation();
            }}
          >
            <Icon id='plus' />
            <span>Create category</span>
          </button>
        </Collapse>
      );
    }
  });

  selector.subscribe(initial.card)(component);

  return component;
};

export default CollapseTags;
