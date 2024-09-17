export type Drag = {
  draggable: true;
  ondragstart: (event: DragEvent) => void;
  ondragend: (event: DragEvent) => void;
};

const drag = (data: string): Drag => ({
  draggable: true,
  ondragstart: event => {
    const root = event.target as HTMLElement;
    const { id } = root.dataset;

    if (event.dataTransfer && typeof id === 'string') {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData('application/kabo', data);
      root.setAttribute('data-grabbed', 'true');
    }
  },
  ondragend: event => {
    const root = event.target as HTMLElement;

    root.setAttribute('data-grabbed', 'false');
  }
});

export default drag;
