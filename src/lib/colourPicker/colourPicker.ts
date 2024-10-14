export default (fn: (colour: string) => void) => {
  const el = document.createElement('input');
  el.type = 'color';
  el.addEventListener('change', () => fn(el.value), { passive: true });
  el.click();
};
