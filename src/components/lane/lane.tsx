import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as card from '../../store/actions/card';
import { remove } from '../../store/actions/lane';
import Card from '../card/card';
import selector from './lane.state';

export type LaneProps = {
  id: string;
};

const Lane: Component<LaneProps> = initial => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const { lane, cards } = selector.state(props.id);

      if (!lane) return null;
      return (
        <article data-id={props.id}>
          <header>
            <h3>{lane.title}</h3>
            <button type='button' onclick={() => remove(props.id)}>
              Remove lane
            </button>
          </header>
          {cards.length > 0 ? (
            <ol>
              {cards.map(card => (
                <li key={card}>
                  <Card id={card} />
                </li>
              ))}
            </ol>
          ) : null}
          <button type='button' onclick={() => card.create(props.id)('New Card')}>
            Add card
          </button>
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Lane;
