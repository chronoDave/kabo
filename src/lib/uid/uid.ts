import random from '../math/random';

export default () => {
  const x = Date.now().toString(36);
  const y = random(65536);

  return `${x}${y}`;
};
