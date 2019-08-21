import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';

export default {
  entry: 'src/index.js',
  targets: [
    { dest: 'dist/redux-api-call.cjs.js', format: 'cjs' },
    { dest: 'dist/redux-api-call.es.js', format: 'es' },
  ],
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false, targets: { browsers: ['last 2 versions', 'IE >= 10'] } }]],
      plugins: ['@babel/transform-runtime'],
      runtimeHelpers: true,
    }),
    cleanup({ maxEmptyLines: 1 }),
  ],
};
