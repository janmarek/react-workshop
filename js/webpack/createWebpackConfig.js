import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

export default (mode, paths) => {
    const isWatch = mode === 'watch';
    const isHot = mode === 'dev-server';
    const isProduction = mode === 'production';
    const isDev = isWatch || isHot;

    const config = {
        cache: isDev,
        debug: isDev,
        devtool: isDev ? 'eval' : '',
        watch: isWatch,
        context: paths.webpackRoot,
        entry: isHot ? [
            'webpack-hot-middleware/client',
            paths.scripts.index,
        ] : paths.scripts.index,
        output: {
            path: path.join(paths.webpackRoot, paths.assetsDir),
            publicPath: paths.publicPath,
            filename: paths.scripts.outputName,
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader?cacheDirectory',
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /\.css$/,
                    loader: isHot ?
                        'style-loader!css-loader' :
                        ExtractTextPlugin.extract(
                            'css-loader' + (isProduction ? '?minify&-autoprefixer!postcss-loader' : '')
                        ),
                },
                {
                    test: /\.gif$/,
                    loader: 'url-loader?limit=4000&mimetype=image/gif',
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader?limit=4000&mimetype=image/png',
                },
                {
                    test: /\.jpe?g$/,
                    loader: 'file-loader?mimetype=image/jpg',
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                },
            ],
        },
        plugins: [],
        postcss() {
            return [autoprefixer({
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
            })];
        },
    };

    if (!isHot) {
        config.plugins.push(
            new ExtractTextPlugin(paths.styles.outputName, {
                allChunks: true,
            })
        );
    }

    if (isProduction) {
        config.plugins = config.plugins.concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
                sourceMap: false,
                comments: /$./, // do not keep any comments
            }),
        ]);
    }

    if (isHot) {
        config.plugins = config.plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        ]);
    }

    return config;
};
