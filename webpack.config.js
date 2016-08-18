const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const SRC_PATH = path.join(__dirname, 'example', 'app.js');
const BUILD_PATH = path.join(__dirname, 'example', 'build');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: SRC_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.css'],
    alias: {
      'react-term': path.resolve(__dirname, './src/Terminal.js'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // eslint-disable-line
          'postcss-loader',
        ],
      },
    ],
  },

  postcss() {
    return [autoprefixer];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
