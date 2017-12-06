var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcDir = path.resolve(__dirname, 'src');
var jsDir = srcDir + '/js';
var stylesDir = srcDir + '/styles';
var buildDir = path.resolve(__dirname, 'build');

var prod = process.env.NODE_ENV === 'production';

var config = {
  entry: jsDir + '/app.js',
  output: {
    path: buildDir,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      styles: stylesDir,
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        srcDir,
      ],
      exclude: [
        /node_modules/
      ],
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      include: stylesDir,
      exclude: /index.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader',
        options: {
          includPaths: stylesDir
        }
      }]
    }, {
      test: /index.less$/,
      include: stylesDir,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }]
  },
  plugins: [
    new ExtractTextPlugin((!prod ? buildDir : '.') + '/index.css')
  ]
};


module.exports = config;
