import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../store/actions';
import Card from '../card/card';
import selector from './lane.state';
import Toolbar from '../../lib/toolbar/toolbar';

import './lane.scss';
import Icon from '../icon/icon';

export type LaneProps = {
  id: string;
};

const Lane: Component<LaneProps> = initial => {
  const toolbar = new Toolbar();
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const { lane, cards } = selector.state(props.id);

      if (!lane) return null;
      return (
        <article class='lane' data-id={props.id}>
          <header>
            <h3
              {...toolbar.headingProps}
              onblur={event => actions.lane.update(props.id)((event.target as HTMLHeadingElement).innerText)}
            >
              {lane.title}
            </h3>
            <div class='toolbar'>
              <button
                type='button'
                onclick={() => actions.lane.remove(props.id)}
                class='icon'
              >
                <Icon id='xmark' />
                <span class='sr-only'>Remove lane</span>
              </button>
            </div>
          </header>
          <button
            class='clear'
            type='button'
            onclick={() => actions.card.create(props.id)('New card')}
          >
            <Icon id='plus' />
            Add card
          </button>
          {cards.length > 0 ? (
            <ol class='clear'>
              {cards.map(card => (
                <li key={card}>
                  <Card id={card} />
                </li>
              ))}
            </ol>
          ) : null}
        </article>
      );
    }
  });

  toolbar.on('edit', () => component.update());
  selector.subscribe(initial.id)(component);

  return component;
};

export default Lane;
