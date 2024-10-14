import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Card from '../card/card';
import Icon from '../../components/icon/icon';
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
        <article id={lane.id} class='lane' data-size={lane.cards.length}>
          <header>
            <hgroup>
              <h3
                {...contentEditable()}
                onblur={event => {
                  const title = (event.target as HTMLHeadingElement).innerText;
                  if (title !== lane.title) actions.lane.update(props.id)({ title });
                }}
              >
                {lane.title}
              </h3>
              <p>({lane.cards.length})</p>
            </hgroup>

            <div class='toolbar'>
              <button
                type='button'
                data-action='delete'
                class='icon'
              >
                <Icon id='xmark' />
                <span class='sr-only'>Remove lane</span>
              </button>
            </div>
          </header>
          <ul
            class='clear'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const card = button?.closest<HTMLElement>('.card');

              if (button?.dataset.action === 'create') {
                actions.card.create(lane.id)('New card');
              }

              if (button?.dataset.action === 'delete' && card) {
                actions.card.delete(card.id);
              }
            }}
          >
            {lane.cards.map(card => (
              <li
                key={card}
                draggable
                data-grabbed={false}
                data-dropzone
              >
                <Card id={card} />
              </li>
            ))}
            <li data-dropzone="true">
              <button
                class='clear default'
                type='button'
                data-action='create'
              >
                <Icon id='plus' />
                Add card
              </button>
            </li>
          </ul>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Lane;
