const webpack = require('webpack');
const path = require('path');
const {mergeWith, concat} = require('ramda');

const SRC_PATH = path.join(__dirname, 'docs', 'example', 'app.js');
const BUILD_PATH = path.join(__dirname, 'docs');

const ENV = process.env.NODE_ENV;

const devel = {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

const prod = {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
};

const base = {
  entry: SRC_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      rebash: path.resolve(__dirname, './src/Terminal.js'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
  ],
};

const config = ENV === 'production' ? prod : devel;

module.exports = mergeWith(concat, base, config);
