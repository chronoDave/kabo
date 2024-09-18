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
        <article id={lane.id} class='lane' data-size={lane.cards.length}>
          <header>
            <hgroup>
              <h3
                {...contentEditable}
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
                onclick={() => actions.lane.delete(props.id)}
                class='icon'
              >
                <Icon id='xmark' />
                <span class='sr-only'>Remove lane</span>
              </button>
            </div>
          </header>
          <ol class='clear'>
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
          </ol>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Lane;
