const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/js/main.js',
    share: './src/js/share.js',
    search: './src/js/search.js',
  },
  output: {
    path: path.resolve(__dirname, 'source/scripts'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
    ],
  },
}
