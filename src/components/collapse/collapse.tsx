import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import cx from '../../lib/cx/cx';

import selector from './collapse.state';

export type CollapseProps = {
  id: string;
};

const Collapse: Component<CollapseProps> = initial => {
  const component = new forgo.Component<CollapseProps>({
    render(props) {
      const expanded = selector.state(props.id);

      return (
        <div
          id={props.id}
          class={cx('collapse', !expanded && 'hidden')}
        >
          {props.children}
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Collapse;
