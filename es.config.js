import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
export default {
  input: 'esm/index.js',
  plugins: [
    resolve(),
    babel({
      plugins: [
        ['remove-ungap', {
          exclude: [
            '@ungap/create-content'
          ]
        }]
      ],
    })
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    exports: 'named',
    file: 'es.max.js',
    format: 'iife',
    name: 'lighterhtml'
  }
};
