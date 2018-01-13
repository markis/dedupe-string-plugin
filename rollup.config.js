var typescript = require('rollup-plugin-typescript');

module.exports = {
  input: './src/index.ts',
  output: {
    file: 'index.js',
    name: 'dedupe',
    format: 'cjs',
  },
  external: [
    'assert',
    'de-dupe',
    'fs',
    'path',
    'webpack',
    'webpack-sources',
    'typescript'
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
  ]
};