import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../store/actions';
import Icon from '../icon/icon';
import Menu from '../menu/menu';
import selector from './menu-category.state';

import './menu-category.scss';
import Category from '../category/category';

export type MenuCategoryProps = {
  card: string;
};

const MenuCategory: Component<MenuCategoryProps> = () => {
  const component = new forgo.Component<MenuCategoryProps>({
    render(props) {
      const categories = selector.state();

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
            const category = button?.closest<HTMLElement>('li');

            if (button?.dataset.action === 'toggle' && category) {
              actions.category.toggle({ card: props.card, category: category.id });
              event.stopPropagation();
            }

            if (button?.dataset.action === 'create' && category) {
              actions.category.create({ title: 'New category' });
              event.stopPropagation();
            }
          }}
        >
          {categories.map(category => (
            <li id={category} key={category}>
              <button type='button' data-action='toggle'>
                <Category id={category} />
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

  selector.subscribe()(component);

  return component;
};

export default MenuCategory;
