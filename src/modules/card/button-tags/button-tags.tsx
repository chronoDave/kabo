import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Icon from '../../../components/icon/icon';
import * as actions from '../../../store/actions';

import selector from './button-tags.state';

export type ButtonTagsProps = {
  id: string;
};

const ButtonTags: Component<ButtonTagsProps> = initial => {
  const component = new forgo.Component<ButtonTagsProps>({
    render(props) {
      const expanded = selector.state(props.id);
  
      return (
        <button
          type='button'
          aria-controls={props.id}
          aria-expanded={expanded}
          onclick={() => actions.active.collapse(expanded ? null : props.id)}
        >
          <Icon id='tag' />
          <span class='sr-only'>Tags</span>
        </button>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default ButtonTags;
