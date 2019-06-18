const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins : [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src','resources'),
        to: path.join(__dirname, './.webpack/renderer/main_window'),
      }
    ]),
  ]
};
