var nodeExternals = require('webpack-node-externals');
var webpackMerge = require('webpack-merge');
var commonTestConfig = require('./webpack.test.common.js');

module.exports = webpackMerge(commonTestConfig, {
    target: 'node',

    externals: [
        nodeExternals()
    ]
});
