import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../store/actions';
import selector from './task.state';
import Icon from '../icon/icon';
import contentEditable from '../../lib/contentEditable/contentEditable';

export type TaskProps = {
  id: string;
};

const Task: Component<TaskProps> = initial => {
  const component = new forgo.Component<TaskProps>({
    render(props) {
      const task = selector.state(props.id);

      if (!task) return null;
      return (
        <div id={task.id} class='task'>
          <button type='button' class='icon' data-action='delete'>
            <Icon id='circle' />
            <span class='sr-only'>Mark task as complete</span>
          </button>
          <p
            {...contentEditable()}
            onblur={event => {
              const title = (event.target as HTMLHeadingElement).innerText;
              if (title !== task.title) actions.task.update(props.id)({ title });
            }}
          >
            {task.title}
          </p>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Task;
