const path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var commonTestConfig = require('./webpack.test.common.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const basePath = path.join.bind(path, path.resolve(__dirname, '..'))
module.exports = webpackMerge(commonTestConfig, {
  target: 'web',

  entry: {
    'test': 'mocha-loader!./config/mocha/mocha-browser-test-shim.js'
  },

  output: {
    path      : basePath('tests'),
    publicPath: '/',
    filename  : 'test.bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: basePath('config/mocha/report.html')
    })
  ]
})
