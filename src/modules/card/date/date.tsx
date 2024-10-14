import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../store/actions';

import selector from './date.state';

export type DateProps = {
  card: string;
};

const Date: Component<DateProps> = initial => {
  const component = new forgo.Component<DateProps>({
    render(props) {
      const id = `${props.card}-date`;
      const date = selector.state(props.card);

      return [
        <label for={id} class='sr-only'>Select due date</label>,
        <input
          type='date'
          value={date}
          onchange={event => actions.card.update(props.card)({ date: event.currentTarget.value })}
        />
      ];
    }
  });

  selector.subscribe(initial.card)(component);

  return component;
};

export default Date;
