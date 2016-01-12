import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createWebpackConfig from './createWebpackConfig';

export default (paths) => {
    return () => {
        const config = createWebpackConfig('dev-server', paths);
        const documentRoot = paths.documentRoot;

        const app = express();
        const compiler = webpack(config);

        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: paths.publicPath,
        }));

        app.use(webpackHotMiddleware(compiler));

        app.use(express.static(documentRoot));

        app.get('*', (req, res) => {
            res.sendFile(path.join(documentRoot, 'index.html'));
        });

        app.listen(paths.devServerPort, 'localhost', (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`Listening at localhost:${paths.devServerPort}`);
        });
    };
};
