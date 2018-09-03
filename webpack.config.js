var path = require('path');
var webpack = require('webpack');
var HtmlVwebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

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
                test: /.html$/,
                use: {
                    loader: 'html-loaer',
                    options: {minimize: true}
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.json']
    },
    plugins: [
        new HtmlVwebpackPlugin({
            template: './inedx.html',
            filename: './index.html'
        }),
        new VueLoaderPlugin()

    ]
}