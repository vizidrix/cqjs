'use strict';

const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV

const config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: '/node-modules/'
      }
    ]
  },
  output: {
    library: 'CQJS',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config

/*
module.exports = {
  entry: './dist/cqjs.js',
  //entry: './src/cqjs.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'cqjs.bundle.js',
    //publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        //test: /\.js$/,
        test: path.join(__dirname, 'dist'),
        loaders: ['babel-loader']
      }
    ],
  },
};
*/


/*
module.exports = {
  devtool: 'eval',
  entry: './dist/cqjs.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'cqjs.bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ],
  },
};
*/
