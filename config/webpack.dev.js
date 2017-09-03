const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

const CommonConfig = require('./webpack.common.js');

module.exports = function () {
  return webpackMerge(CommonConfig({env: 'development'}), DevConfig());
};

function DevConfig() {
  const basePath = path.join.bind(path, path.resolve(__dirname, '..'));
  return {
    devtool: 'cheap-module-source-map',
    output: {
      path: basePath('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {loader: 'to-string-loader'},
            {loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            }
          ],
          include: [basePath('src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [basePath('src', 'styles')]
        },
      ]
    },
    plugins: [
      new DllBundlesPlugin({
        bundles: {
          polyfills: [
            'core-js',
            {
              name: 'zone.js',
              path: 'zone.js/dist/zone.js'
            },
            {
              name: 'zone.js',
              path: 'zone.js/dist/long-stack-trace-zone.js'
            },
          ],
          vendor: [
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/http',
            '@angular/router',
            'rxjs',
          ]
        },
        dllDir: basePath('dll'),
        webpackConfig: webpackMergeDll(CommonConfig, {
          devtool: 'cheap-module-source-map',
          plugins: []
        })
      }),

      new AddAssetHtmlPlugin([
        {filepath: basePath(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`)},
        {filepath: basePath(`dll/${DllBundlesPlugin.resolveFile('vendor')}`)}
      ])

    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
}
