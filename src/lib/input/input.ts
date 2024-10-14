export const input = (type: string) => (fn: (value: string) => void) => {
  const el = document.createElement('input');
  el.type = type;
  el.addEventListener('change', () => fn(el.value), { passive: true });
  el.click();
};

export const colour = input('color');
