export type Drop = {
  'data-droppable': true;
  'ondragenter'?: (event: DragEvent) => void;
  'onddragleave'?: (event: DragEvent) => void;
  'ondragover': (event: DragEvent) => void;
  'ondrop': (event: DragEvent) => void;
};

const drop = (ondrop: (data: string) => void): Drop => ({
  'data-droppable': true,
  'ondragover': event => {
    event.preventDefault();

    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  },
  'ondrop': event => {
    const data = event.dataTransfer?.getData('application/kabo');
    if (typeof data !== 'string') return;

    event.preventDefault();
    ondrop(data);
  }
});

export default drop;
