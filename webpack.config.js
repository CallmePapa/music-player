const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        app: path.resolve(SRC_PATH, 'index.js'),
    },
    output: {
        path: BUILD_PATH,
        filename: "js/[name].[hash:5].js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".scss"]
    },
    plugin: [
        //模板文件
        new HtmlWebpackPlugin({
            title: 'react-music-project',
            favicon: './src/static/images/favicon.ico',
            template: './templates/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin("css/style.css"),
        new OpenBrowserPlugin({url: 'http://localhost:3000'})

    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: path.resolve(SRC_PATH, 'node_modules'),
            include: SRC_PATH,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        }, {
            test: /\.scss$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({ // css-hot-loader结局热替换CSS不自动刷新
                fallback: 'style-loader',
                use: ['sass-loader', 'css-loader']
            }))
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192 // 小于8KB 使用base64格式图片
                }
            }]
        }, {
            test: /\.css$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            }))
        }, {
            test: /\.(mp3|webm|ogg)/,
            use: {
                loader: 'file-loader',
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
            loader: 'url-loader'
        }]
    }
};