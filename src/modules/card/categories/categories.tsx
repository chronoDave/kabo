import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../store/actions';
import Icon from '../../../components/icon/icon';
import Category from './category/category';
import CollapseCategory from '../collapse-category/collapse-category';

import './categories.scss';

export type CategoriesProps = {
  card: string;
  categories: string[];
};

const Categories: Component<CategoriesProps> = () => {
  let expanded = false;

  const component = new forgo.Component<CategoriesProps>({
    render(props) {
      const id = `${props.card}-tags`;

      return [
        <div class='categories'>
          <ul
            class='clear'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const category = button?.closest<HTMLElement>('.category');

              if (button?.dataset.action === 'delete' && category) {
                actions.card.removeCategory(props.card)(category.id);
                event.stopPropagation();
              }
            }}
          >
            {props.categories.map(category => (
              <li key={category}>
                <Category id={category} />
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
        <CollapseCategory card={props.card} id={id} expanded={expanded} />
      ];
    }
  });

  return component;
};

export default Categories;
