import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './card.state';
import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Icon from '../icon/icon';

import './card.scss';

export type CardProps = {
  id: string;
  onmoveup: (id: string) => void;
  onmovedown: (id: string) => void;
};

const Card: Component<CardProps> = initial => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      const card = selector.state(props.id);

      if (!card) return null;
      return (
        <article class='card' data-id={props.id}>
          <header>
            <h4
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (card.title !== title) actions.card.update(props.id)({ title });
              }}
            >
              {card.title}
            </h4>
            <button
              type='button'
              class='icon'
              onclick={() => props.onmoveup(props.id)}
            >
              <Icon id='chevronUp' />
              <span class='sr-only'>Move card up</span>
            </button>
            <button
              type='button'
              class='icon'
              onclick={() => props.onmovedown(props.id)}
            >
              <Icon id='chevronDown' />
              <span class='sr-only'>Move card down</span>
            </button>
            <button
              type='button'
              onclick={() => actions.card.delete(props.id)}
              class='icon'
            >
              <Icon id='xmark' />
              <span class='sr-only'>Remove card</span>
            </button>
          </header>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Card;
