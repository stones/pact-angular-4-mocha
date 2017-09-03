const webpack = require('webpack')
const path = require('path')

const AssetsPlugin = require('assets-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ngcWebpack = require('ngc-webpack')

module.exports = function (options) {
  const basePath = path.join.bind(path, path.resolve(__dirname, '..'))

  return {
    entry  : {
      'polyfills': './src/polyfills.browser.ts',
      'main'     : './src/main.browser.ts'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules   : [basePath('src'), basePath('node_modules')],
    },
    module : {
      rules: [
        {
          test   : /\.ts$/,
          use    : [
            {
              loader : 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
                aot   : false
              }
            },
            {
              loader : 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.webpack.json',
                useCache      : true
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          use : 'json-loader'
        },
        {
          test   : /\.css$/,
          use    : ['to-string-loader', 'css-loader'],
          exclude: [basePath('src', 'styles')]
        },
        {
          test   : /\.scss$/,
          use    : ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [basePath('src', 'styles')]
        },
        {
          test   : /\.html$/,
          use    : 'raw-loader',
          exclude: [basePath('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use : 'file-loader?name=static/images/[name].[ext]'
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use : 'file-loader?name=static/fonts/[name].[ext]'
        }
      ],
    },

    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(options.env)
      }),
      new AssetsPlugin({
        path       : basePath('dist'),
        filename   : 'webpack-assets.json',
        prettyPrint: true
      }),

      new CheckerPlugin(),

      new CommonsChunkPlugin({
        name  : 'polyfills',
        chunks: ['polyfills']
      }),
      new CommonsChunkPlugin({
        name     : 'vendor',
        chunks   : ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new CommonsChunkPlugin({
        name     : ['manifest'],
        minChunks: Infinity,
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        basePath('src'), {}
      ),

      new HtmlWebpackPlugin({
        template      : 'src/index.html',
        chunksSortMode: 'dependency',
        inject        : 'head'
      }),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        basePath('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        basePath('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        basePath('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        basePath('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        basePath('node_modules/@angular/core/src/facade/math.js')
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: true,
        tsConfig: basePath('tsconfig.webpack.json'),
      }),

      new InlineManifestWebpackPlugin(),
    ],
    node   : {
      global        : true,
      crypto        : 'empty',
      process       : true,
      module        : false,
      clearImmediate: false,
      setImmediate  : false
    }
  }
}

