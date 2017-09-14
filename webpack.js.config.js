var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        'dist/app.js': [
            './app/app.js'
        ],
        'sw.js': './app/sw.js'
    },
    resolve: {

    },
    devtool: 'source-map',
    output: {
        filename: '[name]'
    },
    module: {
        rules: [{
            test: path.join(__dirname, 'app'),
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: path.resolve(__dirname, "libs/jquery-3.2.1.min.js")
        })
    ]
};