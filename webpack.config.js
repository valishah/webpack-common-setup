const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context : __dirname,
  devtool : debug ? "inline-sourcemap" : null,
  entry   : {
    'index'  : "./js/index.js", 
    'landing': "./js/landing.js"
  },
  output  : {
    path  : __dirname+'/build',
    filename : 'bundle-[name].js'
  },
  watch   : true, // # To enable webpack watch on entry files.
  module  : {
    rules : [
      // # CSS loader
      {
        test : /\.css$/,
        use  : ['style-loader', 'css-loader']
      },
      // # SCSS loader
      {
        test : /\.scss$/,
        use: [{
            loader: "style-loader" // # Creates style nodes from JS strings
          }, {
            loader: "css-loader"   // # translates CSS into CommonJS
          }, {
            loader: "sass-loader"  // # compiles Sass to CSS
          }]
      },
      // # JS loader
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use  : {
          loader : 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins : [
    new HTMLWebpackPlugin({
      title: 'Welcome To Webpack',
      filename: "first.html",
      template: 'index.html',
      chunks: ['index']
    }),
    new HTMLWebpackPlugin({
      title : 'Welcome To Webpack',
      filename : "landing_build.html",
      template : 'landing.html',
      chunks: ['landing', 'index']
    })
  ]
}

