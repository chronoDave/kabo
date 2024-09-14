import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Card from '../card/card';
import Icon from '../icon/icon';
import selector from './lane.state';

import './lane.scss';

export type LaneProps = {
  id: string;
};

const Lane: Component<LaneProps> = initial => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const lane = selector.state(props.id);

      if (!lane) return null;
      return (
        <article class='lane' data-id={props.id}>
          <header>
            <h3
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (title !== lane.title) actions.lane.update(props.id)({ title });
              }}
            >
              {lane.title} ({lane.cards.length})
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
          {lane.cards.length > 0 ? (
            <ol class='clear'>
              {lane.cards.map((card, i) => (
                <li key={card}>
                  <Card
                    id={card}
                    onmoveup={id => actions.move.card(id)({ id: lane.id, n: i })({ id: lane.id, n: i - 1 })}
                    onmovedown={id => actions.move.card(id)({ id: lane.id, n: i })({ id: lane.id, n: i + 1 })}
                  />
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
