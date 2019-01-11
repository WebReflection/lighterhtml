import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
export default {
  input: 'esm/index.js',
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true,
      presets: ['@babel/preset-env']
    })
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    exports: 'named',
    file: 'index.js',
    format: 'iife',
    name: 'lighthtml'
  }
};
