import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../store/actions';
import contentEditable from '../../../lib/contentEditable/contentEditable';
import selector from './tag.state';

import './tag.scss';

export type TagProps = {
  id: string;
};

const Tag: Component<TagProps> = initial => {
  const component = new forgo.Component<TagProps>({
    render(props) {
      const state = selector.state(props.id);

      if (!state) return null;
      return (
        <div
          id={props.id}
          class='tag'
          style={[
            `--tag-bg: ${state.colour.background}`,
            `--tag-text: ${state.colour.text}`
          ].join(';')}
        >
          <p
            {...contentEditable}
            onblur={event => {
              const title = (event.target as HTMLHeadingElement).innerText;
              if (title !== state.category.title) actions.category.update(props.id)({ title });
            }}
          >
            {state.category.title}
          </p>
          {props.children}
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Tag;
