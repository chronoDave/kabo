import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../store/actions';
import Card from '../card/card';
import selector from './lane.state';
import contentEditable from '../../lib/contentEditable/contentEditable';

import './lane.scss';
import Icon from '../icon/icon';

export type LaneProps = {
  id: string;
};

const Lane: Component<LaneProps> = initial => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const { lane, cards } = selector.state(props.id);

      if (!lane) return null;
      return (
        <article class='lane' data-id={props.id}>
          <header>
            <h3
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (title !== lane.title) actions.lane.update(props.id)(title);
              }}
            >
              {lane.title}
            </h3>
            <div class='toolbar'>
              <button
                type='button'
                onclick={() => actions.lane.delete(props.id)}
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

  selector.subscribe(initial.id)(component);

  return component;
};

export default Lane;
