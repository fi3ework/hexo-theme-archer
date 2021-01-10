const webpack = require('webpack')
const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin");
const config = require('./webpack.config.js')

module.exports = merge(config, {
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
