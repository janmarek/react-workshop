import webpackBuild from './webpackBuild';
import createWebpackConfig from './createWebpackConfig';

export default (gulpUtil, paths, mode) => {
    return done => {
        const config = createWebpackConfig(mode, paths);
        webpackBuild(gulpUtil, config, done);
    };
};
