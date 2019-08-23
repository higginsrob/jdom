const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = __dirname;
const build = path.join(context, 'build');
const isProduction = false;

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        jdom: path.join(context, 'index.js'),
    },
    output: {
        path: build,
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: ['jdom'],
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: path.join(context, 'index.js'),
                use: ['eslint-loader'],
            },
        ],
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js'],
    },
    devtool: !isProduction && 'source-map',
    context,
    target: 'web',
    stats: {
        colors: true,
        chunks: false,
        modules: false,
        children: false,
        warnings: false,
    },
    devServer: {
        contentBase: build,
        inline: false,
        stats: {
            colors: true,
            chunks: false,
            modules: false,
            children: false,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            template: path.join(context, 'test', 'template.html'),
        }),
    ],
};

module.exports = config;
