const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const config = require('./webpack.config.js')

module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})
