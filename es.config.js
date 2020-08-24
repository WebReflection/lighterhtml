import {nodeResolve} from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'esm/index.js',
  plugins: [
    nodeResolve(),
    babel({
      plugins: [['remove-ungap']],
      babelHelpers: 'bundled'
    }),
    terser()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'es.js',
    format: 'iife',
    name: 'lighterhtml'
  }
};
