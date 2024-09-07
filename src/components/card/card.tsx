import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './card.state';
import * as actions from '../../store/actions';
import Toolbar from '../../lib/toolbar/toolbar';

import './card.scss';

export type CardProps = {
  id: string;
};

const Card: Component<CardProps> = initial => {
  const toolbar = new Toolbar();
  const component = new forgo.Component<CardProps>({
    render(props) {
      const card = selector.state(props.id);

      if (!card) return null;
      return (
        <article class='card' data-id={props.id}>
          <header>
            <h4
              {...toolbar.headingProps}
              onblur={event => actions.card.update(props.id)((event.target as HTMLHeadingElement).innerText)}
            >
              {card.title}
            </h4>
            <button
              {...toolbar.editProps}
              type='button'
            >
              Edit title
            </button>
            <button type='button' onclick={() => actions.card.remove(props.id)}>
              Remove card
            </button>
          </header>
        </article>
      );
    }
  });

  toolbar.on('edit', () => component.update());
  selector.subscribe(initial.id)(component);

  return component;
};

export default Card;
