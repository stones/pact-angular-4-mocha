var webpack = require('webpack')
const path = require('path')
const basePath = path.join.bind(path, path.resolve(__dirname, '..'))
const ngcWebpack = require('ngc-webpack')

module.exports = {
  devtool      : 'cheap-module-source-map',
  resolve      : {
    extensions: ['.ts', '.js']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module       : {
    rules: [
      {
        test   : /\.ts$/,
        exclude: basePath('src'),
        loaders: ['istanbul-instrumenter-loader', 'awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test   : /\.ts$/,
        include: basePath('src'),
        loaders: [
          {
            loader : 'awesome-typescript-loader',
            options: {configFileName: basePath('tsconfig.webpack.json')}
          }, 'angular2-template-loader'
        ]
      },
      {
        test  : /\.html$/,
        loader: 'html-loader'

      },
      {
        test  : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test   : /\.css$/,
        exclude: basePath('src', 'app'),
        loader : 'null-loader'
      },
      {
        test   : /\.css$/,
        include: basePath('src', 'app'),
        loader : 'raw-loader'
      }
    ]
  },
  plugins      : [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      basePath('src'),
      {}
    ),
    new ngcWebpack.NgcWebpackPlugin({
      disabled: true,
      tsConfig: basePath('tsconfig.webpack.json'),
    }),
  ],

  performance: {
    hints: false
  }
}
