import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../store/actions';
import Card from '../card/card';
import selector from './lane.state';
import Toolbar from '../../lib/toolbar/toolbar';
import FormAdd from '../form-add/form-add';

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
        <article data-id={props.id}>
          <header>
            <h3
              {...toolbar.headingProps}
              onblur={event => actions.lane.update(props.id)((event.target as HTMLHeadingElement).innerText)}
            >
              {lane.title}
            </h3>
            <button
              {...toolbar.editProps}
              type='button'
            >
              Edit title
            </button>
            <button type='button' onclick={() => actions.lane.remove(props.id)}>
              Remove lane
            </button>
          </header>
          <FormAdd
            onadd={actions.card.create(props.id)}
            default='New Card'
            label={{
              submit: 'Add card',
              input: 'Card title'
            }}
          />
          {cards.length > 0 ? (
            <ol>
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
