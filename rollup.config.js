import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const input = 'src/index.js';
const plugins = [
  babel({ exclude: '**/node_modules/**', babelHelpers: 'bundled' }),
];

const name = 'ReactFocusOnKeyDown';
const globals = { react: 'React' };
const external = id => !id.startsWith('.') && !id.startsWith('/');

export default [{
  external,
  input,
  output: { file: `dist/${pkg.name}.cjs.js`, format: 'cjs' },
  plugins,
}, {
  external,
  input,
  output: { file: `dist/${pkg.name}.esm.js`, format: 'esm' },
  plugins,
}, {
  external: Object.keys(globals),
  input,
  output: {
    file: `dist/${pkg.name}.umd.js`, format: 'umd', globals, name,
  },
  plugins: plugins.concat([terser()]),
}];
