const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist', process.env.NAME || 'react-redux'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NAME']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
          ]
        },
      }],
    }],
  },
  devServer: {
    port: process.env.PORT || '8080',
    historyApiFallback: true,
  },
};
