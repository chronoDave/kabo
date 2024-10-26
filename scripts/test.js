import esbuild from 'esbuild';
import path from 'path';

import log from './plugins/log.js';
import clean from './plugins/clean.js';

const outdir = path.resolve(process.cwd(), 'build/test');

esbuild.build({
  entryPoints: [
    'src/**/*.spec.ts',
    'src/**/*.spec.tsx'
  ],
  bundle: true,
  format: 'esm',
  outdir,
  external: [
    'tape',
    'forgo',
    'jsdom',
    'immer',
    'runtypes'
  ],
  platform: 'node',
  plugins: [log, clean]
});
