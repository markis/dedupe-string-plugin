var StringDedupePlugin = require('../index.js');

module.exports = {
  entry: {
    'index': './index'
  },
  output: {
    filename: 'output.[name].js'
  },
  plugins: [
    new StringDedupePlugin({
      addScope: true
    })
  ]
};
