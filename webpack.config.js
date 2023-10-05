const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = __dirname;
const build = path.join(context, 'dist');
const src = path.join(context, 'src');
const test = path.join(context, 'test');

module.exports = function (env, props) {
    console.log('WEBPACK BUILD: ', {
        env,
        props,
        dirs: { context, build, src, test },
    });
    const isProduction = props.mode === 'production';
    const config = {
        mode: props.mode,
        entry: {
            jdom: path.join(src, 'index.ts'),
            zombie: path.join(src, 'zombie', 'index.ts'),
        },
        output: {
            path: build,
            filename: '[name].js',
            library: ['[name]'],
            libraryTarget: 'umd',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                },
            ],
        },
        devtool: !isProduction && 'source-map',
        devServer: {},
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.mjs', '.ts'],
        },
    };
    if (!isProduction) {
        config.plugins = [new HtmlWebpackPlugin({
            chunks: ['zombie']
        })];
    }
    return config;
};
