var webpack = require("webpack");
var path = require("path");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");

var srcDir = path.resolve(__dirname, "src");
var jsDir = srcDir + "/js";
var htmlDir = srcDir + "/html";
var stylesDir = srcDir + "/styles";
var buildDir = path.resolve(__dirname, "build");

var prod = process.env.NODE_ENV === "production";
var dev = process.env.NODE_ENV === "dev";

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
      styles: stylesDir,
      html: htmlDir
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
        test: /\.svg$/,
        loader: "svg-url-loader"
      }
    ]
  },
  plugins: dev
    ? [
        new OpenBrowserPlugin({
          url: "http://localhost:8080"
        })
      ]
    : [],
  externals: {
    clappr: "clappr"
  }
};

module.exports = config;
