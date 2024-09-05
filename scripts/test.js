import esbuild from 'esbuild';
import path from 'path';
import log from './plugins/log.js';

esbuild.build({
  entryPoints: [
    'src/**/*.spec.ts',
    'src/**/*.spec.tsx'
  ],
  bundle: true,
  format: 'esm',
  outdir: path.resolve(process.cwd(), 'build/test'),
  external: [
    'tape',
    'forgo',
    'jsdom'
  ],
  platform: 'node',
  plugins: [log]
});
