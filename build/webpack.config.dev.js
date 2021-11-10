'use strict'

module.exports = {
  mode: 'development',
  devtool: "eval-source-map",
  entry: {
    main: './source/full',
    debug: './source/debug',
    tests: './source/tests',
    helper: './source/helper',
  },
  output: {
    filename: '[name].js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};