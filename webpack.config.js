var path = require('path');
var webpack = require('webpack');
var HtmlVwebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpackBar  = require('webpackbar');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /.html$/,
                use: {
                    loader: 'html-loader',
                    options: {minimize: true}
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.json','.vue']
    },
    plugins: [
        new HtmlVwebpackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new VueLoaderPlugin(),
        new webpackBar()

    ]
}