import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'esm/index.js',
  plugins: [
    resolve(),
    babel({
      plugins: [['remove-ungap']],
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
