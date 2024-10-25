export default () => {
  const cache = new Map<Element, Element>();

  document.addEventListener('focusin', event => {
    const root = event.target as Element | null;
    const target = root?.closest('[draggable]');
    
    if (root && target) {
      cache.set(root, target);
      target.toggleAttribute('draggable', false);
    }
  }, false);

  document.addEventListener('focusout', event => {
    const root = event.target as Element | null;
    
    if (root) {
      const target = cache.get(root);
      cache.delete(root);

      target?.setAttribute('draggable', 'true');
    }
  });
};
