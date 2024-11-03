import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import selector, { setTaskTitle } from './task.state';
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
          <button type='button' data-action='update'>
            {task.done ? <Icon id='circleDot' /> : <Icon id='circle' />}
            <span class='sr-only'>{task.done ? 'Mark task as incomplete' : 'Mark task as complete'}</span>
          </button>
          {task.done ? <s>{task.title}</s> : (
            <p
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (title !== task.title) setTaskTitle(props.id)(title);
              }}
            >
              {task.title}
            </p>
          )}
          <button type='button' data-action='delete'>
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
