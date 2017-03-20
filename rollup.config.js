var typescript = require('rollup-plugin-typescript');

module.exports = {
  entry: './src/index.ts',
  dest: 'index.js',
  format: 'cjs',
  moduleId: 'de-dupe',
  moduleName: 'dedupe',
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