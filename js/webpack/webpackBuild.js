import webpack from 'webpack';

export default (gulpUtil, webpackConfig, done) => {
    webpack(webpackConfig, (fatalError, stats) => {
        const jsonStats = stats.toJson();
        const buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

        if (buildError) {
            throw new gulpUtil.PluginError('webpack', buildError);
        }

        gulpUtil.log('[webpack]', stats.toString({
            colors: true,
            version: false,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
        }));

        if (done) {
            done();
        }
    });
};
