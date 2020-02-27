const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    index: './src/js/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template-html-for-webpack/index.html',
      filename: path.resolve(__dirname, 'dist/index.html'),
      chunks: ['index'],
    }),
  ],
};
