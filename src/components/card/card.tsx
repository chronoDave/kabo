import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector from './card.state';
import { remove } from '../../store/actions/card';

export type CardProps = {
  id: string;
};

const Card: Component<CardProps> = initial => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      const card = selector.state(props.id);

      if (!card) return null;
      return (
        <article data-id={props.id}>
          <header>
            <h4>{card.title}</h4>
            <button type='button' onclick={() => remove(props.id)}>
              Remove card
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
