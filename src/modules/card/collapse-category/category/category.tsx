import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../../store/actions';
import selector from './category.state';
import contentEditable from '../../../../lib/contentEditable/contentEditable';

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
          {...contentEditable()}
          onblur={event => {
            const title = (event.target as HTMLHeadingElement).innerText;
            if (title !== state.category.title) actions.category.update(props.id)({ title });
          }}
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
