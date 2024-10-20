import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { IconProps } from '../icon/icon';

import * as forgo from 'forgo';

import { active } from '../../store/actions';
import cx from '../../lib/cx/cx';
import Icon from '../icon/icon';

import selector from './menu.state';

import './menu.scss';

export type MenuProps = {
  id: string;
  icon: IconProps['id'];
  class?: string;
  onclick?: (event: forgo.JSX.TargetedMouseEvent<HTMLUListElement>) => void;
  position?: {
    x: 'left' | 'right';
    y: 'top' | 'bottom';
  };
  label: {
    button: string;
    menu: string;
  };
};

const Menu: Component<MenuProps> = initial => {
  const component = new forgo.Component<MenuProps>({
    render(props) {
      const expanded = selector.state(props.id);

      return (
        <div class={cx('menu', props.class)}>
          <button
            type='button'
            class='icon'
            aria-controls={props.id}
            aria-haspopup
            aria-expanded={expanded}
            onclick={() => active.menu(expanded ? null : props.id)}
          >
            <Icon id={props.icon} />
            <span class='sr-only'>{props.label.button}</span>
          </button>
          <ul
            id={props.id}
            role='menu'
            aria-label={props.label.menu}
            tabindex={-1}
            class={cx(
              props.position?.y ?? 'bottom',
              props.position?.x ?? 'left',
              !expanded && 'hidden'
            )}
            onclick={event => {
              props.onclick?.(event);

              const button = (event.target as HTMLElement | null)?.closest('button');
              if (button?.dataset.autoclose === 'true') active.menu(null);              
            }}
          >
            {props.children}
          </ul>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Menu;
