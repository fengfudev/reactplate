const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, './app'),
  entry: ['babel-regenerator-runtime', './index.jsx'],
  // entry: './index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // path: path.resolve(__dirname, './dist/assets'),
    // publicPath: '/assets'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
        ],
      },

      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: [
              'transform-decorators-legacy', 
              'transform-class-properties',
              // ["transform-runtime", {
              //   "polyfill": false,
              //   "regenerator": true
              // }]
            ]
          }
        }],
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test for react and webpack 2',
      template: 'index.ejs'
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }

};