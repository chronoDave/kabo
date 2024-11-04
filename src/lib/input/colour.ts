export default async () => new Promise<string>(resolve => {
  const el = document.createElement('input');
  el.type = 'color';
  el.addEventListener('change', () => resolve(el.value), false);
  el.click();
});
