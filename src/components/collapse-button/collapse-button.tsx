import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector, { set } from './collapse-button.state';

export type CollapseButtonProps = {
  id: string;
};

const CollapseButton: Component<CollapseButtonProps> = initial => {
  const component = new forgo.Component<CollapseButtonProps>({
    render(props) {
      const expanded = selector.state(props.id);

      return (
        <button
          type='button'
          aria-controls={props.id}
          aria-expanded={expanded}
          onclick={() => set(expanded ? null : props.id)}
        >
          {props.children}
        </button>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default CollapseButton;
