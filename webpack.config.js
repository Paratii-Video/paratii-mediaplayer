var webpack = require("webpack");
var path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

var srcDir = path.resolve(__dirname, "src");
var jsDir = srcDir + "/js";
var stylesDir = srcDir + "/styles";
var buildDir = path.resolve(__dirname, "build");

var prod = process.env.NODE_ENV === "production";

var config = {
  entry: jsDir + "/index.js",
  output: {
    path: buildDir,
    filename: "bundle.js",
    library: "paratii-mediaplayer",
    libraryTarget: "commonjs2"
  },
  resolve: {
    alias: {
      styles: stylesDir
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcDir],
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        include: stylesDir,
        exclude: /index.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        include: stylesDir,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            // noquotes: false,
            // limit: 100000
          }
        }
      }
      // {
      //   test: /\.svg$/,
      //   loader: "raw-loader"
      // }
    ]
  }
};

module.exports = config;
