import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

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
                    exclude: /node_modules(?!\/shipito-js-)/,
                    loaders: ['babel-loader'],
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /\.css$/,
                    loader: isHot ?
                        'style-loader!css-loader!autoprefixer-loader' :
                        ExtractTextPlugin.extract('css-loader!autoprefixer-loader'),
                },
                {
                    test: /\.gif$/,
                    loader: 'url-loader?mimetype=image/gif',
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader?mimetype=image/png',
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
    };

    if (!isHot) {
        config.plugins.push(
            new ExtractTextPlugin(paths.styles.outputName, {
                allChunks: true,
            })
        );
    }

    // if (isProduction) {
    //     config.plugins = config.plugins.concat([
    //         new webpack.DefinePlugin({
    //             'process.env': {
    //                 NODE_ENV: '"production"',
    //             },
    //         }),
    //         new webpack.optimize.DedupePlugin(),
    //         new webpack.optimize.OccurenceOrderPlugin(),
    //         new webpack.optimize.UglifyJsPlugin({
    //             compress: {
    //                 warnings: false,
    //             },
    //             sourceMap: false,
    //             comments: /$./, // do not keep any comments
    //         }),
    //     ]);
    // }

    if (isHot) {
        config.plugins = config.plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        ]);
    }

    return config;
};
