import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import cx from '../../lib/cx/cx';

export type CollapseProps = {
  id: string;
  expanded: boolean;
};

const Collapse: Component<CollapseProps> = () => {
  const component = new forgo.Component<CollapseProps>({
    render(props) {
      return (
        <div
          id={props.id}
          class={cx('collapse', !props.expanded && 'hidden')}
        >
          {props.children}
        </div>
      );
    }
  });

  return component;
};

export default Collapse;
