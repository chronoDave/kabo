import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type ToolbarAddProps = {
  onadd: (title: string) => void;
  default: string;
  label: {
    input: string;
    submit: string;
  };
};

const ToolbarAdd: Component<ToolbarAddProps> = () => {
  const id = crypto.randomUUID();
  const component = new forgo.Component<ToolbarAddProps>({
    render(props) {
      return (
        <form
          onsubmit={event => {
            event.preventDefault();

            const root = event.target as HTMLFormElement;
            const formData = new FormData(root);
            
            root.reset();

            let title = formData.get('title')?.toString();
            if (!title || title.length === 0) title = props.default;

            props.onadd(title);
          }}
        >
          <label for={id}>{props.label.input}</label>
          <input name='title' id={id} type='text' />
          <button type='submit'>{props.label.submit}</button>
        </form>
      );
    }
  });

  return component;
};

export default ToolbarAdd;
