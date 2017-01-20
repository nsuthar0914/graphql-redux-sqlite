
var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var mainPath = path.resolve(__dirname, 'client', 'main.js');
var publicPath = path.resolve(__dirname, 'public');
console.log(nodeModulesPath)
var config = {
  devtool: 'cheap-module-eval-source-map',
  progress: true,
  entry: {
    main: [
      // configuration for babel6
      'babel-polyfill',
      'webpack-hot-middleware/client?http://localhost.target.com:3000/__webpack_hmr',
      // example for single entry point. Multiple Entry bundle example will be added later
      './client/index.jsx'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    // preLoaders: [{
    //   test: /\.jsx$|\.js$/,
    //   loader: 'eslint-loader',
    //   include: __dirname + '/client/'
    // }],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'client'),
      loaders: ['react-hot', 'babel'],
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      include: path.join(__dirname, 'client'),
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ProgressPlugin(function(percentage, msg) {
      if((percentage * 100) % 20 === 0 ){
        console.info((percentage * 100) + '%', msg);
      }
    }),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ["", ".js", ".jsx"],
  }
}

module.exports = config;