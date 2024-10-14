import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../../store/actions';
import selector from './category.state';
import contentEditable from '../../../../lib/contentEditable/contentEditable';
import Icon from '../../../icon/icon';

export type CategoryProps = {
  id: string;
};

const Category: Component<CategoryProps> = initial => {
  const component = new forgo.Component<CategoryProps>({
    render(props) {
      const state = selector.state(props.id);

      if (!state) return null;
      return (
        <div
          id={props.id}
          class='category'
          style={[
            `--category-bg: ${state.colour.background}`,
            `--category-text: ${state.colour.text}`
          ].join(';')}
        >
          <p
            {...contentEditable()}
            onblur={event => {
              const title = (event.target as HTMLHeadingElement).innerText;
              if (title !== state.category.title) actions.category.update(props.id)({ title });
            }}
          >
            {state.category.title}
          </p>
          <button class='clear' type='button' data-action='delete'>
            <Icon id='xmark' />
            <span class='sr-only'>Remove {state.category.title}</span>
          </button>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Category;
