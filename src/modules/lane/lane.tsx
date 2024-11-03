import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import contentEditable from '../../lib/contentEditable/contentEditable';
import Card from '../card/card';
import Icon from '../../components/icon/icon';
import selector, {
  setTitle,
  createCard,
  moveLeft,
  moveRight,
  removeCard
} from './lane.state';

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
                  if (title !== lane.title) setTitle(props.id)(title);
                }}
              >
                {lane.title}
              </h3>
              <span class='badge'>{lane.cards.length}</span>
            </hgroup>
            <div class='actions'>
              <button
                type='button'
                onclick={() => createCard(props.id)}
              >
                <Icon id='plus' />
                <span class='sr-only'>Add card</span>
              </button>
              <button type='button' onclick={() => moveLeft(props.id)}>
                <Icon id='arrowLeft' />
                <span class='sr-only'>Move left</span>
              </button>
              <button type='button' onclick={() => moveRight(props.id)}>
                <Icon id='arrowRight' />
                <span class='sr-only'>Move right</span>
              </button>
              <button type='button' data-action='delete'>
                <Icon id='trash' />
                <span class='sr-only'>Remove lane</span>
              </button>
            </div>
          </header>
          <ol
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const card = button?.closest<HTMLElement>('.card');

              if (button?.dataset.action === 'create') {
                createCard(props.id);
                event.stopPropagation();
              }

              if (button?.dataset.action === 'delete' && card) {
                removeCard(props.id)(card.id);
                event.stopPropagation();
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
            <li data-dropzone>
              <button type='button' data-action='create'>
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
