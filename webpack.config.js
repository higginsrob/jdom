const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = __dirname;
const build = path.join(context, 'dist');

module.exports = function(env) {
    const isProduction = env && env.NODE_ENV === 'production';
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
        context,
        target: 'web',
        stats: {
            colors: true,
            chunks: false,
            modules: false,
            children: false,
            warnings: false,
        },
    };
    if (!isProduction) {
        config.devtool = 'source-map';
        config.devServer = {
            contentBase: build,
            inline: false,
            stats: {
                colors: true,
                chunks: false,
                modules: false,
                children: false,
            },
        };
        config.plugins = [
            new HtmlWebpackPlugin({
                inject: 'head',
                template: path.join(context, 'test', 'template.html'),
            }),
        ];
    }
    return config;
};
