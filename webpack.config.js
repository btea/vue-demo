var path = require('path');
var webpack = require('webpack');
var HtmlVwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpackBar  = require('webpackbar');
var proxy = require('http-proxy-middleware');

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
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash:8].[ext]'
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
        new webpackBar(),
        new ExtractTextPlugin('../css/[name].min.js')
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.125:3000/',
                changeOrigin: true,
                pathRewrite: { "^/api":"/" }
            }
        }
    }
}