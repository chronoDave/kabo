import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../store/actions';
import Icon from '../icon/icon';
import Menu from '../menu/menu';
import selector from './menu-category.state';

import './menu-category.scss';
import Category from '../category/category';
import colourPicker from '../../lib/colourPicker/colourPicker';

export type MenuCategoryProps = {
  card: string;
};

const MenuCategory: Component<MenuCategoryProps> = initial => {
  const component = new forgo.Component<MenuCategoryProps>({
    render(props) {
      const categories = selector.state(props.card);

      return (
        <Menu
          id={`category-menu-${props.card}`}
          class='category'
          icon='tag'
          label={{
            button: 'button',
            menu: 'menu'
          }}
          onclick={event => {
            const button = (event.target as HTMLElement | null)?.closest('button');
            const label = (event.target as HTMLElement | null)?.closest('label');
            const category = (button ?? label)?.closest<HTMLElement>('li');

            if (label?.dataset.action === 'toggle' && category) {
              actions.card.toggleCategory(props.card)(category.id);
              event.stopPropagation();
            }

            if (button?.dataset.action === 'update' && category) {
              if (button.dataset.attribute === 'colour') {
                colourPicker(colour => actions.category.update(category.id)({ colour }));
                event.stopPropagation();
              }
            }

            if (button?.dataset.action === 'create' && category) {
              actions.category.create({ title: 'New category' });
              event.stopPropagation();
            }

            if (button?.dataset.action === 'remove' && category) {
              actions.category.delete(category.id);
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
              <Category id={category} />
              <button type='button' data-action='update' data-attribute='colour'>
                <Icon id='eyeDropper' />
                <span class='sr-only'>Change colour</span>
              </button>
              <button type='button' data-action='remove'>
                <Icon id='xmark' />
                <span class='sr-only'>Remove category</span>
              </button>
            </li>
          ))}
          <li>
            <button type='button' data-action='create'>
              <Icon id='plus' />
              <span>Create category</span>
            </button>
          </li>
        </Menu>
      );
    }
  });

  selector.subscribe(initial.card)(component);

  return component;
};

export default MenuCategory;
