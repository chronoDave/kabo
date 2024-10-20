import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Lane from '../lane/lane';
import selector from './board.state';
import * as actions from '../../store/actions';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Icon from '../../components/icon/icon';

import './board.scss';

export type BoardProps = {
  id: string;
};

const Board: Component<BoardProps> = initial => {
  const component = new forgo.Component<BoardProps>({
    render(props) {
      const board = selector.state(props.id);

      if (!board) return null;
      return (
        <article class='board'>
          <header>
            <h2
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (title !== board.title) actions.board.update(props.id)({ title });
              }}
            >
              {board.title}
            </h2>
          </header>
          <ol
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const card = button?.closest<HTMLElement>('.card');
              const lane = button?.closest<HTMLElement>('.lane');

              if (button?.dataset.action === 'create') {
                actions.lane.create(board.id)('New lane');
              }

              if (button?.dataset.action === 'delete' && lane) {
                actions.lane.delete(lane.id);
              }

              if (button?.dataset.action === 'move' && lane && card) {
                if (button.dataset.direction === 'up') {
                  actions.move.card({ card: card.id, lane: lane.id })({ n: -1 });
                }

                if (button.dataset.direction === 'down') {
                  actions.move.card({ card: card.id, lane: lane.id })({ n: +1 });
                }

                if (button.dataset.direction === 'left') {
                  const i = board.lanes.indexOf(lane.id);
                  if (i > 0) actions.move.card({ card: card.id, lane: lane.id })({ lane: board.lanes[i - 1] });
                }

                if (button.dataset.direction === 'right') {
                  const i = board.lanes.indexOf(lane.id);
                  if (i < board.lanes.length) actions.move.card({ card: card.id, lane: lane.id })({ lane: board.lanes[i + 1] });
                }

                if (button.dataset.direction === 'end') {
                  actions.move.card({ card: card.id, lane: lane.id })({ lane: board.lanes[board.lanes.length - 1] });
                }
              }
            }}
            ondragstart={event => {
              const root = event.target as HTMLElement; // Guaranteed to be card element

              if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.dropEffect = 'move';
                root.setAttribute('data-grabbed', 'true');
              }
            }}
            ondragend={event => {
              (event.target as HTMLElement).setAttribute('data-grabbed', 'false');
            }}
            ondragover={event => {
              event.preventDefault();
              const dropzone = (event.target as HTMLElement).closest('[data-dropzone="true"]');

              if (event.dataTransfer) event.dataTransfer.dropEffect = dropzone ? 'move' : 'none';
            }}
            ondrop={event => {
              const dropzone = (event.target as HTMLElement).closest('[data-dropzone="true"]');

              if (dropzone) {
                event.preventDefault();

                const from = {
                  card: document.querySelector('[data-grabbed="true"] .card')?.id,
                  lane: document.querySelector('[data-grabbed="true"] .lane')?.id
                };

                const to = {
                  card: (event.target as HTMLElement).closest('.card')?.id,
                  lane: (event.target as HTMLElement).closest('.lane')?.id
                };

                if (typeof from.card === 'string') actions.move.card({ card: from.card, lane: from.lane })(to);
              }
            }}
          >
            {board.lanes.map(lane => (
              <li key={lane}>
                <Lane id={lane} />
              </li>
            ))}
            <li class='default'>
              <button
                type='button'
                data-action='create'
              >
                <Icon id='plus' />
                Add lane
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

export default Board;
