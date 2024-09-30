import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './category.state';

import './category.scss';

export type CategoryProps = {
  id: string;
};

const Category: Component<CategoryProps> = initial => {
  const component = new forgo.Component<CategoryProps>({
    render(props) {
      const state = selector.state(props.id);

      if (!state) return null;
      return (
        <p
          class='category'
          style={[
            `--category-bg: ${state.colour.background}`,
            `--category-text: ${state.colour.text}`
          ].join(';')}
        >
          {state.category.title}
        </p>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Category;
