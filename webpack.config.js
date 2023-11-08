const path = require('path')

module.exports = {
  entry: {
    main: './src/js/main.js',
    share: './src/js/share.js',
    search: './src/js/search.js',
    customFontLoader: './src/js/customFontLoader.js',
  },
  output: {
    path: path.resolve(__dirname, 'source/scripts'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 0.25%, not dead',
                  bugfixes: true,
                  useBuiltIns: 'usage',
                  corejs: { version: '3.16.2', proposals: false },
                },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  version: '^7.15.0',
                },
              ],
            ],
          },
        },
      },
    ],
  },
}
