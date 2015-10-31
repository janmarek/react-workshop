import webpackBuild from './webpackBuild';
import createWebpackConfig from './createWebpackConfig';

export default (gulpUtil, paths) => {
    return () => {
        const config = createWebpackConfig('watch', paths);
        webpackBuild(gulpUtil, config);
    };
};
