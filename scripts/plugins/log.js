export default {
  name: 'log',
  setup: build => {
    const label = '[esbuild]';

    build.onStart(() => {
      console.time(label);
    });
    build.onEnd(() => {
      console.timeEnd(label);
    });
  }
};
