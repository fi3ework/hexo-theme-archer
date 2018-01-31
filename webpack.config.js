const webpack = require('webpack')
const path = require('path')


module.exports = {
  entry: './src/js/main.js', // 已多次提及的唯一入口文件
  output: {
    path: path.join(__dirname, './source/scripts'),
    filename: 'main.js'
  },
  devtool: 'none',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [require('@babel/plugin-proposal-class-properties'),
            require('@babel/plugin-proposal-object-rest-spread')]
        }
      },
    }]
  }
}