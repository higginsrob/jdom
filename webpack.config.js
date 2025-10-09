const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

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
            library: {
                name: 'jdom',
                type: 'umd',
            },
            globalObject: 'this',
            clean: true,
        },
        module: {
            rules: [
                // Remove eslint-loader as it's deprecated and incompatible with ESLint v9
                // ESLint will be run separately via npm scripts
            ],
        },
        devtool: !isProduction ? 'source-map' : false,
        devServer: {
            static: {
                directory: path.join(context, 'test'),
            },
            port: 8080,
            hot: true,
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js'],
        },
        plugins: [
            new ESLintPlugin({
                files: ['index.js'],
                failOnError: true,
            }),
        ],
    };

    if (!isProduction) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                inject: 'head',
                template: path.join(context, 'test', 'template.html'),
            })
        );
    }

    return config;
};
