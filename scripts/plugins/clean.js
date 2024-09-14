import fs from 'fs/promises';

export default {
  name: 'clean',
  setup: build => {
    build.onStart(async () => {
      await fs.rm(build.initialOptions.outdir, {
        recursive: true,
        force: true
      });
    });
  }
};
