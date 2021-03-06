import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const env = process.env.NODE_ENV || 'development';

export default {
  input: './src/main.jsx',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    babel({
      exclude: ['node_modules/**', '../node_modules/**'],
      babelrc: false,
      presets: [
        '@babel/env',
        '@babel/react',
      ],
    }),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs({
      include: ['node_modules/**', '../node_modules/**'],
      namedExports: {
        '../node_modules/react/index.js': ['useEffect', 'useState', 'useRef'], // use only one instance of react
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    serve({
      contentBase: 'public',
      port: process.env.PORT || 3000,
    }),
    livereload('public'),
  ],
  output: {
    file: './public/client.js',
    format: 'iife',
    name: 'ReactFocusOnKeyDownExamples',
    sourcemap: true,
  },
};
