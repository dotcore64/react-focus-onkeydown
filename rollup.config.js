import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const input = 'src/index.js';
const plugins = [
  babel({ exclude: '**/node_modules/**', babelHelpers: 'bundled' }),
];

const name = 'ReactFocusOnKeyDown';
const globals = { react: 'React' };
const external = (id) => !id.startsWith('.') && !id.startsWith('/');

export default [{
  external,
  input,
  output: [
    { file: 'dist/index.cjs', format: 'cjs', exports: 'default' },
    { file: 'dist/index.js', format: 'esm' },
  ],
  plugins,
}, {
  external: Object.keys(globals),
  input,
  output: {
    file: 'dist/index.umd.js', format: 'umd', globals, name,
  },
  plugins: plugins.concat([terser()]),
}];
