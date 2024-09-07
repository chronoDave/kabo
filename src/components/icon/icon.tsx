import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as icons from './icons';

import './icon.scss';

export type IconProps = {
  id: keyof typeof icons;
};

const Icon: Component<IconProps> = () => {
  const component = new forgo.Component<IconProps>({
    render(props) {
      const icon = icons[props.id];

      return (
        <svg
          class='icon'
          aria-hidden="true"
          data-icon={props.id}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={icon.viewBox}
        >
          <path d={icon.d} />
        </svg>
      );
    }
  });

  return component;
};

export default Icon;
