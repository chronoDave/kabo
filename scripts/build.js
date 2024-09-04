import esbuild from 'esbuild';
import path from 'path';
import sass from '@chronocide/esbuild-plugin-sass';

import log from './plugins/log.js';

const args = process.argv.slice(2);
const watch = args.includes('-w');

const config = {
  entryPoints: [
    'src/index.html',
    'src/index.tsx'
  ],
  loader: {
    '.html': 'copy'
  },
  bundle: true,
  platform: 'browser',
  outdir: path.resolve(process.cwd(), 'build'),
  plugins: [
    log,
    sass({
      minify: !watch
    })
  ]
};

if (watch) {
  const context = await esbuild.context(config);
  context.watch();
} else {
  esbuild.build(config);
}
