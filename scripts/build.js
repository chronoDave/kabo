import esbuild from 'esbuild';
import path from 'path';
import fsp from 'fs/promises';
import sass from '@chronocide/esbuild-plugin-sass';

import log from './plugins/log.js';
import clean from './plugins/clean.js';

const args = process.argv.slice(2);
const watch = args.includes('-w');
const outdir = path.resolve(process.cwd(), watch ? 'build' : 'docs');

const assets = async root => {
  const files = await fsp.readdir(root, { recursive: true });

  return files
    .filter(file => /\..*$/ui.test(file))
    .map(file => {
      const x = path.normalize(file);

      return { in: path.join(root, x), out: x.replace(/\..*/ui, '') };
    });
};

const config = {
  entryPoints: [
    'src/index.html',
    'src/index.tsx',
    ...await assets('src/assets')
  ],
  loader: {
    '.html': 'copy',
    '.png': 'copy',
    '.ico': 'copy',
    '.svg': 'copy',
    '.json': 'copy'
  },
  bundle: true,
  minify: !watch,
  metafile: true,
  sourcemap: watch,
  platform: 'browser',
  outdir,
  plugins: [
    clean,
    log,
    sass({
      minify: !watch,
      depedencies: ['src/scss/lib']
    })
  ]
};

if (watch) {
  const context = await esbuild.context(config);
  context.watch();
} else {
  const result = await esbuild.build(config);

  await fsp.writeFile(
    path.join(outdir, 'build.meta.json'),
    JSON.stringify(result.metafile)
  );
}
