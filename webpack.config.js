const path = require('path')

module.exports = {
  entry: {
    main: './src/js/main.js',
    share: './src/js/share.js',
    search: './src/js/search.js'
  },
  output: {
    path: path.join(__dirname, './source/scripts'),
    filename: '[name].js'
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

