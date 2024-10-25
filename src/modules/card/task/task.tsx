import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import * as actions from '../../../store/actions';
import selector from './task.state';
import Icon from '../../../components/icon/icon';
import contentEditable from '../../../lib/contentEditable/contentEditable';

import './task.scss';

export type TaskProps = {
  id: string;
};

const Task: Component<TaskProps> = initial => {
  const component = new forgo.Component<TaskProps>({
    render(props) {
      const task = selector.state(props.id);

      if (!task) return null;
      return (
        <div
          id={task.id}
          class='task'
          data-done={!!task.done}
          aria-live='polite'
        >
          <button type='button' class='icon' data-action='update'>
            {task.done ? <Icon id='circleDot' /> : <Icon id='circle' />}
            <span class='sr-only'>{task.done ? 'Mark task as incomplete' : 'Mark task as complete'}</span>
          </button>
          {task.done ? <s>{task.title}</s> : (
            <p
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (title !== task.title) actions.task.update(props.id)({ title });
              }}
            >
              {task.title}
            </p>
          )}
          <button type='button' class='icon' data-action='delete'>
            <Icon id='xmark' />
            <span class='sr-only'>Delete task</span>
          </button>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Task;
